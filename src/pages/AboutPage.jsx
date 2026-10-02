import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion, useReducedMotion } from 'framer-motion';
import { PRODUCTS, SERVICE_GROUPS, PRINCIPLES } from '../data/ecosystem';
import { Guides } from '../components/site/ServiceTemplates';
import { Reveal, MagneticLink } from '../components/site/motion';
import InternVoices from '../components/site/InternVoices';
import { loadContent, published } from '../lib/content';

const BACKEND_URL = process.env.REACT_APP_API_URL || process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001';
const WRAP = 'max-w-[1400px] mx-auto px-6 md:px-10';
const EASE = [0.23, 1, 0.32, 1];

const Arrow = ({ size = 18 }) => (
  <svg className="cs-btn-arrow shrink-0" width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true"><path d="M1 8h13M9 3l5 5-5 5" /></svg>
);

const fmtDate = (iso) => {
  if (!iso) return '';
  const d = new Date(`${iso}T00:00:00`);
  return Number.isNaN(d.getTime()) ? '' : d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
};

// Latest internship cohort, worked out from the published certificates (nothing typed in by hand).
function useLatestCohort() {
  const [certs, setCerts] = useState([]);
  useEffect(() => { loadContent('certificates').then(setCerts).catch(() => {}); }, []);
  return useMemo(() => {
    if (!certs.length) return null;
    const latestTo = certs.map((c) => c.to || '').sort().pop();
    const group = certs.filter((c) => (c.to || '') === latestTo);
    const from = group.map((c) => c.from || '').filter(Boolean).sort()[0];
    return {
      from, to: latestTo,
      completed: group.filter((c) => c.type !== 'best').length,
      best: group.filter((c) => c.type === 'best').length,
    };
  }, [certs]);
}

function useGalleryPreview() {
  const [items, setItems] = useState([]);
  useEffect(() => { loadContent('gallery').then((l) => setItems(published(l).slice(0, 6))).catch(() => {}); }, []);
  return items;
}

