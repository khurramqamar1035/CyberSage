import React, { useEffect, useMemo, useState } from 'react';
import { Award, Plus, Pencil, Trash2, Loader2, X, Check, RefreshCw, Search } from 'lucide-react';
import ContentKeyGate from './ContentKeyGate';
import { contentApi, SAVED_NOTE } from './contentApi';
import Certificate, { CERT_TEMPLATES, certDate } from '../../components/certificate/Certificate';

const PREFIX = { completion: 'CS-INT', best: 'CS-BP', custom: 'CS-CERT' };
const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

const randomCode = (type, year) => {
  const bytes = new Uint32Array(6);
  window.crypto.getRandomValues(bytes);
  const tail = Array.from(bytes, (b) => ALPHABET[b % ALPHABET.length]).join('');
  return `${PREFIX[type] || 'CS-CERT'}-${year || new Date().getFullYear()}-${tail}`;
};

const templateFields = (type) => {
  const t = CERT_TEMPLATES[type] || CERT_TEMPLATES.completion;
  return { title: t.title, leadIn: t.leadIn, body: t.body, durationLabel: t.durationLabel };
};

const emptyForm = () => ({ code: '', name: '', type: 'completion', ...templateFields('completion'), from: '', to: '' });
const idOf = (c) => c.hash;
const input = 'w-full bg-void border border-edge text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500/60 placeholder-slate-600';
const label = 'block text-slate-400 text-sm font-medium mb-1.5';

export default function AdminCertificates() {
  return <ContentKeyGate>{({ resetKey }) => <Editor resetKey={resetKey} />}</ContentKeyGate>;
}

