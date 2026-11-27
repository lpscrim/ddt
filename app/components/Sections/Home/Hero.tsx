import Image from "next/image";

export function Hero() {
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

      <div className="absolute left-6 top-[30vh] z-10 text-lg uppercase tracking-[0.26em] text-foreground/90 sm:left-10 lg:left-16 lg:text-2xl">
        <span className="text-foreground/80">D</span>
        <span className="text-foreground/70">A</span>
        <span className="text-foreground/60">Y</span>
        <span className="text-foreground/70">D</span>
        <span className="text-foreground/80">R</span>
        <span className="text-foreground/70">E</span>
        <span className="text-foreground/60">A</span>
        <span className="text-foreground/50">M</span>
        <span className="text-foreground/45">T</span>
        <span className="text-foreground/40">E</span>
        <span className="text-foreground/35">A</span>
        <span className="text-foreground/30">M</span>
      </div>
    </section>
  );
}
