// Vercel serverless function: admin edits to the site's content files.
// Content lives in the repo (public/content/*.json, public/content/gallery/*). Each change is
// committed to GitHub in one commit; Vercel then redeploys the site (about 1-2 minutes).
//
// Environment variables (Vercel > Project > Settings > Environment Variables):
//   ADMIN_CONTENT_KEY  a long random password the admin panel sends with each change
//   GITHUB_TOKEN       fine-grained token with "Contents: Read and write" on this repository
//   GITHUB_REPO        optional, default "khurramqamar1035/CyberSage"
//   GITHUB_BRANCH      optional, default "main"

const crypto = require('crypto');

const REPO = process.env.GITHUB_REPO || 'khurramqamar1035/CyberSage';
const BRANCH = process.env.GITHUB_BRANCH || 'main';
const GH = `https://api.github.com/repos/${REPO}`;
const FILES = {
  certificates: 'public/content/certificates.json',
  testimonials: 'public/content/testimonials.json',
  gallery: 'public/content/gallery.json',
};
const IMAGE_TYPES = { 'image/webp': 'webp', 'image/jpeg': 'jpg', 'image/png': 'png' };

const sha256 = (s) => crypto.createHash('sha256').update(s).digest('hex');
const cleanCode = (c) => String(c || '').trim().toUpperCase().replace(/\s+/g, '');
const hintOf = (code) => {
  const i = code.lastIndexOf('-');
  const head = i > 0 ? code.slice(0, i + 1) : '';
  const tail = i > 0 ? code.slice(i + 1) : code;
  return `${head}${'•'.repeat(Math.max(0, tail.length - 2))}${tail.slice(-2)}`;
};
const str = (v, max = 4000) => (v === undefined || v === null ? '' : String(v).slice(0, max).trim());
const newId = () => crypto.randomBytes(6).toString('hex');

function authorised(req) {
  const expected = process.env.ADMIN_CONTENT_KEY || '';
  const given = String(req.headers['x-admin-key'] || '');
  if (!expected || given.length !== expected.length) return false;
  return crypto.timingSafeEqual(Buffer.from(given), Buffer.from(expected));
}

