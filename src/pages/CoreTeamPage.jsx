import React, { useState, useEffect } from 'react';

const BACKEND_URL = process.env.REACT_APP_API_URL || process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001';
const CACHE_KEY   = 'cs_team';
const CACHE_TTL   = 5 * 60 * 1000;

function readCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { data, ts } = JSON.parse(raw);
    if (Date.now() - ts > CACHE_TTL) { localStorage.removeItem(CACHE_KEY); return null; }
    return data;
  } catch { return null; }
}
function writeCache(data) {
  try { localStorage.setItem(CACHE_KEY, JSON.stringify({ data, ts: Date.now() })); } catch {}
}

function MemberCard({ member, onClick }) {
  return (
    <button
      onClick={onClick}
      className="glass-card p-0 overflow-hidden group text-left w-full tactical-glow transition-all duration-300 hover:ring-1 hover:ring-primary/40 hover:-translate-y-1"
    >
      <div className="aspect-square bg-surface-container-lowest overflow-hidden relative">
        <img
          alt={member.name}
          src={member.image}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface/80 via-transparent to-transparent" />
        <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="font-label text-[9px] uppercase tracking-widest text-primary border border-primary/40 bg-surface/80 px-2 py-1">
            View Profile ↗
          </span>
        </div>
      </div>
      <div className="p-6">
        <h4 className="font-headline text-lg font-bold text-white leading-tight mb-1">{member.name}</h4>
        <p className="font-label text-[10px] text-tertiary uppercase tracking-widest mb-3">{member.position}</p>
        <p className="text-on-surface-variant text-xs leading-relaxed line-clamp-2">{member.bio}</p>
      </div>
    </button>
  );
}

export default function CoreTeamPage() {
  const cached                  = readCache();
  const [members, setMembers]   = useState(cached || []);
  const [loading, setLoading]   = useState(!cached);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (cached) {
      // Background refresh
      fetch(`${BACKEND_URL}/api/about/team`)
        .then((r) => r.json())
        .then((data) => { if (Array.isArray(data)) { setMembers(data); writeCache(data); } })
        .catch(() => {});
    } else {
      setLoading(true);
      fetch(`${BACKEND_URL}/api/about/team`)
        .then((r) => r.json())
        .then((data) => {
          const list = Array.isArray(data) ? data : [];
          setMembers(list);
          writeCache(list);
        })
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="pt-32 pb-24 blueprint-grid min-h-screen">
      <div className="max-w-[1440px] mx-auto px-8 md:px-12">

        {/* ── Page header ── */}
        <header className="mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-container/10 border border-primary/20 mb-6">
            <span className="font-label text-[10px] uppercase tracking-[0.2em] text-primary">
              Personnel Directory // v2.04
            </span>
          </div>
          <h1 className="font-headline text-5xl md:text-7xl font-black tracking-tighter leading-none mb-6">
            The Sovereign <br />
            <span className="text-primary">Intelligence Team.</span>
          </h1>
          <p className="max-w-2xl text-on-surface-variant text-lg leading-relaxed">
            Architecting the digital vanguard. Our command structure comprises industry-leading
            threat researchers, strategic architects, and operational experts dedicated to absolute
            network sovereignty.
          </p>
        </header>

        {/* ── Loading skeleton ── */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="glass-card p-0 overflow-hidden">
                <div className="aspect-square bg-surface-container-high" />
                <div className="p-6 space-y-3">
                  <div className="h-5 bg-surface-container-high rounded w-3/4" />
                  <div className="h-3 bg-surface-container-high rounded w-1/2" />
                  <div className="h-3 bg-surface-container-high rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Empty state ── */}
        {!loading && members.length === 0 && (
          <div className="text-center py-24">
            <span className="material-symbols-outlined text-6xl text-on-surface-variant/30 mb-4 block">
              group
            </span>
            <p className="text-on-surface-variant text-lg">No team members found.</p>
          </div>
        )}

        {/* ── Team grid ── */}
        {members.length > 0 && (
          <>
            <div className="flex items-center gap-4 mb-12">
              <span className="h-[1px] w-12 bg-primary" />
              <h2 className="font-label text-sm uppercase tracking-[0.3em] text-primary">
                Departmental Operations
              </h2>
            </div>

            {/* First 2 founders — large 2-col row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              {members.slice(0, 2).map((member) => (
                <MemberCard key={member._id || member.teamid} member={member} onClick={() => setSelected(member)} />
              ))}
            </div>

            {/* Remaining members — up to 4 per row */}
            {members.length > 2 && (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {members.slice(2).map((member) => (
                  <MemberCard key={member._id || member.teamid} member={member} onClick={() => setSelected(member)} />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* ── Popup Modal ── */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative w-full max-w-xl bg-[#0d1526] border border-outline-variant/30 shadow-2xl founder-glow overflow-hidden"
            style={{ maxHeight: '90vh', overflowY: 'auto' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => setSelected(null)}
              className="absolute top-3 right-3 z-20 w-8 h-8 flex items-center justify-center bg-[#0d1526]/90 border border-outline-variant/40 text-on-surface-variant hover:text-white transition-all"
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>

            {/* Photo banner — full width, fixed height */}
            <div className="w-full h-64 bg-surface-container-lowest relative overflow-hidden flex-shrink-0">
              <img
                alt={selected.name}
                src={selected.image}
                className="w-full h-full object-cover object-top"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d1526] via-[#0d1526]/30 to-transparent" />
              {/* Name overlay on photo */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-primary-container/20 border border-primary/30 mb-2">
                  <span className="font-label text-[9px] uppercase tracking-[0.2em] text-primary">Team Profile</span>
                </div>
                <h3 className="font-headline text-2xl font-bold text-white leading-tight">{selected.name}</h3>
                <p className="font-label text-xs text-primary uppercase tracking-widest mt-1">{selected.position}</p>
              </div>
            </div>

            {/* Content below photo */}
            <div className="p-6 space-y-5">
              {/* Bio */}
              <p className="text-on-surface-variant text-sm leading-relaxed">{selected.bio}</p>

              {/* Education */}
              {selected.education && (
                <div>
                  <p className="font-label text-[9px] uppercase tracking-[0.2em] text-tertiary mb-1">Education</p>
                  <p className="text-on-surface-variant text-sm">{selected.education}</p>
                </div>
              )}

              {/* Expertise */}
              {selected.expertise && selected.expertise.length > 0 && (
                <div>
                  <p className="font-label text-[9px] uppercase tracking-[0.2em] text-tertiary mb-3">Expertise</p>
                  <div className="flex flex-wrap gap-2">
                    {selected.expertise.map((skill, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-primary-container/10 border border-primary/20 text-primary text-xs font-label tracking-wide"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
