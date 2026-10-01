import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { PRODUCTS, SERVICE_GROUPS, productBySlug } from '../data/ecosystem';
import SignalField from '../components/site/SignalField';
import ProductArt from '../components/site/ProductArt';
import InternVoices from '../components/site/InternVoices';
import { MagneticLink, Parallax, Reveal } from '../components/site/motion';

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

const WRAP = 'max-w-[1400px] mx-auto px-6 md:px-10';
const EASE = [0.23, 1, 0.32, 1];

// Signal Field configuration (a constant so the canvas isn't rebuilt each render).
// Channels are labelled with the products; no events or figures are shown.
const HERO_LABELS = [{ line: 3, text: 'NEXUS' }, { line: 9, text: 'SAGE EDUCATION' }, { line: 15, text: 'SAGE VAULT' }, { line: 21, text: 'SAGE SENTINEL' }, { line: 27, text: 'SAGE BRAIN' }];

// Each product is its own chapter, on a surface that suits its own design language.
const CHAPTERS = [
  { slug: 'nexus', word: 'NEXUS', surface: 's-paper tx-dot', tone: 'dark' },
  { slug: 'education', word: 'EDUCATION', surface: 's-off', tone: 'dark' },
  { slug: 'vault', word: 'VAULT', surface: 'bg-[#0E1117] text-[#ECEEF1] tx-grain', tone: 'light' },
  { slug: 'sentinel', word: 'SENTINEL', surface: 's-black tx-grain', tone: 'light', outline: true },
  { slug: 'brain', word: 'BRAIN', surface: 's-navy tx-grain', tone: 'light' },
];

const PRINCIPLES = [
  { t: 'Built natively', d: 'We build each capability ourselves instead of stitching third-party tools together, so the products share one design and one way of working.' },
  { t: 'Evidence before action', d: 'Recommendations come with the evidence behind them, so a person can check the reasoning.' },
  { t: 'People approve what matters', d: 'Routine containment can run on its own. Actions on critical systems wait for an analyst.' },
  { t: 'Practice should feel real', d: 'Vault simulations generate a new company and attack every session, so nobody can learn the answers by heart.' },
]

/* Chapter header: index and the product name set large in expanded type */
function Identifier({ n, name, role, tone = 'dark', outline = false }) {
  const reduce = useReducedMotion();
  const color = tone === 'dark' ? '#07090D' : '#ECEEF1';
  return (
    <div className="flex items-end justify-between gap-6" aria-hidden="true">
      <motion.div className="t-expanded font-[200] leading-[0.8] tracking-[-0.03em] whitespace-nowrap select-none text-[40px] sm:text-[64px] lg:text-[88px]"
        style={outline ? { color: 'transparent', WebkitTextStroke: `1px ${color}` } : { color }}
        initial={reduce ? false : { x: 24, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true, margin: '-10%' }} transition={{ duration: 0.9, ease: EASE }}>
        {name}
      </motion.div>
      <span className="cs-meta pb-1 text-right" style={{ color: tone === 'dark' ? '#5B6575' : '#8B95A5' }}>{n} / 05<br />{role}</span>
    </div>
  );
}

function ChapterText({ slug, tone = 'dark' }) {
  const p = productBySlug(slug);
  const muted = tone === 'dark' ? 'text-[#3E4555]' : 'text-[#A9B8D0]';
  return (
    <Reveal className="flex flex-col gap-4">
      {p.tagline && <p className={`m-0 cs-meta ${tone === 'dark' ? 'text-[#5B6575]' : 'text-[#8B95A5]'}`}>{p.tagline}</p>}
      <h3 className="m-0 text-[24px] md:text-[28px] leading-[1.1] font-normal tracking-[-0.022em]">{p.line}</h3>
      <p className={`m-0 text-[15px] leading-relaxed ${muted}`}>{p.summary}</p>
      <div className="flex flex-wrap items-center gap-x-7 gap-y-3 pt-1">
        <Link to={`/products/${p.slug}`} className="cs-row-link inline-flex items-center gap-3 w-fit text-[15px] font-medium">
          <span className="cs-row-title transition-colors">Read about {p.name}</span>
          <svg className="cs-btn-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true"><path d="M1 8h13M9 3l5 5-5 5" /></svg>
        </Link>
        {p.url && <a href={p.url} target="_blank" rel="noopener noreferrer" className="cs-link text-[15px]">{p.url.replace('https://', '').replace('www.', '')} ↗</a>}
      </div>
    </Reveal>
  );
}

