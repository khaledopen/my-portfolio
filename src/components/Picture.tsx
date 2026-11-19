import type { ImgHTMLAttributes } from 'react';

interface PictureProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'width' | 'height'> {
  /** Image originale (.png/.jpg) ; des variantes .avif et .webp du même nom sont proposées en priorité. */
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Mettre à false pour une image sans variantes optimisées (ex. SVG). */
  optimized?: boolean;
  priority?: boolean;
}

export function Picture({ src, alt, width, height, optimized = true, priority = false, className, ...rest }: PictureProps) {
  const base = src.replace(/\.(png|jpe?g)$/i, '');
  const canOptimize = optimized && base !== src;
  return (
    <picture className={className}>
      {canOptimize && <source srcSet={`${base}.avif`} type="image/avif" />}
      {canOptimize && <source srcSet={`${base}.webp`} type="image/webp" />}
      <img src={src} alt={alt} width={width} height={height} loading={priority ? 'eager' : 'lazy'} decoding={priority ? 'sync' : 'async'} fetchPriority={priority ? 'high' : 'auto'} {...rest} />
    </picture>
  );
}
