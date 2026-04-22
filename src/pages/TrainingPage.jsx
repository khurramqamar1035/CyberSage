import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL || process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001';

const TIERS = [
  {
    to: '/training/beginner',
    tier: 'Tier 01',
    icon: 'verified_user', iconColor: 'text-primary',
    borderColor: 'border-l-primary/50', hoverTitle: 'group-hover:text-primary',
    badge: '4 WEEKS', badgeLabel: 'Duration', badgeColor: 'text-primary',
    title: 'Basic Cybersecurity',
    desc: 'Foundational defence strategies and digital hygiene for the modern operative. Core infrastructure essentials and encryption standards.',
    price: '$199',
    cta: 'Begin Initiation',
  },
  {
    to: '/training/intermediate',
    tier: 'Tier 02',
    icon: 'security', iconColor: 'text-secondary',
    borderColor: 'border-l-secondary/50', hoverTitle: 'group-hover:text-secondary',
    badge: '8 WEEKS', badgeLabel: 'Duration', badgeColor: 'text-secondary',
    title: 'Practical Implementation',
    desc: 'Active threat hunting and network architecture reinforcement protocols. Red Team simulations and cloud security mesh deployment.',
    price: '$399',
    popular: true,
    cta: 'Expand Domain',
  },
  {
    to: '/training/advanced',
    tier: 'Tier 03',
    icon: 'rocket_launch', iconColor: 'text-tertiary',
    borderColor: 'border-l-tertiary/50', hoverTitle: 'group-hover:text-tertiary',
    badge: '12 WEEKS', badgeLabel: 'Duration', badgeColor: 'text-tertiary',
    title: 'Expert-Level Mastery',
    desc: 'Advanced zero-day exploitation prevention and sovereign AI defence systems. Quantum cryptography and global incident response.',
    price: '$699',
    cta: 'Ascend to Expert',
  },
];

