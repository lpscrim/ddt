"use client";

import { useState } from "react";
import { Card } from "../components/UI/Layout/Card";

interface Project {
  id: number;
  title: string;
  categories: string[];
  year: string;
  imageUrl: string;
  galleryImages?: string[];
}

interface WorkGalleryProps {
  projects: Project[];
  categoryCounts: [string, number][];
  allPhotos: string[];
}

export function WorkGallery({
  projects,
  categoryCounts,
  allPhotos,
}: WorkGalleryProps) {
  const [viewMode, setViewMode] = useState<"projects" | "photos">("projects");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Filtered projects/photos by selected categories
  const filteredProjects = selectedCategories.length > 0
    ? projects.filter((p) => selectedCategories.every(cat => p.categories.includes(cat)))
    : projects;
  const filteredPhotos = selectedCategories.length > 0
    ? filteredProjects.flatMap((p) => [p.imageUrl, ...(p.galleryImages || [])])
    : allPhotos;

  // Remaining counts for visible items
  const visibleCategoryCounts = filteredProjects.reduce((acc, project) => {
    project.categories.forEach((category) => {
      acc[category] = (acc[category] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);
  // Use the array of [category, count] pairs for all categories
  const sortedVisibleCategories = categoryCounts.map(([cat, _]) => [cat, visibleCategoryCounts[cat] || 0])
    .sort((a, b) => Number(b[1]) - Number(a[1]));

  // Add/remove category handlers
  const toggleCategory = (cat: string) => {
    if (selectedCategories.includes(cat)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== cat));
    } else if (visibleCategoryCounts[cat] > 0) {
      setSelectedCategories([...selectedCategories, cat]);
    }
  };

  return (
    <section id="work" className="min-h-screen px-1 py-0">
      <div className="pt-16 pb-8 px-4 rounded-xs my-1 flex flex-wrap gap-4">
        <div className="xl:w-1/2">
          <div>
            <button
              onClick={() => { setViewMode("projects"); setSelectedCategories([]); }}
              className={`mr-2 cursor-crosshair transition-opacity ${viewMode === "projects" && selectedCategories.length === 0 ? "text-foreground" : "text-foreground/50"}`}
            >
              PROJECTS [{filteredProjects.length}]
            </button>
            <button
              onClick={() => { setViewMode("photos"); setSelectedCategories([]); }}
              className={`mr-2 cursor-crosshair transition-opacity ${viewMode === "photos" && selectedCategories.length === 0 ? "text-foreground" : "text-foreground/50"}`}
            >
              PHOTOS [{filteredPhotos.length}]
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {sortedVisibleCategories.map(([category, count]) => {
              const categoryStr = String(category);
              const isSelected = selectedCategories.includes(categoryStr);
              const isUnselectable = count === 0;
              return (
                <span key={categoryStr} className="inline-flex items-center ">
                  <button
                    onClick={() => !isUnselectable && toggleCategory(categoryStr)}
                    disabled={isUnselectable}
                    className={`px-2 py-1 rounded transition-colors cursor-crosshair text-foreground ${isSelected ? "underline font-semibold" : ""} ${isUnselectable ? "opacity-30 cursor-not-allowed" : "hover:bg-background/10"}`}
                  >
                    {categoryStr} <span className="text-foreground/60">[{count}]</span>
                  </button>
                </span>
              );
            })}
          </div>
        </div>
      </div>
      {viewMode === "projects" ? (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-1">
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              categories={project.categories}
              imageUrl={project.imageUrl}
              galleryImages={project.galleryImages}
              year={project.year}
              title={project.title}
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-1">
          {filteredPhotos.map((photo, index) => (
            <Card
              key={index}
              categories={[]}
              imageUrl={photo}
              year=""
              title=""
            />
          ))}
        </div>
      )}
    </section>
  );
}
