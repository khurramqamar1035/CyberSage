import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Bell } from 'lucide-react';
import NotificationDropdown from './NotificationDropdown';

const DashboardLayout = () => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  return (
    <div className="flex h-screen w-full bg-slate-950 overflow-hidden">
      {/* Sidebar - Fixed to the left */}
      <Sidebar />

      {/* Main Content Area - Flexible, takes up remaining space */}
      <main className="flex-1 flex flex-col h-full overflow-y-auto w-full relative bg-[#06080A]">
        
        {/* Top Header Placeholder for Notifications */}
        <div className="w-full h-16 flex justify-end items-center px-8 flex-shrink-0">
          <div className="relative">
            <button 
              className="p-2 text-slate-400 hover:text-white transition-colors relative"
              onClick={() => setIsNotificationsOpen(true)}
            >
              <Bell className="w-5 h-5" />
              {/* Red notification badge with number 9 */}
              <span className="absolute top-1 right-2 inline-flex items-center justify-center p-1 h-4 w-4 text-[10px] font-bold leading-none text-white bg-red-600 rounded-full transform translate-x-1/2 -translate-y-1/2">
                9
              </span>
            </button>
            {/* Small green dot indicator below bell */}
            <div className="absolute -bottom-1 right-3.5 w-1.5 h-1.5 bg-emerald-500 rounded-full pointer-events-none"></div>
            
            <NotificationDropdown 
              isOpen={isNotificationsOpen} 
              onClose={() => setIsNotificationsOpen(false)} 
            />
          </div>
        </div>

        <div className="container mx-auto max-w-7xl px-4 py-2 md:px-8 pb-12">
          {/* Outlet is where the nested routes will render their components */}
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
