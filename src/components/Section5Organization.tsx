import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { 
  Users, 
  ChevronDown, 
  ChevronRight, 
  Briefcase, 
  Sparkles, 
  Layers, 
  Target, 
  Cpu, 
  ShieldCheck, 
  GitFork, 
  CheckCircle2, 
  Info,
  Network,
  LayoutGrid,
  UserCheck,
  User,
  ArrowRight,
  Boxes,
  Truck,
  MapPin,
  Building2,
  AlertTriangle,
  TrendingUp,
  Compass
} from 'lucide-react';

interface RoleNode {
  id: string;
  title: string;
  level: 'executive' | 'manager' | 'lead' | 'specialist' | 'engineer';
  department: string;
  headcount?: string;
  tagline?: string;
  focus: string[];
  deliverables?: string[];
  badge?: string;
  color: string;
  borderColor: string;
  glowColor: string;
  textColor: string;
  subRoles?: RoleNode[];
}

// CURRENT BASELINE: WAREHOUSE TECHNOLOGY ONLY
const TODAY_ORG_TREE: RoleNode = {
  id: 'today-manager',
  title: 'Manager, Warehouse Technology',
  level: 'manager',
  department: 'Warehouse Technology (Current Baseline)',
  tagline: 'Current baseline leadership focused strictly on warehouse floor systems and DC operational applications',
  headcount: '1 Manager + 3 Program Managers',
  badge: 'Current Baseline (Warehouse Only)',
  color: 'bg-gradient-to-r from-slate-900 to-slate-950',
  borderColor: 'border-amber-500/40',
  glowColor: 'shadow-[0_0_35px_rgba(245,158,11,0.2)]',
  textColor: 'text-amber-300',
  focus: [
    'Direct management of warehouse floor applications & localized equipment',
    'Tactical DC-specific troubleshooting and immediate operational support',
    'Oversight of 3 dedicated Program Managers across warehouse operational tools',
    'Scope boundary: strictly confined to warehouse technology without broader supply chain integration'
  ],
  deliverables: [
    'Warehouse Connect Rollouts',
    'Shift T&A / Scheduling Tracking',
    'DC Asset Inventory Logs',
    'Gamification Deployment'
  ],
  subRoles: [
    {
      id: 'today-pm-connect-asset',
      title: 'Program Manager – Warehouse Connect, CMS & Asset Management',
      level: 'lead',
      department: 'Warehouse Operations Tech',
      tagline: 'Manages core DC connectivity, content/cart management, and floor hardware asset tracking',
      headcount: '1 Program Manager',
      badge: 'Warehouse Tech Only',
      color: 'bg-amber-950/40',
      borderColor: 'border-amber-500/30',
      glowColor: 'shadow-[0_0_20px_rgba(245,158,11,0.15)]',
      textColor: 'text-amber-300',
      focus: [
        'Warehouse Connect platform oversight and DC connectivity',
        'CMS (Cart Management & Content Management Systems)',
        'Physical DC asset management, handheld scanners, and hardware fleet tracking',
        'Direct warehouse floor user support and hardware issue triage'
      ],
      deliverables: ['Warehouse Connect Runbooks', 'CMS Maintenance Schedules', 'Asset Tracking Register']
    },
    {
      id: 'today-pm-workforce',
      title: 'Program Manager – Payroll, T&A & Flex Scheduling',
      level: 'lead',
      department: 'Warehouse Workforce Tech',
      tagline: 'Oversees warehouse labor systems, time & attendance clocking, and flex shift scheduling tools',
      headcount: '1 Program Manager',
      badge: 'Warehouse Tech Only',
      color: 'bg-amber-950/40',
      borderColor: 'border-amber-500/30',
      glowColor: 'shadow-[0_0_20px_rgba(245,158,11,0.15)]',
      textColor: 'text-amber-300',
      focus: [
        'Time & Attendance (T&A) system maintenance and shift punch accuracy',
        'Payroll system operational integration and shift pay code validation',
        'Flex Scheduling tools and warehouse associate shift bidding platforms',
        'Shift supervisor labor tool support and exception logging'
      ],
      deliverables: ['T&A System Operation SOPs', 'Flex Scheduling Rollout Guides', 'Payroll Interface Audits']
    },
    {
      id: 'today-pm-gamification',
      title: 'Program Manager – Gamification & Warehouse Programs',
      level: 'lead',
      department: 'Warehouse Engagement Tech',
      tagline: 'Drives warehouse associate gamification, floor productivity scorecards, and general warehouse tech programs',
      headcount: '1 Program Manager',
      badge: 'Warehouse Tech Only',
      color: 'bg-amber-950/40',
      borderColor: 'border-amber-500/30',
      glowColor: 'shadow-[0_0_20px_rgba(245,158,11,0.15)]',
      textColor: 'text-amber-300',
      focus: [
        'Warehouse associate gamification platforms and performance leaderboards',
        'Shift incentive tracking and operational motivation dashboards',
        'Execution of all general warehouse technology program rollouts',
        'Floor associate feedback collection on warehouse digital tools'
      ],
      deliverables: ['Gamification Challenge Frameworks', 'Floor Engagement Metrics', 'Program Rollout Plans']
    }
  ]
};

