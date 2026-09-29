import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PRODUCTS, SERVICE_GROUPS, COMPANY_LINKS, RESOURCE_LINKS } from '../../data/ecosystem';

const Arrow = ({ size = 14, className = 'cs-arrow' }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);
const Chevron = ({ open }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"
    style={{ transition: 'transform 200ms cubic-bezier(0.23,1,0.32,1)', transform: open ? 'rotate(180deg)' : 'none' }}>
    <path d="M6 9l6 6 6-6" />
  </svg>
);

const MENUS = [
  { key: 'products', label: 'Products', match: ['/products'] },
  { key: 'services', label: 'Services', match: ['/security-services', '/development-services', '/training'] },
  { key: 'company', label: 'Company', match: ['/about', '/core-team', '/contact'] },
  { key: 'resources', label: 'Resources', match: ['/blog', '/FAQ', '/demo-report'] },
];

function ProductsPanel({ onNavigate }) {
  return (
    <div className="flex gap-6">
      <div className="flex-1 grid grid-cols-2 gap-1">
        {PRODUCTS.map((p) => (
          <Link key={p.slug} to={`/products/${p.slug}`} onClick={onNavigate}
            className={`cs-menu-item rounded-md px-4 py-4 flex gap-1.5 transition-colors ${p.slug === 'brain' ? 'col-span-2 border border-[#2E3447] flex-row items-center justify-between' : 'flex-col'}`}>
            <span className="flex flex-col gap-1.5">
              <span className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-[2px]" style={{ background: p.color }} />
                <span className="cs-display text-[17px] font-semibold text-on-surface">{p.name}</span>
                <span className="cs-mono text-[11px] text-outline">{p.layer}</span>
              </span>
              <span className="text-[14px] leading-snug text-on-surface-variant">{p.line}</span>
            </span>
            {p.slug === 'brain' && <span className="text-primary"><Arrow size={18} className="" /></span>}
          </Link>
        ))}
      </div>
      <Link to="/#ecosystem" onClick={onNavigate} className="w-[300px] rounded-md bg-surface border border-surface-container-high p-5 flex flex-col gap-3 cs-hover-arrow">
        <span className="cs-display text-[21px] leading-tight font-semibold text-on-surface">One ecosystem. <span className="text-tertiary">Multiple capabilities.</span></span>
        <span className="text-[14px] leading-relaxed text-on-surface-variant">How the five platforms connect, from workspace to intelligence.</span>
        <span className="flex flex-col gap-1.5 mt-1" aria-hidden="true">
          {PRODUCTS.map((p, i) => (
            <span key={p.slug} className="block h-1.5 rounded-[2px]" style={{ background: p.color, width: `${[100, 86, 72, 58, 100][i]}%` }} />
          ))}
        </span>
        <span className="mt-auto flex items-center gap-2 text-[14px] font-semibold text-tertiary">Explore the ecosystem <Arrow /></span>
      </Link>
    </div>
  );
}

function ServicesPanel({ onNavigate }) {
  return (
    <div className="grid grid-cols-3 gap-8 px-2">
      {SERVICE_GROUPS.map((g) => (
        <div key={g.title} className="flex flex-col">
          <Link to={g.to} onClick={onNavigate} className="cs-hover-arrow flex items-center justify-between pb-3 mb-1 border-b border-outline-variant">
            <span className="cs-display text-[17px] font-semibold text-on-surface">{g.title}</span>
            <span className="text-outline"><Arrow /></span>
          </Link>
          {g.items.map((it) => (
            <Link key={it.to} to={it.to} onClick={onNavigate} className="cs-menu-item rounded px-2 -mx-2 py-2.5 text-[14.5px] text-on-surface-variant hover:text-on-surface transition-colors">{it.name}</Link>
          ))}
        </div>
      ))}
    </div>
  );
}

function ListPanel({ links, onNavigate }) {
  return (
    <div className="grid grid-cols-2 gap-1">
      {links.map((l) => (
        <Link key={l.to} to={l.to} onClick={onNavigate} className="cs-menu-item rounded-md px-4 py-3.5 flex flex-col gap-1 transition-colors">
          <span className="cs-display text-[16px] font-semibold text-on-surface">{l.name}</span>
          <span className="text-[13.5px] text-on-surface-variant">{l.note}</span>
        </Link>
      ))}
    </div>
  );
}

