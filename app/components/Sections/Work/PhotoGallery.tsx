"use client";
import { ImageWithFallback } from "../../UI/Layout/ImageWithFallback";
import Button from "../../UI/Layout/Button";
import { useState, useEffect, useRef } from "react";

interface PhotoGalleryProps {
  images: string[];
  startIndex: number;
  onClose: () => void;
  isProject?: boolean;
  name: string;
  year: string;
}

export function PhotoGallery({
  images,
  startIndex,
  onClose,
  isProject,
  name,
  year,
}: PhotoGalleryProps) {
  const [ratios, setRatios] = useState<("vertical" | "horizontal" | null)[]>(
    Array(images.length).fill(null)
  );
  const [isXL, setIsXL] = useState<boolean>(false);

  // Refs for scrolling
  const galleryRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Check if screen is XL (>=1280px)
    const checkXL = () =>
      setIsXL(window.matchMedia("(min-width: 1280px)").matches);
    checkXL();
    window.addEventListener("resize", checkXL);
    return () => window.removeEventListener("resize", checkXL);
  }, []);

  useEffect(() => {
    // Scroll to the starting image after a brief delay
    const timer = setTimeout(() => {
      if (imageRefs.current[startIndex]) {
        imageRefs.current[startIndex]?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center',
          inline: 'center'
        });
      }
    }, 300);
    
    return () => clearTimeout(timer);
  }, [startIndex]);

  if (!images.length) return null;

  // Handler to detect orientation
  const handleImgLoad = (
    idx: number,
    e: React.SyntheticEvent<HTMLImageElement>
  ) => {
    const img = e.target as HTMLImageElement;
    const orientation =
      img.naturalHeight > img.naturalWidth ? "vertical" : "horizontal";
    setRatios((r) => {
      const copy = [...r];
      copy[idx] = orientation;
      return copy;
    });
  };

  // Build rows: if two adjacent are vertical and XL, group them
  const rows: Array<Array<number>> = [];
  let i = 0;
  while (i < images.length) {
    if (isXL && ratios[i] === "vertical" && ratios[i + 1] === "vertical") {
      rows.push([i, i + 1]);
      i += 2;
    } else {
      rows.push([i]);
      i += 1;
    }
  }

  return (
    <div ref={galleryRef} className="w-full min-h-svh flex flex-col items-center py-12  bg-background">
      <div className="fixed text-sm sm:text-base py-2 px-6 w-full flex items-center">
        {isProject && <span className="text-foreground">{name}{' '}{year}</span> }
        {!isProject && <span className="opacity-0">{"0"}</span>}
      </div>
      <div className="fixed mt-0.5 flex text-center justify-end right-0 w-25">
        <div className="mx-auto justify center" >
        <Button onClick={onClose} size="sm">
          BACK
        </Button>
        </div>
      </div>
      <div className={`flex flex-col w-full items-center space-y-40 pb-32  mt-16 sm:mt-12 md:space-y-50 md:pb-16 lg:space-y-75`}>
        {rows.map((row, rIdx) => (
          <div
            key={rIdx}
            className={
              row.length === 2
                ? "flex flex-row gap-16 justify-around w-auto"
                : "w-auto flex justify-center"
            }
          >
            {row.map((idx) => (
              <div 
                key={images[idx] + idx}
                ref={(el) => { imageRefs.current[idx] = el; }}
              >
                <ImageWithFallback
                  src={images[idx]}
                  alt={`Photo ${idx + 1}`}
                  width={1200}
                  height={800}
                  fill={false}
                  className={` mx-auto h-full w-auto max-h-[90svh] object-cover`}
                  priority={idx === startIndex}
                  onLoad={(e) => handleImgLoad(idx, e)}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
