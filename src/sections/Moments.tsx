import { useState } from 'react';
import { hackathons } from '../data/hackathons';
import { Picture } from '../components/Picture';
import { Lightbox } from '../components/Lightbox';
import { formatMonth } from '../lib/projects';
import type { HackathonEvent } from '../types';

const kindLabel: Record<HackathonEvent['kind'], string> = {
  hackathon: 'Hackathon',
  competition: 'Concours',
  event: 'Événement'
};

function EventStory({ event }: { event: HackathonEvent }) {
  const [open, setOpen] = useState<number | null>(null);
  const details: [string, string | undefined][] = [
    ['Mon rôle', event.role],
    ['Équipe', event.team?.join(', ')],
    ['Le défi', event.challenge],
    ['Projet présenté', event.project],
    ['Résultat', event.result],
    ['Ce que j’en retiens', event.lesson]
  ];
  return (
    <article className="moment" aria-labelledby={`moment-${event.slug}`}>
      <header className="moment__head">
        <p className="moment__kind">
          {kindLabel[event.kind]}
          <span className="mono">
            {' '}
            {formatMonth(event.date)}, {event.location}
          </span>
        </p>
        <h3 id={`moment-${event.slug}`}>{event.name}</h3>
        <p className="moment__desc">{event.description}</p>
      </header>

      {event.photos.length > 0 && (
        <ul className="moment__strip" aria-label={`Photos de ${event.name}`}>
          {event.photos.map((photo, index) => (
            <li key={photo.src} style={{ aspectRatio: `${photo.width} / ${photo.height}` }}>
              <button type="button" onClick={() => setOpen(index)} aria-label={`Agrandir : ${photo.alt}`}>
                <Picture src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} />
              </button>
            </li>
          ))}
        </ul>
      )}

      <dl className="moment__details">
        {details
          .filter(([, value]) => Boolean(value))
          .map(([term, value]) => (
            <div key={term}>
              <dt>{term}</dt>
              <dd>{value}</dd>
            </div>
          ))}
      </dl>

      {open !== null && <Lightbox images={event.photos} index={open} label={event.name} onClose={() => setOpen(null)} onIndexChange={setOpen} />}
    </article>
  );
}

export function Moments() {
  const events = hackathons.slice().sort((a, b) => b.date.localeCompare(a.date));
  return (
    <section id="moments" className="section moments" aria-labelledby="moments-title">
      <div className="wrap section-head">
        <h2 id="moments-title">Au-delà du code.</h2>
        <p>Des défis, des rencontres, des moments. Les hackathons et les concours sont l’endroit où je m’ouvre le plus&nbsp;: une équipe, un temps limité, un problème à résoudre.</p>
      </div>
      <div className="wrap">
        {events.length === 0 ? (
          <div className="moments__empty">
            <div className="moments__frames" aria-hidden="true">
              <i />
              <i />
              <i />
            </div>
            <p>La galerie est en cours de constitution. Les photos et les récits des prochains hackathons et concours arriveront ici.</p>
          </div>
        ) : (
          <div className="moments__list">
            {events.map(event => (
              <EventStory key={event.slug} event={event} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
