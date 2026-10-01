import React, { useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { PRODUCTS, productBySlug } from '../../data/ecosystem';
import ProductVisual from '../../components/site/ProductVisual';
import ProductStage from '../../components/site/ProductStage';
import ProductMark from '../../components/site/ProductMark';
import { MagneticLink, Reveal, RevealText, SectionMarker } from '../../components/site/motion';

const WRAP = 'max-w-[1320px] mx-auto px-5 md:px-8';

function FitDiagram({ product }) {
  // Where the product sits: what it takes in, what it hands on
  const Col = ({ title, items }) => (
    <div>
      <div className="cs-meta text-[#5F6676] mb-2">{title}</div>
      <ul className="m-0 p-0 list-none border-t border-[#DCE0E7]">
        {items.map((i) => <li key={i} className="py-2.5 border-b border-[#DCE0E7] text-[15px]">{i}</li>)}
      </ul>
    </div>
  );
  return (
    <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] gap-6 md:gap-8 items-center">
      <Col title="Takes in" items={product.inputs} />
      <div className="flex md:flex-col items-center gap-3 justify-center">
        <svg className="hidden md:block" width="40" height="12" viewBox="0 0 40 12" aria-hidden="true"><path d="M0 6 H36 M30 1 L36 6 L30 11" stroke="#8B92A1" fill="none" strokeWidth="1.25" /></svg>
        <div className={`px-5 py-4 rounded-[3px] text-center ${product.slug === 'brain' ? 'bg-[#2563EB] text-white' : 'bg-[#0C1324] text-white'}`}>
          <div className="flex justify-center mb-1.5"><ProductMark slug={product.slug} size={22} color="#fff" accent={product.slug === 'brain' ? '#fff' : '#7FA2FF'} /></div>
          <div className="text-[15px] font-medium whitespace-nowrap">{product.name}</div>
          <div className="cs-meta opacity-80">{product.role}</div>
        </div>
        <svg className="hidden md:block" width="40" height="12" viewBox="0 0 40 12" aria-hidden="true"><path d="M0 6 H36 M30 1 L36 6 L30 11" stroke="#8B92A1" fill="none" strokeWidth="1.25" /></svg>
      </div>
      <Col title="Hands on" items={product.outputs} />
    </div>
  );
}

