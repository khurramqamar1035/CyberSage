import React from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS, SERVICE_GROUPS, COMPANY_LINKS, RESOURCE_LINKS } from '../../data/ecosystem';

const Col = ({ title, links }) => (
  <div className="flex flex-col gap-2.5">
    <div className="text-[13px] text-dim">{title}</div>
    {links.map((l) => (
      <Link key={l.to + l.name} to={l.to} className="text-[14px] text-off hover:text-white hover:underline underline-offset-4 decoration-dim-2">{l.name}</Link>
    ))}
  </div>
);

export default function SiteFooter() {
  return (
    <footer className="cs-sans mt-auto bg-k text-off border-t border-panel-3">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-14 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-[minmax(0,1.4fr)_repeat(4,minmax(0,1fr))] gap-x-8 gap-y-10">
          <div className="col-span-2 md:col-span-1 flex flex-col gap-4 max-w-[300px]">
            <Link to="/" className="flex items-center gap-2.5" aria-label="CyberSage home">
              <img src="/brand/emblem.png" alt="" className="w-8 h-8 object-contain" />
              <img src="/brand/wordmark.png" alt="CyberSage" className="h-[15px] w-auto object-contain" />
            </Link>
            <p className="m-0 text-[14px] leading-relaxed text-cold">Security operations, intelligence, workspace, education and training platforms, built to work as one.</p>
          </div>
          <Col title="Products" links={PRODUCTS.map((p) => ({ name: p.name, to: `/products/${p.slug}` }))} />
          <Col title="Services" links={[...SERVICE_GROUPS.map((g) => ({ name: g.title, to: g.to })), { name: 'Internships', to: '/training/internship' }]} />
          <Col title="Company" links={COMPANY_LINKS} />
          <Col title="Resources" links={[...RESOURCE_LINKS, { name: 'Client portal', to: '/login' }]} />
        </div>
        <div className="mt-12 pt-6 border-t border-panel-3 flex flex-col sm:flex-row justify-between gap-3 text-[13px] text-dim">
          <span>© {new Date().getFullYear()} CyberSage. All rights reserved.</span>
          {/* Legal pages are not live yet; plain text until they are */}
          <span className="flex flex-wrap gap-x-6 gap-y-1"><span>Privacy policy</span><span>Terms of service</span><span>Ethics protocol</span></span>
        </div>
      </div>
    </footer>
  );
}
