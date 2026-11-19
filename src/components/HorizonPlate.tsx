import { useId } from 'react';
import type { WorldPlate } from '../data/world';

const W = 800;
const H = 520;
const HORIZON = 340;

const skies: Record<WorldPlate['hour'], { top: string; mid: string; low: string; sun: string; sunY: number; sunR: number; ridge: string[] }> = {
  dawn: { top: '#142337', mid: '#4b5466', low: '#d8b98a', sun: '#f4e4c4', sunY: HORIZON + 6, sunR: 46, ridge: ['#3a4253', '#252c38', '#151a22'] },
  noon: { top: '#8fb3bf', mid: '#bcd3d8', low: '#efe9dc', sun: '#fbf7ee', sunY: 120, sunR: 26, ridge: ['#a7b6b8', '#7f9195', '#56656a'] },
  dusk: { top: '#121417', mid: '#3d3428', low: '#c7a76c', sun: '#e9cf9c', sunY: HORIZON - 20, sunR: 34, ridge: ['#2a2620', '#1a1815', '#0e0d0c'] },
  night: { top: '#08090b', mid: '#0f1824', low: '#142337', sun: '#e8e4da', sunY: 110, sunR: 14, ridge: ['#141c27', '#0d131b', '#08090b'] }
};

/** Crête déterministe : somme de sinus, différente pour chaque graine. */
function ridge(seed: number, base: number, amplitude: number): string {
  const points: string[] = [];
  for (let x = 0; x <= W; x += 10) {
    const t = x / W;
    const y = base - amplitude * (0.55 * Math.sin(t * 5.1 + seed) + 0.3 * Math.sin(t * 11.7 + seed * 2.3) + 0.15 * Math.sin(t * 23.9 + seed * 0.7) + 0.6);
    points.push(`${x},${y.toFixed(1)}`);
  }
  return `M0,${HORIZON} L${points.join(' L')} L${W},${HORIZON} Z`;
}

/**
 * Horizon dessiné en code — utilisé tant qu'aucune vraie photo n'est fournie.
 * Ce n'est pas une photographie et cela ne prétend pas l'être.
 */
export function HorizonPlate({ hour, seed }: { hour: WorldPlate['hour']; seed: number }) {
  const id = useId().replace(/:/g, '');
  const sky = skies[hour];
  const showReflection = hour === 'dawn' || hour === 'dusk';
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" className="plate-svg" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`sky-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={sky.top} />
          <stop offset="0.55" stopColor={sky.mid} />
          <stop offset="1" stopColor={sky.low} />
        </linearGradient>
        <linearGradient id={`water-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={sky.low} stopOpacity="0.55" />
          <stop offset="1" stopColor={sky.top} />
        </linearGradient>
        <radialGradient id={`glow-${id}`}>
          <stop offset="0" stopColor={sky.sun} stopOpacity="0.55" />
          <stop offset="1" stopColor={sky.sun} stopOpacity="0" />
        </radialGradient>
        <clipPath id={`above-${id}`}>
          <rect width={W} height={HORIZON} />
        </clipPath>
      </defs>
      <rect width={W} height={HORIZON} fill={`url(#sky-${id})`} />
      {hour === 'night' &&
        Array.from({ length: 46 }, (_, i) => (
          <circle key={i} cx={(i * 173 + seed * 37) % W} cy={(i * 89 + seed * 13) % (HORIZON - 80)} r={i % 7 === 0 ? 1.3 : 0.7} fill="#f4f0e8" opacity={0.35 + ((i * 31) % 50) / 100} />
        ))}
      <g clipPath={`url(#above-${id})`}>
        <circle cx={W * 0.62} cy={sky.sunY} r={sky.sunR * 4} fill={`url(#glow-${id})`} />
        <circle cx={W * 0.62} cy={sky.sunY} r={sky.sunR} fill={sky.sun} />
        <path d={ridge(seed, HORIZON - 40, 90)} fill={sky.ridge[0]} opacity="0.9" />
        <path d={ridge(seed + 3.1, HORIZON - 14, 60)} fill={sky.ridge[1]} />
        {hour === 'dusk' ? (
          <g fill={sky.ridge[2]}>
            <path d={ridge(seed + 5.4, HORIZON + 4, 22)} />
            {/* Architecture contemporaine : un volume en porte-à-faux */}
            <rect x="180" y={HORIZON - 70} width="210" height="26" />
            <rect x="220" y={HORIZON - 44} width="70" height="44" />
            <rect x="196" y={HORIZON - 66} width="150" height="14" fill="#c7a76c" opacity="0.55" />
          </g>
        ) : (
          <path d={ridge(seed + 5.4, HORIZON + 2, 34)} fill={sky.ridge[2]} />
        )}
      </g>
      <rect y={HORIZON} width={W} height={H - HORIZON} fill={showReflection ? `url(#water-${id})` : sky.ridge[2]} />
      {showReflection && (
        <g opacity="0.35">
          {Array.from({ length: 7 }, (_, i) => (
            <rect key={i} x={W * 0.62 - sky.sunR * (1.4 - i * 0.15)} y={HORIZON + 10 + i * 18} width={sky.sunR * (2.8 - i * 0.3)} height="2" fill={sky.sun} />
          ))}
        </g>
      )}
      <line x1="0" x2={W} y1={HORIZON} y2={HORIZON} stroke="#c7a76c" strokeOpacity="0.7" strokeWidth="1" />
    </svg>
  );
}
