import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { PRODUCTS, SERVICE_GROUPS, productBySlug } from '../data/ecosystem';
import HeroSystem from '../components/site/HeroSystem';
import PlatformDiagram from '../components/site/PlatformDiagram';
import ProductVisual from '../components/site/ProductVisual';
import ProductStage from '../components/site/ProductStage';
import ProductMark from '../components/site/ProductMark';
import VantaNet from '../components/site/VantaNet';
import { MagneticLink, Parallax, Reveal, RevealText, SectionMarker } from '../components/site/motion';

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

const WRAP = 'max-w-[1320px] mx-auto px-5 md:px-8';
const SECTIONS = 6;
const H2 = 'm-0 text-[28px] md:text-[36px] leading-[1.1] font-medium tracking-[-0.025em]';

// The sequence of a real incident, end to end
const TIMELINE = [
  { t: '02:41', who: 'Nexus', what: 'A lookalike invoice email reaches six people in finance.' },
  { t: '03:05', who: 'Sentinel', what: 'One of them signs in from a second country 17 minutes after the first.' },
  { t: '03:07', who: 'Sentinel', what: 'A playbook revokes the session and removes a new forwarding rule.' },
  { t: '03:09', who: 'Brain', what: 'Brain links the login to the email and drafts a recommendation.' },
  { t: '08:30', who: 'Analyst', what: 'The on-call analyst reviews the evidence and approves four resets.' },
  { t: '+7 days', who: 'Vault', what: 'Finance works through the same attack as a guided investigation.' },
];

const PRINCIPLES = [
  { t: 'Evidence before action', d: 'Every recommendation from Sage Brain shows the events and sources behind it. An analyst should be able to check the reasoning in under a minute.' },
  { t: 'People approve what matters', d: 'Automated playbooks handle routine containment. Changes to accounts, money or production systems wait for a named person.' },
  { t: 'One platform, not five tools', d: 'The products share identity and context, so an incident in Sentinel, a message in Nexus and a lab in Vault are part of the same record.' },
  { t: 'Practise on what really happens', d: 'Vault exercises are built from the kinds of incidents our own investigators work, not from textbook examples.' },
];

