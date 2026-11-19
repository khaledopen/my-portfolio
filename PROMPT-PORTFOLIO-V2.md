# MASTER PROMPT — ÉVOLUTION DU PORTFOLIO EXISTANT VERS UNE EXPÉRIENCE IMMERSIVE « QUIET LUXURY »

> **Important : ce n'est pas un nouveau projet.** Un portfolio fonctionnel existe déjà dans ce dépôt (`portfolio-main`). Ta mission est de le **faire évoluer**, pas de repartir de zéro. Conserve ce qui fonctionne, corrige ce qui est fragile, ajoute ce qui manque, et supprime le code mort.

---

## 1. TA MISSION

Tu es une équipe créative de niveau international : Creative Director, UI/UX Designer primé, Senior Frontend Engineer (React/TypeScript), Creative Developer (WebGL/Three.js), Motion Designer (GSAP), Brand Strategist, Storytelling Expert, Accessibility & Performance Engineer.

Tu dois faire évoluer mon portfolio personnel vers une expérience digitale mémorable, authentique, interactive et visuellement spectaculaire — digne d'un studio haut de gamme — sans sacrifier lisibilité, accessibilité ni performances.

Chaque section raconte quelque chose sur moi. Chaque animation a une intention. Chaque image participe à la narration.

---

## 2. ÉTAT ACTUEL DU PROJET — À LIRE AVANT TOUTE MODIFICATION

### 2.1 Identité déjà en place

- **Nom :** KONE SORY BEN KHALED (forme courte : Sory Ben Khaled, monogramme `KSBK`)
- **Localisation :** Abidjan, Côte d'Ivoire
- **Formation :** Université Polytechnique de Bingerville — Informatique
- **Positionnement actuel :** « Développeur web & mobile »
- **GitHub :** https://github.com/khaledopen
- **LinkedIn :** https://ci.linkedin.com/in/kone-sory-ben-khaled-71ba44308
- **Email :** non affiché sur le site. Ne pas en ajouter un sans que je le fournisse explicitement.

### 2.2 Stack réelle

| Élément | État actuel |
|---|---|
| Framework | React 19 + Vite 7 (`@vitejs/plugin-react-swc`) |
| Langage | **JavaScript (`.jsx`)** — pas de TypeScript |
| Styles | **CSS custom** dans `src/editorial.css` (~60 Ko, variables `:root`) + `src/index.css`. Tailwind 3 est installé mais sa config (`tailwind.config.cjs`) contient un ancien thème néo-brutaliste (`nb-yellow`, `shadow-brutal`…) quasi inutilisé |
| Routing | `react-router-dom` 7, une seule route `/` |
| Animations | Faites à la main : `requestAnimationFrame`, `IntersectionObserver` (`[data-reveal]`), variables CSS. **Pas de GSAP, pas de Three.js, pas de Lenis** |
| Polices | Space Grotesk + DM Mono (Google Fonts), serif = Georgia (police système) |
| Divers | `vite-plugin-pwa` installé mais non configuré, `manifest.json` présent, `vercel.json` présent, ESLint + Prettier |
| Données | Tout est codé en dur dans `src/utils/constants.js` |

### 2.3 Direction visuelle actuelle

Esthétique **éditoriale claire** : fond papier `#f2eee6`, encre `#0d0d0c`, bordeaux `#701d18`, accent vert acide `#d9f154`, grain animé en overlay, kickers de section du type `( ACTE I — LE TRAVAIL )  02 / 05`, flèches typographiques `↗ ↘`, narration en « actes » théâtraux.

### 2.4 Composants actifs (rendus dans `App.jsx`)

Ordre actuel : `Hero → About → Projects → Archive → Process → Contact`, dans `Layout` (Loader + Cursor + Grain + Header + Footer).

