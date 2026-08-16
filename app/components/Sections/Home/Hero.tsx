'use client';

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

export function Hero() {
  const heroRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? ["0%", "0%"] : ["0%", "16%"]
  );

  return (
    <section id="home" ref={heroRef} className="min-h-svh flex flex-col justify-center items-center">
      <div className="w-full h-svh relative overflow-hidden justify-center items-center flex">
        <picture className="absolute inset-0 block h-full w-full">
          <source media="(min-width: 768px)" srcSet="/tree1-hero.webp" type="image/webp" />
          <motion.img
            src="/pic1-hero.webp"
            alt="Tree background"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            style={{ y: imageY }}
            className="h-full w-full object-cover object-center will-change-transform"
          />
        </picture>

        <div className="absolute inset-0 flex items-center title justify-center text-[13vw] tracking-wide font-bold text-background z-10">
          DAYDREAMTEAM
        </div>
      </div>
    </section>
  );
}
