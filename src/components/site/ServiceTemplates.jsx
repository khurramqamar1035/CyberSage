import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { MagneticLink, Reveal } from './motion';

// Shared layouts for the services, development and training pages.
// Content lives in src/data/services/*.js.

const WRAP = 'max-w-[1400px] mx-auto px-6 md:px-10';
const EASE = [0.23, 1, 0.32, 1];
const GROUP = {
  security: { label: 'Security services', path: '/security-services' },
  development: { label: 'Development', path: '/development-services' },
  training: { label: 'Training', path: '/training' },
};

export const Guides = ({ dark }) => <div className={`cs-guides ${dark ? 'on-dark' : ''}`} aria-hidden="true"><div /></div>;
const Arrow = ({ down }) => (
  <svg className="cs-btn-arrow shrink-0" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
    <path d={down ? 'M8 1v13M3 9l5 5 5-5' : 'M1 8h13M9 3l5 5-5 5'} />
  </svg>
);
const H2 = ({ children, className = '' }) => <h2 className={`m-0 t-wide font-[250] text-[30px] md:text-[44px] leading-[1.04] tracking-[-0.03em] ${className}`}>{children}</h2>;

/* Black page hero: breadcrumb, identifier word, statement and call to action */
export function PageHero({ crumbs, word, title, intro, children }) {
  const reduce = useReducedMotion();
  return (
    <section className="relative s-black tx-grain overflow-hidden text-[#ECEEF1]">
      <Guides dark />
      <div className={`${WRAP} relative pt-10 md:pt-14 pb-14 md:pb-20`}>
        <nav aria-label="Breadcrumb" className="cs-meta text-[#5B6575] flex flex-wrap items-center gap-2.5">
          {crumbs.map((c, i) => (
            <React.Fragment key={c.label}>
              {i > 0 && <span aria-hidden="true">/</span>}
              {c.to ? <Link to={c.to} className="hover:text-[#ECEEF1] transition-colors">{c.label}</Link> : <span aria-current="page" className="text-[#ECEEF1]">{c.label}</span>}
            </React.Fragment>
          ))}
        </nav>
        {word && (
          <motion.div aria-hidden="true" className="mt-8 t-expanded font-[200] leading-[0.8] tracking-[-0.03em] whitespace-nowrap text-[min(40px,9vw)] sm:text-[64px] lg:text-[88px]"
            initial={reduce ? false : { x: 24, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.9, ease: EASE }}>
            {word}
          </motion.div>
        )}
        <div className="mt-10 md:mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-end">
          <h1 className="lg:col-span-7 m-0 t-wide font-[250] text-[32px] sm:text-[44px] lg:text-[54px] leading-[1.04] tracking-[-0.035em] max-w-[20ch]">{title}</h1>
          <div className="lg:col-span-4 lg:col-start-9 flex flex-col gap-6">
            {intro && <p className="m-0 text-[16px] leading-relaxed text-[#A9B8D0]">{intro}</p>}
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

/* Black closing band */
export function ClosingCTA({ title, text, links }) {
  return (
    <section className="relative s-black tx-grain overflow-hidden text-[#ECEEF1]">
      <Guides dark />
      <div className={`${WRAP} relative py-16 md:py-24 grid grid-cols-1 md:grid-cols-12 gap-8 items-end`}>
        <h2 className="md:col-span-7 m-0 t-expanded font-[200] text-[36px] sm:text-[52px] lg:text-[68px] leading-[0.95] tracking-[-0.04em]">{title}</h2>
        <div className="md:col-span-4 md:col-start-9 flex flex-col gap-5">
          {text && <p className="m-0 text-[16px] leading-relaxed text-[#A9B8D0]">{text}</p>}
          <div className="flex flex-wrap gap-3">
            {links.map((l, i) => <MagneticLink key={l.label} to={l.to} variant={i === 0 ? 'primary' : 'ghost-dark'} arrow={i === 0}>{l.label}</MagneticLink>)}
          </div>
        </div>
      </div>
    </section>
  );
}

/* Ruled, numbered rows */
function Rows({ items, numbered = true }) {
  return (
    <dl className="m-0 border-t border-[#07090D]">
      {items.map((it, i) => (
        <div key={it.t} className={`grid ${numbered ? 'grid-cols-[40px_minmax(0,1fr)] sm:grid-cols-[48px_minmax(0,2fr)_minmax(0,3fr)]' : 'grid-cols-1 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]'} gap-x-4 gap-y-1 sm:gap-8 py-5 border-b border-[rgba(7,9,13,0.14)]`}>
          {numbered && <span className="cs-data text-[#5B6575] pt-1">{String(i + 1).padStart(2, '0')}</span>}
          <dt className="text-[18px] font-medium tracking-[-0.01em]">{it.t}</dt>
          {(it.d || (it.tags && it.tags.length > 0)) && (
            <dd className={`m-0 ${numbered ? 'col-start-2 sm:col-start-auto' : ''} text-[15px] leading-relaxed text-[#3E4555]`}>
              {it.d}
              {it.tags && it.tags.length > 0 && <span className="block mt-2 cs-meta text-[#5B6575]">{it.tags.join(' · ')}</span>}
            </dd>
          )}
        </div>
      ))}
    </dl>
  );
}

const priceOf = (s) => (s.facts || []).find((f) => /price|fee|cost/i.test(f.label));

/* ═════════ Hub page (Security services / Development / Training) ═════════ */
export function ServiceHub({ hub, services, renderSectionLink }) {
  const g = GROUP[hub.group];
  // Hub-specific index rows (security has its own price + meta per item)
  const indexItems = (hub.sections.find((s) => s.items.some((i) => i.to)) || {}).items
    || services.map((s) => {
      const p = priceOf(s);
      return { t: s.name, d: s.cardSummary || s.summary, to: s.path, price: p && p.value, meta: s.stack || s.tier };
    });
  const otherSections = hub.sections.filter((s) => !s.items.some((i) => i.to));

  return (
    <main className="cs-sans">
      <PageHero crumbs={[{ label: 'CyberSage', to: '/' }, { label: g.label }]} word={hub.word} title={hub.title} intro={hub.intro}>
        <div className="flex flex-wrap gap-3">
          <MagneticLink to="/contact" variant="on-dark">Book a consultation</MagneticLink>
          <MagneticLink href="#index" variant="ghost-dark" arrow={false}>See all {services.length}</MagneticLink>
        </div>
      </PageHero>

      <section id="index" className="relative s-paper tx-dot overflow-hidden scroll-mt-16">
        <Guides />
        <div className={`${WRAP} relative py-16 md:py-20`}>
          <H2>{hub.group === 'training' ? 'Courses.' : 'Services.'}</H2>
          <ul className="m-0 mt-10 p-0 list-none border-t border-[#07090D]">
            {indexItems.map((it, i) => (
              <li key={it.to}>
                <Link to={it.to} className="cs-row-link grid grid-cols-[40px_minmax(0,1fr)_auto] md:grid-cols-[56px_minmax(0,1.1fr)_minmax(0,1.6fr)_150px_auto] gap-x-4 md:gap-x-8 gap-y-2 py-6 border-b border-[rgba(7,9,13,0.14)] items-baseline">
                  <span className="cs-data text-[#5B6575]">{String(i + 1).padStart(2, '0')}</span>
                  <span className="cs-row-title text-[22px] md:text-[26px] font-normal tracking-[-0.02em] transition-colors">{it.t}</span>
                  <span className="hidden md:block text-[15px] leading-relaxed text-[#3E4555]">{it.d}</span>
                  <span className="hidden md:block text-right">
                    {it.price && <span className="block text-[18px] font-medium">{it.price}</span>}
                    {it.meta && <span className="block cs-meta text-[#5B6575] mt-1">{it.meta}</span>}
                  </span>
                  <Arrow />
                  <span className="md:hidden col-start-2 col-span-2 text-[15px] leading-relaxed text-[#3E4555]">{it.d}{it.price && <span className="block mt-2 text-[#07090D] font-medium">{it.price}{it.meta ? ` · ${it.meta}` : ''}</span>}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {otherSections.map((s, i) => (
        <section key={s.title} className={`relative overflow-hidden ${i % 2 ? 'bg-white' : 's-off'}`}>
          <Guides />
          <div className={`${WRAP} relative py-16 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12`}>
            <Reveal className="lg:col-span-4 flex flex-col gap-5">
              <H2>{s.title}</H2>
              {s.text && <p className="m-0 text-[16px] leading-relaxed text-[#3E4555]">{s.text}</p>}
              {s.link && renderSectionLink && renderSectionLink(s.link)}
            </Reveal>
            {s.items.length > 0 && <div className="lg:col-span-7 lg:col-start-6"><Rows items={s.items} /></div>}
          </div>
        </section>
      ))}

      {hub.spotlight && (
        <section className="relative s-navy tx-grain overflow-hidden text-[#ECEEF1]">
          <Guides dark />
          <div className={`${WRAP} relative py-14 md:py-16 grid grid-cols-1 md:grid-cols-12 gap-8 items-end`}>
            <div className="md:col-span-7">
              <div className="cs-meta text-[#8B95A5]">{hub.spotlight.label}</div>
              <h2 className="m-0 mt-3 t-wide font-[250] text-[28px] md:text-[40px] leading-[1.05] tracking-[-0.03em]">{hub.spotlight.title}</h2>
              <p className="m-0 mt-4 text-[16px] leading-relaxed text-[#A9B8D0] max-w-[56ch]">{hub.spotlight.text}</p>
            </div>
            <div className="md:col-span-4 md:col-start-9 flex flex-wrap gap-3">
              <MagneticLink to="/products/sentinel" variant="on-dark">About Sage Sentinel</MagneticLink>
              {hub.spotlight.links.filter((l) => l.to !== '/contact').map((l) => <MagneticLink key={l.label} to={l.to} variant="ghost-dark" arrow={false}>{l.label}</MagneticLink>)}
            </div>
          </div>
        </section>
      )}

      <ClosingCTA
        title={hub.cta ? hub.cta.title : 'Talk to the team.'}
        text={hub.cta ? hub.cta.text : 'Tell us what you need and we will tell you how we can help.'}
        links={[{ label: 'Book a consultation', to: '/contact' }, { label: 'All services', to: '/#services' }]}
      />
    </main>
  );
}

/* ═════════ Single service / course page ═════════ */
export function ServiceDetail({ service, siblings = [] }) {
  const g = GROUP[service.group];
  const isCourse = service.group === 'training';
  const others = siblings.filter((s) => s.slug !== service.slug);

  return (
    <main className="cs-sans">
      <PageHero crumbs={[{ label: 'CyberSage', to: '/' }, { label: g.label, to: g.path }, { label: service.name }]} word={service.word} title={service.title} intro={service.summary}>
        <div className="flex flex-wrap gap-3">
          <MagneticLink to="/contact" variant="on-dark">{isCourse ? 'Enquire about this course' : 'Book this service'}</MagneticLink>
        </div>
      </PageHero>

      {service.facts && service.facts.length > 0 && (
        <section className="relative s-char overflow-hidden text-[#ECEEF1]">
          <div className={`${WRAP} relative`}>
            <dl className={`m-0 grid grid-cols-2 ${service.facts.length > 2 ? 'md:grid-cols-4' : 'md:grid-cols-2'} border-l border-[rgba(236,238,241,0.12)]`}>
              {service.facts.map((f) => (
                <div key={f.label} className="py-6 md:py-8 px-5 border-r border-b md:border-b-0 border-[rgba(236,238,241,0.12)]">
                  <dt className="cs-meta text-[#8B95A5]">{f.label}</dt>
                  <dd className="m-0 mt-2 t-condensed text-[26px] md:text-[34px] leading-none font-light">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}

      {service.features && service.features.length > 0 && (
        <section className="relative s-paper tx-dot overflow-hidden">
          <Guides />
          <div className={`${WRAP} relative py-16 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12`}>
            <Reveal className="lg:col-span-4"><H2>{isCourse ? 'What you will learn.' : 'What is included.'}</H2></Reveal>
            <div className="lg:col-span-7 lg:col-start-6"><Rows items={service.features} /></div>
          </div>
        </section>
      )}

      {service.process && service.process.length > 0 && (
        <section className="relative s-off overflow-hidden">
          <Guides />
          <div className={`${WRAP} relative py-16 md:py-20`}>
            <H2>{isCourse ? 'Course outline.' : 'How it works.'}</H2>
            <ol className={`m-0 mt-10 p-0 list-none grid grid-cols-1 sm:grid-cols-2 ${service.process.length >= 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} border-t border-[#07090D]`}>
              {service.process.map((p, i) => (
                <li key={p.t} className="pt-5 pb-6 pr-6 border-b sm:border-b-0 border-[rgba(7,9,13,0.14)]">
                  <div className="t-condensed text-[40px] leading-none font-light text-[#5B6575] tabular-nums">{String(i + 1).padStart(2, '0')}</div>
                  <div className="mt-4 text-[18px] font-medium tracking-[-0.01em]">{p.t}</div>
                  {p.d && <p className="m-0 mt-2 text-[15px] leading-relaxed text-[#3E4555]">{p.d}</p>}
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {(service.extra || []).map((x, i) => (
        <section key={x.title} className={`relative overflow-hidden ${i % 2 ? 's-paper' : 'bg-white'}`}>
          <Guides />
          <div className={`${WRAP} relative py-16 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12`}>
            <Reveal className="lg:col-span-4 flex flex-col gap-4">
              <H2>{x.title}</H2>
              {x.text && <p className="m-0 text-[16px] leading-relaxed text-[#3E4555]">{x.text}</p>}
            </Reveal>
            {x.items && x.items.length > 0 && <div className="lg:col-span-7 lg:col-start-6"><Rows items={x.items} numbered={x.items.some((it) => it.d)} /></div>}
          </div>
        </section>
      ))}

      {others.length > 0 && (
        <section className="relative bg-white overflow-hidden border-t border-[rgba(7,9,13,0.08)]">
          <Guides />
          <div className={`${WRAP} relative py-16 md:py-20`}>
            <h2 className="m-0 t-wide font-[250] text-[26px] md:text-[34px] leading-[1.05] tracking-[-0.03em]">{isCourse ? 'Other courses.' : `More ${g.label.toLowerCase()}.`}</h2>
            <ul className="m-0 mt-8 p-0 list-none border-t border-[#07090D]">
              {others.map((o) => {
                const p = priceOf(o);
                return (
                  <li key={o.slug}>
                    <Link to={o.path} className="cs-row-link grid grid-cols-[minmax(0,1fr)_auto] md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)_140px_auto] gap-x-6 gap-y-1 py-5 border-b border-[rgba(7,9,13,0.14)] items-baseline">
                      <span className="cs-row-title text-[19px] font-normal tracking-[-0.015em] transition-colors">{o.name}</span>
                      <span className="hidden md:block text-[15px] text-[#3E4555]">{o.cardSummary || o.summary}</span>
                      <span className="hidden md:block text-right text-[15px] font-medium">{p ? p.value : ''}</span>
                      <Arrow />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      )}

      <ClosingCTA
        title={service.cta ? service.cta.title : 'Talk to the team.'}
        text={service.cta ? service.cta.text : ''}
        links={[{ label: isCourse ? 'Enquire now' : 'Book this service', to: '/contact' }, { label: `All ${g.label.toLowerCase()}`, to: g.path }]}
      />
    </main>
  );
}
