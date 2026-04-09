import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function WebDevelopment() {
  const navigate = useNavigate();
  return (
    <main className="pt-24 pb-20">
      {/* Hero Section */}
      <section className="relative px-8 py-24 overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-primary/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-tertiary/10 blur-[100px] rounded-full"></div>
        
        <div className="max-w-screen-2xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="relative z-10"
          >
            <div className="font-label text-xs tracking-[0.2em] text-tertiary mb-4 flex items-center gap-2">
              <span className="w-8 h-px bg-tertiary/30"></span> 
              ELITE WEB ARCHITECTURE
            </div>
            <h1 className="font-headline font-extrabold text-5xl md:text-7xl leading-tight tracking-tighter mb-8">
              Precision <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-tertiary">Development</span><br/>
              for Global Scale.
            </h1>
            <p className="text-on-surface-variant text-lg max-w-xl mb-12 leading-relaxed">
              We engineer resilient, sovereign web platforms using the most advanced reactive frameworks and cloud-native infrastructure. Built to withstand, designed to excel.
            </p>
            <div className="flex flex-wrap gap-6">
              <button onClick={() => navigate('/contact')} className="px-8 py-4 bg-gradient-to-r from-primary-container to-primary font-headline font-bold text-sm uppercase tracking-widest text-white shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:scale-105 transition-transform">
                Contact Us
              </button>
              <div className="flex flex-col justify-center">
                <span className="font-label text-[0.65rem] text-slate-500 uppercase tracking-widest mb-1">Service Model</span>
                <span className="font-headline font-bold text-secondary">Custom Quote</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative aspect-square md:aspect-video lg:aspect-square group"
          >
            <div className="absolute inset-0 bg-surface-container-high outline-variant/20 outline rounded-sm overflow-hidden">
              <img 
                alt="Cybersecurity digital interface" 
                className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdzZl5R31RIN7iD1lVLQBhay3cSxoo4vTfPd8x66OgH7TcSdh8zRLBA30T63qpBuoFy3IKSns-fQeKYIdCOI_Y7ob_HTTOAn5mYPyEGjAOzMS4BT2LE6u4J88-Nd5dm1LPVQzuAWbCxQdMrlbQ7NAOzen64FxzPQ8x3lIhYp4ByETnMoKDUEBSNL2qcJiCDIjKNnzwbns-BhykZ-JEv4WDcJMJt8BOlPFuUmi7NpPbEgooCPQlg_H7DCTfz3FHVR7Cj3YbImWO2Ic" 
              />
            </div>
            <div className="absolute -bottom-6 -left-6 glass-card p-6 border border-white/5 shadow-2xl">
              <div className="flex gap-4 items-center mb-4">
                <span className="material-symbols-outlined text-tertiary" data-icon="terminal">terminal</span>
                <span className="font-label text-xs tracking-widest">SENTRY_LOG_ACTIVE</span>
              </div>
              <div className="space-y-2">
                <div className="h-1 w-40 bg-primary/20 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "66%" }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-primary"
                  ></motion.div>
                </div>
                <div class="h-1 w-32 bg-primary/20 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "50%" }}
                    transition={{ duration: 1, delay: 0.7 }}
                    className="h-full bg-tertiary"
                  ></motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bento Grid Features */}
      <section className="px-8 py-24 bg-surface-container-low">
        <div className="max-w-screen-2xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="font-headline font-extrabold text-3xl mb-4">Tactical Capabilities</h2>
            <p className="text-on-surface-variant font-label text-sm">REDACTED_CAPABILITIES_MANIFEST.JSON</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Modern Frameworks */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="md:col-span-2 glass-card p-8 group hover:bg-surface-container-high transition-all"
            >
              <div className="flex justify-between items-start mb-12">
                <div className="p-3 bg-primary/10 text-primary">
                  <span className="material-symbols-outlined text-3xl" data-icon="layers">layers</span>
                </div>
                <span className="font-label text-xs text-slate-500">01</span>
              </div>
              <h3 className="font-headline font-bold text-2xl mb-4 group-hover:text-primary transition-colors">Modern Frameworks</h3>
              <p className="text-on-surface-variant leading-relaxed">
                Utilizing React, Next.js, and specialized reactive stacks for ultra-fast, high-performance user experiences that never stall.
              </p>
            </motion.div>

            {/* Cloud Deployment */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="glass-card p-8 group hover:bg-surface-container-high transition-all"
            >
              <div className="flex justify-between items-start mb-12">
                <div className="p-3 bg-tertiary/10 text-tertiary">
                  <span className="material-symbols-outlined text-3xl" data-icon="cloud_done">cloud_done</span>
                </div>
                <span className="font-label text-xs text-slate-500">02</span>
              </div>
              <h3 className="font-headline font-bold text-xl mb-4 group-hover:text-tertiary transition-colors">Cloud Native</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                AWS, Azure, and Google Cloud infrastructure engineered for 99.9% uptime and auto-scaling capacity.
              </p>
            </motion.div>

            {/* SEO Optimized */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="glass-card p-8 group hover:bg-surface-container-high transition-all"
            >
              <div className="flex justify-between items-start mb-12">
                <div className="p-3 bg-secondary/10 text-secondary">
                  <span className="material-symbols-outlined text-3xl" data-icon="query_stats">query_stats</span>
                </div>
                <span className="font-label text-xs text-slate-500">03</span>
              </div>
              <h3 className="font-headline font-bold text-xl mb-4 group-hover:text-secondary transition-colors">SEO Precision</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                Strategic metadata architecture and Core Web Vitals optimization to dominate search engine algorithms.
              </p>
            </motion.div>

            {/* Responsive Design */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="lg:col-span-2 glass-card p-8 group hover:bg-surface-container-high transition-all flex flex-col md:flex-row gap-8 items-center"
            >
              <div className="flex-1">
                <div className="p-3 bg-primary/10 text-primary w-fit mb-8">
                  <span className="material-symbols-outlined text-3xl" data-icon="devices">devices</span>
                </div>
                <h3 className="font-headline font-bold text-2xl mb-4">Responsive Resilience</h3>
                <p className="text-on-surface-variant leading-relaxed">
                  Universal fluidity across every device. Our interfaces adapt with surgical precision from mobile handhelds to ultra-wide displays.
                </p>
              </div>
              <div className="w-full md:w-1/2 aspect-video bg-surface-container-lowest outline outline-white/5 rounded-sm overflow-hidden">
                <img 
                  alt="Code on a monitor" 
                  className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuACG0Xv9zg5fkvOlzyA5qMeW_107_nHPislSx2536YFIOJ_-Ek-PpXQaULjtbL8-GsFWwEt1dGmTJuX_wHIm_o0cYab_lGc4ofVEplUaT8n4XyQe_k_J8plNmyBrednAJolBxkGQrReZUNrQsb-1vX4HktrXe7k9PzFytQcZPcBxk1zypEmq5iDq-PAe-KhhJ0eXjp0wn3I3K_Qj7cFDbmpLXmNhB44S1tjx0sCzwRFUcWlqH0bHMemMY1kAlbJoTZzX1NDPz8WhdY" 
                />
              </div>
            </motion.div>

            {/* Scalability */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="md:col-span-2 glass-card p-8 group hover:bg-surface-container-high transition-all border-l-2 border-primary"
            >
              <div className="flex items-center gap-4 mb-8">
                <span className="material-symbols-outlined text-primary" data-icon="speed">speed</span>
                <span className="font-label text-xs tracking-widest text-primary uppercase">Mission Critical</span>
              </div>
              <h3 className="font-headline font-bold text-2xl mb-4">Exponential Scalability</h3>
              <p className="text-on-surface-variant leading-relaxed">
                Infrastructure designed to grow from MVP to millions of concurrent users without code rewrites. Our architectures are future-proof by design.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-8 py-32 relative overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center relative z-10"
        >
          <h2 className="font-headline font-extrabold text-4xl md:text-6xl mb-8 leading-tight">
            Ready to deploy your <br/>
            <span className="italic text-secondary">digital fortress?</span>
          </h2>
          <p className="text-on-surface-variant text-lg mb-12 max-w-2xl mx-auto">
            Initiate protocol for a custom assessment. Our engineers are standing by to architect your sovereign web presence.
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-8">
            <button onClick={() => navigate('/contact')} className="w-full md:w-auto px-12 py-5 bg-primary-container text-white font-headline font-black uppercase tracking-widest text-sm hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] transition-all">
              Contact Us
            </button>
            <div className="h-px w-12 bg-outline-variant hidden md:block"></div>
            <div className="text-left">
              <div className="font-label text-[10px] text-slate-500 uppercase tracking-widest">Average Response Time</div>
              <div className="font-headline font-bold text-tertiary">04:00:00 HOURS</div>
            </div>
          </div>
        </motion.div>
        
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="grid grid-cols-12 h-full">
            <div className="border-r border-on-surface/20"></div>
            <div className="border-r border-on-surface/20"></div>
            <div className="border-r border-on-surface/20"></div>
            <div className="border-r border-on-surface/20"></div>
            <div className="border-r border-on-surface/20"></div>
            <div className="border-r border-on-surface/20"></div>
            <div className="border-r border-on-surface/20"></div>
            <div className="border-r border-on-surface/20"></div>
            <div className="border-r border-on-surface/20"></div>
            <div className="border-r border-on-surface/20"></div>
            <div className="border-r border-on-surface/20"></div>
            <div className="border-r border-on-surface/20"></div>
          </div>
        </div>
      </section>
    </main>
  );
}
