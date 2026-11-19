import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight, Github } from 'lucide-react';
import { findProject, formatMonth, projects, githubSource } from '../lib/projects';
import { ProjectCover } from '../components/ProjectCover';
import { Picture } from '../components/Picture';
import { Lightbox } from '../components/Lightbox';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import NotFound from './NotFound';

export default function ProjectPage() {
  const { slug } = useParams();
  const project = findProject(slug);
  const [open, setOpen] = useState<number | null>(null);
  useDocumentTitle(project?.title, project?.summary);

  if (!project) return <NotFound />;

  const position = projects.indexOf(project);
  const previous = projects[position - 1];
  const next = projects[position + 1];
  const images = project.images ?? [];

  return (
    <article className="project-page" aria-labelledby="project-title">
      <header className="project-page__head wrap">
        <Link to="/#work" className="text-link project-page__back">
          <ArrowLeft aria-hidden="true" /> Tous les projets
        </Link>
        <p className="facts__domain">{project.domain}</p>
        <h1 id="project-title">{project.title}</h1>
        <p className="project-page__summary">{project.summary}</p>
        <div className="project-page__actions">
          <a className="button" href={project.url} target="_blank" rel="noreferrer">
            <Github aria-hidden="true" /> Voir le code sur GitHub
          </a>
          {project.demo && (
            <a className="button button--quiet" href={project.demo} target="_blank" rel="noreferrer">
              Voir la démo <ArrowUpRight aria-hidden="true" />
            </a>
          )}
        </div>
      </header>

      <div className="wrap project-page__cover">{images.length === 0 && <ProjectCover project={project} priority />}</div>

      {images.length > 0 && (
        <ul className="wrap project-page__gallery" aria-label={`Captures de ${project.title}`}>
          {images.map((image, index) => (
            <li key={image.src}>
              <button type="button" onClick={() => setOpen(index)} aria-label={`Agrandir : ${image.caption}`}>
                <Picture src={image.src} alt={image.alt} width={image.width} height={image.height} priority={index === 0} />
              </button>
              <p>{image.caption}</p>
            </li>
          ))}
        </ul>
      )}

      <div className="wrap project-page__body">
        <dl className="project-page__meta">
          <div>
            <dt>Dépôt créé</dt>
            <dd>
              {formatMonth(project.createdAt)}
              {githubSource.source === 'git-first-commit' && ' (premier commit)'}
            </dd>
          </div>
          <div>
            <dt>Dépôt</dt>
            <dd className="mono">khaledopen/{project.repo}</dd>
          </div>
          <div>
            <dt>Technologies</dt>
            <dd>
              <ul className="facts__stack mono">
                {project.stack.map(t => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>
        <div>
          {project.features.length > 0 && (
            <>
              <h2 className="project-page__h2">Ce que fait le projet</h2>
              <ul className="project-page__features">
                {project.features.map(feature => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </>
          )}
          {project.note && <p className="project-page__note">{project.note}</p>}
        </div>
      </div>

      <nav className="wrap project-page__pager" aria-label="Projets voisins">
        {previous ? (
          <Link to={`/projects/${previous.slug}`}>
            <ArrowLeft aria-hidden="true" />
            <span>
              <small>Projet précédent</small>
              {previous.title}
            </span>
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link to={`/projects/${next.slug}`} className="is-next">
            <span>
              <small>Projet suivant</small>
              {next.title}
            </span>
            <ArrowRight aria-hidden="true" />
          </Link>
        )}
      </nav>

      {open !== null && <Lightbox images={images} index={open} label={project.title} onClose={() => setOpen(null)} onIndexChange={setOpen} />}
    </article>
  );
}
