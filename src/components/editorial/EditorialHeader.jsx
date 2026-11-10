import React, { useEffect, useState } from 'react';
import { navLinks, personalInfo } from '../../utils/constants';

const EditorialHeader = () => {
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <header className="editorial-nav">
        <a className="nav-square nav-square--contact" href="#contact" aria-label="Aller à la section contact">
          <span className="nav-envelope" aria-hidden="true"><i /></span>
        </a>
        <a className="nav-mark" href="#hero" aria-label="Retour en haut"><span>K</span><em>S</em></a>
        <button className={`nav-menu ${open ? 'is-open' : ''}`} onClick={() => setOpen(value => !value)} aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'} aria-expanded={open}>
          <i /><i />
        </button>
        <div className="nav-progress" style={{ transform: `scaleX(${progress / 100})` }} />
      </header>

      <div className={`menu-panel ${open ? 'is-open' : ''}`} aria-hidden={!open}>
        <div className="menu-panel__label">( NAVIGATION )</div>
        <nav>
          {navLinks.map((link, index) => (
            <a key={link.url} href={link.url} onClick={close}>
              <span>0{index + 1}</span>{link.name}<i>↗</i>
            </a>
          ))}
        </nav>
        <div className="menu-panel__foot">
          <span>ABIDJAN, CÔTE D’IVOIRE</span>
          <a href={personalInfo.linkedin} target="_blank" rel="noreferrer">LINKEDIN ↗</a>
        </div>
      </div>
    </>
  );
};

export default EditorialHeader;
