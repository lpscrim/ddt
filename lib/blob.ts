import { list } from "@vercel/blob";

export const BLOB_PHOTOS_PREFIX = "photos";

const DESCRIPTION_FORMATS = ["txt"] as const;
const METADATA_FILE_NAMES = [
  "project.json",
  "metadata.json",
  "project.yaml",
  "project.yml",
  "metadata.yaml",
  "metadata.yml",
  "project.txt",
  "metadata.txt",
];

function getLastPathSegment(value: string): string {
  return value.split("/").pop() ?? "";
}

function stripExtension(filename: string): string {
  return filename.replace(/\.[^.]+$/, "");
}

function normalizeText(text: string): string {
  return text.replace(/\r\n/g, "\n").trim();
}

function isMetadataLikeName(name: string): boolean {
  const normalized = name.trim().toLowerCase();
  if (!normalized) return false;

  if (METADATA_FILE_NAMES.includes(normalized)) return true;

  const base = stripExtension(normalized);
  return base === "project" || base === "metadata";
}

function getDescriptionIndexFromName(name: string): number | null {
  const last = getLastPathSegment(name.trim());
  if (!last) return null;

  const base = stripExtension(last).toLowerCase();
  const match = base.match(/^description(?:_(\d+))?$/);
  if (!match) return null;
  if (!match[1]) return 0;

  const value = Number(match[1]);
  return Number.isFinite(value) ? value : null;
}

function isDescriptionLikeName(name: string): boolean {
  const last = getLastPathSegment(name.trim()).toLowerCase();
  if (!last) return false;

  const base = stripExtension(last);
  return base === "description" || base.startsWith("description_");
}

export function hasBlobConfig(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

export async function listProjectFolders(): Promise<string[]> {
  if (!hasBlobConfig()) {
    return [];
  }

  try {
    const { blobs } = await list({
      prefix: `${BLOB_PHOTOS_PREFIX}/`,
    });

    const folders = new Set<string>();

    for (const blob of blobs) {
      const segments = blob.pathname.split("/").filter(Boolean);
      if (segments[0] !== BLOB_PHOTOS_PREFIX || segments.length < 3) {
        continue;
      }
      if (segments[1].toLowerCase() === "featured") {
        continue;
      }
      folders.add(segments[1]);
    }

    return [...folders].sort((a, b) => a.localeCompare(b));
  } catch (error) {
    console.error("Failed to list Vercel Blob project folders:", error);
    return [];
  }
}

export async function listProjectPhotos(folder: string): Promise<string[]> {
  if (!hasBlobConfig()) {
    return [];
  }

  try {
    const { blobs } = await list({
      prefix: `${BLOB_PHOTOS_PREFIX}/${folder}/`,
    });

    return blobs
      .filter(
        (blob) =>
          !isDescriptionLikeName(getLastPathSegment(blob.pathname)) &&
          !isMetadataLikeName(getLastPathSegment(blob.pathname))
      )
      .map((blob) => blob.url)
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b));
  } catch (error) {
    console.error(`Failed to list Vercel Blob photos for ${folder}:`, error);
    return [];
  }
}

function parseMetadataText(text: string): Record<string, unknown> {
  const trimmed = text.trim();
  if (!trimmed) return {};

  try {
    const parsed = JSON.parse(trimmed);
    return parsed && typeof parsed === "object" ? parsed as Record<string, unknown> : {};
  } catch {
    // Fall back to a simple key/value parser for metadata.txt or YAML-like files.
  }

  const parsed: Record<string, unknown> = {};
  for (const rawLine of trimmed.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;

    const separatorIndex = line.indexOf(":");
    const equalsIndex = line.indexOf("=");
    const delimiterIndex = separatorIndex >= 0 && equalsIndex >= 0
      ? Math.min(separatorIndex, equalsIndex)
      : Math.max(separatorIndex, equalsIndex);

    if (delimiterIndex <= 0) {
      continue;
    }

    const key = line.slice(0, delimiterIndex).trim().toLowerCase();
    const value = line.slice(delimiterIndex + 1).trim();
    if (!key || !value) continue;

    const normalizedValue = value.startsWith("[") || value.startsWith("{")
      ? (() => {
          try {
            return JSON.parse(value);
          } catch {
            return value;
          }
        })()
      : value;

    parsed[key] = normalizedValue;
  }

  return parsed;
}

export async function fetchProjectMetadata(folder: string): Promise<Record<string, unknown> | null> {
  if (!hasBlobConfig()) {
    return null;
  }

  try {
    const { blobs } = await list({
      prefix: `${BLOB_PHOTOS_PREFIX}/${folder}/`,
    });

    const metadataBlob = blobs
      .filter((blob) => isMetadataLikeName(getLastPathSegment(blob.pathname)))
      .sort((a, b) => getLastPathSegment(a.pathname).localeCompare(getLastPathSegment(b.pathname)))[0];

    if (!metadataBlob) {
      return null;
    }

    const response = await fetch(metadataBlob.url);
    if (!response.ok) {
      console.error(
        `Failed to fetch project metadata for ${folder}: ${response.status} ${response.statusText}`
      );
      return null;
    }

    const text = await response.text();
    return parseMetadataText(text);
  } catch (error) {
    console.error(`Failed to fetch project metadata for ${folder}:`, error);
    return null;
  }
}

export async function fetchProjectDescriptionText(folder: string): Promise<string> {
  if (!hasBlobConfig()) {
    return "";
  }

  try {
    const { blobs } = await list({
      prefix: `${BLOB_PHOTOS_PREFIX}/${folder}/`,
    });

    const metadata = await fetchProjectMetadata(folder);
    const metadataDescription =
      typeof metadata?.description === "string"
        ? metadata.description
        : typeof metadata?.summary === "string"
          ? metadata.summary
          : "";
    if (metadataDescription) {
      return normalizeText(metadataDescription);
    }

    const descriptionBlob = blobs
      .filter((blob) => isDescriptionLikeName(getLastPathSegment(blob.pathname)))
      .sort((a, b) => {
        const aIndex = getDescriptionIndexFromName(getLastPathSegment(a.pathname)) ?? Number.POSITIVE_INFINITY;
        const bIndex = getDescriptionIndexFromName(getLastPathSegment(b.pathname)) ?? Number.POSITIVE_INFINITY;
        if (aIndex !== bIndex) return aIndex - bIndex;
        return new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime();
      })[0];

    if (!descriptionBlob) {
      return "";
    }

    const descriptionResponse = await fetch(descriptionBlob.url);
    if (!descriptionResponse.ok) {
      console.error(
        `Failed to fetch project description for ${folder}: ${descriptionResponse.status} ${descriptionResponse.statusText}`
      );
      return "";
    }

    const extension = getLastPathSegment(descriptionBlob.pathname).split(".").pop()?.toLowerCase() ?? "";
    const isTextLike = extension ? DESCRIPTION_FORMATS.includes(extension as (typeof DESCRIPTION_FORMATS)[number]) : true;
    if (!isTextLike) {
      return "";
    }

    return normalizeText(await descriptionResponse.text());
  } catch (error) {
    console.error(`Failed to fetch description text for ${folder}:`, error);
    return "";
  }
}

