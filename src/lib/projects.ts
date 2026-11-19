import snapshot from '../data/github.generated.json';
import { projectEntries, START_REPO } from '../data/projects';
import type { GithubRepo, GithubSnapshot, Project, ProjectEntry } from '../types';

const github = snapshot as GithubSnapshot;
const byName = new Map<string, GithubRepo>(github.repos.map(repo => [repo.name, repo]));
const entryByRepo = new Map<string, ProjectEntry>(projectEntries.map(entry => [entry.repo, entry]));

export const githubSource = { source: github.source, generatedAt: github.generatedAt, note: github.note };

const startDate = byName.get(START_REPO)?.createdAt ?? null;

function slugify(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/** Projet minimal pour un dépôt public non encore décrit dans projects.ts. */
function fallbackEntry(repo: GithubRepo): ProjectEntry {
  return {
    repo: repo.name,
    slug: slugify(repo.name),
    title: repo.name.replace(/[-_]/g, ' '),
    domain: 'Outils',
    summary: repo.description ?? 'Description à venir.',
    features: [],
    stack: repo.language ? [repo.language] : []
  };
}

function isEligible(repo: GithubRepo, entry: ProjectEntry | undefined): boolean {
  if (repo.empty || repo.fork === true) return false;
  if (entry?.hidden) return false;
  if (entry?.includeBeforeStart) return true;
  if (!startDate || !repo.createdAt) return false;
  return repo.createdAt >= startDate;
}

/** Tous les projets affichables, du plus ancien au plus récent (created_at). */
export const projects: Project[] = github.repos
  .filter(repo => isEligible(repo, entryByRepo.get(repo.name)))
  .sort((a, b) => (a.createdAt ?? '').localeCompare(b.createdAt ?? ''))
  .map((repo, index) => {
    const entry = entryByRepo.get(repo.name) ?? fallbackEntry(repo);
    return {
      ...entry,
      demo: entry.demo ?? repo.homepage ?? undefined,
      url: repo.url,
      createdAt: repo.createdAt,
      year: repo.createdAt ? repo.createdAt.slice(0, 4) : '—',
      index: index + 1
    };
  });

/** Ordre de présentation : du plus récent au plus ancien pour la vitrine. */
export const featuredProjects = projects
  .filter(p => p.featured)
  .slice()
  .reverse();
export const archiveProjects = projects
  .filter(p => !p.featured)
  .slice()
  .reverse();

export function findProject(slug: string | undefined): Project | undefined {
  return projects.find(p => p.slug === slug);
}

export function projectsUsing(tech: string): Project[] {
  return projects.filter(p => p.stack.includes(tech));
}

export function repoCreatedAt(name: string): string | null {
  return byName.get(name)?.createdAt ?? null;
}

const monthFormatter = new Intl.DateTimeFormat('fr-FR', { month: 'long', year: 'numeric' });
export function formatMonth(iso: string | null): string {
  if (!iso) return '—';
  const date = new Date(iso.length === 7 ? `${iso}-01` : iso);
  return Number.isNaN(date.getTime()) ? iso : monthFormatter.format(date);
}

export function findProjectByRepo(repo: string): Project | undefined {
  return projects.find(p => p.repo === repo);
}
