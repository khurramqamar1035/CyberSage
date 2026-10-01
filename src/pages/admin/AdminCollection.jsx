import React, { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Loader2, X, Check } from 'lucide-react';

import ContentKeyGate from './ContentKeyGate';
import { contentApi, SAVED_NOTE } from './contentApi';

// Generic admin list + create/edit/delete screen for repo-stored content
// (public/content/<collection>.json), saved through the /api/content Vercel function.
const input = 'w-full bg-[#06080A] border border-[#1C212E] text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-red-500/50 placeholder-slate-600';
const idOf = (x) => x.id;

function Field({ f, value, onChange }) {
  const set = (v) => onChange(f.name, v);
  if (f.type === 'textarea') return <textarea value={value} onChange={(e) => set(e.target.value)} rows={f.rows || 5} placeholder={f.placeholder} className={`${input} resize-y`} />;
  if (f.type === 'checkbox') {
    return (
      <label className="flex items-center gap-3 text-sm text-slate-300 cursor-pointer select-none">
        <input type="checkbox" checked={!!value} onChange={(e) => set(e.target.checked)} className="w-4 h-4 accent-red-500" />
        {f.checkboxLabel}
      </label>
    );
  }
  if (f.type === 'image') {
    return (
      <div className="space-y-2">
        <input value={value} onChange={(e) => set(e.target.value)} placeholder={f.placeholder || 'https://…'} className={input} />
        {value && <img src={value} alt="" className="max-h-48 rounded-lg border border-[#1C212E] object-contain bg-black/30" onError={(e) => { e.currentTarget.style.opacity = 0.2; }} />}
      </div>
    );
  }
  return <input type={f.type || 'text'} value={value} onChange={(e) => set(f.type === 'number' ? Number(e.target.value) : e.target.value)} placeholder={f.placeholder} list={f.suggestions ? `${f.name}-list` : undefined} className={input} />;
}

export default function AdminCollection(props) {
  return <ContentKeyGate>{({ resetKey }) => <Editor {...props} resetKey={resetKey} />}</ContentKeyGate>;
}

function Editor({ title, icon: Icon, collection, fields, empty, renderItem, grid = false, help, resetKey }) {
  const blank = () => Object.fromEntries(fields.map((f) => [f.name, f.default !== undefined ? f.default : (f.type === 'checkbox' ? false : '')]));
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(blank);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchItems = async () => {
    setIsLoading(true);
    setLoadError('');
    try {
      const data = await contentApi(collection, 'list');
      setItems(Array.isArray(data) ? data : []);
    } catch (err) {
      if (err.needsKey) { resetKey(); return; }
      setLoadError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchItems(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const flash = (m) => { setSuccess(m); setTimeout(() => setSuccess(''), 6000); };

  const openCreate = () => { setEditing(null); setForm(blank()); setError(''); setShowModal(true); };
  const openEdit = (it) => {
    setEditing(it);
    setForm(Object.fromEntries(fields.map((f) => {
      let v = it[f.name];
      if (f.type === 'date' && v) v = String(v).slice(0, 10);
      return [f.name, v === undefined || v === null ? blank()[f.name] : v];
    })));
    setError('');
    setShowModal(true);
  };
  const onChange = (name, v) => setForm((p) => ({ ...p, [name]: v }));

  const save = async () => {
    setError('');
    const missing = fields.filter((f) => f.required && !String(form[f.name] ?? '').trim()).map((f) => f.label);
    if (missing.length) { setError(`Please fill in: ${missing.join(', ')}.`); return; }
    setSaving(true);
    try {
      const data = await contentApi(collection, editing ? 'update' : 'create', editing ? { ...form, id: idOf(editing) } : form);
      setItems(data.items || []);
      setShowModal(false);
      flash(SAVED_NOTE);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const remove = async (it) => {
    if (!window.confirm('Delete this item? This cannot be undone.')) return;
    setDeletingId(idOf(it));
    try {
      const data = await contentApi(collection, 'delete', { id: idOf(it) });
      setItems(data.items || []);
      flash(SAVED_NOTE);
    } catch (err) {
      alert(err.message);
    } finally {
      setDeletingId(null);
    }
  };

  const Actions = ({ it }) => (
    <div className="flex items-center gap-1 shrink-0">
      <button onClick={() => openEdit(it)} className="p-2 text-slate-500 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg" title="Edit"><Pencil className="w-4 h-4" /></button>
      <button onClick={() => remove(it)} disabled={deletingId === idOf(it)} className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg disabled:opacity-50" title="Delete">
        {deletingId === idOf(it) ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
      </button>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Icon className="w-6 h-6 text-red-400" />
          <h1 className="text-2xl font-bold text-white">{title}</h1>
          <span className="bg-red-500/10 text-red-400 border border-red-500/20 text-xs px-2 py-0.5 rounded-full font-medium">{items.length}</span>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm font-medium"><Plus className="w-4 h-4" /> Add</button>
      </div>
      {help && <p className="text-slate-400 text-sm max-w-3xl">{help}</p>}
      {success && <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-3 rounded-xl text-sm"><Check className="w-4 h-4" />{success}</div>}

      {isLoading ? (
        <div className="flex items-center justify-center h-64"><Loader2 className="w-8 h-8 text-red-500 animate-spin" /></div>
      ) : loadError ? (
        <div className="bg-[#0B0F19] border border-amber-500/30 rounded-2xl p-8 text-amber-300 text-sm">{loadError}</div>
      ) : items.length === 0 ? (
        <div className="bg-[#0B0F19] border border-[#1C212E] rounded-2xl p-12 text-center">
          <Icon className="w-12 h-12 text-slate-600 mx-auto mb-4" />
          <p className="text-slate-400 text-lg font-medium">{empty}</p>
          <button onClick={openCreate} className="mt-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm font-medium">Add the first one</button>
        </div>
      ) : (
        <div className={grid ? 'grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4' : 'space-y-3'}>
          {items.map((it) => (
            <div key={idOf(it)} className="bg-[#0B0F19] border border-[#1C212E] rounded-2xl p-4 hover:border-slate-700 transition-colors">
              {renderItem(it, <Actions it={it} />)}
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-black/70 overflow-y-auto">
          <div className="bg-[#0B0F19] border border-[#1C212E] rounded-2xl w-full max-w-xl my-6 shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-[#1C212E]">
              <h2 className="text-white font-bold text-lg">{editing ? 'Edit' : 'Add'}</h2>
              <button onClick={() => setShowModal(false)} className="p-2 text-slate-500 hover:text-slate-200"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-5">
              {error && <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-sm">{error}</div>}
              {fields.map((f) => (
                <div key={f.name}>
                  {f.type !== 'checkbox' && <label className="block text-slate-400 text-sm font-medium mb-1.5">{f.label}{f.required && <span className="text-red-400"> *</span>}</label>}
                  <Field f={f} value={form[f.name]} onChange={onChange} />
                  {f.suggestions && <datalist id={`${f.name}-list`}>{Array.from(new Set([...f.suggestions, ...items.map((i) => i[f.name]).filter(Boolean)])).map((s) => <option key={s} value={s} />)}</datalist>}
                  {f.hint && <p className="text-slate-600 text-xs mt-1.5">{f.hint}</p>}
                </div>
              ))}
            </div>
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#1C212E]">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 text-slate-400 hover:text-slate-200 text-sm font-medium">Cancel</button>
              <button onClick={save} disabled={saving} className="flex items-center gap-2 px-5 py-2 bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white rounded-xl text-sm font-medium">
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}{editing ? 'Save changes' : 'Add'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
