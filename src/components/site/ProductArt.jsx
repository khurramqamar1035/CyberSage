import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

/*
  Product art: one ad-style composition per product, drawn in that product's own
  design language (its logo, palette, type and interface shapes), the way a launch
  poster shows the design rather than the data. Interface fragments use neutral
  placeholder lines only: no names, addresses, hosts, figures or customer data.
*/

const EASE = [0.23, 1, 0.32, 1];
const W = 1200;
const H = 750;

const FONT = {
  jakarta: "'Plus Jakarta Sans', system-ui, sans-serif",
  serif: "'Instrument Serif', Georgia, serif",
  mono: "'IBM Plex Mono', ui-monospace, monospace",
  archivo: "'Archivo', system-ui, sans-serif",
  zilla: "'Zilla Slab', Georgia, serif",
  hanken: "'Hanken Grotesk', system-ui, sans-serif",
};

/* Renders a fixed 1200×750 composition scaled to the container width, so the art
   keeps its proportions from phone to desktop. */
function Stage({ children, label, bg }) {
  const box = useRef(null);
  const [s, setS] = useState(1);
  useLayoutEffect(() => {
    const el = box.current;
    if (!el) return undefined;
    // On narrow screens the art stops shrinking at half size and is cropped on the right instead
    const set = () => setS(Math.max(el.clientWidth / W, 0.5));
    set();
    const ro = new ResizeObserver(set);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return (
    <div ref={box} role="img" aria-label={label} className="relative w-full overflow-hidden select-none" style={{ height: H * s, background: bg }}>
      <div className="absolute left-0 top-0 origin-top-left" style={{ width: W, height: H, transform: `scale(${s})` }}>{children}</div>
    </div>
  );
}

// Steps through states while on screen. Reduced motion holds the final, complete state.
function useSteps(ref, count, ms, still) {
  const inView = useInView(ref, { margin: '-15% 0px' });
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (!inView || reduce) return undefined;
    const t = setInterval(() => setStep((n) => (n + 1) % count), ms);
    return () => clearInterval(t);
  }, [inView, reduce, count, ms]);
  return reduce ? still : step;
}

const Bar = ({ w, h = 8, c, r = 4, style }) => <span style={{ display: 'block', width: w, height: h, background: c, borderRadius: r, ...style }} />;
const Grain = ({ opacity = 0.35 }) => (
  <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity, mixBlendMode: 'multiply', backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 .08 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")" }} />
);

/* ═════════════ NEXUS — Atrium: floating panels on a warm canvas, indigo accent ═════════════ */
const IC = {
  mail: 'M4 6h16v12H4z M4 7l8 6 8-6',
  chat: 'M5 5h14v10H9l-4 4z',
  doc: 'M7 3h7l4 4v14H7z M14 3v4h4',
  cal: 'M5 6h14v13H5z M5 10h14 M9 4v4 M15 4v4',
  meet: 'M4 7h11v10H4z M15 10l5-3v10l-5-3',
  shield: 'M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6z',
  spark: 'M12 4v4 M12 16v4 M4 12h4 M16 12h4 M7 7l2 2 M15 15l2 2 M17 7l-2 2 M9 15l-2 2',
};
const Icon = ({ d, c = '#6b6a65', size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d} /></svg>
);
const Chip = ({ children, tone = 'neutral', on = true }) => {
  const t = { ok: ['#e7f4ef', '#0e7c5a'], accent: ['#eeecff', '#3730a3'], neutral: ['#f5f4f1', '#6b6a65'] }[tone];
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 26, padding: '0 10px', borderRadius: 999, background: on ? t[0] : '#f5f4f1', color: on ? t[1] : '#8e8d87', border: '1px solid #e7e6e1', fontSize: 12.5, fontWeight: 600, transition: 'background-color 300ms, color 300ms' }}>{children}</span>
  );
};
const Tick = ({ on }) => (
  <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" style={{ opacity: on ? 1 : 0.25, transition: 'opacity 300ms' }}><path d="M2.5 6.2l2.2 2.2 4.8-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
);
const panel = { position: 'absolute', background: '#fff', borderRadius: 16, border: '1px solid #e7e6e1', boxShadow: '0 2px 4px rgba(26,26,24,.06), 0 24px 56px -24px rgba(26,26,24,.32)' };

