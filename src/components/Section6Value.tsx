import React from 'react';
import { motion } from 'motion/react';
import { Plus } from 'lucide-react';

const LESS = [
  { title: "LESS FRAGMENTATION", text: "Connect what we already have. Create visibility across systems, architecture, data and initiatives before purchasing or building another solution." },
  { title: "LESS DEPENDENCY", text: "Build intelligently where it makes sense. Use existing platforms, internal capabilities, AI and emerging development tools to solve appropriate problems." },
  { title: "LESS REWORK", text: "Bring business + technology together earlier. Embed operational knowledge, solution design, architecture and deployment thinking at the beginning." }
];

const MORE = [
  { title: "MORE SPEED", text: "Rapid prototypes and faster validation." },
  { title: "MORE SCALE", text: "Successful ideas have a defined path to enterprise architecture." },
  { title: "MORE ADOPTION", text: "Solutions are designed and deployed by people who understand the operation." },
  { title: "MORE VALUE", text: "Technology investment is connected to measurable operational outcomes." }
];

export function Section6Value({ id }: { id: string }) {
  return (
    <section id={id} className="min-h-screen py-24 flex flex-col justify-center">
      {/* 1. Unlocking Enterprise Capacity Heading (Same format as DO MORE WITH LESS) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-12 text-center"
      >
        <h2 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400">
          UNLOCKING <br className="md:hidden"/> ENTERPRISE CAPACITY.
        </h2>
      </motion.div>

      {/* Formula Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="w-full max-w-4xl mx-auto bg-slate-900/70 backdrop-blur-2xl rounded-3xl p-5 sm:p-6 border border-cyan-500/30 flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 text-center shadow-[0_0_40px_rgba(6,182,212,0.15),_inset_0_1px_0_rgba(255,255,255,0.15)] mb-16 relative overflow-hidden"
      >
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        
        {/* Formula Inputs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm font-semibold text-slate-300">
          <span className="bg-slate-800/80 border border-slate-700/80 px-3.5 py-2 rounded-xl text-slate-200 shadow-sm">
            Existing Talent
          </span>
          <Plus size={14} className="text-cyan-400 flex-shrink-0" />
          <span className="bg-slate-800/80 border border-slate-700/80 px-3.5 py-2 rounded-xl text-slate-200 shadow-sm">
            Existing Technology
          </span>
          <Plus size={14} className="text-cyan-400 flex-shrink-0" />
          <span className="bg-slate-800/80 border border-slate-700/80 px-3.5 py-2 rounded-xl text-slate-200 shadow-sm">
            Stronger Architecture
          </span>
          <Plus size={14} className="text-cyan-400 flex-shrink-0" />
          <span className="bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 px-3.5 py-2 rounded-xl shadow-[0_0_15px_rgba(6,182,212,0.2)]">
            AI
          </span>
        </div>
      </motion.div>

      {/* 2. LESS vs MORE Breakdown */}
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-6xl mx-auto w-full mb-16">
        
        {/* LESS */}
        <div className="space-y-6">
          <div className="text-xs font-extrabold uppercase tracking-widest text-slate-400 flex items-center gap-2 pl-2">
            <span className="w-2 h-2 rounded-full bg-slate-400" />
            <span>Eliminating Waste & Friction</span>
          </div>
          {LESS.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="bg-slate-900/50 backdrop-blur-xl p-6 rounded-2xl shadow-2xl shadow-black/50 border border-white/10 relative overflow-hidden group hover:border-white/20 transition-colors"
            >
              <div className="absolute left-0 top-0 w-1.5 h-full bg-slate-300 group-hover:bg-cyan-400 transition-colors" />
              <h3 className="text-lg md:text-xl font-bold text-slate-100 mb-2 pl-3">{item.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed pl-3">{item.text}</p>
            </motion.div>
          ))}
        </div>

        {/* MORE */}
        <div className="relative">
          <div className="text-xs font-extrabold uppercase tracking-widest text-cyan-400 flex items-center gap-2 pl-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>Accelerating Impact & Scalability</span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {MORE.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + (i * 0.1) }}
                className="bg-gradient-to-br from-cyan-500 to-blue-600 p-6 rounded-2xl shadow-[0_0_30px_rgba(6,182,212,0.25)] relative overflow-hidden group hover:scale-[1.02] transition-transform text-white border border-cyan-400/30"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-25 transition-opacity">
                  <Plus size={44} className="text-white" />
                </div>
                <h3 className="text-base md:text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-cyan-50/90 text-xs md:text-sm leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. DO MORE WITH LESS Heading (Directly Above How We Partner) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h2 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400">
          DO MORE <br className="md:hidden"/> WITH LESS.
        </h2>
      </motion.div>
    </section>
  );
}