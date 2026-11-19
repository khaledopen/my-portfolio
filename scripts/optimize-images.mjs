/**
 * Convertit les images PNG/JPG de public/images et public/projects en AVIF + WebP.
 * Usage : npm run images
 * Les originaux sont conservés (fallback). Ne réécrit pas un fichier déjà à jour.
 */
import { readdir, stat } from 'node:fs/promises';
import { join, extname } from 'node:path';
import sharp from 'sharp';

const roots = ['public/images', 'public/projects'];
const exts = new Set(['.png', '.jpg', '.jpeg']);

async function walk(dir) {
  let entries = [];
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return [];
  }
  const files = await Promise.all(entries.map(e => (e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)])));
  return files.flat();
}

async function isFresh(src, out) {
  try {
    return (await stat(out)).mtimeMs >= (await stat(src)).mtimeMs;
  } catch {
    return false;
  }
}

for (const root of roots) {
  for (const file of await walk(root)) {
    if (!exts.has(extname(file).toLowerCase())) continue;
    const base = file.slice(0, -extname(file).length);
    for (const [ext, opts] of [
      ['.avif', { quality: 55 }],
      ['.webp', { quality: 78 }]
    ]) {
      const out = base + ext;
      if (await isFresh(file, out)) continue;
      const img = sharp(file).resize({ width: 2400, withoutEnlargement: true });
      await (ext === '.avif' ? img.avif(opts) : img.webp(opts)).toFile(out);
      console.log('✓', out);
    }
  }
}
