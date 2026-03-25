import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldAlert, 
  Users, 
  DollarSign, 
  Activity, 
  Lock,
  LogOut,
  UserPlus,
  Briefcase,
  Loader2,
  Building2,
  PieChart,
  ShieldCheck,
  Server
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';


const SuperAdminDashboard = () => {
  const navigate = useNavigate();
  
  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [adminRole, setAdminRole] = useState('');
  const [adminEmail, setAdminEmail] = useState('');

  // Tab State
  const [activeTab, setActiveTab] = useState('overview');

  // RBAC Team Management State
  const [staffList, setStaffList] = useState([]);
  const [newStaff, setNewStaff] = useState({ name: '', email: '', role: 'Operations' });
  const [expandedClient, setExpandedClient] = useState(null);

  // Mock Data
  const mockClients = [
    { id: 'C-001', name: 'Stark Industry', revenue: '$45,000', services: ['AI Security Audit', 'SOC Monitoring', 'Penetration Testing'], status: 'Active', progress: 85, nextAction: 'Finalizing Penetration Report' },
    { id: 'C-002', name: 'Wayne Enterprises', revenue: '$120,000', services: ['Enterprise Compliance', 'Dedicated Red Team'], status: 'Active', progress: 40, nextAction: 'Initial Discovery Phase' },
    { id: 'C-003', name: 'Acme Corp', revenue: '$15,000', services: ['Vulnerability Assessment'], status: 'Pending renewal', progress: 100, nextAction: 'Awaiting Renewal Approval' },
    { id: 'C-004', name: 'CyberDyne Systems', revenue: '$85,000', services: ['Secure Development Lifecycle', 'SOC Monitoring'], status: 'Active', progress: 65, nextAction: 'Deploying Monitoring Agents' },
  ];

  const totalRevenue = '$265,000';
  const totalClients = mockClients.length;
  const devProgress = 72; // %
  const tasksDone = 144;
  const tasksLeft = 56;

  // Initial load
  useEffect(() => {
    // Check local storage for auth and staff list
    if (localStorage.getItem('isSuperAdmin') === 'true') {
      setIsAuthenticated(true);
      setAdminRole(localStorage.getItem('adminActiveRole') || 'Super Admin');
      setAdminEmail(localStorage.getItem('adminActiveEmail') || 'peeyush@cybersage.uk');
    }

    const savedStaff = localStorage.getItem('superAdminStaffList');
    if (savedStaff) {
      const parsedStaff = JSON.parse(savedStaff);
      // Ensure Shashank is in existing list if they already had it saved
      if (!parsedStaff.find(s => s.email === 'shashank@cybersage.uk')) {
         parsedStaff.push({ id: Date.now(), name: 'Shashank R&D', email: 'shashank@cybersage.uk', role: 'Development', status: 'Offline', lastActive: 'Never' });
         localStorage.setItem('superAdminStaffList', JSON.stringify(parsedStaff));
      }
      setStaffList(parsedStaff);
    } else {
      // Default mock staff
      const defaultStaff = [
        { id: 1, name: 'Peeyush', email: 'peeyush@cybersage.uk', role: 'Super Admin', status: 'Offline', lastActive: 'Just now' },
        { id: 2, name: 'Shashank R&D', email: 'shashank@cybersage.uk', role: 'Development', status: 'Offline', lastActive: '1d ago' },
        { id: 3, name: 'Bob Finance', email: 'bob@cybersage.uk', role: 'Finance', status: 'Offline', lastActive: '2h ago' },
        { id: 4, name: 'Charlie Ops', email: 'charlie@cybersage.uk', role: 'Operations', status: 'Offline', lastActive: '12m ago' },
      ];
      setStaffList(defaultStaff);
      localStorage.setItem('superAdminStaffList', JSON.stringify(defaultStaff));
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    setAuthError('');
    setIsLoadingAuth(true);

    setTimeout(() => {
      // Authenticate against staff list
      const user = staffList.find(s => s.email === email);
      
      if (user && password === '12345') {
        setIsAuthenticated(true);
        setAdminRole(user.role);
        setAdminEmail(user.email);
        localStorage.setItem('isSuperAdmin', 'true');
        localStorage.setItem('adminActiveRole', user.role);
        localStorage.setItem('adminActiveEmail', user.email);
        
        // Update their status to online
        const updatedStaff = staffList.map(s => 
          s.email === email ? { ...s, status: 'Online', lastActive: 'Just now' } : s
        );
        setStaffList(updatedStaff);
        localStorage.setItem('superAdminStaffList', JSON.stringify(updatedStaff));
        
      } else {
        setAuthError('Unauthorized access or invalid credentials.');
      }
      setIsLoadingAuth(false);
    }, 1500);
  };

  const handleLogout = () => {
    setIsLoadingAuth(true);
    setTimeout(() => {
      // Update status to offline
      const updatedStaff = staffList.map(s => 
        s.email === adminEmail ? { ...s, status: 'Offline', lastActive: 'Just now' } : s
      );
      setStaffList(updatedStaff);
      localStorage.setItem('superAdminStaffList', JSON.stringify(updatedStaff));

      localStorage.removeItem('isSuperAdmin');
      localStorage.removeItem('adminActiveRole');
      localStorage.removeItem('adminActiveEmail');
      
      setIsAuthenticated(false);
      setAdminRole('');
      setAdminEmail('');
      setIsLoadingAuth(false);
      setActiveTab('overview');
      navigate('/');
    }, 1000);
  };

  const handleAddStaff = (e) => {
    e.preventDefault();
    if (!newStaff.name || !newStaff.email) return;

    const newEntry = {
      id: Date.now(),
      name: newStaff.name,
      email: newStaff.email,
      role: newStaff.role,
      status: 'Offline',
      lastActive: 'Never'
    };

    const updatedList = [...staffList, newEntry];
    setStaffList(updatedList);
    localStorage.setItem('superAdminStaffList', JSON.stringify(updatedList));
    setNewStaff({ name: '', email: '', role: 'Operations' });
  };

  const handleRemoveStaff = (id) => {
    const updatedList = staffList.filter(s => s.id !== id);
    setStaffList(updatedList);
    localStorage.setItem('superAdminStaffList', JSON.stringify(updatedList));
  };


  // Role Color Mapper
  const getRoleBadge = (role) => {
    switch (role) {
      case 'Super Admin': return <Badge className="bg-red-500/20 text-red-500 hover:bg-red-500/30">Super Admin (All Access)</Badge>;
      case 'Development': return <Badge className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30">R&D / Infra</Badge>;
      case 'Finance': return <Badge className="bg-amber-500/20 text-amber-500 hover:bg-amber-500/30">Billing / Books</Badge>;
      case 'Operations': return <Badge className="bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30">Ops / Client CRM</Badge>;
      case 'HR': return <Badge className="bg-purple-500/20 text-purple-400 hover:bg-purple-500/30">Human Resources</Badge>;
      default: return <Badge className="bg-slate-500/20 text-slate-400 hover:bg-slate-500/30">{role}</Badge>;
    }
  };

  // --- LOGIN VIEW ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#06080A] flex flex-col justify-center items-center p-4 relative overflow-hidden">
        {/* Hacker background elements */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900 via-[#06080A] to-[#06080A]"></div>
        
        <div className="mb-8 flex flex-col items-center z-10">
          <ShieldAlert className="w-16 h-16 text-red-600 mb-4 animate-pulse" strokeWidth={1.5} />
          <h1 className="text-3xl font-bold text-white tracking-tight">Staff Access Portal</h1>
          <p className="text-red-400/80 mt-2 text-sm uppercase tracking-widest font-semibold">Restricted Internal Zone</p>
        </div>

        <div className="w-full max-w-md bg-[#0B0F19] border border-red-900/40 rounded-2xl p-8 shadow-[0_0_40px_rgba(220,38,38,0.1)] z-10 relative">
          <form onSubmit={handleLogin} className="space-y-6">
            
            {authError && (
              <div className="bg-red-900/30 border border-red-600/50 text-red-400 text-sm p-3 rounded-lg text-center font-mono">
                [!] {authError}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Staff Identifier</label>
              <div className="relative">
                <Lock className="w-5 h-5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="staff@cybersage.uk"
                  className="w-full bg-[#13192B] border border-[#2A3441] text-slate-200 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 transition-colors font-mono"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Passphrase</label>
              <div className="relative">
                <Lock className="w-5 h-5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full bg-[#13192B] border border-[#2A3441] text-slate-200 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 transition-colors font-mono"
                />
              </div>
            </div>

            <div className="pt-2">
              <button 
                type="submit"
                disabled={isLoadingAuth}
                className="w-full h-12 flex justify-center items-center bg-red-700 hover:bg-red-600 disabled:bg-red-900/50 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-all shadow-lg hover:shadow-red-600/20 uppercase tracking-widest"
              >
                {isLoadingAuth ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  "Initiate Override"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // --- DASHBOARD VIEW ---
  return (
    <div className="flex h-screen w-full bg-[#06080A] overflow-hidden text-slate-300">
      
      {/* Sidebar */}
      <aside className="w-64 bg-[#0B0F19] border-r border-[#1C212E] flex flex-col h-full flex-shrink-0">
        <div className="p-6 border-b border-[#1C212E]">
          <div className="flex items-center gap-3 mb-2">
            <ShieldAlert className="w-8 h-8 text-red-500" />
            <h2 className="text-xl font-bold text-white tracking-tight">
              {adminRole === 'Super Admin' ? 'Super Admin' : 'Internal Portal'}
            </h2>
          </div>
          <p className="text-xs text-slate-500 font-mono">AUTH: {adminEmail}</p>
        </div>

        <nav className="flex-1 py-6 px-3 space-y-2 overflow-y-auto">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === 'overview' ? 'bg-blue-600/20 text-blue-400' : 'text-slate-400 hover:text-slate-200 hover:bg-[#13192B]'}`}
          >
            <Activity className="w-5 h-5 mr-3" /> System Overview
          </button>
          
          <button 
            onClick={() => setActiveTab('clients')}
            className={`w-full flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === 'clients' ? 'bg-blue-600/20 text-blue-400' : 'text-slate-400 hover:text-slate-200 hover:bg-[#13192B]'}`}
          >
            <Building2 className="w-5 h-5 mr-3" /> Client Database
          </button>

          {(adminRole === 'Super Admin' || adminRole === 'Finance' || adminRole === 'Operations') && (
            <button 
              onClick={() => setActiveTab('finance')}
              className={`w-full flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === 'finance' ? 'bg-amber-500/20 text-amber-500' : 'text-slate-400 hover:text-slate-200 hover:bg-[#13192B]'}`}
            >
              <DollarSign className="w-5 h-5 mr-3" /> Financials & Ops
            </button>
          )}

          {adminRole === 'Super Admin' && (
            <button 
              onClick={() => setActiveTab('rbac')}
              className={`w-full flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === 'rbac' ? 'bg-red-500/20 text-red-400' : 'text-slate-400 hover:text-slate-200 hover:bg-[#13192B]'}`}
            >
              <ShieldCheck className="w-5 h-5 mr-3" /> Team Access (RBAC)
            </button>
          )}
        </nav>

        <div className="p-4 border-t border-[#1C212E]">
          <button
            onClick={handleLogout}
            disabled={isLoadingAuth}
            className="w-full h-12 flex justify-center items-center px-4 rounded-xl text-sm font-medium text-red-500 hover:bg-red-500/10 transition-all border border-red-500/20"
          >
            {isLoadingAuth ? <Loader2 className="w-5 h-5 animate-spin" /> : <LogOut className="w-5 h-5 mr-2" />}
            {isLoadingAuth ? "" : "Sign Out"}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-8">
        
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">God's Eye Overview</h1>
              <p className="text-slate-400">High-level metrics across all operational divisions.</p>
            </div>

            {/* Top Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-[#13192B] border border-[#1C212E] p-6 rounded-2xl flex flex-col justify-between h-32">
                <div className="flex justify-between items-start">
                  <p className="text-sm font-medium text-slate-400">Total Revenue</p>
                  <DollarSign className="w-5 h-5 text-amber-500" />
                </div>
                <h3 className="text-3xl font-bold text-white">{totalRevenue}</h3>
              </div>
              <div className="bg-[#13192B] border border-[#1C212E] p-6 rounded-2xl flex flex-col justify-between h-32">
                <div className="flex justify-between items-start">
                  <p className="text-sm font-medium text-slate-400">Total Clients</p>
                  <Building2 className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="text-3xl font-bold text-white">{totalClients}</h3>
              </div>
              <div className="bg-[#13192B] border border-[#1C212E] p-6 rounded-2xl flex flex-col justify-between h-32 relative overflow-hidden">
                <div className="flex justify-between items-start z-10 relative">
                  <p className="text-sm font-medium text-slate-400">Dev Progress</p>
                  <Server className="w-5 h-5 text-emerald-400" />
                </div>
                <h3 className="text-3xl font-bold text-white z-10 relative">{devProgress}%</h3>
                <div className="absolute bottom-0 left-0 h-1 bg-emerald-500" style={{ width: `${devProgress}%` }}></div>
              </div>
              
              {(adminRole === 'Super Admin' || adminRole === 'HR') && (
                <div className="bg-[#13192B] border border-[#1C212E] p-6 rounded-2xl flex flex-col justify-between h-32">
                  <div className="flex justify-between items-start">
                    <p className="text-sm font-medium text-slate-400">Active Staff</p>
                    <Users className="w-5 h-5 text-purple-400" />
                  </div>
                  <h3 className="text-3xl font-bold text-white">{staffList.filter(s => s.status === 'Online').length} <span className="text-sm text-slate-500 font-normal">/ {staffList.length} Online</span></h3>
                </div>
              )}
            </div>

            {/* Details Row */}
            <div className={`grid grid-cols-1 ${adminRole === 'Super Admin' || adminRole === 'HR' ? 'lg:grid-cols-2' : ''} gap-6 mt-6`}>
              <div className="bg-[#0B0F19] border border-[#1C212E] rounded-2xl p-6 shadow-xl">
                 <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><PieChart className="w-5 h-5 text-blue-500"/> Work Breakdown</h3>
                 <div className="space-y-4">
                   <div>
                     <div className="flex justify-between text-sm mb-1">
                       <span className="text-slate-400">Tasks Completed</span>
                       <span className="text-emerald-400 font-bold">{tasksDone}</span>
                     </div>
                     <div className="w-full bg-slate-800 rounded-full h-2">
                       <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${(tasksDone/(tasksDone+tasksLeft))*100}%` }}></div>
                     </div>
                   </div>
                   <div>
                     <div className="flex justify-between text-sm mb-1">
                       <span className="text-slate-400">Tasks Left (Queue)</span>
                       <span className="text-amber-500 font-bold">{tasksLeft}</span>
                     </div>
                     <div className="w-full bg-slate-800 rounded-full h-2">
                       <div className="bg-amber-500 h-2 rounded-full" style={{ width: `${(tasksLeft/(tasksDone+tasksLeft))*100}%` }}></div>
                     </div>
                   </div>
                 </div>
              </div>

              {(adminRole === 'Super Admin' || adminRole === 'HR') && (
                <div className="bg-[#0B0F19] border border-[#1C212E] rounded-2xl p-6 shadow-xl">
                   <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><Users className="w-5 h-5 text-purple-500"/> Live Staff Attendance</h3>
                   <div className="space-y-3">
                     {staffList.filter(s => s.status === 'Online').map(staff => (
                       <div key={staff.id} className="flex justify-between items-center p-3 bg-[#13192B] rounded-lg border border-[#1C212E]">
                         <div className="flex items-center gap-3">
                           <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
                           <div>
                             <p className="text-sm font-bold text-slate-200">{staff.name}</p>
                             <p className="text-xs text-slate-500">{staff.role}</p>
                           </div>
                         </div>
                         <span className="text-xs text-slate-400">{staff.lastActive}</span>
                       </div>
                     ))}
                     {staffList.filter(s => s.status === 'Online').length === 0 && (
                       <p className="text-slate-500 text-sm italic">No staff currently online.</p>
                     )}
                   </div>
                </div>
              )}
            </div>
          </div>
        )}


        {/* CLIENT DATABASE TAB */}
        {activeTab === 'clients' && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Global Client Database</h1>
              <p className="text-slate-400">View all existing firm clients, their services, and status.</p>
            </div>

            <div className="bg-[#0B0F19] border border-[#1C212E] rounded-2xl shadow-xl overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead className="bg-[#13192B] border-b border-[#1C212E] text-xs text-slate-400 uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4 font-medium">Client ID / Name</th>
                    <th className="px-6 py-4 font-medium">Subscribed Services</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                    <th className="px-6 py-4 font-medium text-right">Revenue</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1C212E]">
                  {mockClients.map(client => (
                    <React.Fragment key={client.id}>
                      <tr 
                        className={`hover:bg-[#13192B]/50 transition-colors cursor-pointer ${expandedClient === client.id ? 'bg-[#13192B]' : ''}`}
                        onClick={() => setExpandedClient(expandedClient === client.id ? null : client.id)}
                      >
                        <td className="px-6 py-5">
                          <p className="font-bold text-slate-200">{client.name}</p>
                          <p className="text-xs text-slate-500 font-mono mt-1">{client.id}</p>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex flex-wrap gap-1">
                            {client.services.map((s, i) => (
                              <span key={i} className="px-2 py-1 bg-blue-900/20 text-blue-400 rounded text-xs border border-blue-500/20">{s}</span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          {client.status === 'Active' 
                            ? <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">{client.status}</Badge>
                            : <Badge className="bg-amber-500/10 text-amber-500 border border-amber-500/20">{client.status}</Badge>
                          }
                        </td>
                        <td className="px-6 py-5 text-right font-mono text-emerald-400 font-bold">
                          {client.revenue}
                        </td>
                      </tr>
                      {/* Expanded Details Row */}
                      {expandedClient === client.id && (
                        <tr className="bg-[#0B0F19] border-b border-[#1C212E]">
                          <td colSpan="4" className="px-6 py-6 pb-8 border-l-4 border-blue-500">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in duration-300">
                              <div>
                                <h4 className="text-sm font-bold text-slate-300 mb-4 uppercase tracking-wider flex items-center gap-2">
                                  <Server className="w-4 h-4 text-emerald-400" />
                                  Project Delivery Status
                                </h4>
                                <div className="space-y-4">
                                  <div>
                                    <div className="flex justify-between text-sm mb-2">
                                      <span className="text-slate-400">Overall Progress</span>
                                      <span className="text-white font-bold">{client.progress}%</span>
                                    </div>
                                    <div className="w-full bg-[#1C212E] rounded-full h-2">
                                      <div className={`h-2 rounded-full ${client.progress === 100 ? 'bg-emerald-500' : 'bg-blue-500'}`} style={{ width: `${client.progress}%` }}></div>
                                    </div>
                                  </div>
                                  <div className="bg-[#13192B] p-3 rounded-lg border border-[#2A3441] mt-4">
                                    <p className="text-xs text-slate-500 uppercase font-bold mb-1">Current Initiative:</p>
                                    <p className="text-sm text-blue-400 font-mono">{client.nextAction}</p>
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-col justify-end space-y-3">
                                {adminRole === 'Super Admin' && (
                                  <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white p-3 rounded-lg font-bold text-sm transition-all shadow-md">
                                    <ShieldCheck className="w-4 h-4" /> Send Automated Security Report
                                  </button>
                                )}
                                <button className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white border border-[#2A3441] p-3 rounded-lg font-bold text-sm transition-all shadow-md">
                                  <Briefcase className="w-4 h-4" /> Open Dedicated Workspace
                                </button>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* FINANCE & OPS TAB */}
        {activeTab === 'finance' && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div>
              <h1 className="text-3xl font-bold text-amber-500 mb-2">Finance & Operations</h1>
              <p className="text-slate-400">Restricted financial reporting access.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#0B0F19] border border-[#1C212E] p-8 rounded-2xl shadow-xl">
                 <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2"><DollarSign className="w-6 h-6 text-amber-500"/> Revenue Pipeline</h3>
                 
                 <div className="space-y-6">
                   <div className="flex justify-between items-end border-b border-slate-800 pb-4">
                     <div>
                       <p className="text-sm font-medium text-slate-400 mb-1">Monthly Recurring Revenue (MRR)</p>
                       <h4 className="text-2xl font-bold text-emerald-400">$42,500</h4>
                     </div>
                     <Badge className="bg-emerald-500/20 text-emerald-400">+12% MoM</Badge>
                   </div>
                   <div className="flex justify-between items-end border-b border-slate-800 pb-4">
                     <div>
                       <p className="text-sm font-medium text-slate-400 mb-1">Annual Run Rate (ARR)</p>
                       <h4 className="text-2xl font-bold text-emerald-400">$510,000</h4>
                     </div>
                   </div>
                   <div className="flex justify-between items-end pb-2">
                     <div>
                       <p className="text-sm font-medium text-slate-400 mb-1">Outstanding Invoices</p>
                       <h4 className="text-2xl font-bold text-amber-500">$18,200</h4>
                     </div>
                     <Badge className="bg-amber-500/20 text-amber-400">3 Pending</Badge>
                   </div>
                 </div>
              </div>

              <div className="bg-[#0B0F19] border border-[#1C212E] p-8 rounded-2xl shadow-xl">
                 <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2"><Activity className="w-6 h-6 text-blue-500"/> Operational SLA</h3>
                 
                 <div className="space-y-5">
                   <div>
                     <div className="flex justify-between text-sm mb-1">
                       <span className="text-slate-400">Security Reports Delivered</span>
                       <span className="text-white font-bold">92% On Time</span>
                     </div>
                     <div className="w-full bg-slate-800 rounded-full h-2"><div className="bg-blue-500 h-2 rounded-full" style={{ width: '92%' }}></div></div>
                   </div>
                   <div>
                     <div className="flex justify-between text-sm mb-1">
                       <span className="text-slate-400">SOC Response Time (avg)</span>
                       <span className="text-emerald-400 font-bold">4.2 mins</span>
                     </div>
                     <div className="w-full bg-slate-800 rounded-full h-2"><div className="bg-emerald-500 h-2 rounded-full" style={{ width: '95%' }}></div></div>
                   </div>
                   <div>
                     <div className="flex justify-between text-sm mb-1">
                       <span className="text-slate-400">Client Onboarding Speed</span>
                       <span className="text-white font-bold">2 Days</span>
                     </div>
                     <div className="w-full bg-slate-800 rounded-full h-2"><div className="bg-purple-500 h-2 rounded-full" style={{ width: '75%' }}></div></div>
                   </div>
                 </div>
              </div>
            </div>
          </div>
        )}

        {/* TEAM ACCESS (RBAC) TAB */}
        {activeTab === 'rbac' && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div>
              <h1 className="text-3xl font-bold text-red-500 mb-2">Role-Based Access Control</h1>
              <p className="text-slate-400">Manage internal staff, enforce Least Privilege Principle, and assign operational boundaries.</p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              
              {/* Add User Form */}
              <div className="xl:col-span-1">
                <Card className="bg-[#0B0F19] border-[#1C212E] shadow-xl sticky top-6">
                  <CardHeader className="border-b border-[#1C212E] pb-4">
                    <CardTitle className="text-white text-lg flex items-center gap-2">
                      <UserPlus className="w-5 h-5 text-blue-500" />
                      Provision New Access
                    </CardTitle>
                    <CardDescription className="text-slate-400">Grant scoped system access to a new team member.</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <form onSubmit={handleAddStaff} className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Full Name</label>
                        <input 
                          type="text" 
                          value={newStaff.name}
                          onChange={(e) => setNewStaff({...newStaff, name: e.target.value})}
                          className="w-full bg-[#13192B] border border-[#2A3441] text-white rounded p-3 text-sm focus:outline-none focus:border-blue-500" 
                          placeholder="Jane Doe"
                          required 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Corporate Email</label>
                        <input 
                          type="email" 
                          value={newStaff.email}
                          onChange={(e) => setNewStaff({...newStaff, email: e.target.value})}
                          className="w-full bg-[#13192B] border border-[#2A3441] text-white rounded p-3 text-sm focus:outline-none focus:border-blue-500" 
                          placeholder="jane@cybersage.uk"
                          required 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Access Scope (Role)</label>
                        <select 
                          value={newStaff.role}
                          onChange={(e) => setNewStaff({...newStaff, role: e.target.value})}
                          className="w-full bg-[#13192B] border border-[#2A3441] text-white rounded p-3 text-sm focus:outline-none focus:border-blue-500"
                        >
                          <option value="Operations">Operations (CRM, Projects)</option>
                          <option value="Development">Development (Code, Infrastructure)</option>
                          <option value="Finance">Finance (Billing, Revenue)</option>
                          <option value="HR">Human Resources (Attendance)</option>
                          <option value="Super Admin">Super Admin (DANGEROUS: All Access)</option>
                        </select>
                      </div>
                      <button 
                        type="submit" 
                        className="w-full mt-2 bg-blue-600 hover:bg-blue-500 text-white font-medium p-3 rounded transition-colors flex justify-center items-center gap-2"
                      >
                        <Lock className="w-4 h-4" /> Grant Network Access
                      </button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Staff Table */}
              <div className="xl:col-span-2 text-sm bg-[#0B0F19] border border-[#1C212E] rounded-2xl shadow-xl overflow-hidden self-start">
                <div className="p-5 border-b border-[#1C212E] flex justify-between items-center bg-[#13192B]">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-emerald-500" /> Identity Matrix
                  </h3>
                  <Badge className="bg-slate-800 text-slate-300">{staffList.length} Total Identities</Badge>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-[#06080A] text-xs text-slate-500 uppercase tracking-wider border-b border-[#1C212E]">
                      <tr>
                        <th className="px-6 py-4 font-medium">Identity / Email</th>
                        <th className="px-6 py-4 font-medium">RBAC Scope</th>
                        <th className="px-6 py-4 font-medium">Status / Last Ping</th>
                        <th className="px-6 py-4 font-medium text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1C212E]">
                      {staffList.map((staff) => (
                        <tr key={staff.id} className="hover:bg-[#13192B]/50 transition-colors">
                          <td className="px-6 py-4">
                            <p className="font-bold text-white">{staff.name}</p>
                            <p className="text-slate-500 text-xs mt-0.5">{staff.email}</p>
                          </td>
                          <td className="px-6 py-4">
                            {getRoleBadge(staff.role)}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              {staff.status === 'Online' 
                                ? <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.8)]"></div> 
                                : <div className="w-2 h-2 rounded-full bg-slate-600"></div>
                              }
                              <span className={staff.status === 'Online' ? 'text-emerald-400' : 'text-slate-500'}>{staff.status}</span>
                            </div>
                            <p className="text-xs text-slate-600 mt-1 pl-4">Ping: {staff.lastActive}</p>
                          </td>
                          <td className="px-6 py-4 text-right">
                            {staff.role !== 'Super Admin' && (
                              <button 
                                onClick={() => handleRemoveStaff(staff.id)}
                                className="text-xs text-red-500 hover:text-red-400 hover:underline px-2 py-1 rounded"
                              >
                                Revoke
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default SuperAdminDashboard;
