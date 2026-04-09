import React, { useEffect, useState, useMemo } from 'react';
import {
  GraduationCap, Trash2, Loader2, Check, Search,
  ChevronDown, Mail, Phone, Calendar, RefreshCw, X,
} from 'lucide-react';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

const STATUS_OPTIONS = ['pending', 'reviewed', 'accepted', 'rejected'];

const STATUS_STYLES = {
  pending:  'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  reviewed: 'bg-blue-500/10   text-blue-400   border-blue-500/20',
  accepted: 'bg-green-500/10  text-green-400  border-green-500/20',
  rejected: 'bg-red-500/10    text-red-400    border-red-500/20',
};

const AdminInterns = () => {
  const [interns, setInterns]         = useState([]);
  const [isLoading, setIsLoading]     = useState(true);
  const [search, setSearch]           = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [updatingId, setUpdatingId]   = useState(null);
  const [deletingId, setDeletingId]   = useState(null);
  const [success, setSuccess]         = useState('');
  const [selectedIntern, setSelectedIntern] = useState(null);

  const token = localStorage.getItem('adminToken');

  /* ─── Fetch ─────────────────────────────────────────────── */
  const fetchInterns = async () => {
    setIsLoading(true);
    try {
      const res  = await fetch(`${API_URL}/api/interns`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setInterns(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('[ADMIN INTERNS]', err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchInterns(); /* eslint-disable-next-line */ }, []);

  /* ─── Filtered list ──────────────────────────────────────── */
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return interns.filter((i) => {
      const matchesSearch =
        !q ||
        i.name?.toLowerCase().includes(q) ||
        i.email?.toLowerCase().includes(q) ||
        i.university?.toLowerCase().includes(q) ||
        i.degree?.toLowerCase().includes(q);
      const matchesStatus =
        filterStatus === 'all' || i.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [interns, search, filterStatus]);

  /* ─── Status counts ──────────────────────────────────────── */
  const counts = useMemo(() => {
    const c = { all: interns.length, pending: 0, reviewed: 0, accepted: 0, rejected: 0 };
    interns.forEach((i) => { if (c[i.status] !== undefined) c[i.status]++; });
    return c;
  }, [interns]);

  /* ─── Update status ──────────────────────────────────────── */
  const handleStatusChange = async (intern, newStatus) => {
    if (intern.status === newStatus) return;
    setUpdatingId(intern.id);
    try {
      const res = await fetch(`${API_URL}/api/interns/${intern.id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update status');
      setInterns((prev) =>
        prev.map((i) => (i.id === intern.id ? { ...i, status: newStatus } : i))
      );
      if (selectedIntern?.id === intern.id) {
        setSelectedIntern((prev) => ({ ...prev, status: newStatus }));
      }
      setSuccess(`${intern.name}'s status updated to "${newStatus}"`);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      alert(err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  /* ─── Delete ─────────────────────────────────────────────── */
  const handleDelete = async (intern) => {
    if (!window.confirm(`Delete ${intern.name}'s application? This cannot be undone.`)) return;
    setDeletingId(intern.id);
    try {
      const res = await fetch(`${API_URL}/api/interns/${intern.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to delete');
      setInterns((prev) => prev.filter((i) => i.id !== intern.id));
      if (selectedIntern?.id === intern.id) setSelectedIntern(null);
      setSuccess(`${intern.name}'s application deleted.`);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      alert(err.message);
    } finally {
      setDeletingId(null);
    }
  };

  /* ─── Format date ────────────────────────────────────────── */
  const fmtDate = (d) =>
    d
      ? new Date(d).toLocaleDateString('en-GB', {
          day: '2-digit', month: 'short', year: 'numeric',
        })
      : '—';

  /* ─────────────────────────────────────────────────────────── */
  return (
    <div className="space-y-6">

      {/* ── Header ── */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <GraduationCap className="w-6 h-6 text-red-400" />
          <h1 className="text-2xl font-bold text-white">Intern Applications</h1>
          <span className="bg-red-500/10 text-red-400 border border-red-500/20 text-xs px-2 py-0.5 rounded-full font-medium">
            {interns.length}
          </span>
        </div>
        <button
          onClick={fetchInterns}
          disabled={isLoading}
          className="flex items-center gap-2 px-3 py-2 text-slate-400 hover:text-slate-200 hover:bg-[#13192B] rounded-xl text-sm transition-all disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* ── Status tabs ── */}
      <div className="flex items-center gap-2 flex-wrap">
        {['all', ...STATUS_OPTIONS].map((s) => (
          <button
            key={s}
            onClick={() => setFilterStatus(s)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all border ${
              filterStatus === s
                ? s === 'all'
                  ? 'bg-red-500/10 text-red-400 border-red-500/30'
                  : STATUS_STYLES[s] + ' border'
                : 'text-slate-500 border-transparent hover:border-[#1C212E] hover:text-slate-300'
            }`}
          >
            {s === 'all' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
            <span className="ml-1.5 opacity-70">({counts[s]})</span>
          </button>
        ))}
      </div>

      {/* ── Success banner ── */}
      {success && (
        <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-3 rounded-xl text-sm">
          <Check className="w-4 h-4 flex-shrink-0" />
          {success}
        </div>
      )}

      {/* ── Search ── */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, email, university or degree…"
          className="w-full bg-[#0B0F19] border border-[#1C212E] text-white text-sm rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-red-500/40 placeholder-slate-600"
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* ── Loading ── */}
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 text-red-500 animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-[#0B0F19] border border-[#1C212E] rounded-2xl p-12 text-center">
          <GraduationCap className="w-12 h-12 text-slate-600 mx-auto mb-4" />
          <p className="text-slate-400 text-lg font-medium">No applications found</p>
          <p className="text-slate-600 text-sm mt-1">
            {search ? 'Try a different search term.' : 'No internship applications yet.'}
          </p>
        </div>
      ) : (

        /* ── Table ── */
        <div className="bg-[#0B0F19] border border-[#1C212E] rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#1C212E] text-slate-500 text-xs uppercase tracking-wider">
                  <th className="text-left px-6 py-4 font-medium">Applicant</th>
                  <th className="text-left px-6 py-4 font-medium hidden md:table-cell">Degree / University</th>
                  <th className="text-left px-6 py-4 font-medium hidden lg:table-cell">Year</th>
                  <th className="text-left px-6 py-4 font-medium hidden xl:table-cell">Applied</th>
                  <th className="text-left px-6 py-4 font-medium">Status</th>
                  <th className="text-right px-6 py-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1C212E]">
                {filtered.map((intern) => (
                  <tr
                    key={intern.id || intern._id}
                    className="hover:bg-[#0d1220] transition-colors"
                  >
                    {/* Name + contact */}
                    <td className="px-6 py-4">
                      <button
                        onClick={() => setSelectedIntern(intern)}
                        className="text-left group"
                      >
                        <p className="text-white font-medium group-hover:text-red-400 transition-colors">
                          {intern.name}
                        </p>
                        <div className="flex items-center gap-1.5 mt-0.5 text-slate-500 text-xs">
                          <Mail className="w-3 h-3" />
                          {intern.email}
                        </div>
                        <div className="flex items-center gap-1.5 mt-0.5 text-slate-500 text-xs">
                          <Phone className="w-3 h-3" />
                          {intern.phone}
                        </div>
                      </button>
                    </td>

                    {/* Degree */}
                    <td className="px-6 py-4 hidden md:table-cell">
                      <p className="text-slate-200 font-medium text-xs">{intern.degree}</p>
                      {intern.university && (
                        <p className="text-slate-500 text-xs mt-0.5">{intern.university}</p>
                      )}
                    </td>

                    {/* Year */}
                    <td className="px-6 py-4 hidden lg:table-cell">
                      <span className="text-slate-300 text-xs">{intern.universityYear}</span>
                    </td>

                    {/* Applied at */}
                    <td className="px-6 py-4 hidden xl:table-cell">
                      <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                        <Calendar className="w-3 h-3" />
                        {fmtDate(intern.applied_at)}
                      </div>
                    </td>

                    {/* Status dropdown */}
                    <td className="px-6 py-4">
                      <div className="relative inline-flex items-center">
                        {updatingId === intern.id ? (
                          <Loader2 className="w-4 h-4 text-slate-400 animate-spin" />
                        ) : (
                          <div className="relative">
                            <select
                              value={intern.status}
                              onChange={(e) => handleStatusChange(intern, e.target.value)}
                              className={`appearance-none text-xs font-medium px-3 py-1.5 pr-7 rounded-lg border cursor-pointer bg-transparent focus:outline-none ${
                                STATUS_STYLES[intern.status] || STATUS_STYLES.pending
                              }`}
                            >
                              {STATUS_OPTIONS.map((s) => (
                                <option key={s} value={s} className="bg-[#0B0F19] text-white">
                                  {s.charAt(0).toUpperCase() + s.slice(1)}
                                </option>
                              ))}
                            </select>
                            <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 opacity-60" />
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedIntern(intern)}
                          className="p-2 text-slate-500 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all text-xs font-medium"
                          title="View details"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleDelete(intern)}
                          disabled={deletingId === intern.id}
                          className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all disabled:opacity-50"
                          title="Delete"
                        >
                          {deletingId === intern.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table footer */}
          <div className="px-6 py-3 border-t border-[#1C212E] text-xs text-slate-500">
            Showing {filtered.length} of {interns.length} application{interns.length !== 1 ? 's' : ''}
          </div>
        </div>
      )}

      {/* ── Detail Modal ── */}
      {selectedIntern && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={() => setSelectedIntern(null)}
        >
          <div
            className="bg-[#0B0F19] border border-[#1C212E] rounded-2xl w-full max-w-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between p-6 border-b border-[#1C212E]">
              <div>
                <h2 className="text-white font-bold text-lg">{selectedIntern.name}</h2>
                <p className="text-slate-500 text-sm mt-0.5">Application Details</p>
              </div>
              <button
                onClick={() => setSelectedIntern(null)}
                className="p-2 text-slate-500 hover:text-slate-200 transition-colors rounded-lg hover:bg-[#1C212E]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal body */}
            <div className="p-6 space-y-4">
              {/* Status badge */}
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-sm">Current Status</span>
                <span className={`text-xs font-medium px-3 py-1 rounded-lg border capitalize ${STATUS_STYLES[selectedIntern.status] || STATUS_STYLES.pending}`}>
                  {selectedIntern.status}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {[
                  { label: 'Email',           value: selectedIntern.email,          icon: Mail },
                  { label: 'Phone',           value: selectedIntern.phone,          icon: Phone },
                  { label: 'Degree / Course', value: selectedIntern.degree,         icon: GraduationCap },
                  { label: 'University',      value: selectedIntern.university || '—', icon: null },
                  { label: 'Year of Study',   value: selectedIntern.universityYear, icon: null },
                  { label: 'Applied On',        value: fmtDate(selectedIntern.applied_at), icon: Calendar },
                  { label: 'Status Last Updated', value: selectedIntern.statusUpdatedAt ? fmtDate(selectedIntern.statusUpdatedAt) : 'Not yet updated', icon: null },
                ].map(({ label, value, icon: Icon }) => (
                  <div key={label} className="bg-[#06080A] border border-[#1C212E] rounded-xl px-4 py-3">
                    <p className="text-slate-500 text-xs mb-1">{label}</p>
                    <div className="flex items-center gap-2">
                      {Icon && <Icon className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />}
                      <p className="text-slate-200 text-sm font-medium">{value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Status changer */}
              <div className="pt-2">
                <p className="text-slate-400 text-sm mb-3 font-medium">Update Status</p>
                <div className="grid grid-cols-2 gap-2">
                  {STATUS_OPTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => handleStatusChange(selectedIntern, s)}
                      disabled={updatingId === selectedIntern.id || selectedIntern.status === s}
                      className={`px-3 py-2 rounded-xl text-xs font-medium capitalize border transition-all disabled:opacity-40 ${
                        selectedIntern.status === s
                          ? STATUS_STYLES[s] + ' cursor-default'
                          : 'text-slate-400 border-[#1C212E] hover:border-slate-500 hover:text-slate-200'
                      }`}
                    >
                      {updatingId === selectedIntern.id && selectedIntern.status !== s ? (
                        <Loader2 className="w-3 h-3 animate-spin mx-auto" />
                      ) : (
                        s.charAt(0).toUpperCase() + s.slice(1)
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal footer */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-[#1C212E]">
              <button
                onClick={() => handleDelete(selectedIntern)}
                disabled={deletingId === selectedIntern.id}
                className="flex items-center gap-2 px-4 py-2 text-red-400 hover:bg-red-500/10 rounded-xl text-sm font-medium transition-all disabled:opacity-50"
              >
                {deletingId === selectedIntern.id ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Trash2 className="w-4 h-4" />
                )}
                Delete Application
              </button>
              <button
                onClick={() => setSelectedIntern(null)}
                className="px-4 py-2 text-slate-400 hover:text-slate-200 text-sm font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminInterns;
