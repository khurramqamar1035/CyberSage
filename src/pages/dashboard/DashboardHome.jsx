import React, { useEffect, useState } from 'react';
import { Shield, Activity, CalendarClock, FileType, Loader2 } from 'lucide-react';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

const DashboardHome = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${API_URL}/api/dashboard`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const json = await res.json();
        if (!res.ok) throw new Error(json.message || 'Failed to fetch dashboard');

        setData(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  const {
    companyName,
    services,
    securityScore,
    threatLevel,
    resolvedIssues,
    foundIssues,
    blockedThreats,
    latestReport,
    nextDelivery,
  } = data;

  const threatColor = {
    Low: 'text-emerald-400',
    Medium: 'text-amber-400',
    High: 'text-red-400',
  };

  const dotColor = {
    Low: 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]',
    Medium: 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]',
    High: 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]',
  };

  return (
    <div className="space-y-6">

      {/* Top Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 pb-2">
        <div>
          <h1 className="text-3xl font-bold text-slate-100 tracking-tight">
            Welcome, {companyName}
          </h1>
          <p className="text-slate-400 mt-1">Here's your security overview</p>
        </div>

        <div className="flex items-center gap-2 bg-[#1A2234] px-4 py-2 border border-[#2A3441] rounded-full">
          <div className={`w-2.5 h-2.5 rounded-full ${dotColor[threatLevel]}`}></div>
          <p className="text-sm font-medium text-slate-300">
            Threat Report Level: <span className={`font-bold ${threatColor[threatLevel]}`}>{threatLevel} Risk</span>
          </p>
        </div>
      </div>

      {/* Security Score */}
      <div className="bg-[#0B0F19] border border-[#1C212E] p-8 rounded-2xl flex flex-col md:flex-row items-center gap-10">
        <div className="relative w-40 h-40 flex-shrink-0">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-800" />
            <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="transparent"
              strokeDasharray="251.2"
              strokeDashoffset={251.2 - (251.2 * securityScore) / 100}
              strokeLinecap="round" className="text-blue-500" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold text-white leading-none">{securityScore}</span>
            <span className="text-sm text-slate-400 mt-1">/ 100</span>
          </div>
        </div>

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
                {resolvedIssues} <span className="text-sm font-normal text-slate-400">issues</span>
              </p>
            </div>

            <div className="bg-[#13192B] p-4 rounded-xl border border-[#1C212E]">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-4 h-4 text-amber-500" />
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-500">Found</span>
              </div>
              <p className="text-2xl font-bold text-slate-100 flex items-baseline gap-1">
                {foundIssues} <span className="text-sm font-normal text-slate-400">issues</span>
              </p>
            </div>

            <div className="bg-[#13192B] p-4 rounded-xl border border-[#1C212E]">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-blue-500" />
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-500">Blocked</span>
              </div>
              <p className="text-2xl font-bold text-slate-100 flex items-baseline gap-1">
                {blockedThreats} <span className="text-sm font-normal text-slate-400">threats</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Active Services */}
        <div className="bg-[#0B0F19] border border-[#1C212E] p-6 rounded-2xl flex flex-col justify-between h-48">
          <div className="flex justify-between items-start">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active Services</span>
            <Activity className="w-5 h-5 text-blue-500" />
          </div>
          <div>
            <h3 className="text-4xl font-bold text-slate-100 flex items-baseline gap-2 mb-4">
              {services?.length || 0} <span className="text-xl font-normal text-slate-500">services</span>
            </h3>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mb-4">
              <div
                className="h-full bg-blue-600 rounded-full"
                style={{ width: `${Math.min((services?.length / 5) * 100, 100)}%` }}
              ></div>
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
          {latestReport ? (
            <div>
              <h3 className="text-lg font-bold text-slate-100 mb-2">{latestReport.title}</h3>
              <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium border mb-3 ${
                latestReport.riskLevel === 'Low' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                latestReport.riskLevel === 'Medium' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                'bg-red-500/10 text-red-400 border-red-500/20'
              }`}>
                {latestReport.riskLevel} Risk
              </span>
              <p className="text-xs text-slate-400 line-clamp-2 mb-3">{latestReport.summary}</p>
              <button className="text-sm font-medium text-blue-500 hover:text-blue-400 transition-colors flex items-center gap-1 mx-auto">
                View Reports <span className="text-lg leading-none">→</span>
              </button>
            </div>
          ) : (
            <p className="text-slate-500 text-sm">No reports yet.</p>
          )}
        </div>

        {/* Next Delivery */}
        <div className="bg-[#0B0F19] border border-[#1C212E] p-6 rounded-2xl flex flex-col justify-between h-48">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Next Delivery</span>
            <CalendarClock className="w-5 h-5 text-amber-500" />
          </div>
          {nextDelivery ? (
            <div>
              <h3 className="text-lg font-bold text-slate-100 mb-2">{nextDelivery.serviceName}</h3>
              <div className="flex items-center gap-1.5 text-sm text-slate-400 mb-6">
                <CalendarClock className="w-4 h-4" />
                {new Date(nextDelivery.deliveryDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
              </div>
              <div className={`w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium border ${
                nextDelivery.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                nextDelivery.status === 'In Progress' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                'bg-blue-500/10 text-blue-500 border-blue-500/20'
              }`}>
                <Activity className="w-4 h-4" />
                {nextDelivery.status}
              </div>
            </div>
          ) : (
            <p className="text-slate-500 text-sm">No upcoming deliveries.</p>
          )}
        </div>

      </div>
    </div>
  );
};

export default DashboardHome;