import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';

const EASE = [0.23, 1, 0.32, 1];

// Heading that reveals line-by-line as it enters the viewport (once).
export function RevealText({ as = 'h2', children, className = '', delay = 0 }) {
  const reduce = useReducedMotion();
  const Tag = motion[as] || motion.h2;
  if (reduce) return React.createElement(as, { className }, children);
  return (
    <Tag className={className} initial={{ opacity: 0, y: 14, filter: 'blur(3px)' }} whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }} transition={{ duration: 0.7, ease: EASE, delay }}>
      {children}
    </Tag>
  );
}

// Block that settles in once when it scrolls into view.
export function Reveal({ children, className = '', delay = 0, y = 12 }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div className={className} initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }} transition={{ duration: 0.6, ease: EASE, delay }}>
      {children}
    </motion.div>
  );
}

// Slight depth: content drifts against the scroll by a few pixels.
export function Parallax({ children, className = '', distance = 24 }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  return (
    <div ref={ref} className={className}>
      <motion.div style={reduce ? undefined : { y }}>{children}</motion.div>
    </div>
  );
}

const Arrow = () => (
  <svg className="cs-btn-arrow" width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M2 8h11M9 4l4 4-4 4" /></svg>
);

// Button that leans a few pixels toward the cursor. Desktop pointers only.
export function MagneticLink({ to, href, variant = 'primary', arrow = true, children, className = '' }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0); const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 20, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 260, damping: 20, mass: 0.6 });
  const onMove = (e) => {
    if (reduce || !ref.current || !window.matchMedia('(pointer: fine)').matches) return;
    const r = ref.current.getBoundingClientRect();
    x.set(((e.clientX - r.left) / r.width - 0.5) * 6);
    y.set(((e.clientY - r.top) / r.height - 0.5) * 4);
  };
  const onLeave = () => { x.set(0); y.set(0); };
  const cls = `cs-btn cs-btn-${variant} ${className}`;
  const inner = <>{children}{arrow && <Arrow />}</>;
  return (
    <motion.span ref={ref} style={{ x: sx, y: sy, display: 'inline-flex' }} onMouseMove={onMove} onMouseLeave={onLeave}>
      {href ? <a href={href} className={cls} {...(/^https?:/.test(href) ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{inner}</a> : <Link to={to} className={cls}>{inner}</Link>}
    </motion.span>
  );
}

// Section marker: a rule that draws itself, with index and name in system type.
export function SectionMarker({ index, total = 6, label, dark = false, className = '' }) {
  const reduce = useReducedMotion();
  const tone = dark ? 'text-[#8D96AA]' : 'text-dim-2';
  const line = dark ? 'bg-[#2A3247]' : 'bg-[#C5CBD6]';
  return (
    <motion.div className={`flex items-center gap-4 ${className}`} initial={reduce ? false : 'hidden'} whileInView="show" viewport={{ once: true }}>
      <span className={`cs-meta ${tone} whitespace-nowrap`}>{String(index).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
      <div className="relative h-px flex-1">
        <motion.div className={`absolute inset-0 origin-left ${line}`}
          variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 1.1, ease: EASE } } }} />
      </div>
      <span className={`cs-meta ${tone} whitespace-nowrap`}>{label}</span>
    </motion.div>
  );
}
