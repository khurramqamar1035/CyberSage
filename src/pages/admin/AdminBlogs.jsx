import React, { useEffect, useState } from 'react';
import {
  FileText, Plus, Pencil, Trash2, Loader2, X, Check, ChevronDown, Eye, EyeOff,
} from 'lucide-react';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

const CATEGORIES = ['Security', 'Development', 'Training', 'News', 'General'];

const emptyForm = {
  title: '',
  slug: '',
  content: '',
  excerpt: '',
  author: '',
  category: '',
  tags: '',
  published: true,
};

const slugify = (str) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    fetchBlogs();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchBlogs = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/blogs`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setBlogs(Array.isArray(data) ? data : []);
    } catch {
      // silently fail
    } finally {
      setIsLoading(false);
    }
  };

  const openCreate = () => {
    setEditingBlog(null);
    setForm(emptyForm);
    setError('');
    setShowModal(true);
  };

  const openEdit = (blog) => {
    setEditingBlog(blog);
    setForm({
      title: blog.title || '',
      slug: blog.slug || '',
      content: blog.content || '',
      excerpt: blog.excerpt || '',
      author: blog.author || '',
      category: blog.category || '',
      tags: Array.isArray(blog.tags) ? blog.tags.join(', ') : '',
      published: blog.published ?? true,
    });
    setError('');
    setShowModal(true);
  };

  const handleTitleChange = (e) => {
    const title = e.target.value;
    setForm((prev) => ({
      ...prev,
      title,
      slug: editingBlog ? prev.slug : slugify(title),
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSave = async () => {
    setError('');
    if (!form.title || !form.slug || !form.content || !form.excerpt || !form.author || !form.category) {
      setError('Please fill in all required fields.');
      return;
    }
    setSaving(true);
    try {
      const payload = {
        ...form,
        tags: form.tags ? form.tags.split(',').map((t) => t.trim()).filter(Boolean) : [],
      };

      let res;
      if (editingBlog) {
        res = await fetch(`${API_URL}/api/blogs/${editingBlog.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch(`${API_URL}/api/blogs`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });
      }

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save');

      setShowModal(false);
      setSuccess(editingBlog ? 'Blog updated successfully!' : 'Blog created successfully!');
      setTimeout(() => setSuccess(''), 3000);
      fetchBlogs();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (blog) => {
    if (!window.confirm(`Delete "${blog.title}"? This cannot be undone.`)) return;
    setDeletingId(blog.id);
    try {
      const res = await fetch(`${API_URL}/api/blogs/${blog.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to delete');
      setBlogs((prev) => prev.filter((b) => b.id !== blog.id));
      setSuccess('Blog deleted.');
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
          <FileText className="w-6 h-6 text-red-400" />
          <h1 className="text-2xl font-bold text-white">Blog Posts</h1>
          <span className="bg-red-500/10 text-red-400 border border-red-500/20 text-xs px-2 py-0.5 rounded-full font-medium">
            {blogs.length}
          </span>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm font-medium transition-all"
        >
          <Plus className="w-4 h-4" />
          New Post
        </button>
      </div>

      {/* Success message */}
      {success && (
        <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-3 rounded-xl text-sm">
          <Check className="w-4 h-4" />
          {success}
        </div>
      )}

      {/* Blog list */}
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 text-red-500 animate-spin" />
        </div>
      ) : blogs.length === 0 ? (
        <div className="bg-[#0B0F19] border border-[#1C212E] rounded-2xl p-12 text-center">
          <FileText className="w-12 h-12 text-slate-600 mx-auto mb-4" />
          <p className="text-slate-400 text-lg font-medium">No blog posts yet</p>
          <p className="text-slate-600 text-sm mt-1">Create your first post to get started.</p>
          <button
            onClick={openCreate}
            className="mt-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm font-medium transition-all"
          >
            Create Post
          </button>
        </div>
      ) : (
        <div className="bg-[#0B0F19] border border-[#1C212E] rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#1C212E]">
                <th className="text-left px-6 py-4 text-slate-400 text-sm font-medium">Title</th>
                <th className="text-left px-6 py-4 text-slate-400 text-sm font-medium">Author</th>
                <th className="text-left px-6 py-4 text-slate-400 text-sm font-medium">Category</th>
                <th className="text-left px-6 py-4 text-slate-400 text-sm font-medium">Status</th>
                <th className="text-left px-6 py-4 text-slate-400 text-sm font-medium">Date</th>
                <th className="text-right px-6 py-4 text-slate-400 text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1C212E]">
              {blogs.map((blog) => (
                <tr key={blog.id || blog._id} className="hover:bg-[#13192B] transition-colors group">
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-white text-sm font-medium line-clamp-1">{blog.title}</p>
                      <p className="text-slate-500 text-xs mt-0.5">/{blog.slug}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-300 text-sm">{blog.author}</td>
                  <td className="px-6 py-4">
                    <span className="bg-slate-800 text-slate-300 text-xs px-2 py-1 rounded-lg">{blog.category}</span>
                  </td>
                  <td className="px-6 py-4">
                    {blog.published ? (
                      <span className="flex items-center gap-1.5 text-green-400 text-xs font-medium">
                        <Eye className="w-3.5 h-3.5" /> Published
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-slate-500 text-xs font-medium">
                        <EyeOff className="w-3.5 h-3.5" /> Draft
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-slate-400 text-xs">
                    {new Date(blog.created_at).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEdit(blog)}
                        className="p-2 text-slate-500 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all"
                        title="Edit"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(blog)}
                        disabled={deletingId === blog.id}
                        className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all disabled:opacity-50"
                        title="Delete"
                      >
                        {deletingId === blog.id ? (
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
                {editingBlog ? 'Edit Blog Post' : 'Create Blog Post'}
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

              {/* Title */}
              <div>
                <label className="block text-slate-400 text-sm font-medium mb-1.5">
                  Title <span className="text-red-400">*</span>
                </label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleTitleChange}
                  placeholder="Blog post title"
                  className="w-full bg-[#06080A] border border-[#1C212E] text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-red-500/50 placeholder-slate-600"
                />
              </div>

              {/* Slug */}
              <div>
                <label className="block text-slate-400 text-sm font-medium mb-1.5">
                  Slug <span className="text-red-400">*</span>
                </label>
                <input
                  name="slug"
                  value={form.slug}
                  onChange={handleChange}
                  placeholder="url-friendly-slug"
                  className="w-full bg-[#06080A] border border-[#1C212E] text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-red-500/50 placeholder-slate-600 font-mono"
                />
              </div>

              {/* Author + Category */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 text-sm font-medium mb-1.5">
                    Author <span className="text-red-400">*</span>
                  </label>
                  <input
                    name="author"
                    value={form.author}
                    onChange={handleChange}
                    placeholder="Author name"
                    className="w-full bg-[#06080A] border border-[#1C212E] text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-red-500/50 placeholder-slate-600"
                  />
                </div>
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
                      {CATEGORIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-slate-400 text-sm font-medium mb-1.5">
                  Excerpt <span className="text-red-400">*</span>
                </label>
                <textarea
                  name="excerpt"
                  value={form.excerpt}
                  onChange={handleChange}
                  placeholder="Short summary of the post..."
                  rows={2}
                  className="w-full bg-[#06080A] border border-[#1C212E] text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-red-500/50 placeholder-slate-600 resize-none"
                />
              </div>

              {/* Content */}
              <div>
                <label className="block text-slate-400 text-sm font-medium mb-1.5">
                  Content <span className="text-red-400">*</span>
                </label>
                <textarea
                  name="content"
                  value={form.content}
                  onChange={handleChange}
                  placeholder="Full blog post content..."
                  rows={8}
                  className="w-full bg-[#06080A] border border-[#1C212E] text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-red-500/50 placeholder-slate-600 resize-y"
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block text-slate-400 text-sm font-medium mb-1.5">
                  Tags <span className="text-slate-600 font-normal">(comma-separated)</span>
                </label>
                <input
                  name="tags"
                  value={form.tags}
                  onChange={handleChange}
                  placeholder="cybersecurity, AI, training"
                  className="w-full bg-[#06080A] border border-[#1C212E] text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-red-500/50 placeholder-slate-600"
                />
              </div>

              {/* Published toggle */}
              <div className="flex items-center gap-3">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="published"
                    checked={form.published}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="w-10 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
                </label>
                <span className="text-slate-300 text-sm">
                  {form.published ? 'Published' : 'Draft (hidden from website)'}
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
                {editingBlog ? 'Save Changes' : 'Create Post'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBlogs;
