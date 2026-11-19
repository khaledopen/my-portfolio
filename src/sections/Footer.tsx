import { profile } from '../data/profile';

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <p className="footer__word" aria-hidden="true">
          {profile.monogram}
        </p>
        <div className="footer__meta">
          <span>
            © {new Date().getFullYear()} {profile.name}
          </span>
          <span>Discret par nature. Sans limites quand je crée.</span>
          <a className="text-link" href="#top">
            Revenir en haut
          </a>
        </div>
      </div>
    </footer>
  );
}
