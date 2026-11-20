import { Link } from 'react-router-dom';
import { Eyes } from '@/components/Eyes';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

export default function NotFound() {
  useDocumentTitle('Page introuvable');
  return (
    <main className="grid min-h-svh content-center justify-items-center gap-6 px-6 text-center">
      <div className="text-[6rem] leading-none">
        <Eyes />
      </div>
      <h1 className="title">Rien à voir ici.</h1>
      <p>Cette page n’existe pas ou a été déplacée.</p>
      <Link to="/" className="btn">
        Accueil
      </Link>
    </main>
  );
}
