import { useEffect, useCallback, useRef } from "react";
 
import { ImageWithFallback } from "../../UI/Layout/ImageWithFallback";
import Button from "../../UI/Layout/Button";
import { useSwipeable } from "react-swipeable";

interface PhotoModalProps {
  isOpen: boolean;
  image: string;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
  isProject: boolean;
  name: string;
  year: string;
  images?: string[];
  index?: number;
  changePhotoId?: (idx: number) => void;
}

export const PhotoModal: React.FC<PhotoModalProps> = ({
  isOpen,
  image,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
  isProject,
  name,
  year,
  images = [],
  index = 0,
  changePhotoId = () => {},
}) => {

   // Refs for thumbnails
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Center active thumbnail when index changes
  useEffect(() => {
    if (images.length > 1 && thumbRefs.current[index]) {
      thumbRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }, [index, images.length]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && hasPrev) onPrev();
      if (e.key === "ArrowRight" && hasNext) onNext();
    },
    [isOpen, onClose, onPrev, onNext, hasPrev, hasNext]
  );

    const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (hasPrev) {
        onPrev();
      }
    },
    onSwipedRight: () => {
      if (hasNext) {
        onNext();
      }
    },
    trackMouse: true,
  });

  useEffect(() => {
    if (!isOpen) return;
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 top-16 z-50 flex flex-col bg-background" {...handlers}>
      <div className="py-0 flex flex-row w-full justify-between">
        <div className="fixed text-sm sm:text-base py-2 px-6 w-full flex items-center">
          {isProject && <span className="text-foreground">{name}{' '}{year}</span> }
          {!isProject && <span className="opacity-0">{"0"}</span>}
        </div>
        <div className="flex mx-auto justify-center w-25 -mr-4 text-foreground z-60">
          <Button onClick={onClose} size="sm">
            BACK
          </Button>
        </div>
      </div>
      <div className="fixed items-center justify-center inset-0 top-17 z-50 flex ">
        {hasPrev && (
          <button
            className="absolute focus:outline-none left-0 top-1/2 -translate-y-1/2 text-foreground text-3xl h-[85svh] w-1/2"
            onClick={onPrev}
            aria-label="Previous"
          >
          </button>
        )}
        <ImageWithFallback
          src={image}
          alt="Gallery"
          width={1200}
          height={800}
          fill={false}
          className="max-h-[82vh] max-w-[90vw] object-contain rounded-xs"
        />
        {hasNext && (
          <button
            className="absolute focus:outline-none right-0 top-1/2 -translate-y-1/2 text-foreground text-3xl h-[85svh] w-1/2"
            onClick={onNext}
            aria-label="Next"
          >
          </button>
        )}
      </div>
      {/* Tiny scrollable thumbnail strip */}
      {images.length > 1 && (
        <div className="absolute bottom-0 justify-center px-4 flex overflow-x-auto w-full space-x-0 py-1 hide-scrollbar bg-background z-999">
          {images.map((img, idx) => (
            <button
              key={img + idx}
              ref={el => { thumbRefs.current[idx] = el; }}
              onClick={() => changePhotoId(idx)}
              className={` ${idx === index ? " shadow-lg" : ""} rounded-none overflow-x-hidden  focus:outline-none shrink-0`}
              style={{ width: 30, height: 40 }}
            >
              <ImageWithFallback
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                width={40}
                height={40}
                fill={false}
                className={`object-cover h-full ${idx === index ? "brightness-110" : "brightness-50"}`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
