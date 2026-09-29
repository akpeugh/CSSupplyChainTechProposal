import React from 'react';
import { motion } from 'motion/react';

const CONNECTIONS = [
  "Warehouse Operations",
  "IS / Development",
  "Analytics",
  "HR / Workforce Tech",
  "Continuous Improvement",
  "Industrial Engineering",
  "Transportation",
  "Vendors",
  "Training / Comms",
  "Leadership"
];

export function Section2WhatWeDo({ id }: { id: string }) {
  return (
    <section id={id} className="min-h-screen py-24 flex flex-col justify-center">
      
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-cyan-400 font-bold tracking-widest uppercase mb-4">The Ecosystem</h3>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
            We already operate at the intersection of business and technology.
          </h2>
          <p className="text-xl text-slate-400 font-light leading-relaxed">
            The team spends time in the operation, understands how technology is actually used, translates business needs into technical requirements, coordinates development resources, tests solutions, supports deployment and continues improving tools after launch.
          </p>
        </motion.div>

        <motion.div 
          className="relative h-[400px] flex items-center justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Center node */}
          <div className="absolute z-10 bg-cyan-500 text-white font-bold px-6 py-4 rounded-xl shadow-xl text-center">
            Supply Chain<br/>Services
          </div>
          
          {/* Orbiting nodes */}
          {CONNECTIONS.map((conn, i) => {
            const angle = (i / CONNECTIONS.length) * Math.PI * 2;
            const radiusX = 160;
            const radiusY = 120;
            const x = Math.cos(angle) * radiusX;
            const y = Math.sin(angle) * radiusY;
            
            return (
              <motion.div
                key={conn}
                className="absolute bg-slate-900/50 backdrop-blur-xl px-3 py-1.5 rounded-full text-xs font-semibold text-slate-400 shadow-2xl shadow-black/50 border border-white/10 whitespace-nowrap z-20"
                initial={{ x: 0, y: 0, opacity: 0 }}
                whileInView={{ x, y, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.4 + (i * 0.05),
                  type: "spring",
                  bounce: 0.3
                }}
                whileHover={{ scale: 1.1, zIndex: 30, color: '#06b6d4', borderColor: '#06b6d4' }}
              >
                {conn}
              </motion.div>
            );
          })}

          {/* SVG connecting lines */}
          <svg className="absolute inset-0 w-full h-full -z-10 opacity-20 pointer-events-none">
            {CONNECTIONS.map((_, i) => {
              const angle = (i / CONNECTIONS.length) * Math.PI * 2;
              const radiusX = 160;
              const radiusY = 120;
              const x2 = 200 + Math.cos(angle) * radiusX; // roughly center 
              const y2 = 200 + Math.sin(angle) * radiusY;
              
              return (
                <motion.line 
                  key={`line-${i}`}
                  x1="50%" y1="50%" 
                  x2={`${50 + (Math.cos(angle) * 35)}%`} 
                  y2={`${50 + (Math.sin(angle) * 35)}%`} 
                  stroke="#22d3ee" 
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              );
            })}
          </svg>
        </motion.div>
      </div>

    </section>
  );
}