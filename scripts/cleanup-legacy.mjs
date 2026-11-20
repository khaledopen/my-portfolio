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
  // Anciens composants v1 de src/components/ui (le dossier lui-même contient les composants actuels)
  'src/components/ui/Button.jsx',
  'src/components/ui/Cursor.jsx',
  'src/components/ui/FeaturedProjectCard.jsx',
  'src/components/ui/Loader',
  'src/components/ui/MarqueeTicker.jsx',
  'src/components/ui/OtherProjectCard.jsx',
  'src/components/ui/SocialLinks.jsx',
  'src/hooks/useIntersectionObserver.js',
  'src/hooks/useScrollspy.js',
  'src/utils',
  'tailwind.config.cjs',
  'public/hero-avatar-kone-v1.png',
  'public/hero-code-sculpture.png',
  'public/hero-robot-arm.png',
  'public/hero-robot-body.png',
  'public/hero-robot-v1.png',
  'dist',
  // Version 2 (« horizon »), remplacée par la version « rideau »
  'src/components/Intro.tsx',
  'src/components/IntroContext.ts',
  'src/components/HorizonPlate.tsx',
  'src/styles/tokens.css',
  'src/styles/base.css',
  'src/styles/sections',
  'src/animations',
  'src/data/world.ts',
  // Version 3 (« rideau »), remplacée par la version « carnet de croquis »
  'src/components/ActHeading.tsx',
  'src/components/Nav.tsx',
  'src/components/ProjectCover.tsx',
  'src/components/Avatar.tsx',
  'src/components/ui',
  'src/sections/Archive.tsx',
  'src/sections/Journey.tsx',
  'src/sections/Moments.tsx',
  'src/sections/Philosophy.tsx',
  'src/sections/Tools.tsx',
  'src/pages/ProjectPage.tsx',
  'src/styles/avatar.css',
  'src/lib/journey.ts'
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
