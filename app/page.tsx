import { Suspense } from "react";
import { About } from "./components/Sections/About";
import { Contact } from "./components/Sections/Contact";
import { Hero } from "./components/Sections/Hero";
import { Projects } from "./components/Sections/Projects";
import { ProjectsSkeleton } from "./components/Sections/ProjectsSkeleton";

export default function Home() {
  return (
    <main className="min-h-lvh">
      <Hero />
      <Suspense fallback={<ProjectsSkeleton />}>
        <Projects />
      </Suspense>
      <About />
      <Contact />
    </main>
  );
}
