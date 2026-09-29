import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import SiteNav from './site/SiteNav';
import SiteFooter from './site/SiteFooter';

export default function PublicLayout() {
  const { pathname, hash } = useLocation();

  // New page → top; hash links → scroll to the section
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) { el.scrollIntoView({ block: 'start' }); return; }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return (
    <div className="bg-surface text-on-surface font-body selection:bg-primary-container selection:text-white min-h-screen flex flex-col">
      <SiteNav />
      <div className="relative flex-grow flex flex-col pt-[72px]">
        <Outlet />
      </div>
      <SiteFooter />
    </div>
  );
}
