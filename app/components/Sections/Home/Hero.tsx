'use client';

import { motion } from 'framer-motion';

export function Hero() {
  return (
    <section id="home" className="min-h-svh flex flex-col justify-center items-center">
      <div className="w-full h-svh relative overflow-hidden justify-center items-center flex">
        <picture className="absolute inset-0 block">
          <source media="(min-width: 768px)" srcSet="/tree1-hero.webp" type="image/webp" />
          <img
            src="/pic1-hero.webp"
            alt="Tree background"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-cover object-center"
          />
        </picture>
        <motion.div
          className="absolute left-0 right-0 top-0 bg-background"
          initial={{ height: 'calc(50% - 13.5svw)' }}
          animate={{ height: 0 }}
          transition={{ duration: 2, ease: 'easeInOut', delay: 1.5 }}
        />
        <motion.div
          className="absolute left-0 right-0 bottom-0 bg-background"
          initial={{ height: 'calc(50% - 13.5svw)' }}
          animate={{ height: 0 }}
          transition={{ duration: 2, ease: 'easeInOut', delay: 1.5 }}
        />
        <motion.h2 
          className="absolute inset-0 flex items-center justify-center text-[13vw] tracking-wide font-bold text-background z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 7, delay: 0.15 }}
        >
          DAYDREAMTEAM
        </motion.h2>
      </div>
    </section>
  );
}
