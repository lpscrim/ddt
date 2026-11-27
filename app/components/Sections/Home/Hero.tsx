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

      <div className="absolute left-6 top-[33vh] z-10 text-lg uppercase tracking-[0.26em] text-foreground/80 sm:left-10 lg:left-16 lg:text-2xl">
        DAYDREAMTEAM
      </div>
    </section>
  );
}
