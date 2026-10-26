import React, { useEffect, useRef } from 'react';
import { personalInfo } from '../../utils/constants';

const EditorialHero = () => {
  const heroRef = useRef(null);
  const artRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    const art = artRef.current;
    if (!hero || !art || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let frame;

    const move = event => {
      target.x = (event.clientX / window.innerWidth - 0.5) * 2;
      target.y = (event.clientY / window.innerHeight - 0.5) * 2;
    };
    const reset = () => { target.x = 0; target.y = 0; };
    const render = () => {
      current.x += (target.x - current.x) * 0.065;
      current.y += (target.y - current.y) * 0.065;
      art.style.setProperty('--art-x', `${current.x * 34}px`);
      art.style.setProperty('--art-y', `${current.y * 24}px`);
      art.style.setProperty('--art-ry', `${current.x * -4.5}deg`);
      art.style.setProperty('--art-rx', `${current.y * 3}deg`);
      frame = requestAnimationFrame(render);
    };

    window.addEventListener('pointermove', move, { passive: true });
    hero.addEventListener('pointerleave', reset);
    frame = requestAnimationFrame(render);
    return () => {
      window.removeEventListener('pointermove', move);
      hero.removeEventListener('pointerleave', reset);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section id="hero" className="editorial-hero" ref={heroRef}>
      <div className="hero-art-stage" ref={artRef} aria-hidden="true">
        <div className="hero-art-aura" />
        <img className="hero-art-image" src="/hero-code-sculpture.png" alt="" />
        <div className="hero-art-scan" />
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