| Fichier | Ce qu'il fait aujourd'hui | Points à revoir |
|---|---|---|
| `layout/Layout.jsx` | Loader 2,1 s, puis active les reveals au scroll | Le loader **bloque** l'accès, ne peut pas être passé et **se rejoue à chaque visite** |
| `ui/Loader/index.jsx` | Compteur 000→100, mot `KS/BK` | À transformer en vraie intro cinématique (voir §6) |
| `editorial/EditorialHeader.jsx` | Barre noire flottante centrée, monogramme, menu plein écran, barre de progression | `min-width: 620px` à vérifier sur mobile ; pas de focus trap dans le menu ; `aria-hidden` sur le panneau mais liens toujours focusables |
| `editorial/EditorialHero.jsx` + `AvatarHero.jsx` | Avatar 3D (`/hero-avatar-kone-v1.png`) dont les yeux suivent le curseur, nom en fond géant, CTA « Me contacter » | Pas de tagline « Quiet by nature », pas de CTA vers les projets. **L'avatar est un atout à conserver** |
| `editorial/EditorialAbout.jsx` + `CodeConstellation.jsx` | Phrase-manifeste avec mots interactifs (cartes au survol), orbite de 15 technologies (icônes devicon via CDN jsDelivr) | Les cartes au survol ne sont pas accessibles au clavier/tactile ; dépendance CDN externe pour les icônes |
| `editorial/EditorialProjects.jsx` | Deck de 6 cartes « sticky » animé au scroll + modale galerie | Légendes de galerie codées en dur (`'Tableau de bord' / 'Documents partagés'`) ; modale sans focus trap ; seul CaisseFlow a des captures ; visuels des autres projets = placeholders générés (initiales + couleur) |
| `editorial/EditorialArchive.jsx` | Marquee + liste de 3 projets | Numérotation codée en dur (`index + 7`) ; pas de filtres |
| `editorial/EditorialProcess.jsx` | 5 étapes génériques (Écouter, Structurer…) + note formation | Porte l'ancre `#experience` et le lien de nav « Parcours », mais **ce n'est pas un parcours** ; textes génériques |
| `editorial/EditorialContact.jsx` | Grand titre « Créons quelque chose ensemble », lien LinkedIn | Pas d'email, pas de CV, pas de GitHub dans la section |
| `editorial/EditorialFooter.jsx` | Mot géant `KSBK`, liens GitHub / LinkedIn | OK, à faire évoluer |
| `ui/Cursor.jsx` | Curseur custom | Vérifier désactivation sur tactile et `prefers-reduced-motion` |

### 2.5 Code mort / héritage à nettoyer

Ces fichiers ne sont plus importés par `App.jsx`. Vérifie avec une recherche d'imports, puis supprime-les ou archive-les :

