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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const tabItems: Array<{ key: "about" | "contact" | "work"; label: string }> = [
    { key: "about", label: "About" },
    { key: "contact", label: "Contact" },
    { key: "work", label: "Work" },
  ];

  const closeAllMenus = () => {
    setMobileMenuOpen(false);
    setActiveTab(null);
  };

  const renderMenuContent = (tab: { key: "about" | "contact" | "work"; label: string }) => {
    if (tab.key === "about") {
      return (
        <div className="p-4 text-sm leading-relaxed text-foreground/80 sm:text-base">
          I&apos;m a photographer and web developer/designer exploring landscapes,
          architecture and culture. The relationship between space, light, and human
          experience fascinates me, and I try to capture that through visual stories
          shaped by both intuition and discipline.
        </div>
      );
    }

    if (tab.key === "contact") {
      return (
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
      );
    }

    return (
      <div className="grid grid-cols-2 gap-3 p-3 md:grid-cols-3 ">
        {projects.slice(0, 3).map((project) => (
          <Link
            key={project.id}
            href={`/work?project=${project.id}`}
            className="group block overflow-hidden border border-border bg-muted/30"
          >
            <div className="relative aspect-4/5 md:aspect-3/4  overflow-hidden">
              <ImageWithFallback
                src={project.imageUrl}
                alt={project.title}
                sizes="(min-width: 768px) 33vw, 100vw"
                quality="auto:eco"
                dpr={1}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              />
            </div>

          </Link>
        ))}
        <Link
          href="/work"
          className="col-span-3 text-center z-65 text-xs"
        >
          View More Projects
        </Link>
      </div>
    );
  };

  return (
    <>
      <div className="hidden sm:block">
        {activeTab && (
          <button
            type="button"
            aria-label="Close desktop menu"
            onClick={closeAllMenus}
            className="fixed inset-0 z-30 bg-transparent"
          />
        )}

        <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border/70 bg-background">
          <div className="mx-auto grid w-full grid-cols-3 bg-background">
            {tabItems.map((tab) => {
              const isOpen = activeTab === tab.key;

              return (
                <div
                  key={tab.key}
                  className={`relative border-l border-border/70  first:border-l-0 ${
                    isOpen ? "bg-muted/10" : "bg-transparent"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setActiveTab((current) => (current === tab.key ? null : tab.key))}
                    className="relative z-20 flex h-10 w-full items-center justify-center overflow-hidden px-2 text-center text-[10px] uppercase tracking-[0.2em] text-foreground transition-colors duration-200 hover:text-muted-foreground"
                  >
                  </button>

                  <div
                    className={`pointer-events-none absolute inset-x-0 bottom-full z-10 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isOpen ? "pointer-events-auto translate-y-0" : "translate-y-[100%]"
                    }`}
                  >
                    <div className="mx-0 overflow-hidden border border-border bg-background shadow-[0_-6px_20px_rgba(0,0,0,0.06)]">
                      <div className="border-b border-border/70 bg-background px-4 py-2.5 text-[10px] uppercase tracking-[0.28em] text-foreground/80">
                        {tab.label}
                      </div>

                      {renderMenuContent(tab)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="sm:hidden">
        <div className="pointer-events-none fixed inset-0 z-40">
          {mobileMenuOpen && (
            <button
              type="button"
              aria-label="Close mobile menu"
              onClick={() => {
                setMobileMenuOpen(false);
                setActiveTab(null);
              }}
              className="pointer-events-auto absolute inset-0 z-[60] bg-transparent"
            />
          )}

          <div className="pointer-events-auto fixed bottom-0 left-0 right-0 z-[55] bg-background">
            <button
              id="mobile-home-menu-trigger"
              type="button"
              onClick={() => {
                setMobileMenuOpen((current) => !current);
                if (mobileMenuOpen) setActiveTab(null);
              }}
              className="flex h-[46px] w-full cursor-pointer items-center pl-[15px] text-left text-[10px] uppercase tracking-[0.2em] text-foreground"
            >
              {mobileMenuOpen ? "Close" : "Menu"}
            </button>
          </div>

          <div
            id="mobile-home-menu-panel"
            className={`pointer-events-auto fixed bottom-0 left-0 right-0 z-[60] overflow-hidden bg-background transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              mobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-[calc(100%-46px)] opacity-100"
            }`}
          >
            <div className="flex max-h-[calc(100svh-46px)] flex-col overflow-y-auto">
              {tabItems.map((tab) => {
                const isOpen = activeTab === tab.key;

                return (
                  <div key={tab.key} className="border-b border-border/70 bg-background last:border-b-0">
                    <div className={`relative flex h-[46px] w-full items-center`}>
                      <button
                        type="button"
                        onClick={() => {
                          setActiveTab((current) => (current === tab.key ? null : tab.key));
                          setMobileMenuOpen(true);
                        }}
                        className="flex h-full flex-1 items-center pl-[15px] text-left text-[10px] uppercase tracking-[0.2em] text-foreground"
                      >
                        <span>{tab.label}</span>
                      </button>

                      <button
                        type="button"
                        aria-label={isOpen ? `Close ${tab.label}` : `Open ${tab.label}`}
                        onClick={(event) => {
                          event.stopPropagation();
                          if (isOpen) {
                            setActiveTab(null);
                            setMobileMenuOpen(false);
                            return;
                          }

                          setActiveTab(tab.key);
                          setMobileMenuOpen(true);
                        }}
                        className="flex h-full w-[46px] items-center justify-end pr-[15px] text-right text-[18px] leading-none text-foreground"
                      >
                        <span
                          className={`block transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                            isOpen ? "rotate-45" : "rotate-0"
                          }`}
                          aria-hidden="true"
                        >
                          +
                        </span>
                      </button>
                    </div>

                    <div
                      className={`overflow-hidden ${mobileMenuOpen ? 'h-[50vh]' : ''} transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        isOpen ? "max-h-[75vh] opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="bg-background">{renderMenuContent(tab)}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
