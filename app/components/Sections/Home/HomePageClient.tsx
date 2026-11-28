"use client";

import { useState } from "react";
import { Hero } from "./Hero";
import { HomeBottomNav } from "./HomeBottomNav";
import type { getProjects } from "../../../data/projects";

interface HomePageClientProps {
  projects: Awaited<ReturnType<typeof getProjects>>;
}

export function HomePageClient({ projects }: HomePageClientProps) {
  const [mobileWorkMenuOpen, setMobileWorkMenuOpen] = useState(false);

  return (
    <main className="w-full overflow-hidden">
      <Hero mobileWorkMenuOpen={mobileWorkMenuOpen} />
      <HomeBottomNav
        projects={projects}
        onWorkMenuOpenChange={setMobileWorkMenuOpen}
      />
    </main>
  );
}
