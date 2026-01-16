"use client";

import { Card } from "../../UI/Layout/Card";

interface Project {
  id: number;
  title: string;
  categories: string[];
  year: string;
  imageUrl: string;
  galleryImages?: string[];
}

export interface MainGalleryProps {
  viewMode: "projects" | "photos";
  setViewMode: React.Dispatch<React.SetStateAction<"projects" | "photos">>;
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
  filteredProjects: Project[];
  filteredPhotos: string[];
  sortedVisibleCategories: [string, number][];
  toggleCategory: (cat: string) => void;
  onCardClick: (mode: "photos" | "projects", index: number, project?: Project) => void;
}

export function MainGallery({
  viewMode,
  setViewMode,
  selectedCategories,
  setSelectedCategories,
  filteredProjects,
  filteredPhotos,
  sortedVisibleCategories,
  toggleCategory,
    onCardClick,
}: MainGalleryProps) {
  return (
    <>
      <div className="pt-12 pb-4 px-0 rounded-xs flex flex-wrap gap-4">
        <div className="xl:w-1/2 text-sm sm:text-base py-2">
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
          <div className="flex flex-wrap gap-0 mt-2">
            {sortedVisibleCategories.map(([category, count]) => {
              const categoryStr = String(category);
              const isSelected = selectedCategories.includes(categoryStr);
              const isUnselectable = count === 0;
              return (
                <span key={categoryStr} className="inline-flex items-center text-sm sm:text:base">
                  <button
                    onClick={() => !isUnselectable && toggleCategory(categoryStr)}
                    disabled={isUnselectable}
                    className={`pr-1 py-1 rounded transition-colors cursor-crosshair text-foreground ${isSelected ? "underline font-semibold" : ""} ${isUnselectable ? "opacity-30 cursor-not-allowed" : "hover:bg-background/10"}`}
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
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 px-0">
          {filteredProjects.map((project, idx) => (
            <div key={project.id} className="relative group">
            <Card
              key={project.id}
              categories={project.categories}
              imageUrl={project.imageUrl}
              galleryImages={project.galleryImages}
              year={project.year}
              title={project.title}
              handleOnClick={() => onCardClick("projects", idx, project)}
            />
            <div className="absolute top-8 px-4 group-hover:opacity-100 opacity-0 flex flex-col group-hover:mt-2 z-60 transition-all duration-500">
                <h3 className="tracking-tight text-background">
                  {project.title}
                </h3>
                <div className="flex gap-4 text-background">
                  <span>[{project.categories.map(category => category).join(', ')}]</span>
                  <span>{project.year}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-1">
          {filteredPhotos.map((photo, index) => (
            <Card
              key={index}
              categories={[]}
              imageUrl={photo}
              year=""
              title=""
              handleOnClick={() => onCardClick("photos", index)}
            />
          ))}
        </div>
      )}
    </>
  );
}
