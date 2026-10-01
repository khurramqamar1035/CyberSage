import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Figure 1: how signals move through the platform. Dots are events in transit.
// Desktop gets the full architecture drawing; small screens get a vertical flow.

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const on = (e) => setReduced(e.matches);
    mq.addEventListener ? mq.addEventListener('change', on) : mq.addListener(on);
    return () => (mq.removeEventListener ? mq.removeEventListener('change', on) : mq.removeListener(on));
  }, []);
  return reduced;
}

const SOURCES = ['Endpoints', 'Cloud', 'Identity', 'Email', 'Network'];
const SRC_Y = [40, 92, 144, 196, 248];

// [path, packet colour, duration s, label, label x, label y]
const FLOWS = SRC_Y.map((y, i) => [`M132 ${y + 18} C 182 ${y + 18}, 186 156, 232 156`, '#5F6676', 2.6 + i * 0.35]);
const LINKS = {
  down: 'M318 216 L318 296',
  up: 'M346 296 L346 216',
  nexusIn: 'M548 92 C 492 92, 484 128, 432 128',
  eduIn: 'M548 182 C 492 182, 484 176, 432 176',
  toVault: 'M432 204 C 486 204, 488 352, 548 352',
  toNexus: 'M432 316 C 500 316, 488 104, 548 104',
};

function Box({ x, y, w, h, title, sub, dark, blue, to }) {
  const fill = blue ? '#2563EB' : dark ? '#0C1324' : '#FFFFFF';
  const tc = blue || dark ? '#FFFFFF' : '#0C1324';
  const sc = blue ? '#DBE5FF' : dark ? '#AEB6C8' : '#5F6676';
  const inner = (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="3" fill={fill} stroke={blue || dark ? fill : '#C5CBD6'} />
      <text x={x + 14} y={y + (sub ? 24 : h / 2 + 5)} fill={tc} fontSize="14" fontWeight="600" fontFamily="IBM Plex Sans, sans-serif">{title}</text>
      {sub && <text x={x + 14} y={y + 42} fill={sc} fontSize="12" fontFamily="IBM Plex Sans, sans-serif">{sub}</text>}
    </g>
  );
  return to ? <Link to={to} aria-label={title}>{inner}</Link> : inner;
}

function Desktop({ animate }) {
  const line = { fill: 'none', stroke: '#C5CBD6', strokeWidth: 1.25 };
  const packet = (d, color, dur, delay = 0) => animate && (
    <circle r="3" fill={color}>
      <animateMotion dur={`${dur}s`} begin={`${delay}s`} repeatCount="indefinite" path={d} />
    </circle>
  );
  return (
    <svg viewBox="0 0 680 420" className="w-full h-auto" role="img"
      aria-label="Architecture: endpoints, cloud, identity, email and network events flow into Sage Sentinel. Sentinel sends signals to Sage Brain and Brain returns decisions. Nexus and Sage Education send activity to Sentinel. Sentinel turns incidents into Sage Vault scenarios and Brain sends summaries to Nexus.">
      <defs>
        <marker id="cs-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="#8B92A1" /></marker>
      </defs>
      <text x="0" y="24" fill="#5F6676" fontSize="12" fontFamily="IBM Plex Sans, sans-serif">Your estate</text>
      <text x="548" y="24" fill="#5F6676" fontSize="12" fontFamily="IBM Plex Sans, sans-serif">Platforms</text>

      {FLOWS.map(([d], i) => <path key={i} d={d} {...line} markerEnd="url(#cs-arrow)" />)}
      <path d={LINKS.down} {...line} markerEnd="url(#cs-arrow)" />
      <path d={LINKS.up} {...line} markerEnd="url(#cs-arrow)" />
      <path d={LINKS.nexusIn} {...line} markerEnd="url(#cs-arrow)" />
      <path d={LINKS.eduIn} {...line} markerEnd="url(#cs-arrow)" />
      <path d={LINKS.toVault} {...line} markerEnd="url(#cs-arrow)" strokeDasharray="4 4" />
      <path d={LINKS.toNexus} {...line} markerEnd="url(#cs-arrow)" strokeDasharray="4 4" />

      <text x="292" y="262" fill="#5F6676" fontSize="11" textAnchor="end" fontFamily="IBM Plex Sans, sans-serif">signals</text>
      <text x="372" y="262" fill="#5F6676" fontSize="11" fontFamily="IBM Plex Sans, sans-serif">decisions</text>
      <text x="548" y="318" fill="#5F6676" fontSize="11" fontFamily="IBM Plex Sans, sans-serif">incidents become labs</text>

      {SOURCES.map((s, i) => (
        <g key={s}>
          <rect x="0" y={SRC_Y[i]} width="132" height="36" rx="3" fill="#FFFFFF" stroke="#DCE0E7" />
          <text x="12" y={SRC_Y[i] + 23} fill="#3E4555" fontSize="13" fontFamily="IBM Plex Sans, sans-serif">{s}</text>
        </g>
      ))}

      <Box x={232} y={96} w={200} h={120} title="Sage Sentinel" sub="SIEM, XDR and SOAR" dark to="/products/sentinel" />
      <text x="246" y="170" fill="#AEB6C8" fontSize="11" fontFamily="IBM Plex Mono, monospace">detect</text>
      <text x="300" y="170" fill="#AEB6C8" fontSize="11" fontFamily="IBM Plex Mono, monospace">investigate</text>
      <text x="246" y="194" fill="#AEB6C8" fontSize="11" fontFamily="IBM Plex Mono, monospace">respond</text>
      <circle cx="414" cy="114" r="3.5" fill="#44D8F1" className="cs-live" />

      <Box x={232} y={296} w={200} h={72} title="Sage Brain" sub="Context and decisions" blue to="/products/brain" />

      <Box x={548} y={68} w={132} h={52} title="Nexus" sub="Workspace" to="/products/nexus" />
      <Box x={548} y={158} w={132} h={52} title="Sage Education" sub="Institutions" to="/products/education" />
      <Box x={548} y={328} w={132} h={52} title="Sage Vault" sub="Skills" to="/products/vault" />

      {FLOWS.map(([d, , dur], i) => <React.Fragment key={`p${i}`}>{packet(d, '#2563EB', dur, i * 0.4)}</React.Fragment>)}
      {packet(LINKS.down, '#2563EB', 1.8)}
      {packet(LINKS.up, '#0C1324', 1.8, 0.9)}
      {packet(LINKS.nexusIn, '#2563EB', 2.8, 0.5)}
      {packet(LINKS.eduIn, '#0E9AB0', 3.2, 1.2)}
      {packet(LINKS.toVault, '#B76E00', 4.2, 1.6)}
      {packet(LINKS.toNexus, '#0C1324', 4.6, 2.2)}
    </svg>
  );
}

