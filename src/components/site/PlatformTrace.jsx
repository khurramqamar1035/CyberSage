import React, { useRef, useState } from 'react';
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from 'framer-motion';

import { PRODUCTS } from '../../data/ecosystem';

// The platform, read as one stack: workspace, institutions, skills, security operations, intelligence.
// Scroll position drives the trace down through the layers.
export const STACK = PRODUCTS.map((p, i) => ({ t: `0${i + 1}`, who: p.name, state: p.role, what: p.with }));

// Each layer sits one step lower: the stack read top to bottom
const LEVEL = [40, 75, 110, 145, 180];
const W = 1200;
const STEP = W / STACK.length;
const tracePath = (() => {
  let d = `M0 ${LEVEL[0]}`;
  STACK.forEach((_, i) => {
    const x0 = i * STEP; const x1 = x0 + STEP; const y = LEVEL[i];
    const jitter = Array.from({ length: 10 }, (_, k) => `L${(x0 + 24 + k * ((STEP - 48) / 10)).toFixed(1)} ${(y + Math.sin(k * 1.7 + i) * 4).toFixed(1)}`).join(' ');
    d += ` L${x0 + 12} ${y} ${jitter} L${x1 - 12} ${y}`;
    if (i < STACK.length - 1) d += ` L${x1} ${LEVEL[i + 1]}`;
  });
  return d;
})();

export default function PlatformTrace() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 60%'] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const [reached, setReached] = useState(reduce ? STACK.length : 0);
  useMotionValueEvent(progress, 'change', (v) => { if (!reduce) setReached(Math.min(STACK.length, Math.floor(v * STACK.length + 0.35))); });

  return (
    <div ref={ref}>
      {/* desktop: horizontal trace across the full width */}
      <div className="hidden md:block">
        <div className="relative">
          <svg viewBox={`0 0 ${W} 220`} preserveAspectRatio="none" className="w-full h-[220px] block" aria-hidden="true">
            {STACK.map((_, i) => <line key={i} x1={i * STEP} y1="0" x2={i * STEP} y2="220" stroke="rgba(169,184,208,0.12)" vectorEffect="non-scaling-stroke" />)}
            <path d={tracePath} fill="none" stroke="rgba(169,184,208,0.16)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
            <motion.path d={tracePath} fill="none" stroke="#ECEEF1" strokeWidth="1.5" vectorEffect="non-scaling-stroke"
              style={{ pathLength: reduce ? 1 : progress }} />
          </svg>
          {STACK.map((s, i) => (
            <span key={i} className="absolute w-2 h-2 -translate-x-1/2 -translate-y-1/2 transition-colors duration-300"
              style={{ left: `${((i + 0.5) / STACK.length) * 100}%`, top: `${(LEVEL[i] / 220) * 100}%`, background: i < reached ? PRODUCTS[i].key : '#2A3142' }} aria-hidden="true" />
          ))}
        </div>
        <ol className="m-0 p-0 list-none grid grid-cols-5">
          {STACK.map((s, i) => (
            <li key={i} className="pt-6 pr-6 border-l border-[rgba(169,184,208,0.12)] pl-4 transition-opacity duration-500" style={{ opacity: i < reached ? 1 : 0.28 }}>
              <div className="t-condensed text-[44px] leading-none font-light text-[#ECEEF1] tabular-nums">{s.t}</div>
              <div className="mt-3 flex items-baseline gap-2"><span className="cs-meta text-[#ECEEF1]">{s.who}</span><span className="cs-meta text-[#8B95A5]">{s.state}</span></div>
              <p className="m-0 mt-2 text-[14px] leading-relaxed text-[#A9B8D0]">{s.what}</p>
            </li>
          ))}
        </ol>
      </div>

      {/* mobile: the same record, read top to bottom */}
      <ol className="md:hidden m-0 p-0 list-none border-l border-[rgba(169,184,208,0.2)]">
        {STACK.map((s, i) => (
          <li key={i} className="relative pl-6 pb-8">
            <span className="absolute -left-[4.5px] top-3 w-2 h-2" style={{ background: PRODUCTS[i].key }} aria-hidden="true" />
            <div className="t-condensed text-[36px] leading-none font-light">{s.t}</div>
            <div className="mt-2 flex items-baseline gap-2"><span className="cs-meta">{s.who}</span><span className="cs-meta text-[#8B95A5]">{s.state}</span></div>
            <p className="m-0 mt-2 text-[15px] leading-relaxed text-[#A9B8D0]">{s.what}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
