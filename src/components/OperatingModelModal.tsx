import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Workflow, 
  ShieldCheck, 
  GitBranch, 
  TrendingUp, 
  Cpu, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Users, 
  Layers, 
  FileText,
  AlertCircle,
  Play,
  RotateCcw
} from 'lucide-react';
import { cn } from '../lib/utils';

interface OperatingModelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type TabType = 'lifecycle' | 'gates' | 'is-partnership' | 'simulator' | 'metrics';

// Lifecycle RACI Data
const LIFECYCLE_STAGES = [
  {
    id: 'idea',
    step: '01',
    name: 'Idea & Discovery',
    tagline: 'Business & Process First',
    lead: 'Operations & SC Tech',
    scTechRole: 'Accountable for identifying opportunities, process discovery, and framing technology potential.',
    isRole: 'Informed / Consulted on feasibility and existing enterprise capabilities.',
    opsRole: 'Identifies operational pain points and workflow bottlenecks.',
    raci: {
      scTech: 'A',
      ops: 'R',
      is: 'I',
      ieCi: 'C',
      vendors: 'I'
    },
    deliverables: ['Problem Definition Brief', 'Value Hypothesis', 'Triage Classification'],
    color: 'from-cyan-400 to-blue-500'
  },
  {
    id: 'design',
    step: '02',
    name: 'Solution Design',
    tagline: 'Architecture & UX',
    lead: 'SC Tech (Design)',
    scTechRole: 'Designs workflow, user experience, system logic, automation specifications, and tech stack.',
    isRole: 'Consulted for integration patterns, enterprise architecture, and security compliance.',
    opsRole: 'Participates in user story reviews, interactive mockups, and ergonomic checks.',
    raci: {
      scTech: 'A/R',
      ops: 'C',
      is: 'C',
      ieCi: 'C',
      vendors: 'C'
    },
    deliverables: ['Solution Architecture Blueprint', 'UI/UX Interactive Mockup', 'IS Security Guardrail Review'],
    color: 'from-blue-400 to-indigo-500'
  },
  {
    id: 'pilot',
    step: '03',
    name: 'Pilot & Prototyping',
    tagline: 'Rapid Experimentation',
    lead: 'SC Tech (Innovation)',
    scTechRole: 'Builds rapid AI copilots, prototypes AGVs/drones/hardware, conducts sandbox testing.',
    isRole: 'Provides sandbox credentials, API access, and monitors security boundaries.',
    opsRole: 'Designates pilot test warehouse, champion operators, and live testing feedback.',
    raci: {
      scTech: 'A/R',
      ops: 'R',
      is: 'C',
      ieCi: 'C',
      vendors: 'R'
    },
    deliverables: ['Working Prototype / Small Tech Pilot', 'Pilot Performance Scorecard', 'Scale Readiness Report'],
    color: 'from-violet-400 to-fuchsia-500'
  },
  {
    id: 'deploy',
    step: '04',
    name: 'Deployment',
    tagline: 'Boots-on-the-Ground',
    lead: 'SC Tech (Deployment)',
    scTechRole: 'On-site facility implementation, configuration, field testing, and physical installation.',
    isRole: 'Enterprise backend deployment, production server scaling, network infrastructure support.',
    opsRole: 'Facility scheduling, shift alignment, hardware receipt, and floor access.',
    raci: {
      scTech: 'A/R',
      ops: 'R',
      is: 'R',
      ieCi: 'C',
      vendors: 'R'
    },
    deliverables: ['Facility Readiness Sign-off', 'Deployment Checklist', 'Cutover & Go-Live Plan'],
    color: 'from-emerald-400 to-teal-500'
  },
  {
    id: 'adoption',
    step: '05',
    name: 'Adoption & Training',
    tagline: 'Behavioral Change',
    lead: 'SC Tech & Operations',
    scTechRole: 'Role-based training, digital job aids, champion coaching, and Tier-2 troubleshooting.',
    isRole: 'Tier-3 technical infrastructure and system uptime SLAs.',
    opsRole: 'Mandates standard operating procedures (SOPs), tracks operator shift adoption.',
    raci: {
      scTech: 'A',
      ops: 'R',
      is: 'I',
      ieCi: 'R',
      vendors: 'I'
    },
    deliverables: ['Visual Quick-Guides & LMS Modules', 'Super-User Certification', 'Stabilization Scorecard'],
    color: 'from-amber-400 to-orange-500'
  },
  {
    id: 'value',
    step: '06',
    name: 'Value & Scaling',
    tagline: 'Sustained ROI',
    lead: 'Transformation Services',
    scTechRole: 'Measures throughput, calculates cost savings, plans system enhancements and continuous updates.',
    isRole: 'Maintains long-term platform lifecycle, security patching, and core enterprise support.',
    opsRole: 'Realizes sustained labor and speed gains, integrates into standard operational budgets.',
    raci: {
      scTech: 'A/R',
      ops: 'A',
      is: 'R',
      ieCi: 'R',
      vendors: 'I'
    },
    deliverables: ['Post-Launch ROI Audit', 'Obsolescence Roadmap Update', 'Network Rollout Plan'],
    color: 'from-cyan-400 to-emerald-400'
  }
];

