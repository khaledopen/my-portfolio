import React, { useEffect, useRef, useState } from 'react';
import { featuredProjects } from '../../utils/constants';

const ProjectVisual = ({ project, index }) => (
  <div className={`project-visual project-visual--${index + 1}`} style={{ '--project-color': project.color }}>
    <div className="visual-grid" />
    <span className="visual-code">{project.short}</span>
    <span className="visual-index">NO. {String(index + 1).padStart(2, '0')}</span>
    <span className="visual-type">{project.eyebrow}</span>
    <div className="visual-orbit"><i /><i /><i /></div>
  </div>
);

const EditorialProjects = () => {
  const deckRef = useRef(null);
  const [activeProject, setActiveProject] = useState(0);

  useEffect(() => {
    const deck = deckRef.current;
    if (!deck) return undefined;
    let frame;

    const update = () => {
      const rect = deck.getBoundingClientRect();
      const distance = deck.offsetHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, -rect.top / Math.max(distance, 1)));
      const scaled = progress * featuredProjects.length;
      const nextActive = Math.min(featuredProjects.length - 1, Math.floor(scaled));
      const localProgress = Math.min(1, scaled - nextActive);
      deck.style.setProperty('--deck-progress', `${progress * 100}%`);
      deck.style.setProperty('--local-progress', localProgress.toFixed(3));
      deck.style.setProperty('--open-x', `${localProgress * -4.5}vw`);
      deck.style.setProperty('--open-rotation', `${localProgress * -2.5}deg`);
      deck.style.setProperty('--open-scale', (1 + localProgress * .035).toFixed(3));
      deck.style.setProperty('--detail-y', `${Math.max(0, 28 - localProgress * 112)}px`);
      deck.style.setProperty('--detail-opacity', Math.min(1, .28 + localProgress * 3).toFixed(3));
      setActiveProject(current => current === nextActive ? current : nextActive);
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
  }, []);

  const active = featuredProjects[activeProject];

  return (
    <section id="projects" className="work-section">
      <div className="editorial-section work-intro">
        <div className="section-kicker" data-reveal>
          <span>( ACTE I — LE TRAVAIL )</span><span>02 / 05</span>
        </div>
        <div className="work-heading" data-reveal>
          <h2>Projets<br /><em>sélectionnés</em></h2>
          <p>Faites défiler pour ouvrir la collection, projet après projet.</p>
        </div>
      </div>

      <div ref={deckRef} className="project-deck" style={{ height: `${(featuredProjects.length + .7) * 100}vh` }}>
        <div className="project-deck__sticky">
          <div className="deck-guides" aria-hidden="true"><i /><i /><i /></div>
          <div className="deck-topline">
            <span>COLLECTION / 2026</span>
            <span>SCROLL POUR OUVRIR ↓</span>
          </div>

          <div className="deck-cards" aria-live="polite">
            {featuredProjects.map((project, index) => {
              const state = index < activeProject ? 'is-past' : index === activeProject ? 'is-active' : 'is-future';
              const spreadX = index % 2 === 0 ? -38 : 38;
              const spreadY = ((index % 3) - 1) * 25;
              const rotation = index % 2 === 0 ? -12 - index : 10 + index;
              return (
                <article
                  className={`project-deck-card ${state}`}
                  key={project.github}
                  style={{
                    '--deck-index': index,
                    '--future-offset': `${Math.max(0, index - activeProject) * 7}px`,
                    '--future-rotation': `${[-3, 2, -1, 3, -2, 1][index]}deg`,
                    '--spread-x': `${spreadX}vw`,
                    '--spread-y': `${spreadY}vh`,
                    '--spread-rotation': `${rotation}deg`,
                    zIndex: featuredProjects.length - Math.abs(index - activeProject)
                  }}
                  aria-hidden={index !== activeProject}
                >
                  <a href={project.github} target="_blank" rel="noreferrer" tabIndex={index === activeProject ? 0 : -1} aria-label={`Voir ${project.title} sur GitHub`}>
                    <ProjectVisual project={project} index={index} />
                    <div className="deck-card-label"><span>NO. {String(index + 1).padStart(2, '0')}</span><strong>{project.title}</strong></div>
                  </a>
                </article>
              );
            })}
          </div>

          <aside className="deck-details" key={active.github}>
            <span className="deck-details__number">NO. {String(activeProject + 1).padStart(2, '0')}</span>
            <p>{active.eyebrow}</p>
            <h3>{active.title}</h3>
            <div className="deck-details__line" />
            <p className="deck-details__copy">{active.description}</p>
            <ul>{active.technologies.map(technology => <li key={technology}>{technology}</li>)}</ul>
            <a href={active.github} target="_blank" rel="noreferrer">OUVRIR LE PROJET <i>↗</i></a>
          </aside>

          <div className="deck-pagination">
            <span>{String(activeProject + 1).padStart(2, '0')}</span>
            <div>{featuredProjects.map((project, index) => <i className={index === activeProject ? 'is-active' : ''} key={project.github} />)}</div>
            <span>{String(featuredProjects.length).padStart(2, '0')}</span>
          </div>
          <div className="deck-progress"><i /></div>
        </div>
      </div>

      <div className="work-outro editorial-section">
        <a className="all-projects-link" href="https://github.com/khaledopen?tab=repositories" target="_blank" rel="noreferrer" data-reveal>
          <span>EXPLORER TOUS LES DÉPÔTS</span><i>↗</i>
        </a>
      </div>
    </section>
  );
};

export default EditorialProjects;
