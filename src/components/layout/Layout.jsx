import React, { useEffect, useState } from 'react';
import Header from '../editorial/EditorialHeader';
import Footer from '../editorial/EditorialFooter';
import Cursor from '../ui/Cursor';
import Loader from '../ui/Loader';

const Layout = ({ children }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 2100);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (loading) return undefined;
    const items = document.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    );
    items.forEach(item => observer.observe(item));
    return () => observer.disconnect();
  }, [loading]);

  return (
    <div className={`site-shell ${loading ? 'is-loading' : 'is-ready'}`}>
      {loading && <Loader />}
      <Cursor />
      <div className="grain" aria-hidden="true" />
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