- `src/components/sections/*` (About, Contact, Experience, FeaturedProjects, Hero, OtherProjects)
- `src/components/layout/Header.jsx`, `src/components/layout/Footer.jsx`
- `src/components/ui/FeaturedProjectCard.jsx`, `OtherProjectCard.jsx`, `MarqueeTicker.jsx`, `Button.jsx`, `SocialLinks.jsx` (si non utilisés)
- `src/components/common/*` (si non utilisés)
- `src/components/editorial/DigitalFluid.jsx`, `HalftoneHero.jsx`, `RobotHero.jsx` (anciennes versions du hero)
- `public/hero-robot-*.png`, `public/hero-code-sculpture.png` (≈ 5 Mo d'images inutilisées)
- `src/hooks/useScrollspy.js`, `useIntersectionObserver.js`, `src/utils/helpers.js` (si non utilisés)
- Thème `nb` de `tailwind.config.cjs`
- `dist/` ne doit pas être versionné (vérifier `.gitignore`)

Le dossier `artwork/` contient deux illustrations (`le-chemin-des-etoiles.png`, `le-jardin-sous-les-eaux.png`, ~3,5 Mo chacune). **Ne les supprime pas et ne les utilise pas sans me demander** leur origine et leur statut.

### 2.6 Projets actuellement présentés

Dans `constants.js`, non synchronisés avec GitHub :

- **Featured (6) :** CaisseFlow (pas de lien GitHub), Belleza (`institut-beauty`), MonBudget (`flux-financiers`), Wharf Hôtel (`whraf-hotel`), Attou Immo (`projet-attou-immo`), Artisans CI (`artisans-ci-frontend`)
- **Archive (3) :** ImmoScrap, Gestion-Loyer, attou-immoApk
- **Captures disponibles :** `public/projects/caisseflow-dashboard.png`, `caisseflow-documents.png` uniquement

Ces descriptions ont été rédigées à la main. **Elles doivent être revérifiées** contre les README et manifestes réels (voir §7).

---

## 3. SKILLS CLAUDE À UTILISER

Avant de commencer, inspecte les skills réellement disponibles dans ton environnement.

Active ceux qui existent et sont pertinents : `frontend-design`, `brainstorming`, skills UI/UX, animation, React/TypeScript, accessibilité/performance, tests et revue de code.

Ne prétends pas utiliser un skill qui n'est pas installé. S'il n'existe pas, applique directement les bonnes pratiques correspondantes.

---

## 4. MA PERSONNALITÉ — BASE DE LA DIRECTION ARTISTIQUE

Je suis développeur, passionné de technologie, naturellement réservé. Au premier contact je peux paraître discret, calme, difficile à cerner. Quand une vraie affinité s'installe, je m'ouvre énormément : expressif, créatif, enthousiaste, profondément engagé.

J'aime : la technologie et la création, les belles vues et les paysages spectaculaires, les environnements calmes et élégants, le luxe discret et les détails soignés, l'ambition et l'excellence, le travail acharné, les défis techniques, les hackathons et compétitions, les projets qui ont un sens, construire plutôt que parler.

### Progression émotionnelle

**Phase 1 — THE SILENCE** (intro + hero) : minimalisme, sombre, typographie puissante, peu de texte, beaucoup d'espace négatif, animations lentes et précises. Mystère, maîtrise, confiance.

**Phase 2 — THE CONNECTION** (about, projets) : interactions plus vivantes, couleurs secondaires qui se révèlent, storytelling plus personnel, projets qui prennent vie.

**Phase 3 — THE REVEAL** (hackathons, univers, parcours) : animations plus immersives, galerie de souvenirs, défis, collaborations, démonstrations techniques.

**Concept central :** « Quiet by nature. Limitless by creation. »

Variantes possibles : « Less noise. More creation. » · « Reserved in words. Unrestricted in ideas. » · « I don't chase attention. I build things worth noticing. »

Ces phrases inspirent l'identité mais ne doivent pas être répétées partout. Pas de clichés d'introverti, pas de déclarations prétentieuses, pas de texte artificiel. Une personnalité réelle, pas un personnage.

### Langue

Le site actuel est **en français**, et les nouvelles taglines sont en anglais. Choisis une stratégie cohérente (par exemple : taglines et titres de section en anglais, corps de texte en français) et applique-la partout. Ne mélange pas les deux au hasard dans une même phrase.

---

## 5. DIRECTION ARTISTIQUE — MIGRATION DEPUIS L'EXISTANT

### 5.1 Ce qu'on garde

- La **grammaire éditoriale** : kickers `( … )`, numérotation de sections, flèches typographiques, grandes compositions typographiques, grain subtil.
- L'**avatar 3D interactif** du hero et son suivi du regard.
- Le **deck de projets au scroll** (c'est la meilleure pièce du site) : à enrichir, pas à remplacer.
- La phrase-manifeste à mots interactifs de l'About (à rendre accessible).
- Le monogramme `KSBK`.

### 5.2 Ce qui change

**Palette.** On passe d'un fond papier clair à la palette ci-dessous. Je propose d'utiliser ce changement comme **outil narratif** : les phases 1 et 2 sont sombres, puis certaines sections de la phase 3 (journal photo, parcours) peuvent basculer vers l'ivoire, pour que « la lumière s'allume » à mesure que le visiteur me découvre. Valide ou ajuste cette idée dans ta direction artistique.

| Rôle | Couleur |
|---|---|
| Noir profond | `#08090B` |
| Noir graphite | `#121417` |
| Blanc ivoire | `#F4F0E8` (proche de l'actuel `#f2eee6`) |
| Champagne discret | `#C7A76C` |
| Gris pierre | `#92969C` |
| Accent bleu nuit (modéré) | `#142337` |
| Accent bleu glacier (modéré) | `#A6C5CF` |

- Le **vert acide `#d9f154`** et le **bordeaux `#701d18`** disparaissent (ou le bordeaux devient un accent très rare, à justifier). Mettre à jour `theme-color` dans `index.html` et `manifest.json`.
- Le luxe vient de la composition, des matières, de la typographie et de l'espace — **pas d'une accumulation de doré**.
- Vérifie tous les contrastes WCAG AA après migration, en particulier le gris pierre sur noir et le champagne sur ivoire.

**Typographie.** Remplacer Georgia (police système) par une vraie serif éditoriale licenciée pour le web. Space Grotesk et DM Mono peuvent rester si elles servent la direction artistique. Sinon, propose de meilleures options. Auto-héberger les polices (`@fontsource` ou fichiers `woff2`) plutôt que Google Fonts, pour la performance et le RGPD.

**Images.** Je suis passionné par les belles vues : horizons, montagnes, vallées, architecture contemporaine, lever et coucher de soleil, contrastes nature/technologie. Les images doivent servir le récit, pas décorer. Utilise des médias libres de droits **avec licence vérifiée et créditée** (fichier `CREDITS.md`), ou mes propres ressources. **N'invente jamais de photos personnelles.**

### 5.3 Design system

Centralise les tokens (couleurs, typo, espacements, rayons, durées, easings) dans un seul endroit. Choisis **une seule approche de style** et tiens-t'y :

- **Option A :** garder le CSS custom, mais découpé par section (`src/styles/tokens.css`, `src/styles/sections/*.css`) et retirer Tailwind.
- **Option B :** passer à Tailwind avec les tokens dans la config et migrer progressivement `editorial.css`.

Justifie le choix. Le fichier monolithique de 60 Ko doit en tout cas être découpé.

---

## 6. EXPÉRIENCE D'INTRODUCTION — REFONTE DU LOADER

Le loader actuel (`ui/Loader`, minuterie fixe de 2,1 s dans `Layout.jsx`) doit devenir une **intro cinématique** :

1. Écran sombre.
2. Une fine ligne lumineuse se révèle.
3. Un horizon ou une composition abstraite se dessine.
4. La typographie apparaît progressivement.
5. L'identité `KSBK` / mon nom se dévoile.
6. Transition fluide vers le hero (pas de coupure).

Contraintes impératives (non respectées aujourd'hui) :

- Bouton **« Passer »** visible et accessible au clavier, plus touche `Échap`.
- **Ne se rejoue pas** : la jouer une seule fois par session (`sessionStorage`), puis une version très courte (ou rien) ensuite.
- Durée totale ≤ 3 s. Le contenu du hero doit être rendu dans le DOM dès le départ (SEO, LCP), pas monté après le loader.
- Avec `prefers-reduced-motion`, l'intro est remplacée par un simple fondu.

### Hero

Faire évoluer `EditorialHero` + `AvatarHero` :

- Titre « **Quiet by nature.** » puis révélation de « **Limitless by creation.** »
- Mon nom, mon domaine d'expertise, et **un CTA clair vers les projets** (en plus du contact).
- Conserver l'avatar et son regard qui suit le curseur. Sur mobile et tactile, remplacer le suivi par une animation idle légère (déjà partiellement présente).
- Possibilités d'enrichissement : horizon panoramique en fond, profondeur subtile, lumière réagissant au curseur. Premium, pas une juxtaposition de démos techniques.
- Remplacer les libellés actuels « ACTE I / ACTE II » si la nouvelle narration (Silence → Connection → Reveal) les rend incohérents.

---

## 7. SECTION PROJETS — SOURCE DE VÉRITÉ GITHUB

### 7.1 Règle absolue

Profil : https://github.com/khaledopen?tab=repositories

1. Utiliser l'API GitHub (ou le connecteur disponible), avec pagination.
2. Identifier le repository `GoTech-Portfolio`.
3. Prendre sa date `created_at` comme point de départ.
4. Conserver tous les repositories créés **à partir de cette date, date incluse**.
5. Trier chronologiquement selon `created_at` (pas `updated_at` ni `pushed_at`).
6. Lire README, `package.json` / `composer.json` / manifestes et dossiers principaux de chaque repo.
7. Détecter les technologies **réellement utilisées**.
8. Ne rien inventer : fonctionnalités, résultats, liens de démo.
9. Ne pas présenter les forks comme des réalisations originales.
10. Permettre de masquer manuellement un repo non pertinent.

### 7.2 Réconciliation avec l'existant

Produis un **tableau de réconciliation** avant toute modification :

| Repo GitHub | `created_at` | Éligible ? | Déjà dans `constants.js` ? | Description actuelle exacte ? | Action |
|---|---|---|---|---|---|

Points connus à vérifier :

- **CaisseFlow** n'a pas de lien GitHub dans les données. Trouve le repo correspondant ou signale-le-moi (projet privé ?).
- Vérifie que les stacks déclarées (ex. « Laravel 12 », « Socket.io », « Nodemailer ») sont confirmées par les manifestes.
- Vérifie le nom `whraf-hotel` (faute de frappe probable de « wharf », mais c'est le vrai nom du repo : garde l'URL exacte et affiche « Wharf Hôtel »).
- Les projets déjà affichés mais **antérieurs** à `GoTech-Portfolio` : signale-les. Ne les retire pas sans mon accord.

### 7.3 Synchronisation

- Script Node exécuté **au build** (`scripts/sync-github.ts`, lancé en `prebuild`) qui génère `src/data/projects.generated.json`.
- Fichier éditorial séparé `src/data/projects.ts` pour les surcharges manuelles : catégorie, description éditoriale, `featured`, `hidden`, captures, lien démo, ordre.
- Fusion des deux au build. Le JSON généré est **commité** pour que le site reste consultable si l'API est indisponible.
- Token GitHub optionnel via variable d'environnement **côté build uniquement** (`GITHUB_TOKEN`, jamais préfixé `VITE_`). Documenter dans `.env.example`.

### 7.4 Présentation

**Featured Projects** : conserver et enrichir le deck sticky actuel.
- Remplacer les placeholders « initiales + couleur » par de vraies captures dès qu'elles existent, avec un état visuel élégant en attendant.
- Rendre les légendes de galerie pilotées par les données (fini le `'Tableau de bord'` codé en dur).
- Modale accessible : focus trap, retour du focus sur le déclencheur, `Échap`, navigation clavier entre captures, swipe sur mobile.
- Ajouter une **page de détail** (`/projects/:slug`) pour les projets majeurs, via React Router.
- Prévoir une alternative non sticky (liste simple) avec `prefers-reduced-motion` et sur petits écrans si le deck devient inconfortable.

**Project Archive** : tous les autres projets éligibles, filtrables par technologie et domaine, numérotation calculée (fini `index + 7`), accessible au clavier.

Pour chaque projet : nom, catégorie, description fondée sur le repo, stack, année, capture, lien GitHub, lien démo s'il existe, fonctionnalités confirmées.

Ne supprime aucun projet éligible pour épurer le design. Chacun doit rester consultable.

Titre de section : « **Built with intention.** »

---

## 8. SECTIONS — EXISTANT → CIBLE

| # | Section cible | Point de départ | Travail |
|---|---|---|---|
| 01 | **Home / First impression** | `EditorialHero` + `AvatarHero` + `EditorialHeader` | Évolution (§6). Navigation flottante : corriger le `min-width: 620px` sur mobile, ajouter un focus trap au menu, mettre à jour les liens de nav selon les nouvelles sections |
| 02 | **About / Behind the silence** — « There's more behind the silence. » | `EditorialAbout` | Garder la phrase-manifeste, réécrire le texte selon ma personnalité (réservé mais profondément passionné ; la réserve n'est **pas** un défaut). Mise en page asymétrique, emplacement photo personnelle **remplaçable** (placeholder élégant tant que je n'en fournis pas), mots interactifs accessibles au clavier et au tactile |
| 03 | **Selected Work** — « Built with intention. » | `EditorialProjects` + `EditorialArchive` | §7 |
| 04 | **Technical Universe** — « The tools behind the vision. » | Orbite de technologies dans `EditorialAbout` | Extraire en section dédiée. Regrouper par domaine (Frontend, Backend, Mobile, Data, DevOps…) **à partir des technologies détectées dans les repos**. Chaque techno renvoie aux projets qui l'utilisent (preuve concrète). Pas de pourcentages. Icônes auto-hébergées (SVG locaux, plus de CDN jsDelivr) |
| 05 | **Hackathons & Competitions** — « Beyond the code. » / « Challenges. People. Moments. » | **N'existe pas** | À créer (§9) |
| 06 | **My World** — « Outside the screen. » | **N'existe pas** | À créer : journal photographique, grandes images, très peu de texte (vues, calme, architecture, luxe discret, discipline) |
| 07 | **Philosophy** — « Built through discipline. » | `EditorialProcess` (5 étapes génériques) | Transformer : discipline, persévérance, excellence, curiosité, créativité, ambition. Phrases sobres, personnelles et crédibles, pas de citations motivationnelles. La méthode en 5 étapes peut être conservée en sous-partie si elle reste pertinente |
| 08 | **Experience & Journey** | `workExperience` dans `constants.js` (non affiché) + note formation dans Process | Créer une vraie timeline animée au scroll, **uniquement avec des événements confirmés** : UPB, projets marquants (dates issues de GitHub), hackathons, certifications. L'ancre `#experience` doit pointer ici |
| 09 | **Contact** — « Let's create something meaningful. » | `EditorialContact` + `EditorialFooter` | Ajouter GitHub, email et CV **seulement si fournis**. Formulaire uniquement si un service sécurisé est configuré (sinon, pas de faux formulaire). Footer mémorable (le `KSBK` géant actuel est une bonne base) |

Mettre à jour la numérotation des kickers (actuellement `xx / 05`) selon le nombre réel de sections.

---

## 9. HACKATHONS & COMPETITIONS — NOUVELLE SECTION MAJEURE

Galerie éditoriale immersive : masonry, plein écran, transitions fluides, zoom, séquences en défilement horizontal, profondeur, révélations, **lightbox accessible** (clavier, focus trap, `Échap`, flèches), gestes tactiles sur mobile.

Pour chaque événement : nom, date, lieu, photos, description, mon rôle, équipe (si renseignée), défi, projet présenté, résultat (**uniquement s'il est confirmé**), leçon retenue.

Structure des médias :

```
public/images/hackathons/
public/images/competitions/
public/images/events/
```

Données dans `src/data/hackathons.ts` : ajouter un événement ne doit **jamais** nécessiter de modifier un composant. Fournis un exemple commenté dans le fichier, mais **aucun événement fictif rendu à l'écran**.

Sans photos : un état vide élégant (« Moments à venir », par exemple), jamais de faux souvenirs.

Je n'ai pas encore fourni de photos ni d'événements : **demande-les-moi** à la fin.

---

## 10. MOTION DESIGN

Aujourd'hui toutes les animations sont faites à la main (rAF + variables CSS). C'est léger et ça fonctionne.

- Introduire **GSAP + ScrollTrigger** là où ils apportent une vraie valeur : intro, text reveal par lignes, timeline, séquences horizontales de la galerie, transitions de pages. Évalue si le deck de projets gagne à être migré vers ScrollTrigger ou s'il vaut mieux le garder tel quel.
- **Three.js / React Three Fiber** seulement si une scène précise le justifie (horizon génératif, par exemple). Chargement paresseux, jamais dans le bundle initial, fallback image sur mobile et appareils peu puissants.
- **Lenis** seulement si nécessaire. Attention : `html { scroll-behavior: smooth }` est déjà défini, et il ne faut pas cumuler les deux.
- Ne pas animer tout partout. Rythme, composition, surprise. Pas d'effet identique à chaque scroll.
- **`prefers-reduced-motion` est aujourd'hui très peu géré dans le CSS** (une seule règle). Il doit couvrir : grain animé, reveals, deck, intro, marquee, avatar, curseur.
- Le curseur custom doit être désactivé sur les appareils tactiles.
- Ne jamais bloquer une interaction derrière une animation.

---

## 11. STACK CIBLE & MIGRATION

| Élément | Cible |
|---|---|
| React / Vite / React Router | Conserver (déjà à jour) |
| **TypeScript strict** | Migrer progressivement (`.jsx` → `.tsx`) : d'abord `tsconfig.json` + types de données, puis composant par composant. Le build doit passer à chaque étape |
| Styles | Selon le choix §5.3 |
| GSAP + ScrollTrigger | Ajouter |
| Three.js / R3F | Optionnel, lazy |
| Lucide Icons | Ajouter (remplace `common/Icons.jsx` si pertinent) |
| Lightbox | Implémentation maison testée ou librairie accessible |
| `vite-plugin-pwa` | Le configurer correctement **ou** le retirer. Ne pas laisser une dépendance morte |

Arborescence cible :

```
src/
  components/   sections/   pages/   layouts/
  animations/   hooks/      data/    lib/
  styles/       types/
public/images/  public/videos/
scripts/        (sync GitHub)
```

Fichiers de données : `projects.ts`, `hackathons.ts`, `experiences.ts`, `skills.ts`, `profile.ts`, `siteConfig.ts`. Le contenu actuel de `src/utils/constants.js` y est réparti, puis le fichier est supprimé.

Séparer données, logique, animations et présentation.

---

## 12. RESPONSIVE, PERFORMANCE, SEO

- Mobile-first. Le deck sticky, la nav (`min-width` fixe) et l'orbite de technos doivent être vérifiés en premier sur 360-414 px.
- Images : compresser les PNG actuels (avatar ≈ 1 Mo, captures ≈ 250 Ko) en **AVIF/WebP** avec `<picture>`, dimensions explicites, lazy loading hors hero, `fetchpriority="high"` sur l'avatar.
- Code splitting par route et par section lourde (galerie, 3D).
- Polices auto-hébergées avec `font-display: swap` et préchargement ciblé.
- SEO : compléter `index.html` (`og:image`, `og:url`, `canonical`, `twitter:card = summary_large_image`), ajouter `sitemap.xml`, mettre à jour `robots.txt`, ajouter des données structurées `Person`.
- États de chargement, gestion d'erreurs, page 404.
- Vise d'excellents scores Lighthouse **sans annoncer de scores fictifs**. Mesure-les réellement.

---

## 13. MÉTHODE DE TRAVAIL OBLIGATOIRE

### Phase A — Discovery (adaptée)
- Lire le code existant (ce prompt en résume l'état, mais vérifie-le).
- Lister le code mort (§2.5) en vérifiant les imports.
- Inventorier les skills disponibles.
- Analyser les repos GitHub et produire le **tableau de réconciliation** (§7.2).
- Lancer `npm run build` et `npm run lint` pour connaître l'état de départ.

### Phase B — Creative Direction
Concept, identité, palette (et stratégie sombre → clair), typographie, références, storytelling, direction photo, motion language. **Indique explicitement ce qui est conservé de la version actuelle et ce qui change.**

### Phase C — Design System
Tokens, composants, grilles, espacements, variantes, interactions, règles responsive.

### Phase D — Implémentation, par étapes livrables
Ordre recommandé, chaque étape devant laisser le site fonctionnel :
1. Nettoyage du code mort + mise en place de TypeScript + découpage des données.
2. Tokens et nouvelle palette/typo appliqués aux sections existantes.
3. Intro + Hero.
4. Sync GitHub + section projets enrichie + page détail.
5. Technical Universe.
6. Hackathons (structure + état vide).
7. My World, Philosophy, Journey.
8. Contact + footer.
9. Motion (GSAP) et polish.

Committer après chaque étape avec un message clair.

### Phase E — Quality Assurance
TypeScript, build, lint, liens (tous les liens GitHub et LinkedIn), navigation clavier complète, responsive, contrastes, images, animations, `prefers-reduced-motion`, cas d'erreur (API GitHub indisponible, image manquante).

### Phase F — Delivery
- Arborescence finale.
- Installation, lancement, build.
- Déploiement Vercel (mettre à jour `vercel.json` pour le fallback SPA si de nouvelles routes sont ajoutées).
- Comment ajouter ou masquer un projet.
- Comment ajouter des photos et un événement de hackathon.
- Liste de ce qui reste à me fournir (§15).

---

## 14. CONTRAINTES CRÉATIVES

Je ne veux pas : une landing SaaS, uniquement des cartes rectangulaires, du noir + néons, des barres de compétences en %, des animations identiques à chaque scroll, du glassmorphism excessif, des textes marketing creux, de faux témoignages, de fausses statistiques, des réalisations inventées, un template recoloré.

Je veux : une vraie identité, une découverte progressive, une esthétique luxueuse, une typographie exceptionnelle, une personnalité perceptible, des animations mémorables, une section projets très travaillée, une galerie hackathons remarquable, un mobile soigné, un code professionnel et maintenable.

---

## 15. CE QUE JE DOIS ENCORE FOURNIR — DEMANDE-LE-MOI À LA FIN

- Photo(s) personnelle(s) pour About.
- Photos et détails des hackathons et compétitions.
- Email de contact public (ou confirmation de ne pas en afficher).
- CV en PDF.
- Lien du repo CaisseFlow (ou confirmation qu'il est privé).
- Liens de démo éventuels.
- Statut et origine des illustrations du dossier `artwork/`.
- Captures d'écran des autres projets featured.
- Certifications et expériences à ajouter à la timeline.
- Domaine final du site (pour `canonical`, `og:url`, sitemap).

---

## 16. CRITÈRES D'ACCEPTATION

1. Le portfolio est navigable et le build de production passe.
2. TypeScript strict, sans `any` injustifié.
3. Le code mort a été retiré.
4. Tous les repos éligibles depuis `GoTech-Portfolio` sont identifiés et triés par `created_at`.
5. Les descriptions de projets sont vérifiées contre les repos.
6. L'intro peut être passée et ne se rejoue pas à chaque visite.
7. La galerie hackathons est prête à recevoir mes photos sans toucher aux composants.
8. Les principales animations fonctionnent, et le site reste pleinement utilisable sans elles.
9. Le mobile est soigné (nav, deck, galerie).
10. Aucun secret n'est exposé dans le bundle.
11. Tous les liens fonctionnent.
12. La personnalité « Quiet by nature. Limitless by creation. » se ressent, et l'ADN de la version actuelle (éditorial, avatar, deck) reste reconnaissable.

---

## 17. INSTRUCTION FINALE

Je ne cherche pas seulement un site qui prouve que je sais coder. Je veux un site qui montre comment je pense, ce qui m'inspire, ce que je construis et comment je travaille.

Le visiteur doit ressentir : **Curiosité → Découverte → Admiration du travail → Connexion humaine.**

Je suis discret, mais mes créations peuvent être expressives. Attaché au calme, mais très ambitieux. J'apprécie le luxe, mais je privilégie la substance à l'apparence. Fais de ces contrastes l'ADN du portfolio.

**Build a digital experience that feels personal, cinematic, refined and unmistakably mine.**

**Commence par la Phase A :** lis le code existant, vérifie l'état décrit en §2, inventorie les skills, produis le tableau de réconciliation GitHub, puis présente la direction artistique (en précisant ce qui est conservé et ce qui change) avant de passer à l'implémentation par étapes.
