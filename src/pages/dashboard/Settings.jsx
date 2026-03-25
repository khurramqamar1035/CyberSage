import { User, Bell, Shield, Key } from 'lucide-react';
import { useState } from 'react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profile Settings', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'api', label: 'API Keys', icon: Key }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 pb-2">
        <div>
          <h1 className="text-3xl font-bold text-slate-100 tracking-tight">Settings</h1>
          <p className="text-slate-400 mt-1">Manage your account preferences and configurations</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar Navigation */}
        <div className="w-full lg:w-64 flex-shrink-0 space-y-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-blue-600/20 text-blue-400 shadow-[inset_4px_0_0_0_rgba(59,130,246,1)]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-[#13192B]'
              }`}
            >
              <tab.icon className="w-5 h-5 flex-shrink-0" strokeWidth={activeTab === tab.id ? 2 : 1.5} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="flex-1 bg-[#0B0F19] border border-[#1C212E] rounded-2xl p-8">
          
          {activeTab === 'profile' && (
            <div className="max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-xl font-bold text-slate-100 mb-6">Profile Information</h2>
              <p className="text-sm text-slate-400 mb-8 border-b border-[#1C212E] pb-6">
                Update your company details and primary administrative contact information.
              </p>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Company Name</label>
                    <input 
                      type="text" 
                      defaultValue="TechCorp Solutions"
                      className="w-full bg-[#13192B] border border-[#2A3441] text-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Contact Email</label>
                    <input 
                      type="email" 
                      defaultValue="admin@techcorp.com"
                      className="w-full bg-[#13192B] border border-[#2A3441] text-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Company Website</label>
                  <input 
                    type="url" 
                    defaultValue="https://techcorp.com"
                    className="w-full bg-[#13192B] border border-[#2A3441] text-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Primary Industry</label>
                  <select className="w-full bg-[#13192B] border border-[#2A3441] text-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors appearance-none">
                    <option>Technology & Software</option>
                    <option>Finance</option>
                    <option>Healthcare</option>
                    <option>Retail</option>
                  </select>
                </div>

                <div className="pt-6 mt-6 border-t border-[#1C212E]">
                  <button 
                    type="button"
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-colors shadow-lg"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab !== 'profile' && (
            <div className="flex flex-col items-center justify-center p-12 text-center animate-in fade-in duration-500">
              <div className="w-16 h-16 bg-[#13192B] rounded-full flex items-center justify-center mb-4 border border-[#2A3441]">
                <Shield className="w-8 h-8 text-slate-500" />
              </div>
              <h3 className="text-lg font-bold text-slate-200 mb-2">Under Construction</h3>
              <p className="text-slate-500 max-w-sm">This settings section is currently being updated. Please check back later.</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Settings;
