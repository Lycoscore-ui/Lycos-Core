import fs from 'fs';
import path from 'path';

const distDir = path.resolve('dist');
const rootAssetsDir = path.resolve('assets');
const appPublicDir = path.resolve('app/public');
const appPublicAssetsDir = path.resolve('app/public/assets');

console.log('Synchronizing production build assets...');

// 1. Sync dist/assets to root assets/ and app/public/assets/
if (fs.existsSync(path.join(distDir, 'assets'))) {
  fs.cpSync(path.join(distDir, 'assets'), rootAssetsDir, { recursive: true, force: true });
  fs.cpSync(path.join(distDir, 'assets'), appPublicAssetsDir, { recursive: true, force: true });
  console.log('✓ Assets synchronized to ./assets and ./app/public/assets');
}

// 2. Sync dist/index.html to app/public/index.html
if (fs.existsSync(path.join(distDir, 'index.html'))) {
  fs.copyFileSync(path.join(distDir, 'index.html'), path.join(appPublicDir, 'index.html'));
  console.log('✓ index.html synchronized to ./app/public/index.html');
}

console.log('Build synchronization completed successfully.');