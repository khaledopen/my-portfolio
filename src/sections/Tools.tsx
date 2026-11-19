import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { skillDomains } from '../data/skills';
import { projectsUsing } from '../lib/projects';

/**
 * Univers technique : pas de pourcentages, des preuves.
 * Chaque outil renvoie aux projets qui l'utilisent réellement.
 */
export function Tools() {
  const domains = useMemo(
    () => skillDomains.map(d => ({ ...d, tools: d.tools.map(name => ({ name, projects: projectsUsing(name) })).filter(t => t.projects.length > 0) })).filter(d => d.tools.length > 0),
    []
  );
  const [selected, setSelected] = useState<string>('React');
  const usedIn = projectsUsing(selected);

  return (
    <section id="tools" className="section tools" aria-labelledby="tools-title">
      <div className="wrap section-head">
        <h2 id="tools-title">Les outils derrière la vision.</h2>
        <p>Choisissez un outil pour voir où il a servi. Le chiffre indique le nombre de projets publiés qui l’utilisent.</p>
      </div>

      <div className="wrap tools__layout">
        <div className="tools__domains">
          {domains.map(domain => (
            <div key={domain.domain} className="tools__domain">
              <div className="tools__domain-head">
                <h3>{domain.domain}</h3>
                <p>{domain.intent}</p>
              </div>
              <ul className="tools__list">
                {domain.tools.map(tool => (
                  <li key={tool.name}>
                    <button type="button" aria-pressed={selected === tool.name} onClick={() => setSelected(tool.name)}>
                      {tool.name}
                      <span className="mono" aria-label={`${tool.projects.length} projets`}>
                        {tool.projects.length}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <aside className="tools__panel" aria-live="polite">
          <p className="tools__panel-label">Utilisé dans</p>
          <p className="tools__panel-tool">{selected}</p>
          <ul>
            {usedIn.map(project => (
              <li key={project.slug}>
                <Link to={`/projects/${project.slug}`} className="text-link">
                  {project.title}
                </Link>
                <span className="mono">{project.year}</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