// Governance Gates
const GOVERNANCE_GATES = [
  {
    gate: 'Gate 1',
    name: 'Opportunity & Triage Gate',
    when: 'Between Idea & Design',
    purpose: 'Validate the operational problem, ensure process alignment, and decide the rapid development vs. enterprise IS track.',
    criteria: [
      'Identified quantified operational pain point (Labor, Safety, Throughput, or Accuracy)',
      'Confirm business owner commitment and pilot site sponsor',
      'Classify tech scope: Small Tech / AI Pilot vs. Core IS System Change',
      'Initial cost-benefit ratio and feasibility sign-off'
    ],
    approvers: 'Director SC Tech + Operations VP + IS Relationship Lead',
    badge: 'Intake Approval'
  },
  {
    gate: 'Gate 2',
    name: 'Pilot Clearance Gate',
    when: 'Between Design & Pilot',
    purpose: 'Verify that the pilot solution is safe to test on the live warehouse floor with zero operational disruption.',
    criteria: [
      'IS security and data privacy guardrails verified for pilot sandbox',
      'Safety and ergonomic review for hardware/robotics (AGVs, Drones, Pick-to-light)',
      'Pilot success metrics defined (minimum viable throughput / accuracy target)',
      'Contingency fallback procedure established if tech fails on shift'
    ],
    approvers: 'SC Tech Design Manager + Facility General Manager + IS Security Lead',
    badge: 'Pilot Clearance'
  },
  {
    gate: 'Gate 3',
    name: 'Enterprise Scale Gate',
    when: 'Between Pilot & Deployment',
    purpose: 'Transition validated pilots into the formal enterprise architecture with IS for network-wide deployment.',
    criteria: [
      'Pilot achieved >95% target success metrics in live environment',
      'Architecture handoff review: APIs, database scaling, and support model agreed with IS',
      'Procurement and vendor contract finalized for multi-site deployment',
      'Change management, SOPs, and training curriculum finalized'
    ],
    approvers: 'IS Enterprise Architecture Review Board + Director SC Tech + Head of Operations',
    badge: 'Scale Authorization'
  },
  {
    gate: 'Gate 4',
    name: 'Value & Operational Stabilization',
    when: 'Post-Deployment',
    purpose: 'Formally certify that the facility is stabilized, adoption thresholds are met, and value is documented.',
    criteria: [
      'Zero critical blockers for 14 consecutive operational shifts',
      '>90% operator adoption compliance against standard workflow',
      'Documented operational ROI and labor hour variance reduction',
      'Handoff of Tier-1/Tier-2 support routines and feedback loop into roadmap'
    ],
    approvers: 'Regional Operations Director + SC Tech Deployment Manager',
    badge: 'Value Certified'
  }
];

