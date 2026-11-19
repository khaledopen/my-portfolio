import { useLayoutEffect, useRef } from 'react';
import { ArrowDownRight } from 'lucide-react';
import { gsap, prefersReducedMotion } from '../animations/gsap';
import { Avatar } from '../components/Avatar';
import { useIntroDone } from '../components/IntroContext';
import { profile } from '../data/profile';

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const introDone = useIntroDone();

  useLayoutEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return undefined;
    const ctx = gsap.context(() => {
      if (!introDone) {
        gsap.set('.hero__line-inner, .hero__reflect-inner, .hero__meta > *, .hero__stage', { autoAlpha: 0 });
        return;
      }
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
      tl.fromTo('.hero__stage', { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 1.8 })
        .fromTo('.hero__line-inner', { autoAlpha: 1, yPercent: 105 }, { yPercent: 0, duration: 1.3, stagger: 0.12 }, 0.15)
        .fromTo('.hero__reflect-inner', { autoAlpha: 1, yPercent: -105 }, { yPercent: 0, duration: 1.4 }, '-=0.6')
        .fromTo('.hero__meta > *', { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.08 }, '-=0.9');
    }, el);
    return () => ctx.revert();
  }, [introDone]);

  return (
    <section ref={root} id="top" className="hero" aria-labelledby="hero-title">
      <div className="hero__sky" aria-hidden="true" />
      <div className="hero__stage">
        <Avatar />
      </div>
      <div className="hero__horizon horizon-rule" aria-hidden="true" />

      <div className="hero__above wrap">
        <h1 id="hero-title" className="hero__title">
          <span className="hero__line">
            <span className="hero__line-inner">Discret</span>
          </span>
          <span className="hero__line">
            <span className="hero__line-inner">par nature.</span>
          </span>
          <span className="sr-only">
            {' '}
            Sans limites quand je crée. {profile.name}, {profile.role}.
          </span>
        </h1>
      </div>

      <div className="hero__below wrap">
        <p className="hero__reflect" aria-hidden="true">
          <span className="hero__reflect-inner">Sans limites quand je crée.</span>
        </p>
        <div className="hero__meta">
          <p className="hero__identity">
            <strong>{profile.name}</strong>
            <span>
              {profile.role}, {profile.location}.
            </span>
          </p>
          <div className="hero__actions">
            <a className="button" href="#work">
              Voir les projets <ArrowDownRight aria-hidden="true" />
            </a>
            <a className="text-link" href="#contact">
              Me contacter
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
