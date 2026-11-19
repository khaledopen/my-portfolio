import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { archiveProjects, projects } from '../lib/projects';

const ALL = 'Tous';

export function Archive() {
  const [domain, setDomain] = useState(ALL);
  const [tech, setTech] = useState(ALL);

  const domains = useMemo(() => [ALL, ...Array.from(new Set(archiveProjects.map(p => p.domain))).sort()], []);
  const techs = useMemo(() => [ALL, ...Array.from(new Set(archiveProjects.flatMap(p => p.stack))).sort((a, b) => a.localeCompare(b, 'fr'))], []);
  const visible = archiveProjects.filter(p => (domain === ALL || p.domain === domain) && (tech === ALL || p.stack.includes(tech)));

  return (
    <section className="section archive" aria-labelledby="archive-title">
      <div className="wrap">
        <div className="archive__head">
          <h2 id="archive-title">L’archive</h2>
          <p>
            Tous les autres projets publics depuis GoTech, sans tri arbitraire. <span className="mono">{projects.length} projets au total.</span>
          </p>
        </div>

        <div className="archive__filters" role="group" aria-label="Filtrer l’archive">
          <div className="archive__domains">
            {domains.map(item => (
              <button key={item} type="button" aria-pressed={domain === item} onClick={() => setDomain(item)}>
                {item}
              </button>
            ))}
          </div>
          <label className="archive__tech">
            <span>Technologie</span>
            <select value={tech} onChange={event => setTech(event.target.value)}>
              {techs.map(item => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
        </div>

        <p className="sr-only" aria-live="polite">
          {visible.length} projets affichés
        </p>

        {visible.length === 0 ? (
          <p className="archive__empty">
            Aucun projet ne combine ces deux filtres.{' '}
            <button
              type="button"
              className="text-link"
              onClick={() => {
                setDomain(ALL);
                setTech(ALL);
              }}
            >
              Réinitialiser les filtres
            </button>
          </p>
        ) : (
          <ul className="archive__list">
            {visible.map(project => (
              <li key={project.slug}>
                <Link to={`/projects/${project.slug}`} className="archive__row">
                  <span className="archive__year mono">{project.year}</span>
                  <span className="archive__title">{project.title}</span>
                  <span className="archive__summary">{project.summary}</span>
                  <span className="archive__stack mono">{project.stack.slice(0, 3).join(', ')}</span>
                  <ArrowUpRight className="archive__arrow" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
