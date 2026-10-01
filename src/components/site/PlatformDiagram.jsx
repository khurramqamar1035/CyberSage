import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

// Signature architecture drawing for the dark "One intelligence layer" section.
// Lines draw themselves once in view; pulses then run along live data paths.
// `focus` (a product slug) lights that product's node and its connections.

const F = 'Geist, sans-serif';
const M = 'Geist Mono, monospace';

const SRC = ['Endpoints', 'Cloud', 'Identity', 'Email', 'Network'];
const SRC_Y = [70, 120, 170, 220, 270];

const P = {
  src: SRC_Y.map((y) => `M150 ${y + 16} C 210 ${y + 16}, 214 196, 262 196`),
  nexusIn: 'M640 104 C 580 104, 560 160, 482 168',
  eduIn: 'M640 214 C 580 214, 560 206, 482 204',
  down: 'M356 252 L356 330',
  up: 'M388 330 L388 252',
  toDecision: 'M372 418 L372 470',
  toVault: 'M482 236 C 560 250, 570 380, 640 384',
  toNexus: 'M482 374 C 600 374, 560 136, 640 136',
};

// which product each path belongs to (for highlighting)
const OWNER = {
  nexus: ['nexusIn', 'toNexus'], education: ['eduIn'], vault: ['toVault'],
  sentinel: ['src', 'down', 'up', 'toVault'], brain: ['down', 'up', 'toDecision', 'toNexus'],
};

function Path({ d, on, dashed, drawn, delay = 0, reduce }) {
  return (
    <motion.path d={d} fill="none" stroke={on ? '#7FA2FF' : '#2E3A57'} strokeWidth={on ? 1.5 : 1.1}
      strokeDasharray={dashed ? '4 5' : undefined} markerEnd="url(#pd-arrow)"
      initial={reduce || dashed ? false : { pathLength: 0 }} animate={drawn ? { pathLength: 1 } : undefined}
      transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1], delay }} style={{ transition: 'stroke 200ms ease' }} />
  );
}

function Node({ x, y, w, h, title, sub, tone, on }) {
  const fill = tone === 'blue' ? '#2563EB' : tone === 'core' ? '#121A2E' : '#0E1526';
  const stroke = on ? '#7FA2FF' : tone === 'blue' ? '#2563EB' : '#2A3654';
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="3" fill={fill} stroke={stroke} style={{ transition: 'stroke 200ms ease' }} />
      <text x={x + 14} y={y + 22} fill="#FFFFFF" fontSize="13" fontFamily={M} letterSpacing="1">{title.toUpperCase()}</text>
      {sub && <text x={x + 14} y={y + 40} fill={tone === 'blue' ? '#DBE5FF' : '#8D96AA'} fontSize="12" fontFamily={F}>{sub}</text>}
    </g>
  );
}

