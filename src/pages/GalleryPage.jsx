import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { PageHero, Guides } from '../components/site/ServiceTemplates';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const WRAP = 'max-w-[1400px] mx-auto px-6 md:px-10';
const CACHE_KEY = 'cs_gallery';
const CACHE_TTL = 5 * 60 * 1000;

function readCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { data, ts } = JSON.parse(raw);
    if (Date.now() - ts > CACHE_TTL) return null;
    return data;
  } catch { return null; }
}
function writeCache(data) {
  try { localStorage.setItem(CACHE_KEY, JSON.stringify({ data, ts: Date.now() })); } catch {}
}

const fmt = (iso) => {
  if (!iso) return '';
  const d = new Date(`${String(iso).slice(0, 10)}T00:00:00`);
  return Number.isNaN(d.getTime()) ? '' : d.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
};

function Lightbox({ items, index, onClose, onMove }) {
  const item = items[index];
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onMove(1);
      if (e.key === 'ArrowLeft') onMove(-1);
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = prev; };
  }, [onClose, onMove]);
  if (!item) return null;
  return (
    <div role="dialog" aria-modal="true" aria-label={item.caption || 'Photo'} data-lenis-prevent
      className="fixed inset-0 z-[60] bg-[#07090D] text-[#ECEEF1] flex flex-col" onClick={onClose}>
      <div className="flex items-center justify-between px-5 md:px-8 h-16 shrink-0">
        <span className="cs-meta text-[#8B95A5]">{String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}</span>
        <button type="button" onClick={onClose} aria-label="Close" className="w-11 h-11 flex items-center justify-center bg-transparent text-[#ECEEF1]">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>
      </div>
      <div className="relative flex-1 min-h-0 flex items-center justify-center px-4 md:px-20" onClick={(e) => e.stopPropagation()}>
        <img src={item.imageUrl} alt={item.caption || ''} className="max-w-full max-h-full object-contain" />
        {items.length > 1 && (
          <>
            <button type="button" onClick={() => onMove(-1)} aria-label="Previous photo" className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-[#07090D]/60 border border-[rgba(236,238,241,0.2)] text-white">
              <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M15 8H2M7 3L2 8l5 5" /></svg>
            </button>
            <button type="button" onClick={() => onMove(1)} aria-label="Next photo" className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center bg-[#07090D]/60 border border-[rgba(236,238,241,0.2)] text-white">
              <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M1 8h13M9 3l5 5-5 5" /></svg>
            </button>
          </>
        )}
      </div>
      <div className="px-5 md:px-8 py-5 shrink-0 flex flex-wrap items-baseline gap-x-6 gap-y-1" onClick={(e) => e.stopPropagation()}>
        {item.caption && <span className="text-[16px]">{item.caption}</span>}
        <span className="cs-meta text-[#8B95A5]">{[item.album, fmt(item.date)].filter(Boolean).join(' · ')}</span>
      </div>
    </div>
  );
}

export default function GalleryPage() {
  const cached = readCache();
  const [items, setItems] = useState(cached || []);
  const [loading, setLoading] = useState(!cached);
  const [album, setAlbum] = useState('All');
  const [open, setOpen] = useState(-1);

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/gallery`)
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => { const list = Array.isArray(data) ? data : []; setItems(list); writeCache(list); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const albums = useMemo(() => ['All', ...Array.from(new Set(items.map((i) => i.album).filter(Boolean)))], [items]);
  const shown = album === 'All' ? items : items.filter((i) => i.album === album);
  const move = useCallback((d) => setOpen((i) => (i + d + shown.length) % shown.length), [shown.length]);
  const close = useCallback(() => setOpen(-1), []);

  return (
    <main className="cs-sans text-[#07090D]">
      <PageHero
        crumbs={[{ label: 'CyberSage', to: '/' }, { label: 'Gallery' }]}
        word="GALLERY"
        title="Life at CyberSage."
        intro="Our team, interns, events and the work behind the products."
      />

      <section className="relative s-paper overflow-hidden">
        <Guides />
        <div className={`${WRAP} relative py-14 md:py-20`}>
          {albums.length > 2 && (
            <nav aria-label="Albums" className="mb-10 flex flex-wrap gap-2">
              {albums.map((a) => (
                <button key={a} type="button" aria-pressed={album === a} onClick={() => setAlbum(a)}
                  className={`min-h-[44px] px-4 border text-[15px] transition-colors ${album === a ? 'bg-[#07090D] text-white border-[#07090D]' : 'bg-transparent text-[#3E4555] border-[rgba(7,9,13,0.2)] hover:border-[#07090D] hover:text-[#07090D]'}`}>
                  {a}
                </button>
              ))}
            </nav>
          )}

          {loading ? (
            <div aria-busy="true" aria-label="Loading photos" className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {[...Array(6)].map((_, i) => <div key={i} className={`bg-[#E6E9ED] ${i % 3 === 0 ? 'aspect-[4/5]' : 'aspect-[4/3]'}`} />)}
            </div>
          ) : shown.length === 0 ? (
            <div className="border-t border-[#07090D] pt-8 max-w-[56ch]">
              <p className="m-0 text-[18px]">Photos are on their way.</p>
              <p className="m-0 mt-2 text-[16px] text-[#3E4555]">In the meantime, meet the <Link to="/core-team" className="cs-link">core team</Link> or read about our <Link to="/training/internship" className="cs-link">internship programme</Link>.</p>
            </div>
          ) : (
            <ul className="m-0 p-0 list-none columns-2 md:columns-3 gap-3 md:gap-4">
              {shown.map((item, i) => (
                <li key={item._id || item.id || i} className="mb-3 md:mb-4 break-inside-avoid">
                  <button type="button" onClick={() => setOpen(i)} className="group block w-full text-left bg-transparent p-0">
                    <span className="block overflow-hidden bg-[#E6E9ED]">
                      <img src={item.imageUrl} alt={item.caption || ''} loading="lazy" className="w-full h-auto block transition-transform duration-500 ease-out group-hover:scale-[1.03]" />
                    </span>
                    {(item.caption || item.album || item.date) && (
                      <span className="block pt-2.5 pb-1">
                        {item.caption && <span className="block text-[15px] leading-snug">{item.caption}</span>}
                        <span className="block cs-meta text-[#5B6575] mt-1">{[item.album, fmt(item.date)].filter(Boolean).join(' · ')}</span>
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {open >= 0 && <Lightbox items={shown} index={open} onClose={close} onMove={move} />}
    </main>
  );
}
