/** Métadonnées issues de GitHub (src/data/github.generated.json). */
export interface GithubRepo {
  name: string;
  url: string;
  /** ISO 8601. Avec source "git-first-commit", il s'agit de la date du premier commit. */
  createdAt: string | null;
  pushedAt: string | null;
  fork: boolean | null;
  empty: boolean;
  description: string | null;
  homepage: string | null;
  language: string | null;
}

export interface GithubSnapshot {
  source: 'github-api' | 'git-first-commit';
  note: string;
  generatedAt: string;
  owner: string;
  repos: GithubRepo[];
}

export type ProjectDomain = 'Gestion & finance' | 'Immobilier' | 'Hôtellerie & services' | 'Associatif' | 'IA & bots' | 'Outils' | 'Web & vitrine';

export interface ProjectImage {
  /** Chemin de l'image originale dans /public (.png/.jpg). Les versions .avif/.webp générées par `npm run images` sont utilisées si présentes. */
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
}

/** Contenu éditorial vérifié, saisi à la main dans src/data/projects.ts. */
export interface ProjectEntry {
  /** Nom exact du dépôt GitHub. */
  repo: string;
  slug: string;
  title: string;
  domain: ProjectDomain;
  /** Une phrase, fondée sur le README / le code. */
  summary: string;
  /** Fonctionnalités confirmées dans le dépôt. */
  features: string[];
  /** Technologies confirmées par les manifestes (package.json, composer.json…). */
  stack: string[];
  featured?: boolean;
  /** Masquer sans supprimer (raison obligatoire, pour mémoire). */
  hidden?: { reason: string };
  /** Afficher même si le dépôt est antérieur à GoTech-Portfolio. */
  includeBeforeStart?: { reason: string };
  demo?: string;
  images?: ProjectImage[];
  /** Mention honnête (ex. projet d'équipe, version en cours). */
  note?: string;
}

/** Projet prêt à afficher : éditorial + GitHub fusionnés. */
export interface Project extends ProjectEntry {
  url: string;
  createdAt: string | null;
  year: string;
  index: number;
}

export interface HackathonEvent {
  slug: string;
  name: string;
  kind: 'hackathon' | 'competition' | 'event';
  /** AAAA-MM-JJ */
  date: string;
  location: string;
  description: string;
  role: string;
  team?: string[];
  challenge?: string;
  /** slug d'un projet de src/data/projects.ts ou nom libre */
  project?: string;
  /** Uniquement si confirmé. */
  result?: string;
  lesson?: string;
  photos: { src: string; alt: string; width: number; height: number }[];
}

export interface JourneyItem {
  /** AAAA-MM ou AAAA-MM-JJ ; null = en cours, date de début non renseignée */
  date: string | null;
  /** Libellé d'affichage de la date */
  when: string;
  title: string;
  detail: string;
  kind: 'formation' | 'projet' | 'hackathon' | 'certification' | 'experience';
  href?: string;
}
