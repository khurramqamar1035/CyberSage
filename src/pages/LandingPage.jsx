import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PRODUCTS, SERVICE_GROUPS, productBySlug } from '../data/ecosystem';
import PlatformDiagram from '../components/site/PlatformDiagram';
import ProductVisual from '../components/site/ProductVisual';
import VantaNet from '../components/site/VantaNet';

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

// The sequence of a real incident, end to end
const TIMELINE = [
  { t: '02:41', who: 'Nexus', what: 'A lookalike invoice email reaches six people in finance.' },
  { t: '03:05', who: 'Sentinel', what: 'One of them signs in from a second country 17 minutes after the first.' },
  { t: '03:07', who: 'Sentinel', what: 'A playbook revokes the session and removes a new forwarding rule.' },
  { t: '03:09', who: 'Brain', what: 'Brain links the login to the email and drafts a recommendation.' },
  { t: '08:30', who: 'Analyst', what: 'The on-call analyst reviews the evidence and approves four resets.' },
  { t: 'Next week', who: 'Vault', what: 'Finance works through the same attack as a guided investigation.' },
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
  const tabRefs = useRef({});
  const stripRef = useRef(null);
  const reduce = useReducedMotion();

  // Keep the selected tab in view inside the horizontally scrolling strip (mobile)
  useEffect(() => {
    const el = tabRefs.current[active]; const strip = stripRef.current;
    if (el && strip && strip.scrollWidth > strip.clientWidth) strip.scrollTo({ left: Math.max(el.offsetLeft - 20, 0), behavior: reduce ? 'auto' : 'smooth' });
  }, [active, reduce]);
  const product = productBySlug(active);

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

  return (
    <>
      <div ref={stripRef} className="relative cs-scroll-x -mx-5 px-5 md:mx-0 md:px-0 border-b border-[#DCE0E7]">
        <div role="tablist" aria-label="CyberSage products" className="flex min-w-max">
          {PRODUCTS.map((p, i) => {
            const on = active === p.slug;
            return (
              <button key={p.slug} ref={(el) => { tabRefs.current[p.slug] = el; }} role="tab" type="button" id={`tab-${p.slug}`}
                aria-selected={on} aria-controls="product-panel" tabIndex={on ? 0 : -1}
                onClick={() => setActive(p.slug)} onKeyDown={(e) => onKey(e, i)}
                className={`relative text-left mr-8 md:mr-12 pb-4 pt-1 bg-transparent transition-colors ${on ? 'text-[#0C1324]' : 'text-[#5F6676] hover:text-[#0C1324]'}`}>
                <span className="block text-[13px]">{p.role}</span>
                <span className="block text-[17px] font-semibold">{p.name}</span>
                {on && (
                  <motion.span layoutId="product-tab-underline" aria-hidden="true"
                    className="absolute left-0 right-0 -bottom-px h-[2px] bg-[#0C1324]"
                    transition={reduce ? { duration: 0 } : { type: 'spring', bounce: 0.05, duration: 0.3 }} />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div id="product-panel" role="tabpanel" aria-labelledby={`tab-${active}`} key={active}
        className="cs-swap pt-10 grid grid-cols-1 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] gap-10 lg:gap-14">
        <div className="flex flex-col gap-4 lg:pt-2">
          <h3 className="m-0 text-[24px] font-semibold tracking-[-0.01em]">{product.name}</h3>
          <p className="m-0 text-[18px] leading-snug text-[#0C1324]">{product.line}</p>
          <p className="m-0 text-[15px] leading-relaxed text-[#3E4555] max-w-[46ch]">{product.summary}</p>
          <dl className="m-0 mt-2 border-t border-[#DCE0E7]">
            {product.caps.map((c) => (
              <div key={c.t} className="py-2.5 border-b border-[#DCE0E7] flex flex-col gap-0.5">
                <dt className="text-[14px] font-semibold">{c.t}</dt>
                <dd className="m-0 text-[14px] text-[#5F6676] leading-snug">{c.d}</dd>
              </div>
            ))}
          </dl>
          <Link to={`/products/${product.slug}`} className="cs-link text-[15px] font-medium mt-1 w-fit">Read about {product.name}</Link>
        </div>
        <ProductVisual product={product} />
      </div>
    </>
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
      {/* ── Hero: what we do, and how it fits together ── */}
      <section className={`${WRAP} pt-14 md:pt-20 pb-16 md:pb-24 grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-12 lg:gap-16 items-start`}>
        <div className="lg:pt-6">
          <h1 className="cs-enter m-0 text-[36px] sm:text-[44px] lg:text-[52px] leading-[1.08] font-medium tracking-[-0.022em] max-w-[16ch]">
            Security infrastructure for organisations that cannot afford to guess.
          </h1>
          <p className="cs-enter cs-enter-2 mt-6 mb-0 text-[17px] md:text-[18px] leading-relaxed text-[#3E4555] max-w-[54ch]">
            CyberSage builds five products that work as one platform. Sage Sentinel watches your estate and responds to threats. Sage Brain connects what it sees and proposes decisions. Nexus, Sage Education and Sage Vault give your people a secure place to work, run an institution and practise real security.
          </p>
          <div className="cs-enter cs-enter-3 mt-8 flex flex-wrap gap-3">
            <Link to="/contact" className="cs-btn cs-btn-primary">Book a demo</Link>
            <a href="#platform" className="cs-btn cs-btn-secondary">Explore the platform</a>
          </div>
          <p className="mt-8 mb-0 text-[13px] leading-relaxed text-[#5F6676] max-w-[46ch]">
            Designed and run by certified security practitioners: CEH, CHFI, Digital Forensics, MSc Cyber Security.
          </p>
        </div>
        <div className="lg:pl-6 lg:border-l lg:border-[#DCE0E7]">
          <PlatformDiagram />
        </div>
      </section>

      {/* ── The products, one at a time ── */}
      <section id="platform" className="scroll-mt-20 bg-white border-y border-[#E6E9EF]">
        <div className={`${WRAP} py-16 md:py-24`}>
          <div className="grid grid-cols-1 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-4 md:gap-16 mb-10 md:mb-12">
            <h2 className="m-0 text-[28px] md:text-[34px] leading-tight font-medium tracking-[-0.018em]">One platform, five products</h2>
            <p className="m-0 text-[16px] leading-relaxed text-[#3E4555] max-w-[60ch] md:pt-1.5">Each product stands on its own, and each gets more useful next to the others. Pick one to see how it is used day to day.</p>
          </div>
          <ProductTabs />
        </div>
      </section>

      {/* ── A real incident, minute by minute ── */}
      <section className="relative overflow-hidden bg-[#0C1324] text-[#DCE1FB]">
        <VantaNet className="absolute inset-0" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,19,36,0.92)_20%,rgba(12,19,36,0.35)_75%)]" aria-hidden="true" />
        <div className={`${WRAP} relative py-16 md:py-24`}>
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-4 lg:gap-16 mb-12">
            <h2 className="m-0 text-[28px] md:text-[34px] leading-tight font-medium tracking-[-0.018em] text-white max-w-[20ch]">What happens when something goes wrong at 3am</h2>
            <p className="m-0 text-[16px] leading-relaxed text-[#AEB6C8] max-w-[58ch] lg:pt-1.5">A credential phishing case as it moves through the platform. Times are from a representative incident; the products involved are the ones that handle each step.</p>
          </div>
          <ol className="m-0 p-0 list-none grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 border-t border-[#2A3247]">
            {TIMELINE.map((s, i) => (
              <li key={i} className="relative pt-5 pb-6 md:pr-6 border-b md:border-b-0 border-[#1E2638]">
                <span className="absolute -top-[5px] left-0 w-[9px] h-[9px] rounded-full bg-[#0C1324] border-2 border-[#44D8F1]" aria-hidden="true" />
                <div className="cs-mono text-[13px] text-white">{s.t}</div>
                <div className="mt-1 text-[13px] text-[#44D8F1]">{s.who}</div>
                <p className="m-0 mt-2 text-[14px] leading-relaxed text-[#C9D0DD]">{s.what}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Principles ── */}
      <section className={`${WRAP} py-16 md:py-24 grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-8 lg:gap-16`}>
        <div>
          <h2 className="m-0 text-[28px] md:text-[34px] leading-tight font-medium tracking-[-0.018em]">How we build security products</h2>
          <p className="mt-4 mb-0 text-[16px] leading-relaxed text-[#3E4555] max-w-[44ch]">Four rules we hold every release to, written by the people who would be on call if we got them wrong.</p>
        </div>
        <dl className="m-0 border-t border-[#0C1324]">
          {PRINCIPLES.map((p) => (
            <div key={p.t} className="grid grid-cols-1 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-1 sm:gap-8 py-5 border-b border-[#DCE0E7]">
              <dt className="text-[17px] font-semibold">{p.t}</dt>
              <dd className="m-0 text-[15px] leading-relaxed text-[#3E4555]">{p.d}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ── Services (from the live site) ── */}
      <section className="bg-white border-y border-[#E6E9EF]">
        <div className={`${WRAP} py-16 md:py-24 grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-8 lg:gap-16`}>
          <div>
            <h2 className="m-0 text-[28px] md:text-[34px] leading-tight font-medium tracking-[-0.018em]">Services</h2>
            <p className="mt-4 mb-0 text-[16px] leading-relaxed text-[#3E4555] max-w-[44ch]">Our consultants still take on hands-on engagements: assessments, testing, secure development and training. Many clients start here and later move onto a platform.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {SERVICE_GROUPS.map((g) => (
              <nav key={g.title} aria-label={g.title} className="flex flex-col">
                <Link to={g.to} className="pb-3 mb-1 border-b border-[#0C1324] text-[16px] font-semibold hover:text-[#1D4ED8]">{g.title}</Link>
                {g.items.map((it) => (
                  <Link key={it.to} to={it.to} className="py-2.5 border-b border-[#E6E9EF] text-[15px] text-[#3E4555] hover:text-[#1D4ED8]">{it.name}</Link>
                ))}
              </nav>
            ))}
          </div>
        </div>
      </section>

      {/* ── Who we are (from the live site) ── */}
      <section className={`${WRAP} py-16 md:py-24 grid grid-cols-1 lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)] gap-10 lg:gap-16 items-center`}>
        <figure className="m-0">
          <img
            alt="CyberSage server room"
            className="w-full aspect-[4/3] object-cover grayscale rounded-[2px]"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuChfg-CdjjDpS1V3Svxlir1JeTLMiHW3_hSB04KZupS0bfaHH6j2JbNo6XBqaGQHUBqVJXMxF6HZb_RRAbRntT0LSogZyyQdiDG22jTcr3wHD1Byq5cDcZxAJrwMZ4YQ9fNulESpaFM4210qwWz199Zee8_4IrykD95rJh82mqsl7n5tQICal_O0s_icHMHHvwgip69B-RuotebJYrQDXblW_QnPd7CIzsvYwiWAAXGWtSYSfjvhCNDjUjfNETILm6bM5kBWoMuNuY"
            loading="lazy"
          />
        </figure>
        <div className="flex flex-col gap-5 max-w-[56ch]">
          <h2 className="m-0 text-[28px] md:text-[34px] leading-tight font-medium tracking-[-0.018em]">Founded by people who work incidents</h2>
          <p className="m-0 text-[16px] leading-relaxed text-[#3E4555]">CyberSage was started by security researchers, investigators and developers who spent years responding to breaches with tools that did not talk to each other. We set out to give organisations back control of their own security, without needing a twenty-person SOC to get it.</p>
          <p className="m-0 text-[16px] leading-relaxed text-[#3E4555]">The same team still runs client engagements and teaches in Vault, which is how the products stay honest about what works.</p>
          <div className="flex flex-wrap gap-x-6 gap-y-3 pt-1">
            <Link to="/core-team" className="cs-btn cs-btn-secondary">Meet the core team</Link>
            <Link to="/about" className="cs-link self-center text-[15px] font-medium">About CyberSage</Link>
          </div>
        </div>
      </section>

      {/* ── Clients and partners (live data) ── */}
      {clients.length > 0 && (
        <section className="bg-white border-y border-[#E6E9EF]">
          <div className={`${WRAP} py-14 md:py-16`}>
            <h2 className="m-0 mb-8 text-[16px] font-semibold">Clients and partners</h2>
            <ul className="m-0 p-0 list-none grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 border-t border-l border-[#E6E9EF]">
              {clients.map((client, idx) => (
                <li key={idx} className="h-24 border-r border-b border-[#E6E9EF] flex items-center justify-center p-5">
                  {client.logo
                    ? <img src={client.logo} alt={client.name} className="max-w-full max-h-full object-contain grayscale opacity-80" loading="lazy" />
                    : <span className="text-[15px] font-semibold text-center">{client.name}</span>}
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
            <blockquote className="m-0 text-[24px] md:text-[30px] leading-snug font-medium tracking-[-0.012em]">&ldquo;{featured.content}&rdquo;</blockquote>
            <figcaption className="mt-6 text-[15px]"><span className="font-semibold">{featured.name}</span><span className="text-[#5F6676]">{featured.role ? `, ${featured.role}` : ''}{featured.company ? `, ${featured.company}` : ''}</span></figcaption>
          </figure>
          {moreQuotes.length > 0 && (
            <div className="border-t border-[#0C1324]">
              {moreQuotes.slice(0, 4).map((t, i) => (
                <figure key={i} className="m-0 py-5 border-b border-[#DCE0E7]">
                  <blockquote className="m-0 text-[15px] leading-relaxed text-[#3E4555]">&ldquo;{t.content}&rdquo;</blockquote>
                  <figcaption className="mt-2 text-[13px]"><span className="font-semibold">{t.name}</span><span className="text-[#5F6676]">{t.company ? `, ${t.company}` : ''}</span></figcaption>
                </figure>
              ))}
            </div>
          )}
        </section>
      )}

      {/* ── Contact ── */}
      <section className="bg-white border-t border-[#E6E9EF]">
        <div className={`${WRAP} py-16 md:py-20 grid grid-cols-1 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] gap-8 md:gap-16 items-end`}>
          <div>
            <h2 className="m-0 text-[28px] md:text-[34px] leading-tight font-medium tracking-[-0.018em]">Talk to the people who build it</h2>
            <p className="mt-4 mb-0 text-[16px] leading-relaxed text-[#3E4555] max-w-[56ch]">A 30-minute call with an engineer, not a sales script. Tell us what you are protecting and we will show you the parts of the platform that matter for it.</p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <Link to="/contact" className="cs-btn cs-btn-primary">Book a demo</Link>
            <Link to="/security-services" className="cs-btn cs-btn-secondary">Browse services</Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default LandingPage;
