import React, { useEffect, useState } from 'react';
import { Guides } from './ServiceTemplates';

// Farewell messages left by interns, managed in Admin > Intern messages.
// Renders nothing until at least one message is published.

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const WRAP = 'max-w-[1400px] mx-auto px-6 md:px-10';
const CACHE_KEY = 'cs_intern_messages';

function useMessages() {
  const [list, setList] = useState(() => {
    try { const c = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null'); return c && Date.now() - c.ts < 300000 ? c.data : []; } catch { return []; }
  });
  useEffect(() => {
    fetch(`${BACKEND_URL}/api/intern-messages`)
      .then((r) => (r.ok ? r.json() : []))
      .then((d) => {
        const data = Array.isArray(d) ? d.filter((m) => m.published !== false) : [];
        setList(data);
        try { localStorage.setItem(CACHE_KEY, JSON.stringify({ data, ts: Date.now() })); } catch {}
      })
      .catch(() => {});
  }, []);
  return list;
}

const initials = (n) => String(n || '').split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase();

function Person({ m, dark }) {
  return (
    <div className="flex items-center gap-3 min-w-0">
      {m.photo
        ? <img src={m.photo} alt="" loading="lazy" className="w-11 h-11 object-cover shrink-0 bg-[#E6E9ED]" />
        : <span aria-hidden="true" className={`w-11 h-11 shrink-0 flex items-center justify-center text-[14px] font-medium ${dark ? 'bg-[#1A1F2A] text-[#ECEEF1]' : 'bg-[#E6E9ED] text-[#07090D]'}`}>{initials(m.name)}</span>}
      <div className="min-w-0">
        <div className="text-[15px] font-medium truncate">
          {m.linkedin ? <a href={m.linkedin} target="_blank" rel="noopener noreferrer" className="cs-link">{m.name}</a> : m.name}
        </div>
        <div className={`text-[13px] truncate ${dark ? 'text-[#A9B8D0]' : 'text-[#5B6575]'}`}>{[m.role, m.cohort].filter(Boolean).join(' · ')}</div>
      </div>
    </div>
  );
}

function Message({ m }) {
  const [open, setOpen] = useState(false);
  const long = (m.message || '').length > 260;
  return (
    <figure className="m-0 flex flex-col gap-5 py-7 border-b border-[rgba(7,9,13,0.14)]">
      <blockquote className={`m-0 text-[16px] leading-relaxed text-[#1F2430] whitespace-pre-line ${long && !open ? 'line-clamp-5' : ''}`}>&ldquo;{m.message}&rdquo;</blockquote>
      {long && (
        <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} className="w-fit bg-transparent cs-link text-[14px] -mt-2">{open ? 'Show less' : 'Read the full message'}</button>
      )}
      <figcaption><Person m={m} /></figcaption>
    </figure>
  );
}

export default function InternVoices({ title = 'What our interns say.', intro = 'Testimonials from interns, in their own words, written as they finished the programme.' }) {
  const list = useMessages();
  if (list.length === 0) return null;
  const [featured, ...rest] = list;
  return (
    <section id="intern-messages" className="relative s-off overflow-hidden scroll-mt-16">
      <Guides />
      <div className={`${WRAP} relative py-16 md:py-20`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          <div className="lg:col-span-4">
            <h2 className="m-0 t-wide font-[250] text-[30px] md:text-[44px] leading-[1.04] tracking-[-0.03em]">{title}</h2>
            <p className="m-0 mt-4 text-[16px] leading-relaxed text-[#3E4555] max-w-[40ch]">{intro}</p>
          </div>
          <figure className="m-0 lg:col-span-7 lg:col-start-6 flex flex-col gap-6">
            <blockquote className="m-0 t-wide font-[250] text-[22px] md:text-[30px] leading-[1.3] tracking-[-0.015em] whitespace-pre-line">&ldquo;{featured.message}&rdquo;</blockquote>
            <figcaption><Person m={featured} /></figcaption>
          </figure>
        </div>
        {rest.length > 0 && (
          <div className="mt-14 border-t border-[#07090D] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10">
            {rest.map((m, i) => <Message key={m._id || m.id || i} m={m} />)}
          </div>
        )}
      </div>
    </section>
  );
}
