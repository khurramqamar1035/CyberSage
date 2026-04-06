import React, { useEffect, useState } from 'react';
import { Eye, Zap, ClipboardList, Check, Lock, Mail, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

const MyServices = () => {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [popup, setPopup] = useState(null);
  const [requesting, setRequesting] = useState(false);
  const [requestSuccess, setRequestSuccess] = useState(false);
  const [requestPriceSuccess, setRequestPriceSuccess] = useState(null);
  const [requestingPrice, setRequestingPrice] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/api/my-services`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      console.log('[MY SERVICES] Data:', data);
      if (!res.ok) throw new Error(data.message || 'Failed to fetch services');
      setServices(data);
    } catch (err) {
      console.error('[MY SERVICES] Error:', err.message);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Split services into correct categories
  const paidServices = services.filter(s => s.owned && s.paymentStatus === 'Paid');
  const unpaidWithPrice = services.filter(s => s.owned && s.paymentStatus === 'Unpaid' && s.price > 0);
  const unpaidNoPrice = services.filter(s => s.owned && s.paymentStatus === 'Unpaid' && (!s.price || s.price === 0));
  const lockedServices = services.filter(s => !s.owned);

  const inProgressCount = paidServices.filter(s => s.status === 'In Progress').length;
  const completedCount = paidServices.filter(s => s.status === 'Completed').length;

  // Request a locked service
  const handleRequestService = async () => {
    try {
      setRequesting(true);
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/api/my-services/request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ serviceId: popup._id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setRequestSuccess(true);
    } catch (err) {
      alert(err.message);
    } finally {
      setRequesting(false);
    }
  };

  // ✅ Request price for owned but unpriced service
  const handleRequestPrice = async (service) => {
    try {
      setRequestingPrice(service._id);
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/api/my-services/request-price`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ serviceId: service._id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setRequestPriceSuccess(service._id);
      setTimeout(() => setRequestPriceSuccess(null), 4000);
    } catch (err) {
      alert(err.message);
    } finally {
      setRequestingPrice(null);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Completed': return <span className="inline-flex items-center px-2.5 py-1 rounded text-xs font-medium text-emerald-400 border border-emerald-500/30">Completed</span>;
      case 'In Progress': return <span className="inline-flex items-center px-2.5 py-1 rounded text-xs font-medium text-blue-400 border border-blue-500/30">In Progress</span>;
      default: return <span className="inline-flex items-center px-2.5 py-1 rounded text-xs font-medium text-slate-400 border border-slate-500/30">Pending</span>;
    }
  };

  const getRiskBadge = (risk) => {
    switch (risk) {
      case 'High': return <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20">High</span>;
      case 'Medium': return <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-500/10 text-amber-500 border border-amber-500/20">Medium</span>;
      default: return <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Low</span>;
    }
  };

  if (isLoading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center h-64">
      <p className="text-red-400">{error}</p>
    </div>
  );

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 pb-2">
        <div>
          <h1 className="text-3xl font-bold text-slate-100 tracking-tight">My Services</h1>
          <p className="text-slate-400 mt-1">Manage and track your cybersecurity services</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#13192B] border border-[#1C212E] p-6 rounded-xl flex justify-between items-center">
          <div>
            <p className="text-sm font-medium text-slate-400 mb-1">Total Services</p>
            <h3 className="text-4xl font-bold text-slate-100">{paidServices.length}</h3>
          </div>
          <div className="p-4 rounded-xl bg-slate-800/80">
            <ClipboardList className="w-8 h-8 text-slate-400" />
          </div>
        </div>
        <div className="bg-[#13192B] border border-[#1C212E] p-6 rounded-xl flex justify-between items-center">
          <div>
            <p className="text-sm font-medium text-slate-400 mb-1">In Progress</p>
            <h3 className="text-4xl font-bold text-amber-500">{inProgressCount}</h3>
          </div>
          <div className="p-4 rounded-xl bg-blue-900/40">
            <Zap className="w-8 h-8 text-amber-500" />
          </div>
        </div>
        <div className="bg-[#13192B] border border-[#1C212E] p-6 rounded-xl flex justify-between items-center">
          <div>
            <p className="text-sm font-medium text-slate-400 mb-1">Completed</p>
            <h3 className="text-4xl font-bold text-emerald-500">{completedCount}</h3>
          </div>
          <div className="p-4 rounded-xl bg-emerald-900/30">
            <Check className="w-8 h-8 text-emerald-500" />
          </div>
        </div>
      </div>

      {/* ✅ Active (Paid) Services Table */}
      <div className="bg-[#0B0F19] border border-[#1C212E] rounded-2xl overflow-hidden p-6 pb-0 shadow-xl">
        <h2 className="text-xl font-bold text-slate-100 mb-6">Active Services</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-400">
            <thead className="border-b border-[#1C212E] text-xs text-slate-500">
              <tr>
                <th className="px-2 py-4 font-normal">Service</th>
                <th className="px-6 py-4 font-normal">Status</th>
                <th className="px-6 py-4 font-normal">Delivery Date</th>
                <th className="px-6 py-4 font-normal">Risk Level</th>
                <th className="px-6 py-4 font-normal text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1C212E]">
              {paidServices.length > 0 ? paidServices.map((service) => (
                <tr key={service._id} className="hover:bg-[#13192B] transition-colors">
                  <td className="px-2 py-5">
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-200">{service.name}</span>
                      <span className="text-xs text-slate-500 mt-1">{service.description}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">{getStatusBadge(service.status)}</td>
                  <td className="px-6 py-5 whitespace-nowrap text-slate-300">
                    {service.deliveryDate
                      ? new Date(service.deliveryDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
                      : 'TBD'}
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">{getRiskBadge(service.riskLevel)}</td>
                  <td className="px-6 py-5 whitespace-nowrap text-right">
                    <Link
                      to={`/dashboard/services/${service._id}`}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-500 hover:text-blue-400 transition-colors"
                    >
                      <Eye className="w-4 h-4" /> View
                    </Link>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} className="px-2 py-8 text-center text-slate-500">
                    No active paid services yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ✅ Unpaid — Price Set → Pay Bill */}
      {unpaidWithPrice.length > 0 && (
        <div className="bg-[#0B0F19] border border-amber-500/20 rounded-2xl p-6 shadow-xl">
          <h2 className="text-xl font-bold text-slate-100 mb-2">Pending Payment</h2>
          <p className="text-slate-500 text-sm mb-6">Complete your payment to activate these services</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {unpaidWithPrice.map((service) => (
              <div key={service._id} className="bg-[#13192B] border border-amber-500/20 rounded-xl p-5">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 flex-shrink-0">
                    <Zap className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-200 mb-1">{service.name}</h3>
                    <p className="text-sm text-slate-500">{service.description}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-2xl font-bold text-amber-400">
                    £{service.price}
                    {service.paymentType === 'monthly' && <span className="text-sm font-normal text-slate-500">/mo</span>}
                  </p>
                  <span className={`text-xs px-2 py-0.5 rounded border ${
                    service.paymentType === 'monthly'
                      ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                      : 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                  }`}>
                    {service.paymentType === 'monthly' ? 'Monthly' : 'One-time'}
                  </span>
                </div>
                <Link
                  to="/dashboard/billing"
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-semibold rounded-lg transition-all text-sm"
                >
                  Pay Bill to Activate
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ✅ Unpaid — No Price Set → Request Price */}
      {unpaidNoPrice.length > 0 && (
        <div className="bg-[#0B0F19] border border-blue-500/20 rounded-2xl p-6 shadow-xl">
          <h2 className="text-xl font-bold text-slate-100 mb-2">Awaiting Pricing</h2>
          <p className="text-slate-500 text-sm mb-6">These services are pending pricing from our team</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {unpaidNoPrice.map((service) => (
              <div key={service._id} className="bg-[#13192B] border border-blue-500/10 rounded-xl p-5">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 flex-shrink-0">
                    <ClipboardList className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-200 mb-1">{service.name}</h3>
                    <p className="text-sm text-slate-500">{service.description}</p>
                  </div>
                </div>

                <div className="bg-blue-500/5 border border-blue-500/10 rounded-lg px-3 py-2 mb-4">
                  <p className="text-xs text-blue-400">Price not set yet — request a quote from our team</p>
                </div>

                {requestPriceSuccess === service._id ? (
                  <div className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-medium rounded-lg text-sm">
                    <Check className="w-4 h-4" /> Request Sent!
                  </div>
                ) : (
                  <button
                    onClick={() => handleRequestPrice(service)}
                    disabled={requestingPrice === service._id}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold rounded-lg transition-all text-sm"
                  >
                    {requestingPrice === service._id ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>
                    ) : (
                      <><Mail className="w-4 h-4" /> Request Pricing</>
                    )}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ✅ Locked Services */}
      {lockedServices.length > 0 && (
        <div className="bg-[#0B0F19] border border-[#1C212E] rounded-2xl p-6 shadow-xl">
          <h2 className="text-xl font-bold text-slate-100 mb-2">More Services</h2>
          <p className="text-slate-500 text-sm mb-6">Click on a service to request it</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {lockedServices.map((service) => (
              <div
                key={service._id}
                onClick={() => { setPopup(service); setRequestSuccess(false); }}
                className="relative p-6 rounded-2xl border border-[#2A3441] bg-[#13192B] opacity-70 hover:opacity-90 cursor-pointer transition-all hover:border-blue-500/30 group"
              >
                <div className="absolute top-4 right-4">
                  <div className="p-2 rounded-full bg-slate-800 border border-slate-700">
                    <Lock className="w-4 h-4 text-slate-400" />
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-slate-800 text-slate-500">
                    <Lock className="w-6 h-6" />
                  </div>
                  <div className="flex-1 pr-8">
                    <h3 className="text-lg font-bold text-slate-400 mb-1 group-hover:text-slate-200 transition-colors">{service.name}</h3>
                    <p className="text-sm text-slate-600">{service.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Request Service Popup */}
      {popup && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#0B0F19] border border-[#1C212E] rounded-2xl p-8 w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-bold text-white">Request Service</h3>
                <p className="text-slate-400 text-sm mt-1">Send a request to our team</p>
              </div>
              <button onClick={() => setPopup(null)} className="text-slate-500 hover:text-slate-300">
                <Lock className="w-5 h-5" />
              </button>
            </div>

            {requestSuccess ? (
              <div className="text-center py-6">
                <Check className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
                <h4 className="text-lg font-bold text-white mb-2">Request Sent!</h4>
                <p className="text-slate-400 text-sm">Our team will get back to you shortly to discuss pricing and next steps.</p>
                <button
                  onClick={() => setPopup(null)}
                  className="mt-6 w-full h-11 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-all"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <div className="bg-[#13192B] border border-[#2A3441] rounded-xl p-4 mb-6">
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Requested Service</p>
                  <p className="text-white font-bold text-lg">{popup.name}</p>
                  <p className="text-slate-400 text-sm mt-1">{popup.description}</p>
                </div>
                <p className="text-slate-400 text-sm mb-6">
                  By clicking confirm, our team will receive your request along with your contact details and will reach out to discuss pricing and next steps.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setPopup(null)}
                    className="flex-1 h-11 border border-[#2A3441] text-slate-400 hover:text-slate-200 hover:border-slate-500 font-medium rounded-lg transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleRequestService}
                    disabled={requesting}
                    className="flex-1 h-11 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-medium rounded-lg transition-all"
                  >
                    {requesting ? 'Sending...' : 'Confirm Request'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyServices;