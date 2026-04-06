import React from 'react';
import { motion } from 'framer-motion';

export default function AdvancedTraining() {
  return (
    <main className="pt-24 min-h-screen">
      {/* Hero Section */}
      <section className="relative px-8 py-20 lg:py-32 overflow-hidden max-w-screen-2xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="z-10"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="font-label text-xs uppercase tracking-[0.2em] text-secondary px-3 py-1 bg-secondary-container/10 border border-secondary/20">Elite Track</span>
              <span className="font-label text-xs uppercase tracking-[0.2em] text-tertiary">Sovereign Sentry Protocol</span>
            </div>
            <h1 className="font-headline font-black text-5xl lg:text-7xl leading-tight tracking-tighter text-primary mb-6 uppercase italic">
              Advanced:<br/>
              <span className="text-white">Cybersecurity</span>
            </h1>
            <p className="text-on-surface-variant text-lg max-w-xl mb-10 leading-relaxed font-light">
              Ascend beyond perimeter defense. Master the art of counter-offensive intelligence, complex security architectures, and the neutralization of persistent advanced threats.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-primary-container text-on-primary-container px-10 py-4 font-label text-[0.85rem] uppercase tracking-widest font-black shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] transition-all">
                Enroll Now
              </button>
              <button className="border border-outline-variant/30 px-10 py-4 font-label text-[0.85rem] uppercase tracking-widest font-medium hover:bg-surface-container-high transition-colors text-on-surface">
                Curriculum Brief
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -inset-10 bg-primary/10 blur-[100px] rounded-full"></div>
            <div className="glass-card border border-white/5 p-2 shadow-2xl relative rounded-sm">
              <img 
                alt="Glowing futuristic server room" 
                className="w-full h-[500px] object-cover grayscale contrast-125" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtWfCC36fFa44CtWc5bz1AOO2S4xVrja1b3k2pINRQ05IrYDYYk5VPwpoMCY4y0pog9O9ccTctfVSKxhQ7RLuUTuO7pJkzK5a5ZMhu6Tv8THyzx1laGOP06VD7Qm9gOYMjZc1ogOvvKmwsrGyLwFSFKkW5WJUi1k3QSoKxt2kW6vSKEGs88oNHA_P8amu1hUBSjZ8onwoD10PfwNugRJHRGVAOd5Dt1gBWvgw7VHvrlokBKGUB_-n8nJQsnKk3LopVN9vJJxTcqCE" 
              />
              <div className="absolute bottom-6 left-6 right-6 p-6 glass-card border-l-4 border-primary">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="font-label text-[0.65rem] uppercase tracking-widest text-on-surface-variant mb-1">Tuition Access</p>
                    <p className="text-4xl font-headline font-black text-primary">$699</p>
                  </div>
                  <div className="text-right">
                    <p className="font-label text-[0.65rem] uppercase tracking-widest text-on-surface-variant mb-1">Training Window</p>
                    <p className="text-2xl font-headline font-bold text-on-surface">12 WEEKS</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bento Grid Features */}
      <section className="px-8 py-20 bg-surface-container-low">
        <div className="max-w-screen-2xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-label text-[0.75rem] uppercase tracking-[0.3em] text-outline mb-12 text-center"
          >
            Protocol Modules
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {/* Advanced Threats */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:col-span-2 lg:col-span-3 glass-card p-8 group hover:bg-surface-container-highest transition-all rounded-sm border border-white/5"
            >
              <div className="flex items-start justify-between mb-12">
                <span className="material-symbols-outlined text-4xl text-primary" data-icon="security">security</span>
                <span className="text-xs font-label text-outline">01 / MODULE</span>
              </div>
              <h3 className="text-2xl font-headline font-extrabold uppercase mb-4 tracking-tight group-hover:text-primary transition-colors">Advanced Threats</h3>
              <p className="text-on-surface-variant leading-relaxed">Deep analysis of zero-day exploits, polymorphism, and complex APT orchestration. Learn to predict the unpredictable.</p>
            </motion.div>

            {/* Security Architecture */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="md:col-span-2 lg:col-span-3 glass-card p-8 group hover:bg-surface-container-highest transition-all rounded-sm border border-white/5"
            >
              <div className="flex items-start justify-between mb-12">
                <span className="material-symbols-outlined text-4xl text-tertiary" data-icon="grid_view">grid_view</span>
                <span className="text-xs font-label text-outline">02 / MODULE</span>
              </div>
              <h3 className="text-2xl font-headline font-extrabold uppercase mb-4 tracking-tight group-hover:text-tertiary transition-colors">Security Architecture</h3>
              <p className="text-on-surface-variant leading-relaxed">Designing resilient sovereign networks. Cloud-native hardening and zero-trust framework implementation at scale.</p>
            </motion.div>

            {/* Expert Training */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="md:col-span-4 lg:col-span-2 bg-surface-container-highest p-8 border-l-2 border-secondary rounded-sm"
            >
              <div className="flex items-start justify-between mb-8">
                <span className="material-symbols-outlined text-4xl text-secondary" data-icon="psychology">psychology</span>
              </div>
              <h3 className="text-xl font-headline font-black uppercase mb-4">Expert-level training</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed mb-6">Mentorship from active-duty Cybersage sentries with real-world combat experience in digital warfare.</p>
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full border border-surface bg-slate-800"></div>
                <div className="w-8 h-8 rounded-full border border-surface bg-slate-700"></div>
                <div className="w-8 h-8 rounded-full border border-surface bg-slate-600"></div>
              </div>
            </motion.div>

            {/* Compliance */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="md:col-span-2 lg:col-span-2 glass-card p-8 rounded-sm"
            >
              <span className="material-symbols-outlined text-3xl mb-6 text-on-surface-variant" data-icon="policy">policy</span>
              <h3 className="text-lg font-headline font-bold uppercase mb-2">Compliance</h3>
              <p className="text-on-surface-variant text-sm">Regulatory frameworks translated into tactical implementation. NIST, ISO, and Sovereign Protocols.</p>
            </motion.div>

            {/* Capstone */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="md:col-span-2 lg:col-span-2 glass-card p-8 bg-gradient-to-br from-surface-container-high to-primary-container/10 rounded-sm"
            >
              <span className="material-symbols-outlined text-3xl mb-6 text-primary" data-icon="rocket_launch">rocket_launch</span>
              <h3 className="text-lg font-headline font-bold uppercase mb-2">Capstone Project</h3>
              <p className="text-on-surface-variant text-sm">A full-scale red/blue team simulation. Prove your mastery in a live environment under pressure.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tactical Specs */}
      <section className="px-8 py-24 max-w-screen-2xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <h2 className="font-headline font-black text-4xl uppercase mb-8 leading-none italic">Combat Readiness<br/><span className="text-outline">Technical Specs</span></h2>
            <ul className="space-y-6">
              {[
                { id: '/01', text: 'Kernel-Level Defense' },
                { id: '/02', text: 'Encrypted Communication Protocols' },
                { id: '/03', text: 'Offensive Countermeasures' },
                { id: '/04', text: 'Forensic Artifact Analysis' }
              ].map((spec, i) => (
                <li key={i} className="flex gap-6 items-center group">
                  <span className="text-primary font-label text-xl">{spec.id}</span>
                  <div className="h-px flex-1 bg-outline-variant/20"></div>
                  <span className="font-label uppercase tracking-widest text-on-surface group-hover:text-primary transition-colors">{spec.text}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2 grid grid-cols-2 gap-4"
          >
            {[
              { val: '120+', label: 'Lab Hours', color: 'text-primary' },
              { val: 'PRO', label: 'Tier Level', color: 'text-on-primary', bg: 'bg-primary-container' },
              { val: '10', label: 'Certifications', color: 'text-secondary' },
              { val: '24/7', label: 'Range Access', color: 'text-tertiary' }
            ].map((stat, i) => (
              <div key={i} className={`aspect-square glass-card rounded-sm flex flex-col items-center justify-center p-8 text-center ${stat.bg || ''}`}>
                <span className={`text-4xl font-headline font-black mb-2 ${stat.color}`}>{stat.val}</span>
                <span className={`font-label text-[0.6rem] uppercase tracking-widest ${stat.bg ? 'text-on-primary' : 'text-outline'}`}>{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-primary px-8 py-32 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 grayscale mix-blend-overlay">
          <img 
            alt="Glowing motherboard traces" 
            className="w-full h-full object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWZJZGFOm2xViw1MvE-vbD1apzVTgh9a_nN60zXYHmqtVpeca-scdV1lcRu6G2PPwS2Hde990CPlwq99bAQnRJ9e3If1DfDUjVer1psn_PZDBG-yVHA5noYl3bXBGS2B89QpcsjxIer1oA9tG35gwkQR-jEHZqwPwQafdNASAvxyo_t5-i4X_fwNcEc0nG6tBZBeLuhPbQ1L2hzYeafKtAe72icCsvdjhw36C_bMyM5aA4w69Gboha41tvgJq4SypLzCm0RctTCCY" 
          />
        </div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative z-10 max-w-2xl mx-auto"
        >
          <h2 className="text-5xl font-headline font-black text-on-primary uppercase mb-6 italic tracking-tighter">Become the Shield.</h2>
          <p className="text-on-primary/80 font-medium mb-12 text-lg">The digital landscape is evolving. Your defensive strategy must evolve faster. Limited seats available for the next cohort.</p>
          <button className="bg-surface text-primary px-12 py-5 font-label text-sm uppercase tracking-widest font-black hover:scale-105 active:scale-95 transition-all shadow-2xl rounded-sm">
            Enroll Now / $699
          </button>
        </motion.div>
      </section>
    </main>
  );
}
