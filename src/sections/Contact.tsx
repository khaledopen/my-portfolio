import { useLayoutEffect, useRef } from 'react';
import { ArrowUpRight, Download } from 'lucide-react';
import { gsap, prefersReducedMotion } from '../animations/gsap';
import { profile } from '../data/profile';

export function Contact() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return undefined;
    const ctx = gsap.context(() => {
      // Le soleil se couche à mesure qu'on arrive au contact
      gsap.fromTo(
        '.contact__sun',
        { yPercent: -40 },
        {
          yPercent: 70,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top 85%', end: 'center center', scrub: 0.8 }
        }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  const links = [
    { label: 'GitHub', detail: 'github.com/khaledopen', href: profile.github },
    { label: 'LinkedIn', detail: 'Kone Sory Ben Khaled', href: profile.linkedin },
    ...(profile.email ? [{ label: 'E-mail', detail: profile.email, href: `mailto:${profile.email}` }] : [])
  ];

  return (
    <section ref={root} id="contact" className="contact" aria-labelledby="contact-title">
      <div className="contact__sky" aria-hidden="true">
        <span className="contact__sun-clip">
          <span className="contact__sun" />
        </span>
        <span className="contact__horizon horizon-rule" />
      </div>
      <div className="wrap contact__inner">
        <h2 id="contact-title">Créons quelque chose qui a du sens.</h2>
        <p className="contact__lede">Un projet, une équipe de hackathon, une idée à construire&nbsp;: écrivez-moi, je réponds.</p>
        <ul className="contact__links">
          {links.map(link => (
            <li key={link.label}>
              <a href={link.href} target={link.href.startsWith('mailto:') ? undefined : '_blank'} rel="noreferrer">
                <span className="contact__label">{link.label}</span>
                <span className="contact__detail">{link.detail}</span>
                <ArrowUpRight aria-hidden="true" />
              </a>
            </li>
          ))}
          {profile.cv && (
            <li>
              <a href={profile.cv} download>
                <span className="contact__label">CV</span>
                <span className="contact__detail">Télécharger le PDF</span>
                <Download aria-hidden="true" />
              </a>
            </li>
          )}
        </ul>
      </div>
    </section>
  );
}
