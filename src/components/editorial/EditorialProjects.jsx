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
  <section id="projects" className="editorial-section work-section">
    <div className="section-kicker section-kicker--light" data-reveal>
      <span>( ACTE I — LE TRAVAIL )</span><span>02 / 05</span>
    </div>
    <div className="work-heading" data-reveal>
      <h2>Projets<br /><em>sélectionnés</em></h2>
      <p>Une sélection d’applications métier, plateformes et expériences mobiles construites pour des besoins concrets.</p>
    </div>

    <div className="project-gallery">
      {featuredProjects.map((project, index) => (
        <article className="project-polaroid" data-reveal key={project.github} style={{ '--rotation': `${[-3, 2, -1, 3, -2, 1][index]}deg`, '--rotation-hover': `${[1, -2, 1, -1, 2, -1][index]}deg`, '--delay': `${index * 70}ms` }}>
          <a href={project.github} target="_blank" rel="noreferrer" aria-label={`Voir ${project.title} sur GitHub`}>
            <ProjectVisual project={project} index={index} />
            <div className="project-caption">
              <div><span>0{index + 1}</span><h3>{project.title}</h3></div>
              <p>{project.description}</p>
              <ul>{project.technologies.map(technology => <li key={technology}>{technology}</li>)}</ul>
              <strong>VOIR LE CODE <i>↗</i></strong>
            </div>
          </a>
        </article>
      ))}
    </div>

    <a className="all-projects-link" href="https://github.com/khaledopen?tab=repositories" target="_blank" rel="noreferrer" data-reveal>
      <span>EXPLORER TOUS LES DÉPÔTS</span><i>↗</i>
    </a>
  </section>
);

export default EditorialProjects;
