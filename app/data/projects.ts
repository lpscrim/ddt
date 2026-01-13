import fs from "fs";
import path from "path";

interface Project {
  id: number;
  title: string;
  categories: string[];
  year: string;
  imageUrl: string;
  galleryImages?: string[];
}

export function getProjects(): Project[] {
  const photosDir = path.join(process.cwd(), "public/photos");
  const folders = fs.readdirSync(photosDir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  const projects: Project[] = folders.map((folder, index) => {
    // Parse folder name: {project}_{date}_{category,category}
    const parts = folder.split("_");
    
    // Handle case where project name might contain underscores
    // Last part is categories, second to last is date
    const categories = parts.pop()?.split(",") ?? [];
    const year = parts.pop() ?? new Date().getFullYear().toString();
    const projectName = parts.join("_");

    // Format title: replace hyphens/underscores with spaces and uppercase
    const title = projectName
      .replace(/[-_]/g, " ")
      .toUpperCase();

    // Get all images in the folder
    const folderPath = path.join(photosDir, folder);
    const images = fs.readdirSync(folderPath)
      .filter((file) => /\.(webp|jpg|jpeg|png|gif)$/i.test(file))
      .map((file) => `/photos/${folder}/${file}`);

    // Use first image as cover, rest as gallery
    const [coverImage, ...galleryImages] = images;

    return {
      id: index + 1,
      title,
      categories,
      year,
      imageUrl: coverImage ?? "",
      ...(galleryImages.length > 0 && { galleryImages }),
    };
  });

  // Sort by year (newest first), then by title
  return projects.sort((a, b) => {
    if (b.year !== a.year) return b.year.localeCompare(a.year);
    return a.title.localeCompare(b.title);
  });
}
