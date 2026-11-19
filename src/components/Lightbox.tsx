import { useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Picture } from './Picture';
import { useFocusTrap } from '../hooks/useFocusTrap';

export interface LightboxImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
}

interface LightboxProps {
  images: LightboxImage[];
  index: number;
  label: string;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}

/** Visionneuse plein écran accessible : focus piégé, Échap, flèches, balayage tactile. */
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

  return createPortal(
    <div
      ref={root}
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`${label} — image ${index + 1} sur ${count}`}
      onPointerDown={event => {
        swipeStart.current = event.clientX;
      }}
      onPointerUp={event => {
        if (swipeStart.current === null) return;
        const delta = event.clientX - swipeStart.current;
        swipeStart.current = null;
        if (Math.abs(delta) > 50 && count > 1) go(delta < 0 ? 1 : -1);
      }}
    >
      <div className="lightbox__bar">
        <p className="mono" aria-hidden="true">
          {String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
        </p>
        <button type="button" className="lightbox__close" onClick={onClose} data-autofocus>
          Fermer <X aria-hidden="true" />
        </button>
      </div>
      <figure className="lightbox__figure" key={image.src}>
        <Picture src={image.src} alt={image.alt} width={image.width} height={image.height} priority />
        {image.caption && <figcaption>{image.caption}</figcaption>}
      </figure>
      {count > 1 && (
        <div className="lightbox__nav">
          <button type="button" onClick={() => go(-1)} aria-label="Image précédente">
            <ChevronLeft aria-hidden="true" />
          </button>
          <button type="button" onClick={() => go(1)} aria-label="Image suivante">
            <ChevronRight aria-hidden="true" />
          </button>
        </div>
      )}
    </div>,
    document.body
  );
}
