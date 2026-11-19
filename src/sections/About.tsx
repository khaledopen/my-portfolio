import { useState, type ReactNode } from 'react';
import { profile } from '../data/profile';
import { projects } from '../lib/projects';
import { Picture } from '../components/Picture';

const notes: Record<string, { word: string; note: ReactNode }> = {
  reserve: {
    word: 'réservé',
    note: 'Au premier contact, je peux paraître discret, calme, difficile à cerner. Quand une vraie affinité s’installe, je m’ouvre énormément : je deviens expressif, enthousiaste, engagé.'
  },
  passionne: {
    word: 'passionné',
    note: 'Les défis techniques, les hackathons, les concours : un temps limité et un vrai problème, c’est là que je donne le meilleur.'
  },
  details: {
    word: 'détails',
    note: 'Une marge, une transition, un message d’erreur bien écrit. C’est souvent là que se joue la confiance dans un produit.'
  },
  reelles: {
    word: 'expériences réelles',
    note: `${projects.length} projets publics depuis GoTech, du web au mobile en passant par l’IA vocale. Construire plutôt que parler.`
  }
};

type NoteKey = keyof typeof notes;

function Word({ id, active, onSelect }: { id: NoteKey; active: NoteKey; onSelect: (id: NoteKey) => void }) {
  return (
    <button type="button" className="about__word" aria-expanded={active === id} aria-controls="about-note" onClick={() => onSelect(id)} onMouseEnter={() => onSelect(id)}>
      {notes[id]!.word}
    </button>
  );
}

export function About() {
  const [active, setActive] = useState<NoteKey>('reserve');

  return (
    <section id="about" className="section about" aria-labelledby="about-title">
      <div className="wrap section-head">
        <h2 id="about-title">Il y a plus derrière le silence.</h2>
      </div>

      <div className="wrap about__grid">
        <p className="about__statement">
          Je suis naturellement <Word id="reserve" active={active} onSelect={setActive} />, mais profondément <Word id="passionne" active={active} onSelect={setActive} />. Lorsque je trouve un sujet,
          une idée ou une connexion qui me parle, je m’investis pleinement. J’apprécie les <Word id="details" active={active} onSelect={setActive} />, le calme, les beaux environnements et le travail
          qui demande de la discipline. Le développement est pour moi une manière de transformer les idées en <Word id="reelles" active={active} onSelect={setActive} />.
        </p>

        <aside className="about__side">
          {profile.portrait && <Picture className="about__portrait" src={profile.portrait.src} alt={profile.portrait.alt} width={profile.portrait.width} height={profile.portrait.height} />}
          <div id="about-note" className="about__note" aria-live="polite">
            <p key={active}>{notes[active]!.note}</p>
          </div>
          <dl className="about__facts">
            <div>
              <dt>Basé à</dt>
              <dd>{profile.location}</dd>
            </div>
            <div>
              <dt>Je construis</dt>
              <dd>Applications web, mobiles et outils métier</dd>
            </div>
            <div>
              <dt>Ce qui m’anime</dt>
              <dd>Les belles vues, le calme, les défis techniques, les projets qui ont un sens</dd>
            </div>
          </dl>
        </aside>
      </div>
    </section>
  );
}
