import React from 'react';

export default function ComplianceAudit() {
  return (
    <main className="pt-32 pb-24 px-6 md:px-12 max-w-screen-2xl mx-auto">
      {/* Hero Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-32">
        <div className="lg:col-span-7">
          <div className="inline-block px-3 py-1 mb-6 border border-primary/20 bg-primary/5">
            <span className="font-label text-primary text-[0.7rem] uppercase tracking-[0.2em]">Service ID: CSA-204-COMP</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold font-headline tracking-tight text-white mb-8 leading-[0.95]">
            Compliance <br/><span className="text-primary-fixed-dim">Audit</span>
          </h1>
          <p className="text-xl text-on-surface-variant max-w-2xl font-light leading-relaxed mb-10">
            Deploy the Sovereign Sentry protocol to safeguard your digital perimeter. Our comprehensive audit ensures your architecture transcends simple regulation, achieving an impenetrable state of legal and technical fortitude.
          </p>
          <div className="flex flex-wrap gap-4 items-center">
            <div className="glass-card px-6 py-4 flex items-center gap-4">
              <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
              <div>
                <div className="font-label text-[0.65rem] text-slate-500 uppercase tracking-widest">Target Status</div>
                <div className="text-white font-bold">Regulatory Compliant</div>
              </div>
            </div>
            <div className="glass-card px-6 py-4 flex items-center gap-4">
              <span className="material-symbols-outlined text-tertiary">schedule</span>
              <div>
                <div className="font-label text-[0.65rem] text-slate-500 uppercase tracking-widest">Extraction Time</div>
                <div className="text-white font-bold">7 Days</div>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Card */}
        <div className="lg:col-span-5">
          <div className="glass-card p-8 border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[60px] group-hover:bg-primary/20 transition-all"></div>
            <div className="flex justify-between items-end mb-8">
              <div>
                <div className="font-label text-xs text-primary uppercase tracking-widest mb-1">Standard Protocol Fee</div>
                <div className="text-6xl font-black text-white tracking-tighter">$200</div>
              </div>
              <div className="text-right">
                <span className="material-symbols-outlined text-4xl text-white/20">shield_lock</span>
              </div>
            </div>
            <ul className="space-y-4 mb-10">
              <li className="flex items-center gap-3 text-on-surface-variant">
                <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                <span className="text-sm font-medium tracking-tight">Full System Regulatory Alignment</span>
              </li>
              <li className="flex items-center gap-3 text-on-surface-variant">
                <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                <span className="text-sm font-medium tracking-tight">GDPR / HIPAA Governance Pack</span>
              </li>
              <li className="flex items-center gap-3 text-on-surface-variant">
                <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                <span className="text-sm font-medium tracking-tight">Technical Documentation Review</span>
              </li>
              <li className="flex items-center gap-3 text-on-surface-variant">
                <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                <span className="text-sm font-medium tracking-tight">Strategic Compliance Roadmap</span>
              </li>
            </ul>
            <button className="w-full bg-primary-container text-on-primary-container py-5 text-sm font-bold uppercase tracking-widest hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_8px_24px_rgba(37,99,235,0.2)] mb-4">
              Initiate Protocol
            </button>
            <p className="text-center font-label text-[0.65rem] text-slate-500 uppercase tracking-[0.1em]">Encrypted Secure Checkout Active</p>
          </div>
        </div>
      </section>

      {/* Features Bento Grid */}
      <section className="mb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Large Feature */}
          <div className="md:col-span-2 glass-card p-12 flex flex-col justify-end min-h-[400px] relative group overflow-hidden">
            <img className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" alt="Modern cybersecurity data center with glowing blue server racks and digital matrix overlays on glass screens" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCTIkHoS8HRkmU4CxpnPY3oQ_evA4IPtn3XbzwXuYvcwYGVZpNjgH-9BIuR12Oaah66XDF-1cBzQ_r6JjTC0wMaioDoSWvRf6zq4r3JPNxA9O1UvzGJM5UwGyVmhtBYEmlRDenPDZ9sLCjVMPTJCV1RaLUXRn9fdXoBF9BTGOm4eTulSVCCvCLJ7nDQ7YoSdNbbX-m-njpKQtB6QKGePbGv2hXiiZo7QwrCmQ0rEc_MZJ4ionsEAbCZJVDifNFlOW5VyoytHXGOVg" />
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/60 to-transparent"></div>
            <div className="relative z-10">
              <span className="material-symbols-outlined text-tertiary mb-4 text-4xl">policy</span>
              <h3 className="text-3xl font-bold text-white mb-4">Regulatory Shielding</h3>
              <p className="text-on-surface-variant max-w-lg">Our architects dismantle your current compliance posture and rebuild it using industry-leading encryption and governance standards, shielding you from lethal liability.</p>
            </div>
          </div>

          {/* Small Feature 1 */}
          <div className="bg-surface-container-low p-8 flex flex-col justify-between border-l border-primary/10">
            <span className="material-symbols-outlined text-secondary text-3xl">terminal</span>
            <div>
              <h4 className="text-xl font-bold text-white mb-2 font-headline">Roadmap Engine</h4>
              <p className="text-sm text-on-surface-variant leading-relaxed">A tactical step-by-step evolution path designed for your internal engineering teams.</p>
            </div>
          </div>

          {/* Small Feature 2 */}
          <div className="bg-surface-container-low p-8 flex flex-col justify-between border-t border-primary/10 md:border-t-0 md:border-l border-primary/10">
            <span className="material-symbols-outlined text-primary text-3xl">visibility</span>
            <div>
              <h4 className="text-xl font-bold text-white mb-2 font-headline">Zero-Gap Analysis</h4>
              <p className="text-sm text-on-surface-variant leading-relaxed">Identification of every architectural fissure that could lead to non-compliance penalties.</p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="md:col-span-2 glass-card p-8 flex items-center gap-8 border-r border-tertiary/10">
            <div className="shrink-0 w-16 h-16 bg-tertiary/10 flex items-center justify-center rounded-sm">
              <span className="material-symbols-outlined text-tertiary text-2xl">description</span>
            </div>
            <div>
              <h4 className="text-xl font-bold text-white mb-1">Documentation Fortress</h4>
              <p className="text-sm text-on-surface-variant">We generate immutable technical documentation required for GDPR and HIPAA audits, ensuring total readiness for third-party interrogation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Specs */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        <div>
          <h2 className="font-label text-primary text-sm uppercase tracking-[0.3em] mb-4">Protocol Specs</h2>
          <h3 className="text-4xl font-bold text-white mb-12 font-headline">The Sovereign Standard</h3>
          <div className="space-y-12">
            <div className="flex gap-6">
              <div className="text-primary font-label text-xl opacity-30">01</div>
              <div>
                <h5 className="text-white font-bold mb-2">Internal Infrastructure Map</h5>
                <p className="text-on-surface-variant text-sm">Deep scan of data flows, storage nodes, and encryption touchpoints across your entire network ecosystem.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="text-primary font-label text-xl opacity-30">02</div>
              <div>
                <h5 className="text-white font-bold mb-2">Privileged Access Review</h5>
                <p className="text-on-surface-variant text-sm">Rigorous audit of user hierarchies and administrative controls to ensure strict adherence to the Principle of Least Privilege.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="text-primary font-label text-xl opacity-30">03</div>
              <div>
                <h5 className="text-white font-bold mb-2">Vulnerability Cross-Referencing</h5>
                <p className="text-on-surface-variant text-sm">Aligning your current patch management cycles with global regulatory expectations for real-time threat response.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="relative aspect-square">
          <div className="absolute inset-0 bg-primary/5 rounded-full blur-[100px]"></div>
          <div className="relative glass-card h-full w-full overflow-hidden flex items-center justify-center border border-white/5">
            <img className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay" alt="Close up of a futuristic glowing microchip circuit board with intricate patterns and teal light streaks" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDcrdM4JWrCjegZAn3ZsQSt5qampnUOEckkEFpn3wYw0N2HPZSpoiTqoo9pnw6IvVX929_vcGqc71Ds8nheWVN9NCp9mEQt0bfWno4wWos_zazbgeroGmNLHYwhCmkJ3HR473_7750bn-NuycPxGBBHZePGdiNna6tcYw_EQx66fRS2aJSfrbQhlo1lz4alAT0wdg18lWyMDSoiLeDE8UI1Cn-wtS5xrt7Blnv6qexyU9GChrgaum5MCI2sD0IvAccl6fXzTHrqEEQ" />
            <div className="z-10 text-center px-12">
              <div className="mb-6 inline-flex p-4 bg-surface rounded-full border border-primary/20">
                <span className="material-symbols-outlined text-primary text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>security</span>
              </div>
              <h4 className="text-2xl font-bold text-white mb-4">Ready for Deployment</h4>
              <p className="text-slate-400 text-sm mb-8 leading-relaxed">Secure your organization's future with the Cybersage Compliance Protocol. Total extraction in 7 days.</p>
              <button className="font-label text-secondary text-xs uppercase tracking-[0.2em] hover:text-white transition-all flex items-center gap-2 mx-auto group">
                Contact a Sentry <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
