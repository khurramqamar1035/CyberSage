import React from 'react';

export default function AISecurityAudit() {
  return (
    <main className="pt-24 pb-20">
      {/* Hero Section */}
      <section className="relative px-8 pt-16 pb-24 overflow-hidden">
        <div className="absolute top-0 right-0 -z-10 w-2/3 h-full opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-l from-primary/20 to-transparent"></div>
          <img className="w-full h-full object-cover" alt="Abstract digital grid with glowing blue particles and high-tech security architecture visualization in a dark cyber environment" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBghdZ6IeM7VITXpj8vqqRteJCestuQci0XJ-9fPkg_eCKAN69inAohvkci8XWPeE4kVr3jROAJDnGt8lRZ9FkRa4vj_2xXbfWCj0z3rb3PlC7wapBJEbyMqmdYH7TK8TvyJeHDdV-Z2aCDz-3Sm_dPwTg5FEQxGgeqBUrKs8b-4lOAAk179SiYmSp2vF5vLwEsidQpq0HIx24FoqPxb5srbQorzHoKXp4GMBVcTo2qpFSo-ipr2s7cLYnY2IeQKdsL3a2-g_F7OuE" />
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 flex flex-col justify-center">
            <span className="font-label text-tertiary tracking-[0.2em] text-xs uppercase mb-4">Service Protocol: SENTRY-AI</span>
            <h1 className="font-headline text-5xl md:text-7xl font-extrabold tracking-tighter text-white mb-6 leading-none">
              AI SECURITY <br/> <span className="text-primary-fixed-dim">AUDIT</span>
            </h1>
            <p className="text-on-surface-variant text-lg md:text-xl max-w-xl mb-10 leading-relaxed font-light">
              Deploy an autonomous intelligence layer to dismantle vulnerabilities. Our Sovereign Sentry protocol executes a full-spectrum defensive scan of your digital perimeter within a single cycle.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-gradient-to-r from-primary-container to-primary px-8 py-4 font-label font-bold text-on-primary-container uppercase tracking-widest shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] transition-all">
                Initiate Protocol
              </button>
              <div className="flex items-center px-6 py-4 glass-panel border border-outline-variant/20">
                <span className="font-label text-secondary font-bold text-xl mr-3">$20</span>
                <span className="font-label text-on-surface-variant text-[0.65rem] uppercase tracking-widest leading-none">Single Node <br/>Deployment</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Features Grid */}
      <section className="px-8 py-24 bg-surface-container-low">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[240px]">
            {/* Large Feature Card */}
            <div className="md:col-span-2 lg:row-span-2 glass-panel p-8 flex flex-col justify-between group hover:outline hover:outline-1 hover:outline-primary/40 transition-all">
              <div>
                <span className="material-symbols-outlined text-primary text-4xl mb-6">shield_lock</span>
                <h3 className="font-headline text-2xl font-bold text-white mb-4">Comprehensive Assessment</h3>
                <p className="text-on-surface-variant leading-relaxed">A deep-tissue analysis of digital infrastructure using neural networks to identify non-linear entry points and structural weaknesses that legacy scanners overlook.</p>
              </div>
              <div className="flex items-center gap-2 mt-4">
                <div className="h-[2px] w-8 bg-primary"></div>
                <span className="font-label text-[0.65rem] uppercase tracking-widest text-primary">Priority Alpha</span>
              </div>
            </div>

            {/* Medium Feature Card */}
            <div className="md:col-span-1 glass-panel p-8 flex flex-col justify-between">
              <span className="material-symbols-outlined text-tertiary text-3xl mb-4">radar</span>
              <div>
                <h4 className="font-headline text-lg font-bold text-white mb-2">Threat Detection</h4>
                <p className="text-on-surface-variant text-sm">Real-time pattern matching for emerging zero-day exploits.</p>
              </div>
            </div>

            {/* Square Card */}
            <div className="glass-panel p-8 flex flex-col items-center justify-center text-center">
              <span className="font-label text-secondary text-3xl font-black mb-2">24H</span>
              <span className="font-label text-[0.65rem] uppercase tracking-widest text-on-surface-variant">Rapid Delivery Cycle</span>
            </div>

            {/* Small Feature Card */}
            <div className="glass-panel p-8 flex flex-col justify-between">
              <span className="material-symbols-outlined text-primary text-3xl mb-4">bolt</span>
              <div>
                <h4 className="font-headline text-lg font-bold text-white mb-2">Auto-Scan</h4>
                <p className="text-on-surface-variant text-sm">Automated vulnerability discovery at machine speed.</p>
              </div>
            </div>

            {/* Vertical Card */}
            <div className="md:col-span-1 lg:row-span-1 glass-panel p-8 flex flex-col justify-between">
              <span className="material-symbols-outlined text-secondary text-3xl">terminal</span>
              <div>
                <h4 className="font-headline text-lg font-bold text-white mb-2">Detailed Reports</h4>
                <p className="text-on-surface-variant text-sm">Sovereign-grade documentation for C-suite and engineering teams.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specification Section */}
      <section className="px-8 py-24">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
          <div className="w-full lg:w-1/2">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-tertiary/20 rounded-lg blur opacity-25"></div>
              <img className="relative w-full aspect-video object-cover" alt="Rows of illuminated blue server racks in a high-security data center with shallow depth of field and futuristic lens flare" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDym8EL01Gfk474Jn65AFwcNbbbWI6eviCXOxRrrfM0nZ2MWRoUy3n2_tuyEZxkW5rtZyQMTR7PkCOwO9dAhW4rKEf6mboI3ZJHXB20bnIMtaNdBkwHMPZzzxCPL99Cho4_UXsrg9kbfctuFe66-4xm6omLQvYX_1OHv1W9I9jYk2Jan5kmk1YIQQZNCZA5yeXH1fPSWADcRyhC-GyadPHDl8qNTxKtBIgU2AcDYwnIK5mPSqIJ_17y0MGyR6XIybEUWcBnWZdwX3k" />
            </div>
          </div>

          <div className="w-full lg:w-1/2 space-y-8">
            <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight text-white uppercase">Operational <span className="text-primary">Intelligence</span></h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <span className="font-label text-primary font-bold">01</span>
                <div>
                  <h5 className="font-headline font-bold text-on-surface mb-1">Infrastructure Crawling</h5>
                  <p className="text-on-surface-variant text-sm">We map every exposed endpoint, sub-domain, and API gateway with neural precision.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="font-label text-primary font-bold">02</span>
                <div>
                  <h5 className="font-headline font-bold text-on-surface mb-1">Heuristic Exploitation</h5>
                  <p className="text-on-surface-variant text-sm">Simulation of adversary behavior using predictive AI models to test defense thresholds.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="font-label text-primary font-bold">03</span>
                <div>
                  <h5 className="font-headline font-bold text-on-surface mb-1">Remediation Roadmap</h5>
                  <p className="text-on-surface-variant text-sm">Strategic patching priorities ranked by systemic impact and threat likelihood.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-8 py-24 bg-surface-container-lowest">
        <div className="max-w-4xl mx-auto text-center glass-panel p-16 border border-primary/10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>
          <h2 className="font-headline text-4xl font-black text-white mb-6 tracking-tighter uppercase">Activate Sentry Protocol</h2>
          <p className="text-on-surface-variant mb-10 max-w-xl mx-auto font-light">
            The audit cycle begins the moment the handshake is completed. Secure your perimeter within the next 24 hours.
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-6">
            <button className="w-full md:w-auto bg-primary-container text-on-primary-container font-label font-bold px-12 py-5 uppercase tracking-widest shadow-[0_0_20px_rgba(37,99,235,0.4)]">
              Initiate Protocol
            </button>
            <button className="font-label text-on-surface-variant hover:text-white transition-colors uppercase tracking-[0.2em] text-xs">Download Sample Report</button>
          </div>
        </div>
      </section>
    </main>
  );
}