export default function SiteNav() {
  const location = useLocation();
  const [open, setOpen] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState('products');
  const closeTimer = useRef(null);
  const hoverAt = useRef(0);
  const navRef = useRef(null);

  // Close everything on route change
  useEffect(() => { setOpen(null); setMobileOpen(false); }, [location.pathname, location.hash]);

  // Escape + outside click
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') { setOpen(null); setMobileOpen(false); } };
    const onDown = (e) => { if (navRef.current && !navRef.current.contains(e.target)) setOpen(null); };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onDown);
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('mousedown', onDown); };
  }, []);

  const isActive = (m) => m.match.some((p) => location.pathname.startsWith(p));
  const hoverOpen = (key) => { clearTimeout(closeTimer.current); if (open !== key) hoverAt.current = Date.now(); setOpen(key); };
  // A click right after hover-open should keep the menu open, not toggle it shut
  const clickToggle = (key) => { if (open === key && Date.now() - hoverAt.current > 400) setOpen(null); else setOpen(key); };
  const hoverClose = () => { clearTimeout(closeTimer.current); closeTimer.current = setTimeout(() => setOpen(null), 120); };
  const close = () => setOpen(null);

  const panelFor = (key) => {
    if (key === 'products') return <ProductsPanel onNavigate={close} />;
    if (key === 'services') return <ServicesPanel onNavigate={close} />;
    if (key === 'company') return <ListPanel links={COMPANY_LINKS} onNavigate={close} />;
    return <ListPanel links={RESOURCE_LINKS} onNavigate={close} />;
  };
  const panelWidth = { products: 'w-[1040px]', services: 'w-[860px]', company: 'w-[560px]', resources: 'w-[560px]' };

  return (
    <header ref={navRef} className="fixed top-0 inset-x-0 z-50 bg-[#0c1324]/90 backdrop-blur-md border-b border-surface-container-high">
      <div className="max-w-[1440px] mx-auto h-[72px] px-4 md:px-8 lg:px-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 min-h-[44px]" aria-label="CyberSage home">
          <img src="/brand/emblem.png" alt="" className="w-9 h-9 object-contain" />
          <img src="/brand/wordmark.png" alt="CyberSage" className="h-[17px] w-auto object-contain" />
        </Link>

        {/* Desktop */}
        <nav className="hidden lg:flex items-center gap-0.5" aria-label="Primary" onMouseLeave={hoverClose}>
          {MENUS.map((m) => (
            <div key={m.key} className="relative" onMouseEnter={() => hoverOpen(m.key)}>
              <button type="button" className="cs-navlink flex items-center gap-1.5 min-h-[44px] px-3 text-[15px] font-medium text-on-surface bg-transparent"
                aria-expanded={open === m.key} aria-haspopup="true" data-active={isActive(m) ? 'true' : 'false'}
                onClick={() => clickToggle(m.key)}>
                {m.label} <Chevron open={open === m.key} />
              </button>
              <div className={`cs-pop absolute top-[calc(100%+12px)] ${m.key === 'products' ? '-left-40' : m.key === 'services' ? '-left-60' : '-left-4'} ${panelWidth[m.key]}`}
                data-open={open === m.key ? 'true' : 'false'}>
                <div className="rounded-lg border border-surface-container-highest bg-surface-container-low p-5 shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
                  {panelFor(m.key)}
                </div>
              </div>
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link to="/login" className="cs-press cs-btn-line hidden sm:inline-flex items-center min-h-[44px] px-4 rounded-md border border-transparent text-[15px] font-medium text-on-surface-variant">Client portal</Link>
          <Link to="/contact" className="cs-press cs-btn-blue hidden sm:inline-flex items-center min-h-[44px] px-5 rounded-md bg-primary-container text-white text-[15px] font-semibold">Book a demo</Link>
          <button type="button" className="lg:hidden w-11 h-11 rounded-md border border-outline-variant flex items-center justify-center text-on-surface"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'} aria-expanded={mobileOpen} onClick={() => setMobileOpen((o) => !o)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              {mobileOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile sheet */}
      <div className="cs-sheet lg:hidden absolute inset-x-0 top-[72px] h-[calc(100dvh-72px)] overflow-y-auto bg-[#0c1324] border-t border-surface-container-high px-4 pb-10"
        data-open={mobileOpen ? 'true' : 'false'}>
        {[
          { key: 'products', label: 'Products', links: PRODUCTS.map((p) => ({ name: p.name, to: `/products/${p.slug}`, note: p.line, color: p.color })) },
          { key: 'services', label: 'Services', links: SERVICE_GROUPS.flatMap((g) => [{ name: g.title, to: g.to, head: true }, ...g.items]) },
          { key: 'company', label: 'Company', links: COMPANY_LINKS },
          { key: 'resources', label: 'Resources', links: RESOURCE_LINKS },
        ].map((sec) => (
          <div key={sec.key} className="border-b border-surface-container-high">
            <button type="button" className="w-full flex items-center justify-between min-h-[56px] cs-display text-[20px] font-semibold text-on-surface"
              aria-expanded={mobileSection === sec.key} onClick={() => setMobileSection(mobileSection === sec.key ? null : sec.key)}>
              {sec.label} <Chevron open={mobileSection === sec.key} />
            </button>
            {mobileSection === sec.key && (
              <div className="pb-4 flex flex-col">
                {sec.links.map((l) => (
                  <Link key={l.to + l.name} to={l.to} className={`flex items-center gap-3 min-h-[44px] py-2 ${l.head ? 'mt-2 text-[13px] font-bold text-outline' : 'text-[16px] text-on-surface-variant'}`}>
                    {l.color && <span className="w-2 h-2 rounded-[2px]" style={{ background: l.color }} />}
                    {l.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
        <div className="flex flex-col gap-2 pt-6">
          <Link to="/contact" className="cs-press flex items-center justify-center min-h-[52px] rounded-md bg-primary-container text-white font-semibold">Book a demo</Link>
          <Link to="/login" className="cs-press flex items-center justify-center min-h-[52px] rounded-md border border-outline-variant text-on-surface">Client portal</Link>
        </div>
      </div>
    </header>
  );
}
