import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import ProductMark from './ProductMark';
import { PRODUCTS, SERVICE_GROUPS, COMPANY_LINKS, RESOURCE_LINKS} from '../../data/ecosystem';

const Chevron = ({ open }) => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"
    style={{ transition: 'transform 180ms cubic-bezier(0.23,1,0.32,1)', transform: open ? 'rotate(180deg)' : 'none' }}>
    <path d="M6 9l6 6 6-6" />
  </svg>
);

const MENUS = [
  { key: 'products', label: 'Products', match: ['/products'] },
  { key: 'services', label: 'Services', match: ['/security-services', '/development-services', '/training'] },
  { key: 'company', label: 'Company', match: ['/about', '/core-team', '/contact'] },
  { key: 'resources', label: 'Resources', match: ['/blog', '/FAQ', '/demo-report'] },
];

function ProductsPanel({ onNavigate, light }) {
  const muted = light ? 'text-[#5F6676]' : 'text-[#8B95A5]';
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_260px] gap-6">
      <ul className="m-0 p-0 list-none">
        {PRODUCTS.map((p) => (
          <li key={p.slug}>
            <Link to={`/products/${p.slug}`} onClick={onNavigate}
              className={`${light ? 'cs-menu-item' : 'cs-menu-item-dark'} grid grid-cols-[150px_minmax(0,1fr)] gap-4 items-baseline px-3 py-3 rounded-[1px] transition-colors`}>
              <span className="flex items-center gap-2.5 text-[15px] font-semibold"><ProductMark slug={p.slug} size={20} accent={light ? '#2563EB' : '#2563EB'} />{p.name}</span>
              <span className={`text-[14px] ${muted}`}>{p.line}</span>
            </Link>
          </li>
        ))}
      </ul>
      <Link to="/#platform" onClick={onNavigate} className={`rounded-[1px] p-4 flex flex-col gap-2 border ${light ? 'border-[#DCE0E7] bg-[#F5F6F8]' : 'border-[#1E2430] bg-[#0E1117]'}`}>
        <span className="text-[15px] font-semibold">How the platform fits together</span>
        <span className={`text-[14px] leading-relaxed ${muted}`}>Sentinel detects, Brain decides, and Nexus, Education and Vault put it to work.</span>
        <span className={`mt-auto text-[14px] font-medium ${light ? 'text-[#1D4ED8]' : 'text-[#A9B8D0]'}`}>See how it fits</span>
      </Link>
    </div>
  );
}

function ServicesPanel({ onNavigate, light }) {
  return (
    <div className="grid grid-cols-3 gap-8 px-1">
      {SERVICE_GROUPS.map((g) => (
        <div key={g.title} className="flex flex-col">
          <Link to={g.to} onClick={onNavigate} className={`pb-2.5 mb-1 text-[15px] font-semibold border-b ${light ? 'border-[#DCE0E7]' : 'border-[#1E2430]'}`}>{g.title}</Link>
          {g.items.map((it) => (
            <Link key={it.to} to={it.to} onClick={onNavigate} className={`py-2 text-[14px] transition-colors ${light ? 'text-[#3E4555] hover:text-[#0E1117]' : 'text-[#A9B8D0] hover:text-white'}`}>{it.name}</Link>
          ))}
        </div>
      ))}
    </div>
  );
}

