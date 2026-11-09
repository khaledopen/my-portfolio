import React from 'react';
import { technologyStack } from '../../utils/constants';
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

    <div className="about-grid about-grid--intro">
      <div className="about-copy" data-reveal>
        <p>Chaque projet est une occasion de résoudre un vrai problème : gérer une caisse, réserver un hôtel, suivre un budget ou rapprocher des artisans de leurs clients.</p>
        <p>Je travaille avec méthode, curiosité et attention aux détails pour créer des interfaces qui donnent confiance.</p>
      </div>
      <div className="stack-note" data-reveal>
        <span>OUTILS / 2026</span>
        <strong>Une stack pensée pour construire, livrer et faire évoluer.</strong>
        <i>↘</i>
      </div>
    </div>

    <div className="stack-section">
      <div className="stack-section__heading" data-reveal>
        <span>( STACK ACTIVE )</span>
        <p>Technologies que j’utilise au quotidien</p>
      </div>
      <div className="stack-orbit" data-reveal>
        <div className="stack-orbit__ring stack-orbit__ring--outer" aria-hidden="true" />
        <div className="stack-orbit__ring stack-orbit__ring--inner" aria-hidden="true" />
        <div className="stack-orbit__core">
          <span>{technologyStack.length}</span>
          <strong>TECHNOLOGIES</strong>
          <small>EN ORBITE</small>
        </div>
        <div className="stack-orbit__track">
        {technologyStack.map((technology, index) => (
          <div
            className="stack-orbit__item"
            key={technology.name}
            style={{ '--orbit-angle': `${index * (360 / technologyStack.length)}deg` }}
          >
            <div className="stack-orbit__item-inner">
              <div className="stack-orbit__card">
                <img src={technology.icon} alt={`Logo ${technology.name}`} loading="lazy" />
                <div><strong>{technology.name}</strong><span>{technology.group}</span></div>
              </div>
            </div>
          </div>
        ))}
        </div>
      </div>
    </div>
  </section>
);

export default EditorialAbout;
