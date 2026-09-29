import React from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS, SERVICE_GROUPS, COMPANY_LINKS, RESOURCE_LINKS } from '../../data/ecosystem';

const Col = ({ title, links }) => (
  <div className="flex flex-col gap-3">
    <div className="text-[13px] font-bold text-outline">{title}</div>
    {links.map((l) => (
      <Link key={l.to + l.name} to={l.to} className="text-[15px] text-on-surface hover:text-tertiary transition-colors">{l.name}</Link>
    ))}
  </div>
);

export default function SiteFooter() {
  return (
    <footer className="mt-auto bg-surface-container-lowest border-t border-surface-container-high">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 pt-14 pb-9 flex flex-col gap-12">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          <div className="lg:w-[340px] flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-3" aria-label="CyberSage home">
              <img src="/brand/emblem.png" alt="" className="w-9 h-9 object-contain" />
              <img src="/brand/wordmark.png" alt="CyberSage" className="h-[17px] w-auto object-contain" />
            </Link>
            <p className="text-[15px] leading-relaxed text-outline">Intelligent platforms for work, education, cyber skills and security operations, designed to work together.</p>
          </div>
          <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-8">
            <Col title="Products" links={PRODUCTS.map((p) => ({ name: p.name, to: `/products/${p.slug}` }))} />
            <Col title="Services" links={[...SERVICE_GROUPS.map((g) => ({ name: g.title, to: g.to })), { name: 'Internships', to: '/training/internship' }]} />
            <Col title="Company" links={COMPANY_LINKS} />
            <Col title="Resources" links={[...RESOURCE_LINKS, { name: 'Client portal', to: '/login' }]} />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6 border-t border-surface-container-high text-[13px] text-outline">
          <div>© {new Date().getFullYear()} CyberSage. All rights reserved.</div>
          {/* Legal pages don't exist yet on the live site; plain text until they do */}
          <div className="flex gap-6">
            <span>Privacy policy</span>
            <span>Terms of service</span>
            <span>Ethics protocol</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
