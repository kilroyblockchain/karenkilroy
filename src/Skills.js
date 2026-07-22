import React from 'react';
import {
  BrainCircuit,
  ClipboardCheck,
  Cloud,
  FileCheck,
  HeartPulse,
  Home,
  Layers,
  ShieldCheck,
  Stethoscope,
  Terminal,
  Wrench
} from 'lucide-react';

const skillGroups = [
  {
    title: 'AI & Agentic Systems',
    icon: BrainCircuit,
    items: [
      'Azure AI Foundry agent setup, configuration, and validation',
      'Codex 5.6, ChatGPT 5.6, Claude Fable, Claude Code, and Azure OpenAI workflows',
      'Retrieval-augmented generation, model routing, prompt guardrails, and abstention design',
      'Agent capability abstraction, capability routing, drift audits, and conformance checks',
      'Free2PA-style signed control-file verification before model context load',
      'Model Context Protocol and AI assistant tool orchestration'
    ]
  },
  {
    title: 'Healthcare AI & Prior Authorization',
    icon: HeartPulse,
    items: [
      'Patient prior authorization QA systems for oncology workflows',
      'Clinical NLP extraction for ECOG, biomarkers, trial status, and guideline fields',
      'RCM evidence panels for denial risk, calibration, leakage review, and model validation',
      'Workflow optimization for intake, document review, clinical review, submission, appeals, and follow-up',
      'PHI-safe clinical review patterns and human-in-the-loop routing'
    ]
  },
  {
    title: 'Clinical Data & Terminology',
    icon: Stethoscope,
    items: [
      'FHIR R4 data modeling, mock services, patient-resource seeding, and integration testing',
      'SNOMED CT subsumption research and terminology-service integration',
      'ICD-10 scraper/indexer research and sync pipeline analysis',
      'NCCN and ASCO guideline provenance, citation handling, and RAG evaluation',
      'OpenEMR, Availity, payer-policy, and CMS interoperability research'
    ]
  },
  {
    title: 'QA, Observability & Verification',
    icon: ClipboardCheck,
    items: [
      'End-to-end patient PA QA harnesses and preview smoke tests',
      'Agent trace review, data-flow analysis, runtime metrics, and per-step attribution',
      'Asynchronous workflow monitoring, worker dispatch validation, and integration quality review',
      'Digital Twin assisted QA, before/after evidence capture, and demo-readiness verification',
      'Playbooks, test skills, scorecards, and automated drift checks'
    ]
  },
  {
    title: 'Audit, Compliance & Governance',
    icon: ShieldCheck,
    items: [
      'Tamper-evident audit hash chains and rechain approval workflows',
      'RBAC, RLS, role hierarchy review, and permission-bound admin surfaces',
      'HIPAA-oriented audit logging, PHI persistence guards, and Safe Harbor review',
      'Free2PA, C2PA content provenance, AI supply-chain governance, and signed artifacts',
      'Technical standards leadership and boardroom-ready risk communication'
    ]
  },
  {
    title: 'Cloud, DevOps & Infrastructure',
    icon: Cloud,
    items: [
      'Azure App Service deployment validation, release tracking, and smoke tests',
      'Bicep infrastructure, Managed Identity, Key Vault, App Insights, Log Analytics, and Azure Monitor',
      'Message-driven worker systems, KEDA scale-to-zero behavior, and deployment alignment review',
      'Azure DevOps Boards, GitHub PR workflows, CI gates, build pipelines, and release hygiene',
      'Security CVE triage, dependency remediation, and environment-variable hardening'
    ]
  },
  {
    title: 'Full-Stack Product Engineering',
    icon: Layers,
    items: [
      'React, Next.js, TypeScript, Node.js, Prisma, PostgreSQL, and data access layer design',
      'Server routes, API development, SSE streaming, and real-time dashboard surfaces',
      'Radix/React component work, responsive UI polish, and accessibility fixes',
      'No-code/low-code platform architecture with NYX NoCode and Peopleoids',
      'Technical documentation, PRDs, grant reporting, and research-to-ticket backlog design'
    ]
  }
];

const highlights = [
  { label: 'Healthcare AI', value: 'Patient PA QA' },
  { label: 'Agent Platforms', value: 'Foundry + Codex + Claude' },
  { label: 'Governance', value: 'Free2PA + C2PA' },
  { label: 'Delivery', value: 'React + Azure' }
];

export default function Skills() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <nav className="p-4 md:p-6 flex justify-between items-center border-b border-slate-800 sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md">
        <a href="/" className="text-lg md:text-xl font-bold tracking-tighter hover:text-blue-400 transition">KAREN KILROY</a>
        <div className="flex items-center gap-3 md:gap-6 text-sm md:text-base">
          <a href="/" className="hover:text-blue-400 transition flex items-center gap-1">
            <Home size={14} /> Home
          </a>
          <a href="/resume" className="hover:text-blue-400 transition flex items-center gap-1">
            <FileCheck size={14} /> Resume
          </a>
        </div>
      </nav>

      <header className="px-4 md:px-6 py-12 md:py-20 max-w-6xl mx-auto">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-sm mb-6">
            <Wrench size={14} className="text-blue-400" />
            <span className="text-blue-300">Skills Inventory</span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6">
            Practical AI engineering skills for regulated, auditable systems.
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed">
            This is the working skill map behind my resume: agentic AI, patient prior authorization QA, Free2PA provenance, healthcare data,
            cloud infrastructure, provenance, and full-stack product delivery.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
          {highlights.map((item) => (
            <div key={item.label} className="border border-slate-800 bg-slate-900/70 rounded-lg p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-2">{item.label}</p>
              <p className="text-xl font-bold text-blue-300">{item.value}</p>
            </div>
          ))}
        </div>
      </header>

      <main className="px-4 md:px-6 pb-16 md:pb-24">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-5">
          {skillGroups.map(({ title, icon: Icon, items }) => (
            <section key={title} className="border border-slate-800 bg-slate-900/70 rounded-lg p-5 md:p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center">
                  <Icon size={20} className="text-blue-300" />
                </div>
                <h2 className="text-xl font-bold">{title}</h2>
              </div>
              <ul className="space-y-3 text-slate-300">
                {items.map((item) => (
                  <li key={item} className="flex gap-3 leading-relaxed">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-400"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <section className="max-w-6xl mx-auto mt-6 border border-slate-800 bg-slate-900/70 rounded-lg p-5 md:p-6">
          <div className="flex items-center gap-3 mb-4">
            <Terminal size={22} className="text-blue-300" />
            <h2 className="text-xl font-bold">How I Describe the Bundle</h2>
          </div>
          <p className="text-slate-300 leading-relaxed">
            I build AI systems where the output is not enough. The work has to be traceable, reviewable, clinically grounded,
            secure enough for PHI boundaries, and practical enough that product teams can ship it. Free2PA adds signed control-file
            verification to that core skill set; my recent Hidalga work adds patient prior authorization QA, agent observability,
            capability conformance, and audit infrastructure.
          </p>
        </section>
      </main>

      <footer className="py-8 border-t border-slate-900 text-center text-slate-500 text-sm px-4">
        <p>&copy; {new Date().getFullYear()} Karen Kilroy. Built with React &amp; AI.</p>
      </footer>
    </div>
  );
}
