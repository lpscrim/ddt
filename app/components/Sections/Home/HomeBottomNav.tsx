"use client";

import { useState } from "react";
import { WorkGallery } from "../Work/WorkGallery";

interface ProjectCardData {
  id: number;
  title: string;
  categories: string[];
  year: string;
  imageUrl: string;
  galleryImages?: string[];
  text?: string;
}

interface HomeBottomNavProps {
  projects: ProjectCardData[];
}

export function HomeBottomNav({ projects }: HomeBottomNavProps) {
  const [activeTab, setActiveTab] = useState<"about" | "contact" | "work" | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const tabItems: Array<{ key: "about" | "contact" | "work"; label: string }> = [
        { key: "work", label: "Work" },
    { key: "about", label: "About" },
    { key: "contact", label: "Contact" },

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
        <div className="flex flex-col mx-auto max-w-xl justify-center gap-4 p-4 text-sm sm:text-base pt-4">

          
          <div className="flex flex-col gap-2 pt-3 text-xs tracking-[0.2em] text-foreground/80">
            <a href="mailto:lpscrim@proton.me" className="flex items-center justify-between gap-2 hover:opacity-70">
              <span>lpscrim@proton.me</span>
            </a>
            <a href="https://www.instagram.com/daydreamteam/" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-2 hover:opacity-70">
              <span>@daydreamteam</span>
            </a>
          </div>
                <p className="text-muted-foreground lowercase text-xs">© {new Date().getFullYear()} LEWIS SCRIMGEOUR. ALL RIGHTS RESERVED.</p>

        </div>
      );
    }

    return (
      <div className="h-[70svh] overflow-y-auto overscroll-contain">
        <WorkGallery
          projects={projects}
          allPhotos={projects.flatMap((project) => [
            project.imageUrl,
            ...(project.galleryImages ?? []),
          ])}
        />
      </div>
    );
  };

  return (
    <>
      <div className="hidden lg:block">
        {activeTab && (
          <button
            type="button"
            aria-label="Close desktop menu"
            onClick={closeAllMenus}
            className="fixed inset-0 z-10 cursor-default bg-transparent"
          />
        )}

        <div className="fixed bottom-0 left-0 right-0 z-20 -/70 bg-background">
          <div className="mx-auto grid w-full grid-cols-3 bg-background">
            {tabItems.map((tab) => {
              const isOpen = activeTab === tab.key;

              return (
                <div
                  key={tab.key}
                  className={`relative -l -/70 first:-l-0 ${
                    isOpen ? "bg-muted" : "bg-background"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setActiveTab((current) => (current === tab.key ? null : tab.key))}
                    className="relative z-30 flex h-10 w-full"
                  >
                  </button>

                  <div
                    className={`pointer-events-none absolute inset-x-0 bottom-full z-40 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isOpen ? "pointer-events-auto translate-y-0" : "translate-y-[100%]"
                    }`}
                  >
                    <div className="mx-0 overflow-hidden  bg-background shadow-[0_-6px_20px_rgba(0,0,0,0.06)]">
                      <div className="-b -/70 bg-background px-4 py-2.5 text-xs uppercase tracking-[0.28em] text-foreground/80">
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

      <div className="lg:hidden">
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
              className="flex h-[46px] w-full cursor-pointer items-center pl-[15px] text-left text-xs uppercase tracking-[0.2em] text-foreground"
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
                  <div key={tab.key} className="-b -/70 bg-background last:-b-0">
                    <div className={`relative flex h-[46px] w-full items-center`}>
                      <button
                        type="button"
                        onClick={() => {
                          setActiveTab((current) => (current === tab.key ? null : tab.key));
                          setMobileMenuOpen(true);
                        }}
                        className="flex h-full flex-1 items-center pl-[15px] text-left text-xs uppercase tracking-[0.2em] text-foreground"
                      >
                        <span>{ mobileMenuOpen ? tab.label : "menu"}</span>
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
                      className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className={`bg-background ${mobileMenuOpen ? 'h-[70vh]' : ''}`}>{renderMenuContent(tab)}</div>
                      </div>
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
