import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { PRODUCTS } from '../data/ecosystem';
import Reveal from '../components/site/Reveal';

const BACKEND_URL = process.env.REACT_APP_API_URL || process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001';

const Arrow = ({ size = 16 }) => (
  <svg className="cs-arrow" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);

const AboutPage = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [offices, setOffices] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const [teamRes, officeRes] = await Promise.all([
          axios.get(`${BACKEND_URL}/api/about/team`),
          axios.get(`${BACKEND_URL}/api/about/offices`),
        ]);
        setTeamMembers(Array.isArray(teamRes.data) ? teamRes.data : []);
        setOffices(Array.isArray(officeRes.data) ? officeRes.data : []);
      } catch {
        // silently fail — sections below hide when empty
      } finally {
        setLoading(false);
      }
    };
    fetchAboutData();
  }, []);

  return (
    <main className="relative overflow-x-hidden">
      {/* ── Story ── */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 pt-16 lg:pt-24 flex flex-col lg:flex-row gap-10 lg:gap-20 lg:items-end">
        <h1 className="cs-rise cs-d1 cs-display lg:w-[760px] text-[48px] sm:text-[64px] lg:text-[76px] leading-[0.98] font-semibold tracking-[-0.04em]">Born from passion, driven by innovation.</h1>
        <div className="cs-rise cs-d3 flex-1 flex flex-col gap-5">
          <p className="text-[18px] leading-relaxed text-on-surface-variant">CyberSage is led by certified investigators and security consultants. We have worked real incidents, trained real analysts and seen how disconnected tools slow both down. So we built one connected ecosystem instead.</p>
          <div className="flex flex-wrap gap-2">
            {['CEH', 'CHFI', 'MSc Cyber Security', 'Digital Forensics'].map((c) => (
              <span key={c} className="cs-mono px-2.5 py-1.5 rounded bg-surface-container border border-surface-container-highest text-[12px]">{c}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── What we build ── */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 pt-20">
        <div className="border-t border-outline-variant grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
          {PRODUCTS.map((p, i) => (
            <Link key={p.slug} to={`/products/${p.slug}`} className={`cs-hover-arrow flex flex-col gap-2 py-6 border-b lg:border-b-0 border-surface-container-high ${i < 4 ? 'lg:border-r lg:pr-6' : ''} ${i > 0 ? 'lg:pl-6' : ''}`}>
              <span className="flex justify-between items-center"><span className="cs-mono text-[12px] text-outline">{p.num} {p.layer}</span><span className="text-primary"><Arrow size={14} /></span></span>
              <span className="cs-display text-[21px] font-semibold">{p.name}</span>
              <span className="text-[14px] leading-snug text-on-surface-variant">{p.line}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Leadership (live data) ── */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 pt-24 lg:pt-32">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <h2 className="cs-display text-[36px] lg:text-[44px] leading-[1.05] font-semibold tracking-[-0.03em]">Leadership team</h2>
          <Link to="/core-team" className="cs-hover-arrow inline-flex items-center gap-2 min-h-[44px] font-medium text-tertiary">Meet the full core team <Arrow size={14} /></Link>
        </div>
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5" aria-busy="true">
            {[0, 1, 2, 3].map((i) => <div key={i} className="aspect-[4/5] rounded-lg bg-surface-container-low animate-pulse" />)}
          </div>
        ) : teamMembers.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {teamMembers.map((m, i) => (
              <Reveal key={m._id || i} delay={(i % 4) * 60}>
                <button type="button" onClick={() => setSelectedMember(m)} className="cs-press group w-full text-left flex flex-col gap-3">
                  <span className="block aspect-[4/5] rounded-lg overflow-hidden bg-surface-container-low border border-surface-container-high">
                    <img src={m.image} alt={m.name} loading="lazy" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-[filter] duration-500" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                  </span>
                  <span className="flex flex-col gap-0.5"><span className="cs-display text-[18px] font-semibold">{m.name}</span><span className="text-[14px] text-outline">{m.position}</span></span>
                </button>
              </Reveal>
            ))}
          </div>
        ) : (
          <p className="text-on-surface-variant">Team profiles are on the <Link to="/core-team" className="text-tertiary underline">core team page</Link>.</p>
        )}
      </section>

      {/* ── Offices (live data) ── */}
      {offices.length > 0 && (
        <section className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 pt-24 lg:pt-32">
          <h2 className="cs-display text-[36px] lg:text-[44px] leading-[1.05] font-semibold tracking-[-0.03em] mb-10">Our offices</h2>
          <div className="border-t border-outline-variant">
            {offices.map((o, i) => (
              <Reveal key={o._id || i} className="grid grid-cols-1 md:grid-cols-[160px_1fr_1fr] gap-2 md:gap-8 py-6 border-b border-surface-container-high">
                <span className="cs-mono text-[12px] text-secondary self-center">{o.type}</span>
                <span className="cs-display text-[24px] font-semibold">{o.city}<span className="text-outline font-normal">, {o.country}</span></span>
                <span className="text-[15px] text-on-surface-variant self-center">{o.address}</span>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 pt-24 lg:pt-32 pb-24">
        <Reveal className="rounded-lg bg-surface-container-low border border-surface-container-high px-6 py-9 sm:px-12 sm:py-11 flex flex-col md:flex-row gap-6 md:items-center justify-between">
          <div className="flex flex-col gap-2"><h2 className="cs-display text-[30px] lg:text-[36px] font-semibold tracking-[-0.03em]">Work with us.</h2><p className="text-[16px] text-on-surface-variant">Book a demo, ask about services, or join an internship cohort.</p></div>
          <div className="flex flex-wrap gap-3">
            <Link to="/contact" className="cs-press cs-btn-blue inline-flex items-center min-h-[52px] px-6 rounded-md bg-primary-container text-white font-semibold">Contact us</Link>
            <Link to="/training/internship" className="cs-press cs-btn-line inline-flex items-center min-h-[52px] px-5 rounded-md border border-outline-variant font-medium">Internships</Link>
          </div>
        </Reveal>
      </section>

      {/* ── Member dialog ── */}
      <Dialog open={!!selectedMember} onOpenChange={() => setSelectedMember(null)}>
        {selectedMember && (
          <DialogContent className="bg-surface-container-low border-surface-container-highest w-[95%] sm:max-w-2xl max-h-[90vh] overflow-y-auto text-on-surface">
            <DialogHeader>
              <DialogTitle className="cs-display text-2xl">{selectedMember.name}</DialogTitle>
              <p className="text-tertiary">{selectedMember.position}</p>
            </DialogHeader>
            {selectedMember.bio && <p className="text-on-surface-variant mt-4 leading-relaxed">{selectedMember.bio}</p>}
            {selectedMember.expertise?.length > 0 && (
              <div className="mt-6">
                <h4 className="font-semibold mb-2">Expertise</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedMember.expertise.map((skill, i) => (
                    <span key={i} className="cs-mono text-[12px] px-2.5 py-1 rounded bg-surface-container-high">{skill}</span>
                  ))}
                </div>
              </div>
            )}
            {selectedMember.education && <p className="text-outline mt-4">{selectedMember.education}</p>}
          </DialogContent>
        )}
      </Dialog>
    </main>
  );
};

export default AboutPage;
