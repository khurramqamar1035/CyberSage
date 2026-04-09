import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SERVICES = [
  {
    to: '/development-services/android',
    icon: 'android', iconColor: 'text-primary', iconBg: 'bg-primary-container/10',
    badge: 'KOTLIN', badgeLabel: 'Stack', badgeColor: 'text-primary',
    borderColor: 'border-l-primary/50', hoverTitle: 'group-hover:text-primary',
    title: 'Android Development',
    desc: 'Native ecosystems built with Kotlin and Material Design 3. Low-latency performance and robust hardware integration for the modern mobile frontier.',
    price: 'Custom Quote',
  },
  {
    to: '/development-services/ios',
    icon: 'ios', iconColor: 'text-tertiary', iconBg: 'bg-tertiary-container/10',
    badge: 'SWIFT', badgeLabel: 'Stack', badgeColor: 'text-tertiary',
    borderColor: 'border-l-tertiary/50', hoverTitle: 'group-hover:text-tertiary',
    title: 'iOS Development',
    desc: 'Precision-crafted Swift and SwiftUI interfaces that define the gold standard of mobile fluidity and security. Core Data, CryptoKit and Combine Framework.',
    price: 'Custom Quote',
  },
  {
    to: '/development-services/web',
    icon: 'language', iconColor: 'text-secondary', iconBg: 'bg-secondary-container/10',
    badge: 'FULL-STACK', badgeLabel: 'Stack', badgeColor: 'text-secondary',
    borderColor: 'border-l-secondary/50', hoverTitle: 'group-hover:text-secondary',
    title: 'Web Systems',
    desc: 'Responsive, scalable architectures built for enterprise-grade traffic and absolute uptime. Security-first engineering from frontend to infrastructure.',
    price: 'Custom Quote',
  },
  {
    to: '/development-services/cross-platform',
    icon: 'dynamic_feed', iconColor: 'text-primary', iconBg: 'bg-primary-container/10',
    badge: 'FLUTTER', badgeLabel: 'Stack', badgeColor: 'text-primary',
    borderColor: 'border-l-primary/50', hoverTitle: 'group-hover:text-primary',
    title: 'Cross-Platform',
    desc: 'Unified codebases using React Native and Flutter. Maximum reach across iOS and Android without compromising Sentry-grade security standards.',
    price: 'Custom Quote',
  },
];

export default function DevelopmentServices() {
  const navigate = useNavigate();

  return (
    <main className="pt-32 pb-24 px-6 md:px-12 max-w-[1440px] mx-auto">

      <header className="mb-20 max-w-4xl">
        <div className="font-label text-primary text-[10px] tracking-[0.3em] uppercase mb-4 flex items-center gap-2">
          <span className="w-8 h-[1px] bg-primary" />
          Advanced Engineering
        </div>
        <h1 className="font-headline font-black text-5xl md:text-7xl tracking-tighter mb-6 leading-none">
          ARCHITECTING <span className="text-primary">DIGITAL</span><br />SOVEREIGNTY
        </h1>
        <p className="text-on-surface-variant text-lg leading-relaxed max-w-2xl">
          High-performance application ecosystems engineered with military-grade precision. From
          low-level kernel optimisation to fluid Material experiences — we build the future of
          secure software.
        </p>
      </header>

      {/* ── Service Cards ── */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
        {SERVICES.map((s) => (
          <Link
            key={s.to}
            to={s.to}
            className={`glass-card p-8 group transition-all duration-300 tactical-glow border-l-2 ${s.borderColor} hover:-translate-y-1 flex flex-col`}
          >
            <div className="flex justify-between items-start mb-8">
              <div className={`p-3 ${s.iconBg} rounded-sm`}>
                <span className={`material-symbols-outlined ${s.iconColor} text-3xl`}>{s.icon}</span>
              </div>
              <div className="text-right">
                <div className="font-label text-on-surface-variant text-[10px] tracking-widest uppercase">{s.badgeLabel}</div>
                <div className={`font-bold text-sm ${s.badgeColor}`}>{s.badge}</div>
              </div>
            </div>
            <h3 className={`font-headline font-extrabold text-2xl mb-3 transition-colors ${s.hoverTitle}`}>
              {s.title}
            </h3>
            <p className="text-on-surface-variant text-sm mb-10 leading-relaxed flex-1">
              {s.desc}
            </p>
            <div className="flex items-center justify-between mt-auto">
              <span className="font-headline font-black text-xl">{s.price}</span>
              <span className="font-label text-[10px] tracking-widest uppercase text-secondary font-bold group-hover:underline">
                Start Project →
              </span>
            </div>
          </Link>
        ))}
      </section>

      {/* ── Blueprint Strategy ── */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
        <div>
          <div className="font-label text-secondary text-[10px] tracking-[0.3em] uppercase mb-4">Build Protocol</div>
          <h2 className="font-headline font-black text-4xl md:text-5xl tracking-tighter mb-6 uppercase">
            The Blueprint Strategy
          </h2>
          <p className="text-on-surface-variant mb-10 border-l-4 border-secondary pl-6 leading-relaxed">
            We don't just "code." We architect defensive layers and optimised execution paths.
            Every project begins with a 0-Trust security audit of the proposed tech stack.
          </p>
          <div className="space-y-6 mb-10">
            {[
              ['Phase 01', 'Inertial Design Analysis'],
              ['Phase 02', 'Kernel-Level Hardening'],
              ['Phase 03', 'UI/UX Fluidity Audit'],
            ].map(([phase, title]) => (
              <div key={phase} className="flex items-start gap-4">
                <span className="font-label text-[10px] text-primary uppercase tracking-[0.2em] mt-1 w-20 flex-shrink-0">{phase}</span>
                <p className="font-bold text-lg">{title}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => navigate('/contact')}
              className="bg-primary text-on-primary px-8 py-4 font-label text-[11px] tracking-widest uppercase font-bold hover:brightness-110 transition-all"
            >
              Start a Project
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="border border-outline-variant px-8 py-4 font-label text-[11px] tracking-widest uppercase font-bold text-on-surface hover:bg-surface-container-highest transition-all"
            >
              Contact Our Team
            </button>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-4 bg-primary/10 blur-[120px] rounded-full" />
          <div className="relative glass-card border border-white/5 p-10 flex items-center justify-center aspect-video">
            <div className="w-full h-full flex flex-col justify-between border border-dashed border-outline-variant p-4">
              <div className="flex justify-between">
                <div className="w-24 h-2 bg-primary/20" />
                <div className="w-12 h-12 rounded-full border-4 border-secondary/20 flex items-center justify-center">
                  <div className="w-4 h-4 bg-secondary rounded-full" />
                </div>
              </div>
              <div className="flex items-end gap-1">
                <div className="w-full h-12 bg-primary/10" />
                <div className="w-full h-32 bg-primary/20" />
                <div className="w-full h-24 bg-primary/30" />
                <div className="w-full h-40 bg-primary/40" />
                <div className="w-full h-20 bg-primary/20" />
              </div>
              <div className="text-[8px] font-label text-outline-variant">&#47;&#47; MONITORING_LATENCY_FEED_ACTIVE</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
