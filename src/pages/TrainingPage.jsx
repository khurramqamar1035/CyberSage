import React from 'react';
import { Link } from 'react-router-dom';

export default function TrainingAcademy() {
  return (
    <main className="pt-32 pb-24">
      <section className="max-w-[1440px] mx-auto px-8 mb-24 grid md:grid-cols-2 gap-12 items-center">
        <div className="z-10">
          <span className="font-label text-secondary tracking-[0.3em] uppercase text-xs mb-4 block">Institutional Grade Excellence</span>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none mb-6">
            CYBERSAGE <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-tertiary to-primary">ACADEMY</span>
          </h1>
          <p className="text-on-surface-variant text-lg max-w-lg mb-8 leading-relaxed">
            Forging the next generation of digital sentries. Our curriculum is built on real-world threat vectors, moving beyond theory into surgical precision.
          </p>
          <div className="flex gap-4">
            <button className="bg-primary px-8 py-4 text-on-primary font-bold text-sm uppercase tracking-widest hover:shadow-[0_0_20px_rgba(180,197,255,0.3)] transition-all">Enroll Now</button>
            <button className="border border-outline-variant px-8 py-4 text-on-surface font-label text-xs uppercase tracking-widest hover:bg-white/5 transition-all">View Syllabus</button>
          </div>
        </div>
        <div className="relative group">
          <div className="absolute -inset-4 bg-primary/10 blur-3xl rounded-full opacity-50 group-hover:opacity-70 transition-opacity"></div>
          <img className="relative w-full aspect-square object-cover grayscale brightness-75 group-hover:grayscale-0 transition-all duration-700" alt="Futuristic server room with glowing blue neon lights and complex wiring, digital security aesthetic with motion blur" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBV8bfxq4sQjjKPnko_HLrwyvBbT32BYm8Qdb6OODTtpU48w81Tqfek_vgRxR9bm9AjmoO28b1dMsFEnkpohRAZUTsgNUG5y6PeEZWWB2ZMbnHSTYiZrTMxhR9WlH45k_7X9J6CmSaY7uwSqzrDfMv45zMoYTYfg-0lPpCptI6xBO2Ol7d4OqOQVutTxbAQielKnd-L1wKXxxdeoNdNmJTANhRdDgnoA1BfpU_0secRU7aDqr8hvHbKDiBSaf0DKDPeF8HSRClHyyg" />
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-8 mb-32">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <h2 className="font-label text-sm text-tertiary uppercase tracking-widest mb-2">Training Tiers</h2>
            <h3 className="text-4xl font-bold tracking-tight text-on-background">Choose Your Path of Mastery</h3>
          </div>
          <div className="h-px flex-grow bg-outline-variant/30 mx-8 hidden md:block mb-4"></div>
          <p className="text-on-surface-variant text-sm max-w-xs text-right">Progressive modules designed for total domain immersion and operational readiness.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-outline-variant/20">
          <div className="p-10 flex flex-col border-r border-outline-variant/20 hover:bg-surface-container-low transition-colors group">
            <div className="flex justify-between items-start mb-12">
              <span className="font-label text-[10px] tracking-[0.2em] text-on-surface-variant uppercase bg-surface-container px-3 py-1">Tier 01</span>
              <span className="material-symbols-outlined text-primary text-3xl group-hover:scale-110 transition-transform" data-icon="verified_user">verified_user</span>
            </div>
            <h4 className="text-2xl font-bold mb-2">Basic Cybersecurity</h4>
            <p className="text-on-surface-variant text-sm mb-8">Foundational defense strategies and digital hygiene for the modern operative.</p>
            <div className="mt-auto space-y-4 mb-10">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-xs text-primary" data-icon="schedule">schedule</span>
                <span className="font-label text-[10px] uppercase tracking-widest">4 Weeks Duration</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-xs text-primary" data-icon="layers">layers</span>
                <span className="font-label text-[10px] uppercase tracking-widest">Core Infrastructure 101</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-xs text-primary" data-icon="encrypted">encrypted</span>
                <span className="font-label text-[10px] uppercase tracking-widest">Encryption Standards</span>
              </div>
            </div>
            <div className="flex items-baseline gap-2 mb-8">
              <span className="text-4xl font-black text-on-background">$199</span>
              <span className="font-label text-[10px] text-on-surface-variant uppercase">Full Access</span>
            </div>
            <Link to="/training/beginner" className="w-full py-4 border border-primary/30 text-primary font-label text-[10px] uppercase tracking-[0.2em] hover:bg-primary hover:text-on-primary transition-all flex justify-center items-center text-center">Begin Initiation</Link>
          </div>

          <div className="p-10 flex flex-col border-r border-outline-variant/20 bg-surface-container-low/40 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4">
              <span className="font-label text-[8px] tracking-[0.3em] text-secondary-container uppercase border border-secondary-container/30 px-2 py-1">Most Popular</span>
            </div>
            <div className="flex justify-between items-start mb-12">
              <span className="font-label text-[10px] tracking-[0.2em] text-on-surface-variant uppercase bg-surface-container px-3 py-1">Tier 02</span>
              <span className="material-symbols-outlined text-secondary text-3xl group-hover:scale-110 transition-transform" data-icon="security">security</span>
            </div>
            <h4 className="text-2xl font-bold mb-2">Practical Implementation</h4>
            <p className="text-on-surface-variant text-sm mb-8">Active threat hunting and network architecture reinforcement protocols.</p>
            <div className="mt-auto space-y-4 mb-10">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-xs text-secondary" data-icon="schedule">schedule</span>
                <span className="font-label text-[10px] uppercase tracking-widest">8 Weeks Duration</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-xs text-secondary" data-icon="terminal">terminal</span>
                <span className="font-label text-[10px] uppercase tracking-widest">Red Team Simulations</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-xs text-secondary" data-icon="hub">hub</span>
                <span className="font-label text-[10px] uppercase tracking-widest">Cloud Security Mesh</span>
              </div>
            </div>
            <div className="flex items-baseline gap-2 mb-8">
              <span className="text-4xl font-black text-on-background">$399</span>
              <span className="font-label text-[10px] text-on-surface-variant uppercase">Full Access</span>
            </div>
            <Link to="/training/intermediate" className="w-full py-4 bg-secondary-container text-on-secondary-container font-label text-[10px] uppercase tracking-[0.2em] hover:brightness-110 transition-all shadow-[0_0_20px_rgba(238,152,0,0.2)] flex justify-center items-center text-center">Expand Domain</Link>
          </div>

          <div className="p-10 flex flex-col hover:bg-surface-container-low transition-colors group">
            <div className="flex justify-between items-start mb-12">
              <span className="font-label text-[10px] tracking-[0.2em] text-on-surface-variant uppercase bg-surface-container px-3 py-1">Tier 03</span>
              <span className="material-symbols-outlined text-tertiary text-3xl group-hover:scale-110 transition-transform" data-icon="rocket_launch">rocket_launch</span>
            </div>
            <h4 className="text-2xl font-bold mb-2">Expert-Level Mastery</h4>
            <p className="text-on-surface-variant text-sm mb-8">Advanced zero-day exploitation prevention and sovereign AI defense systems.</p>
            <div className="mt-auto space-y-4 mb-10">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-xs text-tertiary" data-icon="schedule">schedule</span>
                <span className="font-label text-[10px] uppercase tracking-widest">12 Weeks Duration</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-xs text-tertiary" data-icon="biometrics">fingerprint</span>
                <span className="font-label text-[10px] uppercase tracking-widest">Quantum Cryptography</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-xs text-tertiary" data-icon="crisis_alert">crisis_alert</span>
                <span className="font-label text-[10px] uppercase tracking-widest">Global Incident Response</span>
              </div>
            </div>
            <div className="flex items-baseline gap-2 mb-8">
              <span className="text-4xl font-black text-on-background">$699</span>
              <span className="font-label text-[10px] text-on-surface-variant uppercase">Full Access</span>
            </div>
            <Link to="/training/advanced" className="w-full py-4 border border-tertiary/30 text-tertiary font-label text-[10px] uppercase tracking-[0.2em] hover:bg-tertiary hover:text-on-tertiary transition-all flex justify-center items-center text-center">Ascend to Expert</Link>
          </div>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-8">
        <div className="glass-card relative p-12 overflow-hidden flex flex-col md:flex-row items-center gap-16">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 to-transparent pointer-events-none"></div>
          <div className="md:w-1/2 relative z-10">
            <h2 className="font-label text-secondary text-xs tracking-[0.5em] uppercase mb-4">Proprietary Tech</h2>
            <h3 className="text-5xl font-black tracking-tighter mb-6 uppercase">The Crucible</h3>
            <p className="text-on-surface-variant text-lg mb-8 leading-relaxed">
              Beyond the classroom lies the simulation. The Crucible is our dynamic battle environment that adapts to your skill level, throwing evolving AI-driven threat vectors at your defense infrastructure in real-time.
            </p>
            <ul className="space-y-4 mb-10">
              <li className="flex gap-4">
                <span className="material-symbols-outlined text-primary" data-icon="bolt">bolt</span>
                <span className="text-sm font-medium">Real-time latency-based stress testing</span>
              </li>
              <li className="flex gap-4">
                <span className="material-symbols-outlined text-primary" data-icon="psychology">psychology</span>
                <span className="text-sm font-medium">Adaptive Adversary AI integration</span>
              </li>
              <li className="flex gap-4">
                <span className="material-symbols-outlined text-primary" data-icon="analytics">analytics</span>
                <span className="text-sm font-medium">Frame-by-frame performance analytics</span>
              </li>
            </ul>
            <button className="flex items-center gap-4 group">
              <span className="bg-surface-bright p-4 rounded-full group-hover:bg-primary transition-colors">
                <span className="material-symbols-outlined text-white" data-icon="play_arrow" data-weight="fill" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
              </span>
              <span className="font-label text-xs uppercase tracking-widest">Preview Simulation</span>
            </button>
          </div>
          <div className="md:w-1/2 relative">
            <div className="absolute -inset-10 bg-tertiary/20 blur-[100px] opacity-30 rounded-full"></div>
            <div className="relative bg-surface border border-outline-variant/30 p-2 overflow-hidden shadow-2xl">
              <img className="w-full aspect-video object-cover opacity-80 brightness-110 hover:scale-105 transition-transform duration-1000" alt="Digital glitch art representing a cyber battle simulation, vibrant blue and amber interference patterns over a dark grid" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCtWPYSBZNPxiMe8a7vBPnatcxTevxV-Lhpc3z7XDaLT95WLv7UzZYltBbE954spYCYTU36TViiL3tava_AER0887vuz1926j3a7KeTVR-X_Od9O6v0ucw26TGLDlwzSJDYadFQR0Pmf9dRDysits99JgMI05XhQlfsw9vbm9UPdjZix0S7xo414OvOzu-cqssmzeLIsiYgrHNF0e7uSNjj4oNTlZTQM0kAiSBq_55YLCRFSSaA1lZCmqhj7wreilyuGf2XPY1FmYc" />
              <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent opacity-60"></div>
              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center">
                <div className="flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
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
