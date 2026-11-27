export function Hero() {
  return (
    <section id="home" className="relative h-[100svh] overflow-hidden">
      <img
        src="/background.webp"
        alt="Background image"
        loading="eager"
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      <div className="absolute inset-0 bg-background/5" />

      <div className="absolute left-6 top-[33vh] z-10 text-lg uppercase tracking-[0.26em] text-foreground/80 sm:left-10 lg:left-16 lg:text-2xl">
        DAYDREAMTEAM
      </div>
    </section>
  );
}
