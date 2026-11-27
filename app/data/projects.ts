import {
  fetchProjectDescriptionText,
  fetchProjectMetadata,
  listProjectFolders,
  listProjectPhotos,
} from "@/lib/blob";

export interface Project {
  id: number;
  title: string;
  categories: string[];
  year: string;
  imageUrl: string;
  galleryImages?: string[];
  text: string;
  tags?: string[];
}

interface GetProjectsOptions {
  includeGallery?: boolean;
  includeText?: boolean;
}

function normalizeText(text: string): string {
  return text.replace(/\r\n/g, "\n").trim();
}

function normalizeStringList(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.flatMap((entry) => normalizeStringList(entry));
  }

  if (typeof value !== "string") {
    return [];
  }

  return value
    .split(/[\n,|;]/)
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((entry) => entry.toUpperCase());
}

export async function getProjects({
  includeGallery = true,
  includeText = true,
}: GetProjectsOptions = {}): Promise<Project[]> {
  const folders = await listProjectFolders();

  const projects = await Promise.all(
    folders.map(async (folder) => {
      const [images, text, metadata] = await Promise.all([
        listProjectPhotos(folder),
        includeText ? fetchProjectDescriptionText(folder) : Promise.resolve(""),
        fetchProjectMetadata(folder),
      ]);

      if (!metadata || typeof metadata !== "object") {
        console.warn(`Skipping folder without project metadata: ${folder}`);
        return null;
      }

      const title = typeof metadata.title === "string" ? metadata.title.trim() : "";
      if (!title) {
        console.warn(`Skipping folder with no project title in metadata: ${folder}`);
        return null;
      }

      const idValue = metadata.id;
      const id = typeof idValue === "number"
        ? idValue
        : typeof idValue === "string"
          ? Number(idValue)
          : Number.NaN;

      if (!Number.isFinite(id) || id < 0) {
        console.warn(`Skipping folder with invalid metadata id: ${folder}`);
        return null;
      }

      const categories = normalizeStringList(metadata.categories ?? metadata.category ?? metadata.labels);
      const tags = normalizeStringList(metadata.tags ?? metadata.keywords ?? metadata.labels);
      const year = metadata.year ? String(metadata.year) : "";
      const descriptionText = [
        typeof metadata.description === "string" ? metadata.description : "",
        typeof metadata.summary === "string" ? metadata.summary : "",
        text,
      ].find((entry) => entry && entry.trim()) ?? "";

      const sortedImages = [...images].sort((a, b) => {
        const aName = a.split("/").pop()?.replace(/\.[^.]+$/, "") ?? "";
        const bName = b.split("/").pop()?.replace(/\.[^.]+$/, "") ?? "";
        if (aName === "0") return -1;
        if (bName === "0") return 1;
        return aName.localeCompare(bName);
      });

      const [coverImage, ...galleryImages] = sortedImages;

      return {
        id,
        title,
        categories: categories.filter(Boolean),
        year,
        imageUrl: coverImage ?? "",
        ...(includeGallery && galleryImages.length > 0 && { galleryImages }),
        text: normalizeText(descriptionText),
        ...(tags.length > 0 && { tags }),
      } satisfies Project;
    })
  );

  const validProjects = projects.filter((project): project is Project => project !== null);

  return validProjects.sort((a, b) => {
    if (b.year !== a.year) return b.year.localeCompare(a.year);
    return a.title.localeCompare(b.title);
  });
}
