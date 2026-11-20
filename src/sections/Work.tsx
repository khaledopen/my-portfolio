import { Link } from 'react-router-dom';
import { Tally } from '@/components/Sketch';
import { ProjectRows } from '@/components/ProjectRows';
import { featuredProjects, formatMonth, projects, repoCreatedAt } from '@/lib/projects';
import { START_REPO } from '@/data/projects';

export function Work() {
  const others = projects.length - featuredProjects.length;
  const since = formatMonth(repoCreatedAt(START_REPO));
  return (
    <section id="projets" aria-labelledby="projets-title" className="mx-auto flex max-w-[62rem] scroll-mt-8 flex-col items-center px-[clamp(1.25rem,4vw,3rem)] pt-[clamp(6.5rem,11vw,9rem)]">
      <h2 id="projets-title" className="title relative z-[2] text-center" data-line="right">
        Des choses que j’ai construites
      </h2>
      <div className="relative z-[2] mt-[clamp(2.25rem,7vw,6rem)] w-full">
        <ProjectRows items={featuredProjects} />
      </div>
      <div className="relative z-[2] mt-12 flex flex-col items-center text-center" data-line="right">
        <Tally count={projects.length} className="text-ink" />
        <p className="mt-4 max-w-[25rem]">
          {projects.length} projets publiés sur GitHub depuis {since}. Il en reste {others} à découvrir.
        </p>
        <Link to="/projets" className="mt-2 underline decoration-1 underline-offset-[3px]">
          Les voir tous →
        </Link>
      </div>
    </section>
  );
}
