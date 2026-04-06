import React from 'react';
import { motion } from 'framer-motion';

export default function IntermediateTraining() {
  return (
    <main className="pt-24 pb-20">
      {/* Hero Section */}
      <section className="relative hero-gradient min-h-[614px] flex items-center px-8 lg:px-24 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
          <img 
            alt="Glowing circuit board and futuristic security lock" 
            className="w-full h-full object-cover mix-blend-screen" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAW1qi_F7adeF04VrGHKO4tpM6F0_rkpoUpswVC05Udvol53cSmgq1oCi8J68bzCOD1qIVJFfAwzo77_CKCW0QNg73fIfSvrcH-2GOOud5A2jcZl8vsOgQ_pbh-drlHedlD0XSGzIwgukIzTwfMQd2dgeGhA1JYorYrE1wkOTfx59NqJrYlrLsw1UKoneIuHAl5P4kOaxWtHLZmUqSmHk8CTFw2Yhp4bJNv4WlHYQJ7K0awZevdFoE87hz0t1cmOguQfoJ187YymSo" 
          />
        </div>
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 mb-6">
            <span className="material-symbols-outlined text-primary text-sm" data-icon="shield">shield</span>
            <span className="font-label text-xs uppercase tracking-[0.2em] text-primary">Intermediate Track</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-headline font-extrabold tracking-tighter text-on-surface mb-6 leading-none">
            Intermediate <br/><span className="text-primary">Cybersecurity</span>
          </h1>
          <p className="text-xl text-on-surface-variant max-w-2xl mb-10 font-light leading-relaxed">
            Bridge the gap between foundational knowledge and elite operational capability. Master the tactical deployment of security protocols in high-stakes environments.
          </p>
          <div className="flex flex-wrap gap-6 items-center">
            <button className="bg-primary-container hover:bg-primary text-on-primary-container px-10 py-4 font-bold text-lg shadow-lg hover:shadow-primary/20 transition-all">
              Enroll Now
            </button>
            <div className="flex flex-col">
              <span className="font-label text-[0.65rem] uppercase tracking-widest text-slate-500">Tuition</span>
              <span className="text-2xl font-headline font-bold text-secondary">$399.00</span>
            </div>
            <div className="w-px h-10 bg-outline-variant/30 mx-2 hidden sm:block"></div>
            <div className="flex flex-col">
              <span className="font-label text-[0.65rem] uppercase tracking-widest text-slate-500">Duration</span>
              <span className="text-2xl font-headline font-bold text-on-surface">8 Weeks</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Bento Grid Features */}
      <section className="px-8 lg:px-24 py-24 bg-surface">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 max-w-7xl mx-auto">
          {/* Feature 1: Main Concept */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-8 glass-card p-10 flex flex-col justify-between min-h-[400px]"
          >
            <div className="max-w-md">
              <h3 className="text-3xl font-headline font-bold text-on-surface mb-4">Advanced Concepts &amp; Practical Implementation</h3>
              <p className="text-on-surface-variant leading-relaxed">Theory is nothing without application. Our labs simulate real-world breaches where you must deploy countermeasures in real-time under simulated system stress.</p>
            </div>
            <div className="mt-8">
              <img 
                alt="Dark data center with neon lights" 
                className="w-full h-48 object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-700 rounded-sm" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGOrpVeYHZ_URmAsucm0UG4NoDLCyRz0fC_i6ZnUjGqO7SElYdUPR4SeqYWy83VLSsAmVcyvMfxY-0zgYxsesFInPmPhTI605bkRWDbPRoI7S401PlkSDywgSeOnPNm-YbT8ouXOb2xkVKcOX8Fpq8Rs_3s6vCq4rTLjXwVDE-h1YLTB_-GRUuR3THIj0zEaU6elgjB3p-YjgjeABscdsSB9s_cUnrHzUW9XkKEYfBVwVBpLQ6ljZygMN8OTls_fLFwRn6P-08-oM" 
              />
            </div>
          </motion.div>

          {/* Feature 2: Network Security */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="md:col-span-4 bg-surface-container-high p-8 flex flex-col rounded-sm"
          >
            <span className="material-symbols-outlined text-tertiary mb-6" data-icon="lan">lan</span>
            <h4 className="text-xl font-headline font-bold mb-4">Network Security</h4>
            <p className="text-sm text-on-surface-variant flex-grow">Hardening network perimeters and configuring intrusion prevention systems (IPS) for enterprise-scale architecture.</p>
            <div className="mt-8 border-t border-outline-variant/20 pt-4 font-label text-[0.65rem] tracking-widest text-tertiary">MODULE 02 / NETWORK DEPLOYMENT</div>
          </motion.div>

          {/* Feature 3: Penetration Testing */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="md:col-span-4 bg-surface-container-high p-8 flex flex-col rounded-sm"
          >
            <span className="material-symbols-outlined text-secondary mb-6" data-icon="terminal">terminal</span>
            <h4 className="text-xl font-headline font-bold mb-4">Penetration Testing</h4>
            <p className="text-sm text-on-surface-variant flex-grow">Learn the offensive mindset. Identify vulnerabilities before the adversary does using industry-standard toolkits and custom scripts.</p>
            <div className="mt-8 border-t border-outline-variant/20 pt-4 font-label text-[0.65rem] tracking-widest text-secondary">MODULE 04 / OFFENSIVE OPS</div>
          </motion.div>

          {/* Feature 4: Incident Response */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="md:col-span-8 glass-card p-8 md:p-12 relative overflow-hidden group"
          >
            <div className="relative z-10 flex flex-col h-full">
              <h4 className="text-2xl font-headline font-bold mb-4">Incident Response Protocols</h4>
              <p className="text-on-surface-variant max-w-lg mb-8">Develop the "Sovereign Sentry" mentality. When a breach occurs, seconds matter. Master the OODA loop to contain and eradicate threats.</p>
              <div className="flex gap-4 mt-auto">
                <div className="px-4 py-2 bg-surface-container-lowest border border-outline-variant/30 text-xs font-label uppercase tracking-widest">Detection</div>
                <div className="px-4 py-2 bg-surface-container-lowest border border-outline-variant/30 text-xs font-label uppercase tracking-widest">Containment</div>
                <div className="px-4 py-2 bg-surface-container-lowest border border-outline-variant/30 text-xs font-label uppercase tracking-widest">Forensics</div>
              </div>
            </div>
            {/* Ghostly Background Element */}
            <div className="absolute -right-20 -bottom-20 opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="material-symbols-outlined text-[300px]" data-icon="security_update_warning">security_update_warning</span>
            </div>
          </motion.div>

          {/* Feature 5: Hands-on Labs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="md:col-span-12 bg-surface-container-lowest border border-primary/10 p-12 flex flex-col md:flex-row items-center gap-12 rounded-sm"
          >
            <div className="md:w-1/2">
              <h3 className="text-4xl font-headline font-bold mb-6">Sovereign <span className="text-primary">Labs</span></h3>
              <p className="text-on-surface-variant text-lg mb-8 leading-relaxed">Every student receives a dedicated virtualized infrastructure. These aren't pre-recorded demos; they are live, persistent environments where your configuration decisions have consequences.</p>
              <button className="flex items-center gap-2 text-primary font-label uppercase tracking-widest hover:gap-4 transition-all">
                Preview Lab Environment <span className="material-symbols-outlined">trending_flat</span>
              </button>
            </div>
            <div className="md:w-1/2 grid grid-cols-2 gap-4">
              {[
                { val: '120+', text: 'Live Scenarios' },
                { val: '24/7', text: 'Access' },
                { val: 'VPN', text: 'Secure Entry' }
              ].map((stat, i) => (
                <div key={i} className="aspect-square bg-surface-container-high flex items-center justify-center p-6 text-center rounded-sm">
                  <div className="space-y-2">
                    <div className="text-3xl font-headline font-bold">{stat.val}</div>
                    <div className="text-[0.6rem] font-label uppercase tracking-widest text-slate-500">{stat.text}</div>
                  </div>
                </div>
              ))}
              <div className="aspect-square bg-primary-container/20 flex items-center justify-center p-6 text-center border border-primary/30 rounded-sm">
                <div className="space-y-2">
                  <div className="text-3xl font-headline font-bold text-primary">Pro</div>
                  <div className="text-[0.6rem] font-label uppercase tracking-widest text-primary">Certification</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-32 px-8 flex flex-col items-center justify-center text-center bg-surface-container-lowest relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        </div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl relative z-10"
        >
          <h2 className="text-4xl md:text-5xl font-headline font-black mb-8 leading-tight tracking-tighter">INITIATE THE NEXT PHASE OF YOUR CAREER.</h2>
          <p className="text-on-surface-variant text-lg mb-12">The digital frontier requires guardians who can think three steps ahead. Secure your slot in the upcoming cohort.</p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-primary-container text-on-primary-container px-12 py-5 font-bold text-xl shadow-[0_0_30px_rgba(37,99,235,0.3)] hover:scale-105 transition-transform rounded-sm">
              Enroll Now — $399
            </button>
            <button className="border border-outline-variant px-12 py-5 font-label uppercase tracking-widest hover:bg-surface-bright transition-colors rounded-sm">
              Download Syllabus
            </button>
          </div>
          <div className="mt-12 text-slate-500 font-label text-xs uppercase tracking-[0.3em]">
            Cohort starts in 14 days • 22 slots remaining
          </div>
        </motion.div>
      </section>
    </main>
  );
}
