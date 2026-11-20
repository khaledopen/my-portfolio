import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { cn } from '@/lib/utils';

/**
 * Dessin au trait qui se trace quand il entre à l'écran.
 * Chaque élément reçoit pathLength=1, l'animation est gérée en CSS (.sketch dans index.css).
 */
function useDrawOnView<T extends Element>() {
  const ref = useRef<T>(null);
  const [drawn, setDrawn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDrawn(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setDrawn(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, drawn };
}

const p = (d: string, i: number) => <path key={i} d={d} pathLength={1} style={{ '--i': i } as CSSProperties} />;

/** Accueil : une fenêtre ouverte sur les montagnes, un ordinateur portable et un café. */
export function DeskView({ className }: { className?: string }) {
  const { ref, drawn } = useDrawOnView<SVGSVGElement>();
  const paths = [
    'M62 32 C140 28 262 30 338 33 C352 34 358 42 358 56 C359 140 357 230 356 306 C356 320 348 328 334 328 C250 330 150 331 64 328 C50 327 42 320 42 306 C41 220 42 130 43 54 C43 40 50 33 62 32 Z',
    'M200 31 C201 130 199 230 200 329',
    'M44 282 C70 248 100 205 128 172 C143 190 160 210 176 228 C196 196 216 166 236 140 C276 190 316 240 354 287',
    'M216 166 L236 140 L256 166 C246 160 228 160 216 166',
    'M300 70 C316 69 327 82 326 96 C325 112 312 122 298 121 C283 120 273 108 274 94 C275 80 286 71 300 70',
    'M90 96 C96 90 102 90 106 96 C110 90 116 90 122 96',
    'M150 72 C154 68 158 68 161 72 C164 68 168 68 172 72',
    'M14 470 C120 468 280 470 388 469',
    'M122 455 L136 366 C138 360 142 358 148 358 L254 358 C260 358 264 361 265 367 L279 455',
    'M96 470 L122 455 L279 455 L306 470',
    'M180 392 L166 405 L180 418',
    'M222 392 L236 405 L222 418',
    'M208 386 L194 424',
    'M324 469 L324 428 C324 426 326 424 328 424 L356 424 C358 424 360 426 360 428 L360 469',
    'M360 436 C374 436 376 458 360 458',
    'M334 414 C328 406 340 400 334 392',
    'M348 414 C342 406 354 400 348 392'
  ];
  return (
    <svg
      ref={ref}
      viewBox="0 0 400 480"
      role="img"
      aria-label="Dessin : une fenêtre ouverte sur les montagnes, un ordinateur portable et une tasse de café"
      className={cn('sketch h-auto w-full', drawn && 'drawn', className)}
    >
      {paths.map(p)}
    </svg>
  );
}

/** Personnalité : un sommet avec un drapeau, et le sentier pour y arriver. */
export function Summit({ className }: { className?: string }) {
  const { ref, drawn } = useDrawOnView<SVGSVGElement>();
  const paths = [
    'M12 330 C120 329 300 331 408 330',
    'M24 330 C70 260 120 170 170 92 C190 124 214 160 236 190 C252 170 268 150 288 132 C324 196 364 262 398 330',
    'M150 124 L170 92 L192 126 C178 118 164 118 150 124',
    'M170 92 L170 38',
    'M170 40 C182 42 194 46 206 52 C194 56 182 60 170 64',
    'M116 330 C150 312 120 290 160 276 C200 262 150 238 186 222 C214 210 176 186 196 168 C204 158 182 140 172 124',
    'M330 62 C344 61 354 72 353 85 C352 99 341 108 328 107 C314 106 305 95 306 82 C307 70 317 62 330 62',
    'M44 120 C50 114 56 114 60 120 C64 114 70 114 76 120',
    'M268 330 C272 318 280 318 284 330',
    'M300 330 C304 314 314 314 318 330'
  ];
  return (
    <svg ref={ref} viewBox="0 0 420 340" role="img" aria-label="Dessin : un sentier qui monte vers un sommet où flotte un drapeau" className={cn('sketch h-auto w-full', drawn && 'drawn', className)}>
      {paths.map(p)}
    </svg>
  );
}

/** Compteur en bâtons : un trait par projet publié, barré tous les cinq. */
export function Tally({ count, className }: { count: number; className?: string }) {
  const { ref, drawn } = useDrawOnView<SVGSVGElement>();
  const groups = Math.ceil(count / 5);
  const width = groups * 70;
  const paths: string[] = [];
  for (let g = 0; g < groups; g += 1) {
    const inGroup = Math.min(5, count - g * 5);
    const x0 = g * 70 + 8;
    for (let k = 0; k < Math.min(4, inGroup); k += 1) {
      const x = x0 + k * 11;
      paths.push(`M${x} ${14 + ((k + g) % 2) * 2} C${x + 1} 30 ${x - 1} 44 ${x + 1} 60`);
    }
    if (inGroup === 5) paths.push(`M${x0 - 6} 52 C${x0 + 14} 42 ${x0 + 30} 30 ${x0 + 46} 20`);
  }
  return (
    <svg ref={ref} viewBox={`0 0 ${width} 74`} role="img" aria-label={`${count} projets`} className={cn('sketch h-auto', drawn && 'drawn', className)} style={{ width: `min(100%, ${width * 0.9}px)` }}>
      {paths.map(p)}
    </svg>
  );
}
