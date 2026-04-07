'use client'
import { useState } from 'react'
import { CldImage } from 'next-cloudinary'

const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg=='

interface ImageWithFallbackProps {
  src: string;  // Cloudinary public ID
  alt: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  unoptimized?: boolean;
  quality?: number | string;
  format?: string;
  dpr?: number | string;
  onLoad?: (e: React.SyntheticEvent<HTMLImageElement>) => void;
}

export function ImageWithFallback({
  src,
  alt,
  className,
  fill = true,
  width,
  height,
  sizes,
  priority = false,
  unoptimized = true,
  quality,
  format,
  dpr,
  onLoad,
  ...rest
}: ImageWithFallbackProps) {
  const [didError, setDidError] = useState(false)

  const handleError = () => {
    setDidError(true)
  }

  if (didError) {
    return (
      <div
        className={`inline-block bg-gray-100 text-center align-middle ${className ?? ''}`}
      >
        <div className="flex items-center justify-center w-full h-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={ERROR_IMG_SRC} alt="Error loading image" data-original-url={src} />
        </div>
      </div>
    )
  }

  const computedSizes =
    sizes ?? (fill ? '100vw' : width ? `${width}px` : undefined)

  // Cloudinary automatic delivery optimizations.
  // - format="auto" enables WebP/AVIF when supported
  // - quality="auto" lets Cloudinary pick a good compression level
  // - dpr="auto" serves crisp images without overshooting bytes
  const computedFormat = format ?? 'auto'
  const computedQuality = quality ?? 'auto'
  const computedDpr = dpr ?? 'auto'

  return (
    <CldImage
      src={src}
      alt={alt}
      className={className}
      fill={fill}
      width={!fill ? width : undefined}
      height={!fill ? height : undefined}
      sizes={computedSizes}
      format={computedFormat}
      quality={computedQuality}
      dpr={computedDpr}
      preload={priority}
      loading={priority ? 'eager' : 'lazy'}
      unoptimized={unoptimized}
      placeholder="empty"
      onLoad={onLoad}
      onError={handleError}
      {...rest}
    />
  )
}
