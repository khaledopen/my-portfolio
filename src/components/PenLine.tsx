import { useCallback, useEffect, useRef, useState, type RefObject } from 'react';

/**
 * Une ligne au crayon qui traverse toute la page et se trace au fil du défilement.
 * Elle passe par les éléments marqués data-line="left|right|center" et une petite pointe
 * de crayon la suit. Mouvement réduit : ligne entièrement tracée, sans crayon.
 */
interface Point {
  x: number;
  y: number;
}

function smoothPath(points: Point[]): string {
  if (points.length < 2) return '';
  const first = points[0]!;
  let d = `M${first.x.toFixed(1)} ${first.y.toFixed(1)}`;
  for (let i = 0; i < points.length - 1; i += 1) {
    const p0 = points[i - 1] ?? points[i]!;
    const p1 = points[i]!;
    const p2 = points[i + 1]!;
    const p3 = points[i + 2] ?? p2;
    const c1 = { x: p1.x + (p2.x - p0.x) / 6, y: p1.y + (p2.y - p0.y) / 6 };
    const c2 = { x: p2.x - (p3.x - p1.x) / 6, y: p2.y - (p3.y - p1.y) / 6 };
    d += ` C${c1.x.toFixed(1)} ${c1.y.toFixed(1)} ${c2.x.toFixed(1)} ${c2.y.toFixed(1)} ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
  }
  return d;
}

/** Pseudo-aléatoire stable, pour que la ligne ne change pas à chaque rendu. */
const wobble = (n: number) => Math.sin(n * 12.9898) * 0.5;

export function PenLine({ container }: { container: RefObject<HTMLElement | null> }) {
  const pathRef = useRef<SVGPathElement>(null);
  const tipRef = useRef<HTMLDivElement>(null);
  const samples = useRef<{ len: number; maxY: number }[]>([]);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [d, setD] = useState('');
  const [total, setTotal] = useState(0);
  const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const build = useCallback(() => {
    const root = container.current;
    if (!root) return;
    const box = root.getBoundingClientRect();
    const w = root.clientWidth;
    const h = root.scrollHeight;
    // La ligne circule dans les marges de la page : data-line="left" ou "right" indique de quel côté
    // passer à hauteur de l'élément, data-line="end" marque l'endroit où elle s'arrête.
    const margin = Math.max(14, Math.min(64, (w - 1024) / 2 + 24, w * 0.05));
    const points: Point[] = [{ x: w - margin * 1.2, y: -30 }];
    let end: Point | null = null;
    root.querySelectorAll<HTMLElement>('[data-line]').forEach((el, index) => {
      const r = el.getBoundingClientRect();
      const side = el.dataset.line;
      const top = r.top - box.top;
      if (side === 'end') {
        end = { x: r.left - box.left + r.width / 2, y: top };
        return;
      }
      // Sur petit écran, la ligne reste dans la marge droite pour ne jamais traverser un paragraphe
      const x = side === 'left' && w >= 820 ? margin : w - margin;
      points.push({ x: x + wobble(index) * 14, y: top + r.height * 0.1 });
      points.push({ x: x - wobble(index + 3) * 16, y: top + r.height * 0.9 });
    });
    if (end) {
      const target: Point = end;
      points.push({ x: (target.x + (points.at(-1)?.x ?? target.x)) / 2, y: target.y - 90 });
      points.push(target);
    } else {
      points.push({ x: w / 2, y: h - 40 });
    }
    setSize({ w, h });
    setD(smoothPath(points));
  }, [container]);

  // useEffect (et non useLayoutEffect) : la ref du conteneur parent n'est attachée qu'après les effets de mise en page des enfants
  useEffect(() => {
    build();
    const root = container.current;
    if (!root) return undefined;
    const ro = new ResizeObserver(() => build());
    ro.observe(root);
    window.addEventListener('load', build);
    return () => {
      ro.disconnect();
      window.removeEventListener('load', build);
    };
  }, [build, container]);

  // Échantillonne la ligne : à quelle longueur atteint-elle chaque hauteur ?
  useEffect(() => {
    const path = pathRef.current;
    if (!path || !d) return;
    const length = path.getTotalLength();
    const list: { len: number; maxY: number }[] = [];
    let maxY = -Infinity;
    const steps = 600;
    for (let i = 0; i <= steps; i += 1) {
      const len = (length * i) / steps;
      maxY = Math.max(maxY, path.getPointAtLength(len).y);
      list.push({ len, maxY });
    }
    samples.current = list;
    setTotal(length);
  }, [d]);

  useEffect(() => {
    const path = pathRef.current;
    const tip = tipRef.current;
    const root = container.current;
    if (!path || !root || !total) return undefined;
    if (reduced) {
      path.style.strokeDasharray = 'none';
      return undefined;
    }
    let frame = 0;
    const update = () => {
      const top = root.getBoundingClientRect().top + window.scrollY;
      const target = window.scrollY + window.innerHeight * 0.62 - top;
      const list = samples.current;
      let lo = 0;
      let hi = list.length - 1;
      while (lo < hi) {
        const mid = (lo + hi) >> 1;
        if (list[mid]!.maxY < target) lo = mid + 1;
        else hi = mid;
      }
      const drawn = list[lo]?.len ?? total;
      path.style.strokeDasharray = `${drawn} ${total + 10}`;
      if (tip) {
        const a = path.getPointAtLength(Math.max(0, drawn - 1));
        const b = path.getPointAtLength(drawn);
        const angle = (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;
        tip.style.transform = `translate3d(${b.x}px, ${b.y}px, 0) rotate(${angle}deg)`;
        tip.style.opacity = drawn > 4 && drawn < total - 4 ? '1' : '0';
      }
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [total, reduced, container]);

  return (
    <>
      <svg aria-hidden="true" focusable="false" className="pointer-events-none absolute top-0 left-0 z-[1] overflow-hidden" width={size.w} height={size.h} viewBox={`0 0 ${size.w} ${size.h}`}>
        <path ref={pathRef} d={d} fill="none" stroke="var(--line)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ strokeDasharray: reduced ? 'none' : `0 ${total + 10}` }} />
      </svg>
      {!reduced && (
        <div ref={tipRef} aria-hidden="true" className="pointer-events-none absolute top-0 left-0 z-[4] h-0 w-0 opacity-0 transition-opacity duration-300" style={{ willChange: 'transform' }}>
          {/* Crayon : la mine touche exactement le bout de la ligne */}
          <svg viewBox="0 0 64 24" className="absolute -top-3 -left-[60px] h-6 w-16" fill="none">
            <path d="M60 12 L48 6 L48 18 Z" fill="var(--line)" />
            <path d="M48 6 L10 6 C6 6 4 9 4 12 C4 15 6 18 10 18 L48 18" fill="var(--paper)" stroke="var(--line)" strokeWidth="2.2" strokeLinejoin="round" />
            <path d="M16 6 L16 18" stroke="var(--line)" strokeWidth="2" />
            <path d="M48 6 L54 12 L48 18" stroke="var(--line)" strokeWidth="2.2" strokeLinejoin="round" />
          </svg>
        </div>
      )}
    </>
  );
}
