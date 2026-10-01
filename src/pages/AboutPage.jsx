import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { PRODUCTS } from '../data/ecosystem';

const BACKEND_URL = process.env.REACT_APP_API_URL || process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001';
const WRAP = 'max-w-[1320px] mx-auto px-5 md:px-8';

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
        // sections below hide when empty
      } finally {
        setLoading(false);
      }
    };
    fetchAboutData();
  }, []);

  return (
    <main className="cs-sans text-[#0C1324]">
      {/* ── Who we are ── */}
      <section className="cs-paper"><div className={`${WRAP} pt-14 md:pt-20 pb-16 md:pb-24 grid grid-cols-1 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] gap-10 lg:gap-20`}>
        <div>
          <div className="cs-meta text-[#5F6676] flex items-center gap-3 mb-6"><span className="w-1.5 h-1.5 bg-[#2563EB]" aria-hidden="true" />Company / About</div>
          <h1 className="cs-enter m-0 text-[34px] sm:text-[42px] lg:text-[48px] leading-[1.06] font-medium tracking-[-0.032em] max-w-[20ch]">We are security practitioners who got tired of tools that don&rsquo;t talk to each other.</h1>
          <p className="cs-enter cs-enter-2 mt-6 mb-0 text-[17px] leading-relaxed text-[#3E4555] max-w-[60ch]">CyberSage is led by certified investigators and consultants who have worked real incidents and trained real analysts. We build five products that share one platform, and we still run hands-on security, development and training engagements for clients.</p>
        </div>
        <aside className="lg:pt-3">
          <dl className="m-0 border-t border-[#0C1324] text-[14px]">
            <div className="py-3 border-b border-[#DCE0E7] grid grid-cols-[130px_minmax(0,1fr)] gap-4"><dt className="cs-meta text-[#5F6676] pt-0.5">Products</dt><dd className="m-0">{PRODUCTS.map((p) => p.name).join(', ')}</dd></div>
            <div className="py-3 border-b border-[#DCE0E7] grid grid-cols-[130px_minmax(0,1fr)] gap-4"><dt className="cs-meta text-[#5F6676] pt-0.5">Services</dt><dd className="m-0">Security assessments and testing, secure development, training and internships</dd></div>
            <div className="py-3 border-b border-[#DCE0E7] grid grid-cols-[130px_minmax(0,1fr)] gap-4"><dt className="cs-meta text-[#5F6676] pt-0.5">Team credentials</dt><dd className="m-0">CEH, CHFI, Digital Forensics, MSc Cyber Security</dd></div>
          </dl>
        </aside>
      </div></section>

      {/* ── Leadership (live data) ── */}
      <section className="bg-white border-y border-[#E6E9EF]">
        <div className={`${WRAP} py-16 md:py-24`}>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-10">
            <h2 className="m-0 text-[28px] md:text-[34px] leading-tight font-medium tracking-[-0.018em]">Leadership</h2>
            <Link to="/core-team" className="cs-link text-[15px] font-medium">See the full core team</Link>
          </div>
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6" aria-busy="true" aria-label="Loading team">
              {[0, 1, 2, 3].map((i) => <div key={i} className="aspect-[4/5] bg-[#F1F3F6]" />)}
            </div>
          ) : teamMembers.length > 0 ? (
            <ul className="m-0 p-0 list-none grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
              {teamMembers.map((m, i) => (
                <li key={m._id || i}>
                  <button type="button" onClick={() => setSelectedMember(m)} className="group w-full text-left bg-transparent">
                    <span className="block aspect-[4/5] overflow-hidden bg-[#F1F3F6]">
                      <img src={m.image} alt={m.name} loading="lazy" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-[filter] duration-300" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                    </span>
                    <span className="block mt-3 text-[16px] font-semibold">{m.name}</span>
                    <span className="block text-[14px] text-[#5F6676]">{m.position}</span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="m-0 text-[15px] text-[#3E4555]">Team profiles are on the <Link to="/core-team" className="cs-link">core team page</Link>.</p>
          )}
        </div>
      </section>

      {/* ── Offices (live data) ── */}
      {offices.length > 0 && (
        <section className={`${WRAP} py-16 md:py-24 grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-8 lg:gap-16`}>
          <h2 className="m-0 text-[28px] md:text-[34px] leading-tight font-medium tracking-[-0.018em]">Offices</h2>
          <ul className="m-0 p-0 list-none border-t border-[#0C1324]">
            {offices.map((o, i) => (
              <li key={o._id || i} className="grid grid-cols-1 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-1 sm:gap-8 py-5 border-b border-[#DCE0E7]">
                <div><div className="text-[17px] font-semibold">{o.city}, {o.country}</div><div className="text-[13px] text-[#5F6676]">{o.type}</div></div>
                <div className="text-[15px] text-[#3E4555]">{o.address}</div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ── Work with us ── */}
      <section className="cs-char text-white">
        <div className={`${WRAP} py-14 md:py-16 flex flex-col md:flex-row md:items-center justify-between gap-6`}>
          <div>
            <h2 className="m-0 text-[24px] md:text-[28px] font-medium tracking-[-0.015em]">Work with us</h2>
            <p className="mt-2 mb-0 text-[15px] text-[#AEB6C8]">Book a demo, ask about an engagement, or apply for the next internship cohort.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/contact" className="cs-btn cs-btn-on-dark">Contact us</Link>
            <Link to="/training/internship" className="cs-btn cs-btn-ghost-dark">Internships</Link>
          </div>
        </div>
      </section>

      <Dialog open={!!selectedMember} onOpenChange={() => setSelectedMember(null)}>
        {selectedMember && (
          <DialogContent className="cs-sans bg-white border-[#DCE0E7] text-[#0C1324] w-[95%] sm:max-w-2xl max-h-[90vh] overflow-y-auto rounded-[4px]">
            <DialogHeader>
              <DialogTitle className="text-2xl font-semibold">{selectedMember.name}</DialogTitle>
              <p className="text-[#5F6676]">{selectedMember.position}</p>
            </DialogHeader>
            {selectedMember.bio && <p className="text-[#3E4555] mt-4 leading-relaxed">{selectedMember.bio}</p>}
            {selectedMember.expertise?.length > 0 && (
              <div className="mt-6">
                <h4 className="font-semibold mb-2">Expertise</h4>
                <p className="m-0 text-[#3E4555]">{selectedMember.expertise.join(', ')}</p>
              </div>
            )}
            {selectedMember.education && <p className="text-[#5F6676] mt-4">{selectedMember.education}</p>}
          </DialogContent>
        )}
      </Dialog>
    </main>
  );
};

export default AboutPage;
