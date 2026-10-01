import React from 'react';
import { Outlet } from 'react-router-dom';
import SiteNav from './site/SiteNav';
import SiteFooter from './site/SiteFooter';
import SmoothScroll from './site/SmoothScroll';

export default function PublicLayout() {

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F6F7] text-[#07090D] cs-sans selection:bg-[#2563EB] selection:text-white">
      <SmoothScroll />
      <SiteNav />
      <div className="relative flex-grow flex flex-col pt-16">
        <Outlet />
      </div>
      <SiteFooter />
    </div>
  );
}