export default function ProductPage() {
  const { slug } = useParams();
  const product = productBySlug(slug);

  useEffect(() => {
    if (product) document.title = `${product.name}: ${product.line.replace(/\.$/, '')} | CyberSage`;
    return () => { document.title = 'CyberSage | Security infrastructure for organisations that cannot afford to guess'; };
  }, [product]);

  if (!product) return <Navigate to="/" replace />;
  const others = PRODUCTS.filter((p) => p.slug !== product.slug);

  return (
    <main className="cs-sans text-[#0C1324]" key={product.slug}>
      {/* ── Hero: statement + technical annotation ── */}
      <section className="cs-paper"><div className={`${WRAP} pt-10 md:pt-12 pb-14 md:pb-20`}>
        <nav aria-label="Breadcrumb" className="cs-meta text-[#5F6676] flex flex-wrap items-center gap-2.5">
          <Link to="/" className="flex items-center gap-2 hover:text-[#0C1324]">
            <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><circle cx="6" cy="6" r="5" fill="none" stroke="currentColor" /><circle cx="6" cy="6" r="2" fill="#2563EB" /></svg>CyberSage
          </Link><span aria-hidden="true">/</span>
          <Link to="/#platform" className="hover:text-[#0C1324]">Products</Link><span aria-hidden="true">/</span>
          <span aria-current="page" className="text-[#0C1324]">{product.name}</span>
        </nav>
        <div className="mt-10 md:mt-14 grid grid-cols-1 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] gap-12 lg:gap-20">
          <div>
            <div className="flex items-center gap-3">
              <ProductMark slug={product.slug} size={34} accent="#2563EB" />
              <div><div className="text-[16px] font-medium">{product.name}</div><div className="cs-meta text-[#5F6676]">{product.role} / {String(PRODUCTS.indexOf(product) + 1).padStart(2, '0')}</div></div>
            </div>
            <RevealText as="h1" className="mt-7 mb-0 text-[34px] sm:text-[42px] lg:text-[48px] leading-[1.06] font-medium tracking-[-0.032em] max-w-[18ch]">{product.line}</RevealText>
            <Reveal delay={0.1}>
              <p className="mt-6 mb-0 text-[17px] leading-relaxed text-[#3E4555] max-w-[60ch]">{product.desc}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <MagneticLink to="/contact">{product.cta}</MagneticLink>
                <MagneticLink to="/#platform" variant="secondary" arrow={false}>See the whole platform</MagneticLink>
              </div>
            </Reveal>
          </div>
          <aside aria-label={`${product.name} at a glance`} className="lg:pt-16">
            <div className="cs-meta text-[#5F6676] mb-3">At a glance</div>
            <dl className="m-0 border-t border-[#0C1324] text-[14px]">
              <div className="py-3 border-b border-[#DCE0E7] grid grid-cols-[110px_minmax(0,1fr)] gap-4"><dt className="cs-meta text-[#5F6676] pt-0.5">Layer</dt><dd className="m-0">{product.role}</dd></div>
              <div className="py-3 border-b border-[#DCE0E7] grid grid-cols-[110px_minmax(0,1fr)] gap-4"><dt className="cs-meta text-[#5F6676] pt-0.5">Takes in</dt><dd className="m-0">{product.inputs.join(', ')}</dd></div>
              <div className="py-3 border-b border-[#DCE0E7] grid grid-cols-[110px_minmax(0,1fr)] gap-4"><dt className="cs-meta text-[#5F6676] pt-0.5">Hands on</dt><dd className="m-0">{product.outputs.join(', ')}</dd></div>
              <div className="py-3 border-b border-[#DCE0E7] grid grid-cols-[110px_minmax(0,1fr)] gap-4"><dt className="cs-meta text-[#5F6676] pt-0.5">Works with</dt><dd className="m-0">{others.map((o, i) => <React.Fragment key={o.slug}>{i > 0 && ', '}<Link to={`/products/${o.slug}`} className="cs-link">{o.name}</Link></React.Fragment>)}</dd></div>
            </dl>
          </aside>
        </div>
      </div></section>

      {/* ── The product itself ── */}
      <section className="bg-white border-y border-[#E6E9EF] overflow-hidden">
        <div className={`${WRAP} pt-10 pb-16 md:pb-24`}>
          <SectionMarker index={1} total={4} label="Interface" />
          <div className="mt-12">
            <ProductStage product={product} rail={[['System', `${product.name.replace('Sage ', '')} / ${product.role}`], ['Takes in', product.inputs[0]], ['Hands on', product.outputs[0]], ['Interface', 'Simulated']]} caption={product.figure}>
              <ProductVisual product={product} caption={false} />
            </ProductStage>
          </div>
        </div>
      </section>

      {/* ── Capabilities ── */}
      <section className="cs-paper"><div className={`${WRAP} pt-10 pb-16 md:pb-24`}>
        <SectionMarker index={2} total={4} label="Capabilities" />
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-8 lg:gap-16">
        <RevealText className="m-0 text-[28px] md:text-[36px] leading-[1.1] font-medium tracking-[-0.025em]">What {product.name} does.</RevealText>
        <dl className="m-0 border-t border-[#0C1324]">
          {product.caps.map((c) => (
            <div key={c.t} className="grid grid-cols-1 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-1 sm:gap-8 py-5 border-b border-[#DCE0E7]">
              <dt className="text-[17px] font-medium tracking-[-0.01em]">{c.t}</dt>
              <dd className="m-0 text-[15px] leading-relaxed text-[#3E4555]">{c.d}</dd>
            </div>
          ))}
        </dl>
        </div>
      </div></section>

      {/* ── Where it sits ── */}
      <section className="bg-white border-y border-[#E6E9EF]">
        <div className={`${WRAP} pt-10 pb-16 md:pb-20`}>
          <SectionMarker index={3} total={4} label="Architecture" />
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-8 lg:gap-16">
          <div>
            <RevealText className="m-0 text-[28px] md:text-[36px] leading-[1.1] font-medium tracking-[-0.025em]">Where it sits in the platform.</RevealText>
            <p className="mt-4 mb-0 text-[16px] leading-relaxed text-[#3E4555] max-w-[44ch]">{product.with}</p>
          </div>
          <FitDiagram product={product} />
          </div>
        </div>
      </section>

      {/* ── Other products ── */}
      <section className="cs-paper"><div className={`${WRAP} pt-10 pb-16 md:pb-20`}>
        <SectionMarker index={4} total={4} label="Platform" />
        <h2 className="m-0 mt-10 mb-6 text-[20px] font-medium tracking-[-0.015em]">The rest of the platform</h2>
        <ul className="m-0 p-0 list-none border-t border-[#0C1324]">
          {others.map((o) => (
            <li key={o.slug}>
              <Link to={`/products/${o.slug}`} className="cs-row-link grid grid-cols-1 sm:grid-cols-[220px_minmax(0,1fr)_auto] gap-1 sm:gap-8 py-4 border-b border-[#DCE0E7] items-baseline">
                <span className="cs-row-title text-[17px] font-medium flex items-center gap-3 transition-colors"><ProductMark slug={o.slug} size={22} accent="#2563EB" />{o.name}</span>
                <span className="text-[15px] text-[#3E4555]">{o.line}</span>
                <span className="hidden sm:inline text-[#1D4ED8]"><svg className="cs-btn-arrow" width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M2 8h11M9 4l4 4-4 4" /></svg></span>
              </Link>
            </li>
          ))}
        </ul>
      </div></section>

      {/* ── Contact ── */}
      <section className="cs-char text-white">
        <div className={`${WRAP} py-14 md:py-16 flex flex-col md:flex-row md:items-center justify-between gap-6`}>
          <div>
            <h2 className="m-0 text-[24px] md:text-[28px] font-medium tracking-[-0.015em]">See {product.name} on your own environment</h2>
            <p className="mt-2 mb-0 text-[15px] text-[#AEB6C8]">A 30-minute session with an engineer who works on it.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <MagneticLink to="/contact" variant="on-dark">{product.cta}</MagneticLink>
            <MagneticLink to="/security-services" variant="ghost-dark" arrow={false}>Browse services</MagneticLink>
          </div>
        </div>
      </section>
    </main>
  );
}
