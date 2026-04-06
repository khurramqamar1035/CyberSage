import React from 'react';
import { motion } from 'framer-motion';

export default function AndroidDevelopment() {
  return (
    <main className="pt-24 pb-20">
      {/* Hero Section */}
      <section className="relative px-8 py-24 md:py-32 max-w-screen-2xl mx-auto overflow-hidden">
        <div className="absolute top-0 right-0 -z-10 w-2/3 h-full opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-l from-primary/20 to-transparent"></div>
          <img 
            className="w-full h-full object-cover" 
            alt="Technical close-up of high-end smartphone screen displaying complex code and abstract blue geometric patterns in a dark cybernetic setting" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCxCbDrCnjN3zHu7ZoeinacAGqj3U9mFTUrgWWrRkNkox4_3p_8GChrREN7aP5JPx2TA1nfCMM80zhoHoStpPmpb6mL0Bsw2KfphwSJbgrpMxYq_xsTowa_VzeQWK5P4uHic96lA0p5HUFuV0T066uYKdswNwrIEPMulHiOpW70YunvWW39pjKqPeYm39DiKtpDgilFfBJVT96ScAjWZwJbnf_8orUKLquS2VMF9x9EeYY4Vsss7Dd6fRQvGzKrvDpFBalw6V1sxYI"
          />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          <span className="font-label text-xs uppercase tracking-[0.2em] text-tertiary mb-6 block">Service Protocol // 042</span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1]">
            Native Android <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-tertiary">Sovereign Mobility</span>
          </h1>
          <p className="text-on-surface-variant text-lg md:text-xl max-w-xl mb-12 leading-relaxed">
            Engineered for the elite. We build high-performance, secure Android applications using Kotlin and modern architectural patterns that redefine mobile authority.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-gradient-to-r from-primary-container to-blue-700 text-on-primary-container px-8 py-4 font-bold rounded-sm shadow-lg hover:shadow-primary/20 transition-all flex items-center gap-2">
              Contact Us
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
            <button className="border border-outline-variant/30 text-on-surface px-8 py-4 font-label text-sm uppercase tracking-widest hover:bg-surface-container transition-all">
              View Whitepaper
            </button>
          </div>
        </motion.div>
      </section>

      {/* Bento Grid Features */}
      <section className="px-8 py-24 max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Large Feature */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="md:col-span-8 glass-card p-12 rounded-lg flex flex-col justify-between min-h-[400px]"
          >
            <div>
              <span className="material-symbols-outlined text-primary text-4xl mb-6" data-icon="terminal">terminal</span>
              <h3 className="text-3xl font-bold mb-4">Kotlin Native &amp; Modern Architecture</h3>
              <p className="text-on-surface-variant max-w-lg">We utilize MVVM architecture and Jetpack Compose to build interfaces that aren't just fluid, but fundamentally responsive to the user's intent.</p>
            </div>
            <div className="flex gap-4 mt-8 overflow-x-auto no-scrollbar">
              <span className="bg-surface-container-lowest px-4 py-2 font-label text-[10px] tracking-widest text-primary border border-primary/20">COROUTINES</span>
              <span className="bg-surface-container-lowest px-4 py-2 font-label text-[10px] tracking-widest text-primary border border-primary/20">DAGGER HILT</span>
              <span className="bg-surface-container-lowest px-4 py-2 font-label text-[10px] tracking-widest text-primary border border-primary/20">ROOM DB</span>
            </div>
          </motion.div>

          {/* Secondary Feature */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="md:col-span-4 bg-primary-container p-12 rounded-lg text-on-primary-container relative overflow-hidden"
          >
            <div className="relative z-10">
              <span className="material-symbols-outlined text-4xl mb-6" data-icon="palette" style={{ fontVariationSettings: "'FILL' 1" }}>palette</span>
              <h3 className="text-2xl font-bold mb-4">Material <br/>Design 3</h3>
              <p className="opacity-90">Dynamic color mapping and adaptive layouts that feel native to every pixel of the Android ecosystem.</p>
            </div>
            <div className="absolute -right-10 -bottom-10 opacity-20">
              <span className="material-symbols-outlined text-[200px]" data-icon="android">android</span>
            </div>
          </motion.div>

          {/* Small Grid Items */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="md:col-span-4 glass-card p-8 rounded-lg"
          >
            <span className="material-symbols-outlined text-secondary text-3xl mb-4" data-icon="rocket_launch">rocket_launch</span>
            <h4 className="font-bold text-xl mb-2">Play Store Deployment</h4>
            <p className="text-on-surface-variant text-sm">Full lifecycle management from internal testing to global production release.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="md:col-span-4 glass-card p-8 rounded-lg"
          >
            <span className="material-symbols-outlined text-tertiary text-3xl mb-4" data-icon="support_agent">support_agent</span>
            <h4 className="font-bold text-xl mb-2">Ongoing Support</h4>
            <p className="text-on-surface-variant text-sm">24/7 technical surveillance and iterative updates to ensure zero-day compatibility.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="md:col-span-4 bg-surface-container-low p-8 rounded-lg border-l-4 border-secondary flex flex-col justify-center"
          >
            <span className="font-label text-[10px] tracking-tighter uppercase text-secondary mb-2">Investment Tier</span>
            <h4 className="font-bold text-2xl">Custom Quote</h4>
            <p className="text-on-surface-variant text-xs mt-2 uppercase tracking-widest">Sovereign Protocol Pricing</p>
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-surface-container-low py-32">
        <div className="px-8 max-w-screen-2xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8"
          >
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">The Development Lifecycle</h2>
              <p className="text-on-surface-variant">We don't just write code; we architect experiences through a rigorous phase-gate methodology.</p>
            </div>
            <div className="font-label text-sm text-primary tracking-[0.3em]">PHASE // 01 - 04</div>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {[
              { id: '01', title: 'Discovery', desc: 'Defining the core utility and technical constraints of the mobile interface.' },
              { id: '02', title: 'Blueprint', desc: 'Wireframing the digital journey with a focus on Material Design ergonomics.' },
              { id: '03', title: 'Forging', desc: 'Native Kotlin development with continuous integration and automated testing.' },
              { id: '04', title: 'Ascension', desc: 'Final optimization, store deployment, and global scaling protocols.' }
            ].map((phase, i) => (
              <motion.div 
                key={phase.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative"
              >
                <span className="text-8xl font-black text-white/5 absolute -top-12 -left-4 pointer-events-none">{phase.id}</span>
                <h5 className="font-bold text-xl mb-4 relative z-10">{phase.title}</h5>
                <p className="text-sm text-on-surface-variant leading-relaxed">{phase.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-8 py-32 max-w-screen-2xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-card p-16 md:p-24 rounded-lg relative overflow-hidden border border-primary/10"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none"></div>
          <div className="max-w-3xl relative z-10 mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-8">Ready to deploy your <br/>vision on Android?</h2>
            <p className="text-on-surface-variant text-lg mb-12">Connect with our core team to discuss your project requirements and receive a tactical technical evaluation.</p>
            <button className="bg-primary text-on-primary px-12 py-5 font-bold rounded-sm shadow-[0_0_24px_rgba(180,197,255,0.2)] hover:scale-105 transition-all text-lg">
              Initiate Contact
            </button>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
