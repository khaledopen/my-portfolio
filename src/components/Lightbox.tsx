import { useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useFocusTrap } from '@/hooks/useFocusTrap';

export interface LightboxImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  /** Vidéo mp4 facultative (src sert alors d'aperçu) */
  video?: string;
}

interface LightboxProps {
  images: LightboxImage[];
  index: number;
  label: string;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}

/** Vue rapprochée : focus piégé, Échap pour fermer, flèches et balayage pour naviguer. */
export function Lightbox({ images, index, label, onClose, onIndexChange }: LightboxProps) {
  const root = useRef<HTMLDivElement>(null);
  const swipeStart = useRef<number | null>(null);
  const count = images.length;
  const image = images[index];
  const go = useCallback((delta: number) => onIndexChange((index + delta + count) % count), [index, count, onIndexChange]);
  useFocusTrap(root, true, onClose);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') go(1);
      if (event.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go]);

  if (!image) return null;

  const round = 'grid place-items-center rounded-full border border-ink bg-paper text-ink transition-colors hover:border-hover hover:bg-hover hover:text-hover-ink';

  return createPortal(
    <div
      ref={root}
      role="dialog"
      aria-modal="true"
      aria-label={`${label} : photo ${index + 1} sur ${count}`}
      className="fixed inset-0 z-[100] grid place-items-center bg-scrim p-6 backdrop-blur-sm"
      style={{ touchAction: 'none' }}
      onClick={event => {
        if (event.target === event.currentTarget) onClose();
      }}
      onPointerDown={event => {
        // Pas de balayage depuis les commandes de la vidéo (barre de lecture)
        swipeStart.current = event.target instanceof HTMLVideoElement ? null : event.clientX;
      }}
      onPointerUp={event => {
        if (swipeStart.current === null) return;
        const delta = event.clientX - swipeStart.current;
        swipeStart.current = null;
        if (Math.abs(delta) > 50 && count > 1) go(delta < 0 ? 1 : -1);
      }}
    >
      <figure key={image.src} className="m-0 animate-[closer_.45s_cubic-bezier(.2,.8,.2,1)]">
        {image.video ? (
          <video
            src={image.video}
            poster={image.src}
            controls
            autoPlay
            playsInline
            aria-label={image.alt}
            className="max-h-[78svh] w-auto max-w-[min(90vw,1100px)] rounded-lg border-2 border-ink bg-paper-2 shadow-[0_30px_80px_-20px_rgba(0,0,0,.45)]"
          />
        ) : (
          <img
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            className="max-h-[78svh] w-auto max-w-[min(90vw,1100px)] cursor-zoom-out rounded-lg border-2 border-ink bg-paper-2 object-cover shadow-[0_30px_80px_-20px_rgba(0,0,0,.45)]"
            onClick={onClose}
          />
        )}
        {image.caption && <figcaption className="mt-4 text-center text-lg font-bold text-ink">{image.caption}</figcaption>}
      </figure>
      <button type="button" onClick={onClose} data-autofocus aria-label="Fermer" className={`${round} fixed top-[max(1rem,3vw)] right-[max(1rem,3vw)] size-11`}>
        <svg viewBox="0 0 14 14" className="size-3.5" aria-hidden="true">
          <path d="M1 1 L13 13 M13 1 L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
      {count > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Photo précédente"
            className={`${round} fixed top-1/2 left-[max(1rem,3vw)] hidden size-12 -translate-y-1/2 text-xl font-bold md:grid`}
          >
            ←
          </button>
          <button type="button" onClick={() => go(1)} aria-label="Photo suivante" className={`${round} fixed top-1/2 right-[max(1rem,3vw)] hidden size-12 -translate-y-1/2 text-xl font-bold md:grid`}>
            →
          </button>
        </>
      )}
    </div>,
    document.body
  );
}
