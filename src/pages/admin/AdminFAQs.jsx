import React, { useEffect, useState } from 'react';
import {
  HelpCircle, Plus, Pencil, Trash2, Loader2, X, Check, ChevronDown,
} from 'lucide-react';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

const FAQ_CATEGORIES = ['General', 'Security', 'Development', 'Training', 'Billing', 'Technical'];

const emptyForm = {
  question: '',
  answer: '',
  category: '',
  order: 0,
};

const AdminFAQs = () => {
  const [faqs, setFaqs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingFAQ, setEditingFAQ] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/faq`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setFaqs(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('[ADMIN FAQs] Error:', err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const openCreate = () => {
    setEditingFAQ(null);
    setForm({ ...emptyForm, order: faqs.length });
    setError('');
    setShowModal(true);
  };

  const openEdit = (faq) => {
    setEditingFAQ(faq);
    setForm({
      question: faq.question || '',
      answer: faq.answer || '',
      category: faq.category || '',
      order: faq.order ?? 0,
    });
    setError('');
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'order' ? parseInt(value, 10) || 0 : value,
    }));
  };

  const handleSave = async () => {
    setError('');
    if (!form.question || !form.answer || !form.category) {
      setError('Please fill in all required fields.');
      return;
    }
    setSaving(true);
    try {
      let res;
      if (editingFAQ) {
        res = await fetch(`${API_URL}/api/faq/${editingFAQ.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        });
      } else {
        res = await fetch(`${API_URL}/api/faq`, {
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
      setSuccess(editingFAQ ? 'FAQ updated successfully!' : 'FAQ created successfully!');
      setTimeout(() => setSuccess(''), 3000);
      fetchFAQs();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (faq) => {
    if (!window.confirm(`Delete this FAQ? This cannot be undone.`)) return;
    setDeletingId(faq.id);
    try {
      const res = await fetch(`${API_URL}/api/faq/${faq.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to delete');
      setFaqs((prev) => prev.filter((f) => f.id !== faq.id));
      setSuccess('FAQ deleted.');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      alert(err.message);
    } finally {
      setDeletingId(null);
    }
  };

  const categories = ['all', ...FAQ_CATEGORIES.filter((c) =>
    faqs.some((f) => f.category === c)
  )];

  const filtered = filterCategory === 'all'
    ? faqs
    : faqs.filter((f) => f.category === filterCategory);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <HelpCircle className="w-6 h-6 text-red-400" />
          <h1 className="text-2xl font-bold text-white">FAQs</h1>
          <span className="bg-red-500/10 text-red-400 border border-red-500/20 text-xs px-2 py-0.5 rounded-full font-medium">
            {faqs.length}
          </span>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm font-medium transition-all"
        >
          <Plus className="w-4 h-4" />
          New FAQ
        </button>
      </div>

      {/* Success message */}
      {success && (
        <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-3 rounded-xl text-sm">
          <Check className="w-4 h-4" />
          {success}
        </div>
      )}

      {/* Category filter */}
      {faqs.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize ${
                filterCategory === cat
                  ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                  : 'bg-[#0B0F19] text-slate-400 border border-[#1C212E] hover:text-slate-200'
              }`}
            >
              {cat === 'all' ? 'All' : cat}
            </button>
          ))}
        </div>
      )}

      {/* FAQ list */}
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 text-red-500 animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-[#0B0F19] border border-[#1C212E] rounded-2xl p-12 text-center">
          <HelpCircle className="w-12 h-12 text-slate-600 mx-auto mb-4" />
          <p className="text-slate-400 text-lg font-medium">
            {faqs.length === 0 ? 'No FAQs yet' : 'No FAQs in this category'}
          </p>
          <p className="text-slate-600 text-sm mt-1">
            {faqs.length === 0 ? 'Create your first FAQ to get started.' : 'Try a different category filter.'}
          </p>
          {faqs.length === 0 && (
            <button
              onClick={openCreate}
              className="mt-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm font-medium transition-all"
            >
              Create FAQ
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((faq) => (
            <div
              key={faq.id || faq._id}
              className="bg-[#0B0F19] border border-[#1C212E] rounded-2xl p-5 hover:border-slate-700 transition-colors group"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-slate-800 text-slate-300 text-xs px-2 py-0.5 rounded-lg">
                      {faq.category}
                    </span>
                    <span className="text-slate-600 text-xs">Order: {faq.order}</span>
                  </div>
                  <p className="text-white text-sm font-semibold leading-snug">{faq.question}</p>
                  <p className="text-slate-400 text-sm mt-2 line-clamp-2 leading-relaxed">{faq.answer}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => openEdit(faq)}
                    className="p-2 text-slate-500 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all"
                    title="Edit"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(faq)}
                    disabled={deletingId === faq.id}
                    className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all disabled:opacity-50"
                    title="Delete"
                  >
                    {deletingId === faq.id ? (
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
          <div className="bg-[#0B0F19] border border-[#1C212E] rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Modal header */}
            <div className="flex items-center justify-between p-6 border-b border-[#1C212E]">
              <h2 className="text-white font-bold text-lg">
                {editingFAQ ? 'Edit FAQ' : 'Create FAQ'}
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

              {/* Question */}
              <div>
                <label className="block text-slate-400 text-sm font-medium mb-1.5">
                  Question <span className="text-red-400">*</span>
                </label>
                <input
                  name="question"
                  value={form.question}
                  onChange={handleChange}
                  placeholder="What is...?"
                  className="w-full bg-[#06080A] border border-[#1C212E] text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-red-500/50 placeholder-slate-600"
                />
              </div>

              {/* Answer */}
              <div>
                <label className="block text-slate-400 text-sm font-medium mb-1.5">
                  Answer <span className="text-red-400">*</span>
                </label>
                <textarea
                  name="answer"
                  value={form.answer}
                  onChange={handleChange}
                  placeholder="Detailed answer..."
                  rows={5}
                  className="w-full bg-[#06080A] border border-[#1C212E] text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-red-500/50 placeholder-slate-600 resize-y"
                />
              </div>

              {/* Category + Order */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 text-sm font-medium mb-1.5">
                    Category <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <select
                      name="category"
                      value={form.category}
                      onChange={handleChange}
                      className="w-full bg-[#06080A] border border-[#1C212E] text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-red-500/50 appearance-none"
                    >
                      <option value="" disabled>Select category</option>
                      {FAQ_CATEGORIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-slate-400 text-sm font-medium mb-1.5">
                    Display Order
                  </label>
                  <input
                    name="order"
                    type="number"
                    min="0"
                    value={form.order}
                    onChange={handleChange}
                    className="w-full bg-[#06080A] border border-[#1C212E] text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-red-500/50"
                  />
                </div>
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
                {editingFAQ ? 'Save Changes' : 'Create FAQ'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminFAQs;
