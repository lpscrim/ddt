import Image from "next/image";

export function About() {
  return (
    <section id="about" className="min-h-[80svh] px-6 py-20 xl:py-26 bg-muted/30 items-center flex">
      <div className="w-full mx-auto">
        <div className="mb-16 lg:mb-32">
          <p className="text-muted-foreground mb-2">03</p>
          <h2 className="text-3xl md:text-5xl tracking-tight ">ABOUT</h2>
        </div>

        <div className="mb-32 max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
          <div className="space-y-6 text-lg">
            <p>
              I`m a photographer and web developer/ designer exploring landscapes, architecture and cultures.
              The relationship between space, light, and human experience fascinates me,
              and I strive to capture these elements in my work.
            </p>
            <p>
              Drawing from my experience in architecture and design, I see every
              project as a chance to bridge creative disciplines and challenge
              traditional approaches to visual storytelling.
            </p>
          </div>

          <div className="flex justify-end items-center">
            <Image 
              src="/Me_Sun2.svg"  
              alt="About Image 1"
              width={1600}
              height={900}
              className=" h-full w-full lg:w-4/5 rounded-xs aspect-4/3 object-cover grayscale"
              />

          </div>
        </div>
      </div>
    </section>
  );
} 
