import React, { useRef } from 'react';
import { personalInfo } from '../../utils/constants';
import DigitalFluid from './DigitalFluid';

const EditorialHero = () => {
  const heroRef = useRef(null);

  return (
    <section id="hero" className="editorial-hero" ref={heroRef}>
      <div className="hero-art-stage" aria-hidden="true">
        <div className="hero-art-aura" />
        <DigitalFluid />
        <div className="hero-art-scan" />
        <span className="hero-fluid-label">LIQUID / SYSTEM 01</span>
      </div>

      <div className="hero-content">
        <p className="eyebrow hero-eyebrow">( MAINTENANT À L’ÉCRAN )</p>
        <h1 aria-label={personalInfo.name}>
          <span className="hero-line">Kone Sory</span>{' '}
          <span className="hero-line hero-line--italic">Ben Khaled</span>
        </h1>
        <p className="hero-intro">Développeur web &amp; mobile créant des expériences numériques utiles et intentionnelles.</p>
        <div className="hero-actions">
          <a className="editorial-button" href="#contact"><span>ME CONTACTER</span><i>→</i></a>
        </div>
      </div>

      <div className="hero-footer-line">
        <a href="#projects"><span>ACTE I</span> LE TRAVAIL</a>
        <a href="#experience"><span>ACTE II</span> LE PROCESSUS</a>
        <span>ABIDJAN <b>UTC</b></span>
      </div>
      <a className="scroll-seat" href="#about">PRENEZ PLACE <i>↓</i></a>
    </section>
  );
};

export default EditorialHero;
