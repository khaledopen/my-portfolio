import React from 'react';
import SocialLinks from '../ui/SocialLinks';
import { personalInfo } from '../../utils/constants';

const Footer = () => (
  <footer className="bg-nb-white border-t-2 border-nb-black pt-8 pb-6 px-6">
    <div className="max-w-5xl mx-auto">
      <div className="hidden lg:fixed lg:bottom-0 lg:left-10 lg:flex lg:flex-col lg:items-center gap-4">
        <SocialLinks orientation="vertical" />
        <div className="w-0.5 h-24 bg-nb-black" />
      </div>
      <div className="hidden lg:fixed lg:bottom-0 lg:right-10 lg:flex lg:flex-col lg:items-center gap-4">
        <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-nb-muted hover:text-nb-black transition-colors duration-150" style={{ writingMode: 'vertical-rl' }}>Disponible à {personalInfo.location}</a>
        <div className="w-0.5 h-24 bg-nb-black" />
      </div>
      <div className="lg:hidden text-center mb-6">
        <SocialLinks orientation="horizontal" className="justify-center mb-4" />
        <p className="font-mono text-xs text-nb-muted">{personalInfo.location}</p>
      </div>
      <div className="text-center">
        <p className="font-mono text-xs text-nb-muted">Conçu et développé avec ♥ par <span className="text-nb-black font-semibold underline underline-offset-2 decoration-nb-yellow">{personalInfo.shortName}</span></p>
      </div>
    </div>
  </footer>
);

export default Footer;
