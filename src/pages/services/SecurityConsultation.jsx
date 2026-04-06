import React from 'react';

export default function SecurityConsultation() {
  return (
    <main className="pt-24 pb-20">
      {/* Hero Section */}
      <section className="px-8 max-w-screen-2xl mx-auto mb-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7">
          <div className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high border border-outline-variant/20">
            <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
            <span className="font-label text-[0.65rem] uppercase tracking-[0.2em] text-tertiary">Strategic Assessment Active</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-black font-headline tracking-tighter text-on-surface mb-6 leading-[0.9]">
            Security <br/><span className="text-primary-fixed-dim">Consultation</span>
          </h1>
          <p className="text-lg text-on-surface-variant max-w-xl font-light leading-relaxed mb-8">
            Forge an impenetrable defensive perimeter with elite-tier strategic oversight. Our Sovereign Sentry protocol ensures your digital assets remain beyond the reach of adversarial entities through meticulous, high-fidelity consultation.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-primary-container text-on-primary-container px-8 py-4 font-label font-black uppercase tracking-widest flex items-center gap-3 cyber-glow hover:scale-[1.02] transition-transform">
              Initiate Protocol
              <span className="material-symbols-outlined text-xl">security</span>
            </button>
            <div className="flex flex-col justify-center px-6">
              <span className="font-label text-[0.65rem] text-slate-500 uppercase tracking-widest">Investment</span>
              <span className="text-2xl font-black font-headline text-secondary">$75.00 <span className="text-sm font-normal text-slate-500">/ Session</span></span>
            </div>
          </div>
        </div>
        <div className="lg:col-span-5 relative">
          <div className="absolute -inset-4 bg-primary/10 blur-[100px] rounded-full"></div>
          <div className="glass-card aspect-square w-full rounded-sm overflow-hidden relative group">
            <img className="w-full h-full object-cover mix-blend-overlay opacity-60 group-hover:scale-110 transition-transform duration-700" alt="Close-up of a high-tech computer server rack with glowing blue and cyan LED lights in a dark data center environment" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBE5kH6UCwICUj_XgPaABjZkDEJK4hDhQSyne5bZCjXPaXnJvmDg17641cCQUqNqNniO1FjOSv3tJcowTSUN9xXRekP7Ml3f0k0ecVy3He9OsiCEO_4eQEp_5lRLB_r_tJEeyNtF1tzi3Yq_jpQwR_cXeYNeYwKC-RXFZwQPZwZ9hG9u0iju9c3pcww3aTdUOfSQm2PKM_x4na8p5zCJU0Mx2rpT5SO0tx1VA9Z4UoN57l1nfCbkAJ_Eh4BALuDyMgmxUlS4IiYKEI" />
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent"></div>
            <div className="absolute bottom-8 left-8 right-8">
              <div className="p-6 bg-surface-container-highest/80 backdrop-blur-md rounded-sm border-l-2 border-secondary">
                <span className="font-label text-[0.7rem] text-secondary tracking-widest block mb-2">LIVE THREAT MAP</span>
                <div className="h-1 w-full bg-outline-variant/30 rounded-full overflow-hidden">
                  <div className="h-full bg-secondary w-2/3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Features */}
      <section className="px-8 max-w-screen-2xl mx-auto mb-32">
        <h2 className="font-label text-[0.75rem] uppercase tracking-[0.3em] text-slate-500 mb-12 text-center">Protocol Specifications</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {/* Main Feature */}
          <div className="md:col-span-4 lg:col-span-3 glass-card p-10 flex flex-col justify-between group">
            <div>
              <span className="material-symbols-outlined text-4xl text-primary mb-6">psychology</span>
              <h3 className="text-3xl font-bold font-headline mb-4">Expert Guidance</h3>
              <p className="text-on-surface-variant leading-relaxed">Tailored security architecture designed specifically for your organizational ecosystem. No generic templates, only bespoke strategic deployment.</p>
            </div>
            <div className="mt-8 pt-8 border-t border-outline-variant/20 flex items-center justify-between">
              <span className="font-label text-[0.7rem] uppercase tracking-widest text-slate-400">Status: Mission Ready</span>
              <span className="material-symbols-outlined text-primary-fixed-dim">arrow_forward</span>
            </div>
          </div>

          {/* Secondary Feature */}
          <div className="md:col-span-2 lg:col-span-3 glass-card p-10 flex flex-col justify-between">
            <div>
              <span className="material-symbols-outlined text-4xl text-secondary mb-6">person_pin</span>
              <h3 className="text-3xl font-bold font-headline mb-4">One-on-One</h3>
              <p className="text-on-surface-variant leading-relaxed">Direct access to elite Sovereign Sentry operatives. Real-time problem solving and secure communication channels.</p>
            </div>
            <div className="mt-8 flex gap-2">
              <div className="h-1 flex-1 bg-secondary/20 rounded-full"></div>
              <div className="h-1 flex-1 bg-secondary/20 rounded-full"></div>
              <div className="h-1 flex-1 bg-secondary rounded-full"></div>
            </div>
          </div>

          {/* Small Grid Items */}
          <div className="md:col-span-2 lg:col-span-2 bg-surface-container-low p-8 border-l-2 border-tertiary">
            <span className="material-symbols-outlined text-tertiary mb-4">analytics</span>
            <h4 className="font-bold font-headline mb-2">Custom Strategy</h4>
            <p className="text-sm text-on-surface-variant">Deep-dive technical roadmaps for immediate implementation.</p>
          </div>
          <div className="md:col-span-2 lg:col-span-2 bg-surface-container-low p-8 border-l-2 border-primary">
            <span className="material-symbols-outlined text-primary mb-4">support</span>
            <h4 className="font-bold font-headline mb-2">Implementation</h4>
            <p className="text-sm text-on-surface-variant">End-to-end support throughout the integration lifecycle.</p>
          </div>
          <div className="md:col-span-4 lg:col-span-2 bg-surface-container-low p-8 border-l-2 border-secondary">
            <span className="material-symbols-outlined text-secondary mb-4">schedule</span>
            <h4 className="font-bold font-headline mb-2">Flexible Delivery</h4>
            <p className="text-sm text-on-surface-variant">Deployable according to your operational schedule and timezone.</p>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-surface-container-low py-32 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent"></div>
        <div className="px-8 max-w-screen-2xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row gap-20 items-start">
            <div className="lg:w-1/3 sticky top-32">
              <h2 className="text-4xl font-black font-headline tracking-tight mb-6">The Sovereign <br/>Lifecycle</h2>
              <p className="text-on-surface-variant mb-8">Our approach is iterative and relentless. We don't just advise; we calibrate your entire security posture for long-term resilience.</p>
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-primary font-label text-sm tracking-widest uppercase">
                  <span className="w-12 h-[1px] bg-primary"></span>
                  Phase 01: Reconnaissance
                </div>
                <div className="flex items-center gap-4 text-slate-600 font-label text-sm tracking-widest uppercase">
                  <span className="w-12 h-[1px] bg-slate-800"></span>
                  Phase 02: Fortification
                </div>
                <div className="flex items-center gap-4 text-slate-600 font-label text-sm tracking-widest uppercase">
                  <span className="w-12 h-[1px] bg-slate-800"></span>
                  Phase 03: Validation
                </div>
              </div>
            </div>

            <div className="lg:w-2/3 grid grid-cols-1 gap-12">
              <div className="glass-card p-12 relative overflow-hidden">
                <div className="absolute -top-10 -right-10 text-[10rem] font-black text-white/5 pointer-events-none font-headline">01</div>
                <h4 className="text-2xl font-bold mb-4 font-headline">Threat Surface Mapping</h4>
                <p className="text-on-surface-variant leading-relaxed">We identify every possible vector of ingress and systemic vulnerability within your current digital footprint. This is the foundation of the Sovereign Sentry protocol.</p>
              </div>
              <div className="bg-surface-container-highest/30 p-12 relative overflow-hidden">
                <div class="absolute -top-10 -right-10 text-[10rem] font-black text-white/5 pointer-events-none font-headline">02</div>
                <h4 className="text-2xl font-bold mb-4 font-headline">Strategic Redlining</h4>
                <p className="text-on-surface-variant leading-relaxed">Collaborative drafting of the Custom Security Strategy. We stress-test each proposed protocol against simulated state-level adversarial patterns.</p>
              </div>
              <div className="bg-surface-container-highest/30 p-12 relative overflow-hidden">
                <div className="absolute -top-10 -right-10 text-[10rem] font-black text-white/5 pointer-events-none font-headline">03</div>
                <h4 className="text-2xl font-bold mb-4 font-headline">Operational Handoff</h4>
                <p className="text-on-surface-variant leading-relaxed">Execution of Implementation Support. We ensure your team is equipped to maintain the high-security state established during the consultation.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-8 max-w-screen-2xl mx-auto my-32">
        <div className="glass-card p-16 rounded-sm text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <img className="w-full h-full object-cover" alt="Abstract digital network visualization with interconnected lines and points glowing over a dark blue background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDiX03EwT21GklSW4wrMbgPZAPhNVUJfEV7ucTI9uIoG6eezeF1NZqTJn2S3im5xcNEMVA4TOga6Ka4h3RdU70VymMseBc4GJ_4z5xIWReE9oNp88XkDmWbUo3aX1eVcXocEAyqo4BoU_A6gZam-HE-ctNvhRaDjAajwlLvwvffdPl9hMnHccL4nffQXgXGeqBvrX1IO8-pBGqukn0NUFLTQWmtOyJoA4X0Xc_TlrJBQ_XzIuEApr9_AdVMym9smITn4Pdy_6XbXvA" />
          </div>
          <div className="relative z-10">
            <h2 className="text-4xl lg:text-5xl font-black font-headline tracking-tighter mb-6 uppercase">Ready for Deployment?</h2>
            <p className="text-on-surface-variant max-w-2xl mx-auto mb-10 text-lg">Secure your slot in the next operational cycle. The North Star is waiting for your signal.</p>
            <button className="bg-primary-container text-on-primary-container px-12 py-5 font-label font-black uppercase tracking-[0.3em] rounded-sm hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] transition-all">
              Initiate Protocol
            </button>
            <div className="mt-8 flex justify-center items-center gap-8 text-slate-500 font-label text-[0.65rem] uppercase tracking-widest">
              <span className="flex items-center gap-2"><span className="material-symbols-outlined text-sm">encrypted</span> Encrypted Link</span>
              <span className="flex items-center gap-2"><span className="material-symbols-outlined text-sm">verified_user</span> Sovereign Verified</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
