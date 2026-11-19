import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { navigation } from '../data/siteConfig';
import { profile } from '../data/profile';
import { useFocusTrap } from '../hooks/useFocusTrap';

/**
 * Navigation flottante. L'indicateur de progression est un petit soleil
 * qui parcourt l'horizon au fil de la page (nuit → jour → crépuscule).
 */
export function Nav() {
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const panel = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const close = useCallback(() => setOpen(false), []);

  useFocusTrap(panel, open, close);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [location.pathname]);

  useEffect(close, [location, close]);

  // Arc du soleil : il se lève puis se couche le long de la page
  const sunY = Math.sin(progress * Math.PI) * -7;

  return (
    <>
      <header className="nav">
        <Link className="nav__mark" to="/" aria-label={`${profile.name}, retour à l’accueil`}>
          {profile.monogram}
        </Link>
        <div className="nav__horizon" aria-hidden="true">
          <span className="nav__horizon-line" />
          <span className="nav__sun" style={{ left: `${progress * 100}%`, transform: `translate(-50%, calc(-50% + ${sunY}px))` }} />
        </div>
        <button type="button" className="nav__toggle" aria-expanded={open} aria-controls="site-menu" onClick={() => setOpen(value => !value)}>
          <span>{open ? 'Fermer' : 'Menu'}</span>
          <span className={`nav__burger${open ? ' is-open' : ''}`} aria-hidden="true">
            <i />
            <i />
          </span>
        </button>
      </header>

      <div ref={panel} id="site-menu" className={`menu${open ? ' is-open' : ''}`} role="dialog" aria-modal="true" aria-label="Menu principal" hidden={!open}>
        <nav aria-label="Sections">
          <ol className="menu__list">
            {navigation.map((item, index) => (
              <li key={item.href} style={{ '--i': index } as CSSProperties}>
                <a href={item.href} onClick={close} data-autofocus={index === 0 ? true : undefined}>
                  {item.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <div className="menu__foot">
          <span>{profile.location}</span>
          <a className="text-link" href={profile.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a className="text-link" href={profile.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </div>
        <button type="button" className="menu__close sr-only" onClick={close}>
          Fermer le menu
        </button>
      </div>
    </>
  );
}
