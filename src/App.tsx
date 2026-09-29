import React, { useEffect, useState } from 'react';
import { Navigation } from './components/Navigation';
import { Section1Team } from './components/Section1Team';
import { Section2WhatWeDo } from './components/Section2WhatWeDo';
import { Section3Opportunity } from './components/Section3Opportunity';
import { Section4Innovation } from './components/Section4Innovation';
import { Section5Organization } from './components/Section5Organization';
import { Section6Value } from './components/Section6Value';
import { Section7Partner } from './components/Section7Partner';
import { Section8EndState } from './components/Section8EndState';
import { OperatingModelModal } from './components/OperatingModelModal';

const SECTIONS = [
  { id: 'team', label: 'Team', title: 'Supply Chain Services' },
  { id: 'opportunity', label: 'Opportunity', title: 'What We Already Do' },
  { id: 'model', label: 'Model', title: 'Connect The Lifecycle' },
  { id: 'innovation', label: 'Innovation', title: 'Move Fast, Scale Responsibly' },
  { id: 'organization', label: 'Organization', title: 'Proposed Structure' },
  { id: 'value', label: 'Value', title: 'Do More With Less' },
  { id: 'partner', label: 'Partner', title: 'How We Partner' },
  { id: 'future', label: 'Future', title: 'End State' },
];

export default function App() {
  const [activeSection, setActiveSection] = useState(SECTIONS[0].id);
  const [isOperatingModelOpen, setIsOperatingModelOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-50% 0px -50% 0px',
      }
    );

    SECTIONS.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  // Keyboard shortcut (Escape or 'O')
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOperatingModelOpen) {
        setIsOperatingModelOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOperatingModelOpen]);

  return (
    <div className="relative w-full bg-slate-950 text-slate-300 overflow-hidden font-sans">
      {/* Refined Textured Background */}
      <div className="fixed inset-0 bg-[#020617] -z-50">
        {/* Ambient Top Glow (Violet/Blue) */}
        <div className="absolute top-0 inset-x-0 h-[100vh] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(0,0,0,0))] mix-blend-screen opacity-80" />
        {/* Ambient Bottom Glow (Cyan/Teal) */}
        <div className="absolute bottom-0 inset-x-0 h-[80vh] bg-[radial-gradient(ellipse_100%_80%_at_50%_120%,rgba(14,165,233,0.12),rgba(0,0,0,0))] mix-blend-screen opacity-80" />
        
        {/* Noise Texture Overlay for depth */}
        <div 
          className="absolute inset-0 opacity-[0.035] mix-blend-overlay pointer-events-none" 
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }} 
        />
      </div>

      <Navigation 
        sections={SECTIONS} 
        activeSection={activeSection} 
        onOpenOperatingModel={() => setIsOperatingModelOpen(true)}
      />
      
      <main className="w-full xl:pl-64">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <Section1Team id={SECTIONS[0].id} />
          <Section2WhatWeDo id={SECTIONS[1].id} />
          <Section3Opportunity id={SECTIONS[2].id} />
          <Section4Innovation id={SECTIONS[3].id} />
          <Section5Organization id={SECTIONS[4].id} />
          <Section6Value id={SECTIONS[5].id} />
          <Section7Partner id={SECTIONS[6].id} />
          <Section8EndState 
            id={SECTIONS[7].id} 
            onOpenOperatingModel={() => setIsOperatingModelOpen(true)}
          />
        </div>
      </main>

      {/* Operating Model Modal */}
      <OperatingModelModal 
        isOpen={isOperatingModelOpen} 
        onClose={() => setIsOperatingModelOpen(false)} 
      />
    </div>
  );
}
