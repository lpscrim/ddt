interface Project {
  id: number;
  title: string;
  categories: string[];
  year: string;
  imageUrl: string;  // Cloudinary public ID
  galleryImages?: string[];
  text: string;
}

interface CloudinaryResource {
  public_id: string;
  secure_url: string;
  format?: string;
  filename?: string;
  original_filename?: string;
  display_name?: string;
}

interface CloudinarySearchResponse {
  resources: CloudinaryResource[];
  next_cursor?: string;
}

const CLOUDINARY_CACHE_TAG = "cloudinary-projects";
const CLOUDINARY_REVALIDATE_SECONDS = 60 * 60; // 1 hour

function getLastPathSegment(publicId: string): string {
  return publicId.split("/").pop() ?? "";
}

function stripExtension(filename: string): string {
  return filename.replace(/\.[^.]+$/, "");
}

function getDescriptionIndexFromAnyName(name: string): number | null {
  const trimmed = name.trim();
  if (!trimmed) return null;
  return getDescriptionIndexFromFilename(trimmed);
}

function getResourceNameCandidates(resource: CloudinaryResource): string[] {
  const candidates: string[] = [];

  if (resource.display_name) candidates.push(resource.display_name);
  if (resource.filename) candidates.push(resource.filename);
  if (resource.original_filename) {
    const format = (resource.format ?? "").trim();
    candidates.push(format ? `${resource.original_filename}.${format}` : resource.original_filename);
  }

  candidates.push(getLastPathSegment(resource.public_id));

  return candidates;
}

function getDescriptionIndexFromFilename(filename: string): number | null {
  // Supports: description.txt, description_1.txt, description_2.cd, etc.
  const base = stripExtension(filename).toLowerCase();
  const match = base.match(/^description(?:_(\d+))?$/);
  if (!match) return null;
  if (!match[1]) return 0;
  const n = Number(match[1]);
  return Number.isFinite(n) ? n : null;
}

function isDescriptionResource(resource: CloudinaryResource): boolean {
  const candidates = getResourceNameCandidates(resource);
  const hasDescriptionName = candidates.some((c) => getDescriptionIndexFromAnyName(c) !== null);
  if (!hasDescriptionName) return false;

  const format = (resource.format ?? "").toLowerCase();
  if (format) return format === "txt" || format === "cd";

  // Fallback if Cloudinary didn't provide `format`
  const lower = filename.toLowerCase();
  return lower.endsWith(".txt") || lower.endsWith(".cd");
}

function normalizeText(text: string): string {
  return text.replace(/\r\n/g, "\n").trim();
}

function isLikelyImagePublicId(publicId: string): boolean {
  const last = getLastPathSegment(publicId);
  const lower = last.toLowerCase();
  const extMatch = lower.match(/\.([a-z0-9]+)$/);
  if (!extMatch) return true;

  const ext = extMatch[1];
  return [
    "jpg",
    "jpeg",
    "png",
    "webp",
    "gif",
    "avif",
    "heic",
    "heif",
    "tif",
    "tiff",
    "bmp",
  ].includes(ext);
}

function isLikelyImageResource(resource: CloudinaryResource): boolean {
  const format = (resource.format ?? "").toLowerCase();
  if (format) {
    return [
      "jpg",
      "jpeg",
      "png",
      "webp",
      "gif",
      "avif",
      "heic",
      "heif",
      "tif",
      "tiff",
      "bmp",
    ].includes(format);
  }
  return isLikelyImagePublicId(resource.public_id);
}

