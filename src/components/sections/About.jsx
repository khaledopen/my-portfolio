import React from 'react';
import SectionHeading from '../common/SectionHeading';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import { personalInfo, skills } from '../../utils/constants';

const About = () => {
  const [ref, , hasIntersected] = useIntersectionObserver();

  return (
    <section id="about" ref={ref} className="py-24 px-6 lg:px-20 bg-nb-white">
      <div className="max-w-5xl mx-auto">
        <SectionHeading number="01" title="À propos de moi" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-2">
            <div className={`space-y-5 text-nb-muted text-lg leading-relaxed transition-all duration-700 ${hasIntersected ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <p>Je suis <strong className="text-nb-black">{personalInfo.name}</strong>, passionné par la création de produits numériques clairs et efficaces. J’aime partir d’un besoin concret, structurer l’expérience puis lui donner vie dans le navigateur.</p>
              <p>Ma formation à l’Université Polytechnique de Bingerville et mes projets personnels me permettent de progresser à la fois en développement front-end, en conception d’interfaces et en résolution de problèmes.</p>
              <p className="font-medium text-nb-black">Les technologies que j’utilise :</p>
            </div>
            <div className={`mt-6 transition-all duration-700 delay-200 ${hasIntersected ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <ul className="flex flex-wrap gap-2 font-mono text-sm">{skills.map(skill => <li key={skill} className="tag-brutal">{skill}</li>)}</ul>
            </div>
          </div>
          <div className={`lg:col-span-1 transition-all duration-700 delay-300 ${hasIntersected ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <div className="relative inline-block group" aria-label="Monogramme KSBK">
              <div className="w-64 h-64 border-2 border-nb-black bg-nb-black flex flex-col items-center justify-center overflow-hidden">
                <span className="font-mono text-xs uppercase tracking-[0.35em] text-nb-yellow mb-3">Abidjan</span>
                <span className="font-display text-6xl font-black text-nb-white leading-none">KS</span>
                <span className="font-display text-6xl font-black text-nb-yellow leading-none">BK</span>
              </div>
              <div className="absolute top-3 left-3 w-64 h-64 border-2 border-nb-black bg-nb-yellow -z-10 transition-all duration-200 group-hover:top-4 group-hover:left-4" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
