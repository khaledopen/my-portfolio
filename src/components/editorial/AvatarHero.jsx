import React, { useEffect, useRef } from 'react';

const AvatarHero = () => {
  const sceneRef = useRef(null);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let frame;
    let pointerActive = false;

    const onPointerMove = event => {
      target.x = Math.max(-1, Math.min(1, (event.clientX / window.innerWidth - .5) * 2));
      target.y = Math.max(-1, Math.min(1, (event.clientY / window.innerHeight - .5) * 2));
      pointerActive = true;
    };
    const onPointerLeave = () => { pointerActive = false; };
    const animate = timestamp => {
      if (!pointerActive) {
        target.x = Math.sin(timestamp * .00055) * .22;
        target.y = Math.cos(timestamp * .00038) * .12;
      }
      current.x += (target.x - current.x) * .085;
      current.y += (target.y - current.y) * .085;
      scene.style.setProperty('--gaze-x', `${current.x * 8}px`);
      scene.style.setProperty('--gaze-y', `${current.y * 5}px`);
      scene.style.setProperty('--avatar-x', `${current.x * 18}px`);
      scene.style.setProperty('--avatar-y', `${current.y * 10}px`);
      scene.style.setProperty('--avatar-ry', `${current.x * 5.5}deg`);
      scene.style.setProperty('--avatar-rx', `${current.y * -3.5}deg`);
      frame = requestAnimationFrame(animate);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onPointerLeave);
    frame = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onPointerMove);
      document.documentElement.removeEventListener('pointerleave', onPointerLeave);
    };
  }, []);

  return (
    <div ref={sceneRef} className="hero-avatar-scene">
      <div className="hero-name-backdrop" aria-hidden="true">
        <span>KONE SORY</span>
        <span>BEN KHALED</span>
      </div>
      <div className="hero-avatar-glow" aria-hidden="true" />
      <div className="hero-avatar-motion">
        <img className="hero-avatar-image" src="/hero-avatar-kone-v1.png" alt="Portrait 3D de Kone Sory Ben Khaled" draggable="false" />
        <span className="hero-avatar-eye hero-avatar-eye--left"><i /></span>
        <span className="hero-avatar-eye hero-avatar-eye--right"><i /></span>
      </div>
      <span className="hero-avatar-coordinate" aria-hidden="true">X / Y — INTERACTIVE GAZE</span>
    </div>
  );
};

export default AvatarHero;
