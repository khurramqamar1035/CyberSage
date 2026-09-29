import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS, SERVICE_GROUPS } from '../data/ecosystem';
import EcosystemOrbit from '../components/site/EcosystemOrbit';
import Reveal from '../components/site/Reveal';

const BACKEND_URL = process.env.REACT_APP_API_URL || process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001';

// ── Simple localStorage cache helpers ─────────────────────────────────────
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

function readCache(key) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const { data, ts } = JSON.parse(raw);
    if (Date.now() - ts > CACHE_TTL) { localStorage.removeItem(key); return null; }
    return data;
  } catch { return null; }
}

function writeCache(key, data) {
  try { localStorage.setItem(key, JSON.stringify({ data, ts: Date.now() })); } catch {}
}

const Arrow = ({ size = 16 }) => (
  <svg className="cs-arrow" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);

const LandingPage = () => {
  // Seed from cache immediately so data shows on first paint
  const [testimonials, setTestimonials] = useState(() => readCache('cs_testimonials') || []);
  const [clients, setClients] = useState(() => readCache('cs_clients') || []);

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/testimonials`)
      .then((res) => res.json())
      .then((data) => { const list = Array.isArray(data) ? data : []; setTestimonials(list); writeCache('cs_testimonials', list); })
      .catch(() => {});

    fetch(`${BACKEND_URL}/api/clients`)
      .then((res) => res.json())
      .then((data) => { const list = Array.isArray(data) ? data : []; setClients(list); writeCache('cs_clients', list); })
      .catch(() => {});

    // Warm up core team in background so CoreTeamPage loads instantly
    fetch(`${BACKEND_URL}/api/about/team`)
      .then((res) => res.json())
      .then((data) => { if (Array.isArray(data)) writeCache('cs_team', data); })
      .catch(() => {});
  }, []);

  return (
    <main className="relative overflow-x-hidden">
      <div className="cs-grid-bg absolute inset-x-0 top-0 h-[900px] opacity-50 pointer-events-none" aria-hidden="true" />

      {/* ── Hero ── */}
      <section className="relative max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 pt-12 lg:pt-16 flex flex-col lg:flex-row items-center gap-10">
        <div className="flex-1 flex flex-col w-full">
          <h1 className="cs-display font-semibold tracking-[-0.045em] leading-[0.96] text-[52px] sm:text-[72px] xl:text-[96px]">
            <span className="cs-rise cs-d1 block">One ecosystem.</span>
            <span className="cs-rise cs-d2 block text-primary">Multiple</span>
            <span className="cs-rise cs-d3 block text-primary">capabilities.</span>
          </h1>
          <p className="cs-rise cs-d4 mt-8 max-w-[560px] text-[18px] sm:text-[20px] leading-relaxed text-on-surface-variant">
            From everyday collaboration and education to hands-on cyber training and autonomous security operations, CyberSage builds intelligent platforms designed to work together.
          </p>
          <div className="cs-rise cs-d5 mt-9 flex flex-wrap gap-3">
            <Link to="/contact" className="cs-press cs-btn-blue cs-hover-arrow inline-flex items-center gap-2.5 min-h-[54px] px-6 rounded-md bg-primary-container text-white text-[16px] font-semibold">Book a demo <Arrow /></Link>
            <a href="#ecosystem" className="cs-press cs-btn-line inline-flex items-center min-h-[54px] px-5 rounded-md border border-outline-variant text-[16px] font-medium">How it connects</a>
          </div>
        </div>
        <EcosystemOrbit />
      </section>

      {/* ── Product rail ── */}
      <nav aria-label="Platforms" className="relative max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 mt-12 lg:mt-16">
        <div className="border-t border-outline-variant grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
          {PRODUCTS.map((p, i) => (
            <Link key={p.slug} to={`/products/${p.slug}`}
              className={`cs-rise cs-d6 cs-hover-arrow group flex flex-col gap-2.5 py-6 border-b lg:border-b-0 border-surface-container-high ${i < 4 ? 'lg:border-r lg:pr-6' : ''} ${i > 0 ? 'lg:pl-6' : ''}`}>
              <span className="flex justify-between items-center"><span className="cs-mono text-[12px] text-outline">{p.num} {p.layer}</span><span className="text-primary"><Arrow /></span></span>
              <span className="cs-display text-[25px] font-semibold tracking-tight">{p.name}</span>
              <span className="text-[15px] leading-snug text-on-surface-variant">{p.line}</span>
              <span className="h-0.5 w-8" style={{ background: p.color }} />
            </Link>
          ))}
        </div>
      </nav>

      {/* ── Ecosystem hierarchy ── */}
      <section id="ecosystem" className="scroll-mt-24 max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 pt-28 lg:pt-36 flex flex-col lg:flex-row gap-12 lg:gap-14">
        <Reveal className="lg:w-[380px] flex flex-col gap-5">
          <h2 className="cs-display text-[40px] lg:text-[50px] leading-[1.02] font-semibold tracking-[-0.035em]">From workspace to intelligence.</h2>
          <p className="text-[18px] leading-relaxed text-on-surface-variant">Each layer adds a capability. Sage Brain sits underneath all of them, reading signals and sending context back up. Start with one platform and add the rest when you need them.</p>
        </Reveal>
        <div className="flex-1 relative">
          <svg className="hidden xl:block absolute right-0 top-0" width="110" height="500" viewBox="0 0 110 500" fill="none" aria-hidden="true">
            <path className="cs-flow" d="M40 440 V 40" stroke="#44D8F1" strokeWidth="1.5" strokeDasharray="4 6" />
            <path d="M32 50 L40 38 L48 50" stroke="#44D8F1" strokeWidth="1.5" />
            <text x="62" y="240" fill="#8D90A0" fontFamily="IBM Plex Mono, monospace" fontSize="12" transform="rotate(90 62 240)" textAnchor="middle">signals and context</text>
          </svg>
          <div className="flex flex-col gap-2.5 xl:pr-28">
            {PRODUCTS.map((p, i) => {
              const brain = p.slug === 'brain';
              return (
                <Reveal key={p.slug} delay={i * 70} className={['', 'xl:ml-12', 'xl:ml-24', 'xl:ml-36', 'xl:mt-3'][i]}>
                  <Link to={`/products/${p.slug}`}
                    className={`cs-lift flex items-center gap-4 sm:gap-5 px-5 sm:px-6 rounded-lg border ${brain ? 'py-7 bg-primary-container border-primary-container text-white xl:max-w-[844px]' : 'py-5 bg-surface-container-low border-surface-container-high xl:max-w-[700px]'}`}>
                    <span className={`cs-mono w-6 text-[12px] ${brain ? 'text-primary-fixed' : 'text-outline'}`}>{p.num}</span>
                    {brain ? <img src="/brand/emblem.png" alt="" className="w-[22px] h-[22px] object-contain" /> : <span className="w-2.5 h-2.5 rounded-[2px]" style={{ background: p.color }} />}
                    <span className="cs-display w-[150px] sm:w-[190px] text-[19px] sm:text-[21px] font-semibold">{p.name}</span>
                    <span className={`hidden sm:block text-[15px] ${brain ? 'text-[#EEEFFF]' : 'text-on-surface-variant'}`}>{p.short}</span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Services (from the live site) ── */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 pt-28 lg:pt-36 flex flex-col lg:flex-row gap-12 lg:gap-16">
        <Reveal className="lg:w-[360px] flex flex-col gap-4">
          <h2 className="cs-display text-[36px] lg:text-[44px] leading-[1.05] font-semibold tracking-[-0.03em]">Services, alongside the platforms.</h2>
          <p className="text-[16px] leading-relaxed text-on-surface-variant">Our consultants still take on hands-on security, development and training engagements. Many clients start here and move onto a platform.</p>
        </Reveal>
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {SERVICE_GROUPS.map((g, gi) => (
            <Reveal key={g.title} delay={gi * 80} className="flex flex-col">
              <Link to={g.to} className="cs-hover-arrow flex items-center justify-between pb-3.5 border-b border-outline-variant">
                <span className="cs-display text-[20px] font-semibold">{g.title}</span><span className="text-outline"><Arrow size={14} /></span>
              </Link>
              {g.items.map((it) => (
                <Link key={it.to} to={it.to} className="cs-hover-arrow flex items-center justify-between py-3.5 border-b border-surface-container-high text-[15px] text-on-surface-variant hover:text-on-surface transition-colors">
                  {it.name}<span className="text-outline"><Arrow size={14} /></span>
                </Link>
              ))}
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Origin (from the live site) ── */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 pt-28 lg:pt-36">
        <Reveal className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-surface-container-highest">
            <img
              alt="Server room with blue ambient lighting"
              className="w-full h-full object-cover grayscale opacity-80"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuChfg-CdjjDpS1V3Svxlir1JeTLMiHW3_hSB04KZupS0bfaHH6j2JbNo6XBqaGQHUBqVJXMxF6HZb_RRAbRntT0LSogZyyQdiDG22jTcr3wHD1Byq5cDcZxAJrwMZ4YQ9fNulESpaFM4210qwWz199Zee8_4IrykD95rJh82mqsl7n5tQICal_O0s_icHMHHvwgip69B-RuotebJYrQDXblW_QnPd7CIzsvYwiWAAXGWtSYSfjvhCNDjUjfNETILm6bM5kBWoMuNuY"
              loading="lazy"
            />
            <img src="/brand/emblem.png" alt="" className="absolute right-6 bottom-6 w-16 h-16 object-contain opacity-90" />
          </div>
          <div className="flex flex-col gap-6">
            <h2 className="cs-display text-[36px] lg:text-[48px] leading-[1.02] font-semibold tracking-[-0.035em]">Built by practitioners, for the people who defend.</h2>
            <p className="text-[18px] leading-relaxed text-on-surface-variant">Founded by a collective of security researchers and developers, CyberSage was born from a single mission: to restore digital autonomy to organisations operating in an era of unprecedented cyber fragility.</p>
            <p className="text-[18px] leading-relaxed text-on-surface-variant">We don&rsquo;t just patch systems; we rebuild the philosophy of protection, with a relentless pursuit of technical quality and integrity.</p>
            <div className="flex flex-wrap gap-2">
              {['CEH', 'CHFI', 'MSc Cyber Security', 'Digital Forensics'].map((c) => (
                <span key={c} className="cs-mono px-2.5 py-1.5 rounded bg-surface-container border border-surface-container-highest text-[12px]">{c}</span>
              ))}
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link to="/core-team" className="cs-press cs-btn-line inline-flex items-center min-h-[50px] px-5 rounded-md border border-outline-variant font-medium">Meet the core team</Link>
              <Link to="/about" className="cs-press cs-hover-arrow inline-flex items-center gap-2 min-h-[50px] px-2 font-medium text-tertiary">About us <Arrow size={14} /></Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── Clients & partners (live data) ── */}
      {clients.length > 0 && (
        <section className="pt-28 lg:pt-36">
          <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 mb-8">
            <h2 className="cs-display text-[28px] font-semibold tracking-tight">Trusted by our clients and partners</h2>
          </div>
          <div className="cs-fade-x overflow-hidden">
            <div className="cs-marquee flex gap-4 w-max px-4">
              {[...clients, ...clients].map((client, idx) => (
                <div key={idx} className="shrink-0 w-52 h-28 rounded-lg bg-surface-container-low border border-surface-container-high p-5 flex items-center justify-center" aria-hidden={idx >= clients.length}>
                  {client.logo
                    ? <img src={client.logo} alt={client.name} className="max-w-full max-h-full object-contain" loading="lazy" />
                    : <p className="cs-display text-lg font-semibold text-center">{client.name}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Testimonials (live data) ── */}
      {testimonials.length > 0 && (
        <section className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 pt-28 lg:pt-36">
          <h2 className="cs-display text-[36px] lg:text-[44px] leading-[1.05] font-semibold tracking-[-0.03em] mb-10">What our clients say</h2>
          <div className="columns-1 md:columns-2 lg:columns-3 gap-5">
            {testimonials.map((t, idx) => (
              <Reveal key={idx} delay={(idx % 3) * 80} className="break-inside-avoid mb-5">
                <figure className="rounded-lg bg-surface-container-low border border-surface-container-high p-7 flex flex-col gap-6">
                  {t.rating ? <div className="cs-mono text-[12px] text-secondary" aria-label={`${t.rating} out of 5`}>{'★'.repeat(t.rating)}<span className="text-outline-variant">{'★'.repeat(5 - t.rating)}</span></div> : null}
                  <blockquote className="text-[17px] leading-relaxed text-on-surface">&ldquo;{t.content}&rdquo;</blockquote>
                  <figcaption className="pt-5 border-t border-surface-container-high">
                    <div className="font-semibold">{t.name}</div>
                    <div className="text-[14px] text-outline">{t.role}{t.company && `, ${t.company}`}</div>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 pt-28 lg:pt-36 pb-24">
        <Reveal className="relative overflow-hidden rounded-lg bg-surface-container-low border border-surface-container-high px-6 py-10 sm:px-14 sm:py-12 flex flex-col lg:flex-row gap-8 lg:items-center justify-between">
          <img src="/brand/emblem.png" alt="" className="absolute right-[30%] -top-16 w-72 h-72 object-contain opacity-[0.05] pointer-events-none" />
          <div className="relative flex flex-col gap-2.5">
            <h2 className="cs-display text-[32px] lg:text-[40px] leading-[1.05] font-semibold tracking-[-0.03em]">See the ecosystem on your own data.</h2>
            <p className="text-[17px] text-on-surface-variant">A 30-minute walkthrough of the platforms that matter to you.</p>
          </div>
          <div className="relative flex flex-wrap gap-3">
            <Link to="/contact" className="cs-press cs-btn-blue inline-flex items-center min-h-[54px] px-6 rounded-md bg-primary-container text-white font-semibold">Book a demo</Link>
            <Link to="/contact" className="cs-press cs-btn-line inline-flex items-center min-h-[54px] px-5 rounded-md border border-outline-variant font-medium">Contact sales</Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
};

export default LandingPage;
