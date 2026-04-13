import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Search, Trash2, Eye, Loader2, ShieldCheck, ShieldAlert } from 'lucide-react';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

const AdminCompanies = () => {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    fetchCompanies();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchCompanies = async () => {
    try {
      const res = await fetch(`${API_URL}/api/admink/companies`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setCompanies(data);
    } catch {
      // silently fail
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (userId, companyName) => {
    if (!window.confirm(`Are you sure you want to delete ${companyName} and ALL their data? This cannot be undone.`)) return;

    try {
      setDeletingId(userId);
      const res = await fetch(`${API_URL}/api/admin/users/${userId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to delete');
      setCompanies(prev => prev.filter(c => c._id !== userId));
    } catch (err) {
      alert(err.message);
    } finally {
      setDeletingId(null);
    }
  };

  const filtered = companies.filter(c =>
    c.companyName?.toLowerCase().includes(search.toLowerCase()) ||
    c.email?.toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) return (
    <div className="flex items-center justify-center h-64">
      <Loader2 className="w-10 h-10 text-red-500 animate-spin" />
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-100">Companies</h1>
          <p className="text-slate-400 mt-1">Manage all registered companies</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="bg-[#13192B] border border-[#2A3441] text-slate-400 text-sm px-4 py-2 rounded-lg">
            {companies.length} total
          </span>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="w-5 h-5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by company name or email..."
          className="w-full bg-[#0B0F19] border border-[#1C212E] text-slate-200 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-red-500 transition-colors"
        />
      </div>

      {/* Companies Table */}
      <div className="bg-[#0B0F19] border border-[#1C212E] rounded-2xl overflow-hidden">
        <table className="w-full text-left text-sm text-slate-400">
          <thead className="border-b border-[#1C212E] text-xs text-slate-500">
            <tr>
              <th className="px-6 py-4 font-normal">Company</th>
              <th className="px-6 py-4 font-normal">Email</th>
              <th className="px-6 py-4 font-normal">Services</th>
              <th className="px-6 py-4 font-normal">Reports</th>
              <th className="px-6 py-4 font-normal">Score</th>
              <th className="px-6 py-4 font-normal">Threat</th>
              <th className="px-6 py-4 font-normal">Verified</th>
              <th className="px-6 py-4 font-normal text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1C212E]">
            {filtered.map((company) => (
              <tr key={company._id} className="hover:bg-[#13192B] transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 font-bold text-sm flex-shrink-0">
                      {company.companyName?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div>
                      <p className="font-bold text-slate-200">{company.companyName || 'N/A'}</p>
                      <p className="text-xs text-slate-500">{company.name}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-300">{company.email}</td>
                <td className="px-6 py-4">
                  <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs px-2 py-0.5 rounded">
                    {company.userServices?.length || 0} services
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs px-2 py-0.5 rounded">
                    {company.totalReports} reports
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="font-bold text-slate-200">{company.securityScore}</span>
                  <span className="text-slate-500 text-xs">/100</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`text-xs px-2 py-0.5 rounded border ${
                    company.threatLevel === 'High' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                    company.threatLevel === 'Medium' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                    'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                  }`}>
                    {company.threatLevel}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {company.isVerified
                    ? <ShieldCheck className="w-5 h-5 text-emerald-400" />
                    : <ShieldAlert className="w-5 h-5 text-amber-400" />
                  }
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => navigate(`/admink/companies/${company._id}`)}
                      className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(company._id, company.companyName)}
                      disabled={deletingId === company._id}
                      className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      {deletingId === company._id
                        ? <Loader2 className="w-4 h-4 animate-spin" />
                        : <Trash2 className="w-4 h-4" />
                      }
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="p-16 text-center">
            <Building2 className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-500">No companies found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCompanies;