import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';

const NAV_ITEMS = [
  {
    title: 'Security Services',
    path: '/security-services',
    dropdown: [
      { name: 'AI Security Audit',       path: '/security-services/ai-audit' },
      { name: 'Vulnerability Assessment', path: '/security-services/vulnerability-assessment' },
      { name: 'Penetration Testing',     path: '/security-services/penetration-testing' },
      { name: 'Real-time Monitoring',    path: '/security-services/real-time-monitoring' },
      { name: 'Security Consultation',   path: '/security-services/security-consultation' },
      { name: 'Compliance Audit',        path: '/security-services/compliance-audit' },
    ]
  },
  {
    title: 'Development Services',
    path: '/development-services',
    dropdown: [
      { name: 'Web Development',    path: '/development-services/web' },
      { name: 'Android Development', path: '/development-services/android' },
      { name: 'iOS Development',    path: '/development-services/ios' },
      { name: 'Cross-Platform',     path: '/development-services/cross-platform' },
    ]
  },
  {
    title: 'Training',
    path: '/training',
    dropdown: [
      { name: 'Beginner Training',     path: '/training/beginner' },
      { name: 'Intermediate Training', path: '/training/intermediate' },
      { name: 'Advanced Training',     path: '/training/advanced' },
    ]
  },
  {
    title: 'Core Team',
    path: '/core-team',
    dropdown: null
  },
  {
    title: 'Blog',
    path: '/blog',
    dropdown: null
  },
  {
    title: 'FAQ',
    path: '/FAQ',
    dropdown: null
  },
  {
    title: 'Contact Us',
    path: '/contact',
    dropdown: null
  },
];

