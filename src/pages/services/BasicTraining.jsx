import React from 'react';
import { motion } from 'framer-motion';

export default function BeginnerTraining() {
  return (
    <main className="pt-32 pb-24 px-6 md:px-12 max-w-screen-2xl mx-auto">
      {/* Hero Section: Asymmetric Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end mb-24">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-8"
        >
          <div className="flex items-center space-x-4 mb-6">
            <span className="font-label text-tertiary text-[0.75rem] uppercase tracking-[0.2em] border border-tertiary/30 px-3 py-1 bg-tertiary/5">Phase 01: Initiation</span>
            <span className="font-label text-on-surface-variant text-[0.75rem] uppercase tracking-[0.2em]">4 Weeks Duration</span>
          </div>
          <h1 className="font-headline text-5xl md:text-7xl font-extrabold tracking-tighter text-on-surface mb-8 leading-none">
            Beginner: <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-tertiary">Basic Cybersecurity</span>
          </h1>
          <p className="text-on-surface-variant text-lg md:text-xl max-w-2xl font-light leading-relaxed">
            The foundation course for digital guardians. Master the core protocols of modern defense, identify common threats, and implement robust protection frameworks from the ground up.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="lg:col-span-4 flex flex-col items-start lg:items-end"
        >
          <div className="glass-card p-8 w-full border border-outline-variant/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl -mr-16 -mt-16"></div>
            <div className="relative z-10">
              <div className="font-label text-[0.75rem] text-secondary uppercase tracking-widest mb-2">Tuition Investment</div>
              <div className="text-4xl font-headline font-bold text-on-surface mb-6">$199.00</div>
              <button className="w-full bg-gradient-to-r from-primary-container to-blue-700 text-on-primary-container py-4 rounded-sm font-label text-sm uppercase tracking-widest font-black hover:shadow-[0_0_20px_rgba(37,99,235,0.5)] transition-all">
                Enroll Now
              </button>
              <p className="text-[0.65rem] text-on-surface-variant uppercase tracking-tight mt-4 text-center">Sovereign Sentry Protocol Active</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bento Grid: Track Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-32">
        {/* Main Feature Image */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="md:col-span-2 lg:row-span-2 relative group overflow-hidden rounded-sm min-h-[400px]"
        >
          <img 
            alt="Glowing digital server room" 
            className="absolute inset-0 w-full h-full object-cover grayscale opacity-60 group-hover:scale-105 transition-transform duration-700" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7u0DMqV-qEoVRqUYmY6v2a0aVlQ6dY1jEfSGvJzpISo0U3P_2cxFRdpMqT3MGVBT4DTybMTI3N_xR2mb8C3OHNEHU4pEa8gF0MDqDwcTBxSIX6tPHO3EZypnXiWs_-i6NDbqJgRZbmBNFJXLpXXHeGh3D2hQJEq9EKBzQOg_ND1WJLPOrEn7ch9F9Z41oJict897ne6--T1iCRiTtWL55iWToEoiMgZvjpYMlO6Hou79alMrfiJIFFBAM-jsVAZqTtjsW9zRTWXE" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent"></div>
          <div className="absolute bottom-8 left-8">
            <span className="material-symbols-outlined text-tertiary text-4xl mb-4" data-icon="shield_lock">shield_lock</span>
            <h3 className="text-2xl font-headline font-bold text-on-surface">Security Fundamentals</h3>
            <p className="text-on-surface-variant font-label text-sm uppercase tracking-widest mt-2">Core Component 01</p>
          </div>
        </motion.div>

        {/* Detail Cards */}
        {[
          { icon: 'security', title: 'Basic Protection', desc: 'Deployment of essential defense layers for personal and enterprise environments.', color: 'text-primary', border: 'border-primary' },
          { icon: 'warning', title: 'Common Threats', desc: 'Analysis of phishing, malware, and social engineering vectors.', color: 'text-secondary', border: 'border-secondary' },
          { icon: 'workspace_premium', title: 'Verified Certificate', desc: 'Industry-recognized validation of your foundational security expertise.', color: 'text-tertiary', border: 'border-tertiary' }
        ].map((item, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 * (idx + 1) }}
            className={`bg-surface-container-low p-8 flex flex-col justify-between border-l-2 ${item.border}`}
          >
            <span className={`material-symbols-outlined ${item.color} mb-4`}>{item.icon}</span>
            <div>
              <h4 className="font-headline font-bold text-lg mb-2">{item.title}</h4>
              <p className="text-on-surface-variant text-sm">{item.desc}</p>
            </div>
          </motion.div>
        ))}

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="bg-surface-container-highest p-8 flex flex-col justify-center items-center text-center space-y-4"
        >
          <div className="font-label text-[2.5rem] font-black text-on-primary-fixed-variant tracking-tighter">04</div>
          <div className="font-label text-[0.7rem] uppercase tracking-[0.3em] text-primary">Intensive Weeks</div>
        </motion.div>
      </div>

      {/* Course Curriculum Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-32">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-4"
        >
          <h2 className="font-headline text-3xl font-bold tracking-tight mb-6">Tactical Curriculum</h2>
          <p className="text-on-surface-variant mb-8 leading-relaxed">
            Designed by elite sentinels, our curriculum bypasses fluff to deliver actionable intelligence from day one.
          </p>
          <div className="space-y-6">
            {[
              { id: '01', title: 'Environment Setup' },
              { id: '02', title: 'Network Reconnaissance' },
              { id: '03', title: 'Offensive Awareness' },
              { id: '04', title: 'Hardening Protocols' }
            ].map((module, i) => (
              <div key={i} className="flex items-center space-x-4 p-4 bg-surface-container-lowest border border-outline-variant/10">
                <span className="font-label text-primary font-bold">{module.id}</span>
                <span className="font-headline text-sm font-semibold uppercase tracking-wider">{module.title}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="lg:col-span-8"
        >
          <div className="relative rounded-sm overflow-hidden aspect-video group w-full h-full min-h-[400px]">
            <img 
              alt="Data visualization dashboard" 
              className="w-full h-full object-cover opacity-80 transition-transform duration-1000 group-hover:scale-110" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA94HJ1z3cuc0ro1NRt30p6lfu6EGso2w0fPDtMfmdytdM1hp8DFRl7KpfrbmHcv6aTIE7MrPzOQXEwub1I3h29W7mked1JGsxRcl1TWDQA0AOoZk8OmXndNHiysJwarE90bHMW6WH8tJQAzx2fv6mBOb6c75xs7SkPGDzk0bmiza_kUvj5fDexfxtB3w2-NJXAdt5WojCR75pvduDbNBYyln_A56yidonwz09Bj3iD9yqguCwcvwEZdS8mKXyFcu1R738aREfjo5s" 
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-surface via-transparent to-primary/20"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 hover:scale-110 transition-all duration-300 shadow-2xl">
                <span className="material-symbols-outlined text-white text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
              </button>
            </div>
            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
              <div className="font-label text-[0.7rem] uppercase tracking-widest text-white drop-shadow-md">Module Preview: Tactical Response</div>
              <div class="font-label text-[0.7rem] uppercase tracking-widest text-secondary drop-shadow-md">Classified Access Only</div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Final Enrollment Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-surface-container-low py-20 px-12 relative overflow-hidden text-center rounded-sm border border-white/5"
      >
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="h-full w-full" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, #b4c5ff 1px, transparent 0)", backgroundSize: "40px 40px" }}></div>
        </div>
        <h2 className="font-headline text-4xl md:text-5xl font-extrabold tracking-tighter mb-6 relative z-10">Begin Your Ascension</h2>
        <p className="text-on-surface-variant max-w-xl mx-auto mb-10 relative z-10">
          Join 12,000+ active operatives. Secure your place in the next cohort starting Monday.
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 relative z-10">
          <button className="px-10 py-5 bg-primary text-on-primary font-label text-sm font-black uppercase tracking-[0.2em] rounded-sm shadow-[0_10px_40px_rgba(37,99,235,0.3)] hover:translate-y-[-2px] hover:shadow-[0_15px_50px_rgba(37,99,235,0.4)] transition-all">
            Secure Enrollment
          </button>
          <button className="px-10 py-5 border border-outline-variant text-on-surface font-label text-sm font-black uppercase tracking-[0.2em] rounded-sm hover:bg-white/5 transition-all">
            Download Syllabus
          </button>
        </div>
      </motion.section>
    </main>
  );
}
