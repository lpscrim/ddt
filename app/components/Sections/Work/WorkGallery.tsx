
"use client";

import  { useState } from "react";
import { PhotoModal } from "./PhotoModal";
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

  const [modalOpen, setModalOpen] = useState(false);
  const [modalImages, setModalImages] = useState<string[]>([]);
  const [modalIndex, setModalIndex] = useState<number>(0);
  const [isProject, setIsProject] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [year, setYear] = useState<string>("");


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
      setModalImages(filteredPhotos);
      setModalIndex(index);
      setIsProject(false);
    } else if (mode === "projects" && project) {
      const imgs = [project.imageUrl, ...(project.galleryImages || [])];
      setIsProject(true);
      setName(project.title);
      setYear(project.year);
      setModalImages(imgs);
      setModalIndex(0);
    }
    setModalOpen(true);
  };



  return (
    <section id="work" className="min-h-svh px-6 py-0">
      {!modalOpen && <MainGallery
        viewMode={viewMode}
        setViewMode={setViewMode}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        filteredProjects={filteredProjects}
        filteredPhotos={filteredPhotos}
        sortedVisibleCategories={sortedVisibleCategories}
        toggleCategory={toggleCategory}
        onCardClick={handleCardClick}
      /> }
      <PhotoModal
        isOpen={modalOpen}
        image={modalImages[modalIndex] || ""}
        onClose={() => setModalOpen(false)}
        onPrev={() => setModalIndex((prev) => (prev > 0 ? prev - 1 : prev))}
        onNext={() => setModalIndex((prev) => (prev < modalImages.length - 1 ? prev + 1 : prev))}
        hasPrev={modalIndex > 0}
        isProject={isProject}
        hasNext={modalIndex < modalImages.length - 1}
        name={name}
        year={year}
      />
    </section>
  );

}
