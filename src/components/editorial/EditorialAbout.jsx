import React from 'react';
import { skills } from '../../utils/constants';
import CodeConstellation from './CodeConstellation';

const EditorialAbout = () => (
  <section id="about" className="editorial-section editorial-about">
    <CodeConstellation />
    <div className="section-kicker" data-reveal>
      <span>( PROLOGUE )</span><span>01 / 05</span>
    </div>

    <div className="about-statement" data-reveal>
      <p>
        Je suis <strong className="interactive-word">Kone Sory<span className="word-card word-card--portrait">KSBK<small>ABIDJAN</small></span></strong>,
        {' '}un développeur basé à Abidjan. Je conçois des produits numériques qui sont aussi
        {' '}<strong className="interactive-word">utiles<span className="word-card word-card--lime">UTILE<small>AVANT TOUT</small></span></strong>
        {' '}qu’agréables à utiliser — de la première idée jusqu’à la mise en ligne.
      </p>
    </div>

    <div className="about-grid">
      <div className="about-copy" data-reveal>
        <p>Chaque projet est une occasion de résoudre un vrai problème : gérer une caisse, réserver un hôtel, suivre un budget ou rapprocher des artisans de leurs clients.</p>
        <p>Je travaille avec méthode, curiosité et attention aux détails pour créer des interfaces qui donnent confiance.</p>
      </div>
      <div className="skill-orbit" data-reveal>
        <span className="skill-orbit__center">STACK<br />ACTIVE</span>
        <div className="skill-track">
          {skills.map((skill, index) => (
            <span key={skill} style={{ '--angle': `${(360 / skills.length) * index}deg`, '--angle-inverse': `${(-360 / skills.length) * index}deg` }}>{skill}</span>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default EditorialAbout;
