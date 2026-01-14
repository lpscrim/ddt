"use client";
import { useState, useEffect } from "react";
import { ImageWithFallback } from "../../UI/Layout/ImageWithFallback";

interface PhotoGalleryProps {
  images: string[];
  startIndex: number;
  onClose: () => void;
}

export function PhotoGallery({ images, startIndex, onClose }: PhotoGalleryProps) {
  const [current, setCurrent] = useState(startIndex);

  useEffect(() => {
    setCurrent(startIndex);
  }, [startIndex, images]);

  if (!images.length) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
      <button className="absolute top-4 right-4 text-white text-3xl" onClick={onClose}>&times;</button>
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-3xl"
        onClick={() => setCurrent((c) => (c > 0 ? c - 1 : images.length - 1))}
        aria-label="Previous"
      >&#8592;</button>
      <ImageWithFallback
        src={images[current]}
        alt="Full size"
        className="max-h-[90vh] max-w-[90vw] object-contain rounded shadow-lg"
      />
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-3xl"
        onClick={() => setCurrent((c) => (c < images.length - 1 ? c + 1 : 0))}
        aria-label="Next"
      >&#8594;</button>
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {images.map((img, idx) => (
          <button
            key={img + idx}
            className={`w-3 h-3 rounded-full border border-white ${idx === current ? "bg-white" : "bg-transparent"}`}
            onClick={() => setCurrent(idx)}
            aria-label={`Go to image ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
