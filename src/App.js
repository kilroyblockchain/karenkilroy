import React, { useState } from 'react';
import { Book, Award, Mail, Linkedin, Terminal, Mic, ShieldCheck, Link2, Menu, X, Radio, Trophy, ExternalLink, Wrench, BriefcaseBusiness, CheckCircle2 } from 'lucide-react';

const Portfolio = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const books = [
    { title: "Natural Language and Search", year: "2024", img: "/img/nls.jpg", url: "https://www.oreilly.com/library/view/natural-language-and/9781098156268/" },
    { title: "Blockchain Tethered AI", year: "2023", img: "/img/bta.jpg", url: "https://www.oreilly.com/library/view/blockchain-tethered-ai/9781098130541/" },
    { title: "AI and the Law", year: "2021", img: "/img/ai_and_the_law.jpeg", url: "https://www.oreilly.com/library/view/ai-and-the/9781492091837/" },
    { title: "Blockchain as a Service", year: "2019", img: "/img/baas.png", url: "https://www.oreilly.com/library/view/blockchain-as-a/9781492073475/" }
  ];

  const focusList = [
    "Policy-first agent runtimes where tool access, context loading, and consequential actions are gated before execution.",
    "Capability abstraction layers that keep agents from binding directly to a vendor, a model, or a database.",
    "Hash-chained forensic execution traces, so any agent run can be reconstructed and attributed to the model that answered.",
    "Knowledge graphs as durable agent memory, with multi-hop retrieval and entity resolution.",
    "Supply chain traceability and chain of custody, from IBM Food Trust to agent audit chains.",
    "Free2PA provenance checks that verify signed agent control files before model context load.",
    "Applying C2PA to agentic systems through its Agentic Task Force, alongside Adobe, Microsoft, Google, OpenAI, and Meta.",
    "Auditable patient prior authorization QA systems for regulated oncology workflows."
  ];

  const marketabilityHighlights = [
    {
      title: "Regulated AI Systems",
      text: "I design AI workflows that can be audited, explained, and reviewed by humans instead of treated as black boxes."
    },
    {
      title: "Policy-First Agent Runtimes",
      text: "I build long-horizon agent workflows with explicit allow/deny decisions, human approval gates, durable state, and recovery paths."
    },
    {
      title: "Agent Provenance",
      text: "I built Free2PA to verify signed agent control files before they enter model context."
    },
    {
      title: "Healthcare QA Infrastructure",
      text: "I build QA surfaces for patient prior authorization workflows, including trace review, PHI-safe paths, and clinical evidence checks."
    },
    {
      title: "Supply Chain Traceability",
      text: "IBM Blockchain Supply Chain, IBM Food Trust, and Oracle Intelligent Track and Trace, plus supply chain blockchain systems I shipped. Provenance is the same problem whether it is a pallet or a model output."
    },
    {
      title: "Standards for Agentic AI",
      text: "Co-Chair of the C2PA AI/ML Task Force and a contributor to its Agentic Task Force, working out how provenance applies to what an agent did and which model answered."
    }
  ];

  const roleTargets = [
    "Agentic AI Systems Engineer",
    "AI Infrastructure Engineer",
    "Distinguished / Principal Engineer, Agentic Platforms",
    "AI Governance / Provenance Consultant"
  ];

  const speakingHighlights = [
    {
      org: "NPR KUAF · Ozarks at Large",
      topic: "RadioHead: Student-Created AI Intern Wins Award",
      description:
        "Jack Travis interviews Karen Kilroy and Aiden Maroney about RadioHead, the broadcast transcription agent that won a student competition and expanded KUAF's capabilities.",
      url: "https://www.kuaf.com/show/ozarks-at-large/2026-05-13/student-created-ai-intern-offers-kuaf-new-abilities-wins-award"
    },
    {
      org: "International Red Cross",
      topic: "C2PA Content Credentials for AI/ML Provenance",
      description:
        "Talk on authenticating AI-generated content so humanitarian teams can verify every asset in the field."
    },
    {
      org: "Actian",
      topic: "Blockchain Kill Switches for Governed AI Systems",
      description:
        "Shared how blockchain-backed controls keep distributed AI infra compliant, explainable, and ready for shutdown when needed."
    },
    {
      org: "University of Arkansas",
      topic: "C2PA Content Credentials and Open Claw",
      description:
        "Hands-on training on creating AI agent trust networks. For AI Club with 175+ student, faculty, and community attendees."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* Navigation */}
      <nav className="p-4 md:p-6 flex justify-between items-center border-b border-slate-800 backdrop-blur-md sticky top-0 z-50 bg-slate-950/80">
        <span className="text-lg md:text-xl font-bold tracking-tighter">KAREN KILROY</span>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6">
          <a href="#about" className="hover:text-blue-400 transition">About</a>
          <a href="#books" className="hover:text-blue-400 transition">Books</a>
          <a href="#projects" className="hover:text-blue-400 transition">Projects</a>
          <a href="/skills" className="hover:text-blue-400 transition flex items-center gap-1"><Wrench size={14} /> Skills</a>
          <a href="#signal" className="hover:text-blue-400 transition">Signal</a>
          <a href="/links" className="hover:text-blue-400 transition flex items-center gap-1"><Link2 size={14} /> Links</a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 hover:bg-slate-800 rounded-lg transition"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[65px] z-40 bg-slate-950/95 backdrop-blur-md">
          <div className="flex flex-col items-center gap-6 pt-12 text-lg">
            <a href="#about" className="hover:text-blue-400 transition" onClick={() => setMobileMenuOpen(false)}>About</a>
            <a href="#books" className="hover:text-blue-400 transition" onClick={() => setMobileMenuOpen(false)}>Books</a>
            <a href="#projects" className="hover:text-blue-400 transition" onClick={() => setMobileMenuOpen(false)}>Projects</a>
            <a href="/skills" className="hover:text-blue-400 transition flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}><Wrench size={18} /> Skills</a>
            <a href="#signal" className="hover:text-blue-400 transition" onClick={() => setMobileMenuOpen(false)}>Signal</a>
            <a href="/links" className="hover:text-blue-400 transition flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}><Link2 size={18} /> Links</a>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <header className="px-4 md:px-6 py-12 md:py-24 max-w-6xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-sm mb-6">
            <span className="text-blue-400 text-xs sm:text-sm">Agentic Systems · Agent Runtimes · Provenance &amp; Traceability</span>

          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
Building <span className="text-blue-500">agents you can hold accountable</span>.
          </h1>
          <p className="text-lg text-slate-300 mb-6 max-w-2xl">
            I architect the layer that decides what an agent is allowed to do &mdash; capability contracts, policy gates, human approval, and audit trails that
            prove what happened &mdash; then build the runtime, the APIs, the data layer, and the operator interfaces around it. 40+ years in IT, the last decade on AI.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 mb-8 text-sm text-slate-400">
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-1">Current build</p>
              <p className="text-slate-100 font-semibold">NYX NoCode</p>
              <p>NYX NoCode is an educator-led platform serving public school customers, transforming classrooms into creative studios where students get hands-on experience with generative AI and modern computing.</p>
            </div>
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-1">Current agent platform</p>
              <p className="text-slate-100 font-semibold">Six-agent regulated pipeline</p>
              <p>
                Architected the capability abstraction layer, policy-first control plane, and hash-chained forensic execution traces behind a HIPAA-regulated multi-agent system.
              </p>
            </div>
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 sm:col-span-2">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-1">Public proof point</p>
              <p className="text-slate-100 font-semibold">Free2PA</p>
              <p>
                A public provenance toolkit for signed agent control files, built to keep unverified instructions out of model context.
              </p>
            </div>
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 sm:col-span-2">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-1">Public product API</p>
              <p className="text-slate-100 font-semibold">Phyllis</p>
              <p>
                A fulfillment API for bot-built commerce storefronts, with product validation, Stripe checkout, human approvals, and order tracking.
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSejoNvJ1vH4mnTaESayh6HO8LglyAmvYpErYyIGT8of2Wp_eg/viewform?usp=header"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 px-4 sm:px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition text-sm sm:text-base"
            >
              <Mail size={18} /> <span className="hidden sm:inline">Inquire via Google Form</span><span className="sm:hidden">Contact</span>
            </a>
            <a
              href="https://linkedin.com/in/karenkilroy"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-slate-700 hover:bg-slate-800 px-4 sm:px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition text-sm sm:text-base"
            >
              <Linkedin size={18} /> LinkedIn
            </a>
            <a
              href="/skills"
              className="border border-slate-700 hover:bg-slate-800 px-4 sm:px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition text-sm sm:text-base"
            >
              <Wrench size={18} /> Skills
            </a>
          </div>
          <a
            href="https://www.kuaf.com/show/ozarks-at-large/2026-05-13/student-created-ai-intern-offers-kuaf-new-abilities-wins-award"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-2 text-sm text-slate-400 hover:text-blue-400 transition-colors group"
          >
            <Radio size={14} className="text-blue-400 flex-shrink-0" />
            <span>NPR KUAF · <em>RadioHead</em>: Student-Created AI Intern Wins Award</span>
          </a>
        </div>
        <div className="space-y-6">
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden crt-container">
            <img
              src="/img/headshot2.jpg"
              alt="Karen Kilroy"
              className="w-full h-80 object-cover crt-image"
              style={{ objectPosition: 'center 25%' }}
            />
            <div className="p-5 text-sm text-slate-400 flex items-center justify-between flex-wrap gap-3">
              <div>
                <p className="text-slate-100 font-semibold">Karen Kilroy</p>
                <p className="text-xs text-slate-400 mt-0.5">Photo: <a href="https://www.daphneyoureephotography.com/" target="_blank" rel="noopener noreferrer" className="hover:text-slate-200 underline underline-offset-2 transition-colors">Daphne Youree</a></p>
              </div>
              <div className="text-xs uppercase tracking-[0.3em] text-slate-500">Inventor · Artist · Musician</div>
            </div>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-2xl">
            <Terminal className="text-blue-500 mb-4" />
            <div className="space-y-3 font-mono text-sm">
              <p className="text-green-400">{`> Karen.currentLocation = "Farmington, AR";`}</p>
              <p className="text-blue-300">{`> Karen.roles = ["Founder", "Educator", "Author"];`}</p>
              <p className="text-yellow-400">{`> Karen.winner("IBM Watson Build 2017", "North America");`}</p>
              <p className="text-slate-500">{`// Led the winning team`}</p>
              <p className="text-cyan-400">{`> Karen.buildStack("React", "Azure AI Foundry", "Codex 5.6", "ChatGPT 5.6", "Claude Fable");`}</p>
              <p className="text-pink-400">{`> Karen.alsoStudying("Voice", "Piano");`}</p>
            </div>
          </div>
        </div>
      </header>

      {/* About Section */}
      <section id="about" className="py-12 md:py-20 px-4 md:px-6 bg-slate-900/30">
        <div className="max-w-6xl mx-auto grid md:grid-cols-[3fr,2fr] gap-8 md:gap-12">
          <div>
            <p className="text-blue-400 uppercase text-xs tracking-[0.3em] md:tracking-[0.4em] mb-3 md:mb-4">About Karen</p>
            <h2 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6 leading-snug">
Prove where it came from. Prove what happened to it.
            </h2>
            <p className="text-slate-300 leading-relaxed mb-6">
              One question runs through all of it: how do you prove where something came from and what happened to it? I came at that from supply chain first &mdash;
              IBM Blockchain Supply Chain, IBM Food Trust, Oracle Intelligent Track and Trace, and the supply chain blockchain systems I shipped at Kilroy Blockchain,
              where I also led the IBM Watson Build&ndash;winning RILEY team. It is why I wrote <em>Blockchain Tethered AI</em>, why I co-chair the C2PA AI/ML Task Force,
              and why agent audit trails were the first thing I built when I moved into agentic systems. Today I contribute to C2PA&apos;s Agentic Task Force, working out
              how provenance applies to what an agent did and which model answered &mdash; alongside colleagues from Adobe, Microsoft, Google, OpenAI, and Meta.
            </p>
            <div className="space-y-4">
              {focusList.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 mt-2 rounded-full bg-blue-500"></div>
                  <p className="text-slate-400">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4 md:space-y-6">
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 md:p-6">
              <p className="text-xs uppercase tracking-[0.2em] md:tracking-[0.3em] text-slate-500 mb-2">Where I shine</p>
              <p className="text-base md:text-lg font-semibold mb-2">AI Supply Chain + Governance</p>
              <p className="text-slate-400 text-sm">
                Model Context Protocol, Free2PA, provenance standards, patient PA quality systems, and "explain it like we're in a boardroom" technical storytelling.
              </p>
            </div>
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 md:p-6">
              <p className="text-xs uppercase tracking-[0.2em] md:tracking-[0.3em] text-slate-500 mb-2">Still learning</p>
              <p className="text-base md:text-lg font-semibold mb-2">University of Arkansas</p>
              <p className="text-slate-400 text-sm">
                Voice &amp; piano studies plus Infrastructure &amp; Cloud Computing coursework keep me grounded in art and architecture.
              </p>
            </div>
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 md:p-6">
              <p className="text-xs uppercase tracking-[0.2em] md:tracking-[0.3em] text-slate-500 mb-2">Signature</p>
              <p className="text-base md:text-lg font-semibold mb-2">Six-time IBM Champion</p>
              <p className="text-slate-400 text-sm">
                Bridging technical leadership with hands-on builds, coaching teams to ship ethical AI, and keeping documentation beautiful.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Marketability Section */}
      <section id="market" className="py-12 md:py-20 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 md:gap-4 mb-8">
            <BriefcaseBusiness className="text-blue-500" size={28} />
            <h2 className="text-2xl md:text-3xl font-bold">What I Bring to a Team</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4 md:gap-6 mb-8">
            {marketabilityHighlights.map((item) => (
              <div key={item.title} className="border border-slate-800 bg-slate-900/70 rounded-lg p-5">
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
          <div className="border border-slate-800 bg-slate-900/70 rounded-lg p-5 md:p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-4">Strong fit for</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {roleTargets.map((role) => (
                <div key={role} className="flex items-center gap-3 text-slate-200">
                  <CheckCircle2 size={18} className="text-blue-400 flex-shrink-0" />
                  <span>{role}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-slate-800 bg-slate-900/50">
        <div className="max-w-4xl mx-auto py-8 md:py-12 px-4 md:px-6 grid grid-cols-3 gap-4 md:gap-8 text-center">
          <div>
            <div className="text-2xl md:text-3xl font-bold text-blue-500">20+</div>
            <div className="text-xs md:text-sm text-slate-500 uppercase tracking-wider md:tracking-widest">Years Experience</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-bold text-blue-500">4</div>
            <div className="text-xs md:text-sm text-slate-500 uppercase tracking-wider md:tracking-widest">O'Reilly Books</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-bold text-blue-500">6</div>
            <div className="text-xs md:text-sm text-slate-500 uppercase tracking-wider md:tracking-widest">IBM Champion</div>
          </div>

        </div>
      </section>

      {/* Books Section */}
      <section id="books" className="py-12 md:py-24 px-4 md:px-6 max-w-6xl mx-auto">
        <div className="flex items-center gap-3 md:gap-4 mb-8 md:mb-12">
          <Book className="text-blue-500" size={28} />
          <h2 className="text-2xl md:text-3xl font-bold">O'Reilly Publications</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {books.map((book, i) => (
            <a key={i} href={book.url} target="_blank" rel="noopener noreferrer" className="group bg-slate-900 border border-slate-800 p-6 rounded-xl hover:border-blue-500/50 transition block">
              <div className="aspect-[2/3] bg-slate-800 rounded mb-4 overflow-hidden shadow-lg">
                <img src={book.img} alt={book.title} className="w-full h-full object-cover" />
              </div>
              <h3 className="font-bold text-lg mb-1 group-hover:text-blue-400 transition">{book.title}</h3>
              <p className="text-slate-500 text-sm">{book.year}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Experience Section */}
      <section id="projects" className="py-12 md:py-24 px-4 md:px-6 bg-slate-900/30">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 md:gap-4 mb-8 md:mb-12">
            <Award className="text-blue-500" size={28} />
            <h2 className="text-2xl md:text-3xl font-bold">Strategic Impact</h2>
          </div>

          <div className="space-y-8 md:space-y-12">
            <div className="relative pl-6 md:pl-8 border-l-2 border-slate-800">
              <div className="absolute -left-[9px] top-0 w-4 h-4 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
              <h3 className="text-lg md:text-xl font-bold">Free2PA — Agent Control File Provenance</h3>
              <p className="text-blue-400 text-sm mb-4">2026 · Public AI governance demo</p>
              <p className="text-slate-400 leading-relaxed mb-3">
                Created a working verification system that checks signed agent control files before they enter model context,
                demonstrating provenance, trust decisions, and rejection paths for governed AI agents.
              </p>
              <a href="https://free2pa.org" target="_blank" rel="noopener noreferrer"
                 className="inline-flex items-center gap-1.5 text-sm text-slate-300 hover:text-blue-400 transition-colors">
                <ExternalLink size={13} /> Visit Free2PA
              </a>
            </div>

            <div className="relative pl-6 md:pl-8 border-l-2 border-slate-800">
              <div className="absolute -left-[9px] top-0 w-4 h-4 bg-slate-700 rounded-full"></div>
              <h3 className="text-lg md:text-xl font-bold">Phyllis — Fulfillment API for Bot-Built Commerce</h3>
              <p className="text-blue-400 text-sm mb-4">2026 · Public commerce API</p>
              <p className="text-slate-400 leading-relaxed mb-3">
                Built a multi-tenant fulfillment API for agent-created commerce storefronts, covering product validation,
                Stripe checkout, fulfillment-provider integration, human-in-the-loop approvals, real-time order tracking, OpenAPI, and LLM-readable documentation.
              </p>
              <a href="https://phyllis.bot" target="_blank" rel="noopener noreferrer"
                 className="inline-flex items-center gap-1.5 text-sm text-slate-300 hover:text-blue-400 transition-colors">
                <ExternalLink size={13} /> Visit Phyllis
              </a>
            </div>

            <div className="relative pl-6 md:pl-8 border-l-2 border-slate-800">
              <div className="absolute -left-[9px] top-0 w-4 h-4 bg-slate-700 rounded-full"></div>
              <h3 className="text-lg md:text-xl font-bold">Healthcare Client — Patient Prior Authorization QA System</h3>
              <p className="text-blue-400 text-sm mb-4">2026 · Oncology workflow automation</p>
              <p className="text-slate-400 leading-relaxed">
                Architected the agent capability abstraction layer behind a six-agent, HIPAA-regulated pipeline &mdash; 16 domain-named capabilities over
                24 swappable backends, so agents never bind directly to a vendor or a model. Built the policy-first control plane, queue-based dispatch
                with recovery, hash-chained tamper-evident execution traces with per-step token accounting, and an ML model trust contract with a
                provenance ledger and drift detection. Every approval decision stayed deterministic: the model reasons and writes, it never renders the verdict.
              </p>
            </div>

            <div className="relative pl-6 md:pl-8 border-l-2 border-slate-800">
              <div className="absolute -left-[9px] top-0 w-4 h-4 bg-slate-700 rounded-full"></div>
              <div className="flex items-center gap-3 flex-wrap mb-1">
                <h3 className="text-lg md:text-xl font-bold">RadioHead — Innovation &amp; Integration Challenge Winner</h3>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-yellow-500/15 border border-yellow-500/40 text-yellow-400">
                  <Trophy size={11} /> 1st Place · Category Winner
                </span>
              </div>
              <p className="text-blue-400 text-sm mb-4">April 2026 · University of Arkansas</p>
              <p className="text-slate-400 leading-relaxed mb-3">
                RadioHead is an autonomous broadcast transcription agent built with student Aiden Maroney that gives public radio stations like KUAF new
                AI-powered capabilities — transcription, search, and accessibility for every broadcast. Built first on the OpenClaw agent harness, then
                re-architected onto AWS once the harness became the constraint: on the harness it had to be talked into things, on AWS it is programmed.
                Seeded with a knowledge graph of the full program archive, so it answers across every past episode with source links, and built with speaker
                diarization, entity resolution, and hard grounding rules — no claim without a credible source. Won the Innovation &amp; Integration Challenge
                category at the UArk Demo Day &amp; Awards Ceremony.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="https://youtu.be/W2NcJ2jA10I" target="_blank" rel="noopener noreferrer"
                   className="inline-flex items-center gap-1.5 text-sm text-slate-300 hover:text-red-400 transition-colors">
                  <ExternalLink size={13} /> Watch the Demo
                </a>
                <a href="https://www.kuaf.com/show/ozarks-at-large/2026-05-13/student-created-ai-intern-offers-kuaf-new-abilities-wins-award"
                   target="_blank" rel="noopener noreferrer"
                   className="inline-flex items-center gap-1.5 text-sm text-slate-300 hover:text-blue-400 transition-colors">
                  <Radio size={13} /> NPR KUAF Feature
                </a>
              </div>
            </div>

            <div className="relative pl-6 md:pl-8 border-l-2 border-slate-800">
              <div className="absolute -left-[9px] top-0 w-4 h-4 bg-slate-700 rounded-full"></div>
              <h3 className="text-lg md:text-xl font-bold">Founder &amp; AI Engineer — NYX NoCode</h3>
              <p className="text-blue-400 text-sm mb-4">2024 – Present</p>
              <p className="text-slate-400 leading-relaxed mb-3">
                A platform that takes a student from a prompt or a doodle to a working application, used in teacher-led hackathons and serving public school
                customers in production. Agent orchestration, model routing, RAG memory, code generation, and hosting, owned end to end. Developed Peopleoids,
                a portable assistant with instant memory suitable for finetuning and reuse, plus public prototypes including Idea Beast for AI-assisted ideation
                and Music Seer for responsive MIDI visualization. Backed by Microsoft for Startups, Techstars, Builders + Backers, and AWS.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="https://www.youtube.com/watch?v=IHsWbpWbIds" target="_blank" rel="noopener noreferrer"
                   className="inline-flex items-center gap-1.5 text-sm text-slate-300 hover:text-red-400 transition-colors">
                  <ExternalLink size={13} /> Idea Beast Preview
                </a>
                <a href="https://www.youtube.com/watch?v=dtuhCJRHUyk" target="_blank" rel="noopener noreferrer"
                   className="inline-flex items-center gap-1.5 text-sm text-slate-300 hover:text-red-400 transition-colors">
                  <ExternalLink size={13} /> Music Seer Demo
                </a>
              </div>
            </div>

            <div className="relative pl-8 border-l-2 border-slate-800">
              <div className="absolute -left-[9px] top-0 w-4 h-4 bg-slate-700 rounded-full"></div>
              <h3 className="text-xl font-bold">CEO — Kilroy Blockchain</h3>
              <p className="text-blue-400 text-sm mb-4">2016 – 2025</p>
              <p className="text-slate-400 leading-relaxed">
                Lead architect for RILEY (IBM Watson Build Challenge North America winner), CARNAK (roadway asset geolocation), FLO (Forms Workflow), and
                CASEY (Case Management). I directed engineering for blockchain-backed supply chain, workflow, and case management systems where provenance,
                traceability, and chain of custody were the core requirements &mdash; plus business ops and the ethics checkpoints that kept enterprise AI accountable.
              </p>
            </div>

            <div className="relative pl-8 border-l-2 border-slate-800">
              <div className="absolute -left-[9px] top-0 w-4 h-4 bg-slate-700 rounded-full"></div>
              <h3 className="text-xl font-bold">Author — O'Reilly Media</h3>
              <p className="text-blue-400 text-sm mb-4">2019 – 2024</p>
              <p className="text-slate-400 leading-relaxed">
                Published four books (<em>Natural Language and Search</em>, <em>Blockchain Tethered AI</em>, <em>AI and the Law</em>, <em>Blockchain as a Service</em>),
                technically reviewed Mastering Blockchain/Corda, and wrote "AI's Opaque Box is Actually a Supply Chain."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Speaking & Standards */}
      <section id="signal" className="py-12 md:py-24 px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 md:gap-4 mb-4 md:mb-6">
            <div className="flex items-center gap-3">
              <Mic className="text-blue-500" size={28} />
              <h2 className="text-xl md:text-3xl font-bold">Speaking &amp; Standards</h2>
            </div>
            <span className="text-emerald-400 text-xs font-medium bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full w-fit">Available for Engagements</span>
          </div>
          <p className="text-slate-400 text-sm mb-8 md:mb-12 max-w-2xl">Recent speaking engagements on AI governance, content provenance, and trustworthy systems.</p>
          <div className="grid md:grid-cols-2 gap-4 md:gap-8">
            {speakingHighlights.map((item, idx) => {
              const cardIcon = idx === 0 ? <Radio size={18} className="text-blue-500" /> : idx === 1 ? <Mic size={18} className="text-blue-500" /> : <ShieldCheck size={18} className="text-blue-500" />;
              const cardClass = `bg-slate-900 border rounded-2xl p-4 md:p-6 transition ${item.url ? 'border-blue-500/40 hover:border-blue-500/70 hover:bg-slate-800/80 cursor-pointer' : 'border-slate-800'}`;
              const inner = (
                <>
                  <div className="flex items-center gap-3 mb-3 md:mb-4">
                    {cardIcon}
                    <p className="text-xs md:text-sm uppercase tracking-[0.2em] md:tracking-[0.3em] text-slate-500">{item.org}</p>
                  </div>
                  <p className="text-lg md:text-xl font-semibold mb-2">{item.topic}</p>
                  <p className="text-slate-400 text-sm">{item.description}</p>
                </>
              );
              return item.url ? (
                <a key={idx} href={item.url} target="_blank" rel="noopener noreferrer" className={cardClass}>{inner}</a>
              ) : (
                <div key={idx} className={cardClass}>{inner}</div>
              );
            })}
          </div>
          <div className="mt-8 text-center">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSejoNvJ1vH4mnTaESayh6HO8LglyAmvYpErYyIGT8of2Wp_eg/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition text-sm"
            >
              <Mic size={18} /> Book an Engagement
            </a>
            <p className="text-slate-400 text-sm mt-2">Speaking • Consulting • AI Systems Development</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 md:py-12 border-t border-slate-900 text-center text-slate-500 text-sm px-4">
        <p>&copy; {new Date().getFullYear()} Karen Kilroy. Built with React &amp; AI.</p>
      </footer>
    </div>
  );
};

export default Portfolio;
