import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PageHero, Guides } from '../components/site/ServiceTemplates';

const API_URL = process.env.REACT_APP_API_URL || process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001';

const YEARS = ['1st Year', '2nd Year', '3rd Year', '4th Year', 'Masters', 'PhD', 'Graduate'];
const MAX_SKILLS = 12;
const WRAP = 'max-w-[1400px] mx-auto px-6 md:px-10';
const FIELD = 'w-full bg-white border border-[rgba(7,9,13,0.25)] rounded-[1px] px-4 py-3 text-[15px] text-[#07090D] placeholder:text-[#8B95A5] focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]';
const LABEL = 'block text-[14px] font-medium mb-2';
const PERKS = [
  'Hands-on experience with live security projects',
  'Mentorship from experienced professionals',
  'Certificate of completion when you finish the internship',
  'Remote-first, with flexible working hours',
];
const CRUMBS = [{ label: 'CyberSage', to: '/' }, { label: 'Training', to: '/training' }, { label: 'Internship' }];
const Req = () => <span className="text-[#C93C40]" aria-hidden="true"> *</span>;

export default function InternshipPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '', email: '', phone: '', degree: '', universityYear: '', university: '',
  });
  const [skills, setSkills]         = useState([]);
  const [skillInput, setSkillInput] = useState('');
  const skillRef                    = useRef(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess]       = useState(false);
  const [error, setError]           = useState('');

  /* ── Enrollment status ── */
  const [enrollmentOpen, setEnrollmentOpen]   = useState(null); // null = loading
  const [waitlistEmail, setWaitlistEmail]     = useState('');
  const [waitlistStatus, setWaitlistStatus]   = useState(''); // 'success' | 'error' | ''
  const [waitlistMsg, setWaitlistMsg]         = useState('');
  const [waitlistSubmitting, setWaitlistSubmitting] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/api/enrollment/status`)
      .then((r) => r.json())
      .then((d) => setEnrollmentOpen(d.enrollmentOpen ?? true))
      .catch(() => setEnrollmentOpen(true)); // fail open
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  /* ── Skills helpers ── */
  const addSkill = (raw) => {
    const value = raw.trim();
    if (!value) return;
    if (skills.length >= MAX_SKILLS) return;
    if (skills.map(s => s.toLowerCase()).includes(value.toLowerCase())) return;
    setSkills((prev) => [...prev, value]);
    setSkillInput('');
  };

  const handleSkillKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addSkill(skillInput);
    } else if (e.key === 'Backspace' && skillInput === '' && skills.length > 0) {
      setSkills((prev) => prev.slice(0, -1));
    }
  };

  const removeSkill = (index) => {
    setSkills((prev) => prev.filter((_, i) => i !== index));
  };

  /* ── Waitlist submit ── */
  const handleWaitlistSubmit = async (e) => {
    e.preventDefault();
    const email = waitlistEmail.trim();
    if (!email) return;
    setWaitlistSubmitting(true);
    setWaitlistStatus('');
    try {
      const res  = await fetch(`${API_URL}/api/enrollment/waitlist`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong.');
      setWaitlistStatus('success');
      setWaitlistMsg(data.message);
      setWaitlistEmail('');
    } catch (err) {
      setWaitlistStatus('error');
      setWaitlistMsg(err.message);
    } finally {
      setWaitlistSubmitting(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const { name, email, phone, degree, universityYear } = form;
    if (!name || !email || !phone || !degree || !universityYear) {
      setError('Please fill in all required fields.');
      return;
    }
    setSubmitting(true);

    // Flush any skill the user typed but didn't confirm with Enter/comma
    const finalSkills = [...skills];
    const pending = skillInput.trim();
    if (pending && finalSkills.length < MAX_SKILLS && !finalSkills.map(s => s.toLowerCase()).includes(pending.toLowerCase())) {
      finalSkills.push(pending);
    }

    try {
      const res = await fetch(`${API_URL}/api/interns/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, skills: finalSkills }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Submission failed.');
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  /* ── Loading enrollment status ── */
  if (enrollmentOpen === null) {
    return (
      <main className="cs-sans">
        <PageHero crumbs={CRUMBS} word="INTERNSHIP" title="The CyberSage internship programme." intro="Checking whether applications are open…" />
      </main>
    );
  }

  /* ── Enrollment closed ── */
  if (!enrollmentOpen) {
    return (
      <main className="cs-sans text-[#07090D]">
        <PageHero crumbs={CRUMBS} word="INTERNSHIP" title="Applications are closed for now." intro="We are not accepting new applications at the moment. Leave your email and we will let you know as soon as the next intake opens." />
        <section className="relative s-paper overflow-hidden">
          <Guides />
          <div className={`${WRAP} relative py-16 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10`}>
            <div className="lg:col-span-5">
              <h2 className="m-0 t-wide font-[250] text-[28px] md:text-[36px] leading-[1.05] tracking-[-0.03em]">Join the waitlist</h2>
              {waitlistStatus === 'success' ? (
                <p role="status" className="m-0 mt-6 border-l-2 border-[#2563EB] pl-4 text-[16px]">{waitlistMsg}</p>
              ) : (
                <form onSubmit={handleWaitlistSubmit} className="mt-6 pt-6 border-t border-[#07090D] flex flex-col gap-4">
                  <div>
                    <label htmlFor="wl-email" className={LABEL}>Email address</label>
                    <input id="wl-email" type="email" value={waitlistEmail} onChange={(e) => setWaitlistEmail(e.target.value)} required autoComplete="email" className={FIELD} />
                  </div>
                  {waitlistStatus === 'error' && <p role="alert" className="m-0 text-[14px] text-[#C93C40]">{waitlistMsg}</p>}
                  <button type="submit" disabled={waitlistSubmitting} className="cs-btn cs-btn-primary w-full sm:w-fit justify-center disabled:opacity-60">
                    {waitlistSubmitting ? 'Submitting…' : 'Notify me when it opens'}
                  </button>
                </form>
              )}
              <button type="button" onClick={() => navigate('/training')} className="mt-8 bg-transparent cs-link text-[15px]">Back to training</button>
            </div>
          </div>
        </section>
      </main>
    );
  }

  if (success) {
    return (
      <main className="cs-sans text-[#07090D]">
        <PageHero crumbs={CRUMBS} word="INTERNSHIP" title="Application received." intro="Thank you for applying to the CyberSage internship programme. The team will review your application and reach out within 5–7 business days.">
          <div><button type="button" onClick={() => navigate('/training')} className="cs-btn cs-btn-on-dark">Back to training</button></div>
        </PageHero>
      </main>
    );
  }

  return (
    <main className="cs-sans text-[#07090D]">
      <PageHero crumbs={CRUMBS} word="INTERNSHIP" title="Start your career in cybersecurity."
        intro="Join the CyberSage team and work alongside our security researchers. Gain real-world experience, build a portfolio and grow your career in cybersecurity and development." />

      <section className="relative s-paper overflow-hidden">
        <Guides />
        <div className={`${WRAP} relative py-16 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12`}>
          {/* Programme */}
          <div className="lg:col-span-4">
            <h2 className="m-0 t-wide font-[250] text-[28px] md:text-[36px] leading-[1.05] tracking-[-0.03em]">What you get</h2>
            <ol className="m-0 mt-6 p-0 list-none border-t border-[#07090D]">
              {PERKS.map((t, i) => (
                <li key={t} className="grid grid-cols-[40px_minmax(0,1fr)] gap-3 py-4 border-b border-[rgba(7,9,13,0.14)]">
                  <span className="cs-data text-[#5B6575] pt-0.5">{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-[16px]">{t}</span>
                </li>
              ))}
            </ol>
            <p className="m-0 mt-6 text-[14px] text-[#5B6575]">Questions first? <Link to="/contact" className="cs-link">Contact us</Link>.</p>
          </div>

          {/* Form */}
          <div className="lg:col-span-7 lg:col-start-6">
            <h2 className="m-0 t-wide font-[250] text-[28px] md:text-[36px] leading-[1.05] tracking-[-0.03em]">Apply now</h2>
            <form onSubmit={handleSubmit} className="mt-6 pt-6 border-t border-[#07090D] grid grid-cols-1 sm:grid-cols-2 gap-5">
              {error && <p role="alert" className="sm:col-span-2 m-0 text-[14px] text-[#C93C40] border-l-2 border-[#C93C40] pl-3">{error}</p>}

              <div className="sm:col-span-2">
                <label htmlFor="in-name" className={LABEL}>Full name<Req /></label>
                <input id="in-name" name="name" value={form.name} onChange={handleChange} autoComplete="name" className={FIELD} />
              </div>
              <div>
                <label htmlFor="in-email" className={LABEL}>Email address<Req /></label>
                <input id="in-email" name="email" type="email" value={form.email} onChange={handleChange} autoComplete="email" className={FIELD} />
              </div>
              <div>
                <label htmlFor="in-phone" className={LABEL}>Phone number<Req /></label>
                <input id="in-phone" name="phone" type="tel" value={form.phone} onChange={handleChange} autoComplete="tel" className={FIELD} />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="in-degree" className={LABEL}>Degree or course<Req /></label>
                <input id="in-degree" name="degree" value={form.degree} onChange={handleChange} placeholder="e.g. BSc Computer Science" className={FIELD} />
              </div>
              <div>
                <label htmlFor="in-uni" className={LABEL}>University</label>
                <input id="in-uni" name="university" value={form.university} onChange={handleChange} className={FIELD} />
              </div>
              <div>
                <label htmlFor="in-year" className={LABEL}>University year<Req /></label>
                <select id="in-year" name="universityYear" value={form.universityYear} onChange={handleChange} className={FIELD}>
                  <option value="">Select year</option>
                  {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>

              {/* Skills */}
              <div className="sm:col-span-2">
                <label htmlFor="in-skills" className={LABEL}>
                  Skills <span className="text-[#5B6575] font-normal">(press Enter or comma to add, up to {MAX_SKILLS})</span>
                </label>
                <div onClick={() => skillRef.current?.focus()}
                  className="min-h-[50px] w-full bg-white border border-[rgba(7,9,13,0.25)] px-3 py-2 flex flex-wrap gap-2 items-center cursor-text focus-within:border-[#2563EB] focus-within:ring-1 focus-within:ring-[#2563EB]">
                  {skills.map((skill, i) => (
                    <span key={i} className="inline-flex items-center gap-1.5 bg-[#ECEEF1] text-[#07090D] text-[13px] px-2.5 py-1">
                      {skill}
                      <button type="button" onClick={(e) => { e.stopPropagation(); removeSkill(i); }} className="bg-transparent text-[#5B6575] hover:text-[#07090D] leading-none px-1" aria-label={`Remove ${skill}`}>×</button>
                    </span>
                  ))}
                  {skills.length < MAX_SKILLS && (
                    <input id="in-skills" ref={skillRef} value={skillInput} onChange={(e) => setSkillInput(e.target.value)} onKeyDown={handleSkillKeyDown} onBlur={() => addSkill(skillInput)}
                      placeholder={skills.length === 0 ? 'e.g. Python, Networking, Linux' : ''}
                      className="flex-1 min-w-[140px] bg-transparent text-[15px] text-[#07090D] focus:outline-none placeholder:text-[#8B95A5] py-1" />
                  )}
                </div>
                {skills.length > 0 && <p className="m-0 mt-1.5 text-[13px] text-[#5B6575]">{skills.length}/{MAX_SKILLS} skill{skills.length !== 1 ? 's' : ''} added</p>}
              </div>

              <div className="sm:col-span-2 flex flex-col gap-3">
                <button type="submit" disabled={submitting} className="cs-btn cs-btn-primary w-full sm:w-fit justify-center disabled:opacity-60">
                  {submitting ? 'Submitting…' : 'Submit application'}
                </button>
                <p className="m-0 text-[13px] text-[#5B6575]">By submitting you agree to CyberSage storing your data for recruitment purposes.</p>
              </div>
            </form>
          </div>
        </div>
      </section>

    </main>
  );
}
