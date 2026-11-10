import React, { useRef } from 'react';
import { personalInfo } from '../../utils/constants';
import AvatarHero from './AvatarHero';

const EditorialHero = () => {
  const heroRef = useRef(null);

  return (
    <section id="hero" className="editorial-hero editorial-hero--avatar" ref={heroRef}>
      <div className="hero-art-stage hero-art-stage--avatar">
        <div className="hero-art-aura" />
        <AvatarHero />
      </div>

      <div className="living-hero-heading" aria-hidden="true">
        <span>HI, I&apos;M KONE</span>
      </div>

      <h1 className="sr-only">{personalInfo.name}, développeur web et mobile à Abidjan</h1>
      <div className="living-hero-bottom">
        <p>Développeur web &amp; mobile guidé par des expériences utiles, fortes et mémorables.</p>
        <a className="living-contact-button" href="#contact">ME CONTACTER <span>↗</span></a>
      </div>
      <a className="living-scroll-cue" href="#about" aria-label="Découvrir la suite"><span>SCROLL</span><i>↓</i></a>
    </section>
  );
};

export default EditorialHero;
