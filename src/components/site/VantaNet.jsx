import React, { useEffect, useRef } from 'react';

// A quiet Vanta NET field: a network of nodes behind the incident timeline.
// Loaded on demand, only on wider screens, only while on screen, never for reduced motion.
export default function VantaNet({ className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    if (window.innerWidth < 768) return undefined;

    let effect = null;
    let cancelled = false;

    const start = async () => {
      if (effect || cancelled) return;
      const [THREE, { default: NET }] = await Promise.all([import('three'), import('vanta/dist/vanta.net.min')]);
      if (cancelled || effect) return;
      effect = NET({
        el,
        THREE,
        mouseControls: false,
        touchControls: false,
        gyroControls: false,
        scale: 1,
        scaleMobile: 1,
        backgroundColor: 0x0c1324,
        backgroundAlpha: 1,
        color: 0x3d5a8a,
        points: 9,
        maxDistance: 19,
        spacing: 22,
        showDots: true,
      });
    };
    const stop = () => { if (effect) { effect.destroy(); effect = null; } };

    const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()), { rootMargin: '100px' });
    io.observe(el);
    return () => { cancelled = true; io.disconnect(); stop(); };
  }, []);

  return <div ref={ref} className={className} aria-hidden="true" />;
}
