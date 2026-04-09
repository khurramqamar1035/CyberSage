import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function IOSDevelopment() {
  const navigate = useNavigate();
  return (
    <main className="pt-0 pb-20 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-40 px-8 cyber-grid">
        <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:w-3/5 text-left z-10"
          >
            <p className="font-label text-secondary tracking-[0.2em] mb-6 text-sm flex items-center gap-3">
              <span className="w-8 h-[1px] bg-secondary"></span>
              MOBILE OPERATIVE
            </p>
            <h1 className="font-headline text-5xl lg:text-8xl font-black tracking-tighter text-on-surface leading-[0.9] mb-8">
              iOS <br/><span className="text-primary text-glow">DEVELOPMENT</span>
            </h1>
            <p className="text-on-surface-variant text-lg lg:text-xl max-w-2xl leading-relaxed font-light mb-10">
              Engineered for the Apple ecosystem. We forge native Swift applications that integrate seamlessly with the silicon, delivering high-performance, secure, and tactically fluid experiences.
            </p>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => navigate('/contact')} className="bg-primary-container text-on-primary-container px-8 py-4 rounded-sm font-label uppercase tracking-widest text-sm font-bold shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:brightness-110 transition-all">
                Contact Us
              </button>
              <button className="border border-outline-variant text-on-surface px-8 py-4 rounded-sm font-label uppercase tracking-widest text-sm font-bold hover:bg-surface-container-high transition-all">
                View Protocol
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:w-2/5 relative"
          >
            <div className="relative w-full aspect-square bg-surface-container-low rounded-xl overflow-hidden glass-card shadow-2xl border border-white/10">
              <img 
                alt="iOS Interface Mockup" 
                className="w-full h-full object-cover opacity-60 mix-blend-luminosity" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9UVKWhWLYwFd1yWwUc73bBABScQJlcaVq5gTUfCPwq9b4nVwbnN_m-S8ShcVbC3NuwvnFU-8G_1EBBaiuK4-UbeezCNtIxYFyqqGDxLphGUz6k_lgdmpBT0-C1q9iNDxyi89MuAHIPpAq8lobti7g93d4S5iOCHHMKzczyfkkDuuE40IEAW8IgmsY7bLkZcs9CiU4izVRKntE5SiPbtC3-dxaYfmFfiz-vuK3kjvReHM-i_GImAOP7tXKDK7j3JpOzqOW3MB-M3k" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent"></div>
              
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 border border-primary/20 rounded-xl flex items-center justify-center">
                <div className="w-full h-full p-8 flex flex-col justify-end">
                  <span className="font-label text-primary text-[0.6rem] tracking-widest mb-2">SYSTEM STATUS: OPTIMIZED</span>
                  <div className="h-1 w-full bg-surface-container-highest rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "75%" }}
                      transition={{ duration: 1, delay: 0.8 }}
                      className="h-full bg-primary"
                    ></motion.div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Decorative Element */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="absolute -bottom-6 -left-6 bg-surface-container-highest p-6 glass-card backdrop-blur-xl rounded-sm shadow-xl hidden lg:block border border-white/5"
            >
              <p className="font-label text-xs text-secondary tracking-tighter">ENCRYPTION LAYER 04</p>
              <p className="text-2xl font-black text-on-surface">99.9%</p>
              <p className="font-label text-[10px] text-on-surface-variant opacity-60">UPTIME GUARANTEE</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Tech Stack / Bento Grid */}
      <section className="py-24 px-8 bg-surface-container-low">
        <div className="max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-6">
            {/* Large Feature */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:col-span-4 lg:col-span-8 bg-surface-container-highest p-10 rounded-sm glass-card relative overflow-hidden group border border-white/5"
            >
              <div className="relative z-10">
                <span className="material-symbols-outlined text-primary text-4xl mb-6">sprint</span>
                <h3 className="font-headline text-3xl font-bold mb-4 text-white">Swift &amp; SwiftUI First</h3>
                <p className="text-on-surface-variant max-w-xl leading-relaxed">
                  We utilize Apple's modern programming language and declarative UI framework to build apps that are lighter, faster, and more maintainable. From reactive states to smooth animations, Swift is our primary weapon.
                </p>
              </div>
              <div className="absolute right-0 bottom-0 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="material-symbols-outlined text-[15rem] leading-none">code_blocks</span>
              </div>
            </motion.div>

            {/* Secondary Feature */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="md:col-span-2 lg:col-span-4 bg-surface-container-high p-8 rounded-sm glass-card border-l-2 border-primary"
            >
              <span className="material-symbols-outlined text-secondary text-3xl mb-6">security</span>
              <h4 className="font-headline text-xl font-bold mb-2">Native Security</h4>
              <p className="text-sm text-on-surface-variant">Integration with Keychain, Biometrics (FaceID/TouchID), and Apple's secure enclave for impenetrable data protection.</p>
            </motion.div>

            {/* Small Feature */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="md:col-span-2 lg:col-span-4 bg-surface-container-high p-8 rounded-sm glass-card border border-white/5"
            >
              <span className="material-symbols-outlined text-tertiary text-3xl mb-6">cloud_upload</span>
              <h4 className="font-headline text-xl font-bold mb-2">App Store Guard</h4>
              <p className="text-sm text-on-surface-variant">Full-cycle deployment support, ensuring your application strictly adheres to Apple’s Human Interface Guidelines for guaranteed approval.</p>
            </motion.div>

            {/* Mid-size Feature */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="md:col-span-4 lg:col-span-4 bg-primary-container p-8 rounded-sm relative overflow-hidden"
            >
              <div className="relative z-10 text-on-primary-container">
                <h4 className="font-label text-xs uppercase tracking-[0.2em] mb-4 text-primary-fixed">Cost Analysis</h4>
                <h3 className="font-headline text-4xl font-black mb-6">Custom Quote</h3>
                <p className="text-sm font-medium opacity-90 mb-8">Every project is unique. We provide detailed feasibility reports and tactical pricing tailored to your specific ecosystem requirements.</p>
                <button className="bg-surface text-on-surface px-6 py-3 rounded-sm font-label text-xs uppercase font-bold tracking-widest shadow-xl hover:scale-105 transition-transform">Inquire Now</button>
              </div>
              <div className="absolute -right-8 -bottom-8 opacity-20">
                <span className="material-symbols-outlined text-[10rem]">payments</span>
              </div>
            </motion.div>

            {/* Small Feature */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
              className="md:col-span-2 lg:col-span-4 bg-surface-container-high p-8 rounded-sm glass-card border border-white/5"
            >
              <span className="material-symbols-outlined text-primary text-3xl mb-6">devices</span>
              <h4 className="font-headline text-xl font-bold mb-2">Universal Ecosystem</h4>
              <p className="text-sm text-on-surface-variant">Shared logic across iPhone, iPad, Apple Watch, and Apple Vision Pro using modern cross-platform native patterns.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Detailed Content Section */}
      <section className="py-24 px-8">
        <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row gap-20">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <h2 className="font-headline text-4xl font-extrabold mb-12 uppercase tracking-tighter">Strategic <br/><span className="text-primary">Guidelines</span></h2>
            <div className="space-y-12">
              {[
                { step: '01', title: 'Discovery & Intelligence', desc: 'We begin with a deep dive into your business logic and user personas, mapping out every interaction and data flow before a single line of Swift is written.' },
                { step: '02', title: 'Interface Prototyping', desc: 'Leveraging HIG (Human Interface Guidelines), we design tactical, glassmorphic interfaces that feel at home on the world\'s most advanced hardware.' },
                { step: '03', title: 'Agile Sprints', desc: 'Weekly build cycles allow you to see the product evolve in real-time on TestFlight, ensuring total transparency and iterative excellence.' }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-surface-container-highest flex items-center justify-center text-primary font-label font-bold border border-primary/20">{item.step}</div>
                  <div>
                    <h4 className="font-headline text-xl font-bold mb-3">{item.title}</h4>
                    <p className="text-on-surface-variant leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <div className="bg-surface-container p-1 rounded-sm glass-card border border-white/5 h-full">
              <div className="bg-surface-container-lowest p-8 h-full">
                <h3 className="font-label text-xs tracking-widest text-secondary mb-8">LATEST DEPLOYMENT SPECIFICATIONS</h3>
                <div className="space-y-6">
                  {[
                    { label: 'Deployment Env', value: 'iOS 17.0+' },
                    { label: 'Language Core', value: 'Swift 5.10' },
                    { label: 'UI Framework', value: 'SwiftUI / Combine' },
                    { label: 'Architecture', value: 'MVVM-C / TCA' },
                    { label: 'Security Standard', value: 'AES-256 GCM' }
                  ].map((spec, i) => (
                    <div key={i} className="flex justify-between items-center py-4 border-b border-outline-variant/30">
                      <span className="font-label text-sm uppercase tracking-wider text-on-surface">{spec.label}</span>
                      <span className="text-primary font-bold">{spec.value}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-12 p-6 bg-surface-container-high rounded-sm flex items-center gap-6">
                  <span className="material-symbols-outlined text-secondary text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
                  <div>
                    <p className="text-xs font-label text-on-surface-variant uppercase">Sovereign Compliance</p>
                    <p className="text-on-surface font-bold">GDPR &amp; Apple Privacy Compliant</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-8 bg-surface">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="font-headline text-4xl lg:text-6xl font-black mb-8 tracking-tighter">READY TO <span className="text-primary">COMMISSION</span>?</h2>
          <p className="text-on-surface-variant text-lg mb-12 max-w-2xl mx-auto">
            Join the elite roster of businesses powered by Cybersage's iOS engineering. Secure your digital frontier with native precision.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button className="bg-primary text-on-primary px-10 py-5 rounded-sm font-label uppercase tracking-[0.2em] font-black shadow-[0_0_30px_rgba(37,99,235,0.4)] hover:scale-105 transition-transform">
              Initiate Contact
            </button>
            <button className="border border-outline-variant text-on-surface px-10 py-5 rounded-sm font-label uppercase tracking-[0.2em] font-black hover:bg-surface-container-high transition-colors">
              Technical Specs
            </button>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
