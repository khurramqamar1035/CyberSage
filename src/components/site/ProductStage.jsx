import React from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import ProductMark from './ProductMark';

// The technical environment a product interface sits in: a faint schematic that
// changes per product (the CyberSage interaction language), plus a system rail of
// labels that each say something true about what is shown.

function Schematic({ slug }) {
  const s = { fill: 'none', stroke: '#C5CBD6', strokeWidth: 1 };
  const a = { fill: 'none', stroke: '#2563EB', strokeWidth: 1, opacity: 0.55 };
  switch (slug) {
    case 'nexus': // connected workspace: people nodes meshing to hubs
      return (
        <g>
          {[[80, 80], [220, 60], [360, 110], [140, 220], [300, 250], [440, 200], [520, 90]].map(([x, y], i, arr) => (
            <g key={i}>{arr.slice(i + 1, i + 3).map(([x2, y2], j) => <line key={j} x1={x} y1={y} x2={x2} y2={y2} {...s} />)}<circle cx={x} cy={y} r="3" fill="#C5CBD6" /></g>
          ))}
          <circle cx="300" cy="250" r="16" {...a} /><circle cx="300" cy="250" r="3.5" fill="#2563EB" opacity="0.6" />
        </g>
      );
    case 'sentinel': // telemetry traces with an event marker
      return (
        <g>
          {[70, 120, 170, 220, 270].map((y, i) => (
            <path key={y} d={`M0 ${y} ${Array.from({ length: 24 }, (_, k) => `L${k * 26} ${y + ((k * 7 + i * 13) % 11) - 5}`).join(' ')}`} {...(i === 2 ? a : s)} />
          ))}
          <line x1="364" y1="40" x2="364" y2="300" stroke="#C2412D" strokeWidth="1" strokeDasharray="2 4" opacity="0.6" />
          <circle cx="364" cy="170" r="5" fill="none" stroke="#C2412D" opacity="0.7" />
        </g>
      );
    case 'brain': // decision paths: a tree with one route chosen
      return (
        <g>
          {[[60, 160, 200, 90], [60, 160, 200, 230], [200, 90, 360, 50], [200, 90, 360, 130], [200, 230, 360, 200], [200, 230, 360, 280], [360, 200, 520, 170], [360, 200, 520, 240]].map(([x1, y1, x2, y2], i) => (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} {...([1, 4, 6].includes(i) ? a : s)} />
          ))}
          {[[60, 160], [200, 90], [200, 230], [360, 50], [360, 130], [360, 200], [360, 280], [520, 170], [520, 240]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="3" fill={[0, 2, 5, 7].includes(i) ? '#2563EB' : '#C5CBD6'} opacity={[0, 2, 5, 7].includes(i) ? 0.6 : 1} />)}
        </g>
      );
    case 'vault': // isolated lab containers
      return (
        <g>
          {[[40, 50], [180, 50], [320, 50], [460, 50], [40, 180], [180, 180], [320, 180], [460, 180]].map(([x, y], i) => (
            <g key={i}><rect x={x} y={y} width="100" height="90" rx="2" {...(i === 5 ? a : s)} /><rect x={x + 30} y={y + 25} width="40" height="40" rx="1" {...(i === 5 ? a : s)} /></g>
          ))}
        </g>
      );
    case 'education': // institutions on a shared spine
      return (
        <g>
          <line x1="20" y1="230" x2="580" y2="230" {...a} />
          {[60, 170, 280, 390, 500].map((x, i) => (
            <g key={x}><rect x={x - 22} y="80" width="44" height="44" rx="2" {...s} /><line x1={x} y1="124" x2={x} y2="230" {...s} /><circle cx={x} cy="230" r="3" fill={i === 2 ? '#2563EB' : '#C5CBD6'} /></g>
          ))}
        </g>
      );
    default:
      return null;
  }
}

export default function ProductStage({ product, rail = [], caption, children }) {
  const reduce = useReducedMotion();
  return (
    <div className="relative">
      {/* schematic behind the interface */}
      <div className="absolute -inset-x-4 -inset-y-6 md:-inset-x-10 md:-inset-y-10 overflow-hidden pointer-events-none" aria-hidden="true">
        <AnimatePresence mode="wait" initial={false}>
          <motion.svg key={product.slug} viewBox="0 0 600 320" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 w-full h-full"
            initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 0.7 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
            <Schematic slug={product.slug} />
          </motion.svg>
        </AnimatePresence>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.2),rgba(255,255,255,0.92)_75%)]" />
      </div>

      <div className="relative grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_150px] gap-4 xl:gap-6">
        <div className="relative shadow-[0_1px_0_rgba(12,19,36,0.04),0_24px_60px_-28px_rgba(12,19,36,0.35)] rounded-[5px]">{children}</div>
        <dl className="hidden xl:flex flex-col gap-5 m-0 pt-1 border-l border-[#DCE0E7] pl-4">
          <div className="flex items-center gap-2 text-[#0C1324]"><ProductMark slug={product.slug} size={22} accent="#2563EB" /></div>
          {rail.map(([k, v]) => (
            <div key={k}><dt className="cs-meta text-[#5F6676]">{k}</dt><dd className="m-0 mt-1 cs-meta text-[#0C1324]">{v}</dd></div>
          ))}
        </dl>
      </div>
      {caption && (
        <p className="relative m-0 mt-5 flex flex-wrap gap-x-5 gap-y-1 items-baseline">
          <span className="cs-meta text-[#5F6676]">Simulated interface</span>
          <span className="text-[13px] leading-relaxed text-[#5F6676]">{caption}</span>
        </p>
      )}
    </div>
  );
}