export function NexusArt() {
  const ref = useRef(null);
  const step = useSteps(ref, 7, 1300, 6); // 0..3 checks verify, 4 message, 5 answer, 6 hold
  const verified = Math.min(step, 3);
  return (
    <div ref={ref}>
      <Stage bg="#f0efec" label="Nexus product art: the Nexus mark beside floating workspace panels for mail, channels and Ask Sage. Sender checks verify one by one.">
        <Grain />
        <div style={{ position: 'absolute', left: 56, right: 56, top: 40, display: 'flex', justifyContent: 'space-between', fontFamily: FONT.mono, fontSize: 13, letterSpacing: '.08em', color: '#6b6a65', borderBottom: '1px solid #dcdbd6', paddingBottom: 16 }}>
          <span>NEXUS <span style={{ color: '#b5b4ae' }}>/</span> <span style={{ color: '#8e8d87' }}>WORKSPACE</span></span>
          <span>NEXUS.CYBERSAGE.UK</span>
        </div>

        <div style={{ position: 'absolute', left: 56, top: 140, width: 470 }}>
          <img src="/brand/products/nexus-mark.png" alt="" width="84" height="84" style={{ display: 'block' }} />
          <div style={{ marginTop: 40, fontFamily: FONT.jakarta, fontWeight: 800, fontSize: 76, lineHeight: 0.98, letterSpacing: '-0.045em', color: '#1a1a18' }}>
            One secure
            <div style={{ fontFamily: FONT.serif, fontStyle: 'italic', fontWeight: 400, fontSize: 92, letterSpacing: '-0.02em', color: '#4f46e5', marginTop: 2 }}>workspace.</div>
          </div>
          <p style={{ margin: '26px 0 0', fontFamily: FONT.jakarta, fontSize: 22, lineHeight: 1.4, color: '#6b6a65', maxWidth: 400 }}>Mail, chat, docs, meetings and AI, secured by people who do security for a living.</p>
        </div>

        {/* app spine */}
        <div style={{ ...panel, left: 590, top: 128, width: 58, padding: '10px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          {['mail', 'chat', 'doc', 'cal', 'meet', 'shield', 'spark'].map((k, i) => {
            const active = (step === 4 && k === 'chat') || (step >= 5 && k === 'spark') || (step < 4 && k === 'mail');
            return (
              <span key={k} style={{ width: 38, height: 38, borderRadius: 11, display: 'grid', placeItems: 'center', background: active ? '#eeecff' : 'transparent', transition: 'background-color 300ms' }}>
                <Icon d={IC[k]} c={active ? '#4f46e5' : '#8e8d87'} />
              </span>
            );
          })}
        </div>

        {/* mail panel */}
        <div style={{ ...panel, left: 668, top: 128, width: 560, height: 300, padding: 26 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span style={{ width: 40, height: 40, borderRadius: 999, background: '#f2f1ee', border: '1px solid #e7e6e1' }} />
            <div style={{ display: 'grid', gap: 8 }}><Bar w={160} h={10} c="#1a1a18" /><Bar w={220} h={8} c="#e7e6e1" /></div>
            <span style={{ marginLeft: 'auto' }}><Chip tone={verified >= 3 ? 'ok' : 'neutral'} on>{verified >= 3 ? 'Verified sender' : 'Checking sender'}</Chip></span>
          </div>
          <div style={{ marginTop: 22, display: 'flex', alignItems: 'center', gap: 8, padding: '12px 14px', background: '#f5f4f1', border: '1px solid #e7e6e1', borderRadius: 12 }}>
            <span style={{ fontFamily: FONT.jakarta, fontSize: 13.5, fontWeight: 600, color: '#1a1a18', marginRight: 6 }}>Authentication</span>
            {['SPF', 'DKIM', 'DMARC'].map((k, i) => <Chip key={k} tone="ok" on={verified > i}><Tick on={verified > i} />{k}</Chip>)}
          </div>
          <div style={{ marginTop: 22, display: 'grid', gap: 10 }}>
            <Bar w="92%" h={9} c="#e7e6e1" /><Bar w="84%" h={9} c="#e7e6e1" /><Bar w="58%" h={9} c="#e7e6e1" />
          </div>
          <div style={{ marginTop: 22, display: 'flex', alignItems: 'center', gap: 12, width: 250, padding: '10px 12px', border: '1px solid #e7e6e1', borderRadius: 12 }}>
            <span style={{ width: 30, height: 34, borderRadius: 6, background: '#fbeceb', color: '#c0362c', fontFamily: FONT.jakarta, fontSize: 9, fontWeight: 800, display: 'grid', placeItems: 'center' }}>PDF</span>
            <Bar w={90} h={8} c="#d9d8d2" />
            <span style={{ marginLeft: 'auto' }}><Chip tone="ok">Scanned</Chip></span>
          </div>
        </div>

        {/* Connect channel */}
        <motion.div style={{ ...panel, left: 640, top: 452, width: 330, padding: 22 }} animate={{ y: step === 4 ? -6 : 0 }} transition={{ duration: 0.5, ease: EASE }}>
          <div style={{ fontFamily: FONT.jakarta, fontWeight: 700, fontSize: 15, color: '#1a1a18' }}><span style={{ color: '#8e8d87' }}>#</span> channel</div>
          <div style={{ marginTop: 16, display: 'grid', gap: 14 }}>
            {[0, 1].map((i) => (
              <div key={i} style={{ display: 'flex', gap: 10 }}>
                <span style={{ width: 26, height: 26, borderRadius: 999, background: '#f2f1ee', border: '1px solid #e7e6e1', flex: 'none' }} />
                <div style={{ display: 'grid', gap: 7, flex: 1 }}><Bar w="40%" h={8} c="#1a1a18" style={{ opacity: 0.75 }} /><Bar w={i ? '70%' : '90%'} h={8} c="#e7e6e1" /></div>
              </div>
            ))}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, opacity: step >= 4 ? 1 : 0.35, transition: 'opacity 300ms' }}>
              <Chip tone="accent">@Sage</Chip>
              <span style={{ display: 'flex', gap: 4 }}>{[0, 1, 2].map((d) => <span key={d} className="cs-live" style={{ width: 5, height: 5, borderRadius: 9, background: '#8e8d87', animationDelay: `${d * 0.2}s` }} />)}</span>
            </div>
          </div>
        </motion.div>

        {/* Ask Sage */}
        <div style={{ ...panel, left: 994, top: 452, width: 260, padding: 22, opacity: step >= 5 ? 1 : 0.55, transition: 'opacity 400ms' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: FONT.jakarta, fontWeight: 700, fontSize: 15, color: '#1a1a18' }}><Icon d={IC.spark} c="#4f46e5" />Ask Sage</div>
          <div style={{ marginTop: 16, display: 'grid', gap: 9 }}><Bar w="96%" h={8} c="#eeecff" /><Bar w="88%" h={8} c="#eeecff" /><Bar w="60%" h={8} c="#eeecff" /></div>
          <div style={{ marginTop: 16, display: 'flex', gap: 6 }}><Chip>Source</Chip><Chip>Source</Chip></div>
        </div>

        <div style={{ position: 'absolute', left: 56, right: 56, bottom: 36, display: 'flex', justifyContent: 'space-between', fontFamily: FONT.mono, fontSize: 13, letterSpacing: '.08em', color: '#6b6a65', borderTop: '1px solid #dcdbd6', paddingTop: 16 }}>
          <span>MAIL · CONNECT · DOCS · MEET · ASK SAGE</span>
          <span>BUILT BY CYBERSAGE</span>
        </div>
      </Stage>
    </div>
  );
}

