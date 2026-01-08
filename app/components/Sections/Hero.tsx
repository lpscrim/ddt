export function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-4xl w-full">
        <div className="space-y-8">
          <div className="space-y-2">
            <p className="text-muted-foreground">[DESIGNER / ARCHITECT]</p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl tracking-tight">
              CREATING SPACES
              <br />
              THAT INSPIRE
            </h1>
          </div>
          <p className="text-muted-foreground max-w-2xl">
            Multidisciplinary designer focused on the intersection of architecture,
            art, and human experience. Based in New York, working globally.
          </p>
          <div className="flex gap-4 pt-4">
            <span className="text-muted-foreground">[01]</span>
            <span className="text-muted-foreground">[SCROLL DOWN]</span>
          </div>
        </div>
      </div>
    </section>
  );
}
