import { list, put } from "@vercel/blob";

export const BLOB_PHOTOS_PREFIX = "photos";

export function hasBlobConfig(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
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
      .map((blob) => blob.url)
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b));
  } catch (error) {
    console.error(`Failed to list Vercel Blob photos for ${folder}:`, error);
    return [];
  }
}

export async function uploadProjectPhoto(
  file: File,
  folder: string,
  filename: string,
  options: { access?: "public" | "private"; addRandomSuffix?: boolean } = {}
): Promise<{ url: string; pathname: string }> {
  if (!hasBlobConfig()) {
    throw new Error("BLOB_READ_WRITE_TOKEN is not set.");
  }

  const safeFolder = folder.trim().replace(/^\/+|\/+$/g, "");
  const safeFilename = filename.trim() || file.name;
  const pathname = `${BLOB_PHOTOS_PREFIX}/${safeFolder ? `${safeFolder}/` : ""}${safeFilename}`;

  const { url } = await put(pathname, file, {
    access: options.access ?? "public",
    addRandomSuffix: options.addRandomSuffix ?? false,
  });

  return { url, pathname };
}
