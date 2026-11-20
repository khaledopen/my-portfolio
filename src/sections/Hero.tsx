import { Eyes } from '@/components/Eyes';
import { DeskView } from '@/components/Sketch';

export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hello-title"
      className="mx-auto grid min-h-[min(100svh,56rem)] max-w-[96rem] items-center gap-[clamp(1.5rem,5vw,6rem)] px-[clamp(1.25rem,4vw,3rem)] pt-5 md:grid-cols-[5fr_6fr]"
    >
      <div className="relative z-[2] max-w-lg pt-7 md:pt-8">
        <div className="mb-[0.3em] text-[clamp(4.6rem,9vw,8rem)] leading-none">
          <Eyes />
        </div>
        <h1 id="hello-title" className="mb-3 text-[clamp(2.75rem,1.6rem+3.6vw,4.5rem)] leading-[1.02] font-black tracking-[-0.01em]">
          Salut, moi c’est Khaled.
        </h1>
        <div className="grid max-w-md gap-3 text-[clamp(1.15rem,1rem+0.4vw,1.35rem)]">
          <p>J’habite à Abidjan. J’aime les belles vues, le calme, et construire des logiciels.</p>
          <p>
            J’étudie l’informatique à l’Université Polytechnique de Bingerville et je développe des applications web et mobiles. Mon code est sur{' '}
            <a href="https://github.com/khaledopen" target="_blank" rel="noreferrer" className="underline decoration-1 underline-offset-[3px]">
              GitHub
            </a>
            .
          </p>
        </div>
      </div>
      <div className="relative z-[2] w-[min(70%,22rem)] justify-self-center pb-10 md:w-[min(100%,26rem)] md:pb-0" data-line="right">
        <DeskView />
      </div>
    </section>
  );
}
