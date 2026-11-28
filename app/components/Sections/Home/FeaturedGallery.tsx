"use client";

import { useState } from "react";

import { ImageWithFallback } from "@/app/components/UI/Layout/ImageWithFallback";
import { PhotoModal } from "@/app/components/Sections/Work/PhotoModal";

interface FeaturedGalleryProps {
  images: string[];
}

export function FeaturedGallery({ images }: FeaturedGalleryProps) {
  const visibleImages = images.slice(0, 6);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  if (!visibleImages.length) {
    return null;
  }

  const selectedImage = visibleImages[activeIndex] ?? visibleImages[0];

  return (
    <section id="work" className="min-h-screen px-2 sm:px-3">
      <div className="mx-auto">
        <div className="grid grid-cols-3 gap-1">
          {visibleImages.map((src, index) => (
            <button
              key={`${src}-${index}`}
              type="button"
              className="relative h-[220px] overflow-hidden bg-muted cursor-crosshair text-left sm:h-[260px] lg:h-[300px]"
              onClick={() => {
                setActiveIndex(index);
                setOpen(true);
              }}
              aria-label={`Open featured image ${index + 1}`}
            >
              <ImageWithFallback
                src={src}
                alt="Featured work"
                sizes="(min-width: 1280px) 16vw, (min-width: 768px) 25vw, 50vw"
                quality="auto:eco"
                dpr={1}
                className="h-full w-auto object-contain"
              />
            </button>
          ))}
        </div>
      </div>

      <PhotoModal
        isOpen={open}
        image={selectedImage}
        images={visibleImages}
        index={activeIndex}
        onClose={() => setOpen(false)}
        onPrev={() => setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev))}
        onNext={() => setActiveIndex((prev) => (prev < visibleImages.length - 1 ? prev + 1 : prev))}
        hasPrev={activeIndex > 0}
        hasNext={activeIndex < visibleImages.length - 1}
        isProject={false}
        name=""
        year=""
        text=""
        changePhotoId={setActiveIndex}
      />
    </section>
  );
}