export default function AboutPage() {
  const reduce = useReducedMotion();
  const [offices, setOffices] = useState([]);
  const cohort = useLatestCohort();
  const photos = useGalleryPreview();

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/about/offices`)
      .then((r) => setOffices(Array.isArray(r.data) ? r.data : []))
      .catch(() => {});
  }, []);

  return (
    <main className="cs-sans text-k">
      {/* ── Who we are ── */}
      <section className="relative s-black tx-grain overflow-hidden text-off">
        <Guides dark />
        <div className={`${WRAP} relative pt-12 md:pt-16 pb-16 md:pb-24`}>
          <nav aria-label="Breadcrumb" className="cs-meta text-dim flex items-center gap-2.5">
            <Link to="/" className="hover:text-off transition-colors">CyberSage</Link><span aria-hidden="true">/</span>
            <span aria-current="page" className="text-off">About</span>
          </nav>

          <div className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
            <div className="md:col-span-7">
              <motion.h1 className="m-0 t-wide font-[250] text-[40px] sm:text-[56px] lg:text-[72px] leading-[0.98] tracking-[-0.035em] max-w-[14ch]"
                initial={reduce ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: EASE }}>
                Intelligence. Simulation. Resilience.
              </motion.h1>
              <motion.p className="mt-7 mb-0 text-[17px] md:text-[18px] leading-relaxed text-cold max-w-[56ch]"
                initial={reduce ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.15, ease: EASE }}>
                CyberSage is a cybersecurity technology company. We build five products that work as one platform, for organisations, institutions and the people who defend them. Alongside the products, our consultants take on hands-on security, development and training engagements.
              </motion.p>
              <div className="mt-9 flex flex-wrap gap-3">
                <MagneticLink to="/products" variant="on-dark">Explore the products</MagneticLink>
                <Link to="/core-team" className="cs-btn cs-btn-ghost-dark">Meet the team</Link>
              </div>
            </div>
            <motion.div className="md:col-span-5 flex justify-center md:justify-end relative" aria-hidden="true"
              initial={reduce ? false : { opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.4, delay: 0.1, ease: EASE }}>
              <div className="absolute top-1/2 -translate-y-1/2 w-[300px] md:w-[420px] aspect-square rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.24),transparent_62%)] blur-2xl" />
              <img src="/brand/emblem-light.svg" alt="" className="relative w-[200px] sm:w-[260px] md:w-[320px] lg:w-[400px] h-auto" />
            </motion.div>
          </div>

          {/* Facts, all counted from the site's own data */}
          <dl className="mt-16 md:mt-20 m-0 grid grid-cols-2 md:grid-cols-4 border-t border-[rgba(236,238,241,0.18)]">
            {[
              { n: PRODUCTS.length, l: 'Products, one platform' },
              { n: SERVICE_GROUPS.length, l: 'Service lines' },
              { n: cohort ? cohort.completed : '—', l: 'Interns certified, latest cohort' },
              { n: cohort ? cohort.best : '—', l: 'Best Performer awards' },
            ].map((f, i) => (
              <div key={f.l} className={`flex flex-col-reverse justify-end pt-6 pb-2 pr-4 border-[rgba(236,238,241,0.18)] ${i % 2 === 1 ? 'border-l pl-6' : ''} ${i === 2 ? 'md:border-l md:pl-6' : ''}`}>
                <dt className="mt-3 cs-meta text-steel">{f.l}</dt>
                <dd className="m-0 t-expanded font-[200] text-[48px] md:text-[64px] leading-none tracking-[-0.04em]">{f.n}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── The platform ── */}
      <section className="relative s-paper tx-dot overflow-hidden">
        <Guides />
        <div className={`${WRAP} relative py-16 md:py-24`}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <Reveal className="lg:col-span-7">
              <div className="cs-meta text-dim">What we build</div>
              <h2 className="m-0 mt-4 t-wide font-[250] text-[34px] sm:text-[46px] lg:text-[58px] leading-[1.0] tracking-[-0.035em] max-w-[16ch]">One ecosystem. Multiple capabilities.</h2>
            </Reveal>
            <Reveal className="lg:col-span-4 lg:col-start-9" delay={0.1}>
              <p className="m-0 text-[16px] leading-relaxed text-edge-strong">From the workspace people use every day to the intelligence that watches over it, each product does one job and hands its signals to the next.</p>
            </Reveal>
          </div>

          <ol className="m-0 mt-12 md:mt-16 p-0 list-none border-t border-k">
            {PRODUCTS.map((p, i) => (
              <li key={p.slug}>
                <Reveal delay={i * 0.05}>
                  <Link to={`/products/${p.slug}`} className="cs-row-link group relative grid grid-cols-[auto_1fr_auto] md:grid-cols-[56px_180px_minmax(0,1fr)_minmax(0,1.2fr)_auto] gap-x-5 md:gap-x-8 gap-y-1 items-center py-6 md:py-7 border-b border-[rgba(7,9,13,0.14)] overflow-hidden">
                    <span aria-hidden="true" className="absolute inset-y-0 left-0 w-[3px] origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-300" style={{ background: p.key }} />
                    <span className="cs-meta text-dim pl-3">{String(i + 1).padStart(2, '0')}</span>
                    <span className="hidden md:block cs-meta" style={{ color: p.key }}>{p.role}</span>
                    <span className="cs-row-title t-wide font-[300] text-[26px] md:text-[34px] leading-[1.05] tracking-[-0.03em] transition-colors">{p.name}</span>
                    <span className="hidden md:block text-[15px] text-edge-strong leading-snug">{p.line}</span>
                    <Arrow />
                    <span className="md:hidden col-start-2 col-span-2 text-[14px] text-edge-strong"><span className="cs-meta mr-2" style={{ color: p.key }}>{p.role}</span>{p.line}</span>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── How we work ── */}
      <section className="relative s-navy tx-grain overflow-hidden">
        <Guides dark />
        <div className={`${WRAP} relative py-16 md:py-24`}>
          <Reveal>
            <div className="cs-meta text-steel">How we work</div>
            <h2 className="m-0 mt-4 t-wide font-[250] text-[34px] sm:text-[46px] lg:text-[58px] leading-[1.0] tracking-[-0.035em] max-w-[18ch]">Principles we build by.</h2>
          </Reveal>
          <ul className="m-0 mt-12 p-0 list-none grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[rgba(236,238,241,0.14)] border border-[rgba(236,238,241,0.14)]">
            {PRINCIPLES.map((pr, i) => (
              <li key={pr.t} className="bg-[#0B1424] p-6 md:p-7 min-h-[220px] transition-colors hover:bg-[#0F1B30]">
                <Reveal delay={i * 0.06}>
                  <span className="cs-meta text-[#5B8BF0]">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="m-0 mt-5 text-[20px] font-medium tracking-[-0.01em] text-off">{pr.t}</h3>
                  <p className="m-0 mt-3 text-[15px] leading-relaxed text-cold">{pr.d}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="relative s-off overflow-hidden">
        <div className={`${WRAP} relative py-16 md:py-24`}>
          <Reveal>
            <div className="cs-meta text-dim">What we do for clients</div>
            <h2 className="m-0 mt-4 t-wide font-[250] text-[34px] sm:text-[46px] lg:text-[58px] leading-[1.0] tracking-[-0.035em] max-w-[18ch]">Hands-on services, delivered by our own team.</h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {SERVICE_GROUPS.map((g, gi) => (
              <Reveal key={g.title} delay={gi * 0.08}>
                <Link to={g.to} className="cs-row-link flex items-center justify-between gap-4 border-t-2 border-k pt-5">
                  <span className="cs-row-title text-[22px] font-medium tracking-[-0.01em] transition-colors">{g.title}</span>
                  <Arrow />
                </Link>
                <ul className="m-0 mt-4 p-0 list-none">
                  {g.items.map((it) => (
                    <li key={it.to} className="border-b border-[rgba(7,9,13,0.1)]">
                      <Link to={it.to} className="flex items-center justify-between py-3 text-[15px] text-edge-strong hover:text-brand transition-colors">
                        {it.name}<span aria-hidden="true" className="text-[#9AA3B2]">→</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Internship programme (counted from issued certificates) ── */}
      {cohort && (
        <section className="relative s-black tx-grain overflow-hidden text-off">
          <Guides dark />
          <div className={`${WRAP} relative py-16 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-10 items-end`}>
            <Reveal className="lg:col-span-7">
              <div className="cs-meta text-steel">Training the next defenders</div>
              <h2 className="m-0 mt-4 t-wide font-[250] text-[34px] sm:text-[46px] lg:text-[58px] leading-[1.0] tracking-[-0.035em] max-w-[16ch]">Our internship programme.</h2>
              <p className="mt-6 mb-0 text-[17px] leading-relaxed text-cold max-w-[56ch]">
                Our latest cohort ran from {fmtDate(cohort.from)} to {fmtDate(cohort.to)}. {cohort.completed} {cohort.completed === 1 ? 'intern' : 'interns'} completed the programme
                {cohort.best > 0 ? `, and ${cohort.best === 1 ? 'one received' : `${cohort.best} received`} the Best Performer award` : ''}. Every certificate we issue carries an ID that anyone can check.
              </p>
            </Reveal>
            <Reveal className="lg:col-span-4 lg:col-start-9 flex flex-wrap gap-3" delay={0.1}>
              <MagneticLink to="/training/internship" variant="on-dark">Join the next cohort</MagneticLink>
              <Link to="/verify" className="cs-btn cs-btn-ghost-dark">Verify a certificate</Link>
            </Reveal>
          </div>
        </section>
      )}

      {/* ── Testimonials ── */}
      <InternVoices />

      {/* ── Gallery preview (only when photos have been added) ── */}
      {photos.length > 0 && (
        <section className="relative s-paper overflow-hidden">
          <div className={`${WRAP} relative py-16 md:py-20`}>
            <Link to="/gallery" className="cs-row-link flex items-center justify-between gap-6 border-t border-k pt-6">
              <span className="cs-row-title t-wide font-[250] text-[28px] md:text-[40px] leading-[1.05] tracking-[-0.03em] transition-colors">Gallery</span>
              <Arrow size={22} />
            </Link>
            <ul className="m-0 mt-8 p-0 list-none grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {photos.map((ph) => (
                <li key={ph.id}>
                  <Link to="/gallery" className="block overflow-hidden bg-mist aspect-[4/3] group">
                    <img src={ph.src} alt="" loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ── Team: photos live on the Core team page only ── */}
      <section className="s-paper border-y border-[rgba(7,9,13,0.08)]">
        <div className={`${WRAP} py-14 md:py-16`}>
          <Link to="/core-team" className="cs-row-link flex items-center justify-between gap-6 border-t border-k pt-6">
            <span>
              <span className="cs-row-title block t-wide font-[250] text-[28px] md:text-[40px] leading-[1.05] tracking-[-0.03em] transition-colors">Meet the core team</span>
              <span className="block mt-2 text-[16px] text-edge-strong">The people who build CyberSage and deliver its services.</span>
            </span>
            <Arrow size={22} />
          </Link>
        </div>
      </section>

      {/* ── Offices (live data) ── */}
      {offices.length > 0 && (
        <section className={`${WRAP} py-16 md:py-24 grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-8 lg:gap-16`}>
          <h2 className="m-0 text-[28px] md:text-[34px] leading-tight font-medium tracking-[-0.018em]">Offices</h2>
          <ul className="m-0 p-0 list-none border-t border-k">
            {offices.map((o, i) => (
              <li key={o._id || i} className="grid grid-cols-1 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-1 sm:gap-8 py-5 border-b border-fog-2">
                <div><div className="text-[17px] font-semibold">{o.city}, {o.country}</div><div className="text-[13px] text-dim-2">{o.type}</div></div>
                <div className="text-[15px] text-edge-strong">{o.address}</div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ── Work with us ── */}
      <section className="relative s-black tx-grain overflow-hidden text-off">
        <div className={`${WRAP} py-20 md:py-28 grid grid-cols-1 md:grid-cols-12 gap-8 items-end`}>
          <h2 className="md:col-span-7 m-0 t-expanded font-[200] text-[44px] sm:text-[64px] lg:text-[88px] leading-[0.92] tracking-[-0.04em]">Work with us.</h2>
          <div className="md:col-span-4 md:col-start-9 flex flex-col gap-5">
            <p className="m-0 text-[16px] leading-relaxed text-cold">Book a demo, ask about an engagement, or apply for the next internship cohort.</p>
            <div className="flex flex-wrap gap-3">
              <Link to="/contact" className="cs-btn cs-btn-on-dark">Contact us</Link>
              <Link to="/training/internship" className="cs-btn cs-btn-ghost-dark">Internships</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
