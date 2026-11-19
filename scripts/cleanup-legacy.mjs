/**
 * Supprime les fichiers de l'ancienne version du portfolio, devenus inutiles.
 * Usage : npm run cleanup:legacy        (affiche la liste et demande confirmation)
 *         npm run cleanup:legacy -- --yes
 *
 * Ne touche jamais à artwork/ ni aux fichiers de la nouvelle version.
 */
import { rm, access } from 'node:fs/promises';
import { createInterface } from 'node:readline/promises';

const legacy = [
  'src/App.jsx',
  'src/main.jsx',
  'src/index.css',
  'src/editorial.css',
  'src/components/common',
  'src/components/editorial',
  'src/components/layout',
  'src/components/sections',
  'src/components/ui',
  'src/hooks/useIntersectionObserver.js',
  'src/hooks/useScrollspy.js',
  'src/utils',
  'tailwind.config.cjs',
  'public/hero-avatar-kone-v1.png',
  'public/hero-code-sculpture.png',
  'public/hero-robot-arm.png',
  'public/hero-robot-body.png',
  'public/hero-robot-v1.png',
  'dist'
];

const existing = [];
for (const path of legacy) {
  try {
    await access(path);
    existing.push(path);
  } catch {
    /* déjà supprimé */
  }
}

if (existing.length === 0) {
  console.log('Rien à supprimer : le nettoyage est déjà fait.');
  process.exit(0);
}

console.log('Fichiers et dossiers de l’ancienne version :\n' + existing.map(p => '  - ' + p).join('\n'));

if (!process.argv.includes('--yes')) {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  const answer = await rl.question('\nLes supprimer ? (o/N) ');
  rl.close();
  if (!/^o(ui)?$/i.test(answer.trim())) {
    console.log('Annulé.');
    process.exit(0);
  }
}

for (const path of existing) await rm(path, { recursive: true, force: true });
console.log(`✓ ${existing.length} éléments supprimés.`);
