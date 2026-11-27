export function Hero() {
  return (
    <section id="home" className="min-h-svh flex flex-col justify-center items-center">
      <div className="w-full h-svh relative overflow-hidden justify-center items-center flex">
        <picture className="absolute inset-0 block h-full w-full">
          <img
            src="/background.webp"
            alt="Background image"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        </picture>

        <div className="absolute text-lg lg:text-2xl left-6 sm:left-10 lg:left-16 top-[33vh] z-10 text-foreground/75 uppercase tracking-[0.26em] font-medium leading-none drop-shadow-[0_2px_18px_rgba(0,0,0,0.25)]">
          DAYDREAMTEAM
        </div>
      </div>
    </section>
  );
}
