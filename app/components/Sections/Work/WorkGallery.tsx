
"use client";

import  { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PhotoModal } from "./PhotoModal";
import { MainGallery } from "./MainGallery";

interface Project {
  id: number;
  title: string;
  categories: string[];
  year: string;
  imageUrl: string;
  galleryImages?: string[];
  text?: string;
}

interface WorkGalleryProps {
  projects: Project[];
  allPhotos: string[];
}

export function WorkGallery({
  projects,
  allPhotos,
}: WorkGalleryProps) {

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [viewMode, setViewMode] = useState<"projects" | "photos">("projects");

  const [modalOpen, setModalOpen] = useState(false);
  const [modalImages, setModalImages] = useState<string[]>([]);
  const [modalIndex, setModalIndex] = useState<number>(0);
  const [isProject, setIsProject] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [text, setText] = useState<string>("");

  const lastOpenedProjectIdRef = useRef<number | null>(null);

  const projectsById = useMemo(() => {
    return new Map(projects.map((p) => [p.id, p] as const));
  }, [projects]);

  const filteredProjects = projects;
  const filteredPhotos = allPhotos;

  // Handler to open gallery
  const handleCardClick = (mode: "photos" | "projects", index: number, project?: typeof projects[number]) => {
    if (mode === "photos") {
      setModalImages(filteredPhotos);
      setModalIndex(index);
      setIsProject(false);
      setText("");
    } else if (mode === "projects" && project) {
      const imgs = [project.imageUrl, ...(project.galleryImages || [])];
      setIsProject(true);
      setName(project.title);
      setYear(project.year);
      setModalImages(imgs);
      setModalIndex(0);
      setText(project.text || "");
    }
    setModalOpen(true);
  };

  // Deep link: /work?project={project.id}
  useEffect(() => {
    const projectParam = searchParams.get("project");
    if (!projectParam) return;

    const projectId = Number(projectParam);
    if (!Number.isFinite(projectId)) return;

    const project = projectsById.get(projectId);
    if (!project) return;

    if (lastOpenedProjectIdRef.current === projectId && modalOpen) return;
    lastOpenedProjectIdRef.current = projectId;

    let cancelled = false;
    queueMicrotask(() => {
      if (cancelled) return;

      setViewMode("projects");

      const imgs = [project.imageUrl, ...(project.galleryImages || [])];
      setIsProject(true);
      setName(project.title);
      setYear(project.year);
      setText(project.text || "");
      setModalImages(imgs);
      setModalIndex(0);
      setModalOpen(true);
    });

    return () => {
      cancelled = true;
    };
  }, [searchParams, projectsById, modalOpen]);

  const handleCloseModal = () => {
    setModalOpen(false);

    // If this modal was opened via a deep link, clear the param so it doesn't reopen.
    const projectParam = searchParams.get("project");
    if (!projectParam) return;

    const next = new URLSearchParams(searchParams.toString());
    next.delete("project");
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const handleThumbClick = (idx: number) => {
    setModalIndex(idx);
  };

  return (
    <section id="work" className="min-h-[75svh] px-6 w-full">
      {!modalOpen && <MainGallery
        viewMode={viewMode}
        setViewMode={setViewMode}
        filteredProjects={filteredProjects}
        filteredPhotos={filteredPhotos}
        onCardClick={handleCardClick}
      /> }
      <PhotoModal
        isOpen={modalOpen}
        image={modalImages[modalIndex] || ""}
        images={modalImages}
        index={modalIndex}
        onClose={handleCloseModal}
        onPrev={() => setModalIndex((prev) => (prev > 0 ? prev - 1 : prev))}
        onNext={() => setModalIndex((prev) => (prev < modalImages.length - 1 ? prev + 1 : prev))}
        hasPrev={modalIndex > 0}
        isProject={isProject}
        hasNext={modalIndex < modalImages.length - 1}
        name={name}
        year={year}
        text={text}
        changePhotoId={handleThumbClick}
      />
    </section>
  );

}
