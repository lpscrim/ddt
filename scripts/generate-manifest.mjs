import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const photosDir = path.join(__dirname, '../public/photos-compressed');
const outputPath = path.join(__dirname, '../app/data/projects-manifest.json');

const folders = fs.readdirSync(photosDir, { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => dirent.name);

const manifest = folders.map((folder) => {
  const folderPath = path.join(photosDir, folder);
  const images = fs.readdirSync(folderPath)
    .filter((file) => /\.(webp|jpg|jpeg|png|gif)$/i.test(file))
    .sort();
  
  return { folder, images };
});

fs.writeFileSync(outputPath, JSON.stringify(manifest, null, 2));
console.log(`✅ Generated manifest with ${manifest.length} projects`);
console.log(`   Saved to: app/data/projects-manifest.json`);
