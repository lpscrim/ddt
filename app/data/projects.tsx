
interface Project {
  id: number;
  title: string;
  categories: string[];
  year: string;
  imageUrl: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "LUNAR EXPLORATION",
    categories: ["IR", "LANDSCAPE", "ART"],
    year: "2024",
    imageUrl:
    "/photos/photo (1).webp",
    /*galleryImages: [
    ],*/
  },
  {
    id: 2,
    title: "MINIMAL RESIDENCE",
    categories: [ "IR", "ARCHITECTURE"],
    year: "2024",
    imageUrl:
    "/photos/photo (10).webp",
  },
  {
    id: 3,
    title: "GLACIAL WOOD",
    categories: ["IR", "TREES"],
    year: "2023",
    imageUrl:
    "/photos/photo (3).webp",
  },
  {
    id: 4,
    title: "MISTY MOUNTAINS",
    categories: ["B+W", "LANDSCAPE"],
    year: "2023",
    imageUrl:
    "/photos/photo (9).webp",
  },
  {
    id: 5,
    title: "ETHEREAL CLOUDS",
    categories: ["IR", "LANDSCAPE", "ART"],
    year: "2023",
    imageUrl:
    "/photos/photo (11).webp",
  },
  {
    id: 6,
    title: "MONOCHROME MIST",
    categories: ["ART", "B+W"],
    year: "2022",
    imageUrl:
    "/photos/photo (8).webp",
  },
];