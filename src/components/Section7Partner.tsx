import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

const PARTNERS = [
  {
    id: "is",
    name: "IS",
    capabilities: "Architecture • Development • Security • Infrastructure",
    involves: ["Strategize", "Design", "Build", "Deploy", "Sustain"],
    color: "bg-slate-800"
  },
  {
    id: "ops",
    name: "Operations",
    capabilities: "Needs • Validation • Adoption • Feedback",
    involves: ["Strategize", "Design", "Deploy", "Sustain"],
    color: "bg-blue-600"
  },
  {
    id: "analytics",
    name: "Analytics",
    capabilities: "Data • Measurement • Insights",
    involves: ["Strategize", "Build", "Sustain"],
    color: "bg-indigo-600"
  },
  {
    id: "ci",
    name: "Continuous Improvement",
    capabilities: "Process • Standardization • Optimization",
    involves: ["Strategize", "Design", "Sustain"],
    color: "bg-emerald-600"
  },
  {
    id: "ie",
    name: "IE / Network Optimization",
    capabilities: "Labor • Capacity • Network Design",
    involves: ["Strategize", "Design"],
    color: "bg-teal-600"
  },
  {
    id: "hr",
    name: "HR / Workforce",
    capabilities: "Employee technology • Policy • Workforce systems",
    involves: ["Strategize", "Sustain"],
    color: "bg-rose-600"
  },
  {
    id: "vendors",
    name: "Vendors",
    capabilities: "Platforms • Specialized capabilities • Support",
    involves: ["Build", "Deploy", "Sustain"],
    color: "bg-amber-600"
  }
];

const LIFECYCLE_STAGES = ["Strategize", "Design", "Build", "Deploy", "Sustain"];

export function Section7Partner({ id }: { id: string }) {
  const [activePartner, setActivePartner] = useState<string | null>(null);

  const activeData = PARTNERS.find(p => p.id === activePartner);

  return (
    <section id={id} className="min-h-screen py-24 flex flex-col justify-center">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
          How We Partner
        </h2>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto italic font-light">
          "The model creates clearer partnership and ownership across existing capabilities."
        </p>
      </div>

      <div className="flex flex-col xl:flex-row gap-12 items-center xl:items-start justify-center max-w-7xl mx-auto w-full relative">
        
        {/* Hub and Spoke (Tree Layout) */}
        <div className="flex-1 w-full relative flex flex-col md:flex-row items-stretch md:items-center gap-4 md:gap-8 justify-center">
          
          {/* Left Spokes (Desktop) */}
          <div className="hidden md:flex flex-1 flex-col gap-4 items-end z-10">
            {PARTNERS.slice(0, 4).map(partner => (
              <PartnerNode 
                key={partner.id} 
                partner={partner} 
                side="left" 
                isActive={activePartner === partner.id}
                onClick={() => setActivePartner(activePartner === partner.id ? null : partner.id)}
              />
            ))}
          </div>

          {/* Center Hub */}
          <div className="z-20 bg-gradient-to-br from-cyan-900/50 to-slate-900 border border-cyan-500/30 text-white text-center p-6 md:p-8 rounded-3xl shadow-[0_0_40px_rgba(6,182,212,0.2)] backdrop-blur-xl w-full md:w-56 font-bold flex-shrink-0 flex flex-col items-center justify-center min-h-[120px] md:min-h-[160px]">
            <span className="text-lg md:text-xl leading-tight">Technology &<br/>Transformation</span>
          </div>

          {/* Right Spokes (Desktop) */}
          <div className="hidden md:flex flex-1 flex-col gap-4 items-start z-10">
            {PARTNERS.slice(4, 7).map(partner => (
              <PartnerNode 
                key={partner.id} 
                partner={partner} 
                side="right" 
                isActive={activePartner === partner.id}
                onClick={() => setActivePartner(activePartner === partner.id ? null : partner.id)}
              />
            ))}
          </div>

          {/* Mobile Spokes */}
          <div className="flex md:hidden flex-col gap-3 w-full mt-2">
            {PARTNERS.map(partner => (
              <PartnerNode 
                key={partner.id} 
                partner={partner} 
                side="center" 
                isActive={activePartner === partner.id}
                onClick={() => setActivePartner(activePartner === partner.id ? null : partner.id)}
              />
            ))}
          </div>
        </div>

        {/* Interaction Panel */}
        <div className="w-full xl:w-[420px] bg-slate-900/40 backdrop-blur-2xl rounded-3xl p-8 border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),_0_8px_32px_rgba(0,0,0,0.6)] min-h-[300px] flex flex-col justify-center flex-shrink-0">
          <AnimatePresence mode="wait">
            {activeData ? (
              <motion.div
                key={activeData.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={cn("w-3 h-3 rounded-full", activeData.color)} />
                  <h3 className="text-2xl font-bold text-white">{activeData.name}</h3>
                </div>
                <p className="text-sm text-slate-400 mb-8">{activeData.capabilities}</p>
                
                <h4 className="text-xs font-bold tracking-widest uppercase text-slate-400 mb-4">Participation</h4>
                
                <div className="flex flex-col gap-2">
                  {LIFECYCLE_STAGES.map(stage => {
                    const isParticipating = activeData.involves.includes(stage);
                    return (
                      <div 
                        key={stage}
                        className={cn(
                          "px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex justify-between items-center",
                          isParticipating ? "bg-white/5 text-cyan-400 border border-white/10" : "bg-transparent text-slate-300"
                        )}
                      >
                        {stage}
                        {isParticipating && <div className="w-2 h-2 rounded-full bg-cyan-500" />}
                      </div>
                    )
                  })}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center text-slate-400"
              >
                <p>Select a partner node to view how they participate across the technology lifecycle.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

interface PartnerNodeProps {
  partner: typeof PARTNERS[number];
  side: 'left' | 'right' | 'center';
  isActive: boolean;
  onClick: () => void;
}

const PartnerNode: React.FC<PartnerNodeProps> = ({ partner, side, isActive, onClick }) => {
  return (
    <motion.div
      layout
      onClick={onClick}
      className={cn(
        "relative cursor-pointer transition-all duration-300 p-4 rounded-2xl border w-full flex flex-col justify-center",
        isActive ? "bg-slate-900/60 backdrop-blur-2xl border-cyan-500/50 shadow-[0_0_40px_rgba(6,182,212,0.2)] ring-1 ring-cyan-500/20 scale-105 z-30" : "bg-slate-900/30 backdrop-blur-xl border-white/5 hover:bg-slate-900/50 hover:border-white/20 hover:shadow-2xl z-10",
        side === 'left' ? "text-right items-end" : side === 'right' ? "text-left items-start" : "text-center items-center"
      )}
    >
      {/* Connector Lines (Desktop Only) */}
      {side === 'left' && (
        <div className={cn(
          "absolute top-1/2 -right-8 w-8 border-t-2 border-dashed transition-colors duration-300 -translate-y-1/2 hidden md:block",
          isActive ? "border-cyan-500/50" : "border-white/20"
        )} />
      )}
      {side === 'right' && (
        <div className={cn(
          "absolute top-1/2 -left-8 w-8 border-t-2 border-dashed transition-colors duration-300 -translate-y-1/2 hidden md:block",
          isActive ? "border-cyan-500/50" : "border-white/20"
        )} />
      )}
      
      <div className="font-bold text-white mb-1">{partner.name}</div>
      <div className="text-[11px] md:text-xs text-slate-400 leading-relaxed hidden sm:block">{partner.capabilities}</div>
    </motion.div>
  );
};