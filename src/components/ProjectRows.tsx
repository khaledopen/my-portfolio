import type { Project } from '@/types';

/** Liste de projets façon tableau : nom, description, flèche vers le dépôt GitHub. */
export function ProjectRows({ items, showYear = false }: { items: Project[]; showYear?: boolean }) {
  return (
    <ul className="m-0 w-full list-none p-0">
      {items.map(project => (
        <li key={project.slug} className="border-t border-ink last:border-b">
          <a
            href={project.demo ?? project.url}
            target="_blank"
            rel="noreferrer"
            className="group grid grid-cols-[1fr_auto] items-baseline gap-x-6 px-0 py-3 no-underline transition-colors md:grid-cols-[minmax(10rem,20.5rem)_1fr_auto] md:px-1"
          >
            <span className="text-[clamp(1.25rem,1rem+1vw,1.5rem)] leading-8 font-extrabold group-hover:[-webkit-text-stroke:0.035em_currentColor]">
              {project.title}
              {showYear && <span className="ml-3 text-base font-semibold opacity-70">{project.year}</span>}
            </span>
            <span className="col-start-1 row-start-2 pb-1 leading-snug md:col-start-auto md:row-start-auto md:pb-0">{project.summary}</span>
            <span
              aria-hidden="true"
              className="col-start-2 row-start-1 text-2xl leading-none font-extrabold transition-transform group-hover:translate-x-[3px] group-hover:-translate-y-[3px] md:col-start-auto md:row-start-auto"
            >
              ↗
            </span>
            <span className="sr-only">(ouvre GitHub dans un nouvel onglet)</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
