import { getProjects } from "./data/projects";
import { Hero } from "./components/Sections/Home/Hero";
import { HomeBottomNav } from "./components/Sections/Home/HomeBottomNav";

export default async function Home() {
  const projects = await getProjects();

  return (
    <main className=" w-full overflow-hidden">
      <Hero />
      <HomeBottomNav projects={projects} />
    </main>
  );
}
