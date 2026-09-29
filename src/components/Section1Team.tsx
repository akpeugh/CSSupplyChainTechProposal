import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Code, Users, Settings, Target } from 'lucide-react';
import { cn } from '../lib/utils';

const LIFECYCLE = [
  "Idea",
  "Design",
  "Pilot",
  "Deployment",
  "Adoption",
  "Value"
];

const TEAM_CAPABILITIES = [
  {
    title: "Program Leadership",
    icon: Target,
    examples: ["Strategic roadmap alignment", "Stakeholder management", "Resource allocation", "Executive reporting"],
    color: "bg-gradient-to-br from-cyan-400 to-blue-600 shadow-[0_0_15px_rgba(34,211,238,0.4)]"
  },
  {
    title: "Solution Design & Innovation",
    icon: Code,
    examples: ["Workflow mockups", "Process mapping", "Rapid prototyping", "UX evaluation"],
    color: "bg-gradient-to-br from-violet-400 to-fuchsia-600 shadow-[0_0_15px_rgba(167,139,250,0.4)]"
  },
  {
    title: "Program Management & Enablement",
    icon: Users,
    examples: ["Project tracking", "Change management", "Training materials", "Communications"],
    color: "bg-gradient-to-br from-blue-400 to-indigo-600 shadow-[0_0_15px_rgba(96,165,250,0.4)]"
  },
  {
    title: "Technical Delivery & Support",
    icon: Settings,
    examples: ["Implementation planning", "Facility readiness", "Tier 2 support", "User acceptance testing"],
    color: "bg-gradient-to-br from-emerald-400 to-teal-600 shadow-[0_0_15px_rgba(52,211,153,0.4)]"
  }
];

export function Section1Team({ id }: { id: string }) {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  return (
    <section id={id} className="min-h-screen py-24 flex flex-col justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 mb-8 drop-shadow-sm">
          SUPPLY CHAIN <br/> SERVICES
        </h1>
        <p className="text-2xl text-slate-300 font-light max-w-3xl leading-relaxed mb-12">
          Connecting operations, technology and people to solve problems across the network.
        </p>

        <div className="bg-slate-900/40 backdrop-blur-2xl p-8 rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.1),_0_8px_32px_rgba(0,0,0,0.6)] border border-white/10 mb-16 relative overflow-hidden">
          <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-cyan-400 to-blue-600" />
          <p className="text-lg text-slate-200 italic">
            "Creating a space where the business and process drive technology—not the other way around. We manage the strategy, roadmap, pilot, design, deployment, and ongoing support for supply chain technology."
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mb-16"
      >
        <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-6">The Current Lifecycle</h4>
        <div className="flex flex-wrap gap-3">
          {LIFECYCLE.map((stage, i) => (
            <React.Fragment key={stage}>
              <motion.div
                whileHover={{ scale: 1.05, backgroundColor: '#06b6d4', color: 'white' }}
                className="px-4 py-2 bg-white/5 text-slate-400 rounded-full text-sm font-medium transition-colors cursor-default border border-white/10"
              >
                {stage}
              </motion.div>
              {i < LIFECYCLE.length - 1 && (
                <div className="text-slate-300 self-center hidden sm:block">→</div>
              )}
            </React.Fragment>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-8">Current Team Capabilities</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TEAM_CAPABILITIES.map((cap, index) => {
            const isExpanded = expandedCard === index;
            const Icon = cap.icon;
            return (
              <motion.div
                key={cap.title}
                layout
                onClick={() => setExpandedCard(isExpanded ? null : index)}
                className={cn(
                  "bg-slate-900/40 backdrop-blur-2xl rounded-2xl p-6 border transition-all cursor-pointer shadow-[inset_0_1px_0_rgba(255,255,255,0.1),_0_8px_32px_rgba(0,0,0,0.6)]",
                  isExpanded ? "border-cyan-500/50 shadow-[0_0_30px_rgba(34,211,238,0.2)]" : "border-white/5 hover:border-white/20"
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center text-white", cap.color)}>
                      <Icon size={20} />
                    </div>
                    <h3 className="font-semibold text-lg text-white">{cap.title}</h3>
                  </div>
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="text-slate-400" />
                  </motion.div>
                </div>
                
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-6 mt-4 border-t border-white/10">
                        <ul className="space-y-3">
                          {cap.examples.map((ex, i) => (
                            <li key={i} className="flex items-start gap-3 text-slate-400">
                              <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-2 flex-shrink-0" />
                              <span>{ex}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}