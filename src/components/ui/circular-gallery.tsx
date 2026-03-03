import React, { useEffect, useRef, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface GalleryItem {
  title: string;
  subtitle: string;
  photo: {
    url: string;
    text: string;
    pos?: string;
  };
}

interface CircularGalleryProps extends HTMLAttributes<HTMLDivElement> {
  items: GalleryItem[];
  radius?: number;
  autoRotateSpeed?: number;
}

const CircularGallery = React.forwardRef<HTMLDivElement, CircularGalleryProps>(
  ({ items, className, radius = 600, autoRotateSpeed = 0.02, ...props }, ref) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const rotationRef = useRef(0);
    const isDraggingRef = useRef(false);
    const lastMouseXRef = useRef<number | null>(null);
    const animationFrameRef = useRef<number | null>(null);
    const plateRef = useRef<HTMLDivElement | null>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const pausedRef = useRef(false);
    const interactionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const anglePerItem = 360 / items.length;

    // Direct DOM update — no React state, no re-renders
    const updateDOM = () => {
      const plate = plateRef.current;
      if (!plate) return;

      plate.style.transform = `rotateY(${rotationRef.current}deg)`;

      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const itemAngle = i * anglePerItem;
        const totalRotation = rotationRef.current % 360;
        const relativeAngle = (itemAngle + totalRotation + 360) % 360;
        const normalizedAngle = Math.abs(relativeAngle > 180 ? 360 - relativeAngle : relativeAngle);
        const opacity = Math.max(0.25, 1 - normalizedAngle / 180);
        card.style.opacity = String(opacity);
      });
    };

    // rAF loop — updates DOM directly, no setState
    useEffect(() => {
      const loop = () => {
        if (!pausedRef.current) {
          rotationRef.current += autoRotateSpeed;
        }
        updateDOM();
        animationFrameRef.current = requestAnimationFrame(loop);
      };
      animationFrameRef.current = requestAnimationFrame(loop);
      return () => {
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [autoRotateSpeed, anglePerItem]);

    // Drag interaction
    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      const onPointerDown = (e: PointerEvent) => {
        isDraggingRef.current = true;
        lastMouseXRef.current = e.clientX;
        pausedRef.current = true;
        if (interactionTimerRef.current) clearTimeout(interactionTimerRef.current);
        container.setPointerCapture(e.pointerId);
      };

      const onPointerMove = (e: PointerEvent) => {
        if (!isDraggingRef.current || lastMouseXRef.current === null) return;
        const delta = e.clientX - lastMouseXRef.current;
        lastMouseXRef.current = e.clientX;
        rotationRef.current += delta * 0.3;
      };

      const onPointerUp = () => {
        isDraggingRef.current = false;
        lastMouseXRef.current = null;
        interactionTimerRef.current = setTimeout(() => {
          pausedRef.current = false;
        }, 800);
      };

      container.addEventListener('pointerdown', onPointerDown);
      window.addEventListener('pointermove', onPointerMove);
      window.addEventListener('pointerup', onPointerUp);

      return () => {
        container.removeEventListener('pointerdown', onPointerDown);
        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('pointerup', onPointerUp);
        if (interactionTimerRef.current) clearTimeout(interactionTimerRef.current);
      };
    }, []);

    return (
      <div
        ref={(node) => {
          containerRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        role="region"
        aria-label="3D Galerie"
        className={cn(
          'relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing select-none',
          className
        )}
        style={{ perspective: '2000px' }}
        {...props}
      >
        <div
          ref={plateRef}
          className="relative w-full h-full"
          style={{
            transformStyle: 'preserve-3d',
            willChange: 'transform',
            transform: 'rotateY(0deg)',
          }}
        >
          {items.map((item, i) => {
            const itemAngle = i * anglePerItem;
            return (
              <div
                key={item.photo.url}
                ref={(el) => { cardRefs.current[i] = el; }}
                role="group"
                aria-label={item.title}
                className="absolute w-[280px] h-[370px] sm:w-[300px] sm:h-[400px]"
                style={{
                  transform: `rotateY(${itemAngle}deg) translateZ(${radius}px) translateZ(0)`,
                  left: '50%',
                  top: '45%',
                  marginLeft: '-140px',
                  marginTop: '-200px',
                  opacity: 1,
                  willChange: 'opacity',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                }}
              >
                <div className="relative w-full h-full rounded-2xl shadow-2xl overflow-hidden group border border-bronze/20 bg-cream/70 backdrop-blur-lg">
                  <img
                    src={item.photo.url}
                    alt={item.photo.text}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ objectPosition: item.photo.pos || 'center' }}
                    draggable={false}
                  />
                  <div className="absolute bottom-0 left-0 w-full p-5 bg-gradient-to-t from-forest/90 via-forest/40 to-transparent text-cream">
                    <h2 className="text-xl font-serif font-bold">{item.title}</h2>
                    <p className="text-sm font-sans opacity-80 mt-1">{item.subtitle}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

CircularGallery.displayName = 'CircularGallery';

export { CircularGallery };
