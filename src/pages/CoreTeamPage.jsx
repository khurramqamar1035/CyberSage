import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../components/ui/dialog';
import { MagneticLink, Reveal } from '../components/site/motion';

const BACKEND_URL = process.env.REACT_APP_API_URL || process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001';
const CACHE_KEY   = 'cs_team';
const CACHE_TTL   = 5 * 60 * 1000;

const WRAP = 'max-w-[1400px] mx-auto px-6 md:px-10';
const Guides = ({ dark }) => <div className={`cs-guides ${dark ? 'on-dark' : ''}`} aria-hidden="true"><div /></div>;

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
    <button type="button" onClick={onClick} className="group w-full text-left bg-transparent p-0">
      <span className="block aspect-[4/5] overflow-hidden bg-[#E6E9ED]">
        <img
          alt={member.name}
          src={member.image}
          loading="lazy"
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-focus-visible:grayscale-0 transition-[filter] duration-300"
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
      </span>
      <span className="block mt-3 text-[16px] font-semibold text-[#07090D] group-hover:text-[#2563EB] transition-colors">{member.name}</span>
      <span className="block text-[14px] text-[#5B6575]">{member.position}</span>
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
    <main className="cs-sans text-[#07090D]">
      {/* ── Hero ── */}
      <section className="relative s-black tx-grain overflow-hidden text-[#ECEEF1]">
        <Guides dark />
        <div className={`${WRAP} relative pt-10 md:pt-14 pb-14 md:pb-20`}>
          <nav aria-label="Breadcrumb" className="cs-meta text-[#8B95A5] flex flex-wrap items-center gap-2.5">
            <Link to="/" className="hover:text-[#ECEEF1] transition-colors">CyberSage</Link><span aria-hidden="true">/</span>
            <Link to="/about" className="hover:text-[#ECEEF1] transition-colors">About</Link><span aria-hidden="true">/</span>
            <span aria-current="page" className="text-[#ECEEF1]">Core team</span>
          </nav>
          <div className="relative overflow-hidden -mx-6 md:-mx-10 px-6 md:px-10 mt-8" aria-hidden="true">
            <div className="t-expanded font-[200] leading-[0.8] tracking-[-0.03em] whitespace-nowrap text-[40px] sm:text-[64px] lg:text-[88px]">TEAM</div>
          </div>
          <div className="mt-10 md:mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-end">
            <h1 className="lg:col-span-7 m-0 t-wide font-[250] text-[34px] sm:text-[46px] lg:text-[56px] leading-[1.04] tracking-[-0.035em] max-w-[18ch]">The people behind CyberSage.</h1>
            <div className="lg:col-span-4 lg:col-start-9 flex flex-col gap-6">
              <p className="m-0 text-[16px] leading-relaxed text-[#A9B8D0]">The people who build CyberSage’s products and deliver its services. Select anyone to read more.</p>
              <div className="flex flex-wrap gap-3">
                <MagneticLink to="/contact" variant="on-dark">Contact the team</MagneticLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Team (live data) ── */}
      <section className="relative s-paper overflow-hidden">
        <Guides />
        <div className={`${WRAP} relative py-16 md:py-20`}>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-10 border-b border-[#07090D] pb-5">
            <h2 className="m-0 t-wide font-[250] text-[30px] md:text-[44px] leading-[1.04] tracking-[-0.03em]">Core team</h2>
            {!loading && members.length > 0 && (
              <span className="cs-meta text-[#5B6575]">{String(members.length).padStart(2, '0')} people</span>
            )}
          </div>

          {/* Loading skeleton */}
          {loading && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10" aria-busy="true" aria-label="Loading team">
              {[...Array(4)].map((_, i) => (
                <div key={i}>
                  <div className="aspect-[4/5] bg-[#E6E9ED]" />
                  <div className="mt-3 h-4 bg-[#E6E9ED] w-3/4" />
                  <div className="mt-2 h-3 bg-[#E6E9ED] w-1/2" />
                </div>
              ))}
            </div>
          )}

          {/* Empty state */}
          {!loading && members.length === 0 && (
            <p className="m-0 py-10 text-[16px] text-[#3E4555]">No team members found. <Link to="/contact" className="cs-link">Get in touch</Link> if you want to reach the team directly.</p>
          )}

          {/* Team grid */}
          {members.length > 0 && (
            <Reveal>
              <ul className="m-0 p-0 list-none grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-10">
                {members.map((member, i) => (
                  <li key={member._id || member.teamid || i}>
                    <MemberCard member={member} onClick={() => setSelected(member)} />
                  </li>
                ))}
              </ul>
            </Reveal>
          )}
        </div>
      </section>


      {/* ── CTA ── */}
      <section className="relative s-black tx-grain overflow-hidden text-[#ECEEF1]">
        <Guides dark />
        <div className={`${WRAP} relative py-20 md:py-28 grid grid-cols-1 md:grid-cols-12 gap-8 items-end`}>
          <h2 className="md:col-span-7 m-0 t-expanded font-[200] text-[44px] sm:text-[64px] lg:text-[88px] leading-[0.92] tracking-[-0.04em]">Work with us.</h2>
          <div className="md:col-span-4 md:col-start-9 flex flex-col gap-5">
            <p className="m-0 text-[16px] leading-relaxed text-[#A9B8D0]">Ask about an engagement, or apply for the next internship cohort.</p>
            <div className="flex flex-wrap gap-3">
              <Link to="/contact" className="cs-btn cs-btn-on-dark">Contact us</Link>
              <Link to="/training/internship" className="cs-btn cs-btn-ghost-dark">Internships</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Profile dialog ── */}
      <Dialog open={!!selected} onOpenChange={(open) => { if (!open) setSelected(null); }}>
        {selected && (
          <DialogContent className="cs-sans bg-white border-[rgba(7,9,13,0.14)] text-[#07090D] w-[95%] sm:max-w-2xl max-h-[90vh] overflow-y-auto rounded-[1px] p-0 gap-0">
            <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
              <div className="aspect-[4/5] sm:aspect-auto sm:min-h-full bg-[#E6E9ED] overflow-hidden">
                <img
                  alt={selected.name}
                  src={selected.image}
                  className="w-full h-full object-cover object-top"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              </div>
              <div className="p-6 sm:p-8">
                <DialogHeader className="text-left space-y-1">
                  <DialogTitle className="t-wide font-[300] text-[26px] leading-tight tracking-[-0.02em]">{selected.name}</DialogTitle>
                  <DialogDescription className="text-[15px] text-[#5B6575]">{selected.position}</DialogDescription>
                </DialogHeader>
                {selected.bio && <p className="mt-5 mb-0 text-[15px] leading-relaxed text-[#3E4555]">{selected.bio}</p>}
                {(selected.education || (selected.expertise && selected.expertise.length > 0)) && (
                  <dl className="m-0 mt-6 border-t border-[#07090D] text-[15px]">
                    {selected.education && (
                      <div className="py-4 border-b border-[rgba(7,9,13,0.14)]">
                        <dt className="cs-meta text-[#5B6575]">Education</dt>
                        <dd className="m-0 mt-1.5 text-[#3E4555]">{selected.education}</dd>
                      </div>
                    )}
                    {selected.expertise && selected.expertise.length > 0 && (
                      <div className="py-4 border-b border-[rgba(7,9,13,0.14)]">
                        <dt className="cs-meta text-[#5B6575]">Expertise</dt>
                        <dd className="m-0 mt-1.5 text-[#3E4555]">{selected.expertise.join(', ')}</dd>
                      </div>
                    )}
                  </dl>
                )}
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </main>
  );
}
