# Portfolio — Kone Sory Ben Khaled

> Discret par nature. Sans limites quand je crée.

Portfolio en React 19, TypeScript strict, Vite 7 et Tailwind CSS 4, dans l'esprit d'un carnet de croquis (inspiré de la structure de gregskril.com, avec des dessins et des textes originaux).

- **Fond crème, encre bleu cobalt**, police arrondie Nunito (libre). Le mode sombre suit le réglage du système.
- **Yeux dessinés** en haut de page : ils clignent, suivent la souris et lèvent les sourcils au clic (`components/Eyes.tsx`).
- **Une ligne au crayon** traverse la page dans les marges et se trace au fil du défilement, jusqu'à l'avatar du contact (`components/PenLine.tsx`). Les illustrations se dessinent quand elles apparaissent (`components/Sketch.tsx`).
- **Des choses que j'ai construites** : les projets mis en avant, un compteur en bâtons, et la page `/projets` qui liste tout.
- **Extraits de ma pellicule** : tes photos et vidéos à déplacer à la souris. Un clic ouvre la vue rapprochée, où les vidéos sont lues avec le son (`components/PhotoPile.tsx`).

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
  components/   Eyes, PenLine, Sketch (dessins + compteur), PhotoPile, Lightbox, ProjectRows, Picture
  sections/     Hero, About, Work (projets), World (pellicule), Contact, Footer
  pages/        Home, ProjectsPage (/projets), NotFound
  layouts/      SiteLayout
  hooks/        media queries, piège de focus, titre de page
  data/         TOUT LE CONTENU (voir ci-dessous)
  lib/          fusion GitHub + contenu éditorial, parcours
  styles/       index.css (thème clair/sombre)
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
| `media.ts` | Photos et vidéos de la pellicule |
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
   - `featured: true` : le projet apparaît sur l'accueil, dans « Des choses que j'ai construites » ;
   - `hidden: { reason }` : masquer le projet sans le supprimer ;
   - `demo` : lien vers la démo (la ligne pointe alors vers la démo plutôt que vers GitHub).

Un dépôt sans entrée s'affiche quand même sur `/projets`, avec sa description GitHub.

### Ajouter des photos ou des vidéos à la pellicule

1. Photo : dépose-la dans `public/images/photos/`. Vidéo : dépose le `.mp4` dans `public/videos/`, avec une image d'aperçu `.jpg` du même nom.
2. Lance `npm run images` pour générer les versions `.avif` et `.webp`, plus légères.
3. Ajoute une ligne dans `src/data/media.ts`, avec ses dimensions réelles et une légende.

La pile se réorganise toute seule.

## Déploiement sur Vercel

1. Importer le dépôt dans Vercel. Preset : **Vite**. Build : `npm run build`. Sortie : `dist`.
2. Optionnel : variable d'environnement `GITHUB_TOKEN` (portée Build). Si l'API GitHub est indisponible, le build continue avec les données commitées.
3. Après le premier déploiement, remplace `https://ksbk.vercel.app` par le vrai domaine dans trois fichiers : `src/data/siteConfig.ts`, `index.html` (canonical, Open Graph) et `public/robots.txt`.

`vercel.json` gère déjà la route `/projets` et le cache des fichiers statiques.

## Accessibilité et mouvement

- Mouvement réduit : la ligne et les dessins s'affichent entièrement tracés, sans crayon ; les yeux ne bougent plus ; les vidéos ne se lancent pas seules.
- Lien d'évitement, focus visible, photos ouvrables au clavier (Entrée), vue rapprochée avec focus piégé, Échap pour fermer et flèches pour naviguer.
- Les yeux suivent la souris uniquement sur les appareils à pointeur fin.

## Reste à fournir

- Les détails de tes hackathons et concours (nom, date, rôle, résultat confirmé), si tu veux les raconter
- Email public et CV PDF → `src/data/profile.ts`
- D'autres photos ou vidéos pour la pellicule → `src/data/media.ts`
- Domaine final
