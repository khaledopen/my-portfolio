import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { featuredProjects } from '../lib/projects';
import { ProjectCover } from '../components/ProjectCover';
import { useMediaQuery, useReducedMotion } from '../hooks/useMediaQuery';
import type { Project } from '../types';

function ProjectFacts({ project, headingLevel = 3 }: { project: Project; headingLevel?: 2 | 3 }) {
  const Heading = headingLevel === 2 ? 'h2' : 'h3';
  return (
    <>
      <p className="facts__domain">
        {project.domain}
        <span className="mono"> {project.year}</span>
      </p>
      <Heading className="facts__title">{project.title}</Heading>
      <p className="facts__summary">{project.summary}</p>
      <ul className="facts__stack mono" aria-label="Technologies">
        {project.stack.map(tech => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>
      <Link className="button" to={`/projects/${project.slug}`}>
        Découvrir {project.title} <ArrowUpRight aria-hidden="true" />
      </Link>
    </>
  );
}

/** Deck « sticky » : les projets s'ouvrent un à un au fil du défilement (grands écrans). */
function Deck() {
  const deck = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const count = featuredProjects.length;

  useEffect(() => {
    const el = deck.current;
    if (!el) return undefined;
    let frame = 0;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const distance = el.offsetHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, -rect.top / Math.max(distance, 1)));
      const scaled = progress * count;
      const next = Math.min(count - 1, Math.floor(scaled));
      const local = Math.min(1, scaled - next);
      el.style.setProperty('--deck-progress', progress.toFixed(4));
      el.style.setProperty('--local', local.toFixed(3));
      setActive(current => (current === next ? current : next));
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [count]);

  const current = featuredProjects[active];
  if (!current) return null;

  return (
    <div ref={deck} className="deck" style={{ height: `${(count + 0.6) * 100}svh` }}>
      <div className="deck__sticky">
        <div className="deck__cards">
          {featuredProjects.map((project, index) => {
            const state = index < active ? 'is-past' : index === active ? 'is-active' : 'is-future';
            return (
              <article
                key={project.slug}
                className={`deck__card ${state}`}
                style={{ '--offset': index - active, '--side': index % 2 === 0 ? -1 : 1, zIndex: count - Math.abs(index - active) } as CSSProperties}
                aria-hidden={index !== active}
              >
                <Link to={`/projects/${project.slug}`} tabIndex={-1} aria-label={project.title}>
                  <ProjectCover project={project} />
                </Link>
              </article>
            );
          })}
        </div>
        <aside className="deck__facts facts" key={current.slug} aria-live="polite">
          <p className="deck__count mono" aria-label={`Projet ${active + 1} sur ${count}`}>
            {String(active + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
          </p>
          <ProjectFacts project={current} />
        </aside>
        <div className="deck__progress" aria-hidden="true">
          <i />
        </div>
      </div>
    </div>
  );
}

/** Version empilée : petits écrans ou mouvement réduit. */
function Stack() {
  return (
    <ol className="work-stack wrap">
      {featuredProjects.map((project, index) => (
        <li key={project.slug} className="work-stack__item">
          <Link to={`/projects/${project.slug}`} className="work-stack__cover" tabIndex={-1} aria-hidden="true">
            <ProjectCover project={project} />
          </Link>
          <div className="facts">
            <p className="deck__count mono">
              {String(index + 1).padStart(2, '0')} / {String(featuredProjects.length).padStart(2, '0')}
            </p>
            <ProjectFacts project={project} />
          </div>
        </li>
      ))}
    </ol>
  );
}

export function Work() {
  const large = useMediaQuery('(min-width: 900px)', true);
  const reduced = useReducedMotion();
  return (
    <section id="work" className="section work" aria-labelledby="work-title">
      <div className="wrap section-head">
        <h2 id="work-title">Construit avec intention.</h2>
        <p>Une sélection de projets aboutis, du plus récent au plus ancien. Chacun répond à un besoin réel, d’une caisse partagée à un bot qui fait parler anglais.</p>
      </div>
      {large && !reduced ? <Deck /> : <Stack />}
    </section>
  );
}
