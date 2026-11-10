import React, { useEffect, useRef } from 'react';

const motionImages = [
  'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif',
  'https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif',
  'https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif',
  'https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif',
  'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif',
  'https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif',
  'https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif',
  'https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif',
  'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif',
  'https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif',
  'https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif',
  'https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif',
  'https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif',
  'https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif',
  'https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif',
  'https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif',
  'https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif',
  'https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif',
  'https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif'
];

const MarqueeRow = ({ images, reverse = false }) => (
  <div className={`motion-marquee__row ${reverse ? 'is-reverse' : ''}`}>
    {[...images, ...images, ...images].map((image, index) => (
      <figure className="motion-marquee__tile" key={`${image}-${index}`}>
        <img src={image} alt="Inspiration visuelle et motion design" loading="lazy" />
      </figure>
    ))}
  </div>
);

const MotionMarquee = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    let frame;
    const update = () => {
      const rect = section.getBoundingClientRect();
      const offset = (-rect.top + window.innerHeight) * .3;
      section.style.setProperty('--marquee-offset', `${offset}px`);
      section.style.setProperty('--marquee-reverse-offset', `${-offset}px`);
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <section ref={sectionRef} className="motion-marquee" aria-label="Galerie d'inspirations animées">
      <div className="motion-marquee__label"><span>EXPÉRIENCES NUMÉRIQUES</span><span>SCROLL / MOTION / INTERACTION</span></div>
      <MarqueeRow images={motionImages.slice(0, 11)} />
      <MarqueeRow images={motionImages.slice(11)} reverse />
    </section>
  );
};

export default MotionMarquee;
