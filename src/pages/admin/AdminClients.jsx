import React, { useEffect, useState } from 'react';
import {
  Building2, Plus, Pencil, Trash2, Loader2, X, Check, Star,
} from 'lucide-react';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

const emptyForm = {
  name: '',
  logo: '',
  website: '',
  industry: '',
  featured: false,
  order: 0,
};

const AdminClients = () => {
  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    fetchClients();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchClients = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/clients`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setClients(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('[ADMIN CLIENTS] Error:', err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const openCreate = () => {
    setEditingClient(null);
    setForm(emptyForm);
    setError('');
    setShowModal(true);
  };

  const openEdit = (client) => {
    setEditingClient(client);
    setForm({
      name: client.name || '',
      logo: client.logo || '',
      website: client.website || '',
      industry: client.industry || '',
      featured: client.featured ?? false,
      order: client.order ?? 0,
    });
    setError('');
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : (name === 'order' ? parseInt(value, 10) || 0 : value),
    }));
  };

  const handleSave = async () => {
    setError('');
    if (!form.name) {
      setError('Please fill in all required fields.');
      return;
    }
    setSaving(true);
    try {
      let res;
      if (editingClient) {
        res = await fetch(`${API_URL}/api/clients/${editingClient.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        });
      } else {
        res = await fetch(`${API_URL}/api/clients`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        });
      }

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save');

      setShowModal(false);
      setSuccess(editingClient ? 'Client updated successfully!' : 'Client created successfully!');
      setTimeout(() => setSuccess(''), 3000);
      fetchClients();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (client) => {
    if (!window.confirm(`Delete "${client.name}"? This cannot be undone.`)) return;
    setDeletingId(client.id);
    try {
      const res = await fetch(`${API_URL}/api/clients/${client.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to delete');
      setClients((prev) => prev.filter((c) => c.id !== client.id));
      setSuccess('Client deleted.');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      alert(err.message);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Building2 className="w-6 h-6 text-red-400" />
          <h1 className="text-2xl font-bold text-white">Clients</h1>
          <span className="bg-red-500/10 text-red-400 border border-red-500/20 text-xs px-2 py-0.5 rounded-full font-medium">
            {clients.length}
          </span>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm font-medium transition-all"
        >
          <Plus className="w-4 h-4" />
          New Client
        </button>
      </div>

      {/* Success message */}
      {success && (
        <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-3 rounded-xl text-sm">
          <Check className="w-4 h-4" />
          {success}
        </div>
      )}

      {/* Clients grid */}
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 text-red-500 animate-spin" />
        </div>
      ) : clients.length === 0 ? (
        <div className="bg-[#0B0F19] border border-[#1C212E] rounded-2xl p-12 text-center">
          <Building2 className="w-12 h-12 text-slate-600 mx-auto mb-4" />
          <p className="text-slate-400 text-lg font-medium">No clients yet</p>
          <p className="text-slate-600 text-sm mt-1">Add your first client to get started.</p>
          <button
            onClick={openCreate}
            className="mt-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm font-medium transition-all"
          >
            Create Client
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {clients.map((client) => (
            <div
              key={client.id || client._id}
              className="bg-[#0B0F19] border border-[#1C212E] rounded-2xl p-6 hover:border-[#2C3245] transition-colors group"
            >
              {/* Logo and Featured Badge */}
              <div className="relative mb-4">
                <div className="w-full h-40 bg-[#06080A] border border-[#1C212E] rounded-xl flex items-center justify-center overflow-hidden">
                  {client.logo ? (
                    <img
                      src={client.logo}
                      alt={client.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  ) : null}
                  {!client.logo && (
                    <div className="flex flex-col items-center justify-center text-slate-600">
                      <Building2 className="w-8 h-8 mb-2" />
                      <span className="text-xs">No logo</span>
                    </div>
                  )}
                </div>
                {client.featured && (
                  <div className="absolute top-3 right-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs px-2.5 py-1 rounded-lg font-medium flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" />
                    Featured
                  </div>
                )}
              </div>

              {/* Client Info */}
              <div className="mb-4">
                <h3 className="text-white font-semibold text-sm line-clamp-1 mb-1">{client.name}</h3>
                {client.industry && (
                  <p className="text-slate-400 text-xs mb-2">{client.industry}</p>
                )}
                {client.website && (
                  <a
                    href={client.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-400 hover:text-red-300 text-xs truncate block"
                  >
                    {client.website}
                  </a>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-[#1C212E]">
                <span className="text-slate-500 text-xs">
                  Order: <span className="text-slate-300 font-medium">{client.order}</span>
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEdit(client)}
                    className="p-2 text-slate-500 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all"
                    title="Edit"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(client)}
                    disabled={deletingId === client.id}
                    className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all disabled:opacity-50"
                    title="Delete"
                  >
                    {deletingId === client.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[#0B0F19] border border-[#1C212E] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Modal header */}
            <div className="flex items-center justify-between p-6 border-b border-[#1C212E]">
              <h2 className="text-white font-bold text-lg">
                {editingClient ? 'Edit Client' : 'Create Client'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 text-slate-500 hover:text-slate-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal body */}
            <div className="p-6 space-y-5">
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-sm">
                  {error}
                </div>
              )}

              {/* Name */}
              <div>
                <label className="block text-slate-400 text-sm font-medium mb-1.5">
                  Company Name <span className="text-red-400">*</span>
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Client company name"
                  className="w-full bg-[#06080A] border border-[#1C212E] text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-red-500/50 placeholder-slate-600"
                />
              </div>

              {/* Logo URL */}
              <div>
                <label className="block text-slate-400 text-sm font-medium mb-1.5">
                  Logo URL
                </label>
                <input
                  name="logo"
                  value={form.logo}
                  onChange={handleChange}
                  placeholder="https://example.com/logo.png"
                  className="w-full bg-[#06080A] border border-[#1C212E] text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-red-500/50 placeholder-slate-600"
                />
              </div>

              {/* Website URL */}
              <div>
                <label className="block text-slate-400 text-sm font-medium mb-1.5">
                  Website URL
                </label>
                <input
                  name="website"
                  value={form.website}
                  onChange={handleChange}
                  placeholder="https://example.com"
                  className="w-full bg-[#06080A] border border-[#1C212E] text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-red-500/50 placeholder-slate-600"
                />
              </div>

              {/* Industry */}
              <div>
                <label className="block text-slate-400 text-sm font-medium mb-1.5">
                  Industry
                </label>
                <input
                  name="industry"
                  value={form.industry}
                  onChange={handleChange}
                  placeholder="e.g. Technology, Finance, Healthcare"
                  className="w-full bg-[#06080A] border border-[#1C212E] text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-red-500/50 placeholder-slate-600"
                />
              </div>

              {/* Order */}
              <div>
                <label className="block text-slate-400 text-sm font-medium mb-1.5">
                  Display Order
                </label>
                <input
                  name="order"
                  type="number"
                  value={form.order}
                  onChange={handleChange}
                  placeholder="0"
                  className="w-full bg-[#06080A] border border-[#1C212E] text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-red-500/50 placeholder-slate-600"
                />
              </div>

              {/* Featured toggle */}
              <div className="flex items-center gap-3">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={form.featured}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="w-10 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
                </label>
                <span className="text-slate-300 text-sm">
                  {form.featured ? 'Featured client' : 'Not featured'}
                </span>
              </div>
            </div>

            {/* Modal footer */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#1C212E]">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-slate-400 hover:text-slate-200 text-sm font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 px-5 py-2 bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white rounded-xl text-sm font-medium transition-all"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                {editingClient ? 'Save Changes' : 'Create Client'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminClients;
