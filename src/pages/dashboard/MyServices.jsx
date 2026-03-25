import React from 'react';
import { Eye, Zap, ClipboardList, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const MyServices = () => {
  const savedServices = JSON.parse(localStorage.getItem('selectedServices'));
  
  const services = savedServices || [
    {
      id: "SVC-000",
      name: "No Active Services",
      description: "You have not selected any services.",
      status: "Pending",
      deliveryDate: "N/A",
      riskLevel: "Low",
    }
  ];

  // Provide mock delivery dates or descriptions for dynamically selected services if missing
  const displayServices = services.map((s, index) => ({
    ...s,
    // Provide a generic description if missing (e.g. from onboarding)
    description: s.description || `Active deployment for ${s.name}`,
    // Provide a mock future delivery date if missing
    deliveryDate: s.deliveryDate || `TBD (Est. 7 Days)`
  }));

  const inProgressCount = displayServices.filter(s => s.status === 'In Progress').length;
  const completedCount = displayServices.filter(s => s.status === 'Completed').length;

  const stats = [
    { label: "Total Services", value: displayServices.length.toString(), icon: ClipboardList, color: "text-slate-400", bgColor: "bg-slate-800/80" },
    { label: "In Progress", value: inProgressCount.toString(), icon: Zap, color: "text-amber-500", bgColor: "bg-blue-900/40" },
    { label: "Completed", value: completedCount.toString(), icon: Check, color: "text-emerald-500", bgColor: "bg-emerald-900/30" }
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Completed':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded text-xs font-medium text-emerald-400 border border-emerald-500/30">
            {status}
          </span>
        );
      case 'In Progress':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded text-xs font-medium text-blue-400 border border-blue-500/30">
            {status}
          </span>
        );
      case 'Pending':
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded text-xs font-medium text-slate-400 border border-slate-500/30">
            {status}
          </span>
        );
    }
  };

  const getRiskBadge = (risk) => {
    switch (risk) {
      case 'High':
        return <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20">High</span>;
      case 'Medium':
        return <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-500/10 text-amber-500 border border-amber-500/20">Medium</span>;
      case 'Low':
        return <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Low</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 pb-2">
        <div>
          <h1 className="text-3xl font-bold text-slate-100 tracking-tight">My Services</h1>
          <p className="text-slate-400 mt-1">Manage and track your cybersecurity services</p>
        </div>
      </div>

      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-[#13192B] border border-[#1C212E] p-6 rounded-xl flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-slate-400 mb-1">{stat.label}</p>
              <h3 className={`text-4xl font-bold ${stat.color === 'text-slate-400' ? 'text-slate-100' : stat.color}`}>
                {stat.value}
              </h3>
            </div>
            <div className={`p-4 rounded-xl ${stat.bgColor}`}>
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#0B0F19] border border-[#1C212E] rounded-2xl overflow-hidden p-6 pb-0 shadow-xl">
        <h2 className="text-xl font-bold text-slate-100 mb-6">All Services</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-400">
            <thead className="border-b border-[#1C212E] text-xs text-slate-500">
              <tr>
                <th scope="col" className="px-2 py-4 font-normal">Service</th>
                <th scope="col" className="px-6 py-4 font-normal">Status</th>
                <th scope="col" className="px-6 py-4 font-normal">Delivery Date</th>
                <th scope="col" className="px-6 py-4 font-normal">Risk Level</th>
                <th scope="col" className="px-6 py-4 font-normal text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1C212E]">
              {displayServices.map((service) => (
                <tr key={service.id} className="hover:bg-[#13192B] transition-colors group">
                  <td className="px-2 py-5">
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-200">{service.name}</span>
                      <span className="text-xs text-slate-500 mt-1">{service.description}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    {getStatusBadge(service.status)}
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-slate-300">
                    {service.deliveryDate}
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    {getRiskBadge(service.riskLevel || 'Low')}
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-right">
                    <Link 
                      to={`/dashboard/services/${service.id}`}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-500 hover:text-blue-400 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {displayServices.length === 0 && (
          <div className="p-8 text-center text-slate-500">
            No active services found.
          </div>
        )}
      </div>
    </div>
  );
};

export default MyServices;
