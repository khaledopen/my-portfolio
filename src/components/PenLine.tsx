import { useCallback, useEffect, useRef, useState, type RefObject } from 'react';

/**
 * Une ligne au crayon qui serpente sur toute la page et se trace au fil du défilement.
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
    const narrow = w < 820;

    /*
     * La ligne serpente : dans chaque section elle ondule dans la marge (data-line="left|right"),
     * puis entre deux sections elle traverse la page dans la bande vide (le padding des sections),
     * avec une courbe ample et parfois une boucle. data-line="end" marque son point d'arrivée.
     */
    interface Leg {
      top: number;
      bottom: number;
      left: number;
      right: number;
      anchors: { side: 'left' | 'right'; top: number; bottom: number }[];
      end: Point | null;
    }
    const legs: Leg[] = [];
    root.querySelectorAll<HTMLElement>('section').forEach((section) => {
      let top = Infinity;
      let bottom = -Infinity;
      let left = Infinity;
      let right = -Infinity;
      Array.from(section.children).forEach((child) => {
        const r = child.getBoundingClientRect();
        if (!r.height) return;
        top = Math.min(top, r.top - box.top);
        bottom = Math.max(bottom, r.bottom - box.top);
        left = Math.min(left, r.left - box.left);
        right = Math.max(right, r.right - box.left);
      });
      if (!Number.isFinite(top)) return;
      const leg: Leg = { top, bottom, left, right, anchors: [], end: null };
      section.querySelectorAll<HTMLElement>('[data-line]').forEach((el) => {
        const r = el.getBoundingClientRect();
        const side = el.dataset.line;
        if (side === 'end') leg.end = { x: r.left - box.left + r.width / 2, y: r.top - box.top };
        else if (side === 'left' || side === 'right') {
          // Sur petit écran, l'ondulation reste à droite ; les traversées, elles, gardent tout leur élan
          leg.anchors.push({ side: narrow ? 'right' : side, top: r.top - box.top, bottom: r.bottom - box.top });
        }
      });
      if (leg.anchors.length || leg.end) legs.push(leg);
    });
    if (!legs.length) return;

    const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
    /** Position et amplitude de l'ondulation dans la marge d'une section. */
    const lane = (leg: Leg, side: 'left' | 'right') => {
      const free = side === 'left' ? leg.left : w - leg.right;
      const inset = clamp(free * 0.5, 12, 76);
      return { x: side === 'left' ? inset : w - inset, amp: clamp(free * 0.28, 4, 24) };
    };

    const points: Point[] = [];
    /** Ondule verticalement de y0 à y1 autour de x, en petites vagues irrégulières. */
    const meander = (x: number, amp: number, y0: number, y1: number, seed: number) => {
      const steps = Math.max(1, Math.round((y1 - y0) / 150));
      for (let i = 0; i <= steps; i += 1) {
        points.push({ x: x + Math.sin(i * 1.7 + seed) * amp + wobble(seed + i) * amp * 0.5, y: y0 + ((y1 - y0) * i) / steps });
      }
    };
    /**
     * Traverse la bande vide entre deux sections, de (xa, y0) à (xb, y1).
     * Même côté : la ligne fait une excursion vers le centre de la page avant de revenir.
     * loop : ajoute une boucle à mi-chemin, comme un trait de stylo qui se laisse aller.
     */
    const cross = (xa: number, y0: number, xb: number, y1: number, loop: boolean, seed: number) => {
      const H = y1 - y0;
      const same = Math.abs(xa - xb) < w * 0.25;
      const inward = xa < w / 2 ? 1 : -1;
      const reach = same ? w * (narrow ? 0.36 : 0.3) * (0.85 + wobble(seed) * 0.3) : 0;
      const R = loop ? clamp(H * 0.2, 18, narrow ? 30 : 52) : 0;
      const n = loop ? 40 : 28;
      // Pendant la boucle (t entre 0.36 et 0.64), la progression ralentit presque à l'arrêt
      // pour que le trait ait le temps de s'enrouler au lieu de s'aplatir.
      const progress = (t: number) => {
        if (!R) return t;
        if (t < 0.36) return (t / 0.36) * 0.47;
        if (t > 0.64) return 0.53 + ((t - 0.64) / 0.36) * 0.47;
        return 0.47 + ((t - 0.36) / 0.28) * 0.06;
      };
      for (let i = 1; i <= n; i += 1) {
        const t = i / n;
        const s = progress(t);
        const ease = s * s * (3 - 2 * s);
        let x = xa + (xb - xa) * ease + inward * reach * Math.sin(Math.PI * s);
        let y = y0 + H * s;
        // Boucle : le trait remonte, fait le tour, puis repart
        const u = (t - 0.36) / 0.28;
        if (R && u > 0 && u < 1) {
          const dx = (xb - xa) * 6 * s * (1 - s) + inward * reach * Math.PI * Math.cos(Math.PI * s);
          const dir = Math.sign(dx) || 1;
          x += dir * R * Math.sin(2 * Math.PI * u);
          y -= R * (1 - Math.cos(2 * Math.PI * u));
        }
        points.push({ x, y });
      }
    };

    // Départ : en haut à droite, hors de l'écran
    const first = legs[0]!;
    const firstLane = lane(first, first.anchors[0]?.side ?? 'right');
    points.push({ x: firstLane.x, y: -30 });

    let crossings = 0;
    legs.forEach((leg, index) => {
      // Ondulation dans la marge, ancre par ancre
      leg.anchors.forEach((a, k) => {
        const { x, amp } = lane(leg, a.side);
        const prev = points.at(-1)!;
        if (k > 0 && Math.abs(prev.x - x) > w * 0.25) cross(prev.x, prev.y, x, a.top, false, index * 7 + k);
        meander(x, amp, Math.max(a.top, prev.y + 20), a.bottom, index * 5 + k);
      });
      const next = legs[index + 1];
      if (!next) return;
      // Traversée dans la bande vide qui sépare les deux sections
      const from = points.at(-1)!;
      const y0 = Math.max(from.y, leg.bottom) + 18;
      const target = next.anchors[0];
      const xb = target ? lane(next, target.side).x : (next.end?.x ?? w / 2);
      const y1 = target ? Math.max(y0 + 60, Math.min(next.top, target.top) - 10) : (next.end?.y ?? next.top);
      if (y0 > from.y + 1) points.push({ x: from.x, y: y0 });
      cross(from.x, y0, xb, y1, crossings % 2 === 0, index * 11);
      crossings += 1;
    });

    const last = legs.at(-1)!;
    if (last.end) {
      const tail = points.at(-1)!;
      if (Math.hypot(tail.x - last.end.x, tail.y - last.end.y) > 4) points.push(last.end);
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
