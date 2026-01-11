import { ImageWithFallback } from "@/app/figma/ImageWithFallback";

interface Project {
  id: number;
  title: string;
  category: string;
  year: string;
  imageUrl: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "URBAN PAVILION",
    category: "ARCHITECTURE",
    year: "2024",
    imageUrl:
      "https://images.unsplash.com/photo-1681216868987-b7268753b81c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcmNoaXRlY3R1cmUlMjBidWlsZGluZ3xlbnwxfHx8fDE3NjA0Mjg0Mzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: 2,
    title: "MINIMAL RESIDENCE",
    category: "INTERIOR",
    year: "2024",
    imageUrl:
      "https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwaW50ZXJpb3IlMjBkZXNpZ258ZW58MXx8fHwxNzYwNDI2NDE3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: 3,
    title: "STRUCTURAL STUDY",
    category: "CONCEPT",
    year: "2023",
    imageUrl:
      "https://images.unsplash.com/photo-1603688083577-faf89b0082c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoaXRlY3R1cmFsJTIwc3RydWN0dXJlfGVufDF8fHx8MTc2MDQ1Nzc0Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: 4,
    title: "CONTEMPORARY MUSEUM",
    category: "ARCHITECTURE",
    year: "2023",
    imageUrl:
      "https://images.unsplash.com/photo-1616418534243-ab757ff8ce3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzYwNTMyMDEwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: 5,
    title: "URBAN PLAZA",
    category: "URBAN DESIGN",
    year: "2023",
    imageUrl:
      "https://images.unsplash.com/photo-1573049227581-9bdfd2069326?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1cmJhbiUyMGRlc2lnbiUyMHNwYWNlfGVufDF8fHx8MTc2MDUzNTg2NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: 6,
    title: "ABSTRACT FORM",
    category: "ART",
    year: "2022",
    imageUrl:
      "https://images.unsplash.com/photo-1596716147725-bc96cc16147d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGFyY2hpdGVjdHVyZSUyMGRldGFpbHxlbnwxfHx8fDE3NjA1MzU4Njd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
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
              <div className="relative aspect-4/5 bg-muted overflow-hidden mb-4">
                <ImageWithFallback
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </div>
              <div className="space-y-1">
                <h3 className="tracking-tight">
                  {project.title}
                </h3>
                <div className="flex gap-4 text-muted-foreground">
                  <span>[{project.category}]</span>
                  <span>{project.year}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}