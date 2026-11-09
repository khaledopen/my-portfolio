import React from 'react';
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

const EditorialProjects = () => (
  <section id="projects" className="work-section">
    <div className="editorial-section work-intro">
      <div className="section-kicker" data-reveal>
        <span>( ACTE I — LE TRAVAIL )</span><span>02 / 05</span>
      </div>
      <div className="work-heading" data-reveal>
        <h2>Projets<br /><em>sélectionnés</em></h2>
        <p>Chaque projet se révèle naturellement au fil du scroll.</p>
      </div>
    </div>

    <div className="mobile-project-list">
      {featuredProjects.map((project, index) => (
        <article
          className="mobile-project-card"
          data-reveal
          key={project.github}
          style={{ '--delay': `${Math.min(index * 55, 220)}ms` }}
        >
          <a href={project.github} target="_blank" rel="noreferrer" aria-label={`Voir ${project.title} sur GitHub`}>
            <ProjectVisual project={project} index={index} />
            <div className="mobile-project-card__body">
              <div className="mobile-project-card__meta">
                <span>NO. {String(index + 1).padStart(2, '0')}</span>
                <span>{project.eyebrow}</span>
              </div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <ul>{project.technologies.map(technology => <li key={technology}>{technology}</li>)}</ul>
              <strong>OUVRIR SUR GITHUB <i>↗</i></strong>
            </div>
          </a>
        </article>
      ))}
    </div>

    <div className="work-outro editorial-section">
      <a className="all-projects-link" href="https://github.com/khaledopen?tab=repositories" target="_blank" rel="noreferrer" data-reveal>
        <span>EXPLORER TOUS LES DÉPÔTS</span><i>↗</i>
      </a>
    </div>
  </section>
);

export default EditorialProjects;
