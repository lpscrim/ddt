"use client";

import { useState } from "react";
import { Card } from "../../UI/Layout/Card";

const INITIAL_PHOTOS_TO_RENDER = 40;
const PHOTOS_PAGE_SIZE = 48;

interface Project {
  id: number;
  title: string;
  categories: string[];
  year: string;
  imageUrl: string;
  galleryImages?: string[];
  text?: string;
}

export interface MainGalleryProps {
  viewMode: "projects" | "photos";
  setViewMode: React.Dispatch<React.SetStateAction<"projects" | "photos">>;
  filteredProjects: Project[];
  filteredPhotos: string[];
  onCardClick: (mode: "photos" | "projects", index: number, project?: Project) => void;
}

export function MainGallery({
  viewMode,
  setViewMode,
  filteredProjects,
  filteredPhotos,
  onCardClick,
}: MainGalleryProps) {
  const photosResetKey = `${viewMode}|${filteredPhotos.length}`;

  return (
    <>
      <div className=" pb-4 px-0 flex flex-wrap w-full">
        <div className="text-xs pl-2">
          <div className="flex">
            <button
              onClick={() => setViewMode("projects")}
              className={`mr-2 cursor-crosshair transition-opacity ${viewMode === "projects" ? "text-foreground" : "text-foreground/50"}`}
            >
              PROJECTS [{filteredProjects.length}]
            </button>
            <button
              onClick={() => setViewMode("photos")}
              className={`mr-2 cursor-crosshair transition-opacity ${viewMode === "photos" ? "text-foreground" : "text-foreground/50"}`}
            >
              PHOTOS [{filteredPhotos.length}]
            </button>
          </div>
        </div>
      </div>
      {viewMode === "projects" ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-1 px-0">
          {filteredProjects.map((project, idx) => (
            <div key={project.id} className="relative group">
            <Card
              key={project.id}
              categories={project.categories}
              imageUrl={project.imageUrl}
              galleryImages={project.galleryImages}
              year={project.year}
              title={project.title}
              imageSizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
              imageWidth={600}
              imageHeight={750}
              imageQuality="auto:eco"
              imageDpr={1}
              handleOnClick={() => onCardClick("projects", idx, project)}
            />
            <div className="absolute inset-x-0 top-8 px-4 group-hover:opacity-100 opacity-0 flex flex-col group-hover:mt-2 z-60 transition-all duration-500 pointer-events-none max-w-full">
                <h3 className="tracking-tight text-background wrap-break-word">
                  {project.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <PhotosGrid
            key={photosResetKey}
            filteredPhotos={filteredPhotos}
            onCardClick={onCardClick}
          />
        </>
      )}
    </>
  );
}

function PhotosGrid({
  filteredPhotos,
  onCardClick,
}: {
  filteredPhotos: string[];
  onCardClick: (mode: "photos" | "projects", index: number) => void;
}) {
  const [visiblePhotosCount, setVisiblePhotosCount] = useState(
    INITIAL_PHOTOS_TO_RENDER
  );

  const photosToRender = filteredPhotos.slice(0, visiblePhotosCount);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-3 gap-0.5">
        {photosToRender.map((photo, index) => (
          <Card
            key={photo + index}
            categories={[]}
            imageUrl={photo}
            year=""
            title=""
            imageSizes="(min-width: 1024px) 12.5vw, (min-width: 768px) 16.7vw, 33vw"
            imageWidth={360}
            imageHeight={450}
            imageQuality="auto:eco"
            imageDpr={1}
            handleOnClick={() => onCardClick("photos", index)}
          />
        ))}
      </div>

      {filteredPhotos.length > visiblePhotosCount && (
        <div className="flex justify-center py-10">
          <button
            className="cursor-crosshair transition-opacity text-foreground/80 hover:text-foreground"
            onClick={() =>
              setVisiblePhotosCount((n) =>
                Math.min(filteredPhotos.length, n + PHOTOS_PAGE_SIZE)
              )
            }
          >
            LOAD MORE [{Math.min(
              filteredPhotos.length,
              visiblePhotosCount + PHOTOS_PAGE_SIZE
            )}
            /{filteredPhotos.length}]
          </button>
        </div>
      )}
    </>
  );
}
