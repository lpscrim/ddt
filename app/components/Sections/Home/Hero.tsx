import Image from "next/image";

interface HeroProps {
  mobileWorkMenuOpen?: boolean;
}

export function Hero({ mobileWorkMenuOpen = false }: HeroProps) {
  return (
    <section id="home" className="relative h-svh overflow-hidden">
      <Image
        src="/background.webp"
        alt="Background image"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      <div className="absolute inset-0 bg-background/5" />

      <h1
        className={`title absolute z-10 uppercase tracking-[0.4em] text-foreground/90 transition-[left,top,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          mobileWorkMenuOpen
            ? "left-1/2 top-[calc(14svh-20px)] text-xl -translate-x-1/2 text-center"
            : "left-6 top-[30vh] text-xl sm:left-10 lg:left-12 lg:text-2xl"
        }`}
      >
        <span className="text-foreground/80 hero-letter">D</span>
        <span className="text-foreground/70 hero-letter">A</span>
        <span className="text-foreground/60 hero-letter">Y</span>
        <span className="text-foreground/70 hero-letter">D</span>
        <span className="text-foreground/80 hero-letter">R</span>
        <span className="text-foreground/70 hero-letter">E</span>
        <span className="text-foreground/60 hero-letter">A</span>
        <span className="text-foreground/50 hero-letter">M</span>
        <span className="text-foreground/45 hero-letter">T</span>
        <span className="text-foreground/40 hero-letter">E</span>
        <span className="text-foreground/35 hero-letter">A</span>
        <span className="text-foreground/30 hero-letter">M</span>
      </h1>
    </section>
  );
}
