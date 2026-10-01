import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import SiteNav from './site/SiteNav';
import SiteFooter from './site/SiteFooter';
import SmoothScroll from './site/SmoothScroll';
import { isLightRoute } from '../data/ecosystem';

export default function PublicLayout() {
  const { pathname } = useLocation();
  const light = isLightRoute(pathname);

  return (
    <div className={`min-h-screen flex flex-col ${light ? 'bg-[#F5F6F8] text-[#0C1324] cs-sans' : 'bg-surface text-on-surface font-body selection:bg-primary-container selection:text-white'}`}>
      <SmoothScroll />
      <SiteNav />
      <div className="relative flex-grow flex flex-col pt-16">
        <Outlet />
      </div>
      <SiteFooter />
    </div>
  );
}