// Triage Simulator Scenarios
const SIMULATOR_SCENARIOS = [
  {
    id: 'agv',
    title: 'AGV / Robotic Pallet Jack Pilot',
    category: 'Small Tech Automation',
    icon: Cpu,
    description: 'Autonomous pallet jacks for dock-to-staging transport to alleviate cross-dock congestion.',
    path: 'Rapid Prototyping Track (SC Tech Led)',
    duration: '4 - 6 Weeks to Pilot',
    steps: [
      { role: 'SC Tech', action: 'Evaluates AGV vendor navigation tech, creates staging zone digital twin mockups.' },
      { role: 'IS Security', action: 'Approves local isolated Wi-Fi VLAN and edge IoT gateway security clearance.' },
      { role: 'Operations', action: 'Runs 3-week pilot on night shift with 2 autonomous jacks; tracks cycle time.' },
      { role: 'Handoff to Scale', action: 'Validated ROI triggers multi-site fleet procurement via Gate 3.' }
    ]
  },
  {
    id: 'ai-vision',
    title: 'AI Vision Loading Dock Verifier',
    category: 'AI & Rapid Tooling',
    icon: Sparkles,
    description: 'Overhead camera model to detect pallet damage and mislabeled freight in real-time.',
    path: 'AI Enablement Sandbox Track',
    duration: '2 - 3 Weeks to Prototype',
    steps: [
      { role: 'SC Tech', action: 'Deploys lightweight vision model using edge inference and camera feed.' },
      { role: 'IS Partnership', action: 'Enforces data privacy guardrails; ensures no PII captured in video stream.' },
      { role: 'Operations', action: 'Tests alerts on floor tablet; eliminates manual photo logging by 80%.' },
      { role: 'Handoff to Scale', action: 'Connects API alerts into central Transportation Management System (TMS).' }
    ]
  },
  {
    id: 'wms-core',
    title: 'Core WMS System Upgrade & Logic Refactor',
    category: 'Core Enterprise IS',
    icon: Layers,
    description: 'Upgrading enterprise WMS allocation algorithms to optimize wave picking logic.',
    path: 'Enterprise IS Core Track (Joint Governance)',
    duration: '3 - 6 Months',
    steps: [
      { role: 'SC Tech', action: 'Translates warehouse picker slotting realities into operational user stories.' },
      { role: 'IS Team', action: 'Leads core database schema refactor, load testing, and enterprise code commit.' },
      { role: 'SC Tech', action: 'Builds operator training sims, conducts field UAT, and manages cutover night.' },
      { role: 'Operations', action: 'Executes wave picking with zero warehouse downtime.' }
    ]
  },
  {
    id: 'pick-to-light',
    title: 'Modular Pick-to-Light Jack Add-On',
    category: 'Small Tech Hardware',
    icon: Workflow,
    description: 'Battery-powered wireless LED light strips mounted on existing manual order picking carts.',
    path: 'Rapid Hardware Retrofit Track',
    duration: '3 Weeks to First Facility',
    steps: [
      { role: 'SC Tech', action: 'Configures lightweight Bluetooth controllers and custom operator UI.' },
      { role: 'IS Alignment', action: 'Reviews lightweight API hook into order line queue.' },
      { role: 'SC Tech Deployment', action: 'Installs hardware on 15 carts in 1 day with zero infrastructure change.' },
      { role: 'Operations', action: 'Achieves 32% pick speed increase with 99.8% pick accuracy.' }
    ]
  }
];