const Guides = ({ dark }) => <div className={`cs-guides ${dark ? 'on-dark' : ''}`} aria-hidden="true"><div /></div>;

const LandingPage = () => {
  // Seed from cache immediately so data shows on first paint
  const [clients, setClients] = useState(() => readCache('cs_clients') || []);
  const [posts, setPosts] = useState(() => readCache('cs_blogs') || []);
  const reduce = useReducedMotion();

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/clients`)
      .then((res) => res.json())
      .then((data) => { const list = Array.isArray(data) ? data : []; setClients(list); writeCache('cs_clients', list); })
      .catch(() => {});

    // Latest writing for the research section (same endpoint as the blog page)
    fetch(`${BACKEND_URL}/api/blogs`)
      .then((res) => res.json())
      .then((data) => { const list = Array.isArray(data) ? data.slice(0, 3) : []; setPosts(list); writeCache('cs_blogs', list); })
      .catch(() => {});

    // Warm up core team in background so CoreTeamPage loads instantly
    fetch(`${BACKEND_URL}/api/about/team`)
      .then((res) => res.json())
      .then((data) => { if (Array.isArray(data)) writeCache('cs_team', data); })
      .catch(() => {});
  }, []);


  return (
    <main className="cs-sans">
      {/* ═══ HERO: statement over the Signal Field ═══ */}
      <section className="relative s-black tx-grain overflow-hidden">
        <Guides dark />
        <div className={`${WRAP} pt-14 md:pt-20`}>
          <motion.h1 className="m-0 font-light text-[#ECEEF1] text-[40px] sm:text-[56px] lg:text-[72px] xl:text-[84px] leading-[0.98] tracking-[-0.035em] max-w-[16ch]"
            initial={reduce ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, ease: EASE }}>
            Security infrastructure for organisations that cannot afford to guess.
          </motion.h1>
        </div>
        <div className="relative mt-8 md:mt-10 tx-scan">
          <SignalField lines={32} theme="dark" labels={HERO_LABELS} eventX={0.58} className="h-[240px] md:h-[340px]"
            ariaLabel="The Signal Field: thirty-two stacked channels, one per layer of the platform, with a disturbance travelling down through them." />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#07090D] to-transparent" />
        </div>
        <div className={`${WRAP} relative py-8 md:py-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-end`}>
          <p className="md:col-span-6 m-0 text-[17px] leading-relaxed text-[#A9B8D0] max-w-[54ch]">
            CyberSage builds five products that work as one platform. Sentinel watches your estate and responds to threats. Brain connects what it sees and proposes decisions. Nexus, Sage Education and Vault give people a secure place to work, run an institution and practise real security.
          </p>
          <div className="md:col-span-3 md:col-start-8"><MagneticLink to="/contact" variant="on-dark">Book a demo</MagneticLink></div>
          <p className="md:col-span-2 m-0 text-[12px] leading-relaxed text-[#5B6575]">Above: the Signal Field, one line per channel across the platform. Move across it to inspect.</p>
        </div>
      </section>

      {/* ═══ STATEMENT + chapter index ═══ */}
      <section id="platform" className="relative s-paper tx-dot overflow-hidden scroll-mt-16">
        <Guides />
        <div className={`${WRAP} relative py-16 md:py-24`}>
          <Reveal>
            <p className="m-0 t-wide font-[250] text-[36px] sm:text-[52px] lg:text-[64px] leading-[1.0] tracking-[-0.035em] max-w-[18ch]">
              One ecosystem. Multiple capabilities.
            </p>
          </Reveal>
          <div className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-12 gap-10">
            <p className="md:col-span-4 m-0 text-[16px] leading-relaxed text-[#3E4555]">Workspace, institutions, skills, security operations and intelligence. Each product stands on its own and gets stronger next to the others.</p>
            <nav aria-label="Product chapters" className="md:col-span-7 md:col-start-6">
              <ol className="m-0 p-0 list-none border-t border-[#07090D]">
                {PRODUCTS.map((p, i) => (
                  <li key={p.slug}>
                    <a href={`#ch-${p.slug}`} className="cs-row-link grid grid-cols-[48px_minmax(0,1fr)_auto] md:grid-cols-[56px_minmax(0,1.1fr)_minmax(0,1fr)_auto] gap-4 items-baseline py-3 border-b border-[rgba(7,9,13,0.14)]">
                      <span className="cs-data text-[#5B6575]">0{i + 1}</span>
                      <span className="cs-row-title text-[20px] md:text-[22px] font-normal tracking-[-0.02em] transition-colors">{p.name}</span>
                      <span className="hidden md:block text-[14px] text-[#5B6575]">{p.role}</span>
                      <svg className="cs-btn-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true"><path d="M8 1v13M3 9l5 5 5-5" /></svg>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </div>
        </div>
      </section>

      {CHAPTERS.map((c, i) => (
        <section key={c.slug} id={`ch-${c.slug}`} className={`relative overflow-hidden scroll-mt-16 ${c.surface}`}>
          <Guides dark={c.tone === 'light'} />
          <div className={`${WRAP} relative py-14 md:py-20`}>
            <Identifier n={`0${i + 1}`} name={c.word} role={productBySlug(c.slug).role} tone={c.tone} outline={c.outline} />
            <div className={`mt-8 md:mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center`}>
              <Parallax className={`lg:col-span-8 ${i % 2 ? 'lg:order-2' : ''}`} distance={14}>
                <div className={c.tone === 'light' ? 'shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9)] ring-1 ring-white/5' : 'shadow-[0_40px_80px_-40px_rgba(7,9,13,0.4)] ring-1 ring-black/5'}>
                  <ProductArt slug={c.slug} />
                </div>
              </Parallax>
              <div className={`lg:col-span-4 ${i % 2 ? 'lg:order-1' : ''}`}><ChapterText slug={c.slug} tone={c.tone} /></div>
            </div>
          </div>
        </section>
      ))}

      {/* ═══ Research and principles ═══ */}
      <section className="relative s-off tx-dot overflow-hidden">
        <Guides />
        <div className={`${WRAP} relative py-16 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-14`}>
          <div className={posts.length ? 'lg:col-span-5' : 'lg:col-span-12'}>
            <h2 className="m-0 t-wide font-[250] text-[36px] md:text-[48px] leading-[1.02] tracking-[-0.03em]">How we build.</h2>
            <dl className={`m-0 mt-10 border-t border-[#07090D] ${posts.length ? '' : 'lg:grid lg:grid-cols-2 lg:gap-x-12'}`}>
              {PRINCIPLES.map((p) => (
                <div key={p.t} className="py-5 border-b border-[rgba(7,9,13,0.14)]">
                  <dt className="text-[17px] font-medium tracking-[-0.01em]">{p.t}</dt>
                  <dd className="m-0 mt-1.5 text-[15px] leading-relaxed text-[#3E4555]">{p.d}</dd>
                </div>
              ))}
            </dl>
          </div>
          {posts.length > 0 && (
            <div className="lg:col-span-6 lg:col-start-7">
              <div className="flex items-baseline justify-between">
                <h2 className="m-0 t-wide font-[250] text-[36px] md:text-[48px] leading-[1.02] tracking-[-0.03em]">Research.</h2>
                <Link to="/blog" className="cs-link text-[14px]">All writing</Link>
              </div>
              <ul className="m-0 mt-10 p-0 list-none border-t border-[#07090D]">
                {posts.map((post) => (
                  <li key={post.slug}>
                    <Link to={`/blog/${post.slug}`} className="cs-row-link block py-6 border-b border-[rgba(7,9,13,0.14)]">
                      {post.category && <div className="cs-meta text-[#5B6575]">{post.category}</div>}
                      <div className="cs-row-title mt-2 text-[22px] leading-snug tracking-[-0.015em] transition-colors">{post.title}</div>
                      {post.excerpt && <p className="m-0 mt-2 text-[15px] leading-relaxed text-[#3E4555] line-clamp-2">{post.excerpt}</p>}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* ═══ Company ═══ */}
      <section className="relative s-paper overflow-hidden">
        <Guides />
        <div className={`${WRAP} relative py-16 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-end`}>
          <Parallax className="lg:col-span-7 relative overflow-hidden" distance={30}>
            <div className="relative tx-grain">
              <img alt="A security engineering workspace at dusk" loading="lazy" className="w-full aspect-[16/10] object-cover saturate-[.55] contrast-[1.05] scale-110" src="/brand/photo/studio.webp" />
              <div className="absolute inset-0 bg-[#0B1220] mix-blend-multiply opacity-25" />
            </div>
          </Parallax>
          <div className="lg:col-span-4 lg:col-start-9 flex flex-col gap-5">
            <h2 className="m-0 t-wide font-[250] text-[36px] md:text-[44px] leading-[1.02] tracking-[-0.03em]">Intelligence. Simulation. Resilience.</h2>
            <p className="m-0 text-[16px] leading-relaxed text-[#3E4555]">CyberSage is a cybersecurity technology company building intelligent platforms for training, detection and collaboration. Alongside the products, our consultants take on hands-on security, development and training engagements.</p>
            <div className="flex flex-wrap gap-x-6 gap-y-3 pt-2">
              <MagneticLink to="/core-team" variant="secondary">Meet the core team</MagneticLink>
              <Link to="/about" className="cs-link self-center text-[15px]">About CyberSage</Link>
            </div>
          </div>
        </div>

        {/* clients (live data) */}
        {clients.length > 0 && (
          <div className={`${WRAP} relative pb-20 md:pb-28`}>
            {clients.length > 0 && (
              <ul className="m-0 p-0 list-none grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 border-t border-l border-[rgba(7,9,13,0.14)]">
                {clients.map((client, idx) => (
                  <li key={idx} className="h-24 border-r border-b border-[rgba(7,9,13,0.14)] flex items-center justify-center p-5">
                    {client.logo
                      ? <img src={client.logo} alt={client.name} className="max-w-full max-h-full object-contain grayscale opacity-75" loading="lazy" />
                      : <span className="text-[15px] font-medium text-center">{client.name}</span>}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </section>

      {/* ═══ Services (from the live site) ═══ */}
      <section id="services" className="relative bg-white overflow-hidden scroll-mt-16 border-t border-[rgba(7,9,13,0.08)]">
        <Guides />
        <div className={`${WRAP} relative py-16 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12`}>
          <div className="lg:col-span-4">
            <h2 className="m-0 t-wide font-[250] text-[36px] md:text-[48px] leading-[1.02] tracking-[-0.03em]">Services.</h2>
            <p className="mt-5 mb-0 text-[16px] leading-relaxed text-[#3E4555] max-w-[40ch]">Our consultants still take on hands-on engagements: assessments, testing, secure development and training.</p>
          </div>
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-10">
            {SERVICE_GROUPS.map((g) => (
              <nav key={g.title} aria-label={g.title} className="flex flex-col">
                <Link to={g.to} className="cs-row-link flex items-center justify-between pb-3 mb-1 border-b border-[#07090D] text-[17px] font-medium">
                  <span className="cs-row-title transition-colors">{g.title}</span>
                  <svg className="cs-btn-arrow" width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true"><path d="M1 8h13M9 3l5 5-5 5" /></svg>
                </Link>
                {g.items.map((it) => (
                  <Link key={it.to} to={it.to} className="py-2.5 border-b border-[rgba(7,9,13,0.1)] text-[15px] text-[#3E4555] hover:text-[#2563EB] transition-colors">{it.name}</Link>
                ))}
              </nav>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Testimonials (moving row) ═══ */}
      <InternVoices />

      {/* ═══ Contact ═══ */}
      <section className="relative s-black tx-grain overflow-hidden">
        <Guides dark />
        <div className={`${WRAP} relative py-16 md:py-24`}>
          <Reveal>
            <h2 className="m-0 t-expanded font-[200] text-[44px] sm:text-[64px] lg:text-[88px] leading-[0.92] tracking-[-0.04em] text-[#ECEEF1]">Talk to an engineer.</h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
            <p className="md:col-span-5 m-0 text-[16px] leading-relaxed text-[#A9B8D0]">Tell us what you are protecting and we will show you the parts of the platform that matter for it.</p>
            <div className="md:col-span-4 md:col-start-8 flex flex-wrap gap-3">
              <MagneticLink to="/contact" variant="primary">Book a demo</MagneticLink>
              <MagneticLink to="/security-services" variant="ghost-dark" arrow={false}>Browse services</MagneticLink>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default LandingPage;
