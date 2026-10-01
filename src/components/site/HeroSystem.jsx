import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useReducedMotion } from 'framer-motion';
import ProductMark from './ProductMark';

// Hero system map: the CyberSage platform as nodes and links on a dark technical canvas.
// Pulses travel only along the main data paths. Nodes respond when the cursor comes near.

const NODES = {
  nexus: { x: 128, y: 96, label: 'Nexus', role: 'Workspace', to: '/products/nexus' },
  education: { x: 432, y: 96, label: 'Sage Education', role: 'Institutions', to: '/products/education' },
  sentinel: { x: 280, y: 214, label: 'Sentinel', role: 'Security ops', to: '/products/sentinel' },
  brain: { x: 280, y: 344, label: 'Brain', role: 'Intelligence', to: '/products/brain' },
  vault: { x: 448, y: 420, label: 'Vault', role: 'Skills', to: '/products/vault' },
  decision: { x: 280, y: 458, label: 'Decision', role: 'Approved by a person' },
};

// [from, to, path, kind]  kind: main = carries pulses, out = dashed hand-off
const LINKS = [
  ['nexus', 'sentinel', 'M128 96 C 128 160, 230 170, 270 206', 'main'],
  ['education', 'sentinel', 'M432 96 C 432 160, 330 170, 290 206', 'main'],
  ['sentinel', 'brain', 'M280 226 L280 332', 'main'],
  ['brain', 'decision', 'M280 356 L280 446', 'main'],
  ['brain', 'vault', 'M292 350 C 360 370, 400 392, 438 414', 'out'],
  ['sentinel', 'vault', 'M292 220 C 420 250, 452 330, 450 406', 'out'],
  ['brain', 'nexus', 'M268 340 C 150 320, 120 200, 126 110', 'out'],
];
const SOURCES = [150, 176, 202, 228, 254];

function useNearest(svgRef) {
  const [near, setNear] = useState(null);
  const raf = useRef(0);
  const onMove = useCallback((e) => {
    const svg = svgRef.current; if (!svg) return;
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      const pt = svg.createSVGPoint(); pt.x = e.clientX; pt.y = e.clientY;
      const p = pt.matrixTransform(svg.getScreenCTM().inverse());
      let best = null; let bd = 72;
      Object.entries(NODES).forEach(([k, n]) => { const d = Math.hypot(n.x - p.x, n.y - p.y); if (d < bd) { bd = d; best = k; } });
      setNear(best);
    });
  }, [svgRef]);
  return [near, onMove, () => setNear(null)];
}

