import React, { useState, useEffect } from 'react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001';

export default function CoreTeamPage() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/about/team`)
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : [];
        setMembers(list);
        if (list.length > 0) setSelected(list[0]);
      })
      .catch(() => setMembers([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      {/* ── Page header ── */}
      <header className="mb-24 text-center md:text-left">
        <div className="inline-block px-3 py-1 bg-primary-container/20 border border-primary/30 mb-6">
          <span className="font-label text-[10px] uppercase tracking-[0.2em] text-primary">
            Personnel Directory // v2.04
          </span>
        </div>
        <h1 className="font-headline text-5xl md:text-7xl font-extrabold tracking-tighter text-on-surface mb-4">
          The Sovereign <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-fixed-dim to-tertiary">
            Intelligence Team
          </span>
        </h1>
        <p className="max-w-2xl text-on-surface-variant text-lg leading-relaxed font-light">
          Architecting the digital vanguard. Our command structure comprises industry-leading threat
          researchers, strategic architects, and operational experts dedicated to absolute network sovereignty.
        </p>
      </header>

      {loading ? (
        /* ── Loading state ── */
        <div className="space-y-12 animate-pulse">
          {/* detail panel skeleton */}
          <div className="bg-surface-container-lowest/50 border border-outline-variant/20 rounded-sm p-8 flex gap-8">
            <div className="w-52 h-52 bg-surface-container flex-shrink-0" />
            <div className="flex-1 space-y-4">
              <div className="h-8 bg-surface-container rounded w-1/2" />
              <div className="h-4 bg-surface-container rounded w-1/4" />
              <div className="h-4 bg-surface-container rounded w-full" />
              <div className="h-4 bg-surface-container rounded w-5/6" />
            </div>
          </div>
          {/* grid skeleton */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-surface-container-lowest/50 p-6">
                <div className="aspect-square bg-surface-container mb-4" />
                <div className="h-5 bg-surface-container rounded w-3/4 mb-2" />
                <div className="h-3 bg-surface-container rounded w-1/2" />
              </div>
            ))}
          </div>
        </div>
      ) : members.length === 0 ? (
        /* ── Empty state ── */
        <div className="text-center py-24">
          <p className="text-on-surface-variant text-lg">No team members found.</p>
        </div>
      ) : (
        <>
          {/* ── Selected member detail panel ── */}
          {selected && (
            <section className="mb-20">
              <div className="flex items-center gap-4 mb-10">
                <span className="h-[1px] w-12 bg-secondary" />
                <h2 className="font-label text-sm uppercase tracking-[0.3em] text-secondary">
                  Command Architecture
                </h2>
              </div>

              <div className="glass-card founder-glow p-8 group transition-all duration-500 hover:bg-surface-container-high relative overflow-hidden">
                {/* Background icon */}
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
                  <span
                    className="material-symbols-outlined text-[120px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    shield_person
                  </span>
                </div>

                <div className="flex flex-col md:flex-row gap-10 items-center md:items-start relative z-10">
                  {/* Photo */}
                  <div className="w-52 h-52 flex-shrink-0 bg-surface-container-lowest overflow-hidden border border-outline-variant/30">
                    <img
                      key={selected._id}
                      alt={selected.name}
                      src={selected.image}
                      className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="font-headline text-4xl font-bold text-white mb-1">
                      {selected.name}
                    </h3>
                    <p className="font-label text-primary uppercase tracking-widest text-sm mb-6">
                      {selected.position}
                    </p>
                    <p className="text-on-surface-variant text-sm mb-6 leading-relaxed max-w-xl">
                      {selected.bio}
                    </p>

                    {/* Expertise tags */}
                    {selected.expertise && selected.expertise.length > 0 && (
                      <div className="mb-6">
                        <p className="font-label text-[10px] uppercase tracking-[0.2em] text-tertiary mb-3">
                          Expertise
                        </p>
                        <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                          {selected.expertise.map((skill, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 bg-primary-container/20 border border-primary/20 text-primary text-xs font-label tracking-wide"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Education */}
                    {selected.education && (
                      <div>
                        <p className="font-label text-[10px] uppercase tracking-[0.2em] text-tertiary mb-1">
                          Education
                        </p>
                        <p className="text-on-surface-variant text-sm">{selected.education}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ── Team grid ── */}
          <section>
            <div className="flex items-center gap-4 mb-12">
              <span className="h-[1px] w-12 bg-primary" />
              <h2 className="font-label text-sm uppercase tracking-[0.3em] text-primary">
                Departmental Operations
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {members.map((member) => {
                const isActive = selected?._id === member._id;
                return (
                  <button
                    key={member._id || member.teamid}
                    onClick={() => setSelected(member)}
                    className={`glass-card glow-hover p-6 group transition-all duration-300 text-left w-full ${
                      isActive
                        ? 'ring-2 ring-primary/60 bg-surface-container-high'
                        : 'hover:bg-surface-container-high'
                    }`}
                  >
                    {/* Photo */}
                    <div className="aspect-square bg-surface-container-lowest mb-6 overflow-hidden">
                      <img
                        alt={member.name}
                        src={member.image}
                        className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
                          isActive ? 'grayscale-0' : 'grayscale group-hover:grayscale-0'
                        }`}
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                    </div>

                    <h4 className="font-headline text-xl font-bold text-white mb-1 leading-tight">
                      {member.name}
                    </h4>
                    <p className="font-label text-[10px] text-tertiary uppercase tracking-widest mb-3">
                      {member.position}
                    </p>
                    <p
                      className={`text-[10px] font-label uppercase tracking-widest transition-colors ${
                        isActive
                          ? 'text-primary'
                          : 'text-on-surface-variant/50 group-hover:text-primary/70'
                      }`}
                    >
                      {isActive ? '▲ Viewing Details' : '▼ View Details'}
                    </p>
                  </button>
                );
              })}
            </div>
          </section>
        </>
      )}
    </main>
  );
}
