import { Link } from 'react-router-dom';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export default function NotFound() {
  useDocumentTitle('Page introuvable');
  return (
    <section className="not-found wrap" aria-labelledby="nf-title">
      <h1 id="nf-title">Rien à l’horizon.</h1>
      <p>Cette page n’existe pas ou a été déplacée.</p>
      <Link className="button" to="/">
        Revenir à l’accueil
      </Link>
    </section>
  );
}
