import React, { useState } from 'react';
import { NavLink, useNavigate, Outlet } from 'react-router-dom';
import { Building2, LogOut, FileText, HelpCircle, MessageSquare, Users, GraduationCap, Menu, X } from 'lucide-react';

const NAV_ITEMS = [
  { to: '/admin/companies',    icon: Building2,      label: 'Companies' },
  { to: '/admin/blogs',        icon: FileText,       label: 'Blog Posts' },
  { to: '/admin/faqs',         icon: HelpCircle,     label: 'FAQs' },
  { to: '/admin/testimonials', icon: MessageSquare,  label: 'Testimonials' },
  { to: '/admin/clients',      icon: Users,          label: 'Clients' },
  { to: '/admin/interns',      icon: GraduationCap,  label: 'Intern Applications' },
];

const AdminLayout = () => {
  const navigate   = useNavigate();
  const adminUser  = JSON.parse(localStorage.getItem('adminUser') || '{}');
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin');
  };

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="p-6 border-b border-[#1C212E] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="CyberSage" className="w-8 h-8 object-contain" />
          <div>
            <h1 className="text-white font-bold text-lg leading-none">CyberSage</h1>
            <p className="text-red-400 text-xs font-medium mt-0.5">Admin Portal</p>
          </div>
        </div>
        {/* Close button — mobile only */}
        <button
          className="md:hidden text-slate-400 hover:text-white p-1"
          onClick={() => setOpen(false)}
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                  : 'text-slate-400 hover:bg-[#13192B] hover:text-slate-200'
              }`
            }
          >
            <Icon className="w-5 h-5 flex-shrink-0" />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Admin user + logout */}
      <div className="p-4 border-t border-[#1C212E]">
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0">
            <p className="text-slate-200 text-sm font-medium truncate">{adminUser.name || 'Admin'}</p>
            <p className="text-slate-500 text-xs truncate">{adminUser.email || ''}</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex-shrink-0 p-2 text-slate-500 hover:text-red-400 transition-colors"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-[#06080A] flex">

      {/* ── Desktop sidebar (fixed) ── */}
      <aside className="hidden md:flex w-64 bg-[#0B0F19] border-r border-[#1C212E] flex-col fixed h-full z-30">
        <SidebarContent />
      </aside>

      {/* ── Mobile: hamburger bar ── */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-[#0B0F19] border-b border-[#1C212E] flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="CyberSage" className="w-7 h-7 object-contain" />
          <span className="text-white font-bold text-base">CyberSage Admin</span>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="text-slate-400 hover:text-white p-1"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* ── Mobile drawer overlay ── */}
      {open && (
        <div
          className="md:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      {/* ── Mobile drawer ── */}
      <aside
        className={`md:hidden fixed top-0 left-0 h-full w-64 bg-[#0B0F19] border-r border-[#1C212E] flex flex-col z-50 transition-transform duration-300 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <SidebarContent />
      </aside>

      {/* ── Main content ── */}
      <main className="flex-1 md:ml-64 p-4 md:p-8 pt-16 md:pt-8 min-w-0">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
