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
  text?: string;
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
  text,
  images = [],
  index = 0,
  changePhotoId = () => {},
}) => {
  // Refs for thumbnails
  const stripRef = useRef<HTMLDivElement | null>(null);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const lastWheelAtRef = useRef<number>(0);

  // Loading progress bar ied to load event;)
  const [loadProgress, setLoadProgress] = useState(0);
  const [showLoadProgress, setShowLoadProgress] = useState(false);
  const [textOpen, setTextOpen] = useState(false);
  const progressTimerRef = useRef<number | null>(null);
  const progressHideTimerRef = useRef<number | null>(null);
  const progressStartedForImageRef = useRef<string | null>(null);

  const startProgress = useCallback(() => {
    if (progressTimerRef.current !== null) {
      window.clearInterval(progressTimerRef.current);
      progressTimerRef.current = null;
    }
    if (progressHideTimerRef.current !== null) {
      window.clearTimeout(progressHideTimerRef.current);
      progressHideTimerRef.current = null;
    }

    setShowLoadProgress(true);
    setLoadProgress(6);

    // Fake progress: climb quickly to ~85%, then slow.
    progressTimerRef.current = window.setInterval(() => {
      setLoadProgress((p) => {
        if (p >= 92) return p;
        const step = p < 60 ? 9 : p < 80 ? 4 : 1;
        return Math.min(92, p + step);
      });
    }, 120);
  }, []);

  const finishProgress = useCallback(() => {
    if (progressTimerRef.current !== null) {
      window.clearInterval(progressTimerRef.current);
      progressTimerRef.current = null;
    }
    setLoadProgress(100);
    progressHideTimerRef.current = window.setTimeout(() => {
      setShowLoadProgress(false);
      setLoadProgress(0);
      progressHideTimerRef.current = null;
    }, 250);
  }, []);

  useEffect(() => {
    return () => {
      if (progressTimerRef.current !== null) {
        window.clearInterval(progressTimerRef.current);
        progressTimerRef.current = null;
      }
      if (progressHideTimerRef.current !== null) {
        window.clearTimeout(progressHideTimerRef.current);
        progressHideTimerRef.current = null;
      }
    };
  }, []);

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

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    stripEl.scrollTo({
      left: stripEl.scrollLeft + delta,
      behavior: isMobile || reducedMotion ? "auto" : "smooth",
    });
  }, [index, images.length, isOpen]);

  const startProgressIfNeeded = useCallback(() => {
    if (!image) return;
    if (progressStartedForImageRef.current === image) return;
    progressStartedForImageRef.current = image;
    startProgress();
  }, [image, startProgress]);

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
      if (hasNext) {
        onNext();
      }
    },
    onSwipedRight: () => {
      if (hasPrev) {
        onPrev();
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
      className="fixed inset-0 top-8 z-50 flex flex-col bg-background"
      {...swipeHandlers}
    >
        {showLoadProgress && (
            <div className="absolute left-6 right-6 top-[3.5vh] z-999 h-0.5 bg-foreground/20 overflow-hidden ">
              <div
                className="h-full bg-foreground transition-[width] duration-150 ease-out"
                style={{ width: `${loadProgress}%` }}
              />
            </div>
          )}
      <div className="relative z-100 flex w-full shrink-0 flex-row justify-between bg-background py-0">
        <div className="flex py-2 px-2 w-full items-center z-100">
          {isProject && (
            <span className="text-foreground text-xs">
              {name} {year}
            </span>
          )}
          {!isProject && <span className="opacity-0">{"0"}</span>}
        </div>
        <div className="flex flex-row  w-30">
            <div className="flex justify-center w-21 -mr-4 text-foreground z-100">
              {isProject && text && (
              <Button onClick={() => setTextOpen(!textOpen)} size="xs">
                Text
              </Button>
                        )}
            </div>
          <div className="flex justify-center w-23 md:w-23 text-foreground z-100">
            <Button onClick={onClose} size="xs">
              Back
            </Button>
          </div>
        </div>
      </div>
      {isProject && text && (
        <div
          className={` flex w-full border-b border-muted z-90 py-4 bg-background items-center -translate-y-100 opacity-0 ${
            textOpen ? "translate-y-0 opacity-100" : ""
          }  transition-all duration-300 ease-in-out overflow-y-auto z-40`}
        >
          <div
            className={`max-w-3xl mx-auto px-2 text-center text-sm text-foreground `}
          >
            <p className="whitespace-pre-line">{text}</p>
          </div>
        </div>
      )}
      <div className="fixed inset-x-0 top-20 bottom-16 z-60 flex items-center justify-center overflow-hidden">
        {hasPrev && (
          <button
            className="absolute z-80 focus:outline-none left-0 top-1/2 -translate-y-1/2 h-[85svh] w-[12vw] min-w-[64px] max-w-[120px]"
            style={{
              cursor: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Cpath d='M30 10 16 24l14 14' fill='none' stroke='%23f5f5f5' stroke-width='1.75' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\") 24 24, auto",
            }}
            onClick={() => {
              startProgress();
              onPrev();
            }}
            aria-label="Previous"
          />
        )}
        <div
          ref={() => {
            // Start the progress bar when the modal mounts or when the image element remounts.
            // (Avoids setState-in-effect lint while still reacting to image changes.)
            startProgressIfNeeded();
          }}
          className="flex h-full w-full px-1 items-center justify-center"
        >
        
          <ImageWithFallback
            src={image}
            alt="Gallery"
            width={1200}
            height={800}
            fill={false}
            sizes="90vw"
            className="max-h-full object-contain"
            onLoad={finishProgress}
          />
        </div>
        {hasNext && (
          <button
            className="absolute z-80 focus:outline-none right-0 top-1/2 -translate-y-1/2 h-[85svh] w-[12vw] min-w-[64px] max-w-[120px]"
            style={{
              cursor: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Cpath d='M18 10l14 14-14 14' fill='none' stroke='%23f5f5f5' stroke-width='1.75' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\") 24 24, auto",
            }}
            onClick={() => {
              startProgress();
              onNext();
            }}
            aria-label="Next"
          />
        )}
      </div>
      {images.length > 1 && (
        <div
          ref={stripRef}
          className="fixed bottom-0 left-0 right-0 z-999 flex w-full items-center overflow-x-auto space-x-0 bg-background px-1 py-2.5 hide-scrollbar"
        >
          {images.map((img, idx) => (
            <button
              key={img + idx}
              ref={(el) => {
                thumbRefs.current[idx] = el;
              }}
              onClick={() => changePhotoId(idx)}
              className={`transition-transform duration-300 ease-out hover:-translate-y-0.5 focus:outline-none shrink-0 rounded-none overflow-x-hidden ${
                idx === index ? "shadow-lg -translate-y-0.5" : "opacity-80"
              }`}
              style={{ width: 30, height: 40 }}
            >
              <ImageWithFallback
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                width={40}
                height={40}
                fill={false}
                sizes="40px"
                className={`object-cover h-full transition-all duration-300 ease-out ${
                  idx === index ? "brightness-110" : "brightness-50 hover:brightness-90"
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
