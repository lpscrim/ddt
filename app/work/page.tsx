import { Card } from "../components/UI/Layout/Card";
import { getProjects } from "../data/projects";

export default async function WorkPage() {
  const projects = await getProjects();

  return (
    <main>
      <section id="work" className="min-h-screen px-2 py-0">
        <div className="py-22 rounded-xs bg-foreground/60 my-1"></div>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2">
          {projects.map((project) => (
            <Card
              key={project.id}
              categories={project.categories}
              imageUrl={project.imageUrl}
              galleryImages={project.galleryImages}
              year={project.year}
              title={project.title}   
            />
          ))}
        </div>
      </section>
    </main>
  );
}
