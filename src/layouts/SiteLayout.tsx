import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Intro } from '../components/Intro';
import { IntroContext } from '../components/IntroContext';
import { Nav } from '../components/Nav';
import { Footer } from '../sections/Footer';
import { siteConfig } from '../data/siteConfig';
import { ScrollTrigger } from '../animations/gsap';

function shouldPlayIntro(pathname: string): boolean {
  if (pathname !== '/') return false;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  try {
    return sessionStorage.getItem(siteConfig.introStorageKey) !== '1';
  } catch {
    return true;
  }
}

/** Remonte en haut à chaque page, ou va à l'ancre demandée (#work, #contact…). */
function useScrollToLocation() {
  const { pathname, hash } = useLocation();
  useLayoutEffect(() => {
    if (hash) {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (target) {
        requestAnimationFrame(() => target.scrollIntoView());
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  useEffect(() => {
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => window.clearTimeout(id);
  }, [pathname]);
}

export function SiteLayout() {
  const location = useLocation();
  const [introDone, setIntroDone] = useState(() => !shouldPlayIntro(location.pathname));
  useScrollToLocation();

  const finishIntro = useCallback(() => {
    try {
      sessionStorage.setItem(siteConfig.introStorageKey, '1');
    } catch {
      /* stockage indisponible : l'intro pourra être rejouée, sans conséquence */
    }
    setIntroDone(true);
  }, []);

  return (
    <IntroContext.Provider value={introDone}>
      {!introDone && <Intro onDone={finishIntro} />}
      <a className="skip-link" href="#main">
        Aller au contenu
      </a>
      <Nav />
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </IntroContext.Provider>
  );
}
