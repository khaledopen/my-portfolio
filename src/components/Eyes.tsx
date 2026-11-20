import { useEffect, useRef, useState } from 'react';
import { useFinePointer, useReducedMotion } from '@/hooks/useMediaQuery';
import { cn } from '@/lib/utils';

/**
 * Deux yeux dessinés au trait : ils clignent de temps en temps, suivent la souris,
 * et lèvent les sourcils quand on clique quelque part.
 */
export function Eyes({ className }: { className?: string }) {
  const svg = useRef<SVGSVGElement>(null);
  const [look, setLook] = useState({ x: 0, y: 0 });
  const [blink, setBlink] = useState(false);
  const [surprised, setSurprised] = useState(false);
  const finePointer = useFinePointer();
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return undefined;
    let timer = 0;
    const schedule = () => {
      timer = window.setTimeout(
        () => {
          setBlink(true);
          window.setTimeout(() => setBlink(false), 140);
          schedule();
        },
        2200 + Math.random() * 3800
      );
    };
    schedule();
    return () => window.clearTimeout(timer);
  }, [reduced]);

  useEffect(() => {
    if (reduced || !finePointer) return undefined;
    let frame = 0;
    const onMove = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const box = svg.current?.getBoundingClientRect();
        if (!box) return;
        const dx = event.clientX - (box.left + box.width / 2);
        const dy = event.clientY - (box.top + box.height / 2);
        const distance = Math.hypot(dx, dy) || 1;
        const reach = Math.min(1, distance / 260);
        setLook({ x: (dx / distance) * 7 * reach, y: (dy / distance) * 9 * reach });
      });
    };
    const onDown = () => {
      setSurprised(true);
      window.setTimeout(() => setSurprised(false), 600);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
    };
  }, [finePointer, reduced]);

  return (
    <svg ref={svg} viewBox="0 0 120 96" aria-hidden="true" focusable="false" className={cn('h-auto w-[1.15em] overflow-visible', className)}>
      <g fill="none" stroke="var(--ink)" strokeLinecap="round" strokeLinejoin="round">
        {/* Sourcils */}
        <g strokeWidth="5" className="transition-transform duration-200" style={{ transform: surprised ? 'translateY(-7px)' : undefined }}>
          <path d="M18 14 Q30 5 42 11" />
          <path d="M78 11 Q91 4 103 13" />
        </g>
        {/* Contour des yeux + pupilles */}
        <g style={{ transformBox: 'fill-box', transformOrigin: '50% 60%', transform: blink ? 'scaleY(0.08)' : undefined, transition: 'transform 90ms ease-in' }}>
          <ellipse cx="32" cy="58" rx="21" ry="31" fill="var(--paper)" strokeWidth="6" />
          <ellipse cx="88" cy="58" rx="21" ry="31" fill="var(--paper)" strokeWidth="6" />
          <g strokeWidth="8" style={{ transform: `translate(${look.x}px, ${look.y}px)`, transition: 'transform .35s cubic-bezier(.2,.7,.2,1)' }}>
            <path d="M35 50 L33 64" />
            <path d="M91 50 L89 64" />
          </g>
        </g>
      </g>
    </svg>
  );
}