/* ═════════════ SAGE VAULT — black range, emerald signal, bracketed frame ═════════════ */
const G = '#10b981';
const Corner = ({ pos }) => {
  const s = { position: 'absolute', width: 30, height: 30, borderColor: 'rgba(244,244,245,.55)', borderStyle: 'solid', borderWidth: 0 };
  const m = { tl: { left: 40, top: 70, borderLeftWidth: 1.5, borderTopWidth: 1.5 }, tr: { right: 40, top: 70, borderRightWidth: 1.5, borderTopWidth: 1.5 }, bl: { left: 40, bottom: 70, borderLeftWidth: 1.5, borderBottomWidth: 1.5 }, br: { right: 40, bottom: 70, borderRightWidth: 1.5, borderBottomWidth: 1.5 } };
  return <span aria-hidden="true" style={{ ...s, ...m[pos] }} />;
};
const Badge = ({ v }) => {
  const m = { done: ['rgba(16,185,129,.18)', '#34d399', 'rgba(16,185,129,.35)', 'Completed'], active: ['rgba(59,130,246,.18)', '#60a5fa', 'rgba(59,130,246,.35)', 'In progress'], locked: ['#27272a', '#71717a', '#3f3f46', 'Locked'] }[v];
  return <span style={{ fontFamily: FONT.mono, fontSize: 12, padding: '3px 9px', borderRadius: 5, background: m[0], color: m[1], border: `1px solid ${m[2]}`, transition: 'all 300ms' }}>{m[3]}</span>;
};

function useClock(ref, start) {
  const inView = useInView(ref);
  const reduce = useReducedMotion();
  const [t, setT] = useState(start);
  useEffect(() => {
    if (!inView || reduce) return undefined;
    const id = setInterval(() => setT((n) => n + 1), 1000);
    return () => clearInterval(id);
  }, [inView, reduce]);
  const p = (n) => String(n).padStart(2, '0');
  return `${p(Math.floor(t / 3600))}:${p(Math.floor(t / 60) % 60)}:${p(t % 60)}`;
}

