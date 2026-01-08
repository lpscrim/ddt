import { About } from "./components/Sections/About";
import { Contact } from "./components/Sections/Contact";
import { Hero } from "./components/Sections/Hero";
import { Projects } from "./components/Sections/Projects";

export default function Home() {
  return (
    <div className="flex min-h-lvh flex-col items-center justify-center p-8">
      <main>
        <Hero />
        <Projects />
        <About />
        <Contact />
      </main>
    </div>
  );
}
