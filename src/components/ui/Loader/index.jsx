import React, { useEffect, useState } from 'react';
import './loader-stage.css';

const Loader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startedAt = performance.now();
    let frame;
    const tick = now => {
      const next = Math.min(100, Math.round(((now - startedAt) / 1850) * 100));
      setProgress(next);
      if (next < 100) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="loader-stage" role="status" aria-label="Chargement du portfolio">
      <div className="loader-meta loader-meta--top">
        <span>PORTFOLIO / 2026</span>
        <span>ABIDJAN, CI</span>
      </div>
      <div className="loader-word" aria-hidden="true">
        <span>KS</span><em>BK</em>
      </div>
      <div className="loader-guides" aria-hidden="true">
        <i /><i /><i />
      </div>
      <div className="loader-meta loader-meta--bottom">
        <span>DÉVELOPPEUR WEB &amp; MOBILE</span>
        <strong>{String(progress).padStart(3, '0')}</strong>
      </div>
    </div>
  );
};

export default Loader;
