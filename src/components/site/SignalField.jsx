import React, { useEffect, useRef } from 'react';

/*
  The Signal Field: CyberSage's signature visual.
  Each horizontal trace is one telemetry channel. Traces occlude the ones behind them,
  like a seismograph drum. Every cycle a disturbance enters near the top (a security
  event), travels down through the stack, is marked where Sentinel detects it and
  again where Brain reaches a decision. Pointer = an inspection cursor with a readout.

  Props
    lines       number of channels
    theme       'dark' | 'light'
    labels      [{ line, text }] channel labels drawn at the right edge
    marks       { detect: { line, text }, decide: { line, text } }
    eventX      0..1 horizontal position of the disturbance
    inspect     show the pointer cursor + readout
*/

const THEMES = {
  dark: { bg: '#07090D', line: [169, 184, 208], base: 0.26, hot: [236, 238, 241], accent: '#2563EB', alert: '#E5484D', text: 'rgba(169,184,208,0.7)', textStrong: '#ECEEF1' },
  light: { bg: '#ECEEF1', line: [7, 9, 13], base: 0.28, hot: [7, 9, 13], accent: '#2563EB', alert: '#C93C40', text: 'rgba(7,9,13,0.55)', textStrong: '#07090D' },
};

const CYCLE = 9; // seconds per event

function envelope(p) {
  if (p < 0.08) return 0;
  if (p < 0.22) return (p - 0.08) / 0.14;
  if (p < 0.78) return 1;
  if (p < 0.95) return 1 - (p - 0.78) / 0.17;
  return 0;
}