async function gh(path, opts = {}) {
  const res = await fetch(`${GH}${path}`, {
    ...opts,
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'Content-Type': 'application/json',
      ...(opts.headers || {}),
    },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GitHub ${res.status}: ${text.slice(0, 200)}`);
  }
  return res.status === 204 ? null : res.json();
}

async function readJson(path) {
  const f = await gh(`/contents/${path}?ref=${BRANCH}`);
  return JSON.parse(Buffer.from(f.content, 'base64').toString('utf8'));
}

// One commit containing every change. changes: [{ path, text } | { path, base64 } | { path, remove: true }]
async function commit(changes, message) {
  const ref = await gh(`/git/ref/heads/${BRANCH}`);
  const head = await gh(`/git/commits/${ref.object.sha}`);
  const tree = [];
  for (const c of changes) {
    if (c.remove) { tree.push({ path: c.path, mode: '100644', type: 'blob', sha: null }); continue; }
    const blob = await gh('/git/blobs', {
      method: 'POST',
      body: JSON.stringify(c.base64 ? { content: c.base64, encoding: 'base64' } : { content: c.text, encoding: 'utf-8' }),
    });
    tree.push({ path: c.path, mode: '100644', type: 'blob', sha: blob.sha });
  }
  const newTree = await gh('/git/trees', { method: 'POST', body: JSON.stringify({ base_tree: head.tree.sha, tree }) });
  const newCommit = await gh('/git/commits', { method: 'POST', body: JSON.stringify({ message, tree: newTree.sha, parents: [head.sha] }) });
  await gh(`/git/refs/heads/${BRANCH}`, { method: 'PATCH', body: JSON.stringify({ sha: newCommit.sha }) });
}

const json = (list) => `${JSON.stringify(list, null, 2)}\n`;

// ── handlers per collection ────────────────────────────────────────────────
async function certificates(action, body, list) {
  if (action === 'create' || action === 'update') {
    const name = str(body.name, 120);
    if (!name) throw Object.assign(new Error('Name is required.'), { status: 400 });
    const fields = {
      name,
      type: ['completion', 'best'].includes(body.type) ? body.type : 'completion',
      from: str(body.from, 10), to: str(body.to, 10),
      title: str(body.title, 80), leadIn: str(body.leadIn, 80), body: str(body.body, 1200), durationLabel: str(body.durationLabel, 60),
    };
    Object.keys(fields).forEach((k) => { if (!fields[k]) delete fields[k]; });
    if (action === 'create') {
      const code = cleanCode(body.code);
      if (!/^[A-Z0-9-]{6,40}$/.test(code)) throw Object.assign(new Error('Enter a valid certificate ID.'), { status: 400 });
      const hash = sha256(code);
      if (list.some((c) => c.hash === hash)) throw Object.assign(new Error('A certificate with this ID already exists.'), { status: 409 });
      list.unshift({ hash, hint: hintOf(code), ...fields });
      return { list, message: `Issue certificate ${hintOf(code)} to ${name}` };
    }
    const i = list.findIndex((c) => c.hash === body.hash);
    if (i < 0) throw Object.assign(new Error('Certificate not found.'), { status: 404 });
    list[i] = { hash: list[i].hash, hint: list[i].hint, ...fields };
    return { list, message: `Update certificate ${list[i].hint}` };
  }
  if (action === 'delete') {
    const item = list.find((c) => c.hash === body.hash);
    if (!item) throw Object.assign(new Error('Certificate not found.'), { status: 404 });
    return { list: list.filter((c) => c.hash !== body.hash), message: `Revoke certificate ${item.hint}` };
  }
  throw Object.assign(new Error('Unknown action.'), { status: 400 });
}

async function testimonials(action, body, list) {
  const fields = () => {
    const f = {
      name: str(body.name, 120), message: str(body.message, 4000), role: str(body.role, 120), cohort: str(body.cohort, 120),
      photo: str(body.photo, 500), linkedin: str(body.linkedin, 300), order: Number(body.order) || 0, published: body.published !== false,
    };
    if (!f.name || !f.message) throw Object.assign(new Error('Name and testimonial are required.'), { status: 400 });
    ['role', 'cohort', 'photo', 'linkedin'].forEach((k) => { if (!f[k]) delete f[k]; });
    return f;
  };
  if (action === 'create') { list.push({ id: newId(), ...fields() }); return { list, message: `Add testimonial from ${body.name}` }; }
  if (action === 'update') {
    const i = list.findIndex((t) => t.id === body.id);
    if (i < 0) throw Object.assign(new Error('Testimonial not found.'), { status: 404 });
    list[i] = { id: list[i].id, ...fields() };
    return { list, message: `Update testimonial from ${list[i].name}` };
  }
  if (action === 'delete') return { list: list.filter((t) => t.id !== body.id), message: 'Remove a testimonial' };
  throw Object.assign(new Error('Unknown action.'), { status: 400 });
}

async function gallery(action, body, list) {
  const extra = [];
  if (action === 'create') {
    const ext = IMAGE_TYPES[body.mime];
    const data = String(body.image || '');
    if (!ext || !data) throw Object.assign(new Error('Choose a JPG, PNG or WebP image.'), { status: 400 });
    if (data.length > 4_000_000) throw Object.assign(new Error('Image is too large (max about 3 MB after resizing).'), { status: 413 });
    const id = newId();
    const file = `content/gallery/${id}.${ext}`;
    extra.push({ path: `public/${file}`, base64: data });
    list.push({ id, src: `/${file}`, width: Number(body.width) || undefined, height: Number(body.height) || undefined, order: Number(body.order) || 0, published: true });
    return { list, extra, message: 'Add a gallery photo' };
  }
  if (action === 'update') {
    const i = list.findIndex((g) => g.id === body.id);
    if (i < 0) throw Object.assign(new Error('Photo not found.'), { status: 404 });
    list[i] = { ...list[i], order: Number(body.order) || 0, published: body.published !== false };
    return { list, extra, message: 'Update a gallery photo' };
  }
  if (action === 'delete') {
    const item = list.find((g) => g.id === body.id);
    if (!item) throw Object.assign(new Error('Photo not found.'), { status: 404 });
    if (item.src && item.src.startsWith('/content/gallery/')) extra.push({ path: `public${item.src}`, remove: true });
    return { list: list.filter((g) => g.id !== body.id), extra, message: 'Remove a gallery photo' };
  }
  throw Object.assign(new Error('Unknown action.'), { status: 400 });
}

const HANDLERS = { certificates, testimonials, gallery };

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (!process.env.ADMIN_CONTENT_KEY || !process.env.GITHUB_TOKEN) {
    return res.status(503).json({ error: 'Content editing is not set up yet: add ADMIN_CONTENT_KEY and GITHUB_TOKEN in Vercel.' });
  }
  if (!authorised(req)) return res.status(401).json({ error: 'Wrong admin content key.' });
  if (req.method !== 'POST') return res.status(405).json({ error: 'Use POST.' });

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const { collection, action } = body;
    const handle = HANDLERS[collection];
    if (!handle) return res.status(400).json({ error: 'Unknown collection.' });

    if (action === 'list') return res.json(await readJson(FILES[collection]));

    const current = await readJson(FILES[collection]);
    const { list, extra = [], message } = await handle(action, body, current);
    await commit([{ path: FILES[collection], text: json(list) }, ...extra], `Admin: ${message}`);
    return res.json({ ok: true, items: list });
  } catch (err) {
    return res.status(err.status || 500).json({ error: err.status ? err.message : `Could not save: ${err.message}` });
  }
};

