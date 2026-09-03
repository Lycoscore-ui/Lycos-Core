import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Downloads an image from a URL and saves it to local media directories.
 * @param {string} imageUrl - The remote image URL (e.g. from Unsplash).
 * @param {string} articleSlug - Slug or identifier for filename.
 * @returns {Promise<string>} - Relative local asset path (e.g. './media/curated/filename.jpg').
 */
export async function downloadCuratedImage(imageUrl, articleSlug = 'curated-asset') {
  if (!imageUrl || imageUrl.startsWith('./') || imageUrl.startsWith('/')) {
    return imageUrl; // Already local
  }

  const cleanSlug = articleSlug
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 50);

  const timestamp = Date.now();
  const filename = `${cleanSlug}-${timestamp}.jpg`;

  // Target directories
  const targetDirs = [
    path.resolve(__dirname, '../app/public/media/curated'),
    path.resolve(__dirname, '../dist/media/curated'),
    path.resolve(__dirname, '../assets/media/curated'),
    path.resolve(__dirname, '../app/public/wp-content/uploads/lycos-curated')
  ];

  // Ensure target directories exist
  targetDirs.forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });

  console.log(`Downloading curated image from: ${imageUrl}...`);

  const res = await fetch(imageUrl, {
    headers: {
      'User-Agent': 'Lycos-Core-Editorial-Pipeline/1.0'
    }
  });

  if (!res.ok) {
    throw new Error(`Failed to download image. HTTP ${res.status}: ${res.statusText}`);
  }

  const arrayBuffer = await res.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Write buffer to all local media targets
  targetDirs.forEach((dir) => {
    const destPath = path.join(dir, filename);
    fs.writeFileSync(destPath, buffer);
  });

  const relativePath = `./media/curated/${filename}`;
  console.log(`✓ Image saved successfully as: ${relativePath} (${(buffer.length / 1024).toFixed(1)} KB)`);

  return relativePath;
}

// CLI direct execution support
if (process.argv[1] === __filename) {
  const [,, url, slug] = process.argv;
  if (!url) {
    console.error('Usage: node scripts/download-curated-image.js <IMAGE_URL> [SLUG]');
    process.exit(1);
  }

  downloadCuratedImage(url, slug || 'unsplash-asset')
    .then((localPath) => {
      console.log(`OUTPUT_LOCAL_PATH=${localPath}`);
    })
    .catch((err) => {
      console.error('Error downloading image:', err);
      process.exit(1);
    });
}
