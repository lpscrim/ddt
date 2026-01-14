"use client";
import { ImageWithFallback } from "../../UI/Layout/ImageWithFallback";

import React from "react";

interface PhotoGalleryProps {
  images: string[];
  startIndex: number;
  onClose: () => void;
}

export function PhotoGallery({ images, startIndex, onClose }: PhotoGalleryProps) {


  if (!images.length) return null;

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-background">
      <button
        className="sticky top-32 z-10 self-end mx-4 px-4 py-2 bg-black text-white rounded text-lg"
        onClick={onClose}
      >
        Close
      </button>
      <div className="flex flex-col w-full items-center space-y-32 pb-32 md:space-y-50 md:pb-16 lg:space-y-75">
        {images.map((src, idx) => (
          <div
            key={src + idx}
            className="w-full flex justify-center"
          >
            <ImageWithFallback
              src={src}
              alt={`Photo ${idx + 1}`}
              width={1200}
              height={800}
              fill={false}
              className="mx-auto h-full w-auto max-h-[92svh] object-cover"
              priority={idx === startIndex}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
