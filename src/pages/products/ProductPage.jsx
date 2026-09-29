import React, { useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { PRODUCTS, productBySlug } from '../../data/ecosystem';
import ProductVisual from '../../components/site/ProductVisual';
import Reveal from '../../components/site/Reveal';

const Arrow = ({ size = 16 }) => (
  <svg className="cs-arrow" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);

export default function ProductPage() {
  const { slug } = useParams();
  const product = productBySlug(slug);

  useEffect(() => {
    if (product) document.title = `${product.name} | CyberSage`;
    return () => { document.title = 'CyberSage | One ecosystem. Multiple capabilities.'; };
  }, [product]);

  if (!product) return <Navigate to="/" replace />;
  const others = PRODUCTS.filter((p) => p.slug !== product.slug);

  return (
    <main className="relative overflow-x-hidden" key={product.slug}>
      <div className="cs-grid-bg absolute inset-x-0 top-0 h-[880px] opacity-40 pointer-events-none" aria-hidden="true" />

      {/* ── Hero ── */}
      <section className="relative max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 pt-12 lg:pt-16 flex flex-col lg:flex-row gap-12 lg:gap-14 lg:items-center">
        <div className="flex-1 flex flex-col">
          <nav aria-label="Breadcrumb" className="cs-rise cs-d1 cs-mono flex items-center gap-2.5 text-[12px] text-outline">
            <Link to="/" className="hover:text-on-surface transition-colors">Home</Link><span>/</span>
            <Link to="/#ecosystem" className="hover:text-on-surface transition-colors">Products</Link><span>/</span>
            <span className="text-on-surface-variant" aria-current="page">{product.name}</span>
          </nav>
          <div className="cs-rise cs-d1 mt-9 flex items-center gap-3"><span className="w-7 h-[3px]" style={{ background: product.color }} /><span className="cs-mono text-[13px] text-on-surface-variant">{product.num} · {product.layer}</span></div>
          <h1 className="cs-rise cs-d2 cs-display mt-4 text-[52px] sm:text-[72px] xl:text-[88px] leading-[0.96] font-semibold tracking-[-0.045em]">{product.name}</h1>
          <p className="cs-rise cs-d3 cs-display mt-4 text-[24px] sm:text-[28px] leading-tight font-medium tracking-[-0.015em]" style={{ color: product.slug === 'brain' ? '#B4C5FF' : product.color }}>{product.line}</p>
          <p className="cs-rise cs-d4 mt-5 max-w-[560px] text-[17px] sm:text-[18px] leading-relaxed text-on-surface-variant">{product.desc}</p>
          <div className="cs-rise cs-d5 mt-8 flex flex-wrap gap-3">
            <Link to="/contact" className="cs-press cs-btn-blue inline-flex items-center min-h-[52px] px-6 rounded-md bg-primary-container text-white text-[16px] font-semibold">{product.cta}</Link>
            <Link to={product.cta2To || '/contact'} className="cs-press cs-btn-line inline-flex items-center min-h-[52px] px-5 rounded-md border border-outline-variant text-[16px] font-medium">{product.cta2}</Link>
          </div>
        </div>
        <div className="cs-rise cs-d4 w-full lg:w-[600px] shrink-0">
          <ProductVisual product={product} />
        </div>
      </section>

      {/* ── Capabilities ── */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 pt-28 lg:pt-32 flex flex-col lg:flex-row gap-10 lg:gap-16">
        <Reveal as="h2" className="cs-display lg:w-[360px] text-[36px] lg:text-[44px] leading-[1.05] font-semibold tracking-[-0.03em]">{product.capHead}</Reveal>
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 border-t border-outline-variant">
          {product.caps.map((c, i) => (
            <Reveal key={c.t} delay={i * 70}
              className={`py-7 flex flex-col gap-2.5 border-b border-surface-container-high ${i % 2 === 0 ? 'md:pr-8 md:border-r' : 'md:pl-8'}`}>
              <span className="cs-mono text-[12px]" style={{ color: product.slug === 'brain' ? '#B4C5FF' : product.color }}>0{i + 1}</span>
              <h3 className="cs-display text-[22px] font-semibold tracking-tight">{c.t}</h3>
              <p className="text-[15px] leading-relaxed text-on-surface-variant">{c.d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Works with ── */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 pt-24 lg:pt-28 flex flex-col gap-6">
        <h2 className="cs-display text-[28px] lg:text-[30px] font-semibold tracking-tight">Works with the rest of the ecosystem</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {others.map((o, i) => (
            <Reveal key={o.slug} delay={i * 60}>
              <Link to={`/products/${o.slug}`} className="cs-lift cs-hover-arrow h-full p-5 rounded-lg bg-surface-container-low border border-surface-container-high flex flex-col gap-2.5">
                <span className="flex justify-between items-center"><span className="flex items-center gap-2.5"><span className="w-2 h-2 rounded-[2px]" style={{ background: o.color }} /><span className="cs-display text-[18px] font-semibold">{o.name}</span></span><span className="text-primary"><Arrow /></span></span>
                <span className="text-[14px] leading-snug text-on-surface-variant">{o.with}</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 pt-24 lg:pt-28 pb-24">
        <Reveal className="rounded-lg bg-surface-container-low border border-surface-container-high px-6 py-9 sm:px-12 sm:py-11 flex flex-col md:flex-row gap-6 md:items-center justify-between">
          <div className="flex flex-col gap-2"><h2 className="cs-display text-[30px] lg:text-[36px] font-semibold tracking-[-0.03em]">{product.ctaHead}</h2><p className="text-[16px] text-on-surface-variant">30 minutes with the team that builds it.</p></div>
          <Link to="/contact" className="cs-press cs-btn-blue inline-flex items-center justify-center min-h-[54px] px-6 rounded-md bg-primary-container text-white font-semibold">{product.cta}</Link>
        </Reveal>
      </section>
    </main>
  );
}
