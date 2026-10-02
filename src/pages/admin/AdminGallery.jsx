import React, { useEffect, useRef, useState } from 'react';
import { Image as ImageIcon, Upload, Trash2, Loader2, Check, Eye, EyeOff } from 'lucide-react';
import ContentKeyGate from './ContentKeyGate';
import { contentApi, SAVED_NOTE } from './contentApi';

// Gallery photos are uploaded from this computer, resized in the browser, and
// committed into the repo (public/content/gallery) through the /api/content Vercel function.

const MAX_SIDE = 2000;

function resizeToWebp(file) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, MAX_SIDE / Math.max(img.width, img.height));
      const w = Math.round(img.width * scale); const h = Math.round(img.height * scale);
      const canvas = document.createElement('canvas');
      canvas.width = w; canvas.height = h;
      canvas.getContext('2d').drawImage(img, 0, 0, w, h);
      const dataUrl = canvas.toDataURL('image/webp', 0.82);
      URL.revokeObjectURL(img.src);
      if (!dataUrl.startsWith('data:image/webp')) {
        const jpg = canvas.toDataURL('image/jpeg', 0.85);
        resolve({ mime: 'image/jpeg', image: jpg.split(',')[1], width: w, height: h });
      } else resolve({ mime: 'image/webp', image: dataUrl.split(',')[1], width: w, height: h });
    };
    img.onerror = () => reject(new Error(`Could not read ${file.name}`));
    img.src = URL.createObjectURL(file);
  });
}

function Editor({ resetKey }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const fileRef = useRef(null);

  const run = async (fn) => {
    setError('');
    try { await fn(); } catch (err) { if (err.needsKey) resetKey(); else setError(err.message); }
  };
  const flash = (m) => { setSuccess(m); setTimeout(() => setSuccess(''), 6000); };

  useEffect(() => {
    run(async () => { setItems(await contentApi('gallery', 'list')); }).finally(() => setLoading(false));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const upload = (files) => run(async () => {
    const list = Array.from(files || []).filter((f) => f.type.startsWith('image/'));
    for (let i = 0; i < list.length; i += 1) {
      setBusy(`Uploading ${i + 1} of ${list.length}…`);
      const payload = await resizeToWebp(list[i]);
      const data = await contentApi('gallery', 'create', { ...payload, order: items.length + i });
      setItems(data.items || []);
    }
    flash(SAVED_NOTE);
  }).finally(() => { setBusy(''); if (fileRef.current) fileRef.current.value = ''; });

  const update = (it, patch) => run(async () => {
    setBusy('Saving…');
    const data = await contentApi('gallery', 'update', { id: it.id, order: it.order, published: it.published !== false, ...patch });
    setItems(data.items || []);
    flash(SAVED_NOTE);
  }).finally(() => setBusy(''));

  const remove = (it) => {
    if (!window.confirm('Delete this photo from the website?')) return;
    run(async () => {
      setBusy('Deleting…');
      const data = await contentApi('gallery', 'delete', { id: it.id });
      setItems(data.items || []);
      flash(SAVED_NOTE);
    }).finally(() => setBusy(''));
  };

  const sorted = [...items].sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <ImageIcon className="w-6 h-6 text-red-400" />
          <h1 className="text-2xl font-bold text-white">Gallery</h1>
          <span className="bg-red-500/10 text-red-400 border border-red-500/20 text-xs px-2 py-0.5 rounded-full font-medium">{items.length}</span>
        </div>
        <label className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white cursor-pointer ${busy ? 'bg-red-500/50 pointer-events-none' : 'bg-red-500 hover:bg-red-600'}`}>
          {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
          {busy || 'Upload photos'}
          <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" multiple className="hidden" onChange={(e) => upload(e.target.files)} disabled={!!busy} />
        </label>
      </div>
      <p className="text-slate-400 text-sm max-w-3xl">Photos shown on cybersage.uk/gallery, images only. Large photos are resized to 2000px before upload. Changes go live in about 1–2 minutes.</p>
      {success && <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-3 rounded-xl text-sm"><Check className="w-4 h-4" />{success}</div>}
      {error && <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-sm">{error}</div>}

      {loading ? (
        <div className="flex items-center justify-center h-64"><Loader2 className="w-8 h-8 text-red-500 animate-spin" /></div>
      ) : sorted.length === 0 ? (
        <div className="bg-base border border-edge rounded-2xl p-12 text-center text-slate-400">No photos yet. Use “Upload photos” to add some.</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {sorted.map((it) => (
            <div key={it.id} className={`bg-base border border-edge rounded-2xl p-3 ${it.published === false ? 'opacity-60' : ''}`}>
              <div className="aspect-[4/3] rounded-lg overflow-hidden bg-black/40 mb-3">
                <img src={it.src} alt="" className="w-full h-full object-cover" loading="lazy" onError={(e) => { e.currentTarget.style.opacity = 0.15; }} />
              </div>
              <div className="flex items-center justify-between gap-2">
                <label className="flex items-center gap-2 text-xs text-slate-400">Order
                  <input type="number" defaultValue={it.order || 0} onBlur={(e) => { const v = Number(e.target.value) || 0; if (v !== (it.order || 0)) update(it, { order: v }); }}
                    className="w-16 bg-void border border-edge text-white text-xs rounded-lg px-2 py-1.5" />
                </label>
                <div className="flex items-center gap-1">
                  <button onClick={() => update(it, { published: it.published === false })} className="p-2 text-slate-500 hover:text-slate-200 rounded-lg" title={it.published === false ? 'Show on site' : 'Hide from site'}>
                    {it.published === false ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  <button onClick={() => remove(it)} className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg" title="Delete"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <p className="text-slate-600 text-xs">Newly uploaded photos may show as blank here until the site has redeployed.</p>
    </div>
  );
}

export default function AdminGallery() {
  return <ContentKeyGate>{({ resetKey }) => <Editor resetKey={resetKey} />}</ContentKeyGate>;
}
