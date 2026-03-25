import React, { useState } from 'react';
import { AlertCircle, Wifi, ShieldAlert, Shield, AlertTriangle, CheckCircle } from 'lucide-react';

const NotificationDropdown = ({ isOpen, onClose }) => {
  const [activeFilter, setActiveFilter] = useState('All');

  if (!isOpen) return null;

  const filters = ['All', 'Active', 'Critical', 'High', 'Medium', 'Low'];

  const stats = [
    { label: 'Critical', value: 2, color: 'text-red-500', bgColor: 'bg-red-500/10' },
    { label: 'High', value: 3, color: 'text-orange-500', bgColor: 'bg-orange-500/10' },
    { label: 'Medium', value: 2, color: 'text-yellow-500', bgColor: 'bg-yellow-500/10' },
    { label: 'Low', value: 2, color: 'text-blue-500', bgColor: 'bg-blue-500/10' },
  ];

  const alerts = [
    {
      id: 1,
      title: 'Zero-Day Exploit Detected',
      level: 'CRITICAL',
      description: 'Known zero-day vulnerability exploitation attempt blocked',
      ip: '77.19.225.15',
      time: '16h ago',
      color: 'red',
      resolvable: true
    },
    {
      id: 2,
      title: 'Failed Authentication',
      level: 'LOW',
      description: 'Multiple failed VPN authentication attempts',
      ip: '203.182.49.204',
      time: '16h ago',
      color: 'blue',
      resolvable: false
    },
    {
      id: 3,
      title: 'Suspicious Outbound Traffic',
      level: 'MEDIUM',
      description: 'Unusual data exfiltration pattern detected to unknown destination',
      ip: '192.168.1.105',
      time: '20h ago',
      color: 'yellow',
      resolvable: true
    }
  ];

  const getColorClasses = (color) => {
    switch (color) {
      case 'red': return 'border-red-500/30 bg-red-500/5 hover:bg-red-500/10';
      case 'orange': return 'border-orange-500/30 bg-orange-500/5 hover:bg-orange-500/10';
      case 'yellow': return 'border-yellow-500/30 bg-yellow-500/5 hover:bg-yellow-500/10';
      case 'blue': return 'border-blue-500/30 bg-blue-500/5 hover:bg-blue-500/10';
      default: return 'border-slate-800 bg-slate-900';
    }
  };

  const getBadgeClasses = (color) => {
    switch (color) {
      case 'red': return 'bg-red-500/20 text-red-500';
      case 'orange': return 'bg-orange-500/20 text-orange-500';
      case 'yellow': return 'bg-yellow-500/20 text-yellow-500';
      case 'blue': return 'bg-blue-500/20 text-blue-500';
      default: return 'bg-slate-800 text-slate-400';
    }
  };

  const getIcon = (color) => {
    switch (color) {
      case 'red': return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'orange': return <ShieldAlert className="w-5 h-5 text-orange-500" />;
      case 'yellow': return <Shield className="w-5 h-5 text-yellow-500" />;
      case 'blue': return <Shield className="w-5 h-5 text-blue-500" />;
      default: return <AlertCircle className="w-5 h-5 text-slate-400" />;
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose}></div>
      <div className="absolute top-16 right-4 w-[450px] bg-[#0A0D14] border border-[#1C212E] rounded-xl shadow-2xl z-50 flex flex-col max-h-[80vh] overflow-hidden">
        
        {/* Header */}
        <div className="p-5 border-b border-[#1C212E]">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-500/10 rounded-lg border border-red-500/20">
                <AlertCircle className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">Threat Alerts</h2>
                <div className="flex items-center gap-1.5 text-emerald-500 text-sm font-medium mt-0.5">
                  <Wifi className="w-3.5 h-3.5" />
                  Live
                </div>
              </div>
            </div>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-4 gap-3 mb-4">
            {stats.map(stat => (
              <div key={stat.label} className={`rounded-lg p-3 text-center ${stat.bgColor}`}>
                <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                <div className="text-xs font-medium text-slate-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {filters.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors whitespace-nowrap border ${
                  activeFilter === filter 
                  ? 'bg-blue-600 text-white border-blue-500' 
                  : 'bg-transparent text-slate-300 border-slate-700 hover:border-slate-500'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Alerts List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {alerts.map(alert => (
            <div key={alert.id} className={`p-4 rounded-xl border transition-colors ${getColorClasses(alert.color)}`}>
              <div className="flex gap-3">
                <div className="flex-shrink-0 mt-0.5">
                  {getIcon(alert.color)}
                </div>
                <div className="flex-1 w-full">
                  <div className="flex justify-between items-start mb-1 gap-2">
                    <h3 className="font-semibold text-slate-200">{alert.title}</h3>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-wider ${getBadgeClasses(alert.color)}`}>
                      {alert.level}
                    </span>
                  </div>
                  <p className="text-sm text-slate-400 mb-3">{alert.description}</p>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-3 text-xs font-medium text-slate-500 font-mono">
                      <span>IP: {alert.ip}</span>
                      <span className="flex items-center gap-1">
                        ⏱ {alert.time}
                      </span>
                    </div>
                    {alert.resolvable && (
                      <button className="flex items-center gap-1 text-sm font-medium text-emerald-500 hover:text-emerald-400 transition-colors">
                        <CheckCircle className="w-4 h-4" />
                        Resolve
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default NotificationDropdown;
