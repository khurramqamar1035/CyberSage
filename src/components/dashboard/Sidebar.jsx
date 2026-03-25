import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Briefcase, 
  FileText, 
  CreditCard, 
  Settings, 
  LogOut,
  Shield,
  Loader2
} from 'lucide-react';

const Sidebar = () => {
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = () => {
    setIsLoggingOut(true);
    
    setTimeout(() => {
      // Clear mock authentication state
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('companyName');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userName');
      localStorage.removeItem('selectedServices');
      
      // Redirect to landing page
      navigate('/');
    }, 1500);
  };

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, exact: true },
    { path: '/dashboard/services', label: 'My Services', icon: Briefcase },
    { path: '/dashboard/reports', label: 'Reports', icon: FileText },
    { path: '/dashboard/billing', label: 'Billing', icon: CreditCard },
  ];

  const bottomNavItems = [
    { path: '/dashboard/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-[#0B0F19] border-r border-[#1C212E] flex flex-col h-full text-slate-300">
      <div className="p-6">
        <div className="flex items-center gap-3">
          <Shield className="w-8 h-8 text-blue-500" strokeWidth={1.5} />
          <h2 className="text-xl font-semibold text-slate-100 tracking-tight">
            CyberSage
          </h2>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.exact}
            className={({ isActive }) =>
              `flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-blue-600/20 text-blue-400 shadow-[inset_4px_0_0_0_rgba(59,130,246,1)]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon className="w-5 h-5 mr-3 flex-shrink-0" strokeWidth={isActive ? 2 : 1.5} />
                {item.label}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom Navigation */}
      <div className="p-3 mb-4 space-y-1">
        {bottomNavItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-blue-600/20 text-blue-400 shadow-[inset_4px_0_0_0_rgba(59,130,246,1)]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon className="w-5 h-5 mr-3 flex-shrink-0" strokeWidth={isActive ? 2 : 1.5} />
                {item.label}
              </>
            )}
          </NavLink>
        ))}

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="w-full flex justify-center items-center px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          {isLoggingOut ? (
            <Loader2 className="w-5 h-5 mr-3 flex-shrink-0 animate-spin" strokeWidth={1.5} />
          ) : (
            <LogOut className="w-5 h-5 mr-3 flex-shrink-0" strokeWidth={1.5} />
          )}
          {isLoggingOut ? "Logging out..." : "Log Out"}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
