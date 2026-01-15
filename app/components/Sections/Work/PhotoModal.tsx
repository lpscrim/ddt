import { useEffect, useCallback, useRef, useState } from "react";
 
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
  const stripRef = useRef<HTMLDivElement | null>(null);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const imageWrapRef = useRef<HTMLDivElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const lastWheelAtRef = useRef<number>(0);

  const [thumbStripTop, setThumbStripTop] = useState<number | null>(null);

  const positionThumbStrip = useCallback(() => {
    if (!isOpen) return;
    if (images.length <= 1) return;

    const stripEl = stripRef.current;
    const imageEl = imageWrapRef.current;
    if (!stripEl || !imageEl) return;

    const imageRect = imageEl.getBoundingClientRect();
    const stripRect = stripEl.getBoundingClientRect();

    // Midpoint between bottom of image and bottom of screen
    const targetCenterY = (imageRect.bottom + window.innerHeight) / 2;
    let nextTop = targetCenterY - stripRect.height / 2;

    // Keep it on-screen
    const minTop = 8;
    const maxTop = window.innerHeight - stripRect.height - 8;
    nextTop = Math.max(minTop, Math.min(maxTop, nextTop));

    setThumbStripTop(nextTop);
  }, [isOpen, images.length]);

  // Center active thumbnail when index changes
  useEffect(() => {
    if (!isOpen) return;
    if (images.length <= 1) return;

    const stripEl = stripRef.current;
    const activeThumb = thumbRefs.current[index];
    if (!stripEl || !activeThumb) return;

    const stripRect = stripEl.getBoundingClientRect();
    const thumbRect = activeThumb.getBoundingClientRect();

    const delta =
      thumbRect.left -
      stripRect.left +
      thumbRect.width / 2 -
      stripRect.width / 2;

    stripEl.scrollTo({
      left: stripEl.scrollLeft + delta,
      behavior: "smooth",
    });
  }, [index, images.length, isOpen]);

  // Reposition the strip when the modal opens, the image changes, or viewport resizes
  useEffect(() => {
    if (!isOpen) return;
    const raf = requestAnimationFrame(positionThumbStrip);
    const onResize = () => positionThumbStrip();
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [isOpen, image, positionThumbStrip]);

  const handleThumbWheel = useCallback(
    (e: WheelEvent) => {
      if (images.length < 2) return;

      // Ignore tiny trackpad noise
      if (Math.abs(e.deltaY) < 4) return;

      // Throttle so one scroll gesture = one step
      const now = performance.now();
      if (now - lastWheelAtRef.current < 120) return;
      lastWheelAtRef.current = now;

      // We want to consume the wheel (don’t scroll the page behind the modal)
      e.preventDefault();

      if (e.deltaY < 0 && index > 0) {
        changePhotoId(index - 1);
      } else if (e.deltaY > 0 && index < images.length - 1) {
        changePhotoId(index + 1);
      }
    },
    [images.length, index, changePhotoId]
  );

  useEffect(() => {
    if (!isOpen) return;
    const el = modalRef.current;
    if (!el) return;

    el.addEventListener("wheel", handleThumbWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", handleThumbWheel as EventListener);
    };
  }, [isOpen, handleThumbWheel]);

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

  const { ref: swipeableRef, ...swipeHandlers } = handlers;

  useEffect(() => {
    if (!isOpen) return;
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div
      ref={(el) => {
        modalRef.current = el;
        swipeableRef(el);
      }}
      className="fixed inset-0 top-14 z-50 flex flex-col bg-background"
      {...swipeHandlers}
    >
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
      <div className="fixed items-center justify-center inset-0 top-10 z-50 flex ">
        {hasPrev && (
          <button
            className="absolute focus:outline-none left-0 top-1/2 -translate-y-1/2 text-foreground text-3xl h-[85svh] w-1/2"
            onClick={onPrev}
            aria-label="Previous"
          >
          </button>
        )}
        <div ref={imageWrapRef}>
          <ImageWithFallback
            src={image}
            alt="Gallery"
            width={1200}
            height={800}
            fill={false}
            className="max-h-[82vh] max-w-[90vw] object-contain rounded-xs"
            onLoad={positionThumbStrip}
          />
        </div>
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
        <div 
          ref={stripRef}
          className="fixed left-0 right-0 px-4 flex items-center overflow-x-auto w-full space-x-0 py-2.5 hide-scrollbar bg-background z-999"
          style={thumbStripTop === null ? undefined : { top: thumbStripTop }}
          
        >
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