export default function TrainingAcademy() {
  const navigate = useNavigate();
  const [enrollmentOpen, setEnrollmentOpen] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/enrollment/status`)
      .then((r) => r.json())
      .then((d) => setEnrollmentOpen(d.enrollmentOpen ?? true))
      .catch(() => setEnrollmentOpen(true));
  }, []);

  return (
    <main className="pt-32 pb-24 px-6 md:px-12 max-w-[1440px] mx-auto">

      <header className="mb-20 max-w-4xl">
        <div className="font-label text-secondary text-[10px] tracking-[0.3em] uppercase mb-4 flex items-center gap-2">
          <span className="w-8 h-[1px] bg-secondary" />
          Institutional Grade Excellence
        </div>
        <h1 className="font-headline font-black text-5xl md:text-7xl tracking-tighter mb-6 leading-none">
          CYBERSAGE <span className="text-primary">ACADEMY</span>
        </h1>
        <p className="text-on-surface-variant text-lg leading-relaxed max-w-2xl">
          Forging the next generation of digital sentries. Our curriculum is built on real-world
          threat vectors, moving beyond theory into surgical precision.
        </p>
      </header>

      {/* ── Training Tier Cards ── */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {TIERS.map((t) => (
          <Link
            key={t.to}
            to={t.to}
            className={`glass-card p-8 group transition-all duration-300 tactical-glow border-l-2 ${t.borderColor} hover:-translate-y-1 flex flex-col relative`}
          >
            {t.popular && (
              <div className="absolute top-4 right-4">
                <span className="font-label text-[8px] tracking-[0.3em] text-secondary uppercase border border-secondary/30 bg-secondary/10 px-2 py-1">
                  Most Popular
                </span>
              </div>
            )}
            <div className="flex justify-between items-start mb-8">
              <div className="flex items-center gap-3">
                <span className={`material-symbols-outlined ${t.iconColor} text-3xl`}>{t.icon}</span>
                <span className="font-label text-[10px] tracking-[0.2em] text-on-surface-variant uppercase bg-surface-container px-3 py-1">
                  {t.tier}
                </span>
              </div>
              <div className="text-right">
                <div className="font-label text-on-surface-variant text-[10px] tracking-widest uppercase">{t.badgeLabel}</div>
                <div className={`font-bold text-sm ${t.badgeColor}`}>{t.badge}</div>
              </div>
            </div>
            <h3 className={`font-headline font-extrabold text-2xl mb-3 transition-colors ${t.hoverTitle}`}>
              {t.title}
            </h3>
            <p className="text-on-surface-variant text-sm mb-10 leading-relaxed flex-1">
              {t.desc}
            </p>
            <div className="flex items-center justify-between mt-auto">
              <span className="font-headline font-black text-3xl">{t.price}</span>
              <span className="font-label text-[10px] tracking-widest uppercase text-secondary font-bold group-hover:underline">
                {t.cta} →
              </span>
            </div>
          </Link>
        ))}
      </section>

      {/* ── Internship CTA ── */}
      <section className="mb-24">
        <div className="glass-card border-l-2 border-l-tertiary/60 p-10 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <div className="font-label text-tertiary text-[10px] tracking-[0.3em] uppercase mb-3 flex items-center gap-2">
              <span className="w-6 h-[1px] bg-tertiary" />
              Internship Programme
            </div>
            <h2 className="font-headline font-black text-3xl md:text-4xl tracking-tighter mb-4">
              Launch Your Cyber Career
            </h2>
            <p className="text-on-surface-variant leading-relaxed max-w-xl">
              Apply for a hands-on internship with the CyberSage team. Work alongside elite
              security researchers, gain real-world experience, and build a portfolio that stands
              out in the industry.
            </p>
          </div>
          <div className="flex-shrink-0 flex flex-col items-center gap-3">
            <button
              onClick={() => navigate('/training/internship')}
              className={`px-10 py-5 font-label text-sm uppercase tracking-widest font-bold transition-all whitespace-nowrap ${
                enrollmentOpen
                  ? 'bg-tertiary text-on-tertiary hover:brightness-110 shadow-[0_0_30px_rgba(68,216,241,0.25)]'
                  : 'bg-surface-container border border-outline-variant/40 text-on-surface-variant/60 cursor-not-allowed'
              }`}
              disabled={!enrollmentOpen}
            >
              {enrollmentOpen ? 'Enroll Now for Internship' : 'Enrollment Closed'}
            </button>
            {!enrollmentOpen && (
              <span className="inline-flex items-center gap-1.5 text-xs text-amber-400/80">
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
                Applications currently closed — check back soon
              </span>
            )}
          </div>
        </div>
      </section>

      {/* ── The Crucible ── */}
      <section>
        <div className="glass-card relative p-12 overflow-hidden flex flex-col md:flex-row items-center gap-16">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
          <div className="md:w-1/2 relative z-10">
            <h2 className="font-label text-secondary text-xs tracking-[0.5em] uppercase mb-4">Proprietary Tech</h2>
            <h3 className="text-5xl font-black tracking-tighter mb-6 uppercase">The Crucible</h3>
            <p className="text-on-surface-variant text-lg mb-8 leading-relaxed">
              Beyond the classroom lies the simulation. The Crucible is our dynamic battle
              environment that adapts to your skill level, throwing evolving AI-driven threat
              vectors at your defence infrastructure in real-time.
            </p>
            <ul className="space-y-4">
              {[
                ['bolt', 'Real-time latency-based stress testing'],
                ['psychology', 'Adaptive Adversary AI integration'],
                ['analytics', 'Frame-by-frame performance analytics'],
              ].map(([icon, text]) => (
                <li key={icon} className="flex gap-4">
                  <span className="material-symbols-outlined text-primary">{icon}</span>
                  <span className="text-sm font-medium">{text}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:w-1/2 relative">
            <div className="absolute -inset-10 bg-tertiary/20 blur-[100px] opacity-30 rounded-full" />
            <div className="relative bg-surface border border-outline-variant/30 p-2 overflow-hidden shadow-2xl">
              <img
                className="w-full aspect-video object-cover opacity-80 brightness-110"
                alt="Cyber battle simulation"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCtWPYSBZNPxiMe8a7vBPnatcxTevxV-Lhpc3z7XDaLT95WLv7UzZYltBbE954spYCYTU36TViiL3tava_AER0887vuz1926j3a7KeTVR-X_Od9O6v0ucw26TGLDlwzSJDYadFQR0Pmf9dRDysits99JgMI05XhQlfsw9vbm9UPdjZix0S7xo414OvOzu-cqssmzeLIsiYgrHNF0e7uSNjj4oNTlZTQM0kAiSBq_55YLCRFSSaA1lZCmqhj7wreilyuGf2XPY1FmYc"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent opacity-60" />
              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="font-label text-[8px] uppercase tracking-widest text-white">LIVE SIMULATION ACTIVE</span>
                </div>
                <span className="font-label text-[10px] text-primary">SYSTEM: NOMINAL</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
