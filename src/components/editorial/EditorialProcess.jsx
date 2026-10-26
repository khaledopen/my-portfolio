import React from 'react';

const steps = [
  ['Écouter', 'Comprendre le besoin, le contexte et les personnes qui utiliseront le produit.'],
  ['Structurer', 'Transformer les idées en parcours clair, en architecture et en priorités.'],
  ['Concevoir', 'Créer une interface lisible, cohérente et adaptée à chaque écran.'],
  ['Développer', 'Donner vie au produit avec une base technique solide et maintenable.'],
  ['Affiner', 'Tester, corriger les détails et préparer une expérience prête à évoluer.']
];

const EditorialProcess = () => (
  <section id="experience" className="editorial-section process-section">
    <div className="section-kicker" data-reveal>
      <span>( ACTE II — LE PROCESSUS )</span><span>03 / 05</span>
    </div>
    <div className="process-intro" data-reveal>
      <h2>Une méthode simple.<br /><em>Un résultat soigné.</em></h2>
      <p>Que le projet commence par une page blanche ou une application existante, le parcours reste guidé par la clarté.</p>
    </div>
    <ol className="process-list">
      {steps.map(([title, description], index) => (
        <li key={title} data-reveal style={{ '--delay': `${index * 70}ms` }}>
          <span>0{index + 1}</span>
          <h3>{title}</h3>
          <p>{description}</p>
          <i aria-hidden="true">{index % 2 === 0 ? '↘' : '↗'}</i>
        </li>
      ))}
    </ol>
    <div className="education-note" data-reveal>
      <span>FORMATION</span>
      <p>Université Polytechnique de Bingerville — Informatique</p>
      <strong>ABIDJAN, CI</strong>
    </div>
  </section>
);

export default EditorialProcess;