async function fetchCloudinaryResources(folder: string): Promise<string[]> {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  
  const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');
  
  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/resources/search`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        expression: `folder:photos/${folder}/*`,
        max_results: 500,
        fields: [
          "public_id",
          "secure_url",
          "format",
          "filename",
          "original_filename",
          "display_name",
        ],
      }),
      next: {
        revalidate: CLOUDINARY_REVALIDATE_SECONDS,
        tags: [CLOUDINARY_CACHE_TAG],
      },
    }
  );
  
  const data: CloudinarySearchResponse = await response.json();
  return data.resources
    .filter((r) => !isDescriptionResource(r) && isLikelyImageResource(r))
    .map((r) => r.public_id)
    .sort();
}

async function fetchCloudinaryDescriptionText(folder: string): Promise<string> {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) return "";

  const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString("base64");

  try {
    const searchBody = {
      expression: `folder:photos/${folder}/*`,
      max_results: 200,
    };

    // Some Cloudinary accounts support this raw-specific endpoint; some don't.
    // If it fails, fall back to the generic search endpoint with resource_type=raw.
    const rawResponse = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/resources/raw/search`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(searchBody),
        next: {
          revalidate: CLOUDINARY_REVALIDATE_SECONDS,
          tags: [CLOUDINARY_CACHE_TAG],
        },
      }
    );

    const response = rawResponse.ok
      ? rawResponse
      : await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/resources/search`,
          {
            method: "POST",
            headers: {
              Authorization: `Basic ${auth}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...searchBody,
              resource_type: "raw",
              type: "upload",
            }),
            next: {
              revalidate: CLOUDINARY_REVALIDATE_SECONDS,
              tags: [CLOUDINARY_CACHE_TAG],
            },
          }
        );

    if (!response.ok) return "";

    const data: CloudinarySearchResponse = await response.json();
    const candidates = data.resources
      .filter((r) => isDescriptionResource(r))
      .map((r) => {
        const idx = getResourceNameCandidates(r)
          .map((name) => getDescriptionIndexFromAnyName(name))
          .filter((n): n is number => typeof n === "number")
          .sort((a, b) => a - b)[0];
        return { resource: r, idx: idx ?? Number.POSITIVE_INFINITY };
      })
      .sort((a, b) => a.idx - b.idx);

    const descriptionResource = candidates[0]?.resource;
    if (!descriptionResource?.secure_url) return "";

    const textResponse = await fetch(descriptionResource.secure_url, {
      next: {
        revalidate: CLOUDINARY_REVALIDATE_SECONDS,
        tags: [CLOUDINARY_CACHE_TAG],
      },
    });

    if (!textResponse.ok) return "";
    return normalizeText(await textResponse.text());
  } catch {
    return "";
  }
}

async function fetchCloudinaryFolders(): Promise<string[]> {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  
  const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');
  
  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/folders/photos`,
    {
      headers: {
        'Authorization': `Basic ${auth}`,
      },
      next: {
        revalidate: CLOUDINARY_REVALIDATE_SECONDS,
        tags: [CLOUDINARY_CACHE_TAG],
      },
    }
  );
  
  const data = await response.json();
  return data.folders?.map((f: { name: string }) => f.name) ?? [];
}

export async function getProjects(): Promise<Project[]> {
  const folders = await fetchCloudinaryFolders();
  
  const projects: Project[] = await Promise.all(
    folders.map(async (folder) => {
      // Parse folder name: {id}_{name}_{date}_{category,category}
      const parts = folder.split("_");
      
      // Extract id from first part
      const id = parseInt(parts.shift() ?? "0", 10);
      
      // Last part is categories, second to last is date
      const categories = parts.pop()?.split(",") ?? [];
      const year = parts.pop() ?? new Date().getFullYear().toString();
      
      // Remaining parts form the project name
      const projectName = parts.join("_");

      // Format title: replace hyphens/underscores with spaces and uppercase
      const title = projectName
        .replace(/[-_]/g, " ")
        .toUpperCase();

      // Fetch images from Cloudinary
      const images = await fetchCloudinaryResources(folder);

      // Fetch optional project description text (from description.cd uploaded as a raw file)
      const text = await fetchCloudinaryDescriptionText(folder);

      // Sort so images named "0" (e.g., 0.webp, 0.jpg) come first as cover
      const sortedImages = images.sort((a, b) => {
        const aName = a.split('/').pop()?.replace(/\.[^.]+$/, '') ?? '';
        const bName = b.split('/').pop()?.replace(/\.[^.]+$/, '') ?? '';
        if (aName === '0') return -1;
        if (bName === '0') return 1;
        return aName.localeCompare(bName);
      });

      // Use first image as cover, rest as gallery
      const [coverImage, ...galleryImages] = sortedImages;

      return {
        id,
        title,
        categories,
        year,
        imageUrl: coverImage ?? "",
        ...(galleryImages.length > 0 && { galleryImages }),
        text,
      };
    })
  );

  // Sort by year (newest first), then by title
  return projects.sort((a, b) => {
    if (b.year !== a.year) return b.year.localeCompare(a.year);
    return a.title.localeCompare(b.title);
  });
}
