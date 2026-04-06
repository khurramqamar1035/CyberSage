import React from 'react';
import { Link } from 'react-router-dom';

export default function DevelopmentServices() {
  return (
    <main className="pt-24 pb-20 blueprint-grid min-h-screen">
      <section className="max-w-[1440px] mx-auto px-8 md:px-12 py-16 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-6">
          <div className="inline-block px-3 py-1 bg-primary-container/10 border border-primary/20 rounded-sm">
            <span className="font-label uppercase text-[10px] tracking-[0.1em] text-primary">Advanced Engineering</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black font-headline tracking-tighter leading-none">
            Architecting <br/>
            <span className="text-primary">Digital Sovereignty.</span>
          </h1>
          <p className="text-on-surface-variant text-lg max-w-xl leading-relaxed">
            High-performance application ecosystems engineered with military-grade precision. From low-level kernel optimization to fluid Material experiences, we build the future of secure software.
          </p>
          <div className="flex gap-4">
            <button className="bg-primary text-on-primary px-8 py-4 font-bold rounded-sm hover:shadow-[0_0_30px_rgba(180,197,255,0.4)] transition-all">Start Project</button>
            <button className="border border-outline-variant px-8 py-4 font-bold rounded-sm hover:bg-surface-container-highest transition-all">View Architecture</button>
          </div>
        </div>
        <div className="flex-1 relative w-full aspect-square md:aspect-video rounded-sm overflow-hidden glass-panel border border-white/10 group">
          <img className="w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUey_V1dSXt4K87wWDIcAZoSuGVSezoVsqsmo4uQakJSf4HxVPfxI7Cz3zp26d7-jfcGlDtv1xOzaKom3ni5j_5hAV9vFugvQ5o5M4B3m224gu07pOlvO2fQKzlftga5F_9tFbLoj7_x_rW4QDf6e7E3jbhVsp_w3IMhflOLsCO7K2GjEICQx9TiZ627xzCKMynEsXaj-t7ZAN5GeqcrLO-10nb-X4QTn0X9hhR0thN0H_o7zLhVOLcqM6fravrY3nWgOGZQjdJoI" alt="Close up of high-tech computer code on a dark screen with vibrant blue and cyan glowing accents and bokeh light effects" />
          <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent opacity-80"></div>
          <div className="absolute bottom-6 left-6 p-4">
            <span className="font-label text-xs uppercase tracking-widest text-secondary block mb-2">// ENGINE_REDACTED</span>
            <div className="h-1 w-24 bg-primary"></div>
          </div>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-8 md:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-7 group glass-panel p-8 rounded-sm relative overflow-hidden transition-all hover:bg-surface-container-high">
            <div className="relative z-10">
              <span className="material-symbols-outlined text-4xl text-primary mb-6" data-icon="android">android</span>
              <h3 className="text-3xl font-bold mb-4 font-headline uppercase tracking-tight">Android Development</h3>
              <p className="text-on-surface-variant mb-8 max-w-md leading-relaxed">
                Native ecosystems utilizing <span className="text-on-surface font-bold">Kotlin</span> and <span className="text-on-surface font-bold">Material Design 3</span>. We focus on low-latency performance and robust hardware integration.
              </p>
              <div className="flex flex-wrap gap-3 mb-10">
                <span className="font-label text-[10px] px-3 py-1 border border-outline-variant uppercase tracking-widest">Jetpack Compose</span>
                <span className="font-label text-[10px] px-3 py-1 border border-outline-variant uppercase tracking-widest">MVVM/MVI</span>
                <span className="font-label text-[10px] px-3 py-1 border border-outline-variant uppercase tracking-widest">Dagger Hilt</span>
              </div>
              <Link to="/development-services/android" className="text-secondary font-label uppercase text-xs tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all w-fit">
                Custom Quote <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
            <div className="absolute -right-20 -bottom-20 opacity-5 group-hover:opacity-10 transition-opacity">
              <span className="material-symbols-outlined text-[300px]" data-icon="terminal">terminal</span>
            </div>
          </div>

          <div className="md:col-span-5 group glass-panel p-8 rounded-sm bg-surface-container-low transition-all hover:bg-surface-container-high border-r border-primary/5">
            <span className="material-symbols-outlined text-4xl text-primary mb-6" data-icon="apple">ios</span>
            <h3 className="text-3xl font-bold mb-4 font-headline uppercase tracking-tight">iOS Development</h3>
            <p className="text-on-surface-variant mb-8 leading-relaxed">
              Precision-crafted Swift and SwiftUI interfaces that define the gold standard of mobile fluidity and security.
            </p>
            <ul className="space-y-3 mb-10">
              <li className="flex items-center gap-2 text-sm text-on-surface-variant italic">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> Combine Framework
              </li>
              <li className="flex items-center gap-2 text-sm text-on-surface-variant italic">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> Core Data &amp; CryptoKit
              </li>
            </ul>
            <Link to="/development-services/ios" className="text-secondary font-label uppercase text-xs tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all w-fit">
              Custom Quote <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>

          <div className="md:col-span-5 group glass-panel p-8 rounded-sm bg-surface-container-low transition-all hover:bg-surface-container-high">
            <span className="material-symbols-outlined text-4xl text-tertiary mb-6" data-icon="language">language</span>
            <h3 className="text-3xl font-bold mb-4 font-headline uppercase tracking-tight">Web Systems</h3>
            <p className="text-on-surface-variant mb-8 leading-relaxed">
              Responsive, scalable architectures built for enterprise-grade traffic and absolute uptime reliability.
            </p>
            <div className="h-[1px] w-full bg-gradient-to-r from-tertiary/40 to-transparent mb-8"></div>
            <Link to="/development-services/web" className="text-secondary font-label uppercase text-xs tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all w-fit">
              Custom Quote <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>

          <div className="md:col-span-7 group glass-panel p-8 rounded-sm relative overflow-hidden transition-all hover:bg-surface-container-high">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-1">
                <span className="material-symbols-outlined text-4xl text-primary mb-6" data-icon="dynamic_feed">dynamic_feed</span>
                <h3 className="text-3xl font-bold mb-4 font-headline uppercase tracking-tight">Cross-Platform</h3>
                <p className="text-on-surface-variant mb-8 leading-relaxed">
                  Unified codebases using <span className="text-on-surface font-bold">React Native</span> and <span className="text-on-surface font-bold">Flutter</span>. Maximum reach without compromising the "Sentry" security standards.
                </p>
                <Link to="/development-services/cross-platform" className="text-secondary font-label uppercase text-xs tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all w-fit">
                  Custom Quote <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>
              <div className="w-full md:w-64 h-48 bg-surface-container-lowest rounded-sm border border-outline-variant p-4 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="w-8 h-1 bg-primary/40"></div>
                  <span className="font-label text-[10px] text-tertiary">0x882A</span>
                </div>
                <div className="space-y-2">
                  <div className="h-2 w-full bg-surface-variant"></div>
                  <div className="h-2 w-3/4 bg-surface-variant"></div>
                  <div className="h-2 w-5/6 bg-surface-variant"></div>
                </div>
                <div className="flex gap-2">
                  <div className="w-4 h-4 rounded-full border border-primary/20"></div>
                  <div className="w-4 h-4 rounded-full border border-primary/20"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-8 md:px-12 py-20 overflow-hidden">
        <div className="flex flex-col md:flex-row gap-20">
          <div className="md:w-1/3">
            <h2 className="text-4xl font-black font-headline tracking-tighter mb-8 uppercase">The Blueprint Strategy</h2>
            <p className="text-on-surface-variant mb-12 border-l-4 border-secondary pl-6">
              We don't just "code." We architect defensive layers and optimized execution paths. Every project begins with a 0-Trust security audit of the proposed tech stack.
            </p>
            <div className="space-y-6">
              <div className="group">
                <h4 className="font-label text-[10px] text-primary uppercase tracking-[0.2em] mb-2">Phase 01</h4>
                <p className="font-bold text-lg">Inertial Design Analysis</p>
              </div>
              <div className="group">
                <h4 className="font-label text-[10px] text-primary uppercase tracking-[0.2em] mb-2">Phase 02</h4>
                <p className="font-bold text-lg">Kernel-Level Hardening</p>
              </div>
              <div className="group">
                <h4 className="font-label text-[10px] text-primary uppercase tracking-[0.2em] mb-2">Phase 03</h4>
                <p className="font-bold text-lg">UI/UX Fluidity Audit</p>
              </div>
            </div>
          </div>
          <div className="md:w-2/3 flex items-center justify-center relative">
            <div className="absolute inset-0 bg-primary/10 blur-[120px] rounded-full"></div>
            <div className="relative glass-panel w-full aspect-video border border-white/5 p-12 flex items-center justify-center">
              <div className="w-full h-full flex flex-col justify-between border border-dashed border-outline-variant p-4">
                <div className="flex justify-between">
                  <div className="w-24 h-2 bg-primary/20"></div>
                  <div className="w-12 h-12 rounded-full border-4 border-secondary/20 flex items-center justify-center">
                    <div className="w-4 h-4 bg-secondary rounded-full"></div>
                  </div>
                </div>
                <div className="flex items-end gap-1">
                  <div className="w-full h-12 bg-primary/10"></div>
                  <div className="w-full h-32 bg-primary/20"></div>
                  <div className="w-full h-24 bg-primary/30"></div>
                  <div className="w-full h-40 bg-primary/40"></div>
                  <div className="w-full h-20 bg-primary/20"></div>
                </div>
                <div className="text-[8px] font-label text-outline-variant">// MONITORING_LATENCY_FEED_ACTIVE</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
