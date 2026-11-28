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
  const [desktopOpenTabs, setDesktopOpenTabs] = useState<
    Set<"about" | "contact" | "work">
  >(() => new Set());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const tabItems: Array<{ key: "about" | "contact" | "work"; label: string }> = [
    { key: "work", label: "Work" },
    { key: "about", label: "About" },
    { key: "contact", label: "Contact" },

  ];

  const closeAllMenus = () => {
    setMobileMenuOpen(false);
    setActiveTab(null);
    setDesktopOpenTabs(new Set());
  };

  const toggleDesktopTab = (tab: "about" | "contact" | "work") => {
    setDesktopOpenTabs((current) => {
      const next = new Set(current);

      if (next.has(tab)) {
        next.delete(tab);
      } else {
        next.add(tab);
      }

      return next;
    });
  };

  const renderMenuContent = (tab: { key: "about" | "contact" | "work"; label: string }) => {
    if (tab.key === "about") {
      return (
        <div className="px-2 md:px-4 lg:px-2 mx-auto text-xs lg:text-xs leading-relaxed lg:text-justify text-left text-hyphens-auto text-foreground/80">
          Lewis Scrimgeour is a photographer and web designer exploring
          landscape, architecture and culture. His work examines the relationships
          between space, light and human experience, translating them into considered
          visual stories shaped by both intuition and precision.
        </div>
      );
    }

    if (tab.key === "contact") {
      return (
        <div className="flex flex-col mx-auto gap-4 p-2 text-xs">

          
          <div className="flex flex-col gap-2 pt-3  tracking-[0.2em] text-foreground/80">
            <a href="mailto:lpscrim@proton.me" className="flex items-center justify-between gap-2 hover:opacity-70">
              <span>lpscrim@proton.me</span>
            </a>
            <a href="https://www.instagram.com/daydreamteam/" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-2 hover:opacity-70">
              <span>@daydreamteam</span>
            </a>
          </div>
                <p className="text-muted-foreground lowercase ">© {new Date().getFullYear()} LEWIS SCRIMGEOUR. ALL RIGHTS RESERVED.</p>

        </div>
      );
    }

    return (
      <div className="work-drawer-scroll h-full overflow-y-auto overscroll-contain">
        {(activeTab === "work" || desktopOpenTabs.has("work")) && (
          <WorkGallery
            projects={projects}
            allPhotos={projects.flatMap((project) => [
              project.imageUrl,
              ...(project.galleryImages ?? []),
            ])}
          />
        )}
      </div>
    );
  };

  return (
    <>
      <div className="hidden lg:block">

        <div className="fixed bottom-0 left-0 right-0 z-60 bg-background/80">
          <div className="mx-auto grid w-full grid-cols-6 bg-background">
            {[...tabItems].reverse().map((tab) => {
              const isOpen = desktopOpenTabs.has(tab.key);

              return (
                <div
                  key={tab.key}
                  className={`relative  ${
                    tab.key === "work" ? "col-span-4" : "col-span-1"
                  } ${isOpen ? "bg-muted" : "bg-background"}`}
                >
                  <div className="h-8 w-full" />

                  <div
                    className={`absolute inset-x-0 bottom-full z-40 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isOpen
                        ? "pointer-events-auto translate-y-0"
                        : "pointer-events-none translate-y-[100%]"
                    }`}
                  >
                    <div className="mx-0 overflow-hidden bg-background shadow-[0_-6px_20px_rgba(0,0,0,0.06)]">
                      <div className="flex items-center border-b pb-2 justify-between bg-background px-2 pt-2  text-[10px] uppercase tracking-[0.28em] text-foreground/80">
                        <span>{tab.label}</span>
                        <button
                          type="button"
                          aria-label={`Close ${tab.label}`}
                          onClick={() => toggleDesktopTab(tab.key)}
                          className={`text-base leading-none ${isOpen ? "" : "hidden"}`}
                        >
                          <span aria-hidden="true">×</span>
                        </button>
                      </div>

                      <div className="overflow-hidden">
                        <div className={desktopOpenTabs.has("work") && tab.key === "work" ? "h-[90vh]" : ""}>
                          {renderMenuContent(tab)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="absolute inset-x-0 bottom-0 z-100 grid grid-cols-6">
            {[...tabItems].reverse().map((tab) => (
              <button
                key={tab.key}
                type="button"
                aria-label={`Open ${tab.label}`}
                onClick={() => toggleDesktopTab(tab.key)}
                className={`h-8 cursor-pointer touch-manipulation ${
                  tab.key === "work" ? "col-span-4" : "col-span-1"
                }`}
              />
            ))}
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
              className="flex h-8 w-full cursor-pointer items-center pl-2 text-left text-xs uppercase tracking-[0.2em] text-foreground"
            >
              {mobileMenuOpen ? "Close" : "Menu"}
            </button>
          </div>

          <div
            id="mobile-home-menu-panel"
            className={`pointer-events-auto fixed bottom-0 left-0 right-0 z-[60] overflow-hidden bg-background transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              mobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-[calc(100%-40px)] opacity-100"
            }`}
          >
            <div className="flex max-h-[calc(100svh-40px)] flex-col overflow-y-auto">
              {tabItems.map((tab) => {
                const isOpen = activeTab === tab.key;

                return (
                  <div key={tab.key} className="bg-background ">
                    <div className={`relative flex h-10 w-full items-center`}>
                      <button
                        type="button"
                        onClick={() => {
                          setActiveTab((current) => (current === tab.key ? null : tab.key));
                          setMobileMenuOpen(true);
                        }}
                        className="flex h-full flex-1 border-b items-center pl-2 text-left text-xs tracking-[0.2em] text-foreground"
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
                        className="flex h-full w-[46px] items-center justify-end pr-4 text-right text-[18px] leading-none text-foreground"
                      >
                        <span
                          className={` ${mobileMenuOpen ? 'block' : 'hidden'}  transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${
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
                        <div
                          className={`bg-background ${
                            tab.key === "work" && mobileMenuOpen ? "h-[75vh]" : ""
                          }`}
                        >
                          {renderMenuContent(tab)}
                        </div>
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
