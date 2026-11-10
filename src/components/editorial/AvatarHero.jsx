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
    let nextIdleGaze = 0;

    const onPointerMove = event => {
      const bounds = scene.getBoundingClientRect();
      const centreX = bounds.left + bounds.width / 2;
      const centreY = bounds.top + bounds.height * .41;
      target.x = Math.max(-1, Math.min(1, (event.clientX - centreX) / (window.innerWidth * .42)));
      target.y = Math.max(-1, Math.min(1, (event.clientY - centreY) / (window.innerHeight * .52)));
      pointerActive = true;
    };
    const onPointerLeave = () => {
      pointerActive = false;
      nextIdleGaze = 0;
    };
    const animate = timestamp => {
      if (!pointerActive && timestamp >= nextIdleGaze) {
        target.x = (Math.random() - .5) * .42;
        target.y = (Math.random() - .5) * .2;
        nextIdleGaze = timestamp + 1600 + Math.random() * 2200;
      }
      current.x += (target.x - current.x) * .065;
      current.y += (target.y - current.y) * .065;
      const microX = Math.sin(timestamp * .0063) * .14;
      const microY = Math.cos(timestamp * .0047) * .08;
      scene.style.setProperty('--gaze-x', `${current.x * 3.8 + microX}px`);
      scene.style.setProperty('--gaze-y', `${current.y * 2.25 + microY}px`);
      scene.style.setProperty('--avatar-x', `${current.x * 8}px`);
      scene.style.setProperty('--avatar-y', `${current.y * 4}px`);
      scene.style.setProperty('--avatar-ry', `${current.x * 2.4}deg`);
      scene.style.setProperty('--avatar-rx', `${current.y * -1.4}deg`);
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
