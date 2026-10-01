// Site content stored in the repo (public/content/*.json), served by Vercel with the site.
export async function loadContent(name) {
  const res = await fetch(`/content/${name}.json`, { cache: 'no-cache' });
  if (!res.ok) throw new Error(`Could not load ${name}`);
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

export const published = (list) => list
  .filter((x) => x.published !== false)
  .sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0));

export async function sha256Hex(text) {
  const buf = await window.crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, '0')).join('');
}