function Mobile() {
  const Step = ({ title, sub, tone = 'light', to }) => {
    const cls = tone === 'dark' ? 'bg-[#0C1324] text-white' : tone === 'blue' ? 'bg-[#2563EB] text-white' : 'bg-white border border-[#DCE0E7] text-[#0C1324]';
    const subCls = tone === 'light' ? 'text-[#5F6676]' : 'text-[#C9D2E6]';
    return (
      <Link to={to} className={`block rounded-[3px] px-4 py-3 ${cls}`}>
        <span className="block text-[15px] font-semibold">{title}</span>
        <span className={`block text-[13px] ${subCls}`}>{sub}</span>
      </Link>
    );
  };
  const Arrow = ({ label }) => (
    <div className="flex items-center gap-3 py-2 pl-4 text-[12px] text-[#5F6676]"><span className="h-5 w-px bg-[#C5CBD6]" />{label}</div>
  );
  return (
    <div>
      <div className="rounded-[3px] border border-dashed border-[#C5CBD6] px-4 py-3 text-[13px] text-[#3E4555]">Your estate: endpoints, cloud, identity, email, network</div>
      <Arrow label="events" />
      <Step title="Sage Sentinel" sub="Detects, investigates and responds" tone="dark" to="/products/sentinel" />
      <Arrow label="signals up, decisions back" />
      <Step title="Sage Brain" sub="Context and decisions" tone="blue" to="/products/brain" />
      <Arrow label="summaries, scenarios, records" />
      <div className="grid grid-cols-3 gap-2">
        <Step title="Nexus" sub="Workspace" to="/products/nexus" />
        <Step title="Education" sub="Institutions" to="/products/education" />
        <Step title="Vault" sub="Skills" to="/products/vault" />
      </div>
    </div>
  );
}

export default function PlatformDiagram() {
  const reduced = useReducedMotion();
  return (
    <figure className="m-0">
      <div className="hidden md:block"><Desktop animate={!reduced} /></div>
      <div className="md:hidden"><Mobile /></div>
      <figcaption className="mt-4 text-[13px] leading-relaxed text-[#5F6676] max-w-[52ch]">
        Figure 1. How signals move through the CyberSage platform.<span className="hidden md:inline"> Solid lines carry live data; dashed lines are outputs Brain and Sentinel hand to other products.</span>
      </figcaption>
    </figure>
  );
}
