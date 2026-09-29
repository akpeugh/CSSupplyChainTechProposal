import React from 'react';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';
import { Workflow } from 'lucide-react';

interface NavigationProps {
  sections: { id: string; title: string; label: string }[];
  activeSection: string;
  onOpenOperatingModel?: () => void;
}

export function Navigation({ sections, activeSection, onOpenOperatingModel }: NavigationProps) {
  return (
    <nav className="fixed left-0 top-1/2 -translate-y-1/2 z-50 p-8 hidden xl:flex flex-col gap-6">
      <div className="absolute left-[39px] top-10 bottom-24 w-[2px] bg-slate-800 -z-10 rounded-full" />
      
      {sections.map((section, index) => {
        const isActive = activeSection === section.id;
        
        return (
          <a
            key={section.id}
            href={`#${section.id}`}
            className={cn(
              "group flex items-center gap-4 transition-all duration-300",
              isActive ? "opacity-100" : "opacity-50 hover:opacity-100"
            )}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <div className="relative flex items-center justify-center w-6 h-6">
              <div 
                className={cn(
                  "w-3 h-3 rounded-full transition-all duration-500",
                  isActive ? "bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)] scale-100" : "bg-slate-700 scale-75 group-hover:scale-100"
                )}
              />
              {isActive && (
                <motion.div
                  layoutId="active-nav-indicator"
                  className="absolute inset-0 border-2 border-cyan-500/50 rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </div>
            
            <div className="flex flex-col">
              <span className="text-xs font-bold tracking-widest text-slate-400 uppercase">
                {String(index + 1).padStart(2, '0')} {section.label}
              </span>
              <span className={cn(
                "text-sm font-semibold transition-all duration-300",
                isActive ? "text-cyan-400" : "text-slate-400"
              )}>
                {section.title}
              </span>
            </div>
          </a>
        );
      })}

      {/* Operating Model Quick Trigger */}
      {onOpenOperatingModel && (
        <div className="pt-2 pl-1">
          <button
            onClick={onOpenOperatingModel}
            className="flex items-center gap-3 px-3.5 py-2.5 rounded-2xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 hover:text-cyan-200 transition-all text-xs font-bold shadow-[0_0_20px_rgba(6,182,212,0.15)] group cursor-pointer"
          >
            <Workflow size={15} className="text-cyan-400 group-hover:rotate-45 transition-transform" />
            <span className="tracking-wider uppercase">Operating Model</span>
          </button>
        </div>
      )}
    </nav>
  );
}