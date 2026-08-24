import React from 'react';
import './Resume.css';

export default function WalmartAgenticResume() {
  const handlePrintClick = () => window.print();

  return (
    <div className="resume-page walmart-agentic-resume">
      <main className="container" role="main" aria-label="Agentic AI platform resume of Karen Kilroy">
        <div className="topbar print-hide" role="region" aria-label="Actions">
          <a className="print-link" href="/resume" aria-label="Open general resume">
            General Resume
          </a>
          <button className="print-btn" onClick={handlePrintClick} aria-label="Print this agentic AI platform resume">
            Print
          </button>
        </div>

        <header className="header">
          <div>
            <p className="resume-version">Agentic AI Systems Engineer · Multi-Agent Runtimes · Policy-First Control Planes</p>
            <h1 className="site-title">Karen Kilroy</h1>
          </div>
          <img
            src="https://drive.nyx.baby/nyxnocode/karen%40knowbots.org%2F1751995949315.jpeg"
            alt="Karen Kilroy"
            className="header-image"
          />
        </header>

        <p className="contact screen-only" aria-label="Contact (web)">
          <a href="mailto:karen@kilroyai.com" className="link-strong">karen@kilroyai.com</a>{' '}
          | LinkedIn:{' '}
          <a href="https://linkedin.com/in/karenkilroy" target="_blank" rel="noopener noreferrer" className="link-strong">
            linkedin.com/in/karenkilroy
          </a>{' '}
          | Farmington, AR
        </p>

        <p className="contact print-only" aria-label="Contact (print)">
          karen@kilroyai.com | 330-289-1351 | linkedin.com/in/karenkilroy | Farmington, AR
        </p>

        <section className="section summary-section" aria-labelledby="summary-heading">
          <h2 id="summary-heading">Summary</h2>
          <p className="summary">
            Agentic AI systems engineer with 40+ years in IT and the last decade building AI. I architect and ship the
            layer that decides what an agent is allowed to do &mdash; capability contracts, policy gates, human approval,
            and audit trails that prove what happened &mdash; then build the runtime, the APIs, the data layer, and the
            operator interfaces around it. Currently doing that for a six-agent, HIPAA-regulated production pipeline
            where every decision is traceable and reversible. Creator of Free2PA, which verifies signed agent control
            files before they reach model context, and of Phyllis, a fulfillment API for autonomous commerce agents.
            Supply chain grounding through IBM Blockchain Supply Chain and IBM Food Trust, and shipped supply chain traceability systems. Co-Chair of the C2PA AI/ML Task Force, contributor to its Agentic Task Force, O'Reilly author of four books,
            and winner of the IBM Watson Build Challenge North America.
          </p>
        </section>

        <section className="section relevance-section" aria-labelledby="agentic-heading">
          <h2 id="agentic-heading">1 &middot; Agentic Systems</h2>
          <ul className="impact-list">
            <li><strong>Agent capability abstraction layer.</strong> Architected the ports-and-adapters boundary between six production agents and every backend they depend on: 16 domain-named capabilities over 24 swappable implementations. Agents request "Clinical Treatment Guidelines" or "Patient Clinical Record Retrieval," never a vendor or a model. Which backend answers &mdash; LLM, deterministic, static data, or vendor API &mdash; is a registry and config concern, so swapping one costs zero agent code changes.</li>
            <li><strong>Typed contracts over silent failure.</strong> Designed a capability outcome envelope where execute returns an available value or a typed unavailable status and never throws. A mis-provisioned backend became a loud configuration error instead of a quiet fallback nobody saw, an unimplemented capability returns a typed NOT_IMPLEMENTED, and agents can be fully wired and tested against capabilities that do not exist yet &mdash; never a fabricated pass.</li>
            <li><strong>Policy-first control plane.</strong> Least-privilege tool and data access, human approval gates on consequential actions, and unresolvable cases routed to a human rather than defaulting to a denial. Codified "no agent contains capability logic" as a project standard, then ran a drift audit and rerouted every agent that had escaped the boundary.</li>
            <li><strong>Explicit, recoverable execution.</strong> Moved all agent dispatch onto queue-based execution end to end with no in-process exceptions, with durable workflow state, retry and repair paths, and trace sealing for runs that begin in a web request and finish in a queue worker.</li>
            <li><strong>Forensic observability.</strong> Per-run and per-step execution traces with hash-chained tamper-evident step events and chain verification, liveness detection, live SSE streaming, real token accounting per step, and audit entries recording which capability ran and which model answered.</li>
            <li><strong>Architecture computed from reality.</strong> Built a per-run data-footprint map where the surfaces catalog carries only metadata and hit-detection rules, and the footprint is derived by observing what was actually persisted. Reroute a payload and the next run shows the new truth with nothing to redraw.</li>
            <li><strong>Agent provenance and injection defense.</strong> Created Free2PA, a public toolkit verifying signed agent control files before they enter model context &mdash; allow, deny, and quarantine primitives for untrusted instructions. Contribute regularly to C2PA's Agentic Task Force, working out how to apply C2PA &mdash; a standard for determining the edits and origin of content &mdash; to agentic systems, with colleagues from Adobe, Microsoft, Google, Sony, Amazon, BBC, OpenAI, Meta, TikTok, ElevenLabs, and Universal Music Group.</li>
            <li><strong>Consequential-action boundaries.</strong> Built Phyllis, a multi-tenant fulfillment API for autonomous commerce agents where agents propose and prepare orders and humans approve anything that spends money or ships goods, shipped as a typed, versioned, LLM-readable contract.</li>
            <li><strong>Took an agent from an off-the-shelf harness to purpose-built infrastructure.</strong> Built RadioHead, an autonomous broadcast transcription agent, first on the OpenClaw agent harness and then re-architected onto AWS once the harness became the constraint &mdash; on the harness the agent had to be talked into things, on AWS it is programmed. Runs in production at an NPR member station with a voice interface and hard grounding rules: no claim without a credible source.</li>
            <li><strong>Knowledge graph as durable agent memory.</strong> Seeded RadioHead with a knowledge graph of every past episode of the station's daily news program, so the agent reasons across the full archive and returns links rather than answering from a single transcript &mdash; multi-hop retrieval over a real corpus, with speaker diarization and entity resolution putting the right name on the right words.</li>
            <li><strong>Agent tooling other engineers build with.</strong> Authored 13 internal Claude Code skills, including capability-wiring and message-queue-wiring code generators used as the anti-drift mechanism, plus PAM, a credential-free browser-driving QA agent that acceptance-tests user journeys over CDP, records walkthroughs, and files field-level pass/fail evidence. PAM attaches to a human session and inherits that person's access and audit trail, so no secrets reach the model.</li>
          </ul>
          <ul className="skills" aria-label="Agentic keywords">
            <li>Multi-Agent Orchestration</li>
            <li>Custom Agent Harnesses &amp; Runtimes</li>
            <li>Ports-and-Adapters Capability Layers</li>
            <li>Typed Capability Contracts &amp; Registries</li>
            <li>Model Context Protocol (MCP) Clients &amp; Servers</li>
            <li>Tool Adapters, Function Calling, Structured Outputs</li>
            <li>Knowledge &amp; Context Graphs</li>
            <li>Multi-Hop Retrieval</li>
            <li>Entity Resolution &amp; Diarization</li>
            <li>Durable Session &amp; Workflow State</li>
            <li>Context-Window Management</li>
            <li>Human-in-the-Loop Approval</li>
            <li>Interruption Handling &amp; Recovery</li>
            <li>Event-Driven Queue Dispatch</li>
            <li>Prompt-Injection &amp; Untrusted-Instruction Defense</li>
            <li>AgentOps / LLMOps</li>
            <li>Hash-Chained Forensic Traces</li>
            <li>Token &amp; Cost Accounting per Step</li>
          </ul>
        </section>

        <section className="section relevance-section" aria-labelledby="aiml-heading">
          <h2 id="aiml-heading">2 &middot; AI &amp; Machine Learning</h2>
          <ul className="impact-list">
            <li><strong>Model trust as a contract.</strong> Integrated an Azure ML prediction model into the agent loop behind a capability, with a four-state canonical trust enum &mdash; validated, unvalidated, simulated, unavailable &mdash; read by the tool, the QC and clinical prompts, the operator panel, and the validation report. The reason: a model with an AUC of 0.897 behind it and a model with no validation evidence at all were producing identical-looking results.</li>
            <li><strong>Model provenance and drift.</strong> Built a model-provenance ledger with drift detection that catches a model changing underneath a running agent, and extended the tamper-evident audit chain to record which model answered, so a prediction is attributable to the exact version that produced it. Caught a silent regression where a refactor left chain entries with no model recorded despite a clean type check, and extracted the function so it could be unit-tested.</li>
            <li><strong>Judgment about when not to use an LLM.</strong> Converted four deterministic agents to LLM-backed agents on Azure AI Foundry for clinical extraction from unstructured referral text, document summarization over OCR, and payer-facing narrative &mdash; while every approval decision stayed deterministic. Guideline answers may not be surfaced under a standards body's name without corroborating citations. The model reasons and writes; it never renders the verdict.</li>
            <li><strong>Retrieval and governed context.</strong> RAG and model routing in production, portable agent memory, and clinical NLP extraction over FHIR, SNOMED, and ICD-10 with guideline provenance and temporal validity treated as a product contract &mdash; in a domain where last year's guideline is the wrong answer this year.</li>
            <li><strong>Owns the input and governance half of the model-improvement flywheel.</strong> Production interaction traces, tool-use trajectories captured in a capability dispatch ledger, and human reviewer decisions, all recorded as governed data with provenance, temporal validity, PHI-safe redaction boundaries, and least-privilege access controls &mdash; the substrate post-training and evaluation datasets are built from, made safe enough to use in a regulated environment.</li>
            <li><strong>Treats agent quality as an engineering discipline.</strong> Streaming end-to-end agent test runs with live topology, capability conformance checks, drift audits across the codebase, adversarial handling of untrusted instructions, PHI-redaction tests, and PAM filing field-level pass/fail evidence on real user journeys &mdash; external verification rather than a model grading its own output.</li>
            <li><strong>Speech and multimodal.</strong> Integrated Deepgram speech AI for real-time voice input in production classroom workflows; built speaker diarization and transcription pipelines running against live broadcast audio.</li>
          </ul>
          <ul className="skills" aria-label="AI and ML keywords">
            <li>Retrieval-Augmented Generation (RAG)</li>
            <li>Model Routing &amp; Provider-Aware Execution</li>
            <li>Model Evaluation &amp; Validation Evidence</li>
            <li>Model Provenance Ledgers &amp; Drift Detection</li>
            <li>Model Trust States</li>
            <li>MLOps / Production ML Lifecycle</li>
            <li>Governed Training &amp; Evaluation Datasets</li>
            <li>Golden-Path E2E Agent Testing</li>
            <li>Adversarial &amp; Regression Testing</li>
            <li>Clinical NLP &amp; Entity Resolution</li>
            <li>Ontology &amp; Schema Design</li>
            <li>Structured Ontologies: FHIR R4, SNOMED CT, ICD-10</li>
            <li>Azure AI Foundry, Azure OpenAI, Azure ML</li>
            <li>Deepgram Speech AI</li>
            <li>Python</li>
          </ul>
        </section>

        <section className="section relevance-section" aria-labelledby="impact-heading">
          <h2 id="impact-heading">3 &middot; Impact Beyond a Single Role</h2>
          <ul className="impact-list">
            <li><strong>Sets standards other organizations adopt.</strong> Co-Chair of the C2PA AI/ML Task Force, contributor to its Agentic Task Force, and contributor to the Society of Motion Picture and Television Engineers (SMPTE) / Entertainment Technology Center (ETC) AI/ML Task Force. C2PA participation is volunteered through Friends of Justin, a non-profit, and has run since 2023. These groups publish normative and non-normative standards and guidance documents. Shipped Free2PA as the working reference implementation.</li>
            <li><strong>Teaches the field.</strong> Four O'Reilly books &mdash; <em>Natural Language and Search</em> (2024), <em>Blockchain Tethered AI</em> (2023), <em>AI and the Law</em> (2021), <em>Blockchain as a Service</em> (2019) &mdash; plus the Radar article <a href="https://www.oreilly.com/radar/ais-opaque-box-is-actually-a-supply-chain/" target="_blank" rel="noopener noreferrer">"AI's Opaque Box Is Actually a Supply Chain"</a>, which framed AI systems as traceable supply chains with provenance, versioning, and kill switches years before it was a category. Technical reviewer for <em>Mastering Blockchain</em> and <em>Mastering Corda</em>.</li>
            <li><strong>Raises the engineers nearby.</strong> Mentored the student team behind RadioHead, an award-winning transcription agent now running at an NPR member station. Ran hackathons and training programs that turned non-engineers into shipping builders, and delivered hands-on agent trust training to 175+ students, faculty, and community members.</li>
            <li><strong>Supply chain grounding.</strong> Supply chain education through IBM Blockchain Supply Chain and IBM Food Trust, plus Oracle's blockchain food traceability platform &mdash; and supply chain blockchain systems built and shipped at Kilroy Blockchain. Provenance, traceability, and chain of custody: proving where something came from and what happened to it in transit.</li>
            <li><strong>Has led organizations, not just projects.</strong> Ran a 20-person Lotus Notes and Java consulting firm; CTO of a web development company; principal developer inside enterprise product teams; founder of three ventures; administered a 200-user enterprise network.</li>
            <li><strong>Wins in the open.</strong> Team lead for the winner of the University of Arkansas AI Innovation and Integration Challenge (2026). Led the team that won the IBM Watson Build Challenge North America (2017) with RILEY, an AI accessibility system for people who are blind or visually impaired. Six-time IBM Champion.</li>
            <li><strong>Builds the full path alone when needed.</strong> Agent runtime, backend services and APIs, PostgreSQL schema design and migrations, telemetry, React/TypeScript operator interfaces, and CLI and headless structured-output surfaces &mdash; on the same systems, in production, for real users.</li>
            <li><strong>Works AI-native.</strong> Daily production use of Claude Code, Codex, and Claude Fable as engineering tools, with review, testing, and evaluation discipline applied to what they produce.</li>
          </ul>
          <ul className="skills" aria-label="Engineering and leadership keywords">
            <li>TypeScript, Node.js, React, Next.js</li>
            <li>PostgreSQL, Prisma, Schema Design &amp; Migrations</li>
            <li>Multi-Tenant APIs, OpenAPI</li>
            <li>Azure Service Bus, Queue Workers, KEDA</li>
            <li>SSE Streaming &amp; Live Operator Consoles</li>
            <li>AWS Agent Deployment &amp; Migration</li>
            <li>OpenTelemetry, Application Insights</li>
            <li>CI/CD, Layered Testing, Release Gates</li>
            <li>Least-Privilege Access, RBAC, Managed Identity</li>
            <li>PHI-Safe Review Paths &amp; Data Protection</li>
            <li>Supply Chain Traceability &amp; Chain of Custody</li>
            <li>Content Provenance (C2PA, SMPTE, ETC)</li>
            <li>WCAG-Aware Accessible Interfaces</li>
            <li>Technical Writing, Mentoring &amp; Education</li>
          </ul>
        </section>

        <section className="section experience-section page-break-before" aria-labelledby="experience-heading">
          <h2 id="experience-heading">Relevant Experience</h2>

          <article className="job" aria-label="Founder and Principal Engineer at Kilroy AI LLC">
            <p className="job-title">Founder &amp; Principal Engineer</p>
            <p className="job-company">Kilroy AI LLC</p>
            <p className="job-dates">2026 &ndash; Present</p>
            <div className="job-desc">
              <p className="job-context">
                Independent agentic AI engineering practice. Client and partner engagements plus publicly released products.
              </p>
            </div>

            <div className="job-sub">
              <p className="job-sub-title">Hidalga &mdash; Agent Infrastructure &amp; Audit Trails</p>
              <p className="job-sub-meta">Client engagement &middot; Mar 2026 &ndash; Present</p>
              <div className="job-desc">
                <p className="job-context">
                  HIPAA-regulated six-agent pipeline taking an oncology prior authorization from intake through payer
                  submission on Azure AI Foundry, Azure Service Bus, and Azure FHIR. Architecture detail in sections 1 and 2 above.
                </p>
                <ul>
                  <li>Own the agent capability abstraction layer, the policy boundary between agents and backends, and the drift audit that keeps it enforced.</li>
                  <li>Own agent trace review, audit validation, workflow visibility, and the tamper-evident evidence chain behind every autonomous decision.</li>
                  <li>Converted four deterministic agents to LLM-backed agents while keeping all approval decisions deterministic, and enforced the clinical-safety invariants governing when an agent may and may not answer.</li>
                  <li>Integrated an Azure ML model into the agent loop with a four-state trust contract, provenance ledger, and drift detection.</li>
                  <li>Maintain PHI discipline under agentic execution: agents hold patient context in execution memory and persist decisions and scores, never input PHI.</li>
                  <li>Built the team's agent development tooling &mdash; 13 Claude Code skills, wiring generators, living architecture diagrams, and the PAM QA agent.</li>
                  <li>Wrote and maintained the architecture specification for the capability layer through seven revisions, along with the runbook governing agent permissions and isolation.</li>
                  <li>Work directly with clinical and operations experts to discover the real workflow, prototype against it, and harden what works without losing delivery speed.</li>
                </ul>
              </div>
            </div>

            <div className="job-sub">
              <p className="job-sub-title">RadioHead</p>
              <p className="job-sub-meta">Broadcast transcription agent &middot; NPR affiliate KUAF &middot; 2026 &ndash; Present</p>
              <div className="job-desc">
                <ul>
                  <li>Built an autonomous broadcast transcription agent that turns live public radio programming into searchable, publishable text for an NPR member station.</li>
                  <li>Started the agent on the OpenClaw harness, then re-architected and migrated it onto AWS for production reliability and programmability, funded by an AWS Tech Star award.</li>
                  <li>Seeded the AWS version with a knowledge graph of every past episode of the station's daily news program, enabling multi-hop answers across the archive with source links.</li>
                  <li>Built speaker diarization and entity resolution, plus grounding rules that forbid any claim without a credible source. Public at radiohead.bot.</li>
                  <li>Built with a student team; the system won a student competition and is credited by the station with expanding what its small newsroom can produce.</li>
                  <li>Featured on the station's daily news program, <em>Ozarks at Large</em>.</li>
                </ul>
              </div>
            </div>

            <div className="job-sub">
              <p className="job-sub-title">Free2PA</p>
              <p className="job-sub-meta">Product &middot; free2pa.org &middot; 2026 &ndash; Present</p>
              <div className="job-desc">
                <ul>
                  <li>Built a public provenance toolkit that verifies signed agent control files before they enter model context, a working answer to prompt injection and untrusted instruction supply chains.</li>
                  <li>Designed explicit trust decisions, signed artifacts, rejection paths, and governed agent behavior: the allow, deny, and quarantine primitives a policy-first control plane needs.</li>
                  <li>Extended C2PA-style provenance beyond media assets to agent instructions, memory, workflows, and tool access.</li>
                  <li>Published as an open, inspectable reference implementation so other engineering teams can adopt the pattern.</li>
                </ul>
              </div>
            </div>

            <div className="job-sub">
              <p className="job-sub-title">Phyllis</p>
              <p className="job-sub-meta">Product &middot; phyllis.bot &middot; 2026 &ndash; Present</p>
              <div className="job-desc">
                <ul>
                  <li>Built a multi-tenant fulfillment API designed for autonomous commerce agents: product validation, Stripe checkout, fulfillment-provider integration, human approval workflows, and order tracking.</li>
                  <li>Designed the consequential-action boundary so agents propose and prepare orders while humans approve anything that spends money or ships goods.</li>
                  <li>Shipped OpenAPI plus LLM-readable documentation so agents and engineers consume the same typed contract, with versioning and compatibility treated as a product commitment.</li>
                </ul>
              </div>
            </div>
          </article>

          <article className="job" aria-label="Founder and Engineer at NYX NoCode">
            <p className="job-title">Founder &amp; AI Engineer</p>
            <p className="job-company">NYX NoCode</p>
            <p className="job-dates">2024 &ndash; Present</p>
            <div className="job-desc">
              <ul>
                <li>Serve public school customers in production, which means real reliability, cost control, accessibility, and safety obligations rather than demo-grade output.</li>
                <li>Built a platform that takes a student from a prompt or a doodle to a working application, used in teacher-led hackathons &mdash; agent orchestration, model routing, RAG memory, code generation, and hosting, owned end to end.</li>
                <li>Backed by Microsoft for Startups, Techstars, Builders + Backers, and AWS.</li>
                <li>Developed <em>Peopleoids</em>, a portable RAG assistant with instant memory suitable for fine-tuning and reuse across agents.</li>
                <li>Integrated Deepgram speech AI for real-time voice input, and shipped public prototypes including <em>Idea Beast</em> (AI-assisted ideation) and <em>Music Seer</em> (responsive guitar MIDI visualization).</li>
                <li>Ran teacher-led hackathons and training programs that turned non-engineers into shipping builders &mdash; capability creation, measured by what other people went on to build.</li>
              </ul>
            </div>
          </article>

          <article className="job" aria-label="AI Researcher and ML Engineer at Friends of Justin">
            <p className="job-title">AI Researcher &amp; ML Engineer</p>
            <p className="job-company">Friends of Justin</p>
            <p className="job-dates">2023 &ndash; Present</p>
            <div className="job-desc">
              <ul>
                <li>Volunteer through this non-profit for participation in the Coalition for Content Provenance and Authenticity (C2PA), the open standards body whose members include Adobe, Microsoft, Google, Sony, Amazon, BBC, OpenAI, Meta, TikTok, ElevenLabs, and Universal Music Group.</li>
                <li>C2PA defines Content Credentials: cryptographically signed manifests that travel with a piece of content and record its origin and every edit applied to it, so a consumer can verify what something is and what was done to it rather than taking a claim on faith.</li>
                <li>Co-Chair the AI/ML Task Force, working on how provenance applies when content is generated or modified by a model &mdash; disclosure of synthetic media, attribution to the model that produced it, and the assertions that make those claims verifiable instead of declarative.</li>
                <li>Contribute to the Agentic Task Force, extending the same questions to autonomous systems: what an agent did, which model and tools were involved, and how that becomes signed, checkable evidence rather than a log entry someone has to trust.</li>
                <li>Task force output is published as normative and non-normative specification text and guidance documents.</li>
              </ul>
            </div>
          </article>

          <article className="job" aria-label="CEO at File Baby">
            <p className="job-title">CEO</p>
            <p className="job-company">File Baby</p>
            <p className="job-dates">2024 &ndash; 2025</p>
            <div className="job-desc">
              <ul>
                <li>Founded and led an early C2PA Content Credentials application, turning an emerging content provenance standard into a shipping product.</li>
              </ul>
            </div>
          </article>

          <article className="job" aria-label="Standards leadership in C2PA and SMPTE">
            <p className="job-title">Co-Chair, AI/ML Task Force &middot; Contributor, Agentic Task Force</p>
            <p className="job-company">Coalition for Content Provenance and Authenticity (C2PA)</p>
            <p className="job-dates">Current</p>
            <div className="job-desc">
              <ul>
                <li>Co-chair cross-industry work on AI provenance, content authenticity, disclosure, and standards adoption alongside engineers from major technology and media companies.</li>
                <li>Regular contributor to the C2PA Agentic Task Force, working out how to apply C2PA &mdash; a standard for determining the edits and origin of content &mdash; to agentic systems, with colleagues from Adobe, Microsoft, Google, Sony, Amazon, BBC, OpenAI, Meta, TikTok, ElevenLabs, and Universal Music Group.</li>
                <li>The task forces publish normative and non-normative standards as well as guidance documents.</li>
                <li>Translate standards into implementable engineering patterns, demos, and documentation &mdash; the same skill as turning an ambiguous enterprise mandate into a contract engineers can build against.</li>
              </ul>
            </div>
          </article>

          <article className="job" aria-label="Contributor to the SMPTE and ETC AI/ML Task Force">
            <p className="job-title">Contributor, AI/ML Task Force</p>
            <p className="job-company">Society of Motion Picture and Television Engineers (SMPTE) &middot; Entertainment Technology Center (ETC)</p>
            <p className="job-dates">Current</p>
            <div className="job-desc">
              <ul>
                <li>Contribute to joint SMPTE and ETC work connecting media production workflows, AI generation, governance, and provenance infrastructure.</li>
              </ul>
            </div>
          </article>

          <article className="job" aria-label="Author at O'Reilly Media">
            <p className="job-title">Author</p>
            <p className="job-company">O'Reilly Media</p>
            <p className="job-dates">2019 &ndash; 2024</p>
            <div className="job-desc">
              <ul>
                <li>Published four books: <em>Natural Language and Search</em> (2024), <em>Blockchain Tethered AI</em> (2023), <em>AI and the Law</em> (2021), <em>Blockchain as a Service</em> (2019).</li>
                <li><em>Blockchain Tethered AI</em> is practical engineering guidance on binding AI systems to provenance, auditability, evidence trails, and controlled shutdown &mdash; written for teams operating autonomous systems in production.</li>
                <li>Wrote the O'Reilly Radar article "AI's Opaque Box Is Actually a Supply Chain," reframing model behavior as a traceable, governable supply chain.</li>
                <li>Technical reviewer for <em>Mastering Blockchain</em> and <em>Mastering Corda</em>.</li>
              </ul>
            </div>
          </article>

          <article className="job" aria-label="CEO at Kilroy Blockchain">
            <p className="job-title">CEO &amp; Technical Lead</p>
            <p className="job-company">Kilroy Blockchain</p>
            <p className="job-dates">2016 &ndash; 2025</p>
            <div className="job-desc">
              <ul>
                <li>Led the team that built <strong>RILEY</strong>, winner of the IBM Watson Build Challenge North America (2017): an AI accessibility system that describes surroundings for people who are blind or visually impaired.</li>
                <li>Began research into trackable, traceable AI during the RILEY build, because accessibility decisions made on a user's behalf required knowing whether the AI could be trusted &mdash; the through-line of every system since.</li>
                <li>Directed engineering for blockchain-backed supply chain, workflow, and case management systems &mdash; <strong>FLO</strong> (forms workflow) and <strong>CASEY</strong> (case management) &mdash; where provenance, traceability, chain of custody, and auditability were the core requirements.</li>
                <li>Owned architecture, stakeholder communication, and end-to-end delivery across applied emerging-technology engagements.</li>
              </ul>
            </div>
          </article>

          <section aria-label="Earlier Roles (Condensed)" style={{ marginTop: '1rem' }}>
            <strong>Earlier Roles (Condensed)</strong>
            <div className="experience-details" style={{ marginTop: '0.5rem' }}>
              <ul>
                <li><span className="experience-role">CTO &ndash; Jamersan LLC</span> (2016) &middot; <span className="experience-role">Magento Technical Lead &ndash; Amplifi Commerce</span> (2015&ndash;2016) &middot; <span className="experience-role">Principal Applications Developer &ndash; CA Technologies</span> (2014&ndash;2015)</li>
                <li><span className="experience-role">Training &amp; Documentation Consultant &ndash; Magento Inc.</span> (2010&ndash;2014), instructor and course author for Magento U &middot; <span className="experience-role">Freelance commerce developer</span> (2010&ndash;2016)</li>
                <li><span className="experience-role">Web Programmer, then Executive Director of United Cloud &ndash; Suarez Corporation Industries</span> (2009&ndash;2012), introduced online sales to a direct-marketing company, then led an XMPP-based communications platform</li>
                <li><span className="experience-role">Webmaster &ndash; Kucinich for President</span> (2003&ndash;2004), full web presence and mass email for a national campaign in the first US presidential election where the web was a factor</li>
                <li><span className="experience-role">President &ndash; Data Now</span> (1991&ndash;1999), ran a 20-person consulting firm building Lotus Notes and Java web applications &middot; <span className="experience-role">LAN Administrator &ndash; Bayer</span> (1990&ndash;1998), 200-user OS/2 LAN Manager network</li>
                <li><span className="experience-role">Technology Coordinator &ndash; CIGNA</span> (1983&ndash;1991), enterprise office automation in its infancy. IT career began in 1980 as a telex operator.</li>
              </ul>
            </div>
          </section>
        </section>

        <section className="section speaking-section" aria-labelledby="talks-heading">
          <h2 id="talks-heading">Talks &amp; Public Work</h2>
          <ul className="speaking-list">
            <li>
              <strong>RadioHead</strong> &mdash; <em>Award-winning broadcast transcription agent, built with a student team</em>
              <p className="speaking-desc">
                Mentored student engineer Aiden Maroney through building a production transcription agent that won a
                student competition and expanded the capabilities of NPR affiliate KUAF. Featured on <em>Ozarks at
                Large</em>. Evidence of raising capability beyond a single role: the system runs, and the engineer grew.
              </p>
            </li>
            <li>
              <strong>C2PA AI/ML Task Force</strong> &mdash; <em>Co-Chair</em>
              <p className="speaking-desc">
                Shaping how an entire industry represents AI provenance, then shipping reference implementations
                (Free2PA) so the standard becomes something teams can actually adopt.
              </p>
            </li>
            <li>
              <strong>Four O'Reilly books and an O'Reilly Radar article</strong>
              <p className="speaking-desc">
                Technical writing at scale, teaching AI governance, provenance, and natural-language systems to
                practitioners &mdash; the "raise the engineering bar through clear technical writing" requirement, with a
                decade of receipts.
              </p>
            </li>
            <li>
              <strong>International Red Cross</strong> &mdash; <em>C2PA Content Credentials for AI/ML Provenance</em>
              <p className="speaking-desc">
                Invited presentation on authenticating AI-generated content for humanitarian teams operating in
                high-risk information environments.
              </p>
            </li>
            <li>
              <strong>Actian</strong> &mdash; <em>Blockchain Kill Switches for Governed AI Systems</em>
              <p className="speaking-desc">
                Industry talk on control mechanisms for shutdown, compliance, and risk mitigation in distributed AI
                infrastructure.
              </p>
            </li>
            <li>
              <strong>University of Arkansas AI Club</strong> &mdash; <em>C2PA, Content Credentials, and agent trust networks</em>
              <p className="speaking-desc">
                Hands-on training for 175+ students, faculty, and community members on building AI agent trust networks.
              </p>
            </li>
          </ul>
        </section>

        <section className="section certifications" aria-labelledby="certifications-heading">
          <h2 id="certifications-heading">Recognition &amp; Certifications</h2>
          <ul className="cert-list" aria-label="Certifications list">
            <li>Winner, University of Arkansas AI Innovation and Integration Challenge &mdash; team lead (2026), for RadioHead</li>
            <li>AWS Tech Star award (2025) &mdash; cloud credits used to re-architect RadioHead onto AWS</li>
            <li>IBM Watson Build Challenge Winner &mdash; North America (2017)</li>
            <li>IBM Champion &mdash; six-time honoree, 2020&ndash;2025</li>
            <li>AI Fluency for Students &mdash; Anthropic (Aug 2025)</li>
            <li>Teaching the AI Fluency Framework &mdash; Anthropic (Aug 2025)</li>
            <li>Venture Building Certification &mdash; Builders + Backers (Jul 2025)</li>
            <li>IBM Blockchain Supply Chain &middot; IBM Food Trust &middot; Oracle blockchain food traceability</li>
            <li>IBM Certifications: Watson Chatbot, RPA, Bluemix Essentials, Blockchain Essentials</li>
            <li>Magento Front End Developer Certification (2013)</li>
            <li>FAA Private Pilot License, Single Engine Land</li>
          </ul>
        </section>

        <section className="section education" aria-labelledby="education-heading">
          <h2 id="education-heading">Education</h2>
          <ul className="education-list" aria-label="Education list">
            <li><strong>University of Arkansas, Sam M. Walton College of Business</strong> &mdash; Cloud Computing &amp; Infrastructure, agent-focused (Spring 2026), 4.0 GPA; Quantum Computing (Fall 2026)</li>
            <li><strong>University of Arkansas</strong> &mdash; Studies in Music (Voice/Piano), 4.0 GPA (2023&ndash;Present)</li>
            <li><strong>Hammel College</strong> &mdash; Office Automation &amp; Database Management (1981&ndash;1982), 4.0 GPA</li>
          </ul>
        </section>
      </main>
    </div>
  );
}
