import { useEffect, useLayoutEffect, useRef } from 'react';
import { gsap } from '../animations/gsap';
import { profile } from '../data/profile';

interface IntroProps {
  onDone: () => void;
}

/**
 * Intro cinématique (≈ 2,4 s) : une ligne de lumière devient l'horizon du hero.
 * Jouée une fois par session, passable au clic ou avec Échap.
 * Le hero est déjà rendu dessous : l'intro ne retarde ni le contenu ni le référencement.
 */
export function Intro({ onDone }: IntroProps) {
  const root = useRef<HTMLDivElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const doneRef = useRef(onDone);

  useLayoutEffect(() => {
    doneRef.current = onDone;
  });

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return undefined;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' }, onComplete: () => doneRef.current() });
      tl.fromTo('.intro__line', { scaleX: 0 }, { scaleX: 1, duration: 1, ease: 'expo.inOut' })
        .fromTo('.intro__glow', { opacity: 0 }, { opacity: 1, duration: 0.8 }, '-=0.4')
        .fromTo('.intro__mark span', { yPercent: 110 }, { yPercent: 0, duration: 0.9, stagger: 0.06 }, '-=0.7')
        .fromTo('.intro__name', { opacity: 0, y: -8 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.6')
        .to('.intro__mark span', { yPercent: -110, duration: 0.6, stagger: 0.03, ease: 'expo.in' }, '+=0.35')
        .to('.intro__name', { opacity: 0, duration: 0.4 }, '<')
        .to(el, { backgroundColor: 'rgba(8,9,11,0)', duration: 0.6, ease: 'power2.inOut' }, '-=0.25')
        .to('.intro__line, .intro__glow', { opacity: 0, duration: 0.4 }, '-=0.2');
      timeline.current = tl;
    }, el);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') timeline.current?.progress(1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div ref={root} className="intro" role="presentation">
      <div className="intro__glow" aria-hidden="true" />
      <div className="intro__line" aria-hidden="true" />
      <div className="intro__mark" aria-hidden="true">
        {profile.monogram.split('').map((letter, index) => (
          <span key={index}>{letter}</span>
        ))}
      </div>
      <p className="intro__name" aria-hidden="true">
        {profile.name}
      </p>
      <button type="button" className="intro__skip" onClick={() => timeline.current?.progress(1)}>
        Passer l’intro
      </button>
    </div>
  );
}
