import { About } from "./components/Sections/About";
import { Contact } from "./components/Sections/Contact";
import { Hero } from "./components/Sections/Hero";
import { Projects } from "./components/Sections/Projects";

export default function Home() {
  return (
    <main className="min-h-screen w-full">
      <Hero />
      <Projects />
      <About />
      <Contact />
    </main>
  );
}
