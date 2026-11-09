import React, { useEffect, useRef } from 'react';

const RobotHero = () => {
  const sceneRef = useRef(null);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let frame;
    let reactionTimer;

    const onPointerMove = event => {
      const bounds = scene.getBoundingClientRect();
      target.x = Math.max(-1, Math.min(1, ((event.clientX - bounds.left) / bounds.width - .5) * 2));
      target.y = Math.max(-1, Math.min(1, ((event.clientY - bounds.top) / bounds.height - .5) * 2));
    };
    const onPointerLeave = () => {
      target.x = 0;
      target.y = 0;
    };
    const onPointerDown = () => {
      scene.classList.remove('is-reacting');
      void scene.offsetWidth;
      scene.classList.add('is-reacting');
      window.clearTimeout(reactionTimer);
      reactionTimer = window.setTimeout(() => scene.classList.remove('is-reacting'), 850);
    };
    const animate = () => {
      current.x += (target.x - current.x) * .075;
      current.y += (target.y - current.y) * .075;
      scene.style.setProperty('--robot-x', `${current.x * 25}px`);
      scene.style.setProperty('--robot-y', `${current.y * 14}px`);
      scene.style.setProperty('--robot-ry', `${current.x * -7}deg`);
      scene.style.setProperty('--robot-rx', `${current.y * 4}deg`);
      scene.style.setProperty('--light-x', `${50 + current.x * 18}%`);
      frame = requestAnimationFrame(animate);
    };

    scene.addEventListener('pointermove', onPointerMove, { passive: true });
    scene.addEventListener('pointerleave', onPointerLeave);
    scene.addEventListener('pointerdown', onPointerDown, { passive: true });
    frame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(reactionTimer);
      scene.removeEventListener('pointermove', onPointerMove);
      scene.removeEventListener('pointerleave', onPointerLeave);
      scene.removeEventListener('pointerdown', onPointerDown);
    };
  }, []);

  return (
    <div ref={sceneRef} className="hero-robot-scene">
      <div className="hero-robot-orbit hero-robot-orbit--outer" />
      <div className="hero-robot-orbit hero-robot-orbit--inner" />
      <div className="hero-robot-motion">
        <div className="hero-robot-body">
          <img className="hero-robot-image" src="/hero-robot-body.png" alt="Robot KSBK" draggable="false" />
          <img className="hero-robot-wave-arm" src="/hero-robot-arm.png" alt="" draggable="false" aria-hidden="true" />
          <span className="hero-robot-scan" />
        </div>
      </div>
      <div className="hero-robot-shadow" />
    </div>
  );
};

export default RobotHero;
