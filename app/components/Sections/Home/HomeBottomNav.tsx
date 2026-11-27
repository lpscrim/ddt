"use client";

import Link from "next/link";
import { useState } from "react";

import { ImageWithFallback } from "@/app/components/UI/Layout/ImageWithFallback";

interface ProjectCardData {
  id: number;
  title: string;
  imageUrl: string;
}

interface HomeBottomNavProps {
  projects: ProjectCardData[];
}

export function HomeBottomNav({ projects }: HomeBottomNavProps) {
  const [activeTab, setActiveTab] = useState<"about" | "contact" | "work" | null>(null);

  const tabItems: Array<{ key: "about" | "contact" | "work"; label: string }> = [
    { key: "about", label: "About" },
    { key: "contact", label: "Contact" },
    { key: "work", label: "Work" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border/0 bg-background">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-3 gap-0 bg-background px-0 sm:px-0">
        {tabItems.map((tab) => {
          const isOpen = activeTab === tab.key;

          return (
            <div
              key={tab.key}
              className={`relative border-r border-border/0 last:border-r-0 ${
                isOpen ? "bg-muted/10" : "bg-transparent"
              }`}
            >
              <button
                type="button"
                onClick={() => setActiveTab((current) => (current === tab.key ? null : tab.key))}
                className="relative flex h-14 w-full items-center justify-center overflow-hidden px-2 text-center text-[10px] uppercase tracking-[0.2em] text-foreground transition-colors duration-200 hover:text-muted-foreground"
              >
                {tab.label}
              </button>

              <div className="pointer-events-none absolute inset-x-0 bottom-14 z-10 overflow-hidden">
                <div
                  className={`transition-transform duration-500 ease-out ${
                    isOpen ? "translate-y-0" : "translate-y-[calc(100%+1rem)]"
                  }`}
                >
                  <div className="mx-2 overflow-hidden border border-border bg-background/95 shadow-[0_-8px_30px_rgba(0,0,0,0.08)]">
                    {tab.key === "about" && (
                      <div className="p-4 text-sm leading-relaxed text-foreground/80 sm:text-base">
                        I&apos;m a photographer and web developer/designer exploring landscapes,
                        architecture and culture. The relationship between space, light, and human
                        experience fascinates me, and I try to capture that through visual stories
                        shaped by both intuition and discipline.
                      </div>
                    )}

                    {tab.key === "contact" && (
                      <div className="flex flex-col gap-3 p-4 text-sm sm:text-base">
                        <a href="mailto:lpscrim@gmail.com" className="underline underline-offset-4 hover:opacity-70">
                          LPSCRIM@GMAIL.COM
                        </a>
                        <a href="https://www.instagram.com/daydreamteam/" target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:opacity-70">
                          INSTAGRAM
                        </a>
                        <a href="https://www.linkedin.com/in/lewis-scrimgeour-13389b243/" target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:opacity-70">
                          LINKEDIN
                        </a>
                      </div>
                    )}

                    {tab.key === "work" && (
                      <div className="grid grid-cols-1 gap-3 p-3 md:grid-cols-3">
                        {projects.slice(0, 3).map((project) => (
                          <Link
                            key={project.id}
                            href={`/work?project=${project.id}`}
                            className="group block overflow-hidden border border-border bg-muted/30"
                          >
                            <div className="relative aspect-[3/4] overflow-hidden">
                              <ImageWithFallback
                                src={project.imageUrl}
                                alt={project.title}
                                sizes="(min-width: 768px) 33vw, 100vw"
                                quality="auto:eco"
                                dpr={1}
                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                              />
                            </div>
                            <div className="px-3 py-2 text-[10px] uppercase tracking-[0.2em]">
                              {project.title}
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
