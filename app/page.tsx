import { getProjects } from "./data/projects";
import { Hero } from "./components/Sections/Home/Hero";
import { HomeBottomNav } from "./components/Sections/Home/HomeBottomNav";

export default async function Home() {
  const projects = await getProjects({ includeGallery: false, includeText: false });

  return (
    <main className="h-[100svh] w-full overflow-hidden">
      <Hero />
      <HomeBottomNav projects={projects.slice(0, 3).map((project) => ({
        id: project.id,
        title: project.title,
        imageUrl: project.imageUrl,
      }))} />
    </main>
  );
}
