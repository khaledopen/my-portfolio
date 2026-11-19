import { useEffect, useRef } from 'react';
import { Picture } from './Picture';
import { useFinePointer, useReducedMotion } from '../hooks/useMediaQuery';

const AVATAR = { src: '/images/hero/avatar.png', width: 1312, height: 1199 };

/**
 * Portrait 3D posé sur l'horizon, avec son reflet.
 * Le regard suit le curseur sur souris ; sur écran tactile, il erre doucement ; immobile si mouvement réduit.
 */
export function Avatar() {
  const scene = useRef<HTMLDivElement>(null);
  const finePointer = useFinePointer();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = scene.current;
    if (!el || reducedMotion) return undefined;

    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let frame = 0;
    let pointerActive = false;
    let nextIdle = 0;
    let visible = true;

    const onPointerMove = (event: PointerEvent) => {
      const bounds = el.getBoundingClientRect();
      const cx = bounds.left + bounds.width / 2;
      const cy = bounds.top + bounds.height * 0.42;
      target.x = Math.max(-1, Math.min(1, (event.clientX - cx) / (window.innerWidth * 0.42)));
      target.y = Math.max(-1, Math.min(1, (event.clientY - cy) / (window.innerHeight * 0.52)));
      pointerActive = true;
    };
    const onPointerLeave = () => {
      pointerActive = false;
      nextIdle = 0;
    };
    const tick = (time: number) => {
      if (visible) {
        if (!pointerActive && time >= nextIdle) {
          target.x = (Math.random() - 0.5) * 0.42;
          target.y = (Math.random() - 0.5) * 0.2;
          nextIdle = time + 1800 + Math.random() * 2400;
        }
        current.x += (target.x - current.x) * 0.065;
        current.y += (target.y - current.y) * 0.065;
        el.style.setProperty('--gaze-x', `${current.x * 3.8}px`);
        el.style.setProperty('--gaze-y', `${current.y * 2.25}px`);
        el.style.setProperty('--tilt-x', `${current.y * -1.4}deg`);
        el.style.setProperty('--tilt-y', `${current.x * 2.4}deg`);
      }
      frame = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? true;
    });
    io.observe(el);
    if (finePointer) {
      window.addEventListener('pointermove', onPointerMove, { passive: true });
      document.documentElement.addEventListener('pointerleave', onPointerLeave);
    }
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      document.documentElement.removeEventListener('pointerleave', onPointerLeave);
    };
  }, [finePointer, reducedMotion]);

  return (
    <div ref={scene} className="avatar">
      <div className="avatar__figure">
        <Picture src={AVATAR.src} width={AVATAR.width} height={AVATAR.height} alt="Portrait 3D de Kone Sory Ben Khaled" priority className="avatar__image" draggable={false} />
        <span className="avatar__eye avatar__eye--left" aria-hidden="true">
          <i />
        </span>
        <span className="avatar__eye avatar__eye--right" aria-hidden="true">
          <i />
        </span>
      </div>
      <div className="avatar__reflection" aria-hidden="true">
        <Picture src={AVATAR.src} width={AVATAR.width} height={AVATAR.height} alt="" />
      </div>
    </div>
  );
}