// FUTURE PROPOSED STATE: ALL OF SUPPLY CHAIN
const SCALE_ORG_TREE: RoleNode = {
  id: 'director',
  title: 'Director, Technology & Transformation Services',
  level: 'executive',
  department: 'Supply Chain Transformation Leadership',
  tagline: 'End-to-end supply chain technology strategy, IS enterprise alignment, and multi-facility transformation roadmap',
  headcount: '1 Director',
  badge: 'End-to-End Supply Chain',
  color: 'bg-gradient-to-r from-slate-900 to-slate-950',
  borderColor: 'border-cyan-500/40',
  glowColor: 'shadow-[0_0_35px_rgba(6,182,212,0.25)]',
  textColor: 'text-cyan-300',
  focus: [
    'Supply Chain technology vision spanning Warehousing, ICQA, Customer Experience (CX), Inbound Receiving, Procurement & Field Training',
    'IS partnership & core enterprise roadmap synchronization across all business domains',
    'Cross-functional governance with Operations, IS, Engineering, Transportation, and Procurement',
    'Value realization, capital allocation, and operational ROI across the enterprise transformation portfolio'
  ],
  deliverables: ['Annual Supply Chain Tech Roadmap', 'IS Steering Governance Charter', 'Network Transformation Portfolio'],
  subRoles: [
    {
      id: 'pm-tech-strategy',
      title: 'Program Manager – Tech Strategy & Architecture',
      level: 'lead',
      department: 'Pillar 1: Strategize',
      tagline: 'Single dedicated lead driving end-to-end supply chain tech roadmapping, automation strategy, and IS connectivity',
      headcount: '1 Lead (No Direct Reports)',
      badge: 'Single Lead / No Direct Reports',
      color: 'bg-slate-900/80',
      borderColor: 'border-cyan-500/40',
      glowColor: 'shadow-[0_0_25px_rgba(6,182,212,0.2)]',
      textColor: 'text-cyan-400',
      focus: [
        'End-to-end Supply Chain technology roadmap & landscape simplification (ICQA, Inbound, CX, Procurement)',
        'Advanced automation & robotics strategy (AGVs, Drones, Autonomous Sortation, Vision Systems)',
        'Legacy system obsolescence and technical debt elimination across facilities',
        'Data models, cross-platform system interoperability, and enterprise architecture synchronization with IS'
      ],
      deliverables: ['Supply Chain Tech Roadmap', 'System Obsolescence Blueprint', 'Robotics & Automation Strategy'],
      subRoles: []
    },
    {
      id: 'manager-solution-design',
      title: 'Manager, Solution Design & Development',
      level: 'manager',
      department: 'Pillar 2: Design & Build',
      tagline: 'Rapid prototyping, AI-enabled innovation, and cross-functional supply chain systems engineering',
      headcount: '1 Manager + 2 Program Managers + Engineers',
      badge: 'Design & Build',
      color: 'bg-slate-900/80',
      borderColor: 'border-violet-500/40',
      glowColor: 'shadow-[0_0_25px_rgba(167,139,250,0.2)]',
      textColor: 'text-violet-400',
      focus: [
        'Business needs discovery across ICQA, Inbound Receiving, Procurement, Customer Experience & Warehousing',
        'Rapid pilot builds using modern AI copilots, computer vision, and low-code accelerators',
        'Governance bridge ensuring pilot safety before full-scale enterprise handoff to IS',
        'User-centric interface, handheld UX, and operational ergonomics design'
      ],
      deliverables: ['Prototype Sandbox Models', 'Cross-Functional UX Wireframes', 'Pilot Clearance Packages'],
      subRoles: [
        {
          id: 'pm-ai-innovation',
          title: 'Program Manager – AI & Rapid Innovation',
          level: 'lead',
          department: 'Innovation & Prototyping',
          tagline: 'Oversees AI copilots, vision models, autonomous sorting, and rapid agile prototypes',
          headcount: '1 Program Manager',
          badge: 'Rapid Innovation Lead',
          color: 'bg-violet-950/60',
          borderColor: 'border-violet-400/50',
          glowColor: 'shadow-[0_0_20px_rgba(167,139,250,0.25)]',
          textColor: 'text-violet-300',
          focus: [
            'Manages rapid experimentation pipeline (< 4-week prototype sprint cycles)',
            'Leads AI vision inspection for Inbound Receiving, ICQA accuracy, and smart sorting',
            'Partners with facility champions on live sandbox trials and agentic floor workflows',
            'Drives prototype validation metrics and Gate 2 clearance before production scaling'
          ],
          deliverables: ['AI Pilot Roadmaps', 'Weekly Sprint Velocity', 'Floor Innovation Scorecards'],
          subRoles: [
            {
              id: 'ai-engineer',
              title: 'AI & Rapid Prototype Engineer',
              level: 'engineer',
              department: 'Development',
              tagline: 'Builds lightweight apps, edge AI models & computer vision hooks',
              headcount: '1 Role',
              color: 'bg-slate-900/60',
              borderColor: 'border-violet-500/30',
              glowColor: 'shadow-none',
              textColor: 'text-violet-300',
              focus: ['Edge vision models', 'Custom operational dashboards', 'API micro-services'],
              deliverables: ['Interactive Code Demos', 'Sandbox APIs']
            },
            {
              id: 'ux-designer',
              title: 'UX & Operational Ergonomics Designer',
              level: 'engineer',
              department: 'Product Design',
              tagline: 'Designs high-speed tablet and handheld UI for shift operators and ICQA leads',
              headcount: '1 Role',
              color: 'bg-slate-900/60',
              borderColor: 'border-violet-500/30',
              glowColor: 'shadow-none',
              textColor: 'text-violet-300',
              focus: ['Handheld scanner UX', 'Operator click reduction', 'Visual pick & receive guides'],
              deliverables: ['Figma Prototypes', 'Floor Usability Audits']
            }
          ]
        },
        {
          id: 'pm-solutions-engineering',
          title: 'Program Manager – Enterprise Solutions & Systems',
          level: 'lead',
          department: 'Solutions Engineering',
          tagline: 'Oversees ICQA, Inbound Systems, Procurement integrations, CX workflows & IS handoffs',
          headcount: '1 Program Manager',
          badge: 'Enterprise Systems Lead',
          color: 'bg-violet-950/60',
          borderColor: 'border-violet-400/50',
          glowColor: 'shadow-[0_0_20px_rgba(167,139,250,0.25)]',
          textColor: 'text-violet-300',
          focus: [
            'Transforms operational pain points across ICQA, Inbound Receiving, and Procurement into technical specifications',
            'Governs technical handoff of validated solutions to IS core engineering and cross-functional teams',
            'Aligns Customer Experience (CX) data flows with upstream fulfillment systems',
            'Ensures data integrity across WMS, TMS, ERP, and procurement vendor platforms'
          ],
          deliverables: ['Solution Architecture Blueprints', 'IS Handoff Specifications', 'Cross-Functional Backlog Matrix'],
          subRoles: [
            {
              id: 'solutions-engineer',
              title: 'Senior Solutions Engineer',
              level: 'engineer',
              department: 'Engineering',
              tagline: 'Connects floor systems, ICQA scanners & inbound docks to enterprise databases',
              headcount: '1 Role',
              color: 'bg-slate-900/60',
              borderColor: 'border-violet-500/30',
              glowColor: 'shadow-none',
              textColor: 'text-violet-300',
              focus: ['Integration logic', 'WMS/TMS database query tuning', 'Error handling & APIs'],
              deliverables: ['System Test Scripts', 'Integration APIs']
            },
            {
              id: 'business-systems-analyst',
              title: 'Technical Business Analyst',
              level: 'engineer',
              department: 'Analysis',
              tagline: 'Maps as-is vs to-be labor flows, procurement touchpoints, and process metrics',
              headcount: '1 Role',
              color: 'bg-slate-900/60',
              borderColor: 'border-violet-500/30',
              glowColor: 'shadow-none',
              textColor: 'text-violet-300',
              focus: ['Supply chain process maps', 'User acceptance criteria', 'Cross-functional requirements'],
              deliverables: ['Process Map Blueprints', 'UAT Sign-off Documents']
            }
          ]
        }
      ]
    },
    {
      id: 'manager-deployment',
      title: 'Manager, Deployment & Adoption',
      level: 'manager',
      department: 'Pillar 3: Deploy & Sustain',
      tagline: 'Network-wide field implementation, regional cutover governance, field training, and operational change management',
      headcount: '1 Manager + 2 Regional Deployment Specialists + Field Support',
      badge: 'Deploy & Sustain',
      color: 'bg-slate-900/80',
      borderColor: 'border-emerald-500/40',
      glowColor: 'shadow-[0_0_25px_rgba(52,211,153,0.2)]',
      textColor: 'text-emerald-400',
      focus: [
        'Hands-on network facility readiness, hardware installs, and cutover execution',
        'Regional deployment execution split across East and West network facilities',
        'Field Training, digital job aids, and behavioral change acceleration for shift operators',
        'Network stabilization tracking, Tier-2 support, and handoff to standard operations'
      ],
      deliverables: ['Network Go-Live Playbooks', 'Field Training Modules', 'Regional Stabilization Reports'],
      subRoles: [
        {
          id: 'spec-east-deployment',
          title: 'Deployment Specialist – East Region',
          level: 'lead',
          department: 'East Network Implementation',
          tagline: 'Leads physical implementation, hardware setup, field training, and cutover for Eastern facilities',
          headcount: '1 Deployment Specialist (East)',
          badge: 'East Region Lead',
          color: 'bg-emerald-950/60',
          borderColor: 'border-emerald-400/50',
          glowColor: 'shadow-[0_0_20px_rgba(52,211,153,0.25)]',
          textColor: 'text-emerald-300',
          focus: [
            'Directs boots-on-the-ground facility readiness and hardware mounting across Eastern network DCs',
            'Manages cutover weekends, RF scanner fleets, inbound dock workstations, and pick-to-light carts',
            'Leads on-site Field Training, operator coaching, and bilingual digital job aids for East facilities',
            'Resolves immediate on-shift hardware and network connectivity issues during go-live stabilization'
          ],
          deliverables: ['East Region Readiness Audits', 'Go-Live Execution Plans (East)', 'Eastern Super-User Rosters'],
          subRoles: [
            {
              id: 'field-systems-engineer-east',
              title: 'Field Implementation Engineer (East)',
              level: 'engineer',
              department: 'East Field Engineering',
              tagline: 'Configures scanners, IoT gateways, and dock hardware for East DCs',
              headcount: '1 Role',
              color: 'bg-slate-900/60',
              borderColor: 'border-emerald-500/30',
              glowColor: 'shadow-none',
              textColor: 'text-emerald-300',
              focus: ['Hardware provisioning', 'VLAN connectivity tests', 'Inbound dock printer setup'],
              deliverables: ['Field Config Guides', 'Hardware Diagnostic Logs']
            }
          ]
        },
        {
          id: 'spec-west-deployment',
          title: 'Deployment Specialist – West Region',
          level: 'lead',
          department: 'West Network Implementation',
          tagline: 'Leads physical implementation, hardware setup, field training, and cutover for Western facilities',
          headcount: '1 Deployment Specialist (West)',
          badge: 'West Region Lead',
          color: 'bg-emerald-950/60',
          borderColor: 'border-emerald-400/50',
          glowColor: 'shadow-[0_0_20px_rgba(52,211,153,0.25)]',
          textColor: 'text-emerald-300',
          focus: [
            'Directs boots-on-the-ground facility readiness and hardware mounting across Western network DCs',
            'Manages cutover weekends, RF scanner fleets, inbound dock workstations, and pick-to-light carts',
            'Leads on-site Field Training, operator coaching, and bilingual digital job aids for West facilities',
            'Resolves immediate on-shift hardware and network connectivity issues during go-live stabilization'
          ],
          deliverables: ['West Region Readiness Audits', 'Go-Live Execution Plans (West)', 'Western Super-User Rosters'],
          subRoles: [
            {
              id: 'field-systems-engineer-west',
              title: 'Field Implementation Engineer (West)',
              level: 'engineer',
              department: 'West Field Engineering',
              tagline: 'Configures scanners, IoT gateways, and dock hardware for West DCs',
              headcount: '1 Role',
              color: 'bg-slate-900/60',
              borderColor: 'border-emerald-500/30',
              glowColor: 'shadow-none',
              textColor: 'text-emerald-300',
              focus: ['Hardware provisioning', 'VLAN connectivity tests', 'Inbound dock printer setup'],
              deliverables: ['Field Config Guides', 'Hardware Diagnostic Logs']
            }
          ]
        }
      ]
    }
  ]
};

