import { ImageWithFallback } from "./ImageWithFallback";

export function Card(project: {
  imageUrl: string;
  title: string;
  imageSizes: string;
  handleOnClick?: () => void;
}) {
  return (
    <div onClick={project.handleOnClick} className="group relative aspect-4/5 bg-muted overflow-hidden mb-0 cursor-crosshair">
      <ImageWithFallback
        src={project.imageUrl}
        alt={project.title}
        sizes={project.imageSizes}
        fill
        className="w-full h-full object-cover"
      />
    </div>
  );
}
