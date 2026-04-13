import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Shield, Activity, FileText, CreditCard,
  Plus, Pencil, Trash2, Loader2, Check, X
} from 'lucide-react';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

// ------------------ Reusable Modal ------------------
const Modal = ({ title, onClose, children }) => (
  <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div className="bg-[#0B0F19] border border-[#1C212E] rounded-2xl w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
      <div className="flex justify-between items-center p-6 border-b border-[#1C212E]">
        <h3 className="text-lg font-bold text-white">{title}</h3>
        <button onClick={onClose} className="text-slate-500 hover:text-slate-300">
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="p-6">{children}</div>
    </div>
  </div>
);

// ------------------ Main Component ------------------
const AdminCompanyDetail = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('adminToken');
  const [activeTab, setActiveTab] = useState('overview');
  const [data, setData] = useState(null);
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchData();
    fetchAllServices();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch(`${API_URL}/api/admink/companies/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message);
      setData(json);
    } catch {
      // silently fail
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAllServices = async () => {
    const res = await fetch(`${API_URL}/api/services`);
    const json = await res.json();
    setServices(json);
  };

  const apiCall = async (method, endpoint, body) => {
    const res = await fetch(`${API_URL}${endpoint}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message);
    return json;
  };

  // ---- STATS ----
  const StatsTab = () => {
    const [form, setForm] = useState({
      securityScore: data?.dashboard?.securityScore || 0,
      threatLevel: data?.dashboard?.threatLevel || 'Low',
      resolvedIssues: data?.dashboard?.resolvedIssues || 0,
      foundIssues: data?.dashboard?.foundIssues || 0,
      blockedThreats: data?.dashboard?.blockedThreats || 0,
    });

    const handleSave = async () => {
      setSaving(true);
      try {
        await apiCall('PUT', `/api/admink/dashboard/${userId}`, form);
        await fetchData();
        alert('Dashboard stats updated!');
      } catch (err) {
        alert(err.message);
      } finally {
        setSaving(false);
      }
    };

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: 'Security Score (0-100)', key: 'securityScore', type: 'number' },
            { label: 'Resolved Issues', key: 'resolvedIssues', type: 'number' },
            { label: 'Found Issues', key: 'foundIssues', type: 'number' },
            { label: 'Blocked Threats', key: 'blockedThreats', type: 'number' },
          ].map(field => (
            <div key={field.key}>
              <label className="text-xs text-slate-400 mb-1 block">{field.label}</label>
              <input
                type={field.type}
                value={form[field.key]}
                onChange={e => setForm({ ...form, [field.key]: Number(e.target.value) })}
                className="w-full bg-[#13192B] border border-[#2A3441] text-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:border-red-500 text-sm"
              />
            </div>
          ))}
        </div>
        <div>
          <label className="text-xs text-slate-400 mb-1 block">Threat Level</label>
          <select
            value={form.threatLevel}
            onChange={e => setForm({ ...form, threatLevel: e.target.value })}
            className="w-full bg-[#13192B] border border-[#2A3441] text-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:border-red-500 text-sm"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full h-10 bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white font-medium rounded-lg flex items-center justify-center gap-2 text-sm"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
          Save Stats
        </button>
      </div>
    );
  };

  // ---- SERVICES ----
  const ServicesTab = () => {
    const [addForm, setAddForm] = useState({
      serviceId: services[0]?._id || '',
      paymentType: 'one-time',
      price: '',
      status: 'Pending',
      riskLevel: 'Low',
      deliveryDate: '',
    });

    const handleAdd = async () => {
      setSaving(true);
      try {
        await apiCall('POST', `/api/admink/users/${userId}/services`, addForm);
        await fetchData();
        setModal(null);
      } catch (err) {
        alert(err.message);
      } finally {
        setSaving(false);
      }
    };

    const handleUpdate = async (userServiceId, updatedData) => {
      setSaving(true);
      try {
        await apiCall('PUT', `/api/admink/services/${userServiceId}`, updatedData);
        await fetchData();
        setModal(null);
      } catch (err) {
        alert(err.message);
      } finally {
        setSaving(false);
      }
    };

    const handleRemove = async (userServiceId) => {
      if (!window.confirm('Remove this service?')) return;
      try {
        await apiCall('DELETE', `/api/admink/services/${userServiceId}`);
        await fetchData();
      } catch (err) {
        alert(err.message);
      }
    };

    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-slate-300 font-medium">Services ({data?.userServices?.length || 0})</h3>
          <button
            onClick={() => setModal('addService')}
            className="flex items-center gap-2 px-3 py-2 bg-red-600 hover:bg-red-500 text-white text-sm font-medium rounded-lg"
          >
            <Plus className="w-4 h-4" /> Add Service
          </button>
        </div>

        <div className="space-y-3">
          {data?.userServices?.map((us) => (
            <div key={us._id} className="bg-[#13192B] border border-[#2A3441] rounded-xl p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold text-slate-200">{us.service?.name}</p>
                  <div className="flex gap-2 mt-1 flex-wrap">
                    <span className={`text-xs px-2 py-0.5 rounded border ${
                      us.paymentStatus === 'Paid'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    }`}>{us.paymentStatus}</span>
                    <span className="text-xs px-2 py-0.5 rounded border bg-blue-500/10 text-blue-400 border-blue-500/20">{us.status}</span>
                    <span className="text-xs px-2 py-0.5 rounded border bg-slate-500/10 text-slate-400 border-slate-500/20">{us.paymentType}</span>
                    <span className="text-xs text-slate-400">£{us.price}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setModal({ type: 'editService', data: us })}
                    className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-lg"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleRemove(us._id)}
                    className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Service Modal */}
        {modal === 'addService' && (
          <Modal title="Add Service" onClose={() => setModal(null)}>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-slate-400 mb-1 block">Service</label>
                <select
                  value={addForm.serviceId}
                  onChange={e => setAddForm({ ...addForm, serviceId: e.target.value })}
                  className="w-full bg-[#13192B] border border-[#2A3441] text-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-red-500"
                >
                  {services.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
                </select>
              </div>
              {[
                { label: 'Payment Type', key: 'paymentType', type: 'select', options: ['one-time', 'monthly'] },
                { label: 'Status', key: 'status', type: 'select', options: ['Pending', 'In Progress', 'Completed'] },
                { label: 'Risk Level', key: 'riskLevel', type: 'select', options: ['Low', 'Medium', 'High'] },
              ].map(field => (
                <div key={field.key}>
                  <label className="text-xs text-slate-400 mb-1 block">{field.label}</label>
                  <select
                    value={addForm[field.key]}
                    onChange={e => setAddForm({ ...addForm, [field.key]: e.target.value })}
                    className="w-full bg-[#13192B] border border-[#2A3441] text-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-red-500"
                  >
                    {field.options.map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
              ))}
              <div>
                <label className="text-xs text-slate-400 mb-1 block">Price (£)</label>
                <input
                  type="number"
                  value={addForm.price}
                  onChange={e => setAddForm({ ...addForm, price: e.target.value })}
                  className="w-full bg-[#13192B] border border-[#2A3441] text-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-red-500"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 mb-1 block">Delivery Date</label>
                <input
                  type="date"
                  value={addForm.deliveryDate}
                  onChange={e => setAddForm({ ...addForm, deliveryDate: e.target.value })}
                  className="w-full bg-[#13192B] border border-[#2A3441] text-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-red-500"
                />
              </div>
              <button
                onClick={handleAdd}
                disabled={saving}
                className="w-full h-10 bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white font-medium rounded-lg flex items-center justify-center gap-2 text-sm"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Add Service'}
              </button>
            </div>
          </Modal>
        )}

        {/* Edit Service Modal */}
        {modal?.type === 'editService' && (
          <EditServiceModal
            us={modal.data}
            onSave={handleUpdate}
            onClose={() => setModal(null)}
            saving={saving}
          />
        )}
      </div>
    );
  };

  // ---- REPORTS ----
  const ReportsTab = () => {
    const [form, setForm] = useState({
      serviceId: data?.userServices?.[0]?.service?._id || '',
      title: '',
      date: '',
      riskLevel: 'Low',
      executiveSummary: '',
      details: '',
      pdfUrl: '',
    });

    const handleCreate = async () => {
      setSaving(true);
      try {
        await apiCall('POST', `/api/admink/users/${userId}/reports`, {
          ...form,
          details: form.details.split('\n').filter(Boolean),
        });
        await fetchData();
        setModal(null);
      } catch (err) {
        alert(err.message);
      } finally {
        setSaving(false);
      }
    };

    const handleDelete = async (reportId) => {
      if (!window.confirm('Delete this report?')) return;
      try {
        await apiCall('DELETE', `/api/admink/reports/${reportId}`);
        await fetchData();
      } catch (err) {
        alert(err.message);
      }
    };

    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-slate-300 font-medium">Reports ({data?.reports?.length || 0})</h3>
          <button
            onClick={() => setModal('addReport')}
            className="flex items-center gap-2 px-3 py-2 bg-red-600 hover:bg-red-500 text-white text-sm font-medium rounded-lg"
          >
            <Plus className="w-4 h-4" /> Add Report
          </button>
        </div>

        <div className="space-y-3">
          {data?.reports?.map((report) => (
            <div key={report._id} className="bg-[#13192B] border border-[#2A3441] rounded-xl p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold text-slate-200">{report.title}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{report.service?.name} · {report.date}</p>
                  <span className={`text-xs px-2 py-0.5 rounded border mt-1 inline-block ${
                    report.riskLevel === 'High' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                    report.riskLevel === 'Medium' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                    'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                  }`}>{report.riskLevel} Risk</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setModal({ type: 'editReport', data: report })}
                    className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-lg"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(report._id)}
                    className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Report Modal */}
        {modal === 'addReport' && (
          <Modal title="Add Report" onClose={() => setModal(null)}>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-slate-400 mb-1 block">Service</label>
                <select
                  value={form.serviceId}
                  onChange={e => setForm({ ...form, serviceId: e.target.value })}
                  className="w-full bg-[#13192B] border border-[#2A3441] text-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-red-500"
                >
                  {data?.userServices?.map(us => (
                    <option key={us.service?._id} value={us.service?._id}>{us.service?.name}</option>
                  ))}
                </select>
              </div>
              {[
                { label: 'Title', key: 'title', type: 'text' },
                { label: 'Date', key: 'date', type: 'text', placeholder: 'e.g. Generated on 2 Jan 2025' },
                { label: 'PDF URL', key: 'pdfUrl', type: 'text', placeholder: 'https://...' },
              ].map(field => (
                <div key={field.key}>
                  <label className="text-xs text-slate-400 mb-1 block">{field.label}</label>
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    value={form[field.key]}
                    onChange={e => setForm({ ...form, [field.key]: e.target.value })}
                    className="w-full bg-[#13192B] border border-[#2A3441] text-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-red-500"
                  />
                </div>
              ))}
              <div>
                <label className="text-xs text-slate-400 mb-1 block">Risk Level</label>
                <select
                  value={form.riskLevel}
                  onChange={e => setForm({ ...form, riskLevel: e.target.value })}
                  className="w-full bg-[#13192B] border border-[#2A3441] text-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-red-500"
                >
                  <option>Low</option><option>Medium</option><option>High</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-slate-400 mb-1 block">Executive Summary</label>
                <textarea
                  value={form.executiveSummary}
                  onChange={e => setForm({ ...form, executiveSummary: e.target.value })}
                  rows={3}
                  className="w-full bg-[#13192B] border border-[#2A3441] text-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-red-500 resize-none"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 mb-1 block">Details (one per line)</label>
                <textarea
                  value={form.details}
                  onChange={e => setForm({ ...form, details: e.target.value })}
                  rows={4}
                  placeholder="Finding 1&#10;Finding 2&#10;Finding 3"
                  className="w-full bg-[#13192B] border border-[#2A3441] text-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-red-500 resize-none"
                />
              </div>
              <button
                onClick={handleCreate}
                disabled={saving}
                className="w-full h-10 bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white font-medium rounded-lg flex items-center justify-center gap-2 text-sm"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Create Report'}
              </button>
            </div>
          </Modal>
        )}

        {/* Edit Report Modal */}
        {modal?.type === 'editReport' && (
          <EditReportModal
            report={modal.data}
            userServices={data?.userServices}
            onSave={async (reportId, updatedData) => {
              setSaving(true);
              try {
                await apiCall('PUT', `/api/admink/reports/${reportId}`, updatedData);
                await fetchData();
                setModal(null);
              } catch (err) {
                alert(err.message);
              } finally {
                setSaving(false);
              }
            }}
            onClose={() => setModal(null)}
            saving={saving}
          />
        )}
      </div>
    );
  };

  // ---- BILLING ----
  const BillingTab = () => {
    const handleUpdatePayment = async (userServiceId, paymentStatus) => {
      try {
        await apiCall('PUT', `/api/admink/payments/${userServiceId}`, {
          paymentStatus,
          invoiceDate: new Date(),
        });
        await fetchData();
      } catch (err) {
        alert(err.message);
      }
    };

    return (
      <div className="space-y-4">
        <h3 className="text-slate-300 font-medium">Billing & Payments</h3>
        <div className="space-y-3">
          {data?.userServices?.map((us) => (
            <div key={us._id} className="bg-[#13192B] border border-[#2A3441] rounded-xl p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-bold text-slate-200">{us.service?.name}</p>
                  <div className="flex gap-2 mt-1">
                    <span className="text-xs text-slate-400">£{us.price}</span>
                    <span className="text-xs text-slate-500">·</span>
                    <span className="text-xs text-slate-400">{us.paymentType}</span>
                    {us.invoiceDate && (
                      <>
                        <span className="text-xs text-slate-500">·</span>
                        <span className="text-xs text-slate-400">
                          Paid: {new Date(us.invoiceDate).toLocaleDateString('en-GB')}
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-1 rounded border ${
                    us.paymentStatus === 'Paid'
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                      : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                  }`}>
                    {us.paymentStatus}
                  </span>
                  {us.paymentStatus === 'Unpaid' ? (
                    <button
                      onClick={() => handleUpdatePayment(us._id, 'Paid')}
                      className="text-xs px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-medium"
                    >
                      Mark Paid
                    </button>
                  ) : (
                    <button
                      onClick={() => handleUpdatePayment(us._id, 'Unpaid')}
                      className="text-xs px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white rounded-lg font-medium"
                    >
                      Mark Unpaid
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (isLoading) return (
    <div className="flex items-center justify-center h-64">
      <Loader2 className="w-10 h-10 text-red-500 animate-spin" />
    </div>
  );

  if (!data) return <p className="text-red-400">Company not found.</p>;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Shield },
    { id: 'services', label: 'Services', icon: Activity },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'billing', label: 'Billing', icon: CreditCard },
  ];

  return (
    <div className="space-y-6">
      {/* Back + Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/admink/companies')}
          className="p-2 text-slate-400 hover:text-slate-200 hover:bg-[#13192B] rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 font-bold text-lg">
            {data.user?.companyName?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-100">{data.user?.companyName}</h1>
            <p className="text-slate-400 text-sm">{data.user?.email}</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Security Score', value: `${data.dashboard?.securityScore || 0}/100`, color: 'text-blue-400' },
          { label: 'Threat Level', value: data.dashboard?.threatLevel || 'Low', color: data.dashboard?.threatLevel === 'High' ? 'text-red-400' : data.dashboard?.threatLevel === 'Medium' ? 'text-amber-400' : 'text-emerald-400' },
          { label: 'Services', value: data.userServices?.length || 0, color: 'text-purple-400' },
          { label: 'Reports', value: data.reports?.length || 0, color: 'text-pink-400' },
        ].map((stat) => (
          <div key={stat.label} className="bg-[#0B0F19] border border-[#1C212E] rounded-xl p-4 text-center">
            <p className="text-xs text-slate-500 mb-1">{stat.label}</p>
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-[#0B0F19] border border-[#1C212E] p-1 rounded-xl">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-red-600 text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-[#0B0F19] border border-[#1C212E] rounded-2xl p-6">
        {activeTab === 'overview' && <StatsTab />}
        {activeTab === 'services' && <ServicesTab />}
        {activeTab === 'reports' && <ReportsTab />}
        {activeTab === 'billing' && <BillingTab />}
      </div>
    </div>
  );
};

// ------------------ Edit Service Modal ------------------
const EditServiceModal = ({ us, onSave, onClose, saving }) => {
  const [form, setForm] = useState({
    paymentType: us.paymentType || 'one-time',
    status: us.status || 'Pending',
    riskLevel: us.riskLevel || 'Low',
    paymentStatus: us.paymentStatus || 'Unpaid',
    price: us.price || '',
    deliveryDate: us.deliveryDate ? us.deliveryDate.split('T')[0] : '',
  });

  return (
    <Modal title={`Edit — ${us.service?.name}`} onClose={onClose}>
      <div className="space-y-3">
        {[
          { label: 'Payment Type', key: 'paymentType', options: ['one-time', 'monthly'] },
          { label: 'Status', key: 'status', options: ['Pending', 'In Progress', 'Completed'] },
          { label: 'Risk Level', key: 'riskLevel', options: ['Low', 'Medium', 'High'] },
          { label: 'Payment Status', key: 'paymentStatus', options: ['Unpaid', 'Paid'] },
        ].map(field => (
          <div key={field.key}>
            <label className="text-xs text-slate-400 mb-1 block">{field.label}</label>
            <select
              value={form[field.key]}
              onChange={e => setForm({ ...form, [field.key]: e.target.value })}
              className="w-full bg-[#13192B] border border-[#2A3441] text-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-red-500"
            >
              {field.options.map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
        ))}
        <div>
          <label className="text-xs text-slate-400 mb-1 block">Price (£)</label>
          <input
            type="number"
            value={form.price}
            onChange={e => setForm({ ...form, price: e.target.value })}
            className="w-full bg-[#13192B] border border-[#2A3441] text-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-red-500"
          />
        </div>
        <div>
          <label className="text-xs text-slate-400 mb-1 block">Delivery Date</label>
          <input
            type="date"
            value={form.deliveryDate}
            onChange={e => setForm({ ...form, deliveryDate: e.target.value })}
            className="w-full bg-[#13192B] border border-[#2A3441] text-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-red-500"
          />
        </div>
        <button
          onClick={() => onSave(us._id, form)}
          disabled={saving}
          className="w-full h-10 bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white font-medium rounded-lg flex items-center justify-center gap-2 text-sm"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save Changes'}
        </button>
      </div>
    </Modal>
  );
};

// ------------------ Edit Report Modal ------------------
const EditReportModal = ({ report, userServices, onSave, onClose, saving }) => {
  const [form, setForm] = useState({
    title: report.title || '',
    date: report.date || '',
    riskLevel: report.riskLevel || 'Low',
    executiveSummary: report.executiveSummary || '',
    details: report.details?.join('\n') || '',
    pdfUrl: report.pdfUrl || '',
  });

  return (
    <Modal title="Edit Report" onClose={onClose}>
      <div className="space-y-3">
        {[
          { label: 'Title', key: 'title', type: 'text' },
          { label: 'Date', key: 'date', type: 'text' },
          { label: 'PDF URL', key: 'pdfUrl', type: 'text' },
        ].map(field => (
          <div key={field.key}>
            <label className="text-xs text-slate-400 mb-1 block">{field.label}</label>
            <input
              type={field.type}
              value={form[field.key]}
              onChange={e => setForm({ ...form, [field.key]: e.target.value })}
              className="w-full bg-[#13192B] border border-[#2A3441] text-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-red-500"
            />
          </div>
        ))}
        <div>
          <label className="text-xs text-slate-400 mb-1 block">Risk Level</label>
          <select
            value={form.riskLevel}
            onChange={e => setForm({ ...form, riskLevel: e.target.value })}
            className="w-full bg-[#13192B] border border-[#2A3441] text-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-red-500"
          >
            <option>Low</option><option>Medium</option><option>High</option>
          </select>
        </div>
        <div>
          <label className="text-xs text-slate-400 mb-1 block">Executive Summary</label>
          <textarea
            value={form.executiveSummary}
            onChange={e => setForm({ ...form, executiveSummary: e.target.value })}
            rows={3}
            className="w-full bg-[#13192B] border border-[#2A3441] text-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-red-500 resize-none"
          />
        </div>
        <div>
          <label className="text-xs text-slate-400 mb-1 block">Details (one per line)</label>
          <textarea
            value={form.details}
            onChange={e => setForm({ ...form, details: e.target.value })}
            rows={4}
            className="w-full bg-[#13192B] border border-[#2A3441] text-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-red-500 resize-none"
          />
        </div>
        <button
          onClick={() => onSave(report._id, { ...form, details: form.details.split('\n').filter(Boolean) })}
          disabled={saving}
          className="w-full h-10 bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white font-medium rounded-lg flex items-center justify-center gap-2 text-sm"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save Changes'}
        </button>
      </div>
    </Modal>
  );
};

export default AdminCompanyDetail;