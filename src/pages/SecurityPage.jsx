import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SERVICES = [
  {
    to: '/security-services/ai-audit',
    icon: 'psychology', iconColor: 'text-primary', iconBg: 'bg-primary-container/10',
    badge: '24H', badgeLabel: 'Response', badgeColor: 'text-primary',
    borderColor: 'border-l-primary/50',
    hoverTitle: 'group-hover:text-primary',
    title: 'AI Security Audit',
    desc: 'Comprehensive evaluation of neural networks and automated decision systems for bias, leakage, and adversarial vulnerabilities.',
    price: '$20',
  },
  {
    to: '/security-services/vulnerability-assessment',
    icon: 'policy', iconColor: 'text-tertiary', iconBg: 'bg-tertiary-container/10',
    badge: '48H', badgeLabel: 'Response', badgeColor: 'text-tertiary',
    borderColor: 'border-l-tertiary/50',
    hoverTitle: 'group-hover:text-tertiary',
    title: 'Vulnerability Assessment',
    desc: 'Automated and manual perimeter scanning to identify exploitable entry points across your entire infrastructure stack.',
    price: '$50',
  },
  {
    to: '/security-services/penetration-testing',
    icon: 'shield_person', iconColor: 'text-secondary', iconBg: 'bg-secondary-container/10',
    badge: '5D', badgeLabel: 'Duration', badgeColor: 'text-secondary',
    borderColor: 'border-l-secondary/50',
    hoverTitle: 'group-hover:text-secondary',
    title: 'Penetration Testing',
    desc: 'Simulated high-tier cyber offensive using Red Team protocols to pressure-test your real-world response and mitigation capabilities.',
    price: '$150',
  },
  {
    to: '/security-services/real-time-monitoring',
    icon: 'monitoring', iconColor: 'text-primary', iconBg: 'bg-primary-container/10',
    badge: 'PER/MO', badgeLabel: 'Cycle', badgeColor: 'text-primary',
    borderColor: 'border-l-primary/50',
    hoverTitle: 'group-hover:text-primary',
    title: 'Real-time Monitoring',
    desc: 'Continuous 24/7 observation of network traffic and system logs with instant notification of anomalous pattern detection.',
    price: '$99',
    priceSuffix: '/MO',
  },
  {
    to: '/security-services/security-consultation',
    icon: 'support_agent', iconColor: 'text-tertiary', iconBg: 'bg-tertiary-container/10',
    badge: 'PER/HR', badgeLabel: 'Unit', badgeColor: 'text-tertiary',
    borderColor: 'border-l-tertiary/50',
    hoverTitle: 'group-hover:text-tertiary',
    title: 'Security Consultation',
    desc: 'Expert advisory sessions focusing on architecture hardening, risk mitigation strategies, and high-level defense planning.',
    price: '$75',
  },
  {
    to: '/security-services/compliance-audit',
    icon: 'fact_check', iconColor: 'text-secondary', iconBg: 'bg-secondary-container/10',
    badge: '7D', badgeLabel: 'Duration', badgeColor: 'text-secondary',
    borderColor: 'border-l-secondary/50',
    hoverTitle: 'group-hover:text-secondary',
    title: 'Compliance Audit',
    desc: 'Rigorous alignment verification with SOC2, GDPR, and HIPAA frameworks to ensure your operational legality and data integrity.',
    price: '$200',
  },
];

