import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

// Lenis smooth scrolling for the public site only (dashboard/admin keep native scroll).
// Off entirely for people who ask for reduced motion.
let lenis = null;
export const getLenis = () => lenis;

export default function SmoothScroll() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    lenis = new Lenis({ duration: 1.05, easing: (t) => 1 - Math.pow(1 - t, 3), smoothWheel: true });
    let raf;
    const loop = (time) => { lenis.raf(time); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);

    // In-page anchors (#platform etc.) glide instead of jumping
    const onClick = (e) => {
      const a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a) return;
      const el = document.getElementById(a.getAttribute('href').slice(1));
      if (el) { e.preventDefault(); lenis.scrollTo(el, { offset: -72 }); }
    };
    document.addEventListener('click', onClick);
    return () => { cancelAnimationFrame(raf); document.removeEventListener('click', onClick); lenis.destroy(); lenis = null; };
  }, []);

  // New route: start at the top (or at the linked section)
  useEffect(() => {
    const target = hash && document.getElementById(hash.slice(1));
    if (lenis) {
      if (target) lenis.scrollTo(target, { offset: -72, immediate: true });
      else lenis.scrollTo(0, { immediate: true });
    } else if (target) target.scrollIntoView({ block: 'start' });
    else window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}
