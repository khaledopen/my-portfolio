import { journeyManual, journeyMilestones } from '../data/experiences';
import { hackathons } from '../data/hackathons';
import { findProjectByRepo, formatMonth, repoCreatedAt } from './projects';
import type { JourneyItem } from '../types';

/** Parcours : étapes confirmées (saisie manuelle + dates GitHub + hackathons), de la plus récente à la plus ancienne. */
export function buildJourney(): JourneyItem[] {
  const fromRepos: JourneyItem[] = journeyMilestones.flatMap(milestone => {
    const date = repoCreatedAt(milestone.repo);
    if (!date) return [];
    const project = findProjectByRepo(milestone.repo);
    return [
      {
        date,
        when: formatMonth(date),
        title: milestone.title,
        detail: milestone.detail,
        kind: 'projet' as const,
        href: project ? `/projects/${project.slug}` : `https://github.com/khaledopen/${milestone.repo}`
      }
    ];
  });

  const fromEvents: JourneyItem[] = hackathons.map(event => ({
    date: event.date,
    when: formatMonth(event.date),
    title: event.name,
    detail: event.result ? `${event.role}. ${event.result}.` : event.role,
    kind: 'hackathon' as const,
    href: '/#moments'
  }));

  const dated = [...journeyManual.filter(item => item.date), ...fromRepos, ...fromEvents].sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''));
  return [...journeyManual.filter(item => !item.date), ...dated];
}
