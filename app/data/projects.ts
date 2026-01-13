interface Project {
  id: number;
  title: string;
  categories: string[];
  year: string;
  imageUrl: string;  // Cloudinary public ID
  galleryImages?: string[];
}

interface CloudinaryResource {
  public_id: string;
  secure_url: string;
}

interface CloudinarySearchResponse {
  resources: CloudinaryResource[];
  next_cursor?: string;
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
      }),
      next: { revalidate: 3600 }, // Cache for 1 hour
    }
  );
  
  const data: CloudinarySearchResponse = await response.json();
  return data.resources.map((r) => r.public_id).sort();
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
      next: { revalidate: 3600 }, // Cache for 1 hour
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

      // Use first image as cover, rest as gallery
      const [coverImage, ...galleryImages] = images;

      return {
        id,
        title,
        categories,
        year,
        imageUrl: coverImage ?? "",
        ...(galleryImages.length > 0 && { galleryImages }),
      };
    })
  );

  // Sort by year (newest first), then by title
  return projects.sort((a, b) => {
    if (b.year !== a.year) return b.year.localeCompare(a.year);
    return a.title.localeCompare(b.title);
  });
}
