import { useLayoutEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Footer } from '@/sections/Footer';

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useLayoutEffect(() => {
    if (hash) document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView();
    else window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export function SiteLayout() {
  return (
    <>
      <ScrollToTop />
      <a href="#contenu" className="fixed top-3 left-4 z-[200] -translate-y-[160%] rounded-full border border-ink bg-paper px-4 py-2 transition-transform focus-visible:translate-y-0">
        Aller au contenu
      </a>
      <div id="contenu" tabIndex={-1}>
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
