import type { JourneyItem } from '../types';

/**
 * PARCOURS — uniquement des événements confirmés.
 * Les étapes « projet » sont complétées automatiquement à partir des dates GitHub (voir lib/journey.ts).
 * Ajoute ici formations, certifications, expériences, hackathons, avec leur date (AAAA-MM-JJ ou AAAA-MM),
 * ou `date: null` pour une étape en cours sans date connue.
 */
export const journeyManual: JourneyItem[] = [
  {
    date: null,
    when: 'En cours',
    title: 'Informatique — Université Polytechnique de Bingerville',
    detail: 'Formation en informatique à Abidjan : programmation, conception d’interfaces, projets numériques.',
    kind: 'formation',
    href: 'https://www.linkedin.com/school/universite-polytechnique-de-bingerville/'
  }
];

/** Dépôts dont la date de premier commit marque une étape du parcours (dans l'ordre que tu veux voir). */
export const journeyMilestones: { repo: string; title: string; detail: string }[] = [
  { repo: 'mon-projet-react', title: 'Premier dépôt React', detail: 'Le plus ancien projet React public : les débuts avec Vite.' },
  { repo: 'GoTech-Portfolio', title: 'GoTech', detail: 'Point de départ des projets présentés ici.' },
  { repo: 'attou-immoApk', title: 'AttouHome', detail: 'Deux applications mobiles, une console d’administration et une API temps réel.' },
  { repo: 'Gestion-Caisse', title: 'CaisseFlow', detail: 'Laravel, PDF, exports Excel et 14 tests automatisés.' },
  { repo: 'institut-beauty', title: 'Belleza', detail: 'Un SaaS multi-établissements en TypeScript.' },
  { repo: 'Bot_english', title: 'EnglishMate AI', detail: 'Un bot Telegram construit autour de l’IA vocale.' },
  { repo: 'Portail-inter-associatif', title: 'Portail inter-associatif', detail: 'Un guichet numérique pensé pour l’inclusion.' }
];
