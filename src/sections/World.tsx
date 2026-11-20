import { PhotoPile } from '@/components/PhotoPile';

export function World() {
  return (
    <section id="pellicule" aria-labelledby="pellicule-title" className="scroll-mt-8 pt-[clamp(6.5rem,11vw,9rem)] pb-4">
      <div className="relative z-[2] px-[clamp(1.25rem,4vw,3rem)] text-center" data-line="left">
        <h2 id="pellicule-title" className="title">
          Extraits de ma pellicule
        </h2>
        <p className="mt-2">
          <span className="[@media(pointer:coarse)]:hidden">Déplace-les, ou clique dessus pour les voir de plus près.</span>
          <span className="hidden [@media(pointer:coarse)]:inline">Touche une photo pour la voir de plus près.</span>
        </p>
      </div>
      <div className="mt-[clamp(2.5rem,6vw,5rem)]" data-line="left">
        <PhotoPile />
      </div>
    </section>
  );
}
