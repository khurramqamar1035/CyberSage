import React from 'react';
import { Outlet } from 'react-router-dom';
import SiteNav from './site/SiteNav';
import SiteFooter from './site/SiteFooter';
import SmoothScroll from './site/SmoothScroll';

export default function PublicLayout() {

  return (
    <div className="min-h-screen flex flex-col bg-paper text-k cs-sans selection:bg-brand selection:text-white">
      <SmoothScroll />
      <SiteNav />
      <div className="relative flex-grow flex flex-col pt-16">
        <Outlet />
      </div>
      <SiteFooter />
    </div>
  );
}
