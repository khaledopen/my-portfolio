# Portfolio — Kone Sory Ben Khaled

> Discret par nature. Sans limites quand je crée.

Portfolio en React 19, TypeScript strict, Vite 7 et GSAP. Le site suit l'arc d'une journée : la nuit pour le premier contact (le silence), l'aube pour les projets (la connexion), le jour pour l'univers personnel (la révélation), le crépuscule pour le contact. Une ligne d'horizon champagne sert de fil conducteur, de l'intro jusqu'au pied de page.

## Installation et lancement

Prérequis : Node.js 22.12 ou plus récent (24 recommandé, voir `.nvmrc`).

```bash
npm install
npm run dev          # http://localhost:5173
```

## Vérifications

```bash
npm run typecheck    # TypeScript strict
npm run lint
npm run build        # synchro GitHub (souple) + tsc + build de production
npm run preview      # sert le dossier dist/
```

## Première fois : nettoyer l'ancienne version

Les fichiers de la v1 (composants `.jsx`, `editorial.css`, Tailwind, images de robots…) ne sont plus utilisés. Pour les supprimer :

```bash
npm run cleanup:legacy
```

La commande affiche la liste et demande confirmation. Elle ne touche jamais au dossier `artwork/`.

## Arborescence

```
src/
  animations/   GSAP + ScrollTrigger
  components/   Avatar, Intro, Nav, Lightbox, Picture, ProjectCover, HorizonPlate
  sections/     Hero, About, Work, Archive, Tools, Moments, World, Philosophy, Journey, Contact, Footer
  pages/        Home, ProjectPage (/projects/:slug), NotFound
  layouts/      SiteLayout (intro, navigation, défilement vers les ancres)
  hooks/        media queries, piège de focus, titre de page
  data/         TOUT LE CONTENU (voir ci-dessous)
  lib/          fusion GitHub + contenu éditorial, parcours
  styles/       tokens.css, base.css, sections/*.css
  types/
scripts/
  sync-github.mjs      métadonnées GitHub au build
  optimize-images.mjs  génère AVIF + WebP
  cleanup-legacy.mjs   supprime la v1
public/images/  hero/, about/, world/, hackathons/, competitions/, events/
```

## Modifier le contenu

Tout se trouve dans `src/data/`. Aucun composant n'est à modifier.

| Fichier | Contenu |
|---|---|
| `profile.ts` | Nom, rôle, liens, **email**, **CV**, **portrait** (à `null` tant que non fournis) |
| `projects.ts` | Description vérifiée de chaque projet |
| `github.generated.json` | Dates et liens GitHub (généré, à commiter) |
| `hackathons.ts` | Hackathons, concours, événements |
| `experiences.ts` | Formation, certifications, étapes du parcours |
| `skills.ts` | Regroupement des technologies par domaine |
| `world.ts` | Planches du journal « Loin de l'écran » |
| `siteConfig.ts` | Domaine, titre, navigation |

### Ajouter ou masquer un projet

Les projets viennent des dépôts publics GitHub. Un dépôt apparaît automatiquement s'il remplit trois conditions :

- il a été créé à partir de `GoTech-Portfolio`, date incluse ;
- ce n'est pas un fork ;
- il n'est pas vide.

Ils sont triés par date de création.

1. `npm run sync:github` met à jour `github.generated.json`. Un `GITHUB_TOKEN` est optionnel ; il est lu côté build uniquement (voir `.env.example`).
2. Dans `src/data/projects.ts`, ajoute une entrée avec le nom exact du dépôt (`repo`) et une description fondée sur son README.
3. Options d'une entrée :
   - `featured: true` : présentation immersive ;
   - `hidden: { reason }` : masquer le projet sans le supprimer ;
   - `images` : captures d'écran ;
   - `demo` : lien vers la démo.

Un dépôt sans entrée s'affiche quand même dans l'archive, avec sa description GitHub.

### Ajouter des captures ou des photos

1. Dépose l'original (`.png` ou `.jpg`) dans `public/projects/` ou `public/images/...`.
2. `npm run images` génère les versions `.avif` et `.webp`.
3. Référence le fichier original (avec son extension) et ses dimensions réelles dans le fichier de données.

### Ajouter un hackathon ou un concours

1. Photos dans `public/images/hackathons/` (ou `competitions/`, `events/`), puis `npm run images`.
2. Copie l'exemple commenté de `src/data/hackathons.ts` et remplis-le. Indique `result` uniquement s'il est confirmé.

La galerie, la visionneuse plein écran (clavier, balayage tactile) et la frise du parcours se mettent à jour seules.

## Déploiement sur Vercel

1. Importer le dépôt dans Vercel. Preset : **Vite**. Build : `npm run build`. Sortie : `dist`.
2. Optionnel : variable d'environnement `GITHUB_TOKEN` (portée Build). Si l'API GitHub est indisponible, le build continue avec les données commitées.
3. Après le premier déploiement, remplace `https://ksbk.vercel.app` par le vrai domaine dans trois fichiers : `src/data/siteConfig.ts`, `index.html` (canonical, Open Graph) et `public/robots.txt`.

`vercel.json` gère déjà les routes `/projects/:slug` et le cache des fichiers statiques.

## Accessibilité et mouvement

- Intro jouée une fois par session, passable avec le bouton ou la touche Échap, et désactivée si le système demande de réduire les animations.
- Lien d'évitement, focus visible, menu et visionneuse avec focus piégé et fermeture par Échap.
- Avec `prefers-reduced-motion`, aucun défilement animé : les projets s'affichent en liste simple.
- Le regard de l'avatar suit la souris uniquement sur les appareils à pointeur fin.

## Reste à fournir

- Photo(s) personnelle(s) → `profile.portrait`
- Photos et récits de hackathons et concours → `hackathons.ts`
- Email public et CV PDF → `profile.ts`
- Vraies photos pour « Loin de l'écran » (des horizons dessinés en code les remplacent en attendant) → `world.ts`
- Captures des projets mis en avant autres que CaisseFlow
- Domaine final