function NavItem({ item, isActive }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        to={item.path}
        className={`transition-colors py-4 px-2 block relative z-20 ${
          isActive ? 'text-white font-semibold' : 'text-slate-400 hover:text-slate-100'
        }`}
      >
        {item.title}
        {isActive && (
          <span className="absolute bottom-[8px] left-2 right-2 h-[1px] bg-primary block" />
        )}
      </Link>

      {/* Dropdown */}
      {item.dropdown && (
        <div
          className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 w-64 z-50 pointer-events-auto transition-all duration-200 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
          }`}
        >
          <div className="bg-[#0c1324]/95 backdrop-blur-2xl border border-white/5 p-2 shadow-2xl rounded-sm">
            {item.dropdown.map((subItem, idx) => (
              <Link
                key={idx}
                to={subItem.path}
                className="flex items-center px-4 py-3 text-[13px] text-slate-300 hover:text-white hover:bg-white/5 transition-all rounded-sm font-body truncate group"
                onClick={() => setIsHovered(false)}
              >
                <span className="material-symbols-outlined text-[14px] mr-2 opacity-50 group-hover:opacity-100 group-hover:text-primary transition-colors">
                  arrow_right
                </span>
                {subItem.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function PublicLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isPathActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="bg-surface text-on-surface font-body selection:bg-primary-container selection:text-on-primary-container min-h-screen flex flex-col">
      {/* ── Nav ── */}
      <nav className="fixed top-0 w-full z-50 bg-[#0c1324]/80 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.06)]">
        <div className="flex justify-between items-center px-4 md:px-8 py-2 max-w-[1440px] mx-auto relative">
          <Link to="/" className="z-20">
            <img
              src="/logo.png"
              alt="CyberSage Logo"
              className="h-10 w-auto drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]"
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-6 font-['Inter'] font-medium text-[13px] tracking-tight">
            {NAV_ITEMS.map((item, index) => (
              <NavItem key={index} item={item} isActive={isPathActive(item.path)} />
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button
              className="bg-primary-container text-on-primary-container px-6 py-2 rounded-sm font-bold shadow-[0_0_15px_rgba(37,99,235,0.4)] scale-95 active:scale-90 transition-transform hover:brightness-110"
              onClick={() => navigate('/login')}
            >
              Client Portal
            </button>
            {/* Mobile hamburger */}
            <button
              className="md:hidden text-slate-300 hover:text-white p-1"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              <span className="material-symbols-outlined">{mobileOpen ? 'close' : 'menu'}</span>
            </button>
          </div>

          <div className="bg-gradient-to-r from-transparent via-[#b4c5ff]/10 to-transparent h-[1px] bottom-0 absolute left-0 right-0" />
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden bg-[#0c1324]/98 border-t border-white/5 px-6 py-4 space-y-2">
            {NAV_ITEMS.map((item, idx) => (
              <div key={idx}>
                <Link
                  to={item.path}
                  className="block py-2 text-slate-300 hover:text-white font-medium"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.title}
                </Link>
                {item.dropdown && (
                  <div className="pl-4 space-y-1">
                    {item.dropdown.map((sub, si) => (
                      <Link
                        key={si}
                        to={sub.path}
                        className="block py-1.5 text-sm text-slate-500 hover:text-slate-200"
                        onClick={() => setMobileOpen(false)}
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </nav>

      {/* ── Page content ── */}
      <div className="relative flex-grow flex flex-col pt-14">
        <Outlet />
      </div>

      {/* ── Footer ── */}
      <footer className="bg-[#0c1324] w-full border-t border-slate-800/50 mt-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-12 py-16 max-w-[1440px] mx-auto font-['Space_Grotesk'] uppercase text-[10px] tracking-[0.1em]">
          <div className="flex flex-col gap-6">
            <Link to="/" className="inline-block">
              <img
                src="/logo.png"
                alt="CyberSage Logo"
                className="h-12 w-auto opacity-80 hover:opacity-100 transition-opacity drop-shadow-[0_0_10px_rgba(255,165,0,0.3)]"
              />
            </Link>
            <p className="text-slate-500 normal-case tracking-normal">
              Leading the vanguard of digital sovereignty through advanced intelligence and defensive architecture.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-slate-100 font-bold mb-2">Platform</h4>
            <Link className="text-slate-500 hover:text-[#44d8f1] transition-colors" to="/security-services/ai-audit">Security Audit</Link>
            <Link className="text-slate-500 hover:text-[#44d8f1] transition-colors" to="/security-services/security-consultation">Consultation</Link>
            <Link className="text-slate-500 hover:text-[#44d8f1] transition-colors" to="/security-services/real-time-monitoring">Network Monitor</Link>
            <Link className="text-slate-500 hover:text-[#44d8f1] transition-colors" to="/blog">Blog</Link>
            <Link className="text-slate-500 hover:text-[#44d8f1] transition-colors" to="/FAQ">FAQ</Link>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-slate-100 font-bold mb-2">Legal</h4>
            <button className="text-slate-500 hover:text-[#44d8f1] transition-colors text-left">Privacy Policy</button>
            <button className="text-slate-500 hover:text-[#44d8f1] transition-colors text-left">Terms of Service</button>
            <button className="text-slate-500 hover:text-[#44d8f1] transition-colors text-left">Ethics Protocol</button>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-slate-100 font-bold mb-2">Contact</h4>
            <Link className="text-slate-500 hover:text-[#44d8f1] transition-colors" to="/contact">Contact Support</Link>
            <button className="text-slate-500 hover:text-[#44d8f1] transition-colors text-left">Global Offices</button>
            <div className="mt-4 flex gap-4">
              <span className="material-symbols-outlined text-slate-500 hover:text-primary cursor-pointer transition-colors">share</span>
              <span className="material-symbols-outlined text-slate-500 hover:text-primary cursor-pointer transition-colors">public</span>
            </div>
          </div>
        </div>

        <div className="px-12 py-8 border-t border-slate-800/30 text-center text-slate-600 font-['Space_Grotesk'] uppercase text-[10px] tracking-[0.1em]">
          © 2024 Cybersage Intelligence. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}
