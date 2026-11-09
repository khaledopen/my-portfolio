import React, { useEffect, useRef } from 'react';

const hexToRgb = hex => {
  const match = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(hex.trim());
  if (!match) return null;
  const value = match[1].length === 3
    ? match[1].split('').map(character => character + character).join('')
    : match[1];
  return [parseInt(value.slice(0, 2), 16), parseInt(value.slice(2, 4), 16), parseInt(value.slice(4, 6), 16)];
};

const mixColor = (from, to, amount) => `rgb(${from.map((channel, index) => Math.round(channel + (to[index] - channel) * amount)).join(',')})`;

const HalftoneHero = ({ wordmark = 'KSBK' }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const context = canvas.getContext('2d', { alpha: false });
    if (!context) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const compactDevice = window.matchMedia('(hover: none), (pointer: coarse), (max-width: 820px)').matches;
    const ink = hexToRgb('#f2eee6');
    const warm = hexToRgb('#d9f154');
    let width = 1;
    let height = 1;
    let ratio = 1;
    let dots = new Float32Array(0);
    let count = 0;
    let frame = 0;
    let visible = true;
    let awake = true;
    let pointerX = -100000;
    let pointerY = -100000;
    let shock = { x: 0, y: 0, startedAt: -1 };
    let alive = true;

    const layout = () => {
      const bounds = canvas.getBoundingClientRect();
      width = Math.max(1, Math.round(bounds.width));
      height = Math.max(1, Math.round(bounds.height));
      ratio = Math.min(window.devicePixelRatio || 1, compactDevice ? 1.2 : 1.6);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);

      const mask = document.createElement('canvas');
      mask.width = width;
      mask.height = height;
      const maskContext = mask.getContext('2d', { willReadFrequently: true });
      if (!maskContext) return;

      const fontFamily = '"Space Grotesk", Arial, sans-serif';
      maskContext.font = `800 100px ${fontFamily}`;
      const measured = maskContext.measureText(wordmark).width;
      const fittedSize = measured > 0 ? (width * 1.04 / measured) * 100 : 100;
      maskContext.font = `800 ${fittedSize}px ${fontFamily}`;
      const metrics = maskContext.measureText(wordmark);
      const capHeight = metrics.actualBoundingBoxAscent || fittedSize * .72;
      maskContext.fillStyle = '#000';
      maskContext.textBaseline = 'alphabetic';
      maskContext.fillText(wordmark, (width - metrics.width) / 2, height / 2 + capHeight / 2);
      const pixels = maskContext.getImageData(0, 0, width, height).data;

      const gap = compactDevice ? 8 : 7;
      const columns = Math.ceil(width / gap);
      const rows = Math.ceil(height / gap);
      const values = [];
      for (let row = 0; row < rows; row += 1) {
        for (let column = 0; column < columns; column += 1) {
          let coverage = 0;
          for (let sampleY = 0; sampleY < 3; sampleY += 1) {
            for (let sampleX = 0; sampleX < 3; sampleX += 1) {
              const x = Math.min(width - 1, Math.floor(column * gap + ((sampleX + .5) * gap) / 3));
              const y = Math.min(height - 1, Math.floor(row * gap + ((sampleY + .5) * gap) / 3));
              coverage += pixels[(y * width + x) * 4 + 3];
            }
          }
          coverage /= 9 * 255;
          if (coverage < .06) continue;
          const homeX = column * gap + gap / 2;
          const homeY = row * gap + gap / 2;
          values.push(homeX, homeY, 0, 0, homeX, homeY, Math.sqrt(coverage) * gap * .54);
        }
      }
      dots = new Float32Array(values);
      count = values.length / 7;
      awake = true;
    };

    const draw = now => {
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      const background = context.createLinearGradient(0, 0, width, height);
      background.addColorStop(0, '#120b0a');
      background.addColorStop(.55, '#0b0b0a');
      background.addColorStop(1, '#050706');
      context.fillStyle = background;
      context.fillRect(0, 0, width, height);

      const radius = reducedMotion ? 0 : compactDevice ? 62 : 92;
      const shockAge = shock.startedAt < 0 ? 100000 : now - shock.startedAt;
      const shockRadius = shockAge * .9;
      let moving = false;
      for (let dotIndex = 0; dotIndex < count; dotIndex += 1) {
        const offset = dotIndex * 7;
        let x = dots[offset];
        let y = dots[offset + 1];
        let velocityX = dots[offset + 2];
        let velocityY = dots[offset + 3];
        const homeX = dots[offset + 4];
        const homeY = dots[offset + 5];

        if (!reducedMotion) {
          if (shockAge < 900) {
            const shockX = homeX - shock.x;
            const shockY = homeY - shock.y;
            const distance = Math.hypot(shockX, shockY) + .001;
            const band = 1 - Math.min(1, Math.abs(distance - shockRadius) / 26);
            if (band > 0) {
              const force = band * 3.2 * (1 - shockAge / 900);
              velocityX += (shockX / distance) * force;
              velocityY += (shockY / distance) * force;
            }
          }
          const deltaX = x - pointerX;
          const deltaY = y - pointerY;
          const distanceSquared = deltaX ** 2 + deltaY ** 2;
          if (distanceSquared < radius ** 2) {
            const distance = Math.sqrt(distanceSquared) + .001;
            const force = (1 - distance / radius) * 2.8;
            velocityX += (deltaX / distance) * force;
            velocityY += (deltaY / distance) * force;
          }
          velocityX = (velocityX + (homeX - x) * .05) * .84;
          velocityY = (velocityY + (homeY - y) * .05) * .84;
          x += velocityX;
          y += velocityY;
          dots[offset] = x;
          dots[offset + 1] = y;
          dots[offset + 2] = velocityX;
          dots[offset + 3] = velocityY;
          moving ||= Math.abs(velocityX) + Math.abs(velocityY) > .02 || Math.abs(x - homeX) + Math.abs(y - homeY) > .05;
        }
        const warmth = Math.min(1, Math.hypot(x - homeX, y - homeY) / 28);
        context.fillStyle = warmth > .02 ? mixColor(ink, warm, warmth) : '#f2eee6';
        context.beginPath();
        context.arc(x, y, dots[offset + 6], 0, Math.PI * 2);
        context.fill();
      }
      awake = moving || shockAge < 900 || pointerX > -10000;
    };

    const loop = now => {
      frame = 0;
      if (!visible) return;
      draw(now);
      if (awake) frame = requestAnimationFrame(loop);
    };
    const wake = () => {
      awake = true;
      if (!frame && visible) frame = requestAnimationFrame(loop);
    };
    const positionFromEvent = event => {
      const bounds = canvas.getBoundingClientRect();
      return [event.clientX - bounds.left, event.clientY - bounds.top];
    };
    const onPointerMove = event => {
      [pointerX, pointerY] = positionFromEvent(event);
      wake();
    };
    const onPointerLeave = () => {
      pointerX = -100000;
      pointerY = -100000;
      wake();
    };
    const onPointerDown = event => {
      if (reducedMotion) return;
      const [x, y] = positionFromEvent(event);
      shock = { x, y, startedAt: performance.now() };
      wake();
    };

    layout();
    draw(performance.now());
    wake();
    const resizeObserver = new ResizeObserver(() => {
      layout();
      wake();
    });
    const visibilityObserver = new IntersectionObserver(entries => {
      visible = entries[0]?.isIntersecting ?? true;
      if (visible) wake();
    });
    resizeObserver.observe(canvas);
    visibilityObserver.observe(canvas);
    canvas.addEventListener('pointermove', onPointerMove, { passive: true });
    canvas.addEventListener('pointerleave', onPointerLeave);
    canvas.addEventListener('pointerdown', onPointerDown, { passive: true });
    document.fonts?.ready.then(() => {
      if (!alive) return;
      layout();
      wake();
    });

    return () => {
      alive = false;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerleave', onPointerLeave);
      canvas.removeEventListener('pointerdown', onPointerDown);
    };
  }, [wordmark]);

  return <canvas ref={canvasRef} className="hero-halftone-canvas" aria-hidden="true" />;
};

export default HalftoneHero;