const ORG_PILLARS = [
  {
    id: "strategy",
    title: "TECH STRATEGY & ARCHITECTURE",
    subtitle: "Strategize",
    manager: "Program Manager – Tech Strategy & Architecture",
    color: "bg-gradient-to-r from-cyan-400 to-blue-600",
    textColor: "text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400",
    glow: "shadow-[0_0_25px_rgba(6,182,212,0.15)]",
    todayTeam: "Informal / fragmented roadmap handling within warehouse silo",
    scaleTeam: "1 Program Manager (Dedicated Lead, No Direct Reports)",
    scaleHighlights: [
      "Program Manager – Tech Strategy & Architecture (1 Lead, No Direct Reports)"
    ],
    resources: [
      "1 Dedicated Program Manager (Tech Strategy & Architecture)",
      "IS Enterprise Architecture Synchronization",
      "Automation Strategy (AGVs, Drones, Vision Sortation)",
      "End-to-End Supply Chain Obsolescence Governance"
    ],
    responsibilities: [
      "Integrated Supply Chain tech roadmap",
      "Automation & robotics strategy (AGVs, Drones)",
      "Legacy system obsolescence planning",
      "Landscape simplification across ICQA, Inbound & Procurement"
    ]
  },
  {
    id: "innovation",
    title: "SOLUTION DESIGN & DEVELOPMENT",
    subtitle: "Design & Build",
    manager: "Manager, Solution Design & Development",
    color: "bg-gradient-to-r from-violet-400 to-fuchsia-600",
    textColor: "text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400",
    glow: "shadow-[0_0_25px_rgba(167,139,250,0.15)]",
    todayTeam: "Ad-hoc floor fixes and single-facility pilot tweaks",
    scaleTeam: "1 Manager + 2 Program Managers + Solutions Engineers + UX Specialists",
    scaleHighlights: [
      "Program Manager – AI & Rapid Innovation",
      "Program Manager – Enterprise Solutions & Systems"
    ],
    resources: [
      "2 Dedicated Program Managers (AI & Systems)",
      "Solutions Engineers & Technical Analysts",
      "UX / Ergonomic Solution Designers",
      "AI / Rapid Prototyping Capability",
      "Cross-Functional System Integrators"
    ],
    responsibilities: [
      "Supply chain business needs discovery (ICQA, CX, Inbound, Procurement)",
      "Rapid prototyping & AI enablement (< 4-week cycles)",
      "Pilot validation & Gate clearance governance",
      "IS production handoffs & cross-functional backlogs"
    ]
  },
  {
    id: "deployment",
    title: "DEPLOYMENT & ADOPTION",
    subtitle: "Deploy & Sustain",
    manager: "Manager, Deployment & Adoption",
    color: "bg-gradient-to-r from-emerald-400 to-teal-600",
    textColor: "text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400",
    glow: "shadow-[0_0_25px_rgba(52,211,153,0.15)]",
    todayTeam: "Direct warehouse PMs handle rollouts as second-hat duty",
    scaleTeam: "1 Manager + 2 Regional Deployment Specialists (East & West) + Field Support",
    scaleHighlights: [
      "Deployment Specialist – East Region",
      "Deployment Specialist – West Region"
    ],
    resources: [
      "2 Dedicated Regional Specialists (1 East, 1 West)",
      "Field Implementation Engineers",
      "Field Training & Enablement Leads",
      "Network Stabilization & Tier-2 Support",
      "Super-User Certification Program"
    ],
    responsibilities: [
      "Regional facility implementation & cutovers (East & West)",
      "Field testing & on-site troubleshooting",
      "Field Training & digital standard work adoption",
      "Stabilization & IS operational handoffs"
    ]
  }
];

