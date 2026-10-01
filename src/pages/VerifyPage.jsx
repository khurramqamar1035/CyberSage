import React, { useCallback, useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { PageHero, Guides } from '../components/site/ServiceTemplates';
import { loadContent, sha256Hex } from '../lib/content';
import Certificate, { CERT_TEMPLATES, certDate, resolveCertificate } from '../components/certificate/Certificate';

const WRAP = 'max-w-[1400px] mx-auto px-6 md:px-10';
const FIELD = 'w-full bg-white border border-[rgba(7,9,13,0.25)] rounded-[1px] px-4 py-3 text-[17px] tracking-[0.04em] uppercase text-[#07090D] placeholder:normal-case placeholder:tracking-normal placeholder:text-[#8B95A5] focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] cs-mono';

// LinkedIn "Add to profile" (Licenses & certifications). Set LINKEDIN_ORG_ID to CyberSage's
// numeric LinkedIn company ID to show the company logo on the entry; otherwise the name is used.
const LINKEDIN_ORG_ID = '';
const titleCase = (s) => String(s || '').toLowerCase().replace(/\b([a-z])/g, (m) => m.toUpperCase());
function linkedInUrl(rec, code) {
  const c = resolveCertificate(rec);
  const issued = new Date(`${String(c.to || c.createdAt || new Date().toISOString()).slice(0, 10)}T00:00:00`);
  const q = new URLSearchParams({
    startTask: 'CERTIFICATION_NAME',
    name: `${titleCase(c.title)} Certificate`,
    ...(LINKEDIN_ORG_ID ? { organizationId: LINKEDIN_ORG_ID } : { organizationName: 'CyberSage' }),
    issueYear: String(issued.getFullYear()),
    issueMonth: String(issued.getMonth() + 1),
    certId: code,
    certUrl: `https://cybersage.uk/verify?code=${encodeURIComponent(code)}`,
  });
  return `https://www.linkedin.com/profile/add?${q.toString()}`;
}

const normalise = (s) => (s || '').trim().toUpperCase().replace(/\s+/g, '');

// Certificates are issued from the admin panel and stored in public/content/certificates.json,
// keyed by a SHA-256 fingerprint of the ID. Returns the record, or null for an unknown ID.
async function lookup(code) {
  const [list, hash] = await Promise.all([loadContent('certificates'), sha256Hex(code)]);
  return list.find((c) => c.hash === hash) || null;
}

export default function VerifyPage() {
  const [params, setParams] = useSearchParams();
  const { code: pathCode } = useParams();
  const initial = normalise(params.get('code') || pathCode || '');
  const [input, setInput] = useState(initial);
  const [state, setState] = useState(initial ? 'checking' : 'idle'); // idle | checking | valid | invalid | error
  const [record, setRecord] = useState(null);
  const [checked, setChecked] = useState('');

  const verify = useCallback(async (raw) => {
    const code = normalise(raw);
    if (!code) return;
    setState('checking');
    setChecked(code);
    try {
      const rec = await lookup(code);
      setRecord(rec);
      setState(rec ? 'valid' : 'invalid');
    } catch {
      setRecord(null);
      setState('error');
    }
  }, []);

  useEffect(() => { if (initial) verify(initial); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onSubmit = (e) => {
    e.preventDefault();
    const code = normalise(input);
    if (!code) return;
    setParams({ code }, { replace: true });
    verify(code);
  };

  return (
    <main className="cs-sans text-[#07090D]">
      <PageHero
        crumbs={[{ label: 'CyberSage', to: '/' }, { label: 'Verify a certificate' }]}
        word="VERIFY"
        title="Verify a CyberSage certificate."
        intro="Enter the certificate ID printed next to the QR code, or scan the QR code on the certificate."
      />

      <section className="relative s-paper overflow-hidden">
        <Guides />
        <div className={`${WRAP} relative py-16 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12`}>
          <form onSubmit={onSubmit} className="lg:col-span-4 flex flex-col gap-4" role="search" aria-label="Verify a certificate">
            <h2 className="m-0 t-wide font-[250] text-[28px] md:text-[34px] leading-[1.05] tracking-[-0.03em]">Certificate ID</h2>
            <label htmlFor="cert-code" className="text-[14px] text-[#3E4555]">For example CS-INT-2026-XXXXXX</label>
            <input id="cert-code" value={input} onChange={(e) => setInput(e.target.value)} autoComplete="off" autoCapitalize="characters" spellCheck="false" placeholder="Enter certificate ID" className={FIELD} />
            <button type="submit" disabled={state === 'checking'} className="cs-btn cs-btn-primary w-full sm:w-fit justify-center disabled:opacity-60">
              {state === 'checking' ? 'Checking…' : 'Verify'}
            </button>
          </form>

          <div className="lg:col-span-7 lg:col-start-6" role="status" aria-live="polite">
            {state === 'idle' && (
              <div className="border-t border-[#07090D] pt-6 text-[16px] leading-relaxed text-[#3E4555] max-w-[52ch]">
                Every certificate issued by CyberSage carries a unique ID. Checking it here confirms who it was awarded to and for what.
              </div>
            )}

            {state === 'checking' && (
              <div className="border-t border-[#07090D] pt-6 text-[16px] text-[#3E4555]">Checking <span className="cs-mono">{checked}</span>…</div>
            )}

            {state === 'valid' && record && (
              <div className="flex items-center gap-4 px-5 py-4 bg-[#07090D] text-[#ECEEF1]">
                <span aria-hidden="true" className="w-9 h-9 flex items-center justify-center bg-[#2563EB] shrink-0">
                  <svg width="18" height="18" viewBox="0 0 18 18"><path d="M3.5 9.4l3.4 3.4 7.6-8" fill="none" stroke="#fff" strokeWidth="2" /></svg>
                </span>
                <div>
                  <div className="text-[18px] font-medium">Verified</div>
                  <div className="text-[14px] text-[#A9B8D0]">Certificate <span className="cs-mono">{checked}</span> was issued by CyberSage to {record.name}.</div>
                </div>
              </div>
            )}

            {state === 'error' && (
              <div className="border-t-2 border-[#C93C40] pt-6">
                <div className="text-[20px] font-medium">We could not check this certificate right now.</div>
                <p className="m-0 mt-3 text-[16px] leading-relaxed text-[#3E4555]">Please check your connection and try again.</p>
                <button type="button" onClick={() => verify(checked)} className="cs-btn cs-btn-secondary mt-5">Try again</button>
              </div>
            )}

            {state === 'invalid' && (
              <div className="border-t-2 border-[#C93C40] pt-6">
                <div className="text-[20px] font-medium">No certificate matches <span className="cs-mono">{checked}</span>.</div>
                <p className="m-0 mt-3 text-[16px] leading-relaxed text-[#3E4555] max-w-[56ch]">
                  Check the ID for typos: it is printed next to the QR code and starts with CS-. If it still does not match, the certificate may not be genuine. <Link to="/contact" className="cs-link">Contact us</Link> and we will check it for you.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {state === 'valid' && record && (
        <section className="relative s-off overflow-hidden cert-print-area">
          <Guides />
          <div className={`${WRAP} relative py-14 md:py-20`}>
            <div className="shadow-[0_40px_80px_-40px_rgba(7,9,13,0.45)] ring-1 ring-black/5 bg-white">
              <Certificate cert={{ ...record, code: checked }} />
            </div>
            <div className="cert-no-print mt-8 grid grid-cols-1 md:grid-cols-12 gap-8">
              <dl className="md:col-span-7 m-0 border-t border-[#07090D]">
                {[
                  ['Awarded to', record.name],
                  ['Certificate', (CERT_TEMPLATES[record.type] || {}).label || record.title],
                  record.from && record.to ? ['Duration', `${certDate(record.from)} to ${certDate(record.to)}`] : null,
                  ['Certificate ID', checked],
                ].filter(Boolean).map(([k, v]) => (
                  <div key={k} className="grid grid-cols-[150px_minmax(0,1fr)] gap-6 py-3.5 border-b border-[rgba(7,9,13,0.14)] items-baseline">
                    <dt className="cs-meta text-[#5B6575]">{k}</dt>
                    <dd className="m-0 text-[16px]">{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="md:col-span-4 md:col-start-9 flex flex-col gap-3 items-start">
                <a href={linkedInUrl(record, checked)} target="_blank" rel="noopener noreferrer" className="cs-btn cs-btn-primary">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" /></svg>
                  Add to LinkedIn profile
                </a>
                <button type="button" onClick={() => window.print()} className="cs-btn cs-btn-secondary">Print or save as PDF</button>
                <p className="m-0 text-[14px] text-[#5B6575]">LinkedIn will open with the certificate, ID and verification link filled in. Share this page’s link to let anyone confirm the certificate.</p>
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
