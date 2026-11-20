import { profile } from '@/data/profile';

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="flex flex-col items-center px-[clamp(1.25rem,4vw,3rem)] pt-[clamp(6.5rem,11vw,9rem)] text-center">
      <div className="relative z-[2] flex flex-col items-center">
        <picture data-line="end">
          <source srcSet="/images/hero/avatar.avif" type="image/avif" />
          <source srcSet="/images/hero/avatar.webp" type="image/webp" />
          <img
            src="/images/hero/avatar.png"
            alt="Avatar 3D de Khaled"
            width={112}
            height={112}
            loading="lazy"
            className="mb-6 size-28 rounded-full border-2 border-ink bg-paper-2 object-cover object-[50%_32%] shadow-[0_1px_2px_rgba(0,0,0,.08),0_10px_24px_-12px_rgba(0,0,0,.35)]"
          />
        </picture>
        <h2 id="contact-title" className="title">
          Dis bonjour<span className="sr-only"> : liens de contact</span>
        </h2>
      </div>
      <div className="relative z-[2] mt-[clamp(4rem,7vw,6rem)] flex flex-wrap justify-center gap-2">
        <a className="btn" href={profile.github} target="_blank" rel="noreferrer">
          GitHub
        </a>
        <a className="btn" href={profile.linkedin} target="_blank" rel="noreferrer">
          LinkedIn
        </a>
        {profile.email && (
          <a className="btn" href={`mailto:${profile.email}`}>
            E-mail
          </a>
        )}
        {profile.cv && (
          <a className="btn" href={profile.cv} download>
            CV
          </a>
        )}
      </div>
      <div className="h-[clamp(7rem,11vw,9rem)]" />
    </section>
  );
}
