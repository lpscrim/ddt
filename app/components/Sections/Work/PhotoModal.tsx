
import React, { useEffect, useCallback } from "react";
import { ImageWithFallback } from "../../UI/Layout/ImageWithFallback";

interface PhotoModalProps {
  isOpen: boolean;
  image: string;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}

export const PhotoModal: React.FC<PhotoModalProps> = ({
  isOpen,
  image,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && hasPrev) onPrev();
      if (e.key === "ArrowRight" && hasNext) onNext();
    },
    [isOpen, onClose, onPrev, onNext, hasPrev, hasNext]
  );

  useEffect(() => {
    if (!isOpen) return;
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-lg">
      <button
        className="absolute top-4 right-4 text-white text-2xl"
        onClick={onClose}
        aria-label="Close"
      >
        ×
      </button>
      {hasPrev && (
        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-3xl"
          onClick={onPrev}
          aria-label="Previous"
        >
          ‹
        </button>
      )}
      <ImageWithFallback
        src={image}
        alt="Gallery"
        width={1200}
        height={800}
        fill={false}
        className="max-h-[80vh] max-w-[90vw] rounded shadow-lg object-contain"
      />
      {hasNext && (
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-3xl"
          onClick={onNext}
          aria-label="Next"
        >
          ›
        </button>
      )}
    </div>
  );
};
