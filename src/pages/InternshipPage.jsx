import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL || process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001';

const YEARS = ['1st Year', '2nd Year', '3rd Year', '4th Year', 'Masters', 'PhD', 'Graduate'];
const MAX_SKILLS = 12;

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

  if (success) {
    return (
      <main className="min-h-screen blueprint-grid flex items-center justify-center px-6 pt-32 pb-24">
        <div className="w-full max-w-lg text-center">
          <div className="glass-card p-12">
            <span className="material-symbols-outlined text-6xl text-tertiary mb-6 block"
              style={{ fontVariationSettings: "'FILL' 1" }}>
              check_circle
            </span>
            <h2 className="font-headline text-3xl font-bold text-white mb-3">Application Received!</h2>
            <p className="text-on-surface-variant mb-8 leading-relaxed">
              Thank you for applying to the CyberSage Internship Programme. Our team will review
              your application and reach out within 5–7 business days.
            </p>
            <button
              onClick={() => navigate('/training')}
              className="bg-primary text-on-primary px-8 py-4 font-label text-[11px] tracking-widest uppercase font-bold hover:brightness-110 transition-all"
            >
              Back to Training
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen blueprint-grid pt-32 pb-24 px-6">
      <div className="max-w-[1440px] mx-auto">

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-tertiary-container/10 border border-tertiary/20 mb-6">
              <span className="font-label text-[10px] uppercase tracking-[0.2em] text-tertiary">
                Internship Programme
              </span>
            </div>
            <h1 className="font-headline font-black text-5xl md:text-6xl tracking-tighter leading-none mb-6">
              LAUNCH YOUR <br />
              <span className="text-tertiary">CYBER CAREER.</span>
            </h1>
            <p className="text-on-surface-variant text-lg leading-relaxed mb-10 max-w-lg">
              Join the CyberSage team and work alongside elite security researchers. Gain
              real-world experience, build an outstanding portfolio, and fast-track your career
              in cybersecurity and development.
            </p>

            {/* Perks */}
            <div className="space-y-5">
              {[
                ['bolt',        'Hands-on experience with live security projects'],
                ['school',      'Mentorship from industry-leading professionals'],
                ['workspace_premium', 'Certificate of Completion upon successful internship'],
                ['public',      'Remote-first with flexible working hours'],
              ].map(([icon, text]) => (
                <div key={icon} className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-tertiary text-xl mt-0.5">{icon}</span>
                  <span className="text-on-surface-variant text-sm">{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="glass-card p-8 border-l-2 border-l-tertiary/50">
            <h2 className="font-headline font-bold text-2xl text-white mb-2">Apply Now</h2>
            <p className="text-on-surface-variant text-sm mb-8">
              Fill in your details below and we'll be in touch.
            </p>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label className="block text-on-surface-variant text-xs font-label uppercase tracking-widest mb-2">
                  Full Name <span className="text-red-400">*</span>
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Smith"
                  className="w-full bg-surface-container border border-outline-variant/40 text-white text-sm px-4 py-3 focus:outline-none focus:border-tertiary/50 placeholder-on-surface-variant/40 transition-colors"
                />
              </div>

              {/* Email + Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-on-surface-variant text-xs font-label uppercase tracking-widest mb-2">
                    Email Address <span className="text-red-400">*</span>
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="john@university.ac.uk"
                    className="w-full bg-surface-container border border-outline-variant/40 text-white text-sm px-4 py-3 focus:outline-none focus:border-tertiary/50 placeholder-on-surface-variant/40 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-on-surface-variant text-xs font-label uppercase tracking-widest mb-2">
                    Phone Number <span className="text-red-400">*</span>
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+44 7700 000000"
                    className="w-full bg-surface-container border border-outline-variant/40 text-white text-sm px-4 py-3 focus:outline-none focus:border-tertiary/50 placeholder-on-surface-variant/40 transition-colors"
                  />
                </div>
              </div>

              {/* Degree */}
              <div>
                <label className="block text-on-surface-variant text-xs font-label uppercase tracking-widest mb-2">
                  Degree / Course <span className="text-red-400">*</span>
                </label>
                <input
                  name="degree"
                  value={form.degree}
                  onChange={handleChange}
                  placeholder="BSc Computer Science"
                  className="w-full bg-surface-container border border-outline-variant/40 text-white text-sm px-4 py-3 focus:outline-none focus:border-tertiary/50 placeholder-on-surface-variant/40 transition-colors"
                />
              </div>

              {/* University + Year */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-on-surface-variant text-xs font-label uppercase tracking-widest mb-2">
                    University
                  </label>
                  <input
                    name="university"
                    value={form.university}
                    onChange={handleChange}
                    placeholder="University of London"
                    className="w-full bg-surface-container border border-outline-variant/40 text-white text-sm px-4 py-3 focus:outline-none focus:border-tertiary/50 placeholder-on-surface-variant/40 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-on-surface-variant text-xs font-label uppercase tracking-widest mb-2">
                    University Year <span className="text-red-400">*</span>
                  </label>
                  <select
                    name="universityYear"
                    value={form.universityYear}
                    onChange={handleChange}
                    className="w-full bg-surface-container border border-outline-variant/40 text-white text-sm px-4 py-3 focus:outline-none focus:border-tertiary/50 transition-colors appearance-none"
                  >
                    <option value="">Select year</option>
                    {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>
              </div>

              {/* Skills */}
              <div>
                <label className="block text-on-surface-variant text-xs font-label uppercase tracking-widest mb-2">
                  Skills
                  <span className="ml-2 normal-case text-on-surface-variant/50 tracking-normal font-normal">
                    (press Enter or comma to add · max {MAX_SKILLS})
                  </span>
                </label>

                {/* Tag container — click anywhere to focus the input */}
                <div
                  onClick={() => skillRef.current?.focus()}
                  className="min-h-[48px] w-full bg-surface-container border border-outline-variant/40 px-3 py-2 flex flex-wrap gap-2 items-center cursor-text focus-within:border-tertiary/50 transition-colors"
                >
                  {skills.map((skill, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 bg-tertiary/10 border border-tertiary/30 text-tertiary text-xs font-label px-2.5 py-1"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); removeSkill(i); }}
                        className="text-tertiary/60 hover:text-tertiary leading-none"
                        aria-label={`Remove ${skill}`}
                      >
                        ×
                      </button>
                    </span>
                  ))}

                  {skills.length < MAX_SKILLS && (
                    <input
                      ref={skillRef}
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyDown={handleSkillKeyDown}
                      onBlur={() => addSkill(skillInput)}
                      placeholder={skills.length === 0 ? 'e.g. Python, Networking, Linux…' : ''}
                      className="flex-1 min-w-[140px] bg-transparent text-white text-sm focus:outline-none placeholder-on-surface-variant/40"
                    />
                  )}
                </div>

                {skills.length > 0 && (
                  <p className="text-on-surface-variant/40 text-xs mt-1.5">
                    {skills.length}/{MAX_SKILLS} skill{skills.length !== 1 ? 's' : ''} added
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-tertiary text-on-tertiary py-4 font-label text-sm uppercase tracking-widest font-bold hover:brightness-110 disabled:opacity-50 transition-all mt-2"
              >
                {submitting ? 'Submitting...' : 'Submit Application'}
              </button>

              <p className="text-on-surface-variant/50 text-xs text-center">
                By submitting you agree to CyberSage storing your data for recruitment purposes.
              </p>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
