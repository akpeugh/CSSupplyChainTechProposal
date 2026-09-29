import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { ChevronRight } from 'lucide-react';

const PILLARS = [
  {
    id: "01",
    phase: "STRATEGIZE",
    title: "Tech Strategy & Architecture",
    color: "bg-gradient-to-r from-cyan-400 to-blue-600 shadow-[0_0_20px_rgba(34,211,238,0.5)]",
    textColor: "text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400",
    iconColor: "text-cyan-400",
    question: "Develop an integrated Services technology roadmap that connects systems, data, and architecture; plans for system obsolescence; and reduces unnecessary reliance on costly external platforms.",
    items: [
      "Integrated technology roadmap",
      "Systems & data architecture",
      "System obsolescence planning",
      "Landscape simplification",
      "Automation Strategy (AGVs, Drones, Pick 2 Lite)",
      "End-to-end transformation",
      "Cost reduction / platform independence"
    ]
  },
  {
    id: "02",
    phase: "DESIGN & BUILD",
    title: "Solution Design & Development",
    color: "bg-gradient-to-r from-violet-400 to-fuchsia-600 shadow-[0_0_20px_rgba(167,139,250,0.5)]",
    textColor: "text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400",
    iconColor: "text-violet-400",
    question: "Partner directly with the business to identify needs, design solutions, and rapidly develop and validate new capabilities using AI, emerging development tools, and existing platforms.",
    items: [
      "Business needs identification",
      "Solution design",
      "AI enablement & rapid development",
      "Emerging development tools",
      "Platform & vendor solutions",
      "IS governed experimentation model",
      "Path to scalable enterprise solutions"
    ]
  },
  {
    id: "03",
    phase: "DEPLOY & SUSTAIN",
    title: "Deployment & Adoption",
    color: "bg-gradient-to-r from-emerald-400 to-teal-600 shadow-[0_0_20px_rgba(52,211,153,0.5)]",
    textColor: "text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400",
    iconColor: "text-emerald-400",
    question: "Bring solutions into the operation and make them successful - Provide boots-on-the-ground leadership for implementation, configuration, testing, troubleshooting, training, and change management.",
    items: [
      "Implementation & configuration",
      "Field testing & troubleshooting",
      "Training & change management",
      "Boots-on-the-ground leadership",
      "Stabilization & adoption",
      "Coordination with IS & tech resources",
      "Value realization"
    ]
  }
];

export function Section3Opportunity({ id }: { id: string }) {
  const [hoveredPillar, setHoveredPillar] = useState<string | null>(null);

  return (
    <section id={id} className="min-h-screen py-24 flex flex-col justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-16 text-center max-w-4xl mx-auto"
      >
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 mb-6">
          The opportunity is to <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">connect the lifecycle.</span>
        </h2>
        <p className="text-xl text-slate-400 font-light leading-relaxed">
          Own the integrated strategy connecting these capabilities, identify where technology can enable the business, define the roadmap, connect systems and solutions, and drive transformation end-to-end.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6 relative">
        {PILLARS.map((pillar, i) => {
          const isHovered = hoveredPillar === pillar.id;
          
          return (
            <motion.div
              key={pillar.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              onMouseEnter={() => setHoveredPillar(pillar.id)}
              onMouseLeave={() => setHoveredPillar(null)}
              className={cn(
                "relative bg-slate-900/40 backdrop-blur-2xl rounded-3xl p-8 border transition-all duration-500 overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.1),_0_8px_32px_rgba(0,0,0,0.6)] flex flex-col h-[500px]",
                isHovered ? "border-white/20 shadow-[0_0_40px_rgba(0,0,0,0.8)] scale-[1.02] z-10" : "border-white/5"
              )}
            >
              <div className={cn("absolute top-0 left-0 w-full h-1.5", pillar.color)} />
              
              <div className="flex-shrink-0">
                <div className="flex items-center gap-4 mb-4">
                  <span className={cn("text-5xl font-black opacity-20", pillar.textColor)}>{pillar.id}</span>
                  <span className={cn("text-sm font-bold tracking-widest uppercase", pillar.textColor)}>
                    {pillar.phase}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-6 min-h-[64px]">
                  {pillar.title}
                </h3>
              </div>

              <div className="flex-grow overflow-hidden relative">
                <AnimatePresence initial={false} mode="wait">
                  {isHovered ? (
                    <motion.div
                      key="details"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="h-full flex flex-col"
                    >
                      <ul className="space-y-3 flex-grow overflow-y-auto pr-2 pb-4 scrollbar-hide">
                        {pillar.items.map((item, index) => (
                          <li key={index} className="flex items-start gap-2 text-slate-400 text-sm">
                            <ChevronRight size={16} className={cn("flex-shrink-0 mt-0.5", pillar.iconColor)} />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="question"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <p className="text-base font-medium text-slate-400 text-center italic px-6 leading-relaxed">
                        {pillar.question}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}