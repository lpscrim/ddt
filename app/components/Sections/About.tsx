import Image from "next/image";

export function About() {
  return (
    <section id="about" className="min-h-screen px-6 py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <p className="text-muted-foreground mb-2">[03]</p>
          <h2 className="text-3xl md:text-5xl tracking-tight">ABOUT</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          <div className="space-y-6 text-lg">
            <p>
              I`m a photographer and web developer/ designer exploring landscapes, architecture and cultures.
              The relationship between space, light, and human experience fascinates me,
              and I strive to capture these elements in my work.
            </p>
            <p>
              With a background in both architecture and design, I approach
              each project as an opportunity to blur the lines between disciplines
              and push the boundaries of conventional design thinking.
            </p>
          </div>

          <div className="flex justify-end items-center">
            <Image 
              src="/me_Sun2.svg"  
              alt="About Image 1"
              width={1600}
              height={900}
              className=" h-full w-full lg:w-4/5 rounded-xs aspect-video object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              />

          </div>
        </div>
      </div>
    </section>
  );
}
