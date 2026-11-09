import React, { useEffect, useRef } from 'react';

const TOKENS = ['01', '{}', '</>', 'JS', 'API', 'UX', 'NODE', 'REACT'];

const CodeConstellation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = canvas?.parentElement;
    if (!canvas || !section) return undefined;

    const context = canvas.getContext('2d');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const pointer = { x: -1000, y: -1000, active: false };
    let width = 0;
    let height = 0;
    let points = [];
    let frame;
    let time = 0;

    const random = seed => {
      const value = Math.sin(seed * 999.91) * 43758.5453;
      return value - Math.floor(value);
    };

    const resize = () => {
      const rect = section.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      const count = Math.max(30, Math.min(62, Math.floor(width / 25)));
      points = Array.from({ length: count }, (_, index) => ({
        x: random(index + 2) * width,
        y: random(index + 91) * height,
        baseX: random(index + 2) * width,
        baseY: random(index + 91) * height,
        radius: 1.2 + random(index + 45) * 2.3,
        speed: .18 + random(index + 8) * .42,
        phase: random(index + 31) * Math.PI * 2,
        token: TOKENS[index % TOKENS.length]
      }));
    };

    const onPointerMove = event => {
      const rect = section.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active = true;
    };
    const onPointerLeave = () => { pointer.active = false; };

    const drawRibbon = (offset, amplitude, speed, alpha) => {
      context.beginPath();
      for (let x = -40; x <= width + 40; x += 22) {
        const y = offset + Math.sin(x * .008 + time * speed) * amplitude + Math.sin(x * .003 - time * speed * .6) * amplitude * .45;
        if (x === -40) context.moveTo(x, y);
        else context.lineTo(x, y);
      }
      context.strokeStyle = `rgba(112, 29, 24, ${alpha})`;
      context.lineWidth = 1;
      context.stroke();
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);
      time += reducedMotion ? 0 : .009;

      drawRibbon(height * .22, 58, .65, .12);
      drawRibbon(height * .48, 85, .45, .08);
      drawRibbon(height * .74, 64, .75, .1);

      if (pointer.active) {
        const glow = context.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, 190);
        glow.addColorStop(0, 'rgba(217, 241, 84, .16)');
        glow.addColorStop(1, 'rgba(217, 241, 84, 0)');
        context.fillStyle = glow;
        context.fillRect(pointer.x - 190, pointer.y - 190, 380, 380);
      }

      points.forEach((point, index) => {
        const driftX = Math.cos(time * point.speed + point.phase) * 24;
        const driftY = Math.sin(time * point.speed * .8 + point.phase) * 19;
        let x = point.baseX + driftX;
        let y = point.baseY + driftY;

        if (pointer.active) {
          const dx = x - pointer.x;
          const dy = y - pointer.y;
          const distance = Math.hypot(dx, dy);
          if (distance < 180 && distance > 0) {
            const force = (1 - distance / 180) * 34;
            x += (dx / distance) * force;
            y += (dy / distance) * force;
          }
        }
        point.drawX = x;
        point.drawY = y;

        points.slice(0, index).forEach(other => {
          if (other.drawX === undefined) return;
          const distance = Math.hypot(x - other.drawX, y - other.drawY);
          if (distance < 150) {
            context.beginPath();
            context.moveTo(x, y);
            context.lineTo(other.drawX, other.drawY);
            context.strokeStyle = `rgba(13, 13, 12, ${(1 - distance / 150) * .095})`;
            context.stroke();
          }
        });

        context.beginPath();
        context.arc(x, y, point.radius, 0, Math.PI * 2);
        context.fillStyle = index % 7 === 0 ? 'rgba(112,29,24,.7)' : 'rgba(13,13,12,.24)';
        context.fill();

        if (index % 8 === 0) {
          context.font = '10px "DM Mono", monospace';
          context.fillStyle = 'rgba(112,29,24,.24)';
          context.fillText(point.token, x + 9, y - 9);
        }
      });

      if (!reducedMotion) frame = requestAnimationFrame(draw);
    };

    resize();
    draw();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(section);
    section.addEventListener('pointermove', onPointerMove, { passive: true });
    section.addEventListener('pointerleave', onPointerLeave);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      section.removeEventListener('pointermove', onPointerMove);
      section.removeEventListener('pointerleave', onPointerLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="about-motion" aria-hidden="true" />;
};

export default CodeConstellation;