export function VaultArt() {
  const ref = useRef(null);
  const step = useSteps(ref, 6, 1500, 2); // 0 task 2 active · 1 flag typed · 2 task 2 done, task 3 active · 3-5 hold then reset
  const clock = useClock(ref, 14 * 60 + 18);
  const t2 = step >= 2 ? 'done' : 'active';
  const t3 = step >= 2 ? 'active' : 'locked';
  const flag = step === 0 ? 'SAGE{' : 'SAGE{••••••••••••}';
  return (
    <div ref={ref}>
      <Stage bg="#09090b" label="Sage Vault product art: the Vault eagle and wordmark beside gated lab tasks unlocking in order, inside bracketed range framing.">
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(16,185,129,.045) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,.045) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div style={{ position: 'absolute', left: 40, right: 40, top: 30, display: 'flex', justifyContent: 'space-between', fontFamily: FONT.mono, fontSize: 13, letterSpacing: '.12em', color: '#a1a1aa' }}>
          <span><span style={{ color: '#e4e4e7' }}>SAGE VAULT</span> / CYBER RANGE</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span className="cs-live" style={{ width: 7, height: 7, borderRadius: 9, background: G }} />LIVE</span>
        </div>
        {['tl', 'tr', 'bl', 'br'].map((p) => <Corner key={p} pos={p} />)}

        <div style={{ position: 'absolute', left: 90, top: 110, width: 520 }}>
          <img src="/brand/products/vault-eagle.webp" alt="" width="300" height="267" style={{ display: 'block', marginLeft: -16 }} />
          <div style={{ marginTop: 6, fontFamily: FONT.archivo, fontStretch: '75%', fontVariationSettings: "'wdth' 75", fontWeight: 700, fontSize: 74, letterSpacing: '.16em', lineHeight: 1, color: '#fafafa' }}>
            SAGE <span style={{ color: G }}>VAULT</span>
          </div>
          <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 14, fontFamily: FONT.archivo, fontSize: 15, letterSpacing: '.55em', color: '#52525b' }}>
            <span style={{ width: 70, height: 1, background: '#3f3f46' }} />CYBER RANGE<span style={{ width: 70, height: 1, background: '#3f3f46' }} />
          </div>
          <div style={{ marginTop: 34, fontFamily: FONT.archivo, fontStretch: '85%', fontVariationSettings: "'wdth' 85", fontWeight: 600, fontSize: 40, lineHeight: 1.1, color: '#f4f4f5' }}>
            Live incident simulations.
            <div style={{ fontFamily: FONT.serif, fontStyle: 'italic', fontWeight: 400, fontSize: 46, color: G }}>Not walkthroughs.</div>
          </div>
        </div>

        {/* gated tasks */}
        <div style={{ position: 'absolute', left: 660, top: 128, width: 470, display: 'grid', gap: 14 }}>
          {[
            { n: 1, v: 'done' },
            { n: 2, v: t2, flag: true },
            { n: 3, v: t3 },
          ].map((t) => (
            <div key={t.n} style={{ borderRadius: 10, padding: 20, border: `1px solid ${t.v === 'done' ? 'rgba(16,185,129,.4)' : t.v === 'active' ? 'rgba(255,255,255,.1)' : 'rgba(255,255,255,.05)'}`, background: t.v === 'done' ? 'rgba(16,185,129,.05)' : 'rgba(0,0,0,.35)', opacity: t.v === 'locked' ? 0.5 : 1, transition: 'all 400ms' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontFamily: FONT.mono, fontSize: 13, color: '#71717a' }}>Task {t.n}</span>
                <Bar w={150} h={9} c="#d4d4d8" style={{ opacity: 0.85 }} />
                <span style={{ marginLeft: 'auto' }}><Badge v={t.v} /></span>
              </div>
              {t.flag && t.v === 'active' && (
                <div style={{ marginTop: 16 }}>
                  <div style={{ borderRadius: 8, background: '#09090b', border: '1px solid rgba(255,255,255,.08)', padding: 14, display: 'grid', gap: 8 }}>
                    <Bar w="88%" h={7} c="rgba(252,211,77,.55)" /><Bar w="72%" h={7} c="rgba(252,211,77,.4)" /><Bar w="80%" h={7} c="rgba(252,211,77,.4)" />
                  </div>
                  <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
                    <span style={{ flex: 1, borderRadius: 6, background: '#18181b', border: `1px solid ${step === 1 ? 'rgba(16,185,129,.5)' : 'rgba(255,255,255,.1)'}`, padding: '9px 12px', fontFamily: FONT.mono, fontSize: 14, color: '#f4f4f5' }}>{flag}<span className="cs-caret" style={{ color: G }}>▍</span></span>
                    <span style={{ borderRadius: 6, background: G, color: '#000', fontFamily: FONT.archivo, fontWeight: 600, fontSize: 14, padding: '9px 16px' }}>Submit</span>
                  </div>
                </div>
              )}
              {t.v === 'done' && <div style={{ marginTop: 12 }}><Bar w="60%" h={7} c="rgba(52,211,153,.5)" /></div>}
            </div>
          ))}
          <div style={{ display: 'flex', gap: 14 }}>
            {[['Grade', 'A–F'], ['Score', 'Verified'], ['Setup', 'None']].map(([k, v]) => (
              <div key={k} style={{ flex: 1, borderRadius: 10, border: '1px solid rgba(16,185,129,.18)', background: '#111113', padding: '14px 16px' }}>
                <div style={{ fontFamily: FONT.archivo, fontSize: 11.5, fontWeight: 700, letterSpacing: '.1em', color: 'rgba(52,211,153,.75)' }}>{k.toUpperCase()}</div>
                <div style={{ marginTop: 6, fontFamily: FONT.archivo, fontSize: 21, fontWeight: 700, color: '#a1a1aa' }}>{v}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ position: 'absolute', left: 40, right: 40, bottom: 30, display: 'flex', justifyContent: 'space-between', fontFamily: FONT.mono, fontSize: 13, letterSpacing: '.12em', color: '#71717a' }}>
          <span>INCIDENT SIM / YOU RUN THE SOC</span>
          <span style={{ color: G, fontVariantNumeric: 'tabular-nums' }}>{clock}</span>
        </div>
      </Stage>
    </div>
  );
}

