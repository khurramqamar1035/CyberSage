import React from 'react';

export default function RealTimeMonitoring() {
  return (
    <main className="pt-24 min-h-screen cyber-grid">
      {/* Hero Section */}
      <section className="max-w-screen-2xl mx-auto px-8 pt-16 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container-high border border-outline-variant/30 text-tertiary font-label text-[0.75rem] uppercase tracking-widest">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-tertiary"></span>
            </span>
            Sovereign Sentry Protocol Active
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none text-on-surface">
            Real-time <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-tertiary">Monitoring</span>
          </h1>
          <p className="text-on-surface-variant text-lg md:text-xl max-w-2xl leading-relaxed">
            A comprehensive 24/7 threat detection and alerting system engineered for sovereign infrastructure. We maintain constant vigilance over your digital perimeter.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <button className="bg-gradient-to-r from-primary-container to-primary/80 text-on-primary-container px-10 py-4 rounded-sm font-bold text-lg hover:shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all">
              Initiate Protocol
            </button>
            <div className="flex flex-col justify-center px-6">
              <span className="font-label text-[0.7rem] text-slate-500 tracking-widest uppercase">Subscription Fee</span>
              <span className="text-2xl font-bold text-secondary-fixed-dim">$99/mo</span>
            </div>
          </div>
        </div>
        <div className="lg:col-span-5 relative">
          <div className="glass-panel p-1 aspect-square rounded-sm overflow-hidden relative group">
            <img className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-700" alt="Futuristic server room with blue neon fiber optic lights glowing in a dark data center, high-tech security atmosphere" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBuBVjZkMbrL0HN6JUJCJ_urezyzRlkwSHFtPIiYUrczj0jsyIE7CdVHZJr5DJfejqtbs16niP1E9wB1P-TCWHymLZXFDRPIeLvEpLjtT6sA-E26Rw2CoNDUe9ra7DwHC0wqZKzj6I7EceOahCkv_xKiNLPdNLSOrH_teDmPrbFBZBzgZfuSHCZwRPEJf-dx_zihi8ko6WN1J-7PTeULql9EoP3svhpEHBv6M5Fp2p9IZtTIyvGIIGcFav8VyHYwypT8lkGHLCU5EE" />
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent"></div>
            {/* HUD Overlays */}
            <div className="absolute top-8 left-8 space-y-2">
              <div className="w-32 h-[1px] bg-primary/40"></div>
              <div className="font-label text-[0.6rem] text-primary tracking-widest">SYSTEM_SCANNING_V.4.2</div>
            </div>
            <div className="absolute bottom-8 right-8 text-right">
              <div className="font-label text-[2rem] font-bold text-on-surface/20 leading-none">00:00:00</div>
              <div className="font-label text-[0.6rem] text-slate-500 tracking-widest">UPTIME_CONTINUITY</div>
            </div>
          </div>
          {/* Ambient Glow behind image */}
          <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-primary/10 blur-[120px] rounded-full"></div>
        </div>
      </section>

      {/* Bento Features Grid */}
      <section className="max-w-screen-2xl mx-auto px-8 py-24 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="font-label text-[0.75rem] text-secondary tracking-[0.2em] uppercase mb-2">Core Capabilities</h2>
            <h3 className="text-3xl font-bold text-on-surface">Uncompromising Oversight</h3>
          </div>
          <div className="h-[1px] flex-grow bg-outline-variant/20 hidden md:block mx-12 mb-4"></div>
          <div className="font-label text-[0.75rem] text-slate-500 uppercase tracking-widest">Delivery: Instant Setup</div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {/* 24/7 Monitoring */}
          <div className="md:col-span-2 lg:col-span-2 glass-panel p-8 space-y-6 group hover:bg-surface-container-highest transition-colors duration-300">
            <span className="material-symbols-outlined text-4xl text-primary">visibility</span>
            <div className="space-y-3">
              <h4 className="text-xl font-bold text-on-surface">24/7 Monitoring</h4>
              <p className="text-sm text-on-surface-variant leading-relaxed">Continuous algorithmic surveillance of your entire infrastructure stack, identifying anomalies before they escalate.</p>
            </div>
          </div>

          {/* Instant Alerts */}
          <div className="md:col-span-2 lg:col-span-2 glass-panel p-8 space-y-6 border-l-2 border-l-secondary-container bg-surface-container-low group hover:bg-surface-container-highest transition-colors duration-300">
            <span className="material-symbols-outlined text-4xl text-secondary">notification_important</span>
            <div className="space-y-3">
              <h4 className="text-xl font-bold text-on-surface">Instant Alerts</h4>
              <p className="text-sm text-on-surface-variant leading-relaxed">Real-time notification via secure channels (Slack, PagerDuty, SMS) the millisecond a threat is validated.</p>
            </div>
          </div>

          {/* Monthly Reports */}
          <div className="md:col-span-2 lg:col-span-2 glass-panel p-8 space-y-6 group hover:bg-surface-container-highest transition-colors duration-300">
            <span className="material-symbols-outlined text-4xl text-tertiary">assessment</span>
            <div className="space-y-3">
              <h4 className="text-xl font-bold text-on-surface">Monthly Reports</h4>
              <p className="text-sm text-on-surface-variant leading-relaxed">Deep-dive intelligence briefings summarizing all neutralized threats and infrastructure health trends.</p>
            </div>
          </div>

          {/* Large Bento Visual Component */}
          <div className="md:col-span-4 lg:col-span-4 glass-panel min-h-[320px] relative overflow-hidden flex flex-col justify-end p-10 bg-surface-container-low">
            <div className="absolute inset-0 z-0">
              <img className="w-full h-full object-cover opacity-20 group-hover:scale-105 transition-transform duration-[2000ms]" alt="Abstract data visualization with flowing cyan and blue lines representing network traffic on a dark professional background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA95T4zf_dkZjcdd9BOMXH6MsnWnD2mVrxxOkkymSrbBXfud2AFusjI5bvBI5GAqxRAn8W731zTTE9K-Xg2mzEs9drOYqRvn-a9S_vGVNH2Ddd1GfoYB8G5byEJ_BGn0slifsZTKxShNkhtiPkyu9-yVnGLxFrNoMwcnRp4DfaZrECUcaljtwygqOv2NZj7Mz41FzRrp3nS3EYvZVywCofWIPnjZwBHhxFchyqw2_GqJtsxolVi49pvQ9padpM7g18FvKwCPuWiHl0" />
            </div>
            <div className="relative z-10 max-w-xl space-y-4">
              <div className="font-label text-[0.65rem] text-primary-fixed tracking-[0.3em] uppercase">The Sentry Advantage</div>
              <h4 className="text-2xl font-bold text-on-surface">Threat Detection that Evolves with the Adversary</h4>
              <p className="text-on-surface-variant">Our system doesn't just watch; it learns. Using neural network behavioral analysis, we isolate zero-day patterns before they compromise your data integrity.</p>
            </div>
          </div>

          {/* Setup Info */}
          <div className="md:col-span-2 lg:col-span-2 glass-panel p-8 bg-primary-container/10 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center">
                <span className="material-symbols-outlined text-on-primary-container">bolt</span>
              </div>
              <h4 className="text-xl font-bold text-on-surface">Instant Setup</h4>
            </div>
            <div className="space-y-4">
              <p className="text-sm text-on-surface-variant">Automated deployment via our CLI or cloud provider integrations. Be operational in under 3 minutes.</p>
              <button className="inline-flex items-center gap-2 text-primary font-label text-xs uppercase tracking-widest hover:gap-4 transition-all">
                View Documentation <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-screen-2xl mx-auto px-8 py-32">
        <div className="relative glass-panel bg-[#0c1324] border border-primary/20 p-16 text-center space-y-8 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-on-surface max-w-2xl mx-auto">
            Secure Your Perimeter Today
          </h2>
          <p className="text-on-surface-variant text-lg max-w-xl mx-auto">
            Join the network of protected infrastructure. Deploy the Sentry Protocol for $99/mo and gain total visibility.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-4">
            <button className="w-full md:w-auto bg-primary-container text-on-primary-container px-12 py-5 rounded-sm font-bold text-lg hover:brightness-110 shadow-[0_0_30px_rgba(37,99,235,0.4)]">
              Initiate Protocol
            </button>
            <button className="w-full md:w-auto px-12 py-5 rounded-sm font-label text-sm uppercase tracking-widest border border-outline-variant/30 hover:bg-surface-container-highest transition-colors">
              View Demo Interface
            </button>
          </div>
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-tertiary/5 blur-[100px] rounded-full"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary/5 blur-[100px] rounded-full"></div>
        </div>
      </section>
    </main>
  );
}
