import React, { useEffect, useRef } from 'react';

const SYMBOLS = ['01', '{}', '</>', '[]', 'API', 'DEV', '011', 'λ'];

const DigitalFluid = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const context = canvas.getContext('2d', { alpha: false });
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const pointer = { x: 0.68, y: 0.45, previousX: 0.68, previousY: 0.45, active: false };
    const drops = [];
    let width = 1;
    let height = 1;
    let columns = 72;
    let rows = 44;
    let field = new Float32Array(columns * rows);
    let velocity = new Float32Array(columns * rows);
    let animationFrame;
    let visible = true;
    let lastAutoWave = 0;

    const index = (x, y) => y * columns + x;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      const ratio = Math.min(window.devicePixelRatio || 1, 1.6);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      columns = Math.max(48, Math.min(86, Math.round(width / 13)));
      rows = Math.max(34, Math.min(58, Math.round(height / 18)));
      field = new Float32Array(columns * rows);
      velocity = new Float32Array(columns * rows);
    };

    const disturb = (normalX, normalY, force = 1) => {
      const centerX = Math.round(normalX * (columns - 1));
      const centerY = Math.round(normalY * (rows - 1));
      const radius = Math.max(3, Math.round(columns * 0.055));

      for (let y = Math.max(1, centerY - radius); y < Math.min(rows - 1, centerY + radius); y += 1) {
        for (let x = Math.max(1, centerX - radius); x < Math.min(columns - 1, centerX + radius); x += 1) {
          const distance = Math.hypot(x - centerX, y - centerY);
          if (distance < radius) velocity[index(x, y)] += Math.cos((distance / radius) * Math.PI * 0.5) * force;
        }
      }

      drops.push({ x: normalX * width, y: normalY * height, radius: 4, opacity: 0.72, speed: 2.5 + Math.abs(force) });
      if (drops.length > 12) drops.shift();
    };

    const onPointerMove = event => {
      const rect = canvas.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
      const y = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));
      const speed = Math.hypot(x - pointer.previousX, y - pointer.previousY);
      pointer.x = x;
      pointer.y = y;
      pointer.active = true;
      if (speed > 0.004) disturb(x, y, Math.min(2.4, 0.45 + speed * 18));
      pointer.previousX = x;
      pointer.previousY = y;
    };

    const onPointerEnter = onPointerMove;
    const onPointerLeave = () => { pointer.active = false; };
    const onPointerDown = event => {
      onPointerMove(event);
      disturb(pointer.x, pointer.y, 3.4);
    };

    const simulate = time => {
      if (time - lastAutoWave > 1500) {
        const x = 0.18 + Math.random() * 0.72;
        const y = 0.12 + Math.random() * 0.76;
        disturb(x, y, 0.45 + Math.random() * 0.4);
        lastAutoWave = time;
      }

      for (let y = 1; y < rows - 1; y += 1) {
        for (let x = 1; x < columns - 1; x += 1) {
          const i = index(x, y);
          const neighbours = field[i - 1] + field[i + 1] + field[i - columns] + field[i + columns];
          velocity[i] += (neighbours * 0.25 - field[i]) * 0.19;
          velocity[i] *= 0.965;
        }
      }

      for (let i = 0; i < field.length; i += 1) field[i] += velocity[i];
    };

    const sample = (normalX, normalY) => {
      const x = Math.max(0, Math.min(columns - 1, Math.round(normalX * (columns - 1))));
      const y = Math.max(0, Math.min(rows - 1, Math.round(normalY * (rows - 1))));
      return field[index(x, y)];
    };

    const draw = time => {
      const background = context.createLinearGradient(0, 0, width, height);
      background.addColorStop(0, '#120e0d');
      background.addColorStop(0.48, '#080b0d');
      background.addColorStop(1, '#020506');
      context.fillStyle = background;
      context.fillRect(0, 0, width, height);

      const glowX = pointer.x * width;
      const glowY = pointer.y * height;
      const glow = context.createRadialGradient(glowX, glowY, 0, glowX, glowY, Math.max(150, width * 0.34));
      glow.addColorStop(0, pointer.active ? 'rgba(125, 237, 226, .18)' : 'rgba(116, 190, 193, .09)');
      glow.addColorStop(0.42, 'rgba(112, 29, 24, .1)');
      glow.addColorStop(1, 'rgba(2, 5, 6, 0)');
      context.fillStyle = glow;
      context.fillRect(0, 0, width, height);

      context.globalCompositeOperation = 'lighter';
      const lineCount = 22;
      for (let line = 0; line < lineCount; line += 1) {
        const normalY = line / (lineCount - 1);
        const baseY = normalY * height;
        context.beginPath();
        for (let point = 0; point <= columns; point += 1) {
          const normalX = point / columns;
          const wave = sample(normalX, normalY) * 8.5;
          const current = Math.sin(normalX * 8 + normalY * 4 - time * 0.00035) * (4 + normalY * 8);
          const curl = Math.sin(normalX * 3.4 - time * 0.00018 + normalY * 8) * 5;
          const x = normalX * width + curl;
          const y = baseY + wave + current;
          if (point === 0) context.moveTo(x, y);
          else context.lineTo(x, y);
        }
        const brightness = 0.04 + (1 - Math.abs(normalY - pointer.y)) * 0.075;
        context.strokeStyle = line % 4 === 0 ? `rgba(156, 245, 233, ${brightness + 0.06})` : `rgba(239, 231, 213, ${brightness})`;
        context.lineWidth = line % 4 === 0 ? 1.15 : 0.65;
        context.stroke();
      }

      context.globalCompositeOperation = 'source-over';
      context.font = '500 9px monospace';
      context.textAlign = 'center';
      for (let i = 0; i < 48; i += 1) {
        const normalX = ((i * 0.618033 + 0.07) % 1);
        const normalY = ((i * 0.381966 + 0.13) % 1);
        const wave = sample(normalX, normalY);
        const shimmer = 0.12 + (Math.sin(time * 0.001 + i * 1.7) + 1) * 0.08;
        context.fillStyle = `rgba(221, 238, 230, ${shimmer})`;
        context.fillText(SYMBOLS[i % SYMBOLS.length], normalX * width, normalY * height + wave * 7);
      }

      for (let i = drops.length - 1; i >= 0; i -= 1) {
        const drop = drops[i];
        context.beginPath();
        context.arc(drop.x, drop.y, drop.radius, 0, Math.PI * 2);
        context.strokeStyle = `rgba(169, 255, 242, ${drop.opacity})`;
        context.lineWidth = 1;
        context.stroke();
        drop.radius += drop.speed;
        drop.opacity *= 0.94;
        if (drop.opacity < 0.02) drops.splice(i, 1);
      }

      if (pointer.active) {
        context.beginPath();
        context.arc(glowX, glowY, 18 + Math.sin(time * 0.004) * 3, 0, Math.PI * 2);
        context.strokeStyle = 'rgba(184, 255, 244, .62)';
        context.lineWidth = 1;
        context.stroke();
        context.beginPath();
        context.arc(glowX, glowY, 3, 0, Math.PI * 2);
        context.fillStyle = '#b8fff4';
        context.fill();
      }
    };

    const animate = time => {
      if (visible) {
        simulate(time);
        draw(time);
      }
      animationFrame = requestAnimationFrame(animate);
    };

    const resizeObserver = new ResizeObserver(resize);
    const visibilityObserver = new IntersectionObserver(entries => {
      visible = entries[0]?.isIntersecting ?? true;
    });
    resizeObserver.observe(canvas);
    visibilityObserver.observe(canvas);
    resize();

    canvas.addEventListener('pointermove', onPointerMove, { passive: true });
    canvas.addEventListener('pointerenter', onPointerEnter, { passive: true });
    canvas.addEventListener('pointerleave', onPointerLeave);
    canvas.addEventListener('pointerdown', onPointerDown, { passive: true });

    if (reducedMotion) draw(0);
    else animationFrame = requestAnimationFrame(animate);

    return () => {
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerenter', onPointerEnter);
      canvas.removeEventListener('pointerleave', onPointerLeave);
      canvas.removeEventListener('pointerdown', onPointerDown);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-fluid-canvas" aria-hidden="true" />;
};

export default DigitalFluid;
