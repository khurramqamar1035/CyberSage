import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { PRODUCTS } from '../data/ecosystem';

const BACKEND_URL = process.env.REACT_APP_API_URL || process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001';
const WRAP = 'max-w-[1400px] mx-auto px-6 md:px-10';

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
    <main className="cs-sans text-[#07090D]">
      {/* ── Who we are ── */}
      <section className="relative s-black tx-grain overflow-hidden text-[#ECEEF1]">
        <div className={`${WRAP} pt-12 md:pt-16 pb-16 md:pb-24`}>
          <div className="relative overflow-hidden -mx-6 md:-mx-10 px-6 md:px-10" aria-hidden="true">
            <div className="t-expanded font-[200] leading-[0.78] tracking-[-0.03em] whitespace-nowrap text-[22vw] md:text-[15.5vw] xl:text-[218px]">ABOUT</div>
          </div>
          <div className="mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7">
              <h1 className="m-0 t-wide font-[250] text-[38px] sm:text-[52px] lg:text-[64px] leading-[1.02] tracking-[-0.035em] max-w-[16ch]">Intelligence. Simulation. Resilience.</h1>
              <p className="mt-6 mb-0 text-[17px] leading-relaxed text-[#A9B8D0] max-w-[56ch]">CyberSage is a cybersecurity technology company building intelligent platforms for training, detection and collaboration. Alongside the products, our consultants take on hands-on security, development and training engagements.</p>
            </div>
            <aside className="lg:col-span-4 lg:col-start-9 lg:pt-3">
              <dl className="m-0 border-t border-[#ECEEF1] text-[15px]">
                <div className="py-4 border-b border-[rgba(236,238,241,0.14)]"><dt className="cs-meta text-[#8B95A5]">Products</dt><dd className="m-0 mt-1.5">{PRODUCTS.map((p, i) => <React.Fragment key={p.slug}>{i > 0 && ', '}<Link to={`/products/${p.slug}`} className="cs-link">{p.name}</Link></React.Fragment>)}</dd></div>
                <div className="py-4 border-b border-[rgba(236,238,241,0.14)]"><dt className="cs-meta text-[#8B95A5]">Services</dt><dd className="m-0 mt-1.5">Security assessments and testing, secure development, training and internships</dd></div>
              </dl>
            </aside>
          </div>
        </div>
      </section>

      {/* ── Leadership (live data) ── */}
      <section className="s-paper border-b border-[rgba(7,9,13,0.08)]">
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
          <ul className="m-0 p-0 list-none border-t border-[#07090D]">
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
      <section className="relative s-black tx-grain overflow-hidden text-[#ECEEF1]">
        <div className={`${WRAP} py-20 md:py-28 grid grid-cols-1 md:grid-cols-12 gap-8 items-end`}>
          <h2 className="md:col-span-7 m-0 t-expanded font-[200] text-[44px] sm:text-[64px] lg:text-[88px] leading-[0.92] tracking-[-0.04em]">Work with us.</h2>
          <div className="md:col-span-4 md:col-start-9 flex flex-col gap-5">
            <p className="m-0 text-[16px] leading-relaxed text-[#A9B8D0]">Book a demo, ask about an engagement, or apply for the next internship cohort.</p>
            <div className="flex flex-wrap gap-3">
              <Link to="/contact" className="cs-btn cs-btn-on-dark">Contact us</Link>
              <Link to="/training/internship" className="cs-btn cs-btn-ghost-dark">Internships</Link>
            </div>
          </div>
        </div>
      </section>

      <Dialog open={!!selectedMember} onOpenChange={() => setSelectedMember(null)}>
        {selectedMember && (
          <DialogContent className="cs-sans bg-white border-[#DCE0E7] text-[#07090D] w-[95%] sm:max-w-2xl max-h-[90vh] overflow-y-auto rounded-[1px]">
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
