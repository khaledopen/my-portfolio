import { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap, prefersReducedMotion } from '../animations/gsap';
import { buildJourney } from '../lib/journey';
import { githubSource } from '../lib/projects';

const kindLabel = { formation: 'Formation', projet: 'Projet', hackathon: 'Hackathon', certification: 'Certification', experience: 'Expérience' } as const;

export function Journey() {
  const root = useRef<HTMLElement>(null);
  const items = buildJourney();

  useLayoutEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return undefined;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.journey__progress',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: { trigger: '.journey__list', start: 'top 70%', end: 'bottom 60%', scrub: 0.6 }
        }
      );
      gsap.utils.toArray<HTMLElement>('.journey__item').forEach(item => {
        gsap.fromTo(item, { '--dot': 0 }, { '--dot': 1, duration: 0.6, scrollTrigger: { trigger: item, start: 'top 65%', toggleActions: 'play none none reverse' } });
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="journey" className="section journey is-day" aria-labelledby="journey-title">
      <div className="wrap section-head">
        <h2 id="journey-title">Le chemin parcouru.</h2>
        <p>Uniquement des étapes vérifiables. Les dates des projets correspondent à la création de leur dépôt GitHub.</p>
      </div>
      <div className="wrap">
        <div className="journey__list">
          <span className="journey__track" aria-hidden="true">
            <i className="journey__progress" />
          </span>
          <ol>
            {items.map(item => {
              const content = (
                <>
                  <span className="journey__when mono">{item.when}</span>
                  <span className="journey__kind">{kindLabel[item.kind]}</span>
                  <strong className="journey__title">{item.title}</strong>
                  <span className="journey__detail">{item.detail}</span>
                </>
              );
              const external = item.href?.startsWith('http');
              return (
                <li key={`${item.title}-${item.date}`} className="journey__item">
                  {item.href ? (
                    external ? (
                      <a href={item.href} target="_blank" rel="noreferrer" className="journey__link">
                        {content}
                      </a>
                    ) : (
                      <Link to={item.href} className="journey__link">
                        {content}
                      </Link>
                    )
                  ) : (
                    <div className="journey__link">{content}</div>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
        {githubSource.source === 'git-first-commit' && <p className="journey__note">Dates approximées par le premier commit de chaque dépôt, en attendant la synchronisation avec l’API GitHub.</p>}
      </div>
    </section>
  );
}