function ListPanel({ links, onNavigate, light }) {
  return (
    <ul className="m-0 p-0 list-none">
      {links.map((l) => (
        <li key={l.to}>
          <Link to={l.to} onClick={onNavigate} className={`${light ? 'cs-menu-item' : 'cs-menu-item-dark'} flex flex-col gap-0.5 px-3 py-2.5 rounded-[1px] transition-colors`}>
            <span className="text-[15px] font-semibold">{l.name}</span>
            <span className={`text-[13px] ${light ? 'text-[#5F6676]' : 'text-[#8B95A5]'}`}>{l.note}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function SiteNav() {
  const location = useLocation();
  const light = false; // the bar is black on every page
  const reduce = useReducedMotion();
  const [hover, setHover] = useState(null);
  const [open, setOpen] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState(null);
  const closeTimer = useRef(null);
  const hoverAt = useRef(0);
  const navRef = useRef(null);

  useEffect(() => { setOpen(null); setMobileOpen(false); }, [location.pathname, location.hash]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') { setOpen(null); setMobileOpen(false); } };
    const onDown = (e) => { if (navRef.current && !navRef.current.contains(e.target)) setOpen(null); };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onDown);
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('mousedown', onDown); };
  }, []);

  // Lock page scroll behind the mobile menu
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const isActive = (m) => m.match.some((p) => location.pathname.startsWith(p));
  const hoverOpen = (key) => { clearTimeout(closeTimer.current); if (open !== key) hoverAt.current = Date.now(); setOpen(key); };
  const hoverClose = () => { clearTimeout(closeTimer.current); closeTimer.current = setTimeout(() => setOpen(null), 140); };
  // A click right after a hover-open keeps the menu open instead of toggling it shut
  const clickToggle = (key) => { if (open === key && Date.now() - hoverAt.current > 400) setOpen(null); else setOpen(key); };
  const close = () => setOpen(null);

  const panelFor = (key) => {
    const props = { onNavigate: close, light };
    if (key === 'products') return <ProductsPanel {...props} />;
    if (key === 'services') return <ServicesPanel {...props} />;
    if (key === 'company') return <ListPanel links={COMPANY_LINKS} {...props} />;
    return <ListPanel links={RESOURCE_LINKS} {...props} />;
  };
  const panelPos = { products: 'w-[760px] -left-24', services: 'w-[680px] -left-40', company: 'w-[320px] -left-4', resources: 'w-[320px] -left-4' };

  const bar = light ? 'bg-white/95 border-[#E6E9EF] text-[#0E1117]' : 'bg-[#07090D]/95 border-[#171C26] text-[#ECEEF1]';
  const panel = light ? 'bg-white border-[#DCE0E7] text-[#0E1117] shadow-[0_12px_32px_rgba(12,19,36,0.10)]' : 'bg-[#0E1117] border-[#1E2430] text-[#ECEEF1] shadow-[0_12px_32px_rgba(0,0,0,0.4)]';

  return (
    <header ref={navRef} className={`cs-sans fixed top-0 inset-x-0 z-50 border-b backdrop-blur-sm ${bar}`}>
      <div className="max-w-[1400px] mx-auto h-16 px-6 md:px-10 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 min-h-[44px]" aria-label="CyberSage home">
          <img src={light ? '/brand/emblem-ink.png' : '/brand/emblem.png'} alt="" className="w-8 h-8 object-contain" />
          <img src={light ? '/brand/wordmark-ink.png' : '/brand/wordmark.png'} alt="CyberSage" className="h-[15px] w-auto object-contain" />
        </Link>

        <nav className="hidden lg:flex items-center" aria-label="Primary" onMouseLeave={() => { hoverClose(); setHover(null); }}>
          {MENUS.map((m) => (
            <div key={m.key} className="relative" onMouseEnter={() => { hoverOpen(m.key); setHover(m.key); }}>
              <button type="button" onClick={() => clickToggle(m.key)} aria-expanded={open === m.key} aria-haspopup="true" aria-current={isActive(m) ? 'page' : undefined}
                className={`relative flex items-center gap-1.5 h-16 px-3.5 text-[14.5px] bg-transparent transition-colors ${light ? 'text-[#0E1117]' : 'text-[#ECEEF1]'}`}>
                {/* active section: a small system marker, not just an underline */}
                {isActive(m) && <span className={`w-1 h-1 ${light ? 'bg-[#2563EB]' : 'bg-[#2563EB]'}`} aria-hidden="true" />}
                {m.label} <Chevron open={open === m.key} />
                {(open || hover || (MENUS.find(isActive) || {}).key) === m.key && (
                  <motion.span layoutId="nav-indicator" aria-hidden="true" className={`absolute left-3 right-3 bottom-3 h-px ${light ? 'bg-[#0E1117]' : 'bg-[#ECEEF1]'}`}
                    transition={reduce ? { duration: 0 } : { type: 'spring', bounce: 0, duration: 0.35 }} />
                )}
              </button>
              <div className={`cs-pop absolute top-full mt-px ${panelPos[m.key]}`} data-open={open === m.key ? 'true' : 'false'}>
                <div className={`rounded-[1px] border p-3 ${panel}`}>{panelFor(m.key)}</div>
              </div>
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link to="/login" className={`hidden sm:inline-flex items-center min-h-[40px] px-3 text-[15px] ${light ? 'text-[#3E4555] hover:text-[#0E1117]' : 'text-[#A9B8D0] hover:text-white'}`}>Client portal</Link>
          <Link to="/contact" className="cs-btn cs-btn-primary hidden sm:inline-flex !min-h-[38px] !px-4">Book a demo<svg className="cs-btn-arrow" width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M2 8h11M9 4l4 4-4 4" /></svg></Link>
          <button type="button" onClick={() => setMobileOpen((o) => !o)} aria-label={mobileOpen ? 'Close menu' : 'Open menu'} aria-expanded={mobileOpen}
            className={`lg:hidden w-11 h-11 -mr-2 flex items-center justify-center bg-transparent ${light ? 'text-[#0E1117]' : 'text-[#ECEEF1]'}`}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
              {mobileOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile: products first, as a direct list; everything else in disclosures */}
      <div data-lenis-prevent className={`cs-sheet lg:hidden absolute inset-x-0 top-16 h-[calc(100dvh-64px)] overflow-y-auto border-t px-5 pb-10 ${light ? 'bg-white border-[#E6E9EF]' : 'bg-[#07090D] border-[#171C26]'}`}
        data-open={mobileOpen ? 'true' : 'false'}>
        <div className={`pt-5 pb-2 text-[13px] ${light ? 'text-[#5F6676]' : 'text-[#8B95A5]'}`}>Products</div>
        <ul className="m-0 p-0 list-none">
          {PRODUCTS.map((p) => (
            <li key={p.slug}>
              <Link to={`/products/${p.slug}`} className="flex flex-col py-3 border-b border-current/10" style={{ borderColor: light ? '#EEF0F3' : '#171C26' }}>
                <span className="text-[18px] font-semibold">{p.name}</span>
                <span className={`text-[14px] ${light ? 'text-[#5F6676]' : 'text-[#8B95A5]'}`}>{p.line}</span>
              </Link>
            </li>
          ))}
        </ul>
        {[
          { key: 'services', label: 'Services', links: SERVICE_GROUPS.flatMap((g) => [{ name: g.title, to: g.to, head: true }, ...g.items]) },
          { key: 'company', label: 'Company', links: COMPANY_LINKS },
          { key: 'resources', label: 'Resources', links: RESOURCE_LINKS },
        ].map((sec) => (
          <div key={sec.key} className="border-b" style={{ borderColor: light ? '#EEF0F3' : '#171C26' }}>
            <button type="button" aria-expanded={mobileSection === sec.key} onClick={() => setMobileSection(mobileSection === sec.key ? null : sec.key)}
              className="w-full flex items-center justify-between min-h-[56px] text-[18px] font-semibold bg-transparent text-current">
              {sec.label} <Chevron open={mobileSection === sec.key} />
            </button>
            {mobileSection === sec.key && (
              <div className="pb-3 flex flex-col">
                {sec.links.map((l) => (
                  <Link key={l.to + l.name} to={l.to} className={`min-h-[44px] flex items-center ${l.head ? 'mt-2 text-[13px] font-semibold' : `text-[16px] ${light ? 'text-[#3E4555]' : 'text-[#A9B8D0]'}`}`}>{l.name}</Link>
                ))}
              </div>
            )}
          </div>
        ))}
        <div className="grid grid-cols-2 gap-2 pt-6">
          <Link to="/contact" className="cs-btn cs-btn-primary">Book a demo</Link>
          <Link to="/login" className={`cs-btn ${light ? 'cs-btn-secondary' : 'cs-btn-ghost-dark'}`}>Client portal</Link>
        </div>
      </div>
    </header>
  );
}