export default function SecurityServices() {
  const navigate = useNavigate();

  return (
    <main className="pt-32 pb-24 px-6 md:px-12 max-w-[1440px] mx-auto">
      <header className="mb-20 max-w-4xl">
        <div className="font-label text-secondary text-[10px] tracking-[0.3em] uppercase mb-4 flex items-center gap-2">
          <span className="w-8 h-[1px] bg-secondary" />
          Sovereign Sentry Protocols
        </div>
        <h1 className="font-headline font-black text-5xl md:text-7xl tracking-tighter mb-6 leading-none italic">
          TACTICAL <span className="text-primary not-italic">INTELLIGENCE</span>
        </h1>
        <p className="text-on-surface-variant text-lg leading-relaxed max-w-2xl">
          Advanced defensive frameworks engineered for the modern threat landscape. From AI-driven
          audits to elite penetration testing, we deploy surgical precision to secure your digital
          sovereignty.
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                <div className={`font-bold ${s.badgeColor}`}>{s.badge}</div>
              </div>
            </div>
            <h3 className={`font-headline font-extrabold text-2xl mb-2 transition-colors ${s.hoverTitle}`}>
              {s.title}
            </h3>
            <p className="text-on-surface-variant text-sm mb-10 leading-relaxed min-h-[4.5rem] flex-1">
              {s.desc}
            </p>
            <div className="flex items-center justify-between mt-auto">
              <div className="flex items-baseline gap-1">
                <span className="font-headline font-black text-3xl">{s.price}</span>
                {s.priceSuffix && (
                  <span className="text-[10px] font-label text-on-surface-variant">{s.priceSuffix}</span>
                )}
              </div>
              <span className="font-label text-[10px] tracking-widest uppercase text-secondary font-bold group-hover:underline">
                Deploy Unit →
              </span>
            </div>
          </Link>
        ))}
      </section>
      {/* ── CINEMATIC VIDEO SECTION ── */}
{/* ── CINEMATIC VIDEO SECTION (CTA ALIGNED) ── */}
<section className="mt-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

  {/* LEFT: VIDEO (same style as CTA image) */}
  <div className="relative overflow-hidden aspect-video rounded-sm">
    <video
      className="w-full h-full object-cover"
      src="https://res.cloudinary.com/dnwxa1jvf/video/upload/v1775703611/sage-sentinel_tnkzg3.mp4"
      autoPlay
      loop
      muted
      playsInline
    />

    {/* Same overlay style as CTA */}
    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

    {/* Subtle tactical touch (kept minimal to match CTA) */}
    <div className="absolute bottom-3 left-3 text-[10px] font-label tracking-widest uppercase text-primary">
      Live Feed
    </div>
  </div>

  {/* RIGHT: CONTENT (same spacing as CTA) */}
  <div className="lg:pl-12">
    <div className="font-label text-primary text-[10px] tracking-[0.3em] uppercase mb-4">
      Sage Sentinel
    </div>

    <h2 className="font-headline font-bold text-4xl mb-6 tracking-tight">
      Defense in Motion
    </h2>

    <p className="text-on-surface-variant mb-8 leading-relaxed">
      Real-time cyber defense, precision surveillance, and rapid threat response engineered
      for high-risk digital environments. Every layer is designed to detect, isolate, and
      neutralize hostile activity before it escalates.
    </p>

    <div className="flex flex-wrap gap-4">
      <button
        onClick={() => navigate('/contact')}
        className="bg-primary text-on-primary px-8 py-4 font-label text-[11px] tracking-widest uppercase font-bold hover:brightness-110 transition-all"
      >
        Request Tactical Briefing
      </button>

      <button
        onClick={() => navigate('/security-services/real-time-monitoring')}
        className="border border-outline-variant px-8 py-4 font-label text-[11px] tracking-widest uppercase font-bold text-on-surface hover:bg-surface-container-highest transition-all"
      >
        Explore Monitoring
      </button>
    </div>
  </div>

</section>

      {/* ── CTA Section ── */}
      <section className="mt-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="relative overflow-hidden aspect-video rounded-sm">
          <img
            className="w-full h-full object-cover grayscale brightness-50 opacity-60"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0ft1g-1KZAFm0sRTGHfEDhJwnnLKjOplYKUe-7ppH6L0nffwfLRw3oUZQLd4T7eDm8srK9b3OG3CfPnmZqhYL8ECyFa1yEgZdtN2PJFkEyCnl59ePgKb6fhdvOzSbxmlyfLhlf_cg014Yp5lNG6mPWoW44h3qTe_8cW41VhvhdrRWKt8nNP-nF5xifcciz6fYlX0S0cJ5TbgcYh8H_7no-Z3Fqatlv2fzTVJ6Xisfd1uktREUBmYpNR1M9ChGUg85rFpktovOVTw"
            alt="high-tech circuit board server room"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>
        <div className="lg:pl-12">
          <div className="font-label text-primary text-[10px] tracking-[0.3em] uppercase mb-4">Operation Lockdown</div>
          <h2 className="font-headline font-bold text-4xl mb-6 tracking-tight">Need a Bespoke Defense Strategy?</h2>
          <p className="text-on-surface-variant mb-8 leading-relaxed">
            For enterprise-scale operations or specialized mission profiles, our Core Team designs
            custom defensive meshes that evolve with your threat vector. Contact our tactical
            advisors for a sensitive briefing.
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => navigate('/contact')}
              className="bg-primary text-on-primary px-8 py-4 font-label text-[11px] tracking-widest uppercase font-bold hover:brightness-110 transition-all"
            >
              Secure Consultation
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="border border-outline-variant px-8 py-4 font-label text-[11px] tracking-widest uppercase font-bold text-on-surface hover:bg-surface-container-highest transition-all"
            >
              Contact Our Team
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
