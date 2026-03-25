import React from 'react';
import { Shield, Activity, CalendarClock, FileType } from 'lucide-react';

const DashboardHome = () => {
  // Mock Data
  const companyName = localStorage.getItem('companyName') || "TechCorp Solutions";
  const securityScore = 82;
  const threatLevel = "Low"; // Low, Medium, High
  
  return (
    <div className="space-y-6">
      
      {/* Top Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 pb-2">
        <div>
          <h1 className="text-3xl font-bold text-slate-100 tracking-tight">
            Welcome, {companyName}
          </h1>
          <p className="text-slate-400 mt-1">Here's your security overview</p>
        </div>
        
        <div className="flex items-center gap-2 bg-[#1A2234] px-4 py-2 border border-[#2A3441] rounded-full">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
          <p className="text-sm font-medium text-slate-300">
            Threat Report Level: <span className="text-emerald-400 font-bold">{threatLevel} Risk</span>
          </p>
        </div>
      </div>

      {/* Security Score Highlight Banner */}
      <div className="bg-[#0B0F19] border border-[#1C212E] p-8 rounded-2xl flex flex-col md:flex-row items-center gap-10">
        
        {/* Circular Progress Gauge */}
        <div className="relative w-40 h-40 flex-shrink-0">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-800" />
            <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="251.2" strokeDashoffset={251.2 - (251.2 * securityScore) / 100} strokeLinecap="round" className="text-blue-500" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold text-white leading-none">{securityScore}</span>
            <span className="text-sm text-slate-400 mt-1">/ 100</span>
          </div>
        </div>

        {/* Score Details & Mini Stats */}
        <div className="flex-1 w-full">
          <h2 className="text-xl font-bold text-slate-100">Security Score</h2>
          <p className="text-sm text-slate-400 mt-1 mb-6">Your organization's overall security posture based on recent assessments</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-[#13192B] p-4 rounded-xl border border-[#1C212E]">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Resolved</span>
              </div>
              <p className="text-2xl font-bold text-slate-100 flex items-baseline gap-1">
                12 <span className="text-sm font-normal text-slate-400">issues</span>
              </p>
            </div>
            
            <div className="bg-[#13192B] p-4 rounded-xl border border-[#1C212E]">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-4 h-4 text-amber-500" />
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-500">Found</span>
              </div>
              <p className="text-2xl font-bold text-slate-100 flex items-baseline gap-1">
                3 <span className="text-sm font-normal text-slate-400">issues</span>
              </p>
            </div>
            
            <div className="bg-[#13192B] p-4 rounded-xl border border-[#1C212E]">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-blue-500" />
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-500">Blocked</span>
              </div>
              <p className="text-2xl font-bold text-slate-100 flex items-baseline gap-1">
                156 <span className="text-sm font-normal text-slate-400">threats</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Active Services */}
        <div className="bg-[#0B0F19] border border-[#1C212E] p-6 rounded-2xl flex flex-col justify-between h-48">
          <div className="flex justify-between items-start">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active Services</span>
            <Activity className="w-5 h-5 text-blue-500" />
          </div>
          <div>
            <h3 className="text-4xl font-bold text-slate-100 flex items-baseline gap-2 mb-4">
              3 <span className="text-xl font-normal text-slate-500">of 5</span>
            </h3>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mb-4">
              <div className="h-full bg-blue-600 w-3/5 rounded-full"></div>
            </div>
            <button className="text-sm font-medium text-blue-500 hover:text-blue-400 transition-colors flex items-center gap-1 mx-auto">
              View Services <span className="text-lg leading-none">→</span>
            </button>
          </div>
        </div>

        {/* Latest Report */}
        <div className="bg-[#0B0F19] border border-[#1C212E] p-6 rounded-2xl flex flex-col justify-between h-48">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Latest Report</span>
            <FileType className="w-5 h-5 text-emerald-500" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-100 mb-2">AI-Powered Penetration Testing</h3>
            <span className="inline-flex px-2 py-0.5 rounded text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-3">
              Low Risk
            </span>
            <p className="text-xs text-slate-400 line-clamp-2 mb-3">
              The penetration test revealed a well-secured infrastructure with only minor vulnerabilities...
            </p>
            <button className="text-sm font-medium text-blue-500 hover:text-blue-400 transition-colors flex items-center gap-1 mx-auto">
              View Reports <span className="text-lg leading-none">→</span>
            </button>
          </div>
        </div>

        {/* Next Delivery */}
        <div className="bg-[#0B0F19] border border-[#1C212E] p-6 rounded-2xl flex flex-col justify-between h-48">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Next Delivery</span>
            <CalendarClock className="w-5 h-5 text-amber-500" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-100 mb-2">24/7 SOC Monitoring</h3>
            <div className="flex items-center gap-1.5 text-sm text-slate-400 mb-6">
              <CalendarClock className="w-4 h-4" />
              15 Jan 2025
            </div>
            <div className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium bg-amber-500/10 text-amber-500 border border-amber-500/20">
              <Activity className="w-4 h-4" />
              In Progress
            </div>
          </div>
        </div>

      </div>
      
    </div>
  );
};

export default DashboardHome;
