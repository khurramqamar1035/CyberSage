import React, { useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { PRODUCTS, productBySlug } from '../../data/ecosystem';
import ProductArt from '../../components/site/ProductArt';
import ProductMark from '../../components/site/ProductMark';
import { MagneticLink, Parallax, Reveal } from '../../components/site/motion';

const WRAP = 'max-w-[1400px] mx-auto px-6 md:px-10';
const EASE = [0.23, 1, 0.32, 1];
const WORD = { nexus: 'NEXUS', education: 'EDUCATION', vault: 'VAULT', sentinel: 'SENTINEL', brain: 'BRAIN' };
const Guides = ({ dark }) => <div className={`cs-guides ${dark ? 'on-dark' : ''}`} aria-hidden="true"><div /></div>;
const Arrow = () => <svg className="cs-btn-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true"><path d="M1 8h13M9 3l5 5-5 5" /></svg>;

export default function ProductPage() {
  const { slug } = useParams();
  const product = productBySlug(slug);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (product) document.title = `${product.name}: ${product.line.replace(/\.$/, '')} | CyberSage`;
    return () => { document.title = 'CyberSage | Security infrastructure for organisations that cannot afford to guess'; };
  }, [product]);

  if (!product) return <Navigate to="/" replace />;
  const index = PRODUCTS.indexOf(product);
  const others = PRODUCTS.filter((p) => p.slug !== product.slug);
  const next = PRODUCTS[(index + 1) % PRODUCTS.length];

  return (
    <main className="cs-sans" key={product.slug}>
      {/* ── Hero: oversized identifier, product mark, statement ── */}
      <section className="relative s-black tx-grain overflow-hidden">
        <Guides dark />
        <div className={`${WRAP} relative pt-10 md:pt-14`}>
          <nav aria-label="Breadcrumb" className="cs-meta text-dim flex flex-wrap items-center gap-2.5">
            <Link to="/" className="hover:text-off transition-colors">CyberSage</Link><span aria-hidden="true">/</span>
            <Link to="/#ch-nexus" className="hover:text-off transition-colors">Products</Link><span aria-hidden="true">/</span>
            <span aria-current="page" className="text-off">{product.name}</span>
          </nav>
          <div className="relative overflow-hidden -mx-6 md:-mx-10 px-6 md:px-10 mt-8" aria-hidden="true">
            <motion.div className="t-expanded font-[200] leading-[0.78] tracking-[-0.03em] whitespace-nowrap text-off"
              style={{ fontSize: `min(${(15.5 * Math.min(1, 7 / WORD[product.slug].length)).toFixed(2)}vw, ${Math.round(218 * Math.min(1, 7 / WORD[product.slug].length))}px)` }}
              initial={reduce ? false : { x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 1.1, ease: EASE }}>
              {WORD[product.slug]}
            </motion.div>
          </div>
          <div className="mt-12 md:mt-16 pb-16 md:pb-24 grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-4">
                <ProductMark slug={product.slug} size={40} />
                <div>
                  <div className="text-[17px] font-medium text-off">{product.name}</div>
                  <div className="cs-meta text-steel">{String(index + 1).padStart(2, '0')} / {product.role}</div>
                </div>
              </div>
              <h1 className="mt-8 mb-0 t-wide font-[250] text-[38px] sm:text-[52px] lg:text-[64px] leading-[1.02] tracking-[-0.035em] text-off max-w-[18ch]">{product.line}</h1>
            </div>
            <div className="lg:col-span-4 lg:col-start-9 flex flex-col gap-6">
              {product.tagline && <p className="m-0 cs-meta text-cold">{product.tagline}</p>}
              <p className="m-0 text-[16px] leading-relaxed text-cold">{product.desc}</p>
              <div className="flex flex-wrap items-center gap-3">
                <MagneticLink to="/contact" variant="on-dark">{product.cta}</MagneticLink>
                {product.url && <MagneticLink href={product.url} variant="ghost-dark">Visit {product.url.replace('https://', '').replace('www.', '')}</MagneticLink>}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Product art ── */}
      <section className="relative s-char overflow-hidden">
        <Guides dark />
        <div className={`${WRAP} relative py-14 md:py-20`}>
          <Parallax distance={18}>
            <div className="shadow-[0_50px_100px_-50px_rgba(0,0,0,0.9)] ring-1 ring-white/5"><ProductArt slug={product.slug} /></div>
          </Parallax>
          <p className="m-0 mt-5 text-[13px] text-dim">{product.figure} No customer data is shown.</p>
        </div>
      </section>

      {/* ── Capabilities ── */}
      <section className="relative s-paper tx-dot overflow-hidden">
        <Guides />
        <div className={`${WRAP} relative py-20 md:py-28 grid grid-cols-1 lg:grid-cols-12 gap-12`}>
          <Reveal className="lg:col-span-4">
            <h2 className="m-0 t-wide font-[250] text-[36px] md:text-[48px] leading-[1.02] tracking-[-0.03em]">What {product.name} does.</h2>
          </Reveal>
          <dl className="lg:col-span-7 lg:col-start-6 m-0 border-t border-k">
            {product.caps.map((c, i) => (
              <div key={c.t} className="grid grid-cols-[40px_minmax(0,1fr)] sm:grid-cols-[48px_minmax(0,2fr)_minmax(0,3fr)] gap-x-4 gap-y-1 sm:gap-8 py-6 border-b border-[rgba(7,9,13,0.14)]">
                <span className="cs-data text-dim pt-1">{String(i + 1).padStart(2, '0')}</span>
                <dt className="text-[19px] font-medium tracking-[-0.01em]">{c.t}</dt>
                <dd className="m-0 col-start-2 sm:col-start-auto text-[15px] leading-relaxed text-edge-strong">{c.d}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── Where it sits ── */}
      <section className="relative s-off overflow-hidden">
        <Guides />
        <div className={`${WRAP} relative py-20 md:py-28 grid grid-cols-1 lg:grid-cols-12 gap-12`}>
          <div className="lg:col-span-4">
            <h2 className="m-0 t-wide font-[250] text-[36px] md:text-[48px] leading-[1.02] tracking-[-0.03em]">Where it sits.</h2>
            <p className="mt-5 mb-0 text-[16px] leading-relaxed text-edge-strong max-w-[40ch]">{product.with}</p>
          </div>
          <div className="lg:col-span-7 lg:col-start-6 grid grid-cols-1 sm:grid-cols-2 gap-10">
            {[['Takes in', product.inputs], ['Hands on', product.outputs]].map(([t, items]) => (
              <div key={t}>
                <div className="cs-meta text-dim pb-3 border-b border-k">{t}</div>
                <ul className="m-0 p-0 list-none">
                  {items.map((i) => <li key={i} className="py-3 border-b border-[rgba(7,9,13,0.14)] text-[16px]">{i}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── The rest of the platform ── */}
      <section className="relative bg-white overflow-hidden">
        <Guides />
        <div className={`${WRAP} relative py-20 md:py-24`}>
          <h2 className="m-0 t-wide font-[250] text-[30px] md:text-[40px] leading-[1.05] tracking-[-0.03em]">The rest of the platform.</h2>
          <ul className="m-0 mt-10 p-0 list-none border-t border-k">
            {others.map((o) => (
              <li key={o.slug}>
                <Link to={`/products/${o.slug}`} className="cs-row-link grid grid-cols-1 sm:grid-cols-[260px_minmax(0,1fr)_auto] gap-1 sm:gap-8 py-5 border-b border-[rgba(7,9,13,0.14)] items-center">
                  <span className="cs-row-title text-[20px] font-normal tracking-[-0.015em] flex items-center gap-3 transition-colors"><ProductMark slug={o.slug} size={24} />{o.name}</span>
                  <span className="text-[15px] text-edge-strong">{o.line}</span>
                  <span className="hidden sm:inline"><Arrow /></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Next chapter + contact ── */}
      <section className="relative s-black tx-grain overflow-hidden">
        <Guides dark />
        <div className={`${WRAP} relative py-20 md:py-28 grid grid-cols-1 md:grid-cols-12 gap-10 items-end`}>
          <Link to={`/products/${next.slug}`} className="cs-row-link md:col-span-7 block">
            <span className="cs-meta text-dim">Next / {next.role}</span>
            <span className="cs-row-title block mt-3 t-expanded font-[200] text-[48px] sm:text-[72px] lg:text-[96px] leading-[0.9] tracking-[-0.04em] text-off transition-colors">{WORD[next.slug]}</span>
          </Link>
          <div className="md:col-span-4 md:col-start-9 flex flex-col gap-5">
            <p className="m-0 text-[16px] leading-relaxed text-cold">Want to see {product.name} for your organisation? Tell us what you need and we will set up a session.</p>
            <div className="flex flex-wrap gap-3">
              <MagneticLink to="/contact" variant="primary">{product.cta}</MagneticLink>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
