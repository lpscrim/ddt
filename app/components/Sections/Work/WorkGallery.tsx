"use client";

import { useState } from "react";
import { PhotoGallery } from "./PhotoGallery";
import { MainGallery } from "./MainGallery";

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
  
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [galleryStart, setGalleryStart] = useState(0);

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Filtered projects/photos by selected categories
  const filteredProjects = selectedCategories.length > 0
    ? projects.filter((p) => selectedCategories.every(cat => p.categories.includes(cat)))
    : projects;
  const filteredPhotos = selectedCategories.length > 0
    ? filteredProjects.flatMap((p) => [p.imageUrl, ...(p.galleryImages || [])])
    : allPhotos;

  // Category counts: projects or photos mode
  let visibleCategoryCounts: Record<string, number> = {};
  if (viewMode === "projects") {
    visibleCategoryCounts = filteredProjects.reduce((acc, project) => {
      project.categories.forEach((category) => {
        acc[category] = (acc[category] || 0) + 1;
      });
      return acc;
    }, {} as Record<string, number>);
  } else {
    // In photos mode, count categories for visible photos
    // Build a map of photo -> categories
    const photoToCategories: Record<string, string[]> = {};
    projects.forEach((project) => {
      // Main image
      photoToCategories[project.imageUrl] = project.categories;
      // Gallery images
      (project.galleryImages || []).forEach(img => {
        photoToCategories[img] = project.categories;
      });
    });
    filteredPhotos.forEach((photo) => {
      const cats = photoToCategories[photo] || [];
      cats.forEach((cat) => {
        visibleCategoryCounts[cat] = (visibleCategoryCounts[cat] || 0) + 1;
      });
    });
  }

  // Use the array of [category, count] pairs for all categories
  const sortedVisibleCategories: [string, number][] = categoryCounts
    .map(([cat]) => [cat, visibleCategoryCounts[cat] || 0] as [string, number])
    .sort((a, b) => Number(b[1]) - Number(a[1]));




  // Add/remove category handlers
  const toggleCategory = (cat: string) => {
    if (selectedCategories.includes(cat)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== cat));
    } else if (visibleCategoryCounts[cat] > 0) {
      setSelectedCategories([...selectedCategories, cat]);
    }
  };

  // Handler to open gallery
  const handleCardClick = (mode: "photos" | "projects", index: number, project?: typeof projects[number]) => {
    if (mode === "photos") {
      setGalleryImages(filteredPhotos);
      setGalleryStart(index);
    } else if (mode === "projects" && project) {
      const imgs = [project.imageUrl, ...(project.galleryImages || [])];
      setGalleryImages(imgs);
      setGalleryStart(0);
      setSelectedProject(project);
    }
    setGalleryOpen(true);
  };



  return (
    <section id="work" className="min-h-svh px-6 py-0">
      {!galleryOpen && (
        <MainGallery
          viewMode={viewMode}
          setViewMode={setViewMode}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          filteredProjects={filteredProjects}
          filteredPhotos={filteredPhotos}
          sortedVisibleCategories={sortedVisibleCategories}
          toggleCategory={toggleCategory}
          onCardClick={handleCardClick}
        />
      )}
      {galleryOpen && (
          <PhotoGallery
            images={galleryImages}
            startIndex={galleryStart}
            onClose={() => setGalleryOpen(false)}
            isProject={viewMode === "projects"}
            name={selectedProject ? selectedProject.title : ""}
            year={selectedProject ? selectedProject.year : ""}
          />
      )}
    </section>
  );

}