/* ═════════════ SAGE SENTINEL — crimson and gold on dark, the kill chain watched end to end ═════════════ */
const RED = '#C8102E';
const GOLD = '#C9A35A';
const TACTICS = ['Initial access', 'Execution', 'Persistence', 'Privilege escalation', 'Credential access', 'Discovery', 'Lateral movement', 'Exfiltration', 'Impact'];

export function SentinelArt() {
  const ref = useRef(null);
  const step = useSteps(ref, TACTICS.length + 3, 700, TACTICS.length);
  const reached = Math.min(step, TACTICS.length);
  return (
    <div ref={ref}>
      <Stage bg="#0B0B0E" label="Sage Sentinel product art: the Sentinel emblem above the nine stages of an attack, each marked as it is detected and answered by a response.">
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'radial-gradient(900px 420px at 50% -10%, rgba(200,16,46,.16), transparent 70%)' }} />
        <div style={{ position: 'absolute', left: 56, right: 56, top: 40, display: 'flex', justifyContent: 'space-between', fontFamily: FONT.mono, fontSize: 13, letterSpacing: '.12em', color: '#8a8478' }}>
          <span><span style={{ color: GOLD }}>SAGE SENTINEL</span> / SIEM · XDR · SOAR</span>
          <span>MITRE ATT&amp;CK</span>
        </div>

        <div style={{ position: 'absolute', left: 56, top: 100, display: 'flex', alignItems: 'center', gap: 34 }}>
          <img src="/brand/products/sentinel-emblem.png" alt="" width="240" height="138" style={{ display: 'block' }} />
          <div>
            <div style={{ fontFamily: FONT.zilla, fontWeight: 700, fontSize: 60, letterSpacing: '.08em', lineHeight: 1, color: GOLD }}>SAGE<br />SENTINEL</div>
          </div>
        </div>
        <div style={{ position: 'absolute', right: 56, top: 120, width: 400, fontFamily: FONT.archivo, fontSize: 30, lineHeight: 1.18, fontWeight: 300, color: '#EDE7DA', letterSpacing: '-0.01em' }}>
          Every stage of an attack, <span style={{ fontFamily: FONT.serif, fontStyle: 'italic', fontSize: 36, color: GOLD }}>watched and answered.</span>
        </div>

        {/* kill chain */}
        <div style={{ position: 'absolute', left: 56, right: 56, top: 350 }}>
          <div style={{ position: 'relative', height: 2, background: 'rgba(237,231,218,.12)' }}>
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${(reached / TACTICS.length) * 100}%`, background: `linear-gradient(90deg, ${RED}, ${GOLD})`, transition: 'width 600ms cubic-bezier(.23,1,.32,1)' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${TACTICS.length}, 1fr)` }}>
            {TACTICS.map((t, i) => {
              const on = i < reached;
              const critical = i === 4 || i === 8;
              return (
                <div key={t} style={{ paddingTop: 18, paddingRight: 10, borderLeft: '1px solid rgba(237,231,218,.1)', paddingLeft: 12, marginTop: -10 }}>
                  <span style={{ display: 'block', width: 18, height: 18, borderRadius: 999, marginLeft: -21, marginTop: -9, background: on ? RED : '#1a1a1f', border: `2px solid ${on ? '#ff4d63' : 'rgba(237,231,218,.2)'}`, transition: 'all 300ms' }} />
                  <div style={{ marginTop: 14, fontFamily: FONT.mono, fontSize: 11.5, letterSpacing: '.06em', color: '#8a8478' }}>{String(i + 1).padStart(2, '0')}</div>
                  <div style={{ marginTop: 6, fontFamily: FONT.archivo, fontSize: 16, lineHeight: 1.2, color: on ? '#EDE7DA' : '#5f5a52', transition: 'color 300ms' }}>{t}</div>
                  <div style={{ marginTop: 14, height: 26, opacity: on ? 1 : 0, transform: on ? 'none' : 'translateY(4px)', transition: 'all 300ms' }}>
                    <span style={{ fontFamily: FONT.mono, fontSize: 11, padding: '4px 7px', borderRadius: 4, background: critical ? 'rgba(201,163,90,.14)' : 'rgba(200,16,46,.16)', color: critical ? GOLD : '#ff7a8a', border: `1px solid ${critical ? 'rgba(201,163,90,.35)' : 'rgba(200,16,46,.4)'}` }}>{critical ? 'CONFIRM' : i === 7 ? 'CONTAIN' : 'ISOLATE'}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ position: 'absolute', left: 56, bottom: 120, display: 'flex', gap: 28, fontFamily: FONT.archivo, fontSize: 17, color: '#a39d90' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ width: 10, height: 10, borderRadius: 2, background: 'rgba(200,16,46,.6)' }} />Automatic response</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ width: 10, height: 10, borderRadius: 2, background: 'rgba(201,163,90,.6)' }} />Waits for an analyst on critical systems</span>
        </div>
        <div style={{ position: 'absolute', left: 56, right: 56, bottom: 36, display: 'flex', justifyContent: 'space-between', fontFamily: FONT.mono, fontSize: 13, letterSpacing: '.12em', color: '#5f5a52', borderTop: '1px solid rgba(237,231,218,.1)', paddingTop: 16 }}>
          <span>COLLECT · DETECT · RESPOND · REPORT</span>
          <span>BUILT NATIVELY BY CYBERSAGE</span>
        </div>
      </Stage>
    </div>
  );
}

