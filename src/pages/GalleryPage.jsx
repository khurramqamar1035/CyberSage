import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Guides } from '../components/site/ServiceTemplates';

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
    <div role="dialog" aria-modal="true" aria-label="Photo" data-lenis-prevent
      className="fixed inset-0 z-[60] bg-[#07090D] text-[#ECEEF1] flex flex-col" onClick={onClose}>
      <div className="flex items-center justify-between px-5 md:px-8 h-16 shrink-0">
        <span />
        <button type="button" onClick={onClose} aria-label="Close" className="w-11 h-11 flex items-center justify-center bg-transparent text-[#ECEEF1]">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>
      </div>
      <div className="relative flex-1 min-h-0 flex items-center justify-center px-4 md:px-20" onClick={(e) => e.stopPropagation()}>
        <img src={item.imageUrl} alt="" className="max-w-full max-h-full object-contain" />
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
      <div className="h-10 shrink-0" />
    </div>
  );
}

export default function GalleryPage() {
  const cached = readCache();
  const [items, setItems] = useState(cached || []);
  const [loading, setLoading] = useState(!cached);
  const [open, setOpen] = useState(-1);

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/gallery`)
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => { const list = Array.isArray(data) ? data : []; setItems(list); writeCache(list); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const shown = items;
  const move = useCallback((d) => setOpen((i) => (i + d + shown.length) % shown.length), [shown.length]);
  const close = useCallback(() => setOpen(-1), []);

  return (
    <main className="cs-sans text-[#07090D]">
      <section className="relative s-black tx-grain overflow-hidden text-[#ECEEF1]">
        <Guides dark />
        <div className={`${WRAP} relative pt-10 md:pt-14 pb-12 md:pb-16`}>
          <nav aria-label="Breadcrumb" className="cs-meta text-[#5B6575] flex items-center gap-2.5">
            <Link to="/" className="hover:text-[#ECEEF1] transition-colors">CyberSage</Link><span aria-hidden="true">/</span>
            <span aria-current="page" className="text-[#ECEEF1]">Gallery</span>
          </nav>
          <h1 className="m-0 mt-8 t-expanded font-[200] leading-[0.8] tracking-[-0.03em] text-[40px] sm:text-[64px] lg:text-[88px]">GALLERY</h1>
        </div>
      </section>

      <section className="relative s-paper overflow-hidden">
        <Guides />
        <div className={`${WRAP} relative py-14 md:py-20`}>
          {loading ? (
            <div aria-busy="true" aria-label="Loading photos" className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {[...Array(6)].map((_, i) => <div key={i} className={`bg-[#E6E9ED] ${i % 3 === 0 ? 'aspect-[4/5]' : 'aspect-[4/3]'}`} />)}
            </div>
          ) : shown.length === 0 ? (
            <p className="m-0 border-t border-[#07090D] pt-8 text-[16px] text-[#3E4555]">No photos yet.</p>
          ) : (
            <ul className="m-0 p-0 list-none columns-2 md:columns-3 gap-3 md:gap-4">
              {shown.map((item, i) => (
                <li key={item._id || item.id || i} className="mb-3 md:mb-4 break-inside-avoid">
                  <button type="button" onClick={() => setOpen(i)} className="group block w-full text-left bg-transparent p-0">
                    <span className="block overflow-hidden bg-[#E6E9ED]">
                      <img src={item.imageUrl} alt="" loading="lazy" className="w-full h-auto block transition-transform duration-500 ease-out group-hover:scale-[1.03]" />
                    </span>
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