// Certificates live in public/content/certificates.json. IDs are stored only as a SHA-256
// fingerprint, so this list shows a masked ID; copy the full ID when you issue a certificate.
function Editor({ resetKey }) {
  const [certs, setCerts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetchCerts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchCerts = async () => {
    setIsLoading(true);
    setLoadError('');
    try {
      const data = await contentApi('certificates', 'list');
      setCerts(Array.isArray(data) ? data : []);
    } catch (err) {
      if (err.needsKey) { resetKey(); return; }
      setLoadError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const flash = (msg) => { setSuccess(msg); setTimeout(() => setSuccess(''), 8000); };

  const openCreate = () => {
    setEditing(null);
    const f = emptyForm();
    setForm({ ...f, code: randomCode(f.type) });
    setError('');
    setShowModal(true);
  };

  const openEdit = (c) => {
    setEditing(c);
    setForm({
      code: c.hint || '', name: c.name || '', type: c.type || 'completion',
      ...templateFields(c.type || 'completion'),
      ...Object.fromEntries(['title', 'leadIn', 'body', 'durationLabel'].filter((k) => c[k]).map((k) => [k, c[k]])),
      from: (c.from || '').slice(0, 10), to: (c.to || '').slice(0, 10),
    });
    setError('');
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      if (name === 'type') {
        // switching type resets the wording to that type's template and the code prefix
        const next = { ...prev, type: value, ...templateFields(value) };
        if (!editing) next.code = randomCode(value);
        return next;
      }
      return { ...prev, [name]: name === 'code' ? value.toUpperCase().replace(/\s+/g, '') : value };
    });
  };

  const handleSave = async () => {
    setError('');
    if (!form.code || !form.name || !form.body) {
      setError('Certificate ID, name and the reason it was awarded are required.');
      return;
    }
    if (form.from && form.to && form.from > form.to) {
      setError('The start date must be before the end date.');
      return;
    }
    setSaving(true);
    try {
      // keep the stored record lean: wording equal to the template default is not saved
      const t = templateFields(form.type);
      const payload = { ...form };
      ['title', 'leadIn', 'body', 'durationLabel'].forEach((k) => { if (payload[k] === t[k]) delete payload[k]; });
      const data = await contentApi('certificates', editing ? 'update' : 'create', editing ? { ...payload, hash: editing.hash } : payload);
      setCerts(data.items || []);
      setShowModal(false);
      flash(editing ? `Certificate updated. ${SAVED_NOTE}` : `Certificate ${form.code} issued. ${SAVED_NOTE} Verify link: cybersage.uk/verify?code=${form.code}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (c) => {
    if (!window.confirm(`Revoke certificate ${c.hint} (${c.name})? It will no longer verify.`)) return;
    setDeletingId(idOf(c));
    try {
      const data = await contentApi('certificates', 'delete', { hash: c.hash });
      setCerts(data.items || []);
      flash(`Certificate revoked. ${SAVED_NOTE}`);
    } catch (err) {
      alert(err.message);
    } finally {
      setDeletingId(null);
    }
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return certs;
    return certs.filter((c) => `${c.hint} ${c.name}`.toLowerCase().includes(q));
  }, [certs, query]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Award className="w-6 h-6 text-red-400" />
          <h1 className="text-2xl font-bold text-white">Certificates</h1>
          <span className="bg-red-500/10 text-red-400 border border-red-500/20 text-xs px-2 py-0.5 rounded-full font-medium">{certs.length}</span>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm font-medium transition-all">
          <Plus className="w-4 h-4" /> Issue certificate
        </button>
      </div>

      <p className="text-slate-400 text-sm max-w-3xl">
        Only certificates listed here verify at <span className="text-slate-200">cybersage.uk/verify</span>. Enter the ID exactly as printed on the certificate (the QR code links to the same ID). Deleting a certificate revokes it. For privacy, IDs are stored as a fingerprint, so this list only shows the end of each ID: copy the full ID when you issue one. Changes go live in about 1–2 minutes.
      </p>

      {success && (
        <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-3 rounded-xl text-sm"><Check className="w-4 h-4" />{success}</div>
      )}

      {certs.length > 0 && (
        <div className="relative max-w-sm">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by name or ID" className={`${input} pl-9`} />
        </div>
      )}

      {isLoading ? (
        <div className="flex items-center justify-center h-64"><Loader2 className="w-8 h-8 text-red-500 animate-spin" /></div>
      ) : loadError ? (
        <div className="bg-base border border-amber-500/30 rounded-2xl p-8 text-amber-300 text-sm">{loadError}</div>
      ) : filtered.length === 0 ? (
        <div className="bg-base border border-edge rounded-2xl p-12 text-center">
          <Award className="w-12 h-12 text-slate-600 mx-auto mb-4" />
          <p className="text-slate-400 text-lg font-medium">{certs.length === 0 ? 'No certificates issued yet' : 'No matches'}</p>
          {certs.length === 0 && <button onClick={openCreate} className="mt-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm font-medium">Issue the first certificate</button>}
        </div>
      ) : (
        <div className="bg-base border border-edge rounded-2xl overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-500 border-b border-edge">
                <th className="px-5 py-3 font-medium">Certificate ID</th>
                <th className="px-5 py-3 font-medium">Name</th>
                <th className="px-5 py-3 font-medium">Type</th>
                <th className="px-5 py-3 font-medium">Duration</th>
                <th className="px-5 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={idOf(c)} className="border-b border-edge last:border-0 hover:bg-white/[0.02]">
                  <td className="px-5 py-3 font-mono text-slate-200 whitespace-nowrap">{c.hint}</td>
                  <td className="px-5 py-3 text-white">{c.name}</td>
                  <td className="px-5 py-3 text-slate-400">{(CERT_TEMPLATES[c.type] || {}).label || c.type}</td>
                  <td className="px-5 py-3 text-slate-400 whitespace-nowrap">{c.from && c.to ? `${certDate(c.from)} – ${certDate(c.to)}` : '—'}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => openEdit(c)} className="p-2 text-slate-500 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg" title="Edit"><Pencil className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(c)} disabled={deletingId === idOf(c)} className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg disabled:opacity-50" title="Revoke">
                        {deletingId === idOf(c) ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-black/70 overflow-y-auto">
          <div className="bg-base border border-edge rounded-2xl w-full max-w-6xl my-6 shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-edge">
              <h2 className="text-white font-bold text-lg">{editing ? 'Edit certificate' : 'Issue certificate'}</h2>
              <button onClick={() => setShowModal(false)} className="p-2 text-slate-500 hover:text-slate-200"><X className="w-5 h-5" /></button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-6 p-6">
              <div className="space-y-4">
                {error && <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-sm">{error}</div>}

                <div>
                  <label className={label}>Certificate type</label>
                  <select name="type" value={form.type} onChange={handleChange} className={input}>
                    {Object.entries(CERT_TEMPLATES).map(([k, t]) => <option key={k} value={k}>{t.label}</option>)}
                  </select>
                </div>

                <div>
                  <label className={label}>Certificate ID <span className="text-red-400">*</span></label>
                  <div className="flex gap-2">
                    <input name="code" value={form.code} onChange={handleChange} disabled={!!editing} placeholder="CS-INT-2026-XXXXXX" className={`${input} font-mono disabled:opacity-60`} />
                    {!editing && (
                      <button type="button" onClick={() => setForm((p) => ({ ...p, code: randomCode(p.type) }))} title="Generate a new ID" className="px-3 rounded-xl border border-edge text-slate-400 hover:text-white">
                        <RefreshCw className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <p className="text-slate-600 text-xs mt-1.5">For certificates already printed, type the ID exactly as it appears next to the QR code.</p>
                </div>

                <div>
                  <label className={label}>Full name <span className="text-red-400">*</span></label>
                  <input name="name" value={form.name} onChange={handleChange} placeholder="Name as printed" className={input} />
                </div>

                <div>
                  <label className={label}>Why it was awarded <span className="text-red-400">*</span></label>
                  <textarea name="body" value={form.body} onChange={handleChange} rows={5} className={`${input} resize-y`} />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={label}>From</label>
                    <input type="date" name="from" value={form.from} onChange={handleChange} className={input} />
                  </div>
                  <div>
                    <label className={label}>To</label>
                    <input type="date" name="to" value={form.to} onChange={handleChange} className={input} />
                  </div>
                </div>

                <details className="text-sm">
                  <summary className="text-slate-400 cursor-pointer select-none">Certificate wording</summary>
                  <div className="mt-3 space-y-3">
                    <div><label className={label}>Title</label><input name="title" value={form.title} onChange={handleChange} className={input} /></div>
                    <div><label className={label}>Line above the name</label><input name="leadIn" value={form.leadIn} onChange={handleChange} className={input} /></div>
                    <div><label className={label}>Duration label</label><input name="durationLabel" value={form.durationLabel} onChange={handleChange} className={input} /></div>
                  </div>
                </details>
              </div>

              <div>
                <div className="text-slate-500 text-xs font-medium mb-2">Preview (as shown on cybersage.uk/verify)</div>
                <div className="rounded-lg overflow-hidden border border-edge bg-white">
                  <Certificate cert={form} />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-edge">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 text-slate-400 hover:text-slate-200 text-sm font-medium">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-5 py-2 bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white rounded-xl text-sm font-medium">
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                {editing ? 'Save changes' : 'Issue certificate'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
