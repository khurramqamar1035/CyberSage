// Admin edits to repo-stored content go through the Vercel function at /api/content.
// The content key is asked for once per browser session.
const KEY = 'cs_admin_content_key';

export const getContentKey = () => { try { return sessionStorage.getItem(KEY) || ''; } catch { return ''; } };
export const setContentKey = (k) => { try { sessionStorage.setItem(KEY, k); } catch {} };
export const clearContentKey = () => { try { sessionStorage.removeItem(KEY); } catch {} };

export async function contentApi(collection, action, payload = {}) {
  const res = await fetch('/api/content', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-admin-key': getContentKey() },
    body: JSON.stringify({ collection, action, ...payload }),
  });
  const data = await res.json().catch(() => ({}));
  if (res.status === 401) { clearContentKey(); throw Object.assign(new Error(data.error || 'Wrong admin content key.'), { needsKey: true }); }
  if (res.status === 404) throw new Error('The content service is only available on the live site (it runs on Vercel).');
  if (!res.ok) throw new Error(data.error || 'Request failed.');
  return data;
}

export const SAVED_NOTE = 'Saved. The live site updates in about 1–2 minutes.';
