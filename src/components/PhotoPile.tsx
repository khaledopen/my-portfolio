import { useEffect, useLayoutEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';
import { Picture } from './Picture';
import { Lightbox } from './Lightbox';
import { pileItems, type PileItem } from '@/data/media';
import { cn } from '@/lib/utils';

/** Emplacements de départ (en fractions de la largeur), un peu en désordre comme des tirages posés sur une table. */
const DESKTOP = [
  { x: 0.02, y: 0.06, r: -6 },
  { x: 0.27, y: 0, r: 4 },
  { x: 0.49, y: 0.12, r: -3 },
  { x: 0.1, y: 0.62, r: 5 },
  { x: 0.74, y: 0.04, r: -5 }
];
const MOBILE = [
  { x: 0.02, y: 0.02, r: -5 },
  { x: 0.5, y: 0.1, r: 4 },
  { x: 0.06, y: 0.95, r: 3 },
  { x: 0.48, y: 1.25, r: -4 },
  { x: 0.1, y: 1.9, r: -2 }
];

interface Layout {
  x: number;
  y: number;
  w: number;
  h: number;
  r: number;
}

function computeLayout(items: PileItem[], width: number): { boxes: Layout[]; height: number } {
  const mobile = width < 640;
  const slots = mobile ? MOBILE : DESKTOP;
  const boxes = items.map((item, i) => {
    const slot = slots[i % slots.length]!;
    const landscape = item.width > item.height;
    const w = mobile ? width * (landscape ? 0.62 : 0.46) : Math.min(landscape ? 360 : 250, width * (landscape ? 0.36 : 0.25));
    const h = (w * item.height) / item.width;
    const lap = Math.floor(i / slots.length);
    return { x: Math.min(slot.x * width + lap * 30, width - w), y: slot.y * (mobile ? width : width * 0.42) + lap * 40, w, h, r: slot.r };
  });
  const height = Math.max(...boxes.map(b => b.y + b.h)) + 40;
  return { boxes, height };
}

function PileVideo({ item }: { item: PileItem }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = ref.current;
    if (!video || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const io = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) void video.play().catch(() => undefined);
      else video.pause();
    });
    io.observe(video);
    return () => io.disconnect();
  }, []);
  return <video ref={ref} src={item.video} poster={item.src} muted loop playsInline preload="metadata" aria-hidden="true" className="pointer-events-none h-full w-full object-cover" />;
}

export function PhotoPile() {
  const pile = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [offsets, setOffsets] = useState(() => pileItems.map(() => ({ x: 0, y: 0 })));
  const [order, setOrder] = useState(() => pileItems.map((_, i) => i));
  const [dragging, setDragging] = useState<number | null>(null);
  const [open, setOpen] = useState<number | null>(null);
  const drag = useRef<{ index: number; startX: number; startY: number; baseX: number; baseY: number; moved: boolean } | null>(null);
  const suppressClick = useRef(false);

  useLayoutEffect(() => {
    const el = pile.current;
    if (!el) return undefined;
    const ro = new ResizeObserver(([entry]) => setWidth(entry?.contentRect.width ?? 0));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const { boxes, height } = computeLayout(pileItems, width || 960);

  const lift = (index: number) => setOrder(current => [...current.filter(i => i !== index), index]);

  const onPointerDown = (event: ReactPointerEvent<HTMLButtonElement>, index: number) => {
    if (event.button !== 0) return;
    const base = offsets[index]!;
    drag.current = { index, startX: event.clientX, startY: event.clientY, baseX: base.x, baseY: base.y, moved: false };
    lift(index);
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLButtonElement>) => {
    const d = drag.current;
    if (!d) return;
    const dx = event.clientX - d.startX;
    const dy = event.clientY - d.startY;
    if (!d.moved && Math.hypot(dx, dy) > 6) {
      d.moved = true;
      setDragging(d.index);
      event.currentTarget.setPointerCapture(event.pointerId);
    }
    if (d.moved) {
      setOffsets(current => current.map((o, i) => (i === d.index ? { x: d.baseX + dx, y: d.baseY + dy } : o)));
    }
  };

  const onPointerUp = () => {
    const d = drag.current;
    drag.current = null;
    setDragging(null);
    suppressClick.current = Boolean(d?.moved);
  };

  return (
    <>
      <div ref={pile} className="relative z-[3] mx-auto w-[min(100%-2.5rem,64rem)]" style={{ height }}>
        {pileItems.map((item, index) => {
          const box = boxes[index]!;
          const offset = offsets[index]!;
          const isDragging = dragging === index;
          return (
            <button
              key={item.src}
              type="button"
              aria-label={`Voir de plus près : ${item.caption}`}
              onPointerDown={event => onPointerDown(event, index)}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
              onClick={() => {
                if (suppressClick.current) {
                  suppressClick.current = false;
                  return;
                }
                setOpen(index);
              }}
              className={cn(
                'absolute top-0 left-0 block cursor-grab touch-pan-y overflow-hidden rounded-lg border-2 border-ink bg-paper-2 p-0 select-none',
                'shadow-[0_1px_2px_rgba(0,0,0,.08),0_6px_18px_-8px_rgba(0,0,0,.25)] hover:shadow-[0_2px_4px_rgba(0,0,0,.1),0_14px_30px_-10px_rgba(0,0,0,.32)]',
                isDragging
                  ? 'cursor-grabbing shadow-[0_4px_8px_rgba(0,0,0,.12),0_26px_50px_-14px_rgba(0,0,0,.4)]'
                  : 'transition-[transform,box-shadow] duration-[400ms] ease-[cubic-bezier(.2,.8,.2,1)]'
              )}
              style={{
                width: box.w,
                height: box.h,
                zIndex: order.indexOf(index) + 1,
                transform: `translate(${box.x + offset.x}px, ${box.y + offset.y}px) rotate(${box.r}deg) scale(${isDragging ? 1.06 : 1})`
              }}
            >
              {item.video ? (
                <>
                  <PileVideo item={item} />
                  <span className="absolute right-2 bottom-2 grid size-8 place-items-center rounded-full border border-ink bg-paper text-ink" aria-hidden="true">
                    <svg viewBox="0 0 10 12" className="ml-0.5 size-3">
                      <path d="M1 1 L9 6 L1 11 Z" fill="currentColor" />
                    </svg>
                  </span>
                </>
              ) : (
                <Picture
                  src={item.src}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  className="pointer-events-none block h-full w-full [&>img]:h-full [&>img]:w-full [&>img]:object-cover"
                  draggable={false}
                />
              )}
            </button>
          );
        })}
      </div>
      {open !== null && (
        <Lightbox
          images={pileItems.map(item => ({ src: item.src, video: item.video, alt: item.alt, width: item.width, height: item.height, caption: item.caption }))}
          index={open}
          label="Ma pellicule"
          onClose={() => setOpen(null)}
          onIndexChange={setOpen}
        />
      )}
    </>
  );
}
