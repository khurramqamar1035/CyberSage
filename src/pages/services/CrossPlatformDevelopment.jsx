import React from 'react';
import { motion } from 'framer-motion';

export default function CrossPlatform() {
  return (
    <main className="pt-0 pb-20">
      {/* Hero Section */}
      <section className="relative min-h-[819px] flex items-center px-8 max-w-screen-2xl mx-auto overflow-hidden">
        <div className="absolute top-20 -right-20 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]"></div>
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 w-full lg:w-2/3"
        >
          <span className="font-label text-tertiary text-xs uppercase tracking-[0.3em] mb-4 block">Deployment Protocol 0x44</span>
          <h1 className="text-6xl md:text-8xl font-black font-headline tracking-tighter mb-8 text-glow leading-none">
            CROSS-PLATFORM <br/>
            <span className="text-primary-fixed-dim">DEVELOPMENT</span>
          </h1>
          <p className="text-on-surface-variant text-xl max-w-xl mb-12 leading-relaxed">
            Sovereign engineering for global reach. Build once, deploy everywhere with industrial-grade React Native and Flutter frameworks.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-gradient-to-r from-primary-container to-primary px-8 py-4 font-label text-[0.85rem] uppercase tracking-widest font-bold shadow-lg hover:shadow-primary/20 transition-all active:scale-95">
              Contact Us
            </button>
            <button className="border border-outline-variant/30 hover:border-primary/50 px-8 py-4 font-label text-[0.85rem] uppercase tracking-widest font-bold transition-all text-on-surface">
              Technical Specs
            </button>
          </div>
        </motion.div>

        {/* Visual Accent: Floating Code/HUD element */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-1/3 aspect-square glass-card p-1"
        >
          <div className="w-full h-full bg-surface-container-lowest flex flex-col p-6 font-label text-[0.7rem] text-primary/60 overflow-hidden">
            <div className="flex gap-2 mb-4 border-b border-outline-variant/20 pb-2">
              <div className="w-2 h-2 rounded-full bg-error"></div>
              <div className="w-2 h-2 rounded-full bg-secondary"></div>
              <div className="w-2 h-2 rounded-full bg-tertiary"></div>
            </div>
            <code className="space-y-1">
              <p className="text-secondary-fixed-dim">import {'{'} Sentry {'}'} from "@cybersage/core";</p>
              <p className="text-tertiary">const App = () =&gt; {'{'}</p>
              <p className="pl-4">return (</p>
              <p className="pl-8 text-primary">&lt;OmniLayer&gt;</p>
              <p className="pl-12">&lt;Android.Engine /&gt;</p>
              <p className="pl-12">&lt;iOS.Core /&gt;</p>
              <p className="pl-8 text-primary">&lt;/OmniLayer&gt;</p>
              <p className="pl-4">);</p>
              <p className="text-tertiary">{'}'};</p>
              <p className="pt-4 text-slate-500">&#47;&#47; Deploying to 2 clusters...</p>
              <p className="text-tertiary-fixed">Status: ACTIVE</p>
            </code>
          </div>
        </motion.div>
      </section>

      {/* Bento Features Grid */}
      <section className="px-8 py-24 max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[240px]">
          {/* Large Feature */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-8 md:row-span-2 glass-card p-12 flex flex-col justify-end relative overflow-hidden group border border-white/5"
          >
            <div className="absolute top-0 right-0 p-8">
              <span className="material-symbols-outlined text-6xl text-primary/20 group-hover:text-primary/40 transition-all" data-icon="devices">devices</span>
            </div>
            <div className="relative z-10">
              <h3 className="font-headline text-3xl font-bold mb-4">Shared Codebase Architecture</h3>
              <p className="text-on-surface-variant max-w-md text-lg">Minimize technical debt by unifying your development pipeline. Write logic once and execute with native precision across all mobile ecosystems.</p>
            </div>
            <img 
              alt="Interconnected digital nodes" 
              className="absolute inset-0 w-full h-full object-cover opacity-10 mix-blend-overlay" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3JqfDWX7OTn-5NPtkW6uuoHZGQevyZ7ClnSpq1NLmBtEGocmhzQt2kp1MRJjkNaYdOO9aDSUei0Dfgj4aC0CVLOiOKi-9Wq_yLA_J3J5J70l1Cm_Hem5J2ol9Bm2HLXa_IN_hTTtxZQslLgLxeqJoUvEgmkCebYGzHtoAjaGqvxt5jnPfj8BT1X6WDqr8hbU45zT5780Uc0gwiHSMIQmCZEynmskIpGbqxuGtuyWCslMmd7I19GC1UJOYCEA7YrKuY40jwRnD4Og" 
            />
          </motion.div>

          {/* Secondary Feature */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="md:col-span-4 md:row-span-1 bg-surface-container-low p-8 flex flex-col justify-between border-l-2 border-secondary"
          >
            <span className="material-symbols-outlined text-secondary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>speed</span>
            <div>
              <h4 className="font-headline font-bold text-xl mb-2">Native Performance</h4>
              <p className="font-label text-xs uppercase tracking-wider text-on-surface-variant">JIT/AOT Compiled Speed</p>
            </div>
          </motion.div>

          {/* Small Feature */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="md:col-span-4 md:row-span-1 glass-card p-8 flex flex-col justify-between hover:bg-surface-container-high transition-all"
          >
            <span className="material-symbols-outlined text-tertiary text-3xl" data-icon="savings">savings</span>
            <div>
              <h4 className="font-headline font-bold text-xl mb-2">Cost-Effective</h4>
              <p className="font-label text-xs uppercase tracking-wider text-on-surface-variant">50% Development Savings</p>
            </div>
          </motion.div>

          {/* Small Feature */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="md:col-span-4 md:row-span-1 bg-surface-container-highest p-8 flex flex-col justify-between"
          >
            <span className="material-symbols-outlined text-primary text-3xl" data-icon="android">android</span>
            <div>
              <h4 className="font-headline font-bold text-xl mb-2">Android Ecosystem</h4>
              <p className="font-label text-xs uppercase tracking-wider text-on-surface-variant">Full API Integration</p>
            </div>
          </motion.div>

          {/* Small Feature */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="md:col-span-4 md:row-span-1 border border-outline-variant/20 p-8 flex flex-col justify-between bg-surface-container-lowest"
          >
            <span className="material-symbols-outlined text-white text-3xl" data-icon="phone_iphone">phone_iphone</span>
            <div>
              <h4 className="font-headline font-bold text-xl mb-2">iOS Standards</h4>
              <p className="font-label text-xs uppercase tracking-wider text-on-surface-variant">Cupertino UX Fidelity</p>
            </div>
          </motion.div>

          {/* Quote Feature */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="md:col-span-4 md:row-span-1 glass-card p-8 flex flex-col justify-center items-center text-center border-t-2 border-primary"
          >
            <h4 className="font-label text-xs uppercase tracking-[0.2em] mb-4 text-primary">Strategic Pricing</h4>
            <span className="text-3xl font-black font-headline text-glow mb-2">CUSTOM QUOTE</span>
            <p className="text-[0.7rem] uppercase tracking-widest text-on-surface-variant">Tier-Based Architecture</p>
          </motion.div>
        </div>
      </section>

      {/* Tech Stack Horizontal Section */}
      <section className="bg-surface-container-low py-16">
        <div className="max-w-screen-2xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:w-1/3"
          >
            <h2 className="font-headline text-3xl font-bold mb-4">The Tech Array</h2>
            <p className="text-on-surface-variant">We utilize market-dominant frameworks to ensure long-term support and infinite scalability.</p>
          </motion.div>
          <div className="md:w-2/3 grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: 'flutter', name: 'FLUTTER', col: 'text-blue-400' },
              { icon: 'rebase_edit', name: 'REACT NATIVE', col: 'text-cyan-400' },
              { icon: 'javascript', name: 'TYPESCRIPT', col: 'text-secondary' },
              { icon: 'cloud_done', name: 'FIREBASE', col: 'text-primary' },
            ].map((tech, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="flex flex-col items-center gap-4 opacity-60 hover:opacity-100 transition-opacity"
              >
                <div className="w-16 h-16 rounded-sm bg-surface-container-highest flex items-center justify-center border border-outline-variant/20">
                  <span className={`material-symbols-outlined text-4xl ${tech.col}`}>{tech.icon}</span>
                </div>
                <span className="font-label text-xs tracking-widest">{tech.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto glass-card p-16 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
          <h2 className="text-4xl md:text-5xl font-black font-headline mb-8 tracking-tight">READY TO DEPLOY YOUR SENTRY?</h2>
          <p className="text-xl text-on-surface-variant mb-12 max-w-2xl mx-auto">
            Partner with Cybersage to engineer a mobile presence that commands respect across every device.
          </p>
          <div className="flex justify-center">
            <button className="bg-primary text-on-primary px-12 py-5 font-label text-[1rem] uppercase tracking-widest font-black shadow-[0_0_30px_rgba(180,197,255,0.2)] hover:shadow-primary/40 transition-all hover:-translate-y-1">
              Initiate Project
            </button>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
