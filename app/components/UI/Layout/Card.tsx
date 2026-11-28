"use client";

import { useState } from "react";
import { ImageWithFallback } from "./ImageWithFallback";

export function Card(project: {
  imageUrl: string;
  title: string;
  imageSizes: string;
  priority?: boolean;
  handleOnClick?: () => void;
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <button
      type="button"
      onClick={project.handleOnClick}
      aria-label={project.title ? `Open ${project.title}` : "Open image"}
      className="group relative block aspect-4/5 w-full overflow-hidden bg-muted cursor-crosshair text-left"
    >
      {!isLoaded && (
        <span
          className="absolute inset-0 z-10 flex items-center justify-center text-xs tracking-[0.2em] text-foreground/50"
          role="status"
          aria-label="Loading image"
        >
          <span className="loading-dot">.</span>
          <span className="loading-dot loading-dot-delay-1">.</span>
          <span className="loading-dot loading-dot-delay-2">.</span>
        </span>
      )}
      <ImageWithFallback
        src={project.imageUrl}
        alt={project.title}
        sizes={project.imageSizes}
        fill
        quality={90}
        priority={project.priority}
        onLoad={() => setIsLoaded(true)}
        onError={() => setIsLoaded(true)}
        className={`h-full w-full object-cover transition-opacity duration-300 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </button>
  );
}
