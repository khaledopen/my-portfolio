import { Link } from 'react-router-dom';
import { ProjectRows } from '@/components/ProjectRows';
import { projects } from '@/lib/projects';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

export default function ProjectsPage() {
  useDocumentTitle('Tous les projets', `Les ${projects.length} projets publics de Khaled sur GitHub.`);
  const newestFirst = projects.slice().reverse();
  return (
    <main className="mx-auto max-w-[calc(52rem+2*clamp(1.25rem,4vw,3rem))] px-[clamp(1.25rem,4vw,3rem)] pt-5 pb-16">
      <div className="flex min-h-10 items-center justify-between">
        <Link
          to="/"
          className="rounded-full border border-ink px-4 pt-1.5 pb-1 text-[0.95rem] font-bold uppercase no-underline transition-colors hover:border-hover hover:bg-hover hover:text-hover-ink"
        >
          ← Accueil
        </Link>
      </div>
      <header className="pt-[clamp(3rem,7vw,5rem)] pb-[clamp(2rem,4vw,3rem)]">
        <p className="mb-3 text-base font-bold tracking-[0.06em] uppercase">{projects.length} projets</p>
        <h1 className="text-[clamp(2.75rem,1.6rem+4vw,4.75rem)] leading-[1.02] font-black tracking-[-0.01em]">Tout ce que j’ai construit</h1>
        <p className="mt-4 max-w-[30rem] text-xl">Du plus récent au plus ancien. Chaque ligne ouvre le dépôt GitHub du projet.</p>
      </header>
      <ProjectRows items={newestFirst} showYear />
    </main>
  );
}