export function Section5Organization({ id }: { id: string }) {
  const [scaleMode, setScaleMode] = useState<'today' | 'scale'>('today');
  const [scaleViewMode, setScaleViewMode] = useState<'chart' | 'pillars'>('chart');
  const [expandedPillar, setExpandedPillar] = useState<string | null>('innovation');
  const [selectedRole, setSelectedRole] = useState<RoleNode | null>(null);

  // Helper to open role modal
  const openRoleDetails = (role: RoleNode) => {
    setSelectedRole(role);
  };

  return (
    <section id={id} className="min-h-screen py-24 flex flex-col justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-8 text-center max-w-4xl mx-auto"
      >
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
            Organizational Blueprint
          </span>
        </div>
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-4">
          {scaleMode === 'today' ? "Current Organization (Baseline)" : "Proposed Organization (Scale)"}
        </h2>
        <p className="text-base md:text-lg text-slate-400 font-light leading-relaxed mb-8">
          {scaleMode === 'today' 
            ? "Current baseline structure: Warehouse Technology Manager with 3 Program Managers dedicated to localized warehouse floor tools and DC applications."
            : "A purpose-built structure engineered to scale across the entire Supply Chain—bridging operations with technology across ICQA, Customer Experience, Inbound Receiving, Procurement, Field Training, and Cross-Functional IS Partnerships."}
        </p>
        
        {/* Toggle Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
          {/* Today vs Scale Toggle */}
          <div className="inline-flex items-center bg-slate-900/80 p-1.5 rounded-full border border-white/10 shadow-xl backdrop-blur-xl">
            <button
              onClick={() => setScaleMode('today')}
              className={cn(
                "px-6 py-2.5 rounded-full text-xs md:text-sm font-bold tracking-wider uppercase transition-all cursor-pointer flex items-center gap-2",
                scaleMode === 'today' 
                  ? "bg-amber-950/60 text-amber-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.15),_0_4px_16px_rgba(245,158,11,0.25)] border border-amber-500/40" 
                  : "text-slate-400 hover:text-slate-200"
              )}
            >
              <Building2 size={14} className={scaleMode === 'today' ? "text-amber-400" : "text-slate-400"} />
              <span>Today (Baseline)</span>
            </button>
            <button
              onClick={() => setScaleMode('scale')}
              className={cn(
                "px-6 py-2.5 rounded-full text-xs md:text-sm font-bold tracking-wider uppercase transition-all cursor-pointer flex items-center gap-2",
                scaleMode === 'scale' 
                  ? "bg-gradient-to-r from-cyan-500/20 to-violet-500/20 text-cyan-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.15),_0_4px_16px_rgba(34,211,238,0.2)] border border-cyan-400/40" 
                  : "text-slate-400 hover:text-slate-200"
              )}
            >
              <Sparkles size={14} className="text-cyan-400" />
              <span>Scale (Org Chart)</span>
            </button>
          </div>

          {/* If in scale mode, toggle between Chart Tree and Pillar View */}
          {scaleMode === 'scale' && (
            <div className="inline-flex items-center bg-slate-900/60 p-1 rounded-full border border-white/10 text-xs">
              <button
                onClick={() => setScaleViewMode('chart')}
                className={cn(
                  "px-3.5 py-1.5 rounded-full font-semibold transition-all flex items-center gap-1.5 cursor-pointer",
                  scaleViewMode === 'chart' 
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30" 
                    : "text-slate-400 hover:text-slate-200"
                )}
              >
                <Network size={13} />
                <span>Hierarchical Tree</span>
              </button>
              <button
                onClick={() => setScaleViewMode('pillars')}
                className={cn(
                  "px-3.5 py-1.5 rounded-full font-semibold transition-all flex items-center gap-1.5 cursor-pointer",
                  scaleViewMode === 'pillars' 
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30" 
                    : "text-slate-400 hover:text-slate-200"
                )}
              >
                <LayoutGrid size={13} />
                <span>Pillar Cards</span>
              </button>
            </div>
          )}
        </div>

        {/* Subtitle Banner based on Mode */}
        {scaleMode === 'today' ? (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs text-amber-200/90 bg-amber-950/40 border border-amber-500/30 rounded-full px-4 py-1.5 inline-flex items-center gap-2 max-w-2xl mx-auto shadow-[0_0_15px_rgba(245,158,11,0.15)]"
          >
            <AlertTriangle size={14} className="text-amber-400 flex-shrink-0" />
            <span>
              <strong>Current Baseline:</strong> 1 Manager + 3 Program Managers — strictly scoped to <span className="underline font-semibold">Warehouse Technology only</span>.
            </span>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-2 max-w-3xl mx-auto"
          >
            <div className="text-xs text-slate-300 bg-white/5 border border-cyan-500/30 rounded-full px-4 py-1.5 inline-flex items-center gap-2 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse flex-shrink-0" />
              <span>
                <strong>Scale Org Structure:</strong> 1 PM in Tech Strategy (No Direct Reports), 2 PMs in Solution Design, and 2 Regional Deployment Specialists (East & West).
              </span>
            </div>

            {/* Scope Coverage Pills */}
            <div className="flex flex-wrap justify-center gap-1.5 pt-1">
              <span className="text-[11px] font-semibold text-cyan-300 bg-cyan-950/60 border border-cyan-500/30 px-2.5 py-0.5 rounded-full">
                ✓ ICQA Systems
              </span>
              <span className="text-[11px] font-semibold text-violet-300 bg-violet-950/60 border border-violet-500/30 px-2.5 py-0.5 rounded-full">
                ✓ Customer Experience (CX)
              </span>
              <span className="text-[11px] font-semibold text-emerald-300 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                ✓ Field Training & Enablement
              </span>
              <span className="text-[11px] font-semibold text-blue-300 bg-blue-950/60 border border-blue-500/30 px-2.5 py-0.5 rounded-full">
                ✓ Inbound Receiving / Systems
              </span>
              <span className="text-[11px] font-semibold text-fuchsia-300 bg-fuchsia-950/60 border border-fuchsia-500/30 px-2.5 py-0.5 rounded-full">
                ✓ Procurement & Vendor Tech
              </span>
              <span className="text-[11px] font-semibold text-amber-300 bg-amber-950/60 border border-amber-500/30 px-2.5 py-0.5 rounded-full">
                ✓ Cross-Functional Partnerships (IS, Ops, Eng)
              </span>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* VIEW 1: TODAY BASELINE HIERARCHICAL ORG CHART */}
      {scaleMode === 'today' ? (
        <motion.div
          key="today-chart"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto w-full"
        >
          {/* Top Node: Manager, Warehouse Technology */}
          <div className="flex flex-col items-center mb-8">
            <div 
              onClick={() => openRoleDetails(TODAY_ORG_TREE)}
              className="bg-slate-900/80 backdrop-blur-2xl border border-amber-500/40 text-white p-6 rounded-3xl shadow-[0_0_40px_rgba(245,158,11,0.2),_inset_0_1px_0_rgba(255,255,255,0.15)] text-center max-w-2xl w-full cursor-pointer hover:border-amber-400 transition-all group relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600" />
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-bold tracking-widest uppercase text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                  Current Baseline Role
                </span>
                <span className="text-[10px] text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20 flex items-center gap-1 font-semibold">
                  <UserCheck size={11} className="text-amber-400" />
                  <span>{TODAY_ORG_TREE.headcount}</span>
                </span>
              </div>
              <h3 className="text-xl md:text-2xl font-black text-white group-hover:text-amber-200 transition-colors">
                {TODAY_ORG_TREE.title}
              </h3>
              <p className="text-xs text-slate-300 mt-1 mb-4">
                {TODAY_ORG_TREE.tagline}
              </p>
              <div className="flex flex-wrap justify-center gap-2 text-xs text-slate-300">
                {["Warehouse Connect", "CMS", "Asset Management", "Payroll / T&A Systems", "Flex Scheduling", "Gamification"].map((item) => (
                  <span key={item} className="bg-amber-950/40 text-amber-200/90 px-2.5 py-1 rounded-lg border border-amber-500/20 text-[11px] font-medium">
                    {item}
                  </span>
                ))}
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-amber-400">
                <span className="text-[11px] text-slate-400 italic">Scope: Warehouse floor & DC technology only</span>
                <span className="flex items-center gap-1 text-[11px] font-semibold group-hover:underline">
                  <Info size={12} />
                  Click to view mandate
                </span>
              </div>
            </div>

            {/* Vertical Spine Connector */}
            <div className="w-0.5 h-10 bg-gradient-to-b from-amber-500 to-slate-700 my-1 hidden md:block" />
          </div>

          {/* 3 Program Managers Tree Branch */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch mb-12">
            {TODAY_ORG_TREE.subRoles?.map((pmRole, idx) => (
              <div 
                key={pmRole.id}
                onClick={() => openRoleDetails(pmRole)}
                className="bg-slate-900/70 backdrop-blur-2xl hover:bg-slate-900/90 border border-amber-500/30 hover:border-amber-400/80 p-5 rounded-2xl transition-all cursor-pointer group shadow-[0_0_25px_rgba(245,158,11,0.1)] relative overflow-hidden flex flex-col justify-between"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-amber-600" />
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                      Program Manager #{idx + 1}
                    </span>
                    <span className="text-[10px] text-slate-400 font-semibold bg-white/5 px-2 py-0.5 rounded">
                      1 Role
                    </span>
                  </div>

                  <h4 className="text-sm md:text-base font-bold text-white group-hover:text-amber-200 transition-colors leading-snug mb-2">
                    {pmRole.title}
                  </h4>
                  
                  <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                    {pmRole.tagline}
                  </p>

                  <div className="space-y-1.5 mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 block">
                      Core Systems & Scope:
                    </span>
                    {pmRole.focus.slice(0, 3).map((item, i) => (
                      <div key={i} className="text-xs text-slate-300 flex items-start gap-1.5">
                        <span className="text-amber-400 mt-0.5">•</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-amber-400">
                  <span className="bg-amber-500/10 px-2 py-0.5 rounded text-[10px] font-bold border border-amber-500/20">
                    Warehouse Tech Only
                  </span>
                  <span className="flex items-center gap-1 font-semibold group-hover:underline">
                    <Info size={12} />
                    Details
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Scope Comparison & Transition to Future State Callout */}
          <div className="bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-slate-900/90 border border-cyan-500/30 rounded-3xl p-6 md:p-8 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                  <TrendingUp size={14} className="text-cyan-400" />
                  <span>Strategic Expansion to Supply Chain Scale</span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white">
                  Why Scale from Warehouse Silo to End-to-End Supply Chain?
                </h3>
                <p className="text-xs md:text-sm text-slate-300 max-w-3xl leading-relaxed">
                  Today's team is focused on warehouse floor tools (Warehouse Connect, CMS, Asset Mgmt, T&A, Flex Sched, Gamification). The proposed Scale organization expands this blueprint to unify <strong className="text-cyan-300">ICQA</strong>, <strong className="text-violet-300">Customer Experience</strong>, <strong className="text-emerald-300">Field Training</strong>, <strong className="text-blue-300">Inbound Receiving</strong>, and <strong className="text-fuchsia-300">Procurement</strong> under an agile 3-pillar operating model.
                </p>
              </div>

              <button
                onClick={() => setScaleMode('scale')}
                className="flex-shrink-0 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs md:text-sm font-bold shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:shadow-[0_0_35px_rgba(6,182,212,0.6)] border border-cyan-300/40 transition-all flex items-center gap-2 cursor-pointer group"
              >
                <span>View Proposed Scale Org Chart</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </motion.div>
      ) : scaleViewMode === 'chart' ? (
        <motion.div 
          key="scale-chart"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto w-full"
        >
          {/* Executive Director Level Card */}
          <div className="flex flex-col items-center mb-8">
            <div 
              onClick={() => openRoleDetails(SCALE_ORG_TREE)}
              className="bg-slate-900/70 backdrop-blur-2xl border border-cyan-500/40 text-white p-6 rounded-3xl shadow-[0_0_40px_rgba(6,182,212,0.2),_inset_0_1px_0_rgba(255,255,255,0.15)] text-center max-w-2xl w-full cursor-pointer hover:border-cyan-400 transition-all group relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-violet-400 to-emerald-400" />
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-bold tracking-widest uppercase text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/20">
                  Transformation Executive Lead (All Supply Chain)
                </span>
                <span className="text-[10px] text-slate-400 bg-white/5 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <UserCheck size={11} className="text-cyan-400" />
                  <span>{SCALE_ORG_TREE.headcount}</span>
                </span>
              </div>
              <h3 className="text-xl md:text-2xl font-black text-white group-hover:text-cyan-200 transition-colors">
                {SCALE_ORG_TREE.title}
              </h3>
              <p className="text-xs text-slate-300 mt-1 mb-4">
                {SCALE_ORG_TREE.tagline}
              </p>
              <div className="flex flex-wrap justify-center gap-2 text-xs text-slate-300">
                {["Tech Strategy", "ICQA & Quality", "Customer Experience (CX)", "Inbound Systems", "Procurement", "IS Governance", "Field Training"].map((item) => (
                  <span key={item} className="bg-white/5 px-2.5 py-1 rounded-lg border border-white/5 text-[11px]">
                    {item}
                  </span>
                ))}
              </div>
              <div className="mt-3 text-[11px] text-cyan-400 flex items-center justify-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                <Info size={12} />
                <span>Click to view detailed mandate & deliverables</span>
              </div>
            </div>

            {/* Main Spine Connector */}
            <div className="w-0.5 h-10 bg-gradient-to-b from-cyan-500 to-slate-700 my-1 hidden md:block" />
          </div>

          {/* 3 Main Pillars Org Branches */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 relative items-start">
            
            {/* PILLAR 1: TECH STRATEGY & ARCHITECTURE (1 PERSON - NO DIRECT REPORTS) */}
            {SCALE_ORG_TREE.subRoles && SCALE_ORG_TREE.subRoles[0] && (
              <div className="flex flex-col items-center space-y-4">
                {/* Pillar Header Card */}
                <div 
                  onClick={() => openRoleDetails(SCALE_ORG_TREE.subRoles![0])}
                  className="bg-slate-900/60 backdrop-blur-2xl border border-cyan-500/40 p-5 rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.1),_0_8px_32px_rgba(0,0,0,0.5)] w-full cursor-pointer hover:border-cyan-400 transition-all relative overflow-hidden group"
                >
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-500" />
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">Pillar 1: Strategize</span>
                    <span className="text-[10px] text-cyan-300 bg-cyan-500/20 px-2 py-0.5 rounded font-bold border border-cyan-500/30">1 Person</span>
                  </div>
                  <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {SCALE_ORG_TREE.subRoles[0].title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 mb-3 leading-relaxed">
                    {SCALE_ORG_TREE.subRoles[0].tagline}
                  </p>
                  
                  <div className="text-[11px] text-slate-300 bg-cyan-950/30 border border-cyan-500/20 rounded-xl p-2.5 flex items-center justify-between">
                    <span>Structure:</span>
                    <strong className="text-cyan-300">Single Lead / No Direct Reports</strong>
                  </div>
                </div>

                {/* Vertical Connector */}
                <div className="w-0.5 h-4 bg-cyan-500/40" />

                {/* Scope & Focus Callout for 1-Person Role */}
                <div className="w-full space-y-3">
                  <div className="text-[11px] font-bold uppercase tracking-widest text-cyan-400 px-2 flex items-center gap-1.5">
                    <User size={12} className="text-cyan-400" />
                    <span>Dedicated Mandate (Individual Lead)</span>
                  </div>

                  <div 
                    onClick={() => openRoleDetails(SCALE_ORG_TREE.subRoles![0])}
                    className="bg-slate-900/50 hover:bg-slate-800/70 border border-cyan-500/30 hover:border-cyan-400/50 p-4 rounded-xl transition-all cursor-pointer group shadow-sm relative overflow-hidden"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-cyan-300">Key Domain Responsibilities</span>
                      <span className="text-[10px] text-slate-400 bg-white/5 px-2 py-0.5 rounded">Strategy & Arch</span>
                    </div>
                    
                    <ul className="space-y-1.5 text-[11px] text-slate-300 mb-3">
                      <li className="flex items-start gap-1.5">
                        <CheckCircle2 size={13} className="text-cyan-400 flex-shrink-0 mt-0.5" />
                        <span>Integrated Services multi-year technology roadmaps</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <CheckCircle2 size={13} className="text-cyan-400 flex-shrink-0 mt-0.5" />
                        <span>Automation & robotics strategy (AGVs, Drones, Sortation)</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <CheckCircle2 size={13} className="text-cyan-400 flex-shrink-0 mt-0.5" />
                        <span>System obsolescence & enterprise architecture liaison</span>
                      </li>
                    </ul>

                    <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-cyan-400">
                      <span>Click to view role specifications</span>
                      <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* PILLAR 2: SOLUTION DESIGN & DEVELOPMENT (WITH 2 PROGRAM MANAGERS) */}
            {SCALE_ORG_TREE.subRoles && SCALE_ORG_TREE.subRoles[1] && (
              <div className="flex flex-col items-center space-y-4">
                {/* Pillar Header Card */}
                <div 
                  onClick={() => openRoleDetails(SCALE_ORG_TREE.subRoles![1])}
                  className="bg-slate-900/60 backdrop-blur-2xl border border-violet-500/30 p-5 rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.1),_0_8px_32px_rgba(0,0,0,0.5)] w-full cursor-pointer hover:border-violet-400 transition-all relative overflow-hidden group"
                >
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-400 to-fuchsia-500" />
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-violet-400">Pillar 2: Design & Build</span>
                    <span className="text-[10px] text-violet-300 bg-violet-500/20 px-2 py-0.5 rounded font-bold">1 Manager</span>
                  </div>
                  <h4 className="text-base font-bold text-white group-hover:text-violet-300 transition-colors">
                    {SCALE_ORG_TREE.subRoles[1].title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 mb-3 leading-relaxed">
                    {SCALE_ORG_TREE.subRoles[1].tagline}
                  </p>
                  <div className="text-[11px] text-slate-300 bg-violet-950/30 border border-violet-500/20 rounded-xl p-2.5 flex items-center justify-between">
                    <span>Key Focus:</span>
                    <strong className="text-violet-300">Rapid Prototyping & AI</strong>
                  </div>
                </div>

                {/* Vertical Connector */}
                <div className="w-0.5 h-4 bg-violet-500/40" />

                {/* Subordinate 2 PROGRAM MANAGERS */}
                <div className="w-full space-y-3">
                  <div className="text-[11px] font-bold uppercase tracking-widest text-violet-400 px-2 flex items-center gap-1.5">
                    <Sparkles size={12} className="text-violet-400" />
                    <span>2 Dedicated Program Managers</span>
                  </div>

                  {SCALE_ORG_TREE.subRoles[1].subRoles?.map((pmRole) => (
                    <div 
                      key={pmRole.id}
                      onClick={() => openRoleDetails(pmRole)}
                      className="bg-slate-900/60 hover:bg-slate-800/80 border border-violet-500/30 hover:border-violet-400 p-4 rounded-xl transition-all cursor-pointer group shadow-[0_0_15px_rgba(167,139,250,0.1)] relative overflow-hidden"
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-violet-300 bg-violet-500/20 px-2 py-0.5 rounded border border-violet-500/30">
                          Program Manager
                        </span>
                        <span className="text-[10px] text-slate-400 font-semibold">{pmRole.headcount}</span>
                      </div>
                      <h5 className="text-xs font-bold text-white group-hover:text-violet-200 transition-colors">
                        {pmRole.title}
                      </h5>
                      <p className="text-[11px] text-slate-400 mt-1 mb-2.5 leading-relaxed">
                        {pmRole.tagline}
                      </p>

                      {/* Child capabilities preview */}
                      {pmRole.subRoles && (
                        <div className="pt-2 border-t border-white/5 flex flex-wrap gap-1.5">
                          {pmRole.subRoles.map(cr => (
                            <span key={cr.id} className="text-[10px] bg-white/5 text-slate-300 px-2 py-0.5 rounded">
                              + {cr.title.split(' ')[0]} {cr.title.split(' ')[1]}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PILLAR 3: DEPLOYMENT & ADOPTION (WITH 2 DEPLOYMENT SPECIALISTS) */}
            {SCALE_ORG_TREE.subRoles && SCALE_ORG_TREE.subRoles[2] && (
              <div className="flex flex-col items-center space-y-4">
                {/* Pillar Header Card */}
                <div 
                  onClick={() => openRoleDetails(SCALE_ORG_TREE.subRoles![2])}
                  className="bg-slate-900/60 backdrop-blur-2xl border border-emerald-500/30 p-5 rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.1),_0_8px_32px_rgba(0,0,0,0.5)] w-full cursor-pointer hover:border-emerald-400 transition-all relative overflow-hidden group"
                >
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-teal-500" />
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Pillar 3: Deploy & Sustain</span>
                    <span className="text-[10px] text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded font-bold">1 Manager</span>
                  </div>
                  <h4 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                    {SCALE_ORG_TREE.subRoles[2].title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 mb-3 leading-relaxed">
                    {SCALE_ORG_TREE.subRoles[2].tagline}
                  </p>
                  <div className="text-[11px] text-slate-300 bg-emerald-950/30 border border-emerald-500/20 rounded-xl p-2.5 flex items-center justify-between">
                    <span>Key Focus:</span>
                    <strong className="text-emerald-300">Field Rollouts & Adoption</strong>
                  </div>
                </div>

                {/* Vertical Connector */}
                <div className="w-0.5 h-4 bg-emerald-500/40" />

                {/* Subordinate 2 DEPLOYMENT SPECIALISTS */}
                <div className="w-full space-y-3">
                  <div className="text-[11px] font-bold uppercase tracking-widest text-emerald-400 px-2 flex items-center gap-1.5">
                    <MapPin size={12} className="text-emerald-400" />
                    <span>2 Regional Deployment Specialists (East & West)</span>
                  </div>

                  {SCALE_ORG_TREE.subRoles[2].subRoles?.map((specRole) => (
                    <div 
                      key={specRole.id}
                      onClick={() => openRoleDetails(specRole)}
                      className="bg-slate-900/60 hover:bg-slate-800/80 border border-emerald-500/30 hover:border-emerald-400 p-4 rounded-xl transition-all cursor-pointer group shadow-[0_0_15px_rgba(52,211,153,0.1)] relative overflow-hidden"
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1">
                          <MapPin size={10} />
                          {specRole.badge || "Deployment Specialist"}
                        </span>
                        <span className="text-[10px] text-slate-400 font-semibold">{specRole.headcount}</span>
                      </div>
                      <h5 className="text-xs font-bold text-white group-hover:text-emerald-200 transition-colors">
                        {specRole.title}
                      </h5>
                      <p className="text-[11px] text-slate-400 mt-1 mb-2.5 leading-relaxed">
                        {specRole.tagline}
                      </p>

                      {/* Child capabilities preview */}
                      {specRole.subRoles && (
                        <div className="pt-2 border-t border-white/5 flex flex-wrap gap-1.5">
                          {specRole.subRoles.map(cr => (
                            <span key={cr.id} className="text-[10px] bg-white/5 text-slate-300 px-2 py-0.5 rounded">
                              + {cr.title}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </motion.div>
      ) : (
        /* VIEW 2: PILLAR CARDS (TODAY / SCALE COMPARISON VIEW) */
        <div className="max-w-5xl mx-auto w-full">
          {/* Director Level Card */}
          <motion.div 
            className="bg-slate-900/40 backdrop-blur-2xl border border-cyan-500/30 text-white p-6 rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.1),_0_8px_32px_rgba(0,0,0,0.6)] mb-8 relative z-20 text-center mx-auto max-w-3xl"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-1">
              {scaleMode === 'today' ? "Current Operational Leadership" : "Target Organizational Leadership"}
            </div>
            <h3 className="text-xl md:text-2xl font-bold mb-4">Director, Technology & Transformation Services</h3>
            <div className="flex flex-wrap justify-center gap-2 md:gap-4 text-xs md:text-sm text-navy-200">
              {["Strategy", "Architecture", "Portfolio", "Governance", "IS Partnership", "Innovation", "Value Realization"].map((item, i) => (
                <span key={item} className="flex items-center gap-2 text-slate-300">
                  {i > 0 && <span className="opacity-40">•</span>}
                  {item}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Connecting Lines */}
          <div className="relative h-12 -mt-12 mb-4 z-10 hidden md:block">
            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
              <path d="M 50% 0 L 50% 100% M 16.66% 100% L 16.66% 50% L 83.33% 50% L 83.33% 100%" stroke="#334155" strokeWidth="2" fill="none" />
            </svg>
          </div>

          {/* 3 Pillar Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-20">
            {ORG_PILLARS.map((pillar, index) => {
              const isExpanded = expandedPillar === pillar.id;
              
              return (
                <motion.div
                  key={pillar.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
                  className={cn(
                    "bg-slate-900/40 backdrop-blur-2xl border rounded-2xl overflow-hidden transition-all shadow-[inset_0_1px_0_rgba(255,255,255,0.1),_0_8px_32px_rgba(0,0,0,0.6)] flex flex-col",
                    isExpanded ? "border-white/20 shadow-[0_0_40px_rgba(0,0,0,0.8)] ring-1 ring-slate-500/50" : "border-white/5 hover:border-white/20"
                  )}
                >
                  <div className={cn("h-1.5 w-full", pillar.color)} />
                  
                  <div 
                    className="p-6 cursor-pointer flex-grow"
                    onClick={() => setExpandedPillar(isExpanded ? null : pillar.id)}
                  >
                    <p className={cn("text-xs font-bold tracking-widest uppercase mb-1", pillar.textColor)}>
                      {pillar.subtitle}
                    </p>
                    <h4 className="font-bold text-white leading-tight mb-4 min-h-[40px]">
                      {pillar.title}
                    </h4>
                    
                    {/* Manager Badge */}
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-4">
                      <p className="text-sm font-semibold text-slate-100 flex items-center gap-2">
                        <Users size={16} className="text-slate-400 flex-shrink-0" />
                        <span>{pillar.manager}</span>
                      </p>
                    </div>

                    {/* Mode-specific callout */}
                    <div className="text-xs text-slate-400 mb-4 bg-slate-950/60 p-3 rounded-xl border border-white/5">
                      <span className="font-semibold text-slate-200 block mb-1">
                        {scaleMode === 'today' ? "Current Capacity:" : "Scale Organization Model:"}
                      </span>
                      <span>{scaleMode === 'today' ? pillar.todayTeam : pillar.scaleTeam}</span>
                    </div>

                    {/* Scale Specific Role Highlights */}
                    {scaleMode === 'scale' && pillar.scaleHighlights && (
                      <div className="mb-4 space-y-1.5">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 block">
                          Key Scale Roles:
                        </span>
                        {pillar.scaleHighlights.map((hl, i) => (
                          <div key={i} className="text-xs bg-white/5 border border-white/10 text-slate-200 px-3 py-1.5 rounded-lg flex items-center gap-2">
                            <CheckCircle2 size={13} className="text-cyan-400 flex-shrink-0" />
                            <span className="font-medium">{hl}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <AnimatePresence mode="wait">
                      {(scaleMode === 'scale' || isExpanded) && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-4 border-t border-white/10">
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                              {scaleMode === 'scale' ? "Full Team Composition" : "Potential Resources"}
                            </p>
                            <ul className="space-y-2 mb-6">
                              {pillar.resources.map((res, i) => (
                                <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                                  <div className={cn("w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0", pillar.color)} />
                                  <span>{res}</span>
                                </li>
                              ))}
                            </ul>

                            {pillar.responsibilities.length > 0 && isExpanded && (
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="pt-4 border-t border-white/10"
                              >
                                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Core Responsibilities</p>
                                <div className="flex flex-wrap gap-2">
                                  {pillar.responsibilities.map((resp, i) => (
                                    <span key={i} className="text-xs bg-white/5 text-slate-300 px-2 py-1 rounded-md border border-white/5">
                                      {resp}
                                    </span>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  
                  <div 
                    className="bg-white/5 p-3 flex justify-center cursor-pointer border-t border-white/10"
                    onClick={() => setExpandedPillar(isExpanded ? null : pillar.id)}
                  >
                    <ChevronDown className={cn("text-slate-400 transition-transform", isExpanded && "rotate-180")} size={20} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* Interactive Role Detail Modal / Drawer */}
      <AnimatePresence>
        {selectedRole && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedRole(null)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
            />

            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-slate-900/95 border border-white/15 rounded-3xl p-6 md:p-8 shadow-[0_0_60px_rgba(0,0,0,0.8)] z-10"
            >
              <div className="flex items-center justify-between gap-4 mb-4 pb-4 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/20">
                      {selectedRole.department}
                    </span>
                    {selectedRole.badge && (
                      <span className="text-[11px] font-bold text-violet-300 bg-violet-500/20 px-2.5 py-0.5 rounded-full border border-violet-500/30">
                        {selectedRole.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white">
                    {selectedRole.title}
                  </h3>
                </div>

                <button 
                  onClick={() => setSelectedRole(null)}
                  className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 transition-colors"
                >
                  <ChevronDown className="rotate-90" size={18} />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Primary Mission</h4>
                  <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-2xl border border-white/5">
                    {selectedRole.tagline}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Core Mandate & Focus Areas</h4>
                  <ul className="space-y-2.5">
                    {selectedRole.focus.map((f, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
                        <CheckCircle2 size={16} className="text-cyan-400 flex-shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {selectedRole.deliverables && (
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Key Artifacts & Deliverables</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedRole.deliverables.map((del, i) => (
                        <span key={i} className="text-xs bg-white/5 border border-white/10 text-slate-200 px-3 py-1.5 rounded-xl font-medium">
                          {del}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-8 pt-4 border-t border-white/10 flex justify-end">
                <button 
                  onClick={() => setSelectedRole(null)}
                  className="px-6 py-2.5 rounded-full bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-bold transition-all cursor-pointer"
                >
                  Close Specification
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
