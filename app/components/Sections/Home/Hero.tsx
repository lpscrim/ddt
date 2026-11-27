'use client';

import { useEffect, useState } from "react";

export function Hero() {
  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollOffset(window.scrollY);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const backgroundShift = scrollOffset * 0.18;
  const textShift = scrollOffset * 0.38;

  return (
    <section id="home" className="min-h-svh flex flex-col justify-center items-center">
      <div className="w-full h-svh relative overflow-hidden justify-center items-center flex">
        <picture
          className="absolute inset-0 block h-full w-full"
          style={{ transform: `translate3d(0, ${backgroundShift}px, 0) scale(1.08)` }}
        >
          <img
            src="/background.webp"
            alt="Background image"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        </picture>

        <div
          className="absolute text-lg lg:text-2xl left-6 sm:left-10 lg:left-16 top-[33vh] z-10 text-foreground/75 uppercase tracking-[0.26em] font-medium leading-none drop-shadow-[0_2px_18px_rgba(0,0,0,0.25)]"
          style={{ transform: `translate3d(0, ${textShift}px, 0)` }}
        >
          DAYDREAMTEAM
        </div>
      </div>
    </section>
  );
}
