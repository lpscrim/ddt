import { getProjects } from "./data/projects";
import { HomePageClient } from "./components/Sections/Home/HomePageClient";

export default async function Home() {
  const projects = await getProjects();

  return <HomePageClient projects={projects} />;
}
