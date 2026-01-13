import { ImageWithFallback } from "./ImageWithFallback";

export function Card(project: {
  imageUrl: string;
  title: string;
  categories: string[];
    galleryImages?: string[];
    year: string;
}) {
  return (
    <div className="relative aspect-4/5 bg-muted overflow-hidden mb-0 rounded-xs">
      <ImageWithFallback
        src={project.imageUrl}
        alt={project.title}
        className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
          project.categories.includes("COLOUR")
            ? "grayscale group-hover:grayscale-0"
            : ""
        }`}
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
    </div>
  );
}
