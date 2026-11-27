import { listFeaturedPhotos } from "@/lib/blob";
import { FeaturedGallery } from "./FeaturedGallery";

export async function Projects() {
  const images = await listFeaturedPhotos();
  return <FeaturedGallery images={images.slice(0, 6)} />;
}
