'use client';


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

        <div
          className="absolute inset-0 flex items-center title justify-center text-[13vw] tracking-wide font-bold text-background z-10"

        >
          DAYDREAMTEAM
        </div>
      </div>
    </section>
  );
}
