import React from 'react';
import { Link } from 'react-router-dom';

export default function SecurityServices() {
  return (
    <main className="pt-32 pb-24 px-6 md:px-12 max-w-[1440px] mx-auto">
      <header className="mb-20 max-w-4xl">
        <div className="font-label text-secondary text-[10px] tracking-[0.3em] uppercase mb-4 flex items-center gap-2">
          <span className="w-8 h-[1px] bg-secondary"></span>
          Sovereign Sentry Protocols
        </div>
        <h1 className="font-headline font-black text-5xl md:text-7xl tracking-tighter mb-6 leading-none italic">
          TACTICAL <span className="text-primary not-italic">INTELLIGENCE</span>
        </h1>
        <p className="text-on-surface-variant text-lg leading-relaxed max-w-2xl">
          Advanced defensive frameworks engineered for the modern threat landscape. From AI-driven audits to elite penetration testing, we deploy surgical precision to secure your digital sovereignty.
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="glass-card p-8 group transition-all duration-500 tactical-glow border-l-2 border-l-primary/50">
          <div className="flex justify-between items-start mb-8">
            <div className="p-3 bg-primary-container/10 rounded-sm">
              <span className="material-symbols-outlined text-primary text-3xl" data-icon="psychology">psychology</span>
            </div>
            <div className="text-right">
              <div className="font-label text-on-surface-variant text-[10px] tracking-widest uppercase">Response</div>
              <div className="font-bold text-primary">24H</div>
            </div>
          </div>
          <h3 className="font-headline font-extrabold text-2xl mb-2 group-hover:text-primary transition-colors">AI Security Audit</h3>
          <p className="text-on-surface-variant text-sm mb-10 leading-relaxed min-h-[4.5rem]">
            Comprehensive evaluation of neural networks and automated decision systems for bias, leakage, and adversarial vulnerabilities.
          </p>
          <div className="flex items-center justify-between mt-auto">
            <span className="font-headline font-black text-3xl">$20</span>
            <Link to="/security-services/ai-audit" className="font-label text-[10px] tracking-widest uppercase text-secondary font-bold hover:underline">Deploy Unit</Link>
          </div>
        </div>

        <div className="glass-card p-8 group transition-all duration-500 tactical-glow border-l-2 border-l-tertiary/50">
          <div className="flex justify-between items-start mb-8">
            <div className="p-3 bg-tertiary-container/10 rounded-sm">
              <span className="material-symbols-outlined text-tertiary text-3xl" data-icon="policy">policy</span>
            </div>
            <div className="text-right">
              <div className="font-label text-on-surface-variant text-[10px] tracking-widest uppercase">Response</div>
              <div className="font-bold text-tertiary">48H</div>
            </div>
          </div>
          <h3 className="font-headline font-extrabold text-2xl mb-2 group-hover:text-tertiary transition-colors">Vulnerability Assessment</h3>
          <p className="text-on-surface-variant text-sm mb-10 leading-relaxed min-h-[4.5rem]">
            Automated and manual perimeter scanning to identify exploitable entry points across your entire infrastructure stack.
          </p>
          <div className="flex items-center justify-between mt-auto">
            <span className="font-headline font-black text-3xl">$50</span>
            <Link to="/security-services/vulnerability-assessment" className="font-label text-[10px] tracking-widest uppercase text-secondary font-bold hover:underline">Deploy Unit</Link>
          </div>
        </div>

        <div className="glass-card p-8 group transition-all duration-500 tactical-glow border-l-2 border-l-secondary/50">
          <div className="flex justify-between items-start mb-8">
            <div className="p-3 bg-secondary-container/10 rounded-sm">
              <span className="material-symbols-outlined text-secondary text-3xl" data-icon="shield_person">shield_person</span>
            </div>
            <div className="text-right">
              <div className="font-label text-on-surface-variant text-[10px] tracking-widest uppercase">Duration</div>
              <div className="font-bold text-secondary">5D</div>
            </div>
          </div>
          <h3 className="font-headline font-extrabold text-2xl mb-2 group-hover:text-secondary transition-colors">Penetration Testing</h3>
          <p className="text-on-surface-variant text-sm mb-10 leading-relaxed min-h-[4.5rem]">
            Simulated high-tier cyber offensive using Red Team protocols to pressure-test your real-world response and mitigation capabilities.
          </p>
          <div className="flex items-center justify-between mt-auto">
            <span className="font-headline font-black text-3xl">$150</span>
            <Link to="/security-services/penetration-testing" className="font-label text-[10px] tracking-widest uppercase text-secondary font-bold hover:underline">Deploy Unit</Link>
          </div>
        </div>

        <div className="glass-card p-8 group transition-all duration-500 tactical-glow border-l-2 border-l-primary/50">
          <div className="flex justify-between items-start mb-8">
            <div className="p-3 bg-primary-container/10 rounded-sm">
              <span className="material-symbols-outlined text-primary text-3xl" data-icon="monitoring">monitoring</span>
            </div>
            <div className="text-right">
              <div className="font-label text-on-surface-variant text-[10px] tracking-widest uppercase">Cycle</div>
              <div className="font-bold text-primary">PER/MO</div>
            </div>
          </div>
          <h3 className="font-headline font-extrabold text-2xl mb-2 group-hover:text-primary transition-colors">Real-time Monitoring</h3>
          <p className="text-on-surface-variant text-sm mb-10 leading-relaxed min-h-[4.5rem]">
            Continuous 24/7 observation of network traffic and system logs with instant notification of anomalous pattern detection.
          </p>
          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-baseline">
              <span className="font-headline font-black text-3xl">$99</span>
              <span className="text-[10px] font-label text-on-surface-variant ml-1">/MO</span>
            </div>
            <Link to="/security-services/real-time-monitoring" className="font-label text-[10px] tracking-widest uppercase text-secondary font-bold hover:underline">Deploy Unit</Link>
          </div>
        </div>

        <div className="glass-card p-8 group transition-all duration-500 tactical-glow border-l-2 border-l-tertiary/50">
          <div className="flex justify-between items-start mb-8">
            <div className="p-3 bg-tertiary-container/10 rounded-sm">
              <span className="material-symbols-outlined text-tertiary text-3xl" data-icon="support_agent">support_agent</span>
            </div>
            <div className="text-right">
              <div className="font-label text-on-surface-variant text-[10px] tracking-widest uppercase">Unit</div>
              <div className="font-bold text-tertiary">PER/HR</div>
            </div>
          </div>
          <h3 className="font-headline font-extrabold text-2xl mb-2 group-hover:text-tertiary transition-colors">Security Consultation</h3>
          <p className="text-on-surface-variant text-sm mb-10 leading-relaxed min-h-[4.5rem]">
            Expert advisory sessions focusing on architecture hardening, risk mitigation strategies, and high-level defense planning.
          </p>
          <div className="flex items-center justify-between mt-auto">
            <span className="font-headline font-black text-3xl">$75</span>
            <Link to="/security-services/security-consultation" className="font-label text-[10px] tracking-widest uppercase text-secondary font-bold hover:underline">Deploy Unit</Link>
          </div>
        </div>

        <div className="glass-card p-8 group transition-all duration-500 tactical-glow border-l-2 border-l-secondary/50">
          <div className="flex justify-between items-start mb-8">
            <div className="p-3 bg-secondary-container/10 rounded-sm">
              <span className="material-symbols-outlined text-secondary text-3xl" data-icon="fact_check">fact_check</span>
            </div>
            <div className="text-right">
              <div className="font-label text-on-surface-variant text-[10px] tracking-widest uppercase">Duration</div>
              <div className="font-bold text-secondary">7D</div>
            </div>
          </div>
          <h3 className="font-headline font-extrabold text-2xl mb-2 group-hover:text-secondary transition-colors">Compliance Audit</h3>
          <p className="text-on-surface-variant text-sm mb-10 leading-relaxed min-h-[4.5rem]">
            Rigorous alignment verification with SOC2, GDPR, and HIPAA frameworks to ensure your operational legality and data integrity.
          </p>
          <div className="flex items-center justify-between mt-auto">
            <span className="font-headline font-black text-3xl">$200</span>
            <Link to="/security-services/compliance-audit" className="font-label text-[10px] tracking-widest uppercase text-secondary font-bold hover:underline">Deploy Unit</Link>
          </div>
        </div>
      </section>

      <section className="mt-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="relative overflow-hidden aspect-video rounded-sm">
          <img className="w-full h-full object-cover grayscale brightness-50 opacity-60" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0ft1g-1KZAFm0sRTGHfEDhJwnnLKjOplYKUe-7ppH6L0nffwfLRw3oUZQLd4T7eDm8srK9b3OG3CfPnmZqhYL8ECyFa1yEgZdtN2PJFkEyCnl59ePgKb6fhdvOzSbxmlyfLhlf_cg014Yp5lNG6mPWoW44h3qTe_8cW41VhvhdrRWKt8nNP-nF5xifcciz6fYlX0S0cJ5TbgcYh8H_7no-Z3Fqatlv2fzTVJ6Xisfd1uktREUBmYpNR1M9ChGUg85rFpktovOVTw" alt="abstract high-tech circuit board with glowing blue lines and neon data pulses in a dark futuristic server room" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
        </div>
        <div className="lg:pl-12">
          <div className="font-label text-primary text-[10px] tracking-[0.3em] uppercase mb-4">Operation Lockdown</div>
          <h2 className="font-headline font-bold text-4xl mb-6 tracking-tight">Need a Bespoke Defense Strategy?</h2>
          <p className="text-on-surface-variant mb-8 leading-relaxed">
            For enterprise-scale operations or specialized mission profiles, our Core Team designs custom defensive meshes that evolve with your threat vector. Contact our tactical advisors for a sensitive briefing.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-primary text-on-primary px-8 py-4 font-label text-[11px] tracking-widest uppercase font-bold hover:brightness-110 transition-all">Secure Consultation</button>
            <button className="border border-outline-variant px-8 py-4 font-label text-[11px] tracking-widest uppercase font-bold text-on-surface hover:bg-surface-container-highest transition-all">Download Protocol PDF</button>
          </div>
        </div>
      </section>
    </main>
  );
}
