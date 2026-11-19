import type { CSSProperties } from 'react';
import type { Project, ProjectDomain } from '../types';
import { Picture } from './Picture';

const tints: Record<ProjectDomain, string> = {
  'Gestion & finance': 'rgb(199 167 108 / 0.22)',
  Immobilier: 'rgb(166 197 207 / 0.18)',
  'Hôtellerie & services': 'rgb(199 167 108 / 0.16)',
  Associatif: 'rgb(166 197 207 / 0.14)',
  'IA & bots': 'rgb(120 150 200 / 0.2)',
  Outils: 'rgb(146 150 156 / 0.16)',
  'Web & vitrine': 'rgb(244 240 232 / 0.1)'
};

/**
 * Couverture d'un projet : sa première capture si elle existe,
 * sinon une composition typographique honnête (aucune fausse capture).
 */
export function ProjectCover({ project, priority = false }: { project: Project; priority?: boolean }) {
  const image = project.images?.[0];
  if (image) {
    return (
      <div className="cover cover--image">
        <Picture src={image.src} alt={image.alt} width={image.width} height={image.height} priority={priority} />
      </div>
    );
  }
  // Chaque projet a son propre « lever de soleil » : position et teinte dérivées de ses données
  const style = {
    '--sun-x': `${18 + ((project.index * 37) % 64)}%`,
    '--tint': tints[project.domain]
  } as CSSProperties;
  return (
    <div className="cover cover--type" style={style} aria-hidden="true">
      <span className="cover__sun" />
      <span className="cover__title">{project.title}</span>
      <span className="cover__horizon" />
      <span className="cover__meta mono">{project.stack.slice(0, 4).join('  /  ')}</span>
    </div>
  );
}