function Desktop() {
  const svgRef = useRef(null);
  const reduce = useReducedMotion();
  const [near, onMove, onLeave] = useNearest(svgRef);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const el = svgRef.current; if (!el) return undefined;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    io.observe(el); return () => io.disconnect();
  }, []);
  const animate = !reduce && visible;
  const lit = (a, b) => near && (near === a || near === b);

  return (
    <svg ref={svgRef} viewBox="0 0 560 520" className="w-full h-auto block" onMouseMove={onMove} onMouseLeave={onLeave}
      role="img" aria-label="CyberSage system map. Nexus and Sage Education feed Sentinel. Sentinel feeds Brain. Brain produces a decision that a person approves, sends training to Vault and summaries back to Nexus.">
      <defs>
        <radialGradient id="hs-glow" cx="50%" cy="50%" r="50%"><stop offset="0" stopColor="#2563EB" stopOpacity="0.28" /><stop offset="1" stopColor="#2563EB" stopOpacity="0" /></radialGradient>
      </defs>

      {/* estate sources feeding Sentinel */}
      {SOURCES.map((y, i) => (
        <g key={y}>
          <path d={`M24 ${y} C 120 ${y}, 200 214, 266 214`} fill="none" stroke="#1E2A44" strokeWidth="1" />
          <circle cx="24" cy={y} r="2" fill="#3A4A6B" />
          {animate && <circle r="1.6" fill="#7FA2FF"><animateMotion dur={`${3.4 + i * 0.45}s`} begin={`${i * 0.6}s`} repeatCount="indefinite" path={`M24 ${y} C 120 ${y}, 200 214, 266 214`} /></circle>}
        </g>
      ))}
      <text x="24" y="282" className="cs-mono" fill="#5D6B88" fontSize="9.5" letterSpacing="0.8">ESTATE / 05 SOURCES</text>

      {LINKS.map(([a, b, d, kind]) => (
        <path key={`${a}-${b}`} d={d} fill="none" stroke={lit(a, b) ? '#7FA2FF' : kind === 'main' ? '#33415F' : '#26314A'}
          strokeWidth={lit(a, b) ? 1.4 : 1} strokeDasharray={kind === 'out' ? '3 5' : undefined} style={{ transition: 'stroke 200ms ease' }} />
      ))}
      {animate && LINKS.filter((l) => l[3] === 'main').map(([a, b, d], i) => (
        <circle key={`p-${a}-${b}`} r="2.2" fill={b === 'decision' ? '#44D8F1' : '#B4C5FF'}>
          <animateMotion dur={`${2.6 + i * 0.4}s`} begin={`${i * 0.7}s`} repeatCount="indefinite" path={d} />
        </circle>
      ))}

      {Object.entries(NODES).map(([k, n]) => {
        const on = near === k;
        const isDecision = k === 'decision';
        const body = (
          <g style={{ cursor: n.to ? 'pointer' : 'default' }}>
            {k === 'brain' && <circle cx={n.x} cy={n.y} r="60" fill="url(#hs-glow)" />}
            <circle cx={n.x} cy={n.y} r={on ? 22 : 16} fill="none" stroke={on ? '#7FA2FF' : '#26314A'} style={{ transition: 'r 220ms cubic-bezier(0.23,1,0.32,1), stroke 200ms ease' }} />
            {isDecision
              ? <rect x={n.x - 6} y={n.y - 6} width="12" height="12" transform={`rotate(45 ${n.x} ${n.y})`} fill="#0A0F1C" stroke="#44D8F1" strokeWidth="1.4" />
              : <circle cx={n.x} cy={n.y} r={k === 'brain' ? 7 : 5} fill={k === 'brain' ? '#2563EB' : on ? '#DCE1FB' : '#8E9CBA'} style={{ transition: 'fill 200ms ease' }} />}
            {k === 'sentinel' && animate && <circle cx={n.x} cy={n.y} r="5" fill="none" stroke="#44D8F1" className="cs-ping" />}
            <text x={n.x + ((k === 'vault' || k === 'education') ? -30 : 26)} y={n.y - 3} textAnchor={(k === 'vault' || k === 'education') ? 'end' : 'start'} className="cs-mono" fill={on ? '#FFFFFF' : '#C9D2E6'} fontSize="11" letterSpacing="1" style={{ transition: 'fill 200ms ease' }}>{n.label.toUpperCase()}</text>
            <text x={n.x + ((k === 'vault' || k === 'education') ? -30 : 26)} y={n.y + 11} textAnchor={(k === 'vault' || k === 'education') ? 'end' : 'start'} fill="#6F7C98" fontSize="10.5" fontFamily="Geist, sans-serif">{n.role}</text>
          </g>
        );
        return n.to ? <Link key={k} to={n.to} aria-label={`${n.label}: ${n.role}`}>{body}</Link> : <g key={k}>{body}</g>;
      })}
    </svg>
  );
}

function Mobile() {
  const Row = ({ k, children }) => {
    const n = NODES[k];
    return (
      <Link to={n.to} className="flex items-center gap-3 py-3 border-b border-[#1E2638]">
        <ProductMark slug={k} size={22} color="#C9D2E6" accent="#7FA2FF" />
        <span className="cs-meta text-[#DCE1FB]">{n.label}</span>
        <span className="ml-auto text-[12px] text-[#8D96AA]">{children || n.role}</span>
      </Link>
    );
  };
  return (
    <div className="p-4">
      <Row k="nexus" /><Row k="education" />
      <div className="cs-meta text-[#5D6B88] py-2">↓ activity and telemetry</div>
      <Row k="sentinel" />
      <div className="cs-meta text-[#5D6B88] py-2">↓ signals</div>
      <Row k="brain">Proposes decisions</Row>
      <Row k="vault">Trains on real incidents</Row>
    </div>
  );
}

export default function HeroSystem() {
  return (
    <figure className="m-0 relative rounded-[6px] overflow-hidden border border-[#1A2236] cs-char shadow-[0_30px_80px_-30px_rgba(12,19,36,0.55),0_1px_0_rgba(255,255,255,0.04)_inset]">
      <div className="flex items-center justify-between px-4 h-9 border-b border-[#1A2236]">
        <span className="cs-meta text-[#8D96AA]">System map / CyberSage platform</span>
        <span className="cs-meta text-[#8D96AA] flex items-center gap-2"><span className="cs-live w-1.5 h-1.5 rounded-full bg-[#44D8F1]" />Simulation</span>
      </div>
      <div className="hidden md:block px-2 pt-2"><Desktop /></div>
      <div className="md:hidden"><Mobile /></div>
      <figcaption className="flex items-center justify-between px-4 h-9 border-t border-[#1A2236]">
        <span className="cs-meta text-[#5D6B88]">06 nodes / 07 links</span>
        <span className="cs-meta text-[#5D6B88] hidden sm:inline">Point at a node to trace its connections</span>
      </figcaption>
    </figure>
  );
}
