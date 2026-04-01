import React from 'react';
import { NavLink, useNavigate, Outlet } from 'react-router-dom';
import { Shield, Building2, LogOut } from 'lucide-react';

const AdminLayout = () => {
  const navigate = useNavigate();
  const adminUser = JSON.parse(localStorage.getItem('adminUser') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-[#06080A] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0B0F19] border-r border-[#1C212E] flex flex-col fixed h-full">
        {/* Logo */}
        <div className="p-6 border-b border-[#1C212E]">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-red-500" strokeWidth={1.5} />
            <div>
              <h1 className="text-white font-bold text-lg leading-none">CyberSage</h1>
              <p className="text-red-400 text-xs font-medium mt-0.5">Admin Portal</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          <NavLink
            to="/admin/companies"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                  : 'text-slate-400 hover:bg-[#13192B] hover:text-slate-200'
              }`
            }
          >
            <Building2 className="w-5 h-5" />
            Companies
          </NavLink>
        </nav>

        {/* Admin user + logout */}
        <div className="p-4 border-t border-[#1C212E]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-200 text-sm font-medium">{adminUser.name}</p>
              <p className="text-slate-500 text-xs">{adminUser.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 text-slate-500 hover:text-red-400 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="ml-64 flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;