// Product switcher. Adapted from 21st.dev "Animated Tabs" (educalvolpz): roving tabindex,
// arrow/Home/End keys, and a spring underline shared via layoutId.
function ProductTabs() {
  const [active, setActive] = useState('sentinel');
  const [preview, setPreview] = useState(null);
  const tabRefs = useRef({});
  const stripRef = useRef(null);
  const reduce = useReducedMotion();
  const product = productBySlug(active);
  const index = PRODUCTS.findIndex((p) => p.slug === active) + 1;

  useEffect(() => {
    const el = tabRefs.current[active]; const strip = stripRef.current;
    if (el && strip && strip.scrollWidth > strip.clientWidth) strip.scrollTo({ left: Math.max(el.offsetLeft - 20, 0), behavior: reduce ? 'auto' : 'smooth' });
  }, [active, reduce]);

  const onKey = (e, i) => {
    let n = i;
    if (e.key === 'ArrowRight') n = (i + 1) % PRODUCTS.length;
    else if (e.key === 'ArrowLeft') n = (i - 1 + PRODUCTS.length) % PRODUCTS.length;
    else if (e.key === 'Home') n = 0;
    else if (e.key === 'End') n = PRODUCTS.length - 1;
    else return;
    e.preventDefault();
    const next = PRODUCTS[n].slug;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  // Hovering a tab previews that product's schematic behind the interface
  const stageProduct = productBySlug(preview || active);

  return (
    <>
      <div ref={stripRef} className="relative cs-scroll-x -mx-5 px-5 md:mx-0 md:px-0 border-b border-[#DCE0E7]">
        <div role="tablist" aria-label="CyberSage products" className="flex min-w-max" onMouseLeave={() => setPreview(null)}>
          {PRODUCTS.map((p, i) => {
            const on = active === p.slug;
            return (
              <button key={p.slug} ref={(el) => { tabRefs.current[p.slug] = el; }} role="tab" type="button" id={`tab-${p.slug}`}
                aria-selected={on} aria-controls="product-panel" tabIndex={on ? 0 : -1}
                onClick={() => setActive(p.slug)} onKeyDown={(e) => onKey(e, i)} onMouseEnter={() => setPreview(p.slug)}
                className={`group relative text-left mr-8 md:mr-12 pb-4 pt-1 bg-transparent flex items-start gap-3 transition-colors ${on ? 'text-[#0C1324]' : 'text-[#5F6676] hover:text-[#0C1324]'}`}>
                <ProductMark slug={p.slug} size={26} accent={on ? '#2563EB' : 'currentColor'} className="mt-0.5 shrink-0" />
                <span>
                  <span className="block cs-meta">{p.role} / {String(i + 1).padStart(2, '0')}</span>
                  <span className="block text-[17px] font-medium tracking-[-0.01em]">{p.name}</span>
                </span>
                {on && (
                  <motion.span layoutId="product-tab-underline" aria-hidden="true" className="absolute left-0 right-0 -bottom-px h-[2px] bg-[#0C1324]"
                    transition={reduce ? { duration: 0 } : { type: 'spring', bounce: 0.05, duration: 0.3 }} />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div id="product-panel" role="tabpanel" aria-labelledby={`tab-${active}`}
        className="pt-12 grid grid-cols-1 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] gap-10 lg:gap-14">
        <div key={active} className="cs-swap flex flex-col gap-4 lg:pt-1">
          <div className="cs-meta text-[#5F6676]">{String(index).padStart(2, '0')} / {String(PRODUCTS.length).padStart(2, '0')} · {product.role}</div>
          <h3 className="m-0 text-[26px] font-medium tracking-[-0.02em]">{product.name}</h3>
          <p className="m-0 text-[18px] leading-snug text-[#0C1324]">{product.line}</p>
          <p className="m-0 text-[15px] leading-relaxed text-[#3E4555] max-w-[46ch]">{product.summary}</p>
          <dl className="m-0 mt-2 border-t border-[#DCE0E7]">
            {product.caps.map((c) => (
              <div key={c.t} className="py-2.5 border-b border-[#DCE0E7] flex flex-col gap-0.5">
                <dt className="text-[14px] font-medium">{c.t}</dt>
                <dd className="m-0 text-[14px] text-[#5F6676] leading-snug">{c.d}</dd>
              </div>
            ))}
          </dl>
          <Link to={`/products/${product.slug}`} className="cs-row-link inline-flex items-center gap-2 mt-1 w-fit text-[15px] font-medium text-[#1D4ED8]">
            <span className="cs-row-title">Read about {product.name}</span>
            <svg className="cs-btn-arrow" width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M2 8h11M9 4l4 4-4 4" /></svg>
          </Link>
        </div>
        <ProductStage product={stageProduct}
          rail={[['System', `${product.name.replace('Sage ', '')} / ${product.role}`], ['Takes in', product.inputs[0]], ['Hands on', product.outputs[0]], ['Interface', 'Simulated']]} caption={product.figure}>
          <div key={active} className="cs-swap"><ProductVisual product={product} caption={false} /></div>
        </ProductStage>
      </div>
    </>
  );
}

function IntelligenceLayer() {
  const [focus, setFocus] = useState(null);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] gap-12 lg:gap-16 items-start">
      <div>
        <RevealText className={`${H2} text-white`}>One intelligence layer.</RevealText>
        <p className="mt-5 mb-0 text-[16px] leading-relaxed text-[#AEB6C8] max-w-[44ch]">Every CyberSage product reports into Sage Sentinel, and Sentinel reports into Sage Brain. Brain is where signals from across your organisation become one picture and one decision.</p>
        <ul className="m-0 mt-8 p-0 list-none border-t border-[#1E2638]" onMouseLeave={() => setFocus(null)}>
          {PRODUCTS.map((p) => (
            <li key={p.slug}>
              <Link to={`/products/${p.slug}`} onMouseEnter={() => setFocus(p.slug)} onFocus={() => setFocus(p.slug)} onBlur={() => setFocus(null)}
                className={`flex items-center gap-3 py-3 border-b border-[#1E2638] transition-colors ${focus === p.slug ? 'text-white' : 'text-[#AEB6C8]'}`}>
                <ProductMark slug={p.slug} size={22} accent={focus === p.slug ? '#7FA2FF' : 'currentColor'} />
                <span className="cs-meta">{p.name}</span>
                <span className="ml-auto text-[13px] text-[#6F7C98]">{p.role}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <PlatformDiagram focus={focus} />
    </div>
  );
}

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

  const [featured, ...moreQuotes] = testimonials;

  return (
    <main className="cs-sans text-[#0C1324]">
      {/* ── 01 Hero ── */}
      <section className="cs-paper">
        <div className={`${WRAP} pt-12 md:pt-16 pb-16 md:pb-24 grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-12 lg:gap-14 items-center`}>
          <div>
            <div className="cs-meta text-[#5F6676] flex items-center gap-3"><span className="w-1.5 h-1.5 bg-[#2563EB]" aria-hidden="true" />CyberSage / Est. 2024</div>
            <RevealText as="h1" className="mt-6 mb-0 text-[36px] sm:text-[44px] lg:text-[52px] leading-[1.05] font-medium tracking-[-0.035em] max-w-[15ch]">
              Security infrastructure for organisations that cannot afford to guess.
            </RevealText>
            <Reveal delay={0.1}>
              <p className="mt-6 mb-0 text-[17px] leading-relaxed text-[#3E4555] max-w-[52ch]">
                CyberSage builds five products that work as one platform. Sage Sentinel watches your estate and responds to threats. Sage Brain connects what it sees and proposes decisions. Nexus, Sage Education and Sage Vault give your people a secure place to work, run an institution and practise real security.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <MagneticLink to="/contact">Book a demo</MagneticLink>
                <MagneticLink href="#platform" variant="secondary" arrow={false}>Explore the platform</MagneticLink>
              </div>
              <dl className="mt-10 m-0 grid grid-cols-2 gap-6 max-w-[440px] border-t border-[#C5CBD6] pt-4">
                <div><dt className="cs-meta text-[#5F6676]">Platform</dt><dd className="m-0 mt-1 text-[14px]">5 products, one record</dd></div>
                <div><dt className="cs-meta text-[#5F6676]">Team credentials</dt><dd className="m-0 mt-1 text-[14px]">CEH, CHFI, MSc Cyber Security</dd></div>
              </dl>
            </Reveal>
          </div>
          <Reveal delay={0.15} y={20}><HeroSystem /></Reveal>
        </div>
      </section>

      {/* ── 02 Products ── */}
      <section id="platform" className="scroll-mt-20 bg-white border-t border-[#E6E9EF] overflow-hidden">
        <div className={`${WRAP} pt-10 pb-20 md:pb-28`}>
          <SectionMarker index={2} total={SECTIONS} label="Products" />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-4 md:gap-16 mb-12">
            <RevealText className={H2}>One platform, five products.</RevealText>
            <p className="m-0 text-[16px] leading-relaxed text-[#3E4555] max-w-[60ch] md:pt-2">Each product stands on its own, and each gets more useful next to the others. Pick one to see how it is used day to day.</p>
          </div>
          <ProductTabs />
        </div>
      </section>

      {/* ── 03 Intelligence layer + incident (dark) ── */}
      <section className="relative cs-char text-[#DCE1FB] overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),transparent)]" aria-hidden="true" />
        <div className={`${WRAP} relative pt-10 pb-20 md:pb-28`}>
          <SectionMarker index={3} total={SECTIONS} label="Architecture" dark />
          <div className="mt-12"><IntelligenceLayer /></div>
        </div>
        <div className="relative border-t border-[#1A2236]">
          <VantaNet className="absolute inset-0 opacity-70" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,15,28,0.94)_25%,rgba(10,15,28,0.5)_80%)]" aria-hidden="true" />
          <div className={`${WRAP} relative py-16 md:py-24`}>
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] gap-4 lg:gap-16 mb-12">
              <RevealText className={`${H2} text-white max-w-[18ch]`}>What happens when something goes wrong at 3am.</RevealText>
              <p className="m-0 text-[16px] leading-relaxed text-[#AEB6C8] max-w-[58ch] lg:pt-2">A credential phishing case as it moves through the platform. Times are from a representative incident; the products involved are the ones that handle each step.</p>
            </div>
            <ol className="m-0 p-0 list-none grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 border-t border-[#2A3247]">
              {TIMELINE.map((s, i) => (
                <li key={i} className="relative pt-5 pb-6 md:pr-6 border-b md:border-b-0 border-[#1E2638]">
                  <span className="absolute -top-[5px] left-0 w-[9px] h-[9px] rotate-45 bg-[#0A0F1C] border border-[#44D8F1]" aria-hidden="true" />
                  <Reveal delay={i * 0.06} y={8}>
                    <div className="cs-mono text-[13px] text-white">{s.t}</div>
                    <div className="mt-1 cs-meta text-[#44D8F1]">{s.who}</div>
                    <p className="m-0 mt-2 text-[14px] leading-relaxed text-[#C9D0DD]">{s.what}</p>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ── 04 Principles ── */}
      <section className="cs-paper">
        <div className={`${WRAP} pt-10 pb-20 md:pb-28`}>
          <SectionMarker index={4} total={SECTIONS} label="Principles" />
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-8 lg:gap-16">
            <div>
              <RevealText className={H2}>How we build security products.</RevealText>
              <p className="mt-4 mb-0 text-[16px] leading-relaxed text-[#3E4555] max-w-[44ch]">Four rules we hold every release to, written by the people who would be on call if we got them wrong.</p>
            </div>
            <dl className="m-0 border-t border-[#0C1324]">
              {PRINCIPLES.map((p, i) => (
                <Reveal key={p.t} delay={i * 0.05} className="grid grid-cols-1 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-1 sm:gap-8 py-5 border-b border-[#DCE0E7]">
                  <dt className="text-[17px] font-medium tracking-[-0.01em]">{p.t}</dt>
                  <dd className="m-0 text-[15px] leading-relaxed text-[#3E4555]">{p.d}</dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ── 05 Services (from the live site) ── */}
      <section className="bg-white border-y border-[#E6E9EF]">
        <div className={`${WRAP} pt-10 pb-20 md:pb-28`}>
          <SectionMarker index={5} total={SECTIONS} label="Services" />
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-8 lg:gap-16">
            <div>
              <RevealText className={H2}>Services.</RevealText>
              <p className="mt-4 mb-0 text-[16px] leading-relaxed text-[#3E4555] max-w-[44ch]">Our consultants still take on hands-on engagements: assessments, testing, secure development and training. Many clients start here and later move onto a platform.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {SERVICE_GROUPS.map((g) => (
                <nav key={g.title} aria-label={g.title} className="flex flex-col">
                  <Link to={g.to} className="cs-row-link flex items-center justify-between pb-3 mb-1 border-b border-[#0C1324] text-[16px] font-medium">
                    <span className="cs-row-title transition-colors">{g.title}</span>
                    <svg className="cs-btn-arrow" width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M2 8h11M9 4l4 4-4 4" /></svg>
                  </Link>
                  {g.items.map((it) => (
                    <Link key={it.to} to={it.to} className="py-2.5 border-b border-[#E6E9EF] text-[15px] text-[#3E4555] hover:text-[#1D4ED8] transition-colors">{it.name}</Link>
                  ))}
                </nav>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 06 Company (from the live site) ── */}
      <section className="cs-paper">
        <div className={`${WRAP} pt-10 pb-20 md:pb-28`}>
          <SectionMarker index={6} total={SECTIONS} label="Company" />
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)] gap-10 lg:gap-16 items-center">
            <Parallax className="relative overflow-hidden rounded-[3px]" distance={18}>
              <img alt="CyberSage server room" loading="lazy" className="w-full aspect-[4/3] object-cover grayscale scale-[1.08]"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuChfg-CdjjDpS1V3Svxlir1JeTLMiHW3_hSB04KZupS0bfaHH6j2JbNo6XBqaGQHUBqVJXMxF6HZb_RRAbRntT0LSogZyyQdiDG22jTcr3wHD1Byq5cDcZxAJrwMZ4YQ9fNulESpaFM4210qwWz199Zee8_4IrykD95rJh82mqsl7n5tQICal_O0s_icHMHHvwgip69B-RuotebJYrQDXblW_QnPd7CIzsvYwiWAAXGWtSYSfjvhCNDjUjfNETILm6bM5kBWoMuNuY" />
            </Parallax>
            <div className="flex flex-col gap-5 max-w-[56ch]">
              <RevealText className={H2}>Founded by people who work incidents.</RevealText>
              <p className="m-0 text-[16px] leading-relaxed text-[#3E4555]">CyberSage was started by security researchers, investigators and developers who spent years responding to breaches with tools that did not talk to each other. We set out to give organisations back control of their own security, without needing a twenty-person SOC to get it.</p>
              <p className="m-0 text-[16px] leading-relaxed text-[#3E4555]">The same team still runs client engagements and teaches in Vault, which is how the products stay honest about what works.</p>
              <div className="flex flex-wrap gap-x-6 gap-y-3 pt-1">
                <MagneticLink to="/core-team" variant="secondary">Meet the core team</MagneticLink>
                <Link to="/about" className="cs-link self-center text-[15px] font-medium">About CyberSage</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Clients and partners (live data) ── */}
      {clients.length > 0 && (
        <section className="bg-white border-y border-[#E6E9EF]">
          <div className={`${WRAP} py-14 md:py-16`}>
            <h2 className="m-0 mb-8 cs-meta text-[#5F6676]">Clients and partners</h2>
            <ul className="m-0 p-0 list-none grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 border-t border-l border-[#E6E9EF]">
              {clients.map((client, idx) => (
                <li key={idx} className="h-24 border-r border-b border-[#E6E9EF] flex items-center justify-center p-5">
                  {client.logo
                    ? <img src={client.logo} alt={client.name} className="max-w-full max-h-full object-contain grayscale opacity-80" loading="lazy" />
                    : <span className="text-[15px] font-medium text-center">{client.name}</span>}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ── Testimonials (live data) ── */}
      {featured && (
        <section className={`${WRAP} py-16 md:py-24 grid grid-cols-1 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] gap-12 lg:gap-16`}>
          <figure className="m-0">
            <blockquote className="m-0 text-[24px] md:text-[30px] leading-snug font-medium tracking-[-0.02em]">&ldquo;{featured.content}&rdquo;</blockquote>
            <figcaption className="mt-6 text-[15px]"><span className="font-medium">{featured.name}</span><span className="text-[#5F6676]">{featured.role ? `, ${featured.role}` : ''}{featured.company ? `, ${featured.company}` : ''}</span></figcaption>
          </figure>
          {moreQuotes.length > 0 && (
            <div className="border-t border-[#0C1324]">
              {moreQuotes.slice(0, 4).map((t, i) => (
                <figure key={i} className="m-0 py-5 border-b border-[#DCE0E7]">
                  <blockquote className="m-0 text-[15px] leading-relaxed text-[#3E4555]">&ldquo;{t.content}&rdquo;</blockquote>
                  <figcaption className="mt-2 text-[13px]"><span className="font-medium">{t.name}</span><span className="text-[#5F6676]">{t.company ? `, ${t.company}` : ''}</span></figcaption>
                </figure>
              ))}
            </div>
          )}
        </section>
      )}

      {/* ── Contact ── */}
      <section className="bg-white border-t border-[#E6E9EF] cs-grid-faint">
        <div className={`${WRAP} py-16 md:py-24 grid grid-cols-1 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] gap-8 md:gap-16 items-end`}>
          <div>
            <div className="cs-meta text-[#5F6676]">Next step</div>
            <RevealText className={`${H2} mt-4`}>Talk to the people who build it.</RevealText>
            <p className="mt-4 mb-0 text-[16px] leading-relaxed text-[#3E4555] max-w-[56ch]">A 30-minute call with an engineer, not a sales script. Tell us what you are protecting and we will show you the parts of the platform that matter for it.</p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <MagneticLink to="/contact">Book a demo</MagneticLink>
            <MagneticLink to="/security-services" variant="secondary" arrow={false}>Browse services</MagneticLink>
          </div>
        </div>
      </section>
    </main>
  );
};

export default LandingPage;
