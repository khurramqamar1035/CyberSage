import React from 'react';
import { BRAIN_FEED, FEED_TAG } from '../../data/ecosystem';

// Illustrative product screens for each platform (sample data, not live).

const Shell = ({ product, children }) => (
  <div className="w-full h-[480px] sm:h-[540px] rounded-lg bg-surface-container-low border border-surface-container-highest shadow-[0_40px_100px_rgba(0,0,0,0.45)] flex flex-col overflow-hidden" aria-hidden="true">
    <div className="h-[52px] shrink-0 px-5 flex items-center justify-between border-b border-surface-container-high bg-surface-container">
      <div className="flex items-center gap-2.5"><span className="w-2 h-2 rounded-[2px]" style={{ background: product.color }} /><span className="text-[14px] font-semibold">{product.visualTitle}</span></div>
      <span className="cs-mono flex items-center gap-2 text-[11px] text-tertiary"><span className="cs-pulse w-1.5 h-1.5 rounded-full bg-tertiary" />Live</span>
    </div>
    {children}
  </div>
);

function Nexus() {
  return (
    <div className="flex-1 flex min-h-0">
      <div className="hidden sm:flex w-[160px] p-3 border-r border-surface-container-high flex-col gap-0.5">
        <div className="cs-mono text-[10px] text-outline px-2 pb-2">Spaces</div>
        <div className="px-2 py-2 rounded bg-surface-container-high text-[14px]"># product</div>
        {['# general', '# finance', '# leadership'].map((c) => <div key={c} className="px-2 py-2 text-[14px] text-on-surface-variant">{c}</div>)}
        <div className="cs-mono text-[10px] text-outline px-2 pt-4 pb-2">Tools</div>
        {['Files', 'Docs', 'Calendar'].map((c) => <div key={c} className="px-2 py-2 text-[14px] text-on-surface-variant">{c}</div>)}
      </div>
      <div className="flex-1 p-4 flex flex-col gap-3">
        <div className="flex gap-2.5"><span className="w-8 h-8 rounded bg-surface-container-highest shrink-0" /><div className="flex flex-col gap-1"><span className="text-[13px] font-semibold">Aisha <span className="cs-mono font-normal text-outline text-[11px]">09:12</span></span><span className="text-[14px] leading-snug text-on-surface-variant">Q4 plan is in Docs. Comments by Friday please.</span></div></div>
        <div className="flex gap-2.5"><span className="w-8 h-8 rounded bg-surface-container-highest shrink-0" /><div className="flex flex-col gap-1.5"><span className="text-[13px] font-semibold">Tom <span className="cs-mono font-normal text-outline text-[11px]">09:20</span></span><span className="inline-flex items-center gap-2 px-2.5 py-2 rounded border border-surface-container-highest text-[13px] w-fit">Q4-plan.docx</span></div></div>
        <div className="mt-1 p-3.5 rounded-md bg-surface border border-surface-container-highest flex flex-col gap-1.5"><span className="cs-mono text-[10px] text-tertiary">AI assist</span><span className="text-[14px] leading-relaxed">3 decisions and 2 open actions in this thread. Review meeting added for Thursday 14:00.</span></div>
        <div className="mt-auto px-3.5 py-3 rounded-md border border-surface-container-highest text-[14px] text-outline">Message #product</div>
      </div>
    </div>
  );
}

function Education({ product }) {
  return (
    <div className="flex-1 p-5 flex flex-col gap-3.5">
      <div className="flex justify-between items-center">
        <span className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded bg-surface-container-high text-[13px]"><span className="w-3.5 h-3.5 rounded-[3px] bg-tertiary" />Your institution</span>
        <span className="cs-mono text-[11px] text-outline">White-label · 9 modules</span>
      </div>
      <div className="grid grid-cols-3 gap-2.5">
        {product.modules.map((m) => (
          <div key={m.n} className="p-3 rounded-md bg-surface-container border border-surface-container-high flex flex-col gap-1 min-h-[70px]"><span className="text-[14px] font-semibold">{m.n}</span><span className="text-[12px] text-outline">{m.s}</span></div>
        ))}
      </div>
      <div className="mt-auto flex flex-col gap-2">
        <div className="text-[13px] text-on-surface-variant">Attendance, last five days</div>
        <div className="flex items-end gap-1.5 h-12">
          {[70, 82, 76, 90, 100].map((h, i) => <div key={i} className="cs-bar flex-1 rounded-t-[2px]" style={{ height: `${h}%`, background: i === 4 ? '#44D8F1' : '#2E3447', animationDelay: `${100 + i * 60}ms` }} />)}
        </div>
      </div>
    </div>
  );
}

