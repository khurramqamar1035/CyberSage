import React, { useEffect, useState } from 'react';
import { loadContent, published } from '../../lib/content';

// Testimonials as a continuously moving row, from public/content/testimonials.json
// (managed in Admin > Testimonials). Pauses on hover/focus; static row for reduced motion.

const WRAP = 'max-w-[1400px] mx-auto px-6 md:px-10';

function useTestimonials() {
  const [list, setList] = useState([]);
  useEffect(() => {
    loadContent('testimonials').then((l) => setList(published(l))).catch(() => {});
  }, []);
  return list;
}

const initials = (n) => String(n || '').split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase();
const subline = (m) => [m.role, m.cohort].filter(Boolean).join(' · ');

function Card({ m, onOpen, hidden }) {
  const long = (m.message || '').length > 240;
  return (
    <figure className="m-0 w-[300px] sm:w-[380px] shrink-0 bg-white border border-[rgba(7,9,13,0.12)] p-6 flex flex-col justify-between gap-6" aria-hidden={hidden || undefined}>
      <div>
        <svg width="26" height="20" viewBox="0 0 26 20" aria-hidden="true" className="text-brand"><path d="M0 20V12C0 5.4 3.4 1.3 10.2 0l1.1 2.6C7.6 3.8 5.8 6.1 5.6 9.4H11V20H0zm15 0V12c0-6.6 3.4-10.7 10.2-12l1.1 2.6c-3.7 1.2-5.5 3.5-5.7 6.8H26V20H15z" fill="currentColor" /></svg>
        <blockquote className="m-0 mt-4 text-[15.5px] leading-relaxed text-[#1F2430] whitespace-pre-line line-clamp-6">{m.message}</blockquote>
        {long && <button type="button" tabIndex={hidden ? -1 : 0} onClick={() => onOpen(m)} className="mt-3 bg-transparent cs-link text-[14px]">Read more</button>}
      </div>
      <figcaption className="flex items-center gap-3 pt-4 border-t border-[rgba(7,9,13,0.1)]">
        {m.photo
          ? <img src={m.photo} alt="" loading="lazy" className="w-10 h-10 object-cover shrink-0 bg-mist" />
          : <span aria-hidden="true" className="w-10 h-10 shrink-0 flex items-center justify-center bg-k text-white text-[13px] font-medium">{initials(m.name)}</span>}
        <span className="min-w-0">
          <span className="block text-[15px] font-medium truncate">{m.linkedin && !hidden ? <a href={m.linkedin} target="_blank" rel="noopener noreferrer" className="cs-link">{m.name}</a> : m.name}</span>
          {subline(m) && <span className="block text-[13px] text-dim truncate">{subline(m)}</span>}
        </span>
      </figcaption>
    </figure>
  );
}

function Reader({ m, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);
  return (
    <div role="dialog" aria-modal="true" aria-label={`Testimonial from ${m.name}`} data-lenis-prevent className="fixed inset-0 z-[60] bg-[#07090D]/80 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white max-w-[640px] w-full max-h-[85vh] overflow-y-auto p-7 md:p-10" onClick={(e) => e.stopPropagation()}>
        <blockquote className="m-0 text-[17px] leading-[1.7] text-[#1F2430] whitespace-pre-line">{m.message}</blockquote>
        <div className="mt-8 pt-5 border-t border-[rgba(7,9,13,0.12)] flex items-end justify-between gap-4">
          <div>
            <div className="text-[16px] font-medium">{m.name}</div>
            {subline(m) && <div className="text-[14px] text-dim">{subline(m)}</div>}
          </div>
          <button type="button" onClick={onClose} className="cs-btn cs-btn-secondary" autoFocus>Close</button>
        </div>
      </div>
    </div>
  );
}

export default function InternVoices({ title = 'Testimonials.' }) {
  const list = useTestimonials();
  const [open, setOpen] = useState(null);
  if (list.length === 0) return null;
  // repeat short lists so the moving row is always wider than the screen
  const base = list.length < 4 ? [...list, ...list, ...list].slice(0, Math.max(4, list.length)) : list;
  const duration = `${Math.max(30, base.length * 11)}s`;
  return (
    <section id="testimonials" className="relative s-off overflow-hidden scroll-mt-16">
      <div className={`${WRAP} relative pt-16 md:pt-20`}>
        <h2 className="m-0 t-wide font-[250] text-[30px] md:text-[44px] leading-[1.04] tracking-[-0.03em]">{title}</h2>
      </div>
      <div className="cs-marquee relative mt-10 pb-16 md:pb-20" style={{ '--marquee-duration': duration }}>
        <div className="cs-marquee-track flex gap-5 w-max px-6 md:px-10">
          {base.map((m, i) => <Card key={`a${i}`} m={m} onOpen={setOpen} />)}
          {base.map((m, i) => <Card key={`b${i}`} m={m} onOpen={setOpen} hidden />)}
        </div>
      </div>
      {open && <Reader m={open} onClose={() => setOpen(null)} />}
    </section>
  );
}
