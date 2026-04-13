import React, { useEffect, useState } from 'react';
import {
  Users, Plus, Pencil, Trash2, Loader2, X, Check, ChevronDown, Star,
} from 'lucide-react';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

const emptyForm = {
  name: '',
  role: '',
  company: '',
  content: '',
  rating: 5,
  avatar: '',
  featured: false,
};

const AdminTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    fetchTestimonials();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchTestimonials = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/testimonials`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setTestimonials(Array.isArray(data) ? data : []);
    } catch {
      // silently fail
    } finally {
      setIsLoading(false);
    }
  };

  const openCreate = () => {
    setEditingTestimonial(null);
    setForm(emptyForm);
    setError('');
    setShowModal(true);
  };

  const openEdit = (testimonial) => {
    setEditingTestimonial(testimonial);
    setForm({
      name: testimonial.name || '',
      role: testimonial.role || '',
      company: testimonial.company || '',
      content: testimonial.content || '',
      rating: testimonial.rating || 5,
      avatar: testimonial.avatar || '',
      featured: testimonial.featured ?? false,
    });
    setError('');
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : (name === 'rating' ? parseInt(value, 10) : value),
    }));
  };

  const handleSave = async () => {
    setError('');
    if (!form.name || !form.role || !form.company || !form.content) {
      setError('Please fill in all required fields.');
      return;
    }
    setSaving(true);
    try {
      let res;
      if (editingTestimonial) {
        res = await fetch(`${API_URL}/api/testimonials/${editingTestimonial.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        });
      } else {
        res = await fetch(`${API_URL}/api/testimonials`, {
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
      setSuccess(editingTestimonial ? 'Testimonial updated successfully!' : 'Testimonial created successfully!');
      setTimeout(() => setSuccess(''), 3000);
      fetchTestimonials();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (testimonial) => {
    if (!window.confirm(`Delete testimonial from "${testimonial.name}"? This cannot be undone.`)) return;
    setDeletingId(testimonial.id);
    try {
      const res = await fetch(`${API_URL}/api/testimonials/${testimonial.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to delete');
      setTestimonials((prev) => prev.filter((t) => t.id !== testimonial.id));
      setSuccess('Testimonial deleted.');
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
          <Users className="w-6 h-6 text-red-400" />
          <h1 className="text-2xl font-bold text-white">Testimonials</h1>
          <span className="bg-red-500/10 text-red-400 border border-red-500/20 text-xs px-2 py-0.5 rounded-full font-medium">
            {testimonials.length}
          </span>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm font-medium transition-all"
        >
          <Plus className="w-4 h-4" />
          New Testimonial
        </button>
      </div>

      {/* Success message */}
      {success && (
        <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-3 rounded-xl text-sm">
          <Check className="w-4 h-4" />
          {success}
        </div>
      )}

      {/* Testimonials list */}
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 text-red-500 animate-spin" />
        </div>
      ) : testimonials.length === 0 ? (
        <div className="bg-[#0B0F19] border border-[#1C212E] rounded-2xl p-12 text-center">
          <Users className="w-12 h-12 text-slate-600 mx-auto mb-4" />
          <p className="text-slate-400 text-lg font-medium">No testimonials yet</p>
          <p className="text-slate-600 text-sm mt-1">Create your first testimonial to get started.</p>
          <button
            onClick={openCreate}
            className="mt-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm font-medium transition-all"
          >
            Create Testimonial
          </button>
        </div>
      ) : (
        <div className="bg-[#0B0F19] border border-[#1C212E] rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#1C212E]">
                <th className="text-left px-6 py-4 text-slate-400 text-sm font-medium">Name</th>
                <th className="text-left px-6 py-4 text-slate-400 text-sm font-medium">Role</th>
                <th className="text-left px-6 py-4 text-slate-400 text-sm font-medium">Company</th>
                <th className="text-left px-6 py-4 text-slate-400 text-sm font-medium">Rating</th>
                <th className="text-left px-6 py-4 text-slate-400 text-sm font-medium">Featured</th>
                <th className="text-left px-6 py-4 text-slate-400 text-sm font-medium">Date</th>
                <th className="text-right px-6 py-4 text-slate-400 text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1C212E]">
              {testimonials.map((testimonial) => (
                <tr key={testimonial.id || testimonial._id} className="hover:bg-[#13192B] transition-colors group">
                  <td className="px-6 py-4">
                    <p className="text-white text-sm font-medium">{testimonial.name}</p>
                  </td>
                  <td className="px-6 py-4 text-slate-300 text-sm">{testimonial.role}</td>
                  <td className="px-6 py-4 text-slate-300 text-sm">{testimonial.company}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-0.5">
                      {[...Array(testimonial.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {testimonial.featured ? (
                      <span className="inline-flex items-center gap-1.5 bg-red-500/10 border border-red-500/20 text-red-400 text-xs px-2.5 py-1 rounded-lg font-medium">
                        <Star className="w-3 h-3 fill-current" />
                        Featured
                      </span>
                    ) : (
                      <span className="text-slate-500 text-xs">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-slate-400 text-xs">
                    {new Date(testimonial.created_at).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEdit(testimonial)}
                        className="p-2 text-slate-500 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all"
                        title="Edit"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(testimonial)}
                        disabled={deletingId === testimonial.id}
                        className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all disabled:opacity-50"
                        title="Delete"
                      >
                        {deletingId === testimonial.id ? (
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
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[#0B0F19] border border-[#1C212E] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Modal header */}
            <div className="flex items-center justify-between p-6 border-b border-[#1C212E]">
              <h2 className="text-white font-bold text-lg">
                {editingTestimonial ? 'Edit Testimonial' : 'Create Testimonial'}
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
                  Name <span className="text-red-400">*</span>
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Full name"
                  className="w-full bg-[#06080A] border border-[#1C212E] text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-red-500/50 placeholder-slate-600"
                />
              </div>

              {/* Role + Company */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 text-sm font-medium mb-1.5">
                    Role <span className="text-red-400">*</span>
                  </label>
                  <input
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    placeholder="Job title"
                    className="w-full bg-[#06080A] border border-[#1C212E] text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-red-500/50 placeholder-slate-600"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-sm font-medium mb-1.5">
                    Company <span className="text-red-400">*</span>
                  </label>
                  <input
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    placeholder="Company name"
                    className="w-full bg-[#06080A] border border-[#1C212E] text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-red-500/50 placeholder-slate-600"
                  />
                </div>
              </div>

              {/* Content */}
              <div>
                <label className="block text-slate-400 text-sm font-medium mb-1.5">
                  Testimonial <span className="text-red-400">*</span>
                </label>
                <textarea
                  name="content"
                  value={form.content}
                  onChange={handleChange}
                  placeholder="What did the customer say..."
                  rows={5}
                  className="w-full bg-[#06080A] border border-[#1C212E] text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-red-500/50 placeholder-slate-600 resize-y"
                />
              </div>

              {/* Rating + Featured */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 text-sm font-medium mb-1.5">
                    Rating
                  </label>
                  <div className="relative">
                    <select
                      name="rating"
                      value={form.rating}
                      onChange={handleChange}
                      className="w-full bg-[#06080A] border border-[#1C212E] text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-red-500/50 appearance-none"
                    >
                      <option value={1}>1 Star</option>
                      <option value={2}>2 Stars</option>
                      <option value={3}>3 Stars</option>
                      <option value={4}>4 Stars</option>
                      <option value={5}>5 Stars</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                  </div>
                </div>
                <div className="flex items-end">
                  <label className="relative inline-flex items-center cursor-pointer w-full">
                    <input
                      type="checkbox"
                      name="featured"
                      checked={form.featured}
                      onChange={handleChange}
                      className="sr-only peer"
                    />
                    <div className="w-10 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
                    <span className="text-slate-300 text-sm ml-3">Featured</span>
                  </label>
                </div>
              </div>

              {/* Avatar URL */}
              <div>
                <label className="block text-slate-400 text-sm font-medium mb-1.5">
                  Avatar URL
                </label>
                <input
                  name="avatar"
                  value={form.avatar}
                  onChange={handleChange}
                  placeholder="https://example.com/avatar.jpg"
                  className="w-full bg-[#06080A] border border-[#1C212E] text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-red-500/50 placeholder-slate-600"
                />
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
                {editingTestimonial ? 'Save Changes' : 'Create Testimonial'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTestimonials;
