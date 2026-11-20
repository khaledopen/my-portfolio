import { Summit } from '@/components/Sketch';

export function About() {
  return (
    <section
      aria-labelledby="about-title"
      className="mx-auto grid max-w-[80rem] items-center gap-[clamp(2rem,6vw,6rem)] px-[clamp(1.25rem,4vw,3rem)] pt-[clamp(6.5rem,12vw,11rem)] md:grid-cols-[6fr_5fr]"
    >
      <div className="relative z-[2] w-full max-w-[33rem] justify-self-center max-md:order-2 max-md:max-w-[22rem]" data-line="left">
        <Summit />
      </div>
      <div className="relative z-[2] max-w-[29rem]">
        <h2 id="about-title" className="title mb-8">
          Discret au premier abord, à fond ensuite
        </h2>
        <div className="grid max-w-[26rem] gap-4">
          <p>Je parle peu au début. Mais quand une idée ou une équipe me plaît, je m’y mets complètement : projets du soir, hackathons, concours.</p>
          <p>Dernièrement : une caisse partagée en Laravel, un SaaS pour instituts de beauté, et un bot Telegram qui fait parler anglais.</p>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          <a className="btn" href="#projets">
            Mes projets
          </a>
          <a className="btn" href="#pellicule">
            Ma pellicule
          </a>
        </div>
      </div>
    </section>
  );
}
