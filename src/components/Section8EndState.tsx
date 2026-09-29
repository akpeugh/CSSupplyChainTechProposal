import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ChevronRight, Sparkles, Zap, Users, ShieldCheck, Layers, Rocket } from 'lucide-react';

const FUTURE_STATE_PILLARS = [
  {
    icon: Users,
    tag: "Frontline Proximity",
    title: "Closer to the Problem",
    description: "Operational teams, DC associates, and supervisors co-create solutions with direct access to technology builders—eliminating layers of translation and distortion.",
    accent: "from-cyan-500/20 to-blue-500/20",
    border: "border-cyan-500/30",
    iconColor: "text-cyan-400"
  },
  {
    icon: Zap,
    tag: "Rapid Iteration",
    title: "Speed to Validation",
    description: "Move from operational pain point to working prototype in days and weeks. Rapidly test on the floor to validate real-world impact before large-scale investment.",
    accent: "from-violet-500/20 to-fuchsia-500/20",
    border: "border-violet-500/30",
    iconColor: "text-violet-400"
  },
  {
    icon: ShieldCheck,
    tag: "IS Governance",
    title: "Governed Enterprise Scale",
    description: "A frictionless bridge with IS ensures successful field pilots transition into secure, scalable, and enterprise-supported network solutions.",
    accent: "from-emerald-500/20 to-teal-500/20",
    border: "border-emerald-500/30",
    iconColor: "text-emerald-400"
  }
];

export function Section8EndState({ 
  id, 
  onOpenOperatingModel 
}: { 
  id: string;
  onOpenOperatingModel?: () => void;
}) {
  const scrollToOrg = () => {
    document.getElementById('organization')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id={id} className="min-h-screen py-24 flex flex-col justify-center">
      {/* Header & Core Statement */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-16 text-center max-w-5xl mx-auto"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 mb-5">
          <Sparkles size={14} className="text-cyan-400" />
          <span>08 — End State • Painting the Future</span>
        </div>

        <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white mb-6">
          REMOVE <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-400">LAYERS.</span>
        </h2>

        {/* Primary Statement Showcase Callout */}
        <div className="bg-slate-900/80 backdrop-blur-2xl p-6 sm:p-8 md:p-10 rounded-3xl border border-cyan-500/40 shadow-[0_0_50px_rgba(6,182,212,0.2),_inset_0_1px_0_rgba(255,255,255,0.15)] relative overflow-hidden group">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-500" />
          <div className="absolute -top-24 -right-24 w-60 h-60 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center mb-4 text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
              <Rocket size={24} />
            </div>
            <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight tracking-tight max-w-3xl">
              "Put the power to innovate closer to the people who understand the problem."
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-cyan-300/90 tracking-wide uppercase">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>The Target Future Operating Model</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 3 Pillar Breakdown: How Removing Layers Operates */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto w-full mb-16">
        {FUTURE_STATE_PILLARS.map((pillar, idx) => {
          const Icon = pillar.icon;
          return (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 + idx * 0.15 }}
              className={`bg-slate-900/60 backdrop-blur-xl p-6 md:p-7 rounded-2xl border ${pillar.border} shadow-[0_0_30px_rgba(0,0,0,0.5)] relative overflow-hidden flex flex-col justify-between group hover:border-white/30 transition-all`}
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${pillar.accent} rounded-full blur-2xl pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity`} />
              
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className={`w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center ${pillar.iconColor}`}>
                    <Icon size={20} />
                  </div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 bg-white/5 px-2.5 py-1 rounded-md border border-white/5">
                    {pillar.tag}
                  </span>
                </div>

                <h3 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-cyan-200 transition-colors">
                  {pillar.title}
                </h3>
                
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  {pillar.description}
                </p>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center gap-1.5 text-[11px] font-semibold text-slate-400">
                <Layers size={13} className="text-cyan-400" />
                <span>Zero intermediaries between problem & build</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Navigation Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="flex flex-col sm:flex-row justify-center gap-4 max-w-4xl mx-auto w-full"
      >
        <button 
          onClick={scrollToOrg}
          className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 transition-all shadow-[0_0_25px_rgba(34,211,238,0.35)] hover:shadow-[0_0_35px_rgba(34,211,238,0.55)] border border-cyan-400/30 cursor-pointer active:scale-95 text-sm sm:text-base"
        >
          <span>Explore Proposed Structure</span>
          <ArrowRight size={18} />
        </button>
        <button 
          onClick={onOpenOperatingModel}
          className="bg-slate-900/70 backdrop-blur-xl hover:bg-cyan-500/10 text-white hover:text-cyan-300 border border-white/10 hover:border-cyan-400/40 px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-[0_0_25px_rgba(34,211,238,0.2)] cursor-pointer active:scale-95 group text-sm sm:text-base"
        >
          <span>View Operating Model</span>
          <ChevronRight size={18} className="text-slate-400 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all" />
        </button>
      </motion.div>
    </section>
  );
}