/* ═════════════ SAGE EDUCATION — ink chrome, warm canvas, the tenant's own colour ═════════════ */
const MODULES = ['Admissions', 'Campus ERP', 'Communication', 'Assessment', 'Finance', 'Placement', 'Library', 'Hostel & Transport'];
const HUES = [
  { brand: '#0F9D8C', strong: '#0A6559', soft: '#E7F5F3' },
  { brand: '#3B5BDB', strong: '#2F4AB8', soft: '#ECEFFC' },
  { brand: '#C2562F', strong: '#9A3F1F', soft: '#FBEEE8' },
];
const SURFACES = ['Admin dashboard', 'Faculty portal', 'Student app', 'Parent app'];

export function EducationArt() {
  const ref = useRef(null);
  const step = useSteps(ref, 6, 1600, 0);
  const h = HUES[Math.floor(step / 2) % HUES.length];
  const active = step % MODULES.length;
  const tr = 'background-color 600ms ease, color 600ms ease, border-color 600ms ease';
  return (
    <div ref={ref}>
      <Stage bg="#F6F8F7" label="Sage Education product art: one institution dashboard re-coloured in three brand colours, showing the same platform white-labelled for different institutions.">
        {/* chrome */}
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 270, background: '#0E1A1E', padding: '34px 22px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ width: 38, height: 38, borderRadius: 10, background: h.brand, transition: tr }} />
            <div style={{ display: 'grid', gap: 7 }}><Bar w={110} h={9} c="#E4EAE8" /><Bar w={70} h={7} c="#37505A" /></div>
          </div>
          <div style={{ marginTop: 40, display: 'grid', gap: 4 }}>
            {MODULES.map((m, i) => (
              <div key={m} style={{ position: 'relative', padding: '10px 14px', borderRadius: 8, fontFamily: FONT.hanken, fontSize: 15, fontWeight: i === active ? 600 : 500, color: i === active ? '#fff' : '#9DB0B6', background: i === active ? 'rgba(255,255,255,.07)' : 'transparent', transition: tr }}>
                {i === active && <span style={{ position: 'absolute', left: 0, top: 9, bottom: 9, width: 3, borderRadius: 3, background: h.brand, transition: tr }} />}
                {m}
              </div>
            ))}
          </div>
        </div>

        {/* content */}
        <div style={{ position: 'absolute', left: 310, right: 40, top: 40 }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontFamily: FONT.zilla, fontWeight: 700, fontSize: 46, letterSpacing: '-0.02em', lineHeight: 1.05, color: '#0E1A1E' }}>Your institution,</div>
              <div style={{ fontFamily: FONT.zilla, fontWeight: 700, fontSize: 46, letterSpacing: '-0.02em', lineHeight: 1.05, color: h.strong, transition: tr }}>in your colours.</div>
            </div>
            <span style={{ fontFamily: FONT.hanken, fontWeight: 600, fontSize: 15, color: '#fff', background: h.strong, padding: '12px 20px', borderRadius: 10, transition: tr }}>New admission</span>
          </div>

          <div style={{ marginTop: 34, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {['Admissions', 'Fees', 'Attendance', 'Placement'].map((k, i) => (
              <div key={k} style={{ background: '#fff', border: '1px solid #E4EAE8', borderRadius: 12, padding: 20 }}>
                <div style={{ fontFamily: FONT.hanken, fontSize: 12, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: '#5A7079' }}>{k}</div>
                <Bar w={[90, 70, 100, 60][i]} h={22} c="#0E1A1E" r={5} style={{ marginTop: 14, opacity: 0.9 }} />
                <div style={{ marginTop: 16, display: 'flex', alignItems: 'flex-end', gap: 5, height: 46 }}>
                  {[0.45, 0.62, 0.5, 0.78, 0.66, 0.9, 0.72].map((v, j) => <span key={j} style={{ flex: 1, height: `${v * 100}%`, borderRadius: 3, background: j === 5 ? h.brand : h.soft, transition: tr }} />)}
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 16, background: '#fff', border: '1px solid #E4EAE8', borderRadius: 12 }}>
            <div style={{ padding: '18px 20px', fontFamily: FONT.zilla, fontWeight: 700, fontSize: 21, color: '#0E1A1E', borderBottom: '1px solid #E4EAE8' }}>Admissions pipeline</div>
            {[['good', 'Enrolled'], ['warning', 'Documents pending'], ['neutral', 'Applied']].map(([tone, word], i) => {
              const c = { good: ['#E7F5F3', '#0A6559'], warning: ['#FBF1E0', '#8A5B16'], neutral: ['#EEF2F1', '#37505A'] }[tone];
              return (
                <div key={word} style={{ display: 'grid', gridTemplateColumns: '40px 1.4fr 1fr 170px', alignItems: 'center', gap: 16, padding: '15px 20px', borderBottom: i < 2 ? '1px solid #EEF2F1' : 'none' }}>
                  <span style={{ width: 32, height: 32, borderRadius: 999, background: h.soft, transition: tr }} />
                  <Bar w="70%" h={9} c="#37505A" style={{ opacity: 0.75 }} />
                  <Bar w="60%" h={9} c="#E4EAE8" />
                  <span style={{ justifySelf: 'start', fontFamily: FONT.hanken, fontWeight: 600, fontSize: 13.5, padding: '5px 11px', borderRadius: 999, background: c[0], color: c[1] }}>{word}</span>
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: 22, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {SURFACES.map((s) => <span key={s} style={{ fontFamily: FONT.hanken, fontSize: 14, fontWeight: 600, color: '#37505A', border: '1px solid #E4EAE8', background: '#fff', borderRadius: 999, padding: '7px 14px' }}>{s}</span>)}
          </div>
        </div>
      </Stage>
    </div>
  );
}

/* ═════════════ SAGE BRAIN — CyberSage black and blue: many signals, one recommendation ═════════════ */
const SOURCES = ['Sentinel', 'Nexus', 'Vault', 'Sage Education'];
export function BrainArt() {
  const ref = useRef(null);
  const step = useSteps(ref, 6, 1300, 4); // 0-3 signals arrive, 4 recommendation, 5 approved
  const reduce = useReducedMotion();
  const ys = [190, 300, 410, 520];
  return (
    <div ref={ref}>
      <Stage bg="#07090D" label="Sage Brain product art: signals from Sentinel, Nexus, Vault and Sage Education converge into a single recommendation that waits for a person to approve it.">
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,.018) 0 1px, transparent 1px 3px)' }} />
        <div style={{ position: 'absolute', left: 56, right: 56, top: 40, display: 'flex', justifyContent: 'space-between', fontFamily: FONT.mono, fontSize: 13, letterSpacing: '.12em', color: '#5B6575' }}>
          <span><span style={{ color: '#ECEEF1' }}>SAGE BRAIN</span> / INTELLIGENCE</span>
          <span>PRIVATE BY DESIGN</span>
        </div>

        <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }} aria-hidden="true">
          {ys.map((y, i) => (
            <motion.path key={i} d={`M250 ${y} C 470 ${y}, 480 365, 640 365`} fill="none" stroke={step > i || reduce ? '#A9B8D0' : 'rgba(169,184,208,.15)'} strokeWidth="1.2"
              initial={false} animate={{ pathLength: step > i || reduce ? 1 : 0.0001 }} transition={{ duration: 0.9, ease: EASE }} />
          ))}
          <path d="M760 365 L 820 365" stroke={step >= 4 ? '#2563EB' : 'rgba(169,184,208,.15)'} strokeWidth="1.5" />
        </svg>

        {SOURCES.map((s, i) => (
          <div key={s} style={{ position: 'absolute', left: 56, top: ys[i] - 16, display: 'flex', alignItems: 'center', gap: 12, fontFamily: FONT.archivo, fontSize: 20, color: step > i || reduce ? '#ECEEF1' : '#5B6575', transition: 'color 300ms' }}>
            <span style={{ width: 8, height: 8, background: step > i || reduce ? '#ECEEF1' : '#2A3142', transition: 'background-color 300ms' }} />{s}
          </div>
        ))}

        <div style={{ position: 'absolute', left: 640, top: 305, width: 120, height: 120, border: '1px solid rgba(169,184,208,.35)', display: 'grid', placeItems: 'center', fontFamily: FONT.mono, fontSize: 12, letterSpacing: '.1em', color: '#A9B8D0' }}>CONTEXT</div>

        <div style={{ position: 'absolute', left: 820, top: 250, width: 330, background: '#0E1117', border: `1px solid ${step >= 4 ? 'rgba(37,99,235,.6)' : 'rgba(169,184,208,.15)'}`, padding: 24, transition: 'border-color 400ms', opacity: step >= 4 || reduce ? 1 : 0.4 }}>
          <div style={{ fontFamily: FONT.mono, fontSize: 12, letterSpacing: '.1em', color: '#8B95A5' }}>RECOMMENDATION</div>
          <div style={{ marginTop: 16, display: 'grid', gap: 9 }}><Bar w="92%" h={8} c="#2A3142" r={0} /><Bar w="78%" h={8} c="#2A3142" r={0} /><Bar w="64%" h={8} c="#2A3142" r={0} /></div>
          <div style={{ marginTop: 16, fontFamily: FONT.mono, fontSize: 12, color: '#5B6575' }}>Evidence attached</div>
          <div style={{ marginTop: 22, display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontFamily: FONT.archivo, fontSize: 15, fontWeight: 500, padding: '10px 16px', background: step === 5 ? '#ECEEF1' : '#2563EB', color: step === 5 ? '#07090D' : '#fff', transition: 'all 300ms' }}>{step === 5 ? 'Approved' : 'Approve'}</span>
            <span style={{ fontFamily: FONT.archivo, fontSize: 15, padding: '10px 16px', border: '1px solid rgba(236,238,241,.25)', color: '#A9B8D0' }}>Review</span>
          </div>
          <div style={{ marginTop: 14, fontFamily: FONT.mono, fontSize: 12, color: step === 5 ? '#ECEEF1' : '#5B6575' }}>{step === 5 ? 'Approved by a person' : 'Waiting for a person'}</div>
        </div>

        <div style={{ position: 'absolute', left: 56, right: 56, bottom: 36, display: 'flex', justifyContent: 'space-between', fontFamily: FONT.mono, fontSize: 13, letterSpacing: '.12em', color: '#5B6575', borderTop: '1px solid rgba(169,184,208,.12)', paddingTop: 16 }}>
          <span>ANALYSE · UNDERSTAND · CONNECT · DECIDE</span>
          <span>PEOPLE APPROVE WHAT MATTERS</span>
        </div>
      </Stage>
    </div>
  );
}

const ART = { nexus: NexusArt, vault: VaultArt, sentinel: SentinelArt, education: EducationArt, brain: BrainArt };
export default function ProductArt({ slug }) {
  const A = ART[slug];
  return A ? <A /> : null;
}
