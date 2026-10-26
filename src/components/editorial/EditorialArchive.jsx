import React from 'react';
import { otherProjects } from '../../utils/constants';

const EditorialArchive = () => (
  <section className="archive-section">
    <div className="archive-marquee" aria-hidden="true">
      <div>{[...Array(2)].flatMap((_, copy) => otherProjects.map(project => <span key={`${copy}-${project.title}`}>{project.title} <i>✦</i></span>))}</div>
    </div>
    <div className="editorial-section archive-inner">
      <div className="section-kicker" data-reveal>
        <span>( LES ARCHIVES )</span><span>15 PROJETS AU TOTAL</span>
      </div>
      <div className="archive-list">
        {otherProjects.map((project, index) => (
          <a href={project.github} target="_blank" rel="noreferrer" key={project.github} data-reveal style={{ '--delay': `${index * 35}ms` }}>
            <span>{String(index + 7).padStart(2, '0')}</span>
            <h3>{project.title}</h3>
            <p>{project.technologies.join(' · ')}</p>
            <i>↗</i>
          </a>
        ))}
      </div>
    </div>
  </section>
);

export default EditorialArchive;
