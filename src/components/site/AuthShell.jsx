import React from 'react';
import { Link } from 'react-router-dom';

// Split layout for the client portal pages: black brand panel + paper form panel.
export const FIELD = 'w-full bg-white border border-[rgba(7,9,13,0.25)] rounded-[1px] px-4 py-3 text-[15px] text-k placeholder:text-steel focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand';
export const LABEL = 'block text-[14px] font-medium mb-2 text-k';

export default function AuthShell({ word, title, intro, children, footer, wide = false }) {
  return (
    <div className="cs-sans min-h-screen grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] bg-paper text-k">
      <aside className="relative s-black tx-grain overflow-hidden text-off flex flex-col justify-between px-6 md:px-10 py-8 lg:py-10">
        <Link to="/" className="flex items-center gap-2.5 min-h-[44px] w-fit" aria-label="CyberSage home">
          <img src="/brand/emblem.png" alt="" className="w-8 h-8 object-contain" />
          <img src="/brand/wordmark.png" alt="CyberSage" className="h-[15px] w-auto object-contain" />
        </Link>
        <div className="mt-10 lg:mt-0">
          <div aria-hidden="true" className="t-expanded font-[200] leading-[0.8] tracking-[-0.03em] text-[min(44px,10vw)] sm:text-[64px] lg:text-[80px] whitespace-nowrap">{word}</div>
          <h1 className="m-0 mt-8 t-wide font-[250] text-[28px] md:text-[38px] leading-[1.05] tracking-[-0.03em] max-w-[16ch]">{title}</h1>
          {intro && <p className="m-0 mt-4 text-[16px] leading-relaxed text-cold max-w-[44ch]">{intro}</p>}
        </div>
        <Link to="/" className="hidden lg:inline-flex cs-link text-[14px] text-cold w-fit">Back to cybersage.uk</Link>
      </aside>
      <main className="flex items-start lg:items-center justify-center px-6 md:px-10 py-12 lg:py-16">
        <div className={`w-full ${wide ? 'max-w-[720px]' : 'max-w-[440px]'}`}>
          {children}
          {footer && <div className="mt-8 pt-6 border-t border-[rgba(7,9,13,0.14)] text-[15px] text-edge-strong">{footer}</div>}
        </div>
      </main>
    </div>
  );
}