function Vault({ product }) {
  return (
    <div className="flex-1 p-5 flex flex-col gap-3">
      {product.exercises.map((e) => (
        <div key={e.n} className="px-4 py-3.5 rounded-md bg-surface-container border border-surface-container-high flex flex-col gap-2.5">
          <div className="flex justify-between items-center"><div className="flex flex-col gap-0.5"><span className="text-[15px] font-semibold">{e.n}</span><span className="text-[12.5px] text-outline">{e.t}</span></div><span className="cs-mono text-[12px] text-secondary">{e.p}%</span></div>
          <div className="h-1 rounded-sm bg-surface-container-high overflow-hidden"><div className="cs-fill h-1 rounded-sm bg-secondary" style={{ width: `${e.p}%` }} /></div>
        </div>
      ))}
      <div className="mt-auto px-4 py-3.5 rounded-md border border-dashed border-outline-variant flex justify-between items-center text-[14px]"><span className="text-on-surface-variant">Next: containment drill from a real incident</span><span className="cs-mono text-[11px] text-secondary">From Sentinel</span></div>
    </div>
  );
}

function Sentinel({ product }) {
  const Flow = () => <svg width="24" height="10" viewBox="0 0 24 10" fill="none" className="shrink-0"><path className="cs-flow" d="M0 5 H 24" stroke="#FFB4AB" strokeWidth="1.5" strokeDasharray="3 4" /></svg>;
  return (
    <div className="flex-1 p-5 flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className="cs-mono flex-1 text-center py-2.5 rounded bg-surface-container border border-surface-container-highest text-[12px]">SIEM · ingest</span><Flow />
        <span className="cs-mono flex-1 text-center py-2.5 rounded bg-surface-container border border-surface-container-highest text-[12px]">XDR · detect</span><Flow />
        <span className="cs-mono flex-1 text-center py-2.5 rounded bg-[#3A1F1E] border border-[#6B3530] text-error text-[12px]">SOAR · respond</span>
      </div>
      <div className="flex justify-between items-baseline gap-3"><span className="text-[16px] font-semibold">Impossible travel, then a mailbox rule</span><span className="cs-mono px-2 py-1 rounded bg-[#3A1F1E] text-error text-[11px]">High</span></div>
      <div className="flex flex-col border-l border-outline-variant ml-1 pl-4">
        {product.timeline.map((ev, i) => (
          <div key={i} className="py-2 text-[14px] flex gap-3"><span className="cs-mono w-10 text-outline">{ev.t}</span><span className={ev.hot ? 'text-error' : ''}>{ev.m}</span></div>
        ))}
      </div>
      <div className="mt-auto p-3.5 rounded-md bg-surface border border-surface-container-highest text-[14px] leading-relaxed"><span className="cs-mono text-[10px] text-primary">Sage Brain</span><br />Likely account takeover from Monday&rsquo;s phishing email. Suggest a password reset and a Vault phishing scenario for finance.</div>
    </div>
  );
}

function Brain() {
  const feed = [...BRAIN_FEED, ...BRAIN_FEED];
  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="px-5 py-4 border-b border-surface-container-high flex gap-2.5 items-center text-[15px]"><img src="/brand/emblem.png" alt="" className="w-5 h-5 object-contain" />Is last night&rsquo;s login spike linked to Monday&rsquo;s phishing email?</div>
      <div className="flex-1 relative overflow-hidden cs-fade-mask">
        <div className="cs-ticker flex flex-col">
          {feed.map((e, i) => (
            <div key={i} className="flex gap-3.5 px-5 py-3 border-b border-[#1D2336]">
              <span className="cs-mono w-10 shrink-0 text-[12px] text-outline pt-0.5">{e.t}</span>
              <div className="flex flex-col gap-1"><span className="cs-mono self-start text-[10px] px-1.5 py-0.5 rounded-[3px]" style={{ background: FEED_TAG[e.src][0], color: FEED_TAG[e.src][1] }}>{e.src}</span><span className="text-[14px] leading-snug">{e.msg}</span></div>
            </div>
          ))}
        </div>
      </div>
      <div className="px-5 py-3.5 border-t border-surface-container-high bg-surface text-[14px] leading-relaxed"><span className="text-primary font-semibold">Answer:</span> Likely yes. 4 of the 6 accounts clicked Monday&rsquo;s link and the source IPs overlap.</div>
    </div>
  );
}

export default function ProductVisual({ product }) {
  const V = { nexus: Nexus, education: Education, vault: Vault, sentinel: Sentinel, brain: Brain }[product.visual];
  return <Shell product={product}><V product={product} /></Shell>;
}
