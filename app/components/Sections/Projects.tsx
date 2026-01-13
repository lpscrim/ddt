import { ImageWithFallback } from "@/app/figma/ImageWithFallback";
import { getProjects } from "@/app/data/projects";

const projects = getProjects();


export function Projects() {
  return (
    <section id="work" className="min-h-screen px-6 py-24">
      <div className=" mx-auto">
        <div className="mb-16">
          <p className="text-muted-foreground mb-2">02</p>
          <h2 className="text-3xl md:text-5xl tracking-tight">
            SELECTED WORKS
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.sort((a,b) => a.id - b.id).slice(0, 6).map((project) => (
            <div
              key={project.id}
              className="group cursor-crosshair"
            >
              <div className="relative aspect-4/5 bg-muted overflow-hidden mb-4 rounded-xs">
                <ImageWithFallback
                  src={project.imageUrl}
                  alt={project.title}
                  className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${project.categories.includes('COLOUR') ? 'grayscale group-hover:grayscale-0' : ''}`}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </div>
              <div className="space-y-1">
                <h3 className="tracking-tight">
                  {project.title}
                </h3>
                <div className="flex gap-4 text-muted-foreground">
                  <span>[{project.categories.map(category => category).join(', ')}]</span>
                  <span>{project.year}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-24 text-center  ">
          <button className="cursor-crosshair text-muted-foreground hover:text-foreground text-xl mg:text-2xl py-2 px-6 rounded-xs transition-all duration-550 group"><span className="group-hover:px-1 transition-all duration-500">[</span> MORE <span className="group-hover:px-1 transition-all duration-500">]</span>
          </button>
        </div>
      </div>
    </section>
  );
}