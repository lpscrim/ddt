export function About() {
  return (
    <section id="about" className="min-h-screen px-6 py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <p className="text-muted-foreground mb-2">[03]</p>
          <h2 className="text-3xl md:text-5xl tracking-tight">ABOUT</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          <div className="space-y-6">
            <p>
              I'm a designer and architect exploring the boundaries between built
              environment and artistic expression. My work investigates how spaces
              can evoke emotion, challenge perception, and create meaningful
              experiences.
            </p>
            <p>
              With a background in both architecture and fine arts, I approach
              each project as an opportunity to blur the lines between disciplines
              and push the boundaries of conventional design thinking.
            </p>
          </div>

          <div className="space-y-8">
            <div>
              <p className="text-muted-foreground mb-4">[EDUCATION]</p>
              <div className="space-y-2">
                <p>M.ARCH, YALE SCHOOL OF ARCHITECTURE / 2018</p>
                <p>B.F.A, RHODE ISLAND SCHOOL OF DESIGN / 2015</p>
              </div>
            </div>

            <div>
              <p className="text-muted-foreground mb-4">[RECOGNITION]</p>
              <div className="space-y-2">
                <p>AIA YOUNG ARCHITECTS AWARD / 2023</p>
                <p>ARCHITIZER A+ AWARDS FINALIST / 2022</p>
                <p>DESIGN VANGUARD / 2021</p>
              </div>
            </div>

            <div>
              <p className="text-muted-foreground mb-4">[CLIENTS]</p>
              <div className="space-y-2">
                <p>MOMA, NEW MUSEUM, PRIVATE COLLECTORS</p>
                <p>VARIOUS INSTITUTIONAL & COMMERCIAL</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
