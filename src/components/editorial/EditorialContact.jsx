import React from 'react';
import { personalInfo } from '../../utils/constants';

const EditorialContact = () => (
  <section id="contact" className="contact-stage">
    <div className="contact-rings" aria-hidden="true"><i /><i /><i /></div>
    <div className="section-kicker section-kicker--light" data-reveal>
      <span>( RAPPEL )</span><span>04 / 05</span>
    </div>
    <div className="contact-content" data-reveal>
      <p>UN PROJET EN TÊTE ?</p>
      <h2>Créons quelque chose<br /><em>ensemble.</em></h2>
      <a href={personalInfo.linkedin} target="_blank" rel="noreferrer">
        <span>PARLONS DE VOTRE IDÉE</span><i>↗</i>
      </a>
    </div>
    <div className="contact-bottom"><span>DISPONIBLE POUR DE NOUVELLES COLLABORATIONS</span><span>ABIDJAN · UTC</span></div>
  </section>
);

export default EditorialContact;
