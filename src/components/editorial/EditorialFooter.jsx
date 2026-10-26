import React from 'react';
import { personalInfo } from '../../utils/constants';

const EditorialFooter = () => (
  <footer className="editorial-footer">
    <div className="footer-word">KSBK</div>
    <div className="footer-meta">
      <span>© 2026 KONE SORY BEN KHALED</span>
      <nav>
        <a href={personalInfo.github} target="_blank" rel="noreferrer">GITHUB ↗</a>
        <a href={personalInfo.linkedin} target="_blank" rel="noreferrer">LINKEDIN ↗</a>
        <a href="#hero">RETOUR EN HAUT ↑</a>
      </nav>
    </div>
  </footer>
);

export default EditorialFooter;
