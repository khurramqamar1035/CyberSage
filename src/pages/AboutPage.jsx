import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { PRODUCTS } from '../data/ecosystem';

const BACKEND_URL = process.env.REACT_APP_API_URL || process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001';
const WRAP = 'max-w-[1400px] mx-auto px-6 md:px-10';

const AboutPage = () => {
  const [offices, setOffices] = useState([]);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const officeRes = await axios.get(`${BACKEND_URL}/api/about/offices`);
        setOffices(Array.isArray(officeRes.data) ? officeRes.data : []);
      } catch {
        // the offices section hides when empty
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

      {/* ── Team: photos live on the Core team page only ── */}
      <section className="s-paper border-b border-[rgba(7,9,13,0.08)]">
        <div className={`${WRAP} py-14 md:py-16`}>
          <Link to="/core-team" className="cs-row-link flex items-center justify-between gap-6 border-t border-[#07090D] pt-6">
            <span>
              <span className="cs-row-title block t-wide font-[250] text-[28px] md:text-[40px] leading-[1.05] tracking-[-0.03em] transition-colors">Meet the core team</span>
              <span className="block mt-2 text-[16px] text-[#3E4555]">The people who build CyberSage and deliver its services.</span>
            </span>
            <svg className="cs-btn-arrow shrink-0" width="22" height="22" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true"><path d="M1 8h13M9 3l5 5-5 5" /></svg>
          </Link>
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

    </main>
  );
};

export default AboutPage;
