import React, { useEffect, useState } from 'react';
import Button from '../ui/Button';
import { scrollToElement } from '../../utils/helpers';
import { personalInfo } from '../../utils/constants';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="hero" className="min-h-screen flex items-center px-6 pt-24 pb-16 lg:px-20 bg-nb-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-72 h-72 pointer-events-none hidden xl:block stripe-bg opacity-20" style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 0)' }} aria-hidden="true" />
      <div className="absolute bottom-0 right-0 pointer-events-none select-none hidden lg:block leading-none" aria-hidden="true">
        <span className="font-display font-black text-outline-ghost block" style={{ fontSize: 'clamp(7rem, 18vw, 15rem)', lineHeight: 0.85 }}>KSBK</span>
      </div>
      <div className="max-w-5xl mx-auto w-full relative z-10">
        <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 mb-8">
            <span className="font-mono text-sm font-medium text-nb-muted border border-nb-gray-mid px-3 py-1 bg-nb-gray">Bonjour 👋, moi c’est</span>
          </div>
          <h1 className="font-display font-black text-nb-black text-clamp-4xl md:text-clamp-5xl leading-[1.02] mb-5 max-w-5xl">
            KONE SORY{' '}
            <span className="relative inline-block">
              <span className="relative z-10">BEN KHALED.</span>
              <span className="absolute bottom-1 left-0 w-full h-4 bg-nb-yellow -z-0" aria-hidden="true" />
            </span>
          </h1>
          <h2 className="font-display font-bold text-nb-muted text-clamp-3xl md:text-clamp-4xl leading-tight mb-8">Je conçois des expériences numériques utiles.</h2>
          <p className="font-sans text-nb-muted text-lg leading-relaxed mb-12 max-w-2xl border-l-4 border-nb-black pl-5">
            Étudiant en informatique et développeur web &amp; mobile basé à Abidjan. Je transforme des idées en applications modernes, responsives et agréables à utiliser.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button onClick={() => scrollToElement('projects')} size="lg">Découvrir mes projets ↓</Button>
            <Button href={personalInfo.linkedin} variant="outline" size="lg">Me contacter sur LinkedIn ↗</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
