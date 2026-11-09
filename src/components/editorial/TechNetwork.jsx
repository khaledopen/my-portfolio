import React, { useEffect, useRef } from 'react';

const TechNetwork = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = canvas?.parentElement;
    if (!canvas || !container) return undefined;
    const context = canvas.getContext('2d');
    if (!context) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const compactDevice = window.matchMedia('(hover: none), (pointer: coarse), (max-width: 820px)').matches;
    const pointer = { x: -1000, y: -1000, active: false };
    let width = 1;
    let height = 1;
    let ratio = 1;
    let frame;
    let visible = true;
    let lastFrame = 0;

    const resize = () => {
      const bounds = container.getBoundingClientRect();
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      ratio = Math.min(window.devicePixelRatio || 1, compactDevice ? 1.15 : 1.55);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const onPointerMove = event => {
      const bounds = container.getBoundingClientRect();
      pointer.x = event.clientX - bounds.left;
      pointer.y = event.clientY - bounds.top;
      pointer.active = true;
    };
    const onPointerLeave = () => { pointer.active = false; };

    const draw = timestamp => {
      if (!visible || (compactDevice && !reducedMotion && timestamp - lastFrame < 32)) {
        if (!reducedMotion) frame = requestAnimationFrame(draw);
        return;
      }
      lastFrame = timestamp;
      const time = reducedMotion ? 0 : timestamp * .00045;
      const centerX = width * .5;
      const centerY = height * .48;
      const streamCount = compactDevice ? 24 : 42;
      const pointsPerStream = compactDevice ? 34 : 58;

      context.clearRect(0, 0, width, height);
      const glow = context.createRadialGradient(centerX, centerY, 0, centerX, centerY, Math.min(width, height) * .34);
      glow.addColorStop(0, 'rgba(217,241,84,.16)');
      glow.addColorStop(.22, 'rgba(112,29,24,.12)');
      glow.addColorStop(1, 'rgba(0,0,0,0)');
      context.fillStyle = glow;
      context.fillRect(0, 0, width, height);

      for (let stream = 0; stream < streamCount; stream += 1) {
        const vertical = streamCount === 1 ? 0 : stream / (streamCount - 1);
        const originY = height * (.08 + vertical * .84);
        const streamPhase = stream * .37;

        for (let point = 0; point < pointsPerStream; point += 1) {
          const progress = point / (pointsPerStream - 1);
          const eased = Math.pow(progress, 1.52);
          const wave = Math.sin(time * 2.1 + point * .24 + streamPhase) * (1 - progress) * 3.8;
          const baseY = originY + (centerY - originY) * eased + wave;
          const leftX = progress * centerX;
          const rightX = width - leftX;
          const depth = .22 + progress * .78;
          const pulse = (Math.sin(time * 4 + point * .46 - stream * .11) + 1) * .5;
          let leftY = baseY;
          let rightY = baseY;

          if (pointer.active) {
            const leftDistance = Math.hypot(leftX - pointer.x, leftY - pointer.y);
            const rightDistance = Math.hypot(rightX - pointer.x, rightY - pointer.y);
            if (leftDistance < 130) leftY += ((leftY - pointer.y) / Math.max(leftDistance, 1)) * (130 - leftDistance) * .16;
            if (rightDistance < 130) rightY += ((rightY - pointer.y) / Math.max(rightDistance, 1)) * (130 - rightDistance) * .16;
          }

          const radius = .45 + depth * 1.15 + pulse * .35;
          const alpha = .09 + depth * .46 + pulse * .12;
          context.fillStyle = `rgba(242,238,230,${alpha})`;
          context.beginPath();
          context.arc(leftX, leftY, radius, 0, Math.PI * 2);
          context.arc(rightX, rightY, radius, 0, Math.PI * 2);
          context.fill();
        }
      }

      for (let spark = 0; spark < (compactDevice ? 26 : 52); spark += 1) {
        const seed = Math.sin((spark + 1) * 91.17) * 43758.5453;
        const normalized = seed - Math.floor(seed);
        const direction = spark % 2 === 0 ? -1 : 1;
        const travel = (normalized + time * (.08 + (spark % 5) * .012)) % 1;
        const x = centerX + direction * travel * centerX;
        const spread = (Math.sin((spark + 4) * 17.31) * .5 + .5) * height;
        const y = centerY + (spread - centerY) * Math.pow(travel, .72);
        const blink = .25 + (Math.sin(time * 8 + spark) + 1) * .22;
        context.fillStyle = spark % 7 === 0 ? `rgba(217,241,84,${blink})` : `rgba(242,238,230,${blink})`;
        context.fillRect(x, y, spark % 7 === 0 ? 2.6 : 1.6, spark % 7 === 0 ? 2.6 : 1.6);
      }

      context.beginPath();
      context.arc(centerX, centerY, 3.5 + Math.sin(time * 4) * 1.5, 0, Math.PI * 2);
      context.fillStyle = '#d9f154';
      context.shadowColor = '#d9f154';
      context.shadowBlur = 18;
      context.fill();
      context.shadowBlur = 0;

      if (!reducedMotion) frame = requestAnimationFrame(draw);
    };

    resize();
    draw(0);
    const resizeObserver = new ResizeObserver(resize);
    const visibilityObserver = new IntersectionObserver(entries => {
      visible = entries[0]?.isIntersecting ?? true;
    });
    resizeObserver.observe(container);
    visibilityObserver.observe(container);
    container.addEventListener('pointermove', onPointerMove, { passive: true });
    container.addEventListener('pointerleave', onPointerLeave);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      container.removeEventListener('pointermove', onPointerMove);
      container.removeEventListener('pointerleave', onPointerLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="tech-network" aria-hidden="true" />;
};

export default TechNetwork;
