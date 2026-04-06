import React from 'react';

export default function PenetrationTesting() {
  return (
    <main className="pt-24 min-h-screen">
      {/* Hero Section */}
      <section className="relative px-8 py-20 max-w-screen-2xl mx-auto overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-[120px]"></div>
        <div className="absolute top-1/2 -left-24 w-64 h-64 bg-tertiary/10 rounded-full blur-[100px]"></div>
        <div className="grid lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-container-high border border-outline-variant/30 rounded-sm">
              <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>security</span>
              <span className="font-label text-[0.65rem] uppercase tracking-[0.2em] text-primary">Mission Profile: Active Engagement</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black font-headline tracking-tighter leading-[0.9] text-on-surface">
              PENETRATION <br/> <span className="text-primary-fixed-dim">TESTING.</span>
            </h1>
            <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl leading-relaxed">
              Deploy elite ethical hacking protocols to identify, analyze, and exploit vulnerabilities within your infrastructure before malicious actors do. We provide sovereign oversight of your digital perimeter.
            </p>
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex flex-col">
                <span className="font-label text-[0.7rem] uppercase tracking-widest text-slate-500">Service Fee</span>
                <span className="text-3xl font-bold text-secondary-fixed-dim">$150 <span className="text-sm font-normal text-slate-500">/ engagement</span></span>
              </div>
              <div className="w-[1px] bg-outline-variant/30 hidden sm:block"></div>
              <div className="flex flex-col">
                <span className="font-label text-[0.7rem] uppercase tracking-widest text-slate-500">Execution Window</span>
                <span className="text-3xl font-bold text-on-surface">5 <span className="text-sm font-normal text-slate-500">Business Days</span></span>
              </div>
            </div>
            <div className="flex gap-4 pt-6">
              <button className="bg-primary-container text-on-primary-container px-8 py-4 rounded-sm font-label text-[0.85rem] uppercase tracking-[0.15em] font-bold cyber-glow cyber-glow-hover transition-all duration-300">
                Initiate Protocol
              </button>
              <button className="px-8 py-4 rounded-sm font-label text-[0.85rem] uppercase tracking-[0.15em] border border-outline-variant/30 hover:bg-surface-variant transition-colors">
                Download Specs
              </button>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="glass-panel p-2 rounded-lg border border-outline-variant/20 shadow-2xl relative">
              <div className="absolute -top-4 -right-4 bg-secondary-container text-on-secondary-container px-4 py-2 font-label text-[0.7rem] font-bold uppercase tracking-widest shadow-xl z-20">
                Live Environment
              </div>
              <img className="w-full aspect-[4/5] object-cover rounded-sm brightness-75 grayscale-[0.2] hover:grayscale-0 transition-all duration-700" alt="dramatic cinematic shot of high-tech server room with neon blue cooling lights and complex wiring in a dark digital void" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUdlt1SRRlQoGPIO_9yqS0jL4yrRUnGNpersfZtRJr6ue_EVWnfDFZFKhCXPjZijeyceQR-dn5fAYcIVMp2vThtWEV2_c_ItVl0jS55KUt0Uo6RIbhHw1mq--0ELzFx3BgebUhBEmDZ8gzrI7pGjcMAKSe6DIiTa33gcy__-ghnNOdiJijNCxAUNSoLEMj6ZtJFTi4QAwpCIQ3MqW9nEyn6_e2j-xE97W4Y7zzJboMOx98L04yyzvGia6S7iw3aNJgGnsfuCnsYGU" />
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specs / Features Bento Grid */}
      <section className="px-8 py-24 bg-surface-container-low">
        <div className="max-w-screen-2xl mx-auto">
          <div className="mb-16">
            <h2 className="font-label text-[0.75rem] uppercase tracking-[0.3em] text-secondary mb-4">Operational Capabilities</h2>
            <h3 className="text-3xl md:text-4xl font-bold font-headline tracking-tight">Technical Arsenal</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="md:col-span-2 glass-panel p-8 flex flex-col justify-between group">
              <div>
                <span className="material-symbols-outlined text-4xl text-primary mb-6">terminal</span>
                <h4 className="text-2xl font-bold mb-4">Ethical Hacking &amp; Vulnerability Research</h4>
                <p className="text-on-surface-variant leading-relaxed max-w-xl">
                  Our sentries employ the same tactics as advanced persistent threats (APTs) to discover hidden entry points, misconfigurations, and logic flaws in your application stack and network architecture.
                </p>
              </div>
              <div className="mt-8 flex gap-4">
                <span className="px-3 py-1 bg-surface-container-highest text-[0.6rem] font-label uppercase tracking-widest rounded-full border border-outline-variant/30">Network Layer</span>
                <span className="px-3 py-1 bg-surface-container-highest text-[0.6rem] font-label uppercase tracking-widest rounded-full border border-outline-variant/30">AppSec</span>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="glass-panel p-8 border-l-4 border-l-secondary-container">
              <span className="material-symbols-outlined text-4xl text-secondary mb-6">security_update_good</span>
              <h4 className="text-xl font-bold mb-4">Full Penetration Testing</h4>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                A comprehensive sweep including reconnaissance, scanning, vulnerability assessment, and exploitation. No stone left unturned in your digital fortress.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="glass-panel p-8">
              <span className="material-symbols-outlined text-4xl text-tertiary mb-6">explosion</span>
              <h4 className="text-xl font-bold mb-4">Exploit Demonstration</h4>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                We don't just report; we demonstrate. Secure proof-of-concepts show exactly how a vulnerability could be leveraged to compromise critical assets.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="md:col-span-2 glass-panel p-8 relative overflow-hidden group">
              <div className="relative z-10">
                <span className="material-symbols-outlined text-4xl text-primary-fixed-dim mb-6">receipt_long</span>
                <h4 className="text-2xl font-bold mb-4">Remediation Guidance</h4>
                <p className="text-on-surface-variant leading-relaxed max-w-lg">
                  Post-engagement, receive a prioritized tactical roadmap. We provide the exact code snippets and configuration changes needed to neutralize every identified threat.
                </p>
              </div>
              <div className="absolute right-0 bottom-0 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="material-symbols-outlined text-[12rem] translate-y-12 translate-x-12">description</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="px-8 py-24 max-w-screen-2xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <img className="rounded-lg shadow-2xl opacity-60" alt="abstract digital visualization of data streams flowing through a grid with deep blue and amber particles" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBU9TpHt8MZCsxR9zml9EKyK2yfvQOxxoKVUeJ3yMrSkZoUyqOZtTo538EC9ylOwEGnziGmNsJ9iboAKVZ2w5uVTtcerhzShPCWYuz5pmyF3CEoOzRRNCS_ji-2riEX7f3FlX8OaVLD-hhcQ8ZfuXwyaN24qYs3_LzIifWdSLN4i-og5vbdS_XxVaduRQCqs7MSlAJK1MAd8ngTVslSbELOfsOrrfuPZpotDcMXh9aX7x_z3c05EI5bkJHjWO8UtaQFQJtvX3WP9WM" />
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent"></div>
          </div>

          <div className="space-y-12">
            <div>
              <h2 className="font-label text-[0.75rem] uppercase tracking-[0.3em] text-primary mb-4">The Workflow</h2>
              <h3 className="text-4xl font-bold font-headline tracking-tight mb-6">Mission Lifecycle</h3>
            </div>

            <div className="space-y-8">
              <div className="flex gap-6 items-start">
                <div className="w-10 h-10 rounded-sm bg-surface-container-highest flex items-center justify-center font-label font-bold text-primary border border-primary/20 shrink-0">01</div>
                <div>
                  <h5 className="text-lg font-bold mb-1">Target Scoping</h5>
                  <p className="text-on-surface-variant text-sm">Defining boundaries and critical assets to be tested.</p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="w-10 h-10 rounded-sm bg-surface-container-highest flex items-center justify-center font-label font-bold text-primary border border-primary/20 shrink-0">02</div>
                <div>
                  <h5 className="text-lg font-bold mb-1">Active Reconnaissance</h5>
                  <p className="text-on-surface-variant text-sm">Automated and manual probing of the external attack surface.</p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="w-10 h-10 rounded-sm bg-surface-container-highest flex items-center justify-center font-label font-bold text-primary border border-primary/20 shrink-0">03</div>
                <div>
                  <h5 className="text-lg font-bold mb-1">Infiltration &amp; Exploitation</h5>
                  <p className="text-on-surface-variant text-sm">Attempting to gain unauthorized access via identified flaws.</p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="w-10 h-10 rounded-sm bg-surface-container-highest flex items-center justify-center font-label font-bold text-primary border border-primary/20 shrink-0">04</div>
                <div>
                  <h5 className="text-lg font-bold mb-1">Intelligence Debrief</h5>
                  <p className="text-on-surface-variant text-sm">Delivery of comprehensive remediation report and analysis.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-8 py-24 mb-12">
        <div className="max-w-screen-xl mx-auto glass-panel p-12 text-center border border-primary/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5"></div>
          <div className="relative z-10 space-y-6">
            <h2 className="text-3xl md:text-5xl font-black font-headline tracking-tighter uppercase">Ready to Secure Your Perimeter?</h2>
            <p className="text-on-surface-variant text-lg max-w-2xl mx-auto">
              Connect with the Cybersage team to schedule your Penetration Test. Protocols are ready for immediate deployment.
            </p>
            <div className="pt-8">
              <button className="bg-secondary-container text-on-secondary-container px-10 py-5 rounded-sm font-label text-[1rem] uppercase tracking-[0.2em] font-bold shadow-2xl hover:scale-105 transition-transform">
                Initiate Protocol
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
