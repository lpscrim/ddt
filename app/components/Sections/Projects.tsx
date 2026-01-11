import { ImageWithFallback } from "@/app/figma/ImageWithFallback";

interface Project {
  id: number;
  title: string;
  categories: string[];
  year: string;
  imageUrl: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "LUNAR EXPLORATION",
    categories: ["IR", "LANDSCAPE", "ART"],
    year: "2024",
    imageUrl:
    "/photos/photo (1).webp",
  },
  {
    id: 2,
    title: "MINIMAL RESIDENCE",
    categories: [ "IR", "ARCHITECTURE"],
    year: "2024",
    imageUrl:
    "/photos/photo (10).webp",
  },
  {
    id: 3,
    title: "GLACIAL WOOD",
    categories: ["IR", "TREES"],
    year: "2023",
    imageUrl:
    "/photos/photo (3).webp",
  },
  {
    id: 4,
    title: "MISTY MOUNTAINS",
    categories: ["B+W", "LANDSCAPE"],
    year: "2023",
    imageUrl:
    "/photos/photo (9).webp",
  },
  {
    id: 5,
    title: "ETHEREAL CLOUDS",
    categories: ["IR", "LANDSCAPE", "ART"],
    year: "2023",
    imageUrl:
    "/photos/photo (11).webp",
  },
  {
    id: 6,
    title: "MONOCHROME MIST",
    categories: ["ART", "B+W"],
    year: "2022",
    imageUrl:
    "/photos/photo (8).webp",
  },
];

export function Projects() {
  return (
    <section id="work" className="min-h-screen px-6 py-24">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <p className="text-muted-foreground mb-2">[02]</p>
          <h2 className="text-3xl md:text-5xl tracking-tight">
            SELECTED WORKS
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group cursor-pointer"
            >
              <div className="relative aspect-4/5 bg-muted overflow-hidden mb-4 rounded-xs">
                <ImageWithFallback
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500  group-hover:scale-105"
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
          <button className="cursor-pointer text-muted-foreground hover:text-foreground text-xl py-1 px-4 hover:shadow-lg hover:bg-foreground/1 rounded-xs transition-all duration-150 hover:-translate-y-px active:translate-y-1">MORE
          </button>
        </div>
      </div>
    </section>
  );
}