export default function SignalField({
  lines = 40, theme = 'dark', labels = [], marks = null, eventX = 0.62, inspect = true, className = '', ariaLabel,
}) {
  const wrap = useRef(null);
  const canvas = useRef(null);
  const pointer = useRef(null);

  useEffect(() => {
    const el = canvas.current; const box = wrap.current;
    if (!el || !box) return undefined;
    const ctx = el.getContext('2d');
    const T = THEMES[theme];
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let W = 0; let H = 0; let dpr = 1; let raf = 0; let visible = true; let last = 0;
    const start = performance.now();

    const resize = () => {
      const r = box.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = Math.max(1, Math.floor(r.width)); H = Math.max(1, Math.floor(r.height));
      el.width = W * dpr; el.height = H * dpr; el.style.width = `${W}px`; el.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(reduce ? 0.5 * CYCLE : (performance.now() - start) / 1000);
    };

    // deterministic per-line character so the field looks like real, distinct channels
    const rnd = (i, k) => { const s = Math.sin(i * 127.1 + k * 311.7) * 43758.5453; return s - Math.floor(s); };

    function draw(t) {
      const top = H * 0.08; const bottom = H * 0.96;
      const gap = (bottom - top) / (lines - 1);
      const amp = gap * 0.9;
      const p = (t % CYCLE) / CYCLE;
      const env = envelope(p);
      // the disturbance travels down the stack
      const c = 2 + (lines - 6) * Math.min(1, Math.max(0, (p - 0.1) / 0.6));
      const ex = W * eventX; const ew = Math.max(26, W * 0.022);
      const step = W > 900 ? 4 : 3;

      ctx.fillStyle = T.bg; ctx.fillRect(0, 0, W, H);
      for (let i = 0; i < lines; i += 1) {
        const y0 = top + i * gap;
        const f1 = 0.004 + rnd(i, 1) * 0.006; const f2 = 0.02 + rnd(i, 2) * 0.03; const ph = rnd(i, 3) * 6.28;
        const busy = 0.25 + rnd(i, 4) * 0.75; // some channels are noisier than others
        const d = i - c; const reach = Math.exp(-(d * d) / 18) * env + (i < c ? 0.25 * env : 0);
        ctx.beginPath();
        let first = true;
        for (let x = 0; x <= W + step; x += step) {
          let v = Math.sin(x * f1 + ph + t * 0.35) * 0.35 + Math.sin(x * f2 - t * (0.6 + busy)) * 0.18 * busy;
          v += Math.sin(x * 0.11 + i * 7.3) * 0.06 * busy;
          const dx = (x - ex) / ew; v += reach * 3.2 * Math.exp(-dx * dx) * (0.8 + 0.2 * Math.sin(x * 0.4 + t * 3));
          const y = y0 - Math.max(-0.4, v) * amp;
          if (first) { ctx.moveTo(x, y); first = false; } else ctx.lineTo(x, y);
        }
        // occlude the channels behind
        ctx.lineTo(W + step, y0 + gap * 2); ctx.lineTo(0, y0 + gap * 2); ctx.closePath();
        ctx.fillStyle = T.bg; ctx.fill();
        const heat = Math.min(1, reach * 1.2);
        const a = T.base + heat * 0.55;
        const [r, g, b] = heat > 0.02 ? T.hot : T.line;
        ctx.strokeStyle = `rgba(${r},${g},${b},${a})`;
        ctx.lineWidth = heat > 0.5 ? 1.25 : 1;
        ctx.stroke();
      }

      ctx.font = '10.5px "IBM Plex Mono", ui-monospace, monospace';
      ctx.textBaseline = 'middle';
      // channel labels at the right edge
      labels.forEach(({ line, text }) => {
        const y = top + line * gap;
        const w = ctx.measureText(text).width;
        ctx.fillStyle = T.bg; ctx.fillRect(W - w - 30, y - 9, w + 14, 14);
        ctx.fillStyle = T.text; ctx.textAlign = 'right'; ctx.fillText(text, W - 22, y - 2);
      });

      // detection and decision marks appear as the disturbance reaches them
      if (marks && env > 0.05) {
        const mark = (m, color, shape) => {
          if (!m || c < m.line - 0.5) return;
          const y = top + m.line * gap - amp * 2.6;
          ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = 1;
          ctx.globalAlpha = Math.min(1, env * 1.4);
          ctx.beginPath(); ctx.moveTo(ex, y); ctx.lineTo(ex + 46, y - 24); ctx.lineTo(ex + 64, y - 24); ctx.stroke();
          if (shape === 'diamond') { ctx.save(); ctx.translate(ex, y); ctx.rotate(Math.PI / 4); ctx.fillRect(-3.5, -3.5, 7, 7); ctx.restore(); }
          else { ctx.beginPath(); ctx.arc(ex, y, 3.5, 0, 6.283); ctx.fill(); }
          ctx.textAlign = 'left'; ctx.fillStyle = T.textStrong; ctx.fillText(m.text, ex + 70, y - 24);
          ctx.globalAlpha = 1;
        };
        mark(marks.detect, T.alert, 'dot');
        mark(marks.decide, T.accent, 'diamond');
      }

      // inspection cursor
      const pt = pointer.current;
      if (inspect && pt) {
        ctx.strokeStyle = theme === 'dark' ? 'rgba(236,238,241,0.35)' : 'rgba(7,9,13,0.35)'; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(pt.x + 0.5, 0); ctx.lineTo(pt.x + 0.5, H); ctx.stroke();
        const ch = Math.max(0, Math.min(lines - 1, Math.round((pt.y - top) / gap)));
        const secs = Math.round((W - pt.x) / W * 120);
        const label = `CH ${String(ch + 1).padStart(2, '0')}   T−${String(Math.floor(secs / 60)).padStart(2, '0')}:${String(secs % 60).padStart(2, '0')}`;
        const w = ctx.measureText(label).width + 16;
        const lx = pt.x + 10 + w > W ? pt.x - w - 10 : pt.x + 10;
        ctx.fillStyle = theme === 'dark' ? '#ECEEF1' : '#07090D'; ctx.fillRect(lx, pt.y - 11, w, 20);
        ctx.fillStyle = theme === 'dark' ? '#07090D' : '#ECEEF1'; ctx.textAlign = 'left'; ctx.fillText(label, lx + 8, pt.y - 1);
      }
    }

    const loop = (now) => {
      raf = requestAnimationFrame(loop);
      if (!visible || now - last < 33) return; // ~30fps is plenty for telemetry
      last = now; draw((now - start) / 1000);
    };

    const ro = new ResizeObserver(resize); ro.observe(box);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }); io.observe(box);
    resize();
    if (!reduce) raf = requestAnimationFrame(loop);

    const onMove = (e) => { const r = el.getBoundingClientRect(); pointer.current = { x: e.clientX - r.left, y: e.clientY - r.top }; if (reduce) draw(0.5 * CYCLE); };
    const onLeave = () => { pointer.current = null; if (reduce) draw(0.5 * CYCLE); };
    if (inspect && window.matchMedia('(pointer: fine)').matches) { el.addEventListener('mousemove', onMove); el.addEventListener('mouseleave', onLeave); }

    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); el.removeEventListener('mousemove', onMove); el.removeEventListener('mouseleave', onLeave); };
  }, [lines, theme, labels, marks, eventX, inspect]);

  return (
    <div ref={wrap} className={`relative ${className}`}>
      <canvas ref={canvas} role="img" aria-label={ariaLabel || 'Telemetry: stacked signal channels with a security event travelling through them'} className="block" style={{ cursor: inspect ? 'crosshair' : 'default' }} />
    </div>
  );
}
