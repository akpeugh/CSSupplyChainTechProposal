import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { ArrowDown } from 'lucide-react';

const FUNNEL_STEPS = [
  { text: "Operational Problem", type: "neutral" },
  { text: "Rapid Solution / Prototype", type: "experiment" },
  { text: "Validate Operational Value", type: "experiment" },
  { text: "Architecture + Security + IS Review", type: "bridge" },
  { text: "Enterprise Solution", type: "enterprise" },
  { text: "Network Deployment", type: "enterprise" }
];

const EXPERIMENT_ITEMS = [
  "AI Enablement", "Automation (AGVs, Drones, Pick 2 Lite)", "Rapid prototypes", "Low-code tools", "Standalone pilots", "UX concepts", "Emerging technologies"
];

const ENTERPRISE_ITEMS = [
  "Security", "Architecture", "Integration", "Data governance", "Scalability", "Supportability", "Enterprise development standards"
];

export function Section4Innovation({ id }: { id: string }) {
  return (
    <section id={id} className="min-h-screen py-24 flex flex-col justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-16 text-center"
      >
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
          Move Fast. <span className="text-cyan-400">Scale Responsibly.</span>
        </h2>
        <div className="bg-slate-900/40 backdrop-blur-2xl p-6 rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.1),_0_8px_32px_rgba(0,0,0,0.6)] border border-white/10 max-w-3xl mx-auto">
          <p className="text-lg text-slate-400 italic">
            "Establish a governed model with IS that enables rapid experimentation while creating a clear path for successful pilots to become secure, scalable enterprise solutions."
          </p>
        </div>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-12 items-stretch max-w-6xl mx-auto w-full">
        
        {/* Left Side: Experimentation Zone */}
        <motion.div 
          className="flex-1 bg-slate-900/40 backdrop-blur-2xl rounded-3xl p-8 border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),_0_8px_32px_rgba(0,0,0,0.6)]"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h3 className="text-xl font-bold text-slate-100 mb-6 flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-violet-500" />
            Experimentation Zone
          </h3>
          <ul className="space-y-3">
            {EXPERIMENT_ITEMS.map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-slate-400 bg-slate-900/50 backdrop-blur-xl px-4 py-2 rounded-lg shadow-2xl shadow-black/50 border border-slate-50 text-sm">
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Center: Funnel */}
        <div className="flex-1 flex flex-col items-center justify-center gap-2 relative py-8">
          {FUNNEL_STEPS.map((step, i) => (
            <React.Fragment key={i}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + (i * 0.1) }}
                className={cn(
                  "w-full max-w-[280px] text-center py-3 px-4 rounded-xl font-semibold shadow-[inset_0_1px_0_rgba(255,255,255,0.1),_0_8px_32px_rgba(0,0,0,0.6)] border z-10 transition-colors backdrop-blur-xl",
                  step.type === 'neutral' ? "bg-slate-900/40 text-slate-100 border-white/10" :
                  step.type === 'experiment' ? "bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 text-violet-200 border-violet-500/30" :
                  step.type === 'bridge' ? "bg-slate-800/80 text-white border-slate-600/50" :
                  "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-200 border-cyan-500/30"
                )}
              >
                {step.text}
              </motion.div>
              
              {i < FUNNEL_STEPS.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  whileInView={{ opacity: 1, height: 'auto' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 + (i * 0.1) }}
                >
                  <ArrowDown className="text-slate-500 my-1" size={20} />
                </motion.div>
              )}
            </React.Fragment>
          ))}
          
          {/* Background gradient connecting the zones conceptually */}
          <div className="absolute inset-y-0 left-1/2 w-[2px] -translate-x-1/2 bg-gradient-to-b from-violet-500/30 via-slate-600/30 to-cyan-500/30 -z-10" />
        </div>

        {/* Right Side: Enterprise Zone */}
        <motion.div 
          className="flex-1 bg-slate-900/40 backdrop-blur-2xl rounded-3xl p-8 border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),_0_8px_32px_rgba(0,0,0,0.6)]"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h3 className="text-xl font-bold text-slate-100 mb-6 flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-cyan-500" />
            Enterprise Zone
          </h3>
          <ul className="space-y-3">
            {ENTERPRISE_ITEMS.map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-slate-400 bg-white/5 px-4 py-2 rounded-lg shadow-2xl shadow-black/50 border border-white/10 text-sm">
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

      </div>
    </section>
  );
}