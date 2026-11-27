import { Suspense } from "react";
import { getProjects } from "../data/projects";
import { WorkGallery } from "../components/Sections/Work/WorkGallery";



export default async function WorkPage() {
  const projects = await getProjects();

  const allPhotos = projects.flatMap(project => [project.imageUrl, ...(project.galleryImages || [])]);

  return (
    <main>
      <Suspense fallback={null}>
        <WorkGallery
          projects={projects}
          allPhotos={allPhotos}
        />
      </Suspense>
    </main>
  );
}
