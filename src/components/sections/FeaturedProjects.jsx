import React from 'react';
import SectionHeading from '../common/SectionHeading';
import FeaturedProjectCard from '../ui/FeaturedProjectCard';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import { featuredProjects } from '../../utils/constants';

const FeaturedProjects = () => {
  const [ref, , hasIntersected] = useIntersectionObserver();

  return (
    <section id="projects" ref={ref} className="py-24 px-6 lg:px-20 bg-nb-white">
      <div className="max-w-5xl mx-auto">
        <SectionHeading number="03" title="Projets sélectionnés" />

        <div className="flex justify-end -mt-9 mb-10">
          <a
            href="https://github.com/khaledopen?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm text-nb-muted underline underline-offset-4 decoration-nb-yellow hover:text-nb-black"
          >
            Voir tous les dépôts sur GitHub ↗
          </a>
        </div>

        <div className="space-y-10">
          {featuredProjects.map((project, index) => (
            <div
              key={index}
              className={`transition-all duration-700 ${
                hasIntersected ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 120}ms` }}
            >
              <FeaturedProjectCard project={project} flip={index % 2 !== 0} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