export default function PlatformDiagram({ focus = null }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' });
  const reduce = useReducedMotion();
  const [drawn, setDrawn] = useState(false);
  const [running, setRunning] = useState(false);
  useEffect(() => { if (inView) { setDrawn(true); const t = setTimeout(() => setRunning(true), 1300); return () => clearTimeout(t); } return undefined; }, [inView]);
  const pulses = running && !reduce;
  const lit = (key) => !!focus && (OWNER[focus] || []).includes(key);
  const pulse = (d, color, dur, begin = 0) => pulses && (
    <circle r="2.6" fill={color}><animateMotion dur={`${dur}s`} begin={`${begin}s`} repeatCount="indefinite" path={d} /></circle>
  );

  return (
    <figure className="m-0" ref={ref}>
      <svg viewBox="0 0 780 500" className="w-full h-auto" role="img"
        aria-label="Architecture. Events from endpoints, cloud, identity, email and network flow into Sage Sentinel. Nexus and Sage Education also send activity to Sentinel. Sentinel sends signals to Sage Brain, which returns decisions and produces actions for a person to approve. Brain sends summaries to Nexus and Sentinel turns incidents into Sage Vault labs.">
        <defs>
          <marker id="pd-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="#4A5878" /></marker>
        </defs>

        <text x="0" y="44" fill="#5D6B88" fontSize="10.5" fontFamily={M} letterSpacing="1">YOUR ESTATE</text>
        <text x="640" y="72" fill="#5D6B88" fontSize="10.5" fontFamily={M} letterSpacing="1">PLATFORMS</text>

        {P.src.map((d, i) => <Path key={i} d={d} on={lit('src')} drawn={drawn} delay={i * 0.06} reduce={reduce} />)}
        <Path d={P.nexusIn} on={lit('nexusIn')} drawn={drawn} delay={0.3} reduce={reduce} />
        <Path d={P.eduIn} on={lit('eduIn')} drawn={drawn} delay={0.35} reduce={reduce} />
        <Path d={P.down} on={lit('down')} drawn={drawn} delay={0.5} reduce={reduce} />
        <Path d={P.up} on={lit('up')} drawn={drawn} delay={0.55} reduce={reduce} />
        <Path d={P.toDecision} on={lit('toDecision')} drawn={drawn} delay={0.7} reduce={reduce} />
        <Path d={P.toVault} on={lit('toVault')} dashed drawn={drawn} reduce={reduce} />
        <Path d={P.toNexus} on={lit('toNexus')} dashed drawn={drawn} reduce={reduce} />

        <text x="340" y="296" fill="#6F7C98" fontSize="10.5" fontFamily={M} textAnchor="end" letterSpacing="0.6">SIGNALS</text>
        <text x="404" y="296" fill="#6F7C98" fontSize="10.5" fontFamily={M} letterSpacing="0.6">DECISIONS</text>
        <text x="640" y="350" fill="#6F7C98" fontSize="10.5" fontFamily={M} letterSpacing="0.6">INCIDENTS → LABS</text>

        {SRC.map((s, i) => (
          <g key={s}>
            <rect x="0" y={SRC_Y[i]} width="150" height="32" rx="3" fill="#0E1526" stroke={lit('src') ? '#3D5A8A' : '#1E2840'} />
            <text x="14" y={SRC_Y[i] + 20.5} fill="#AEB6C8" fontSize="12.5" fontFamily={F}>{s}</text>
          </g>
        ))}

        <Node x={262} y={140} w={220} h={112} title="Sage Sentinel" sub="SIEM · XDR · SOAR" tone="core" on={focus === 'sentinel'} />
        <text x="276" y="212" fill="#6F7C98" fontSize="10.5" fontFamily={M}>detect → investigate</text>
        <text x="276" y="232" fill="#6F7C98" fontSize="10.5" fontFamily={M}>→ respond</text>
        {pulses && <circle cx="464" cy="158" r="3" fill="#44D8F1" className="cs-live" />}

        <Node x={262} y={330} w={220} h={88} title="Sage Brain" sub="Context and decisions" tone="blue" on={focus === 'brain'} />

        <g>
          <rect x="316" y="470" width="112" height="28" rx="3" fill="#0A0F1C" stroke={lit('toDecision') ? '#44D8F1' : '#2A3654'} />
          <text x="372" y="488" fill="#44D8F1" fontSize="10.5" fontFamily={M} textAnchor="middle" letterSpacing="1">DECISION</text>
        </g>
        <text x="440" y="488" fill="#6F7C98" fontSize="11" fontFamily={F}>approved by a person</text>

        <Node x={640} y={84} w={140} h={56} title="Nexus" sub="Workspace" on={focus === 'nexus'} />
        <Node x={640} y={186} w={140} h={56} title="Education" sub="Institutions" on={focus === 'education'} />
        <Node x={640} y={360} w={140} h={56} title="Vault" sub="Skills" on={focus === 'vault'} />

        {P.src.map((d, i) => <React.Fragment key={`ps${i}`}>{pulse(d, '#7FA2FF', 3 + i * 0.4, i * 0.5)}</React.Fragment>)}
        {pulse(P.nexusIn, '#B4C5FF', 3.2, 0.4)}
        {pulse(P.eduIn, '#44D8F1', 3.6, 1.1)}
        {pulse(P.down, '#B4C5FF', 1.8)}
        {pulse(P.up, '#FFFFFF', 1.8, 0.9)}
        {pulse(P.toDecision, '#44D8F1', 2.2, 0.4)}
        {pulse(P.toVault, '#FFB95F', 4.6, 1.6)}
        {pulse(P.toNexus, '#B4C5FF', 5, 2.4)}
      </svg>
      <figcaption className="mt-4 flex flex-wrap gap-x-6 gap-y-1">
        <span className="cs-meta text-[#5D6B88]">Fig. 02 / Platform architecture</span>
        <span className="text-[13px] text-[#8D96AA]">Solid lines carry live data. Dashed lines are hand-offs to other products.</span>
      </figcaption>
    </figure>
  );
}