export function OperatingModelModal({ isOpen, onClose }: OperatingModelModalProps) {
  const [activeTab, setActiveTab] = useState<TabType>('lifecycle');
  const [selectedStage, setSelectedStage] = useState<string>('idea');
  const [selectedScenario, setSelectedScenario] = useState<string>('agv');

  if (!isOpen) return null;

  const currentStage = LIFECYCLE_STAGES.find(s => s.id === selectedStage) || LIFECYCLE_STAGES[0];
  const currentScenario = SIMULATOR_SCENARIOS.find(s => s.id === selectedScenario) || SIMULATOR_SCENARIOS[0];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-2xl"
        />

        {/* Modal Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="relative w-full max-w-6xl bg-slate-900/90 border border-white/10 rounded-3xl shadow-[0_0_80px_rgba(0,0,0,0.8),_inset_0_1px_0_rgba(255,255,255,0.15)] overflow-hidden flex flex-col max-h-[90vh] z-10"
        >
          {/* Header */}
          <div className="p-6 md:p-8 border-b border-white/10 bg-slate-900/50 backdrop-blur-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  Target Operating Model (TOM)
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  Supply Chain Technology & Transformation
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                Business-Led Technology Operating Model
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Creating an environment where business and process drive technology—from idea through rapid pilot to enterprise scale.
              </p>
            </div>

            <button 
              onClick={onClose}
              className="self-end md:self-center p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 transition-colors"
              aria-label="Close Operating Model Modal"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="px-6 md:px-8 bg-slate-950/40 border-b border-white/10 flex gap-2 md:gap-4 overflow-x-auto scrollbar-hide">
            {[
              { id: 'lifecycle', label: 'Lifecycle & RACI', icon: Workflow },
              { id: 'gates', label: 'Governance Tollgates', icon: ShieldCheck },
              { id: 'is-partnership', label: 'IS Partnership Swimlanes', icon: GitBranch },
              { id: 'simulator', label: 'Intake & Triage Simulator', icon: Play },
              { id: 'metrics', label: 'Value & KPI Framework', icon: TrendingUp },
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={cn(
                    "flex items-center gap-2 py-4 px-3 border-b-2 text-sm font-bold whitespace-nowrap transition-all",
                    isActive 
                      ? "border-cyan-400 text-cyan-400 shadow-[0_4px_12px_rgba(34,211,238,0.2)]" 
                      : "border-transparent text-slate-400 hover:text-slate-200"
                  )}
                >
                  <Icon size={16} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content Body */}
          <div className="p-6 md:p-8 overflow-y-auto flex-1 custom-scrollbar">
            
            {/* TAB 1: LIFECYCLE & RACI */}
            {activeTab === 'lifecycle' && (
              <div className="space-y-8">
                {/* Interactive Stage Stepper */}
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">
                    Click any lifecycle stage to inspect roles, RACI, and core deliverables:
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                    {LIFECYCLE_STAGES.map((stage) => {
                      const isSelected = selectedStage === stage.id;
                      return (
                        <button
                          key={stage.id}
                          onClick={() => setSelectedStage(stage.id)}
                          className={cn(
                            "relative p-4 rounded-2xl border text-left transition-all flex flex-col justify-between h-28 overflow-hidden",
                            isSelected 
                              ? "bg-slate-800/80 border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.25)] ring-1 ring-cyan-400/30" 
                              : "bg-slate-900/40 border-white/10 hover:border-white/20 hover:bg-slate-800/40"
                          )}
                        >
                          <div className={cn("absolute top-0 left-0 right-0 h-1 bg-gradient-to-r", stage.color)} />
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-400">{stage.step}</span>
                            {isSelected && <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />}
                          </div>
                          <div>
                            <div className={cn("text-sm font-bold truncate", isSelected ? "text-white" : "text-slate-300")}>
                              {stage.name}
                            </div>
                            <div className="text-[11px] text-slate-400 truncate">{stage.tagline}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Detailed Stage Deep-Dive Card */}
                <div className="bg-slate-950/60 rounded-3xl p-6 md:p-8 border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <div className={cn("w-10 h-10 rounded-xl bg-gradient-to-r flex items-center justify-center text-slate-950 font-black text-lg", currentStage.color)}>
                        {currentStage.step}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{currentStage.name}</h3>
                        <p className="text-xs text-cyan-400 font-semibold">{currentStage.tagline} • Primary Lead: {currentStage.lead}</p>
                      </div>
                    </div>

                    {/* RACI Mini Badges */}
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Accountability:</span>
                      {[
                        { label: 'SC Tech', role: currentStage.raci.scTech, color: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' },
                        { label: 'Operations', role: currentStage.raci.ops, color: 'bg-amber-500/20 text-amber-300 border-amber-500/40' },
                        { label: 'IS Partner', role: currentStage.raci.is, color: 'bg-blue-500/20 text-blue-300 border-blue-500/40' },
                        { label: 'IE / CI', role: currentStage.raci.ieCi, color: 'bg-violet-500/20 text-violet-300 border-violet-500/40' },
                      ].map((item, idx) => (
                        <div key={idx} className={cn("px-2.5 py-1 rounded-lg border text-xs font-bold flex items-center gap-1.5", item.color)}>
                          <span>{item.label}:</span>
                          <span className="font-extrabold">{item.role}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Responsibilities Grid */}
                  <div className="grid md:grid-cols-3 gap-6 py-6 border-b border-white/10">
                    <div className="bg-slate-900/60 p-5 rounded-2xl border border-white/5">
                      <div className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-2 flex items-center gap-2">
                        <Users size={14} />
                        Supply Chain Tech Role
                      </div>
                      <p className="text-sm text-slate-300 leading-relaxed">{currentStage.scTechRole}</p>
                    </div>

                    <div className="bg-slate-900/60 p-5 rounded-2xl border border-white/5">
                      <div className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-2 flex items-center gap-2">
                        <GitBranch size={14} />
                        IS Partnership Role
                      </div>
                      <p className="text-sm text-slate-300 leading-relaxed">{currentStage.isRole}</p>
                    </div>

                    <div className="bg-slate-900/60 p-5 rounded-2xl border border-white/5">
                      <div className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2 flex items-center gap-2">
                        <Layers size={14} />
                        Operations Field Role
                      </div>
                      <p className="text-sm text-slate-300 leading-relaxed">{currentStage.opsRole}</p>
                    </div>
                  </div>

                  {/* Stage Deliverables */}
                  <div className="pt-6">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                      <FileText size={14} />
                      Key Stage Artifacts & Deliverables
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {currentStage.deliverables.map((del, i) => (
                        <div key={i} className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-medium text-slate-200">
                          <CheckCircle2 size={14} className="text-emerald-400 flex-shrink-0" />
                          <span>{del}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* RACI Legend note */}
                <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 gap-4 pt-2">
                  <div className="flex items-center gap-4">
                    <span><strong className="text-slate-300">R</strong> = Responsible</span>
                    <span><strong className="text-slate-300">A</strong> = Accountable</span>
                    <span><strong className="text-slate-300">C</strong> = Consulted</span>
                    <span><strong className="text-slate-300">I</strong> = Informed</span>
                  </div>
                  <span className="italic">Ensuring clear ownership without operational ambiguity.</span>
                </div>
              </div>
            )}

            {/* TAB 2: GOVERNANCE GATES */}
            {activeTab === 'gates' && (
              <div className="space-y-6">
                <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-2xl p-4 flex items-start gap-3">
                  <ShieldCheck size={20} className="text-cyan-400 flex-shrink-0 mt-0.5" />
                  <p className="text-xs md:text-sm text-cyan-200 leading-relaxed">
                    <strong>Tollgate Governance:</strong> Moving fast does not mean bypassing safety and enterprise stability. Four structured gates govern the transition from rapid exploration to fully certified enterprise operations.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {GOVERNANCE_GATES.map((gate, index) => (
                    <div 
                      key={index}
                      className="bg-slate-950/60 rounded-3xl p-6 border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] flex flex-col justify-between hover:border-cyan-500/30 transition-all group"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-white/5 text-cyan-400 border border-white/10">
                            {gate.gate}
                          </span>
                          <span className="text-xs font-bold text-slate-400 bg-slate-900 px-2.5 py-1 rounded-md border border-white/5">
                            {gate.when}
                          </span>
                        </div>
                        
                        <h4 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                          {gate.name}
                        </h4>
                        
                        <p className="text-xs text-slate-400 mb-4 leading-relaxed italic">
                          "{gate.purpose}"
                        </p>

                        <div className="space-y-2 mb-6">
                          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Pass Criteria:</div>
                          {gate.criteria.map((c, i) => (
                            <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                              <CheckCircle2 size={14} className="text-cyan-400 mt-0.5 flex-shrink-0" />
                              <span>{c}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                        <span className="text-slate-400 font-medium">Required Sign-off:</span>
                        <span className="text-slate-200 font-bold text-right">{gate.approvers}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: IS PARTNERSHIP SWIMLANES */}
            {activeTab === 'is-partnership' && (
              <div className="space-y-8">
                <div className="text-center max-w-3xl mx-auto">
                  <h3 className="text-xl font-bold text-white mb-2">Two Swimlanes, One Seamless Ecosystem</h3>
                  <p className="text-sm text-slate-400">
                    Eliminating the false dichotomy between speed and security. Supply Chain Tech explores and iterates at the speed of the operation, while IS anchors enterprise integrity and scale.
                  </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 relative">
                  {/* Left Lane: SC Tech Fast Track */}
                  <div className="bg-slate-950/60 rounded-3xl p-6 md:p-8 border border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.1)]">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 flex items-center justify-center font-bold">
                        <Sparkles size={20} />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-white">Supply Chain Tech: Innovation & Pilot Lane</h4>
                        <p className="text-xs text-cyan-400">Speed • Agility • Field Ergonomics • Small Tech</p>
                      </div>
                    </div>

                    <ul className="space-y-3 text-sm text-slate-300 mb-6">
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                        <span><strong>Rapid Prototyping:</strong> Standalone AI copilots, vision proof-of-concepts, low-code utilities.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                        <span><strong>Small Tech Retrofits:</strong> Drones, autonomous pallet jacks, pick-to-light controllers, mobile scanning rigs.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                        <span><strong>Floor UX & Ergonomics:</strong> Real-world testing with operators on shift to refine software interfaces before enterprise coding.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                        <span><strong>Field Implementation:</strong> Direct boots-on-the-ground hardware mounting, configuration, and user training.</span>
                      </li>
                    </ul>

                    <div className="bg-cyan-950/40 border border-cyan-500/20 rounded-2xl p-4 text-xs text-cyan-200">
                      <strong>Cadence:</strong> Daily operational agile standups; 2-4 week sprint cycles; immediate floor validation.
                    </div>
                  </div>

                  {/* Right Lane: IS Enterprise Backbone */}
                  <div className="bg-slate-950/60 rounded-3xl p-6 md:p-8 border border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.1)]">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/40 text-blue-400 flex items-center justify-center font-bold">
                        <ShieldCheck size={20} />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-white">Information Services (IS): Enterprise Scale Lane</h4>
                        <p className="text-xs text-blue-400">Security • Infrastructure • Core WMS • Resilience</p>
                      </div>
                    </div>

                    <ul className="space-y-3 text-sm text-slate-300 mb-6">
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                        <span><strong>Enterprise Architecture:</strong> Core WMS/ERP databases, SAP/Manhattan integrations, cloud infrastructure.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                        <span><strong>Cybersecurity & Compliance:</strong> Network perimeter, SSO/MFA authentication, data encryption, SOC2 controls.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                        <span><strong>Network Infrastructure:</strong> Warehouse high-density Wi-Fi 6, RF coverage, fiber backhaul, IoT gateway security.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                        <span><strong>Enterprise 24/7 SLAs:</strong> Production uptime, disaster recovery, server failover, core patch management.</span>
                      </li>
                    </ul>

                    <div className="bg-blue-950/40 border border-blue-500/20 rounded-2xl p-4 text-xs text-blue-200">
                      <strong>Cadence:</strong> Quarterly enterprise release cycles; monthly architecture review; 99.99% uptime guarantees.
                    </div>
                  </div>
                </div>

                {/* Connecting Governance Bridge */}
                <div className="bg-slate-900/70 border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
                  <div>
                    <div className="text-sm font-bold text-white">Joint IS & SC Tech Steering Mechanism</div>
                    <div className="text-xs text-slate-400 mt-0.5">Bi-weekly architecture syncs, unified intake queue, and pre-approved pilot sandbox environments.</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-slate-300">
                      Zero Shadow IT
                    </span>
                    <span className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-slate-300">
                      Zero Bureaucracy Bottlenecks
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: INTAKE & TRIAGE SIMULATOR */}
            {activeTab === 'simulator' && (
              <div className="space-y-6">
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">
                    Select an operational technology request to simulate its journey through the Operating Model:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {SIMULATOR_SCENARIOS.map((scenario) => {
                      const Icon = scenario.icon;
                      const isSelected = selectedScenario === scenario.id;
                      return (
                        <button
                          key={scenario.id}
                          onClick={() => setSelectedScenario(scenario.id)}
                          className={cn(
                            "p-4 rounded-2xl border text-left transition-all flex flex-col justify-between h-32",
                            isSelected 
                              ? "bg-slate-800/80 border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.25)] ring-1 ring-cyan-400/30" 
                              : "bg-slate-900/40 border-white/10 hover:border-white/20 hover:bg-slate-800/40"
                          )}
                        >
                          <div className="flex items-center justify-between">
                            <div className={cn("p-2 rounded-xl", isSelected ? "bg-cyan-500/20 text-cyan-300" : "bg-white/5 text-slate-400")}>
                              <Icon size={18} />
                            </div>
                            <span className="text-[10px] font-bold uppercase text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-white/5">
                              {scenario.category}
                            </span>
                          </div>
                          <div>
                            <div className={cn("text-sm font-bold truncate", isSelected ? "text-white" : "text-slate-200")}>
                              {scenario.title}
                            </div>
                            <div className="text-xs text-cyan-400 font-semibold">{scenario.duration}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Scenario Simulation View */}
                <div className="bg-slate-950/60 rounded-3xl p-6 md:p-8 border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">{currentScenario.category}</span>
                      <h3 className="text-xl font-bold text-white mt-1">{currentScenario.title}</h3>
                      <p className="text-sm text-slate-400 mt-1">{currentScenario.description}</p>
                    </div>
                    <div className="px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-xs font-bold text-cyan-300 whitespace-nowrap self-start md:self-auto">
                      Path: {currentScenario.path}
                    </div>
                  </div>

                  <div className="py-6 space-y-4">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Step-by-Step Operating Model Execution:</div>
                    <div className="grid md:grid-cols-4 gap-4">
                      {currentScenario.steps.map((step, idx) => (
                        <div key={idx} className="bg-slate-900/60 p-4 rounded-2xl border border-white/5 flex flex-col justify-between relative">
                          <div className="mb-3">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-[11px] font-extrabold text-cyan-400">STEP 0{idx + 1}</span>
                              <span className="text-[10px] font-bold text-slate-400 bg-white/5 px-2 py-0.5 rounded">{step.role}</span>
                            </div>
                            <p className="text-xs text-slate-300 leading-relaxed">{step.action}</p>
                          </div>
                          {idx < 3 && (
                            <ArrowRight size={16} className="text-slate-600 hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-emerald-400" />
                      <span>Zero-friction handoff to enterprise IS when scale criteria are achieved.</span>
                    </div>
                    <button 
                      onClick={() => setSelectedScenario('agv')}
                      className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
                    >
                      <RotateCcw size={12} />
                      <span>Reset</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: VALUE & KPI FRAMEWORK */}
            {activeTab === 'metrics' && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-slate-950/60 p-6 rounded-3xl border border-cyan-500/20 shadow-[0_0_30px_rgba(6,182,212,0.05)]">
                    <div className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-2">Speed & Velocity</div>
                    <div className="text-3xl font-extrabold text-white mb-2">&lt; 4 Weeks</div>
                    <p className="text-xs text-slate-400 leading-relaxed mb-4">Average idea-to-floor-pilot cycle time. Rapid iterations without 9-month backlog delays.</p>
                    <div className="space-y-2 text-xs text-slate-300">
                      <div className="flex justify-between border-b border-white/5 py-1">
                        <span>Intake-to-Triage:</span>
                        <span className="font-bold text-white">48 Hours</span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 py-1">
                        <span>Prototype Build:</span>
                        <span className="font-bold text-white">2 Weeks</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span>Floor Feedback:</span>
                        <span className="font-bold text-white">Real-time</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-950/60 p-6 rounded-3xl border border-emerald-500/20 shadow-[0_0_30px_rgba(52,211,153,0.05)]">
                    <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">Adoption & Engagement</div>
                    <div className="text-3xl font-extrabold text-white mb-2">&gt; 92%</div>
                    <p className="text-xs text-slate-400 leading-relaxed mb-4">Field operator sustained adoption rate achieved through boots-on-the-ground training and UX design.</p>
                    <div className="space-y-2 text-xs text-slate-300">
                      <div className="flex justify-between border-b border-white/5 py-1">
                        <span>Floor Training Hours:</span>
                        <span className="font-bold text-white">&lt; 15 Mins / User</span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 py-1">
                        <span>User Satisfaction:</span>
                        <span className="font-bold text-white">4.8 / 5.0</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span>Tier-1 Resolution:</span>
                        <span className="font-bold text-white">&lt; 1 Hour</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-950/60 p-6 rounded-3xl border border-violet-500/20 shadow-[0_0_30px_rgba(167,139,250,0.05)]">
                    <div className="text-xs font-bold uppercase tracking-wider text-violet-400 mb-2">Cost & Capital Efficiency</div>
                    <div className="text-3xl font-extrabold text-white mb-2">3.5x</div>
                    <p className="text-xs text-slate-400 leading-relaxed mb-4">ROI multiplier achieved by replacing bulky external vendor licenses with modular internal capabilities.</p>
                    <div className="space-y-2 text-xs text-slate-300">
                      <div className="flex justify-between border-b border-white/5 py-1">
                        <span>Vendor Fee Reduction:</span>
                        <span className="font-bold text-white">Target -$450k/yr</span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 py-1">
                        <span>Small Tech Cost:</span>
                        <span className="font-bold text-white">1/10th of Capex</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span>Throughput Lift:</span>
                        <span className="font-bold text-white">+18 - 25%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-6">
                  <h4 className="text-sm font-bold text-white mb-3">Continuous Value Realization Loop</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Unlike traditional IT deployments that conclude at go-live, the Transformation Services operating model maintains ongoing measurement. Every deployed technology is audited quarterly for labor efficiency, operator feedback, and system health—ensuring tools never become forgotten shelfware.
                  </p>
                </div>
              </div>
            )}

          </div>

          {/* Footer */}
          <div className="p-4 md:p-6 border-t border-white/10 bg-slate-950/80 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>Technology & Transformation Services — Target Operating Model</span>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={onClose}
                className="px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white font-bold transition-all border border-white/10"
              >
                Close Model
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
