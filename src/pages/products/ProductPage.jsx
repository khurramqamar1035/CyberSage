import React, { useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { PRODUCTS, productBySlug } from '../../data/ecosystem';
import ProductVisual from '../../components/site/ProductVisual';

const WRAP = 'max-w-[1320px] mx-auto px-5 md:px-8';

function FitDiagram({ product }) {
  // Where the product sits: what it takes in, what it hands on
  const Col = ({ title, items }) => (
    <div>
      <div className="text-[13px] text-[#5F6676] mb-2">{title}</div>
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
          <div className="text-[15px] font-semibold whitespace-nowrap">{product.name}</div>
          <div className="text-[12px] opacity-80">{product.role}</div>
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
      <section className={`${WRAP} pt-10 md:pt-14 pb-14 md:pb-20`}>
        <nav aria-label="Breadcrumb" className="text-[13px] text-[#5F6676] flex flex-wrap gap-2">
          <Link to="/" className="hover:text-[#0C1324]">Home</Link><span aria-hidden="true">/</span>
          <Link to="/#platform" className="hover:text-[#0C1324]">Products</Link><span aria-hidden="true">/</span>
          <span aria-current="page" className="text-[#0C1324]">{product.name}</span>
        </nav>
        <div className="mt-10 md:mt-14 grid grid-cols-1 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] gap-12 lg:gap-20">
          <div>
            <div className="cs-enter flex items-center gap-2.5 text-[15px] font-semibold">
              <span className="w-2.5 h-2.5 rounded-[1px]" style={{ background: product.key }} aria-hidden="true" />{product.name}
              <span className="font-normal text-[#5F6676]">{product.role}</span>
            </div>
            <h1 className="cs-enter cs-enter-2 mt-5 mb-0 text-[34px] sm:text-[42px] lg:text-[48px] leading-[1.08] font-medium tracking-[-0.022em] max-w-[18ch]">{product.line}</h1>
            <p className="cs-enter cs-enter-3 mt-6 mb-0 text-[17px] leading-relaxed text-[#3E4555] max-w-[60ch]">{product.desc}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact" className="cs-btn cs-btn-primary">{product.cta}</Link>
              <Link to="/#platform" className="cs-btn cs-btn-secondary">See the whole platform</Link>
            </div>
          </div>
          <aside aria-label={`${product.name} at a glance`} className="lg:pt-10">
            <dl className="m-0 border-t border-[#0C1324] text-[14px]">
              <div className="py-3 border-b border-[#DCE0E7] grid grid-cols-[110px_minmax(0,1fr)] gap-4"><dt className="text-[#5F6676]">Layer</dt><dd className="m-0">{product.role}</dd></div>
              <div className="py-3 border-b border-[#DCE0E7] grid grid-cols-[110px_minmax(0,1fr)] gap-4"><dt className="text-[#5F6676]">Takes in</dt><dd className="m-0">{product.inputs.join(', ')}</dd></div>
              <div className="py-3 border-b border-[#DCE0E7] grid grid-cols-[110px_minmax(0,1fr)] gap-4"><dt className="text-[#5F6676]">Hands on</dt><dd className="m-0">{product.outputs.join(', ')}</dd></div>
              <div className="py-3 border-b border-[#DCE0E7] grid grid-cols-[110px_minmax(0,1fr)] gap-4"><dt className="text-[#5F6676]">Works with</dt><dd className="m-0">{others.map((o, i) => <React.Fragment key={o.slug}>{i > 0 && ', '}<Link to={`/products/${o.slug}`} className="cs-link">{o.name}</Link></React.Fragment>)}</dd></div>
            </dl>
          </aside>
        </div>
      </section>

      {/* ── The product itself ── */}
      <section className="bg-white border-y border-[#E6E9EF]">
        <div className={`${WRAP} py-12 md:py-16`}>
          <ProductVisual product={product} />
        </div>
      </section>

      {/* ── Capabilities ── */}
      <section className={`${WRAP} py-16 md:py-24 grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-8 lg:gap-16`}>
        <h2 className="m-0 text-[28px] md:text-[34px] leading-tight font-medium tracking-[-0.018em]">What {product.name} does</h2>
        <dl className="m-0 border-t border-[#0C1324]">
          {product.caps.map((c) => (
            <div key={c.t} className="grid grid-cols-1 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-1 sm:gap-8 py-5 border-b border-[#DCE0E7]">
              <dt className="text-[17px] font-semibold">{c.t}</dt>
              <dd className="m-0 text-[15px] leading-relaxed text-[#3E4555]">{c.d}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ── Where it sits ── */}
      <section className="bg-white border-y border-[#E6E9EF]">
        <div className={`${WRAP} py-16 md:py-20 grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-8 lg:gap-16`}>
          <div>
            <h2 className="m-0 text-[28px] md:text-[34px] leading-tight font-medium tracking-[-0.018em]">Where it sits in the platform</h2>
            <p className="mt-4 mb-0 text-[16px] leading-relaxed text-[#3E4555] max-w-[44ch]">{product.with}</p>
          </div>
          <FitDiagram product={product} />
        </div>
      </section>

      {/* ── Other products ── */}
      <section className={`${WRAP} py-16 md:py-20`}>
        <h2 className="m-0 mb-6 text-[20px] font-semibold">The rest of the platform</h2>
        <ul className="m-0 p-0 list-none border-t border-[#0C1324]">
          {others.map((o) => (
            <li key={o.slug}>
              <Link to={`/products/${o.slug}`} className="cs-row-link grid grid-cols-1 sm:grid-cols-[220px_minmax(0,1fr)_auto] gap-1 sm:gap-8 py-4 border-b border-[#DCE0E7] items-baseline">
                <span className="cs-row-title text-[17px] font-semibold flex items-center gap-2.5 transition-colors"><span className="w-2 h-2 rounded-[1px]" style={{ background: o.key }} aria-hidden="true" />{o.name}</span>
                <span className="text-[15px] text-[#3E4555]">{o.line}</span>
                <span className="hidden sm:inline text-[14px] text-[#1D4ED8]">View</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Contact ── */}
      <section className="bg-[#0C1324] text-white">
        <div className={`${WRAP} py-14 md:py-16 flex flex-col md:flex-row md:items-center justify-between gap-6`}>
          <div>
            <h2 className="m-0 text-[24px] md:text-[28px] font-medium tracking-[-0.015em]">See {product.name} on your own environment</h2>
            <p className="mt-2 mb-0 text-[15px] text-[#AEB6C8]">A 30-minute session with an engineer who works on it.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/contact" className="cs-btn cs-btn-on-dark">{product.cta}</Link>
            <Link to="/security-services" className="cs-btn cs-btn-ghost-dark">Browse services</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
