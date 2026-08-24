import React from 'react';
import './Resume.css';

export default function WalmartResumeBrief() {
  const handlePrintClick = () => window.print();

  return (
    <div className="resume-page walmart-brief-resume">
      <main className="container" role="main" aria-label="Agentic AI systems resume of Karen Kilroy">
        <div className="topbar print-hide" role="region" aria-label="Actions">
          <a className="print-link" href="/resume-walmart" aria-label="Open the full agentic AI resume">
            Full Version
          </a>
          <button className="print-btn" onClick={handlePrintClick} aria-label="Print this resume">
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
          karen@kilroyai.com | 330-289-1351 | linkedin.com/in/karenkilroy | Farmington, AR | Full detail: karenkilroy.com/resume-walmart
        </p>

        <section className="section summary-section" aria-labelledby="summary-heading">
          <h2 id="summary-heading">Summary</h2>
          <p className="summary">
            Agentic AI systems engineer with 40+ years in IT and the last decade building AI. I architect and ship the
            layer that decides what an agent is allowed to do &mdash; capability contracts, policy gates, human approval,
            and audit trails that prove what happened &mdash; then build the runtime, the APIs, the data layer, and the
            operator interfaces around it. Currently doing that for a six-agent, HIPAA-regulated production pipeline.
            Supply chain grounding through IBM Blockchain Supply Chain and IBM Food Trust, and shipped traceability systems. Co-Chair of the C2PA AI/ML Task Force, contributor to its Agentic Task Force, and O'Reilly author of four books.
          </p>
        </section>

        {/* ---------- 1. AGENTIC ---------- */}
        <section className="section relevance-section" aria-labelledby="agentic-heading">
          <h2 id="agentic-heading">1 &middot; Agentic Systems</h2>
          <ul className="impact-list">
            <li><strong>Agent capability abstraction layer.</strong> Architected the ports-and-adapters boundary between six production agents and every backend they depend on: 16 domain-named capabilities over 24 swappable implementations. Agents request "Clinical Treatment Guidelines," never a vendor or a model, so a backend swap costs zero agent code changes.</li>
            <li><strong>Typed contracts over silent failure.</strong> Designed a capability outcome envelope that returns explicit unavailability instead of throwing. A mis-provisioned backend became a loud configuration error instead of a quiet fallback, and agents can be fully wired and tested against capabilities that have no implementation yet.</li>
            <li><strong>Policy-first control plane.</strong> Least-privilege tool and data access, human approval gates on consequential actions, and "unable to assess" routed to a human rather than defaulting to a denial. Codified "no agent contains capability logic" as a project standard, then drift-audited every agent against it.</li>
            <li><strong>Explicit, recoverable execution.</strong> Moved all agent dispatch onto queue-based execution end to end, with durable workflow state, retry and repair paths, and trace sealing across the web-request-to-worker boundary.</li>
            <li><strong>Forensic observability.</strong> Hash-chained tamper-evident execution traces with chain verification, liveness and stall detection, live SSE streaming, per-step token accounting, and audit entries recording which capability ran and which model answered.</li>
            <li><strong>Agent provenance and injection defense.</strong> Created Free2PA, a public toolkit that verifies signed agent control files before they reach model context &mdash; allow, deny, and quarantine primitives for untrusted instructions. Contribute to C2PA's Agentic Task Force, applying C2PA to agentic systems with colleagues from Adobe, Microsoft, Google, OpenAI, Meta, Amazon, Sony, and the BBC.</li>
            <li><strong>Harness to purpose-built runtime, with a knowledge graph for memory.</strong> Built RadioHead, an autonomous broadcast transcription agent, first on the OpenClaw harness and then re-architected onto AWS once the harness became the constraint &mdash; on the harness it had to be talked into things, on AWS it is programmed. Seeded with a knowledge graph of the station's full program archive for multi-hop answers with source links, plus speaker diarization, entity resolution, a voice interface, and hard grounding rules: no claim without a credible source. In production at an NPR member station.</li>
            <li><strong>Agent tooling for other engineers.</strong> 13 internal Claude Code skills including wiring code generators used as the anti-drift mechanism, plus PAM, a credential-free browser-driving QA agent that acceptance-tests user journeys over CDP and files field-level evidence.</li>
          </ul>
          <ul className="skills" aria-label="Agentic keywords">
            <li>Multi-Agent Orchestration</li>
            <li>Custom Agent Harnesses &amp; Runtimes</li>
            <li>Model Context Protocol (MCP)</li>
            <li>Tool Adapters &amp; Function Calling</li>
            <li>Structured Outputs</li>
            <li>Knowledge &amp; Context Graphs</li>
            <li>Multi-Hop Retrieval</li>
            <li>Entity Resolution &amp; Diarization</li>
            <li>Durable Session &amp; Workflow State</li>
            <li>Context-Window Management</li>
            <li>Human-in-the-Loop Approval</li>
            <li>Interruption Handling &amp; Recovery</li>
            <li>Event-Driven Queue Dispatch</li>
            <li>Prompt-Injection Defense</li>
            <li>AgentOps / LLMOps</li>
          </ul>
        </section>

        {/* ---------- 2. AI / ML ---------- */}
        <section className="section relevance-section" aria-labelledby="aiml-heading">
          <h2 id="aiml-heading">2 &middot; AI &amp; Machine Learning</h2>
          <ul className="impact-list">
            <li><strong>Model trust as a contract.</strong> Integrated an Azure ML prediction model into the agent loop behind a capability, with a four-state canonical trust enum &mdash; validated, unvalidated, simulated, unavailable &mdash; read by the tool, the agent prompts, the operator panel, and the validation report, because a model with an AUC of 0.897 behind it and one with no validation evidence were producing identical-looking results.</li>
            <li><strong>Model provenance and drift.</strong> Built a model-provenance ledger with drift detection that catches a model changing underneath a running agent, and extended the audit chain so a prediction is attributable to the exact version that produced it.</li>
            <li><strong>Judgment about when not to use an LLM.</strong> Converted four deterministic agents to LLM-backed agents on Azure AI Foundry for extraction, summarization, and narrative &mdash; while every approval decision stayed deterministic. Guideline answers require corroborating citations; the model never renders the verdict.</li>
            <li><strong>Retrieval and governed context.</strong> RAG and model routing in production, portable agent memory, and clinical NLP extraction from unstructured referral text over FHIR, SNOMED, and ICD-10, with guideline provenance and temporal validity treated as a product contract.</li>
            <li><strong>Owns the input and governance half of the model-improvement flywheel.</strong> Production interaction traces, tool-use trajectories from a capability dispatch ledger, and human reviewer decisions captured as governed data with provenance, PHI-safe redaction, and least-privilege access &mdash; the substrate post-training and evaluation datasets are built from.</li>
            <li><strong>Treats agent quality as an engineering discipline.</strong> Streaming end-to-end agent test runs, capability conformance checks, codebase-wide drift audits, adversarial handling of untrusted instructions, and a QA agent filing field-level evidence on real user journeys &mdash; external verification, not a model grading itself.</li>
            <li><strong>Applied AI research.</strong> AI Researcher and ML Engineer for Friends of Justin since 2023, a non-profit focused on improving interactions between humans and AI models.</li>
          </ul>
          <ul className="skills" aria-label="AI and ML keywords">
            <li>Retrieval-Augmented Generation (RAG)</li>
            <li>Model Routing &amp; Provider-Aware Execution</li>
            <li>Model Evaluation &amp; Validation Evidence</li>
            <li>Model Provenance &amp; Drift Detection</li>
            <li>MLOps / Production ML Lifecycle</li>
            <li>Governed Training &amp; Evaluation Datasets</li>
            <li>Golden-Path E2E Agent Testing</li>
            <li>Adversarial &amp; Regression Testing</li>
            <li>Clinical NLP &amp; Entity Resolution</li>
            <li>Ontology &amp; Schema Design</li>
            <li>Azure AI Foundry, Azure OpenAI, Azure ML</li>
            <li>Deepgram Speech AI</li>
            <li>Python</li>
          </ul>
        </section>

        {/* ---------- 3. DISTINGUISHED-LEVEL IMPACT ---------- */}
        <section className="section relevance-section" aria-labelledby="impact-heading">
          <h2 id="impact-heading">3 &middot; Impact Beyond a Single Role</h2>
          <ul className="impact-list">
            <li><strong>Sets standards other organizations adopt.</strong> Co-Chair of the C2PA AI/ML Task Force and contributor to its Agentic Task Force and to the Society of Motion Picture and Television Engineers (SMPTE) / Entertainment Technology Center (ETC) AI/ML Task Force. These groups publish normative and non-normative standards and guidance documents.</li>
            <li><strong>Teaches the field.</strong> Four O'Reilly books &mdash; <em>Natural Language and Search</em>, <em>Blockchain Tethered AI</em>, <em>AI and the Law</em>, <em>Blockchain as a Service</em> &mdash; plus the Radar article <a href="https://www.oreilly.com/radar/ais-opaque-box-is-actually-a-supply-chain/" target="_blank" rel="noopener noreferrer">"AI's Opaque Box Is Actually a Supply Chain"</a>, which framed AI as a traceable supply chain years before it was a category.</li>
            <li><strong>Raises the engineers nearby.</strong> Mentored the student team behind RadioHead, an award-winning transcription agent now running at an NPR member station. Ran hackathons and training programs that turned non-engineers into shipping builders.</li>
            <li><strong>Supply chain grounding.</strong> Supply chain education through IBM Blockchain Supply Chain, IBM Food Trust, and Oracle's blockchain food traceability platform, plus supply chain blockchain systems built and shipped at Kilroy Blockchain &mdash; provenance, traceability, and chain of custody.</li>
            <li><strong>Has led organizations, not just projects.</strong> Ran a 20-person Lotus Notes and Java consulting firm; CTO of a web development company; principal developer inside enterprise product teams; founder of three ventures.</li>
            <li><strong>Wins in the open.</strong> Team lead for the winner of the University of Arkansas AI Innovation and Integration Challenge (2026). Led the team that won the IBM Watson Build Challenge North America (2017). Six-time IBM Champion.</li>
            <li><strong>Builds the full path alone.</strong> Agent runtime, APIs, PostgreSQL schema and migrations, telemetry, React/TypeScript operator interfaces, and CLI and headless surfaces &mdash; same systems, in production.</li>
          </ul>
          <ul className="skills" aria-label="Engineering and leadership keywords">
            <li>TypeScript, Node.js, React, Next.js</li>
            <li>PostgreSQL, Prisma, Migrations</li>
            <li>Multi-Tenant APIs, OpenAPI</li>
            <li>Azure Service Bus, KEDA, SSE</li>
            <li>AWS Agent Deployment &amp; Migration</li>
            <li>OpenTelemetry, App Insights</li>
            <li>CI/CD, Layered Testing, Release Gates</li>
            <li>Least-Privilege Access, RBAC, Managed Identity</li>
            <li>Supply Chain Traceability &amp; Chain of Custody</li>
            <li>Content Provenance (C2PA, SMPTE, ETC)</li>
            <li>Technical Writing &amp; Mentoring</li>
          </ul>
        </section>

        <section className="section experience-section" aria-labelledby="experience-heading">
          <h2 id="experience-heading">Experience</h2>

          <article className="job" aria-label="Founder and Principal Engineer at Kilroy AI LLC">
            <p className="job-title">Founder &amp; Principal Engineer</p>
            <p className="job-company">Kilroy AI LLC</p>
            <p className="job-dates">2026 &ndash; Present</p>
            <div className="job-desc">
              <ul>
                <li><strong>Hidalga</strong> (client engagement) &mdash; agent capability layer, policy-first control, forensic observability, and model trust contract for a six-agent HIPAA-regulated oncology prior authorization pipeline.</li>
                <li><strong>RadioHead</strong> (radiohead.bot) &mdash; autonomous broadcast transcription agent for an NPR member station; started on the OpenClaw harness, re-architected onto AWS, and seeded with a knowledge graph of the full program archive for multi-hop answers with source links. Built with a student team; won the University of Arkansas AI Innovation and Integration Challenge.</li>
                <li><strong>Free2PA</strong> (free2pa.org) &mdash; public provenance toolkit verifying signed agent control files before model context load.</li>
                <li><strong>Phyllis</strong> (phyllis.bot) &mdash; multi-tenant fulfillment API for autonomous commerce agents; agents prepare orders, humans approve anything that spends money or ships goods.</li>
              </ul>
            </div>
          </article>

          <article className="job" aria-label="Founder and AI Engineer at NYX NoCode">
            <p className="job-title">Founder &amp; AI Engineer</p>
            <p className="job-company">NYX NoCode</p>
            <p className="job-dates">2024 &ndash; Present</p>
            <div className="job-desc">
              <ul>
                <li>Serve public school customers in production, with the reliability, cost control, accessibility, and safety obligations that implies rather than demo-grade output.</li>
                <li>Built a platform that takes a student from a prompt or a doodle to a working application, used in teacher-led hackathons &mdash; agent orchestration, model routing, RAG memory, code generation, and hosting, owned end to end. Backed by Microsoft for Startups, Techstars, Builders + Backers, and AWS.</li>
              </ul>
            </div>
          </article>

          <article className="job" aria-label="AI Researcher and ML Engineer at Friends of Justin">
            <p className="job-title">AI Researcher &amp; ML Engineer</p>
            <p className="job-company">Friends of Justin</p>
            <p className="job-dates">2023 &ndash; Present</p>
            <div className="job-desc">
              <ul>
                <li>AI research for a non-profit dedicated to improving interactions between humans and AI models.</li>
              </ul>
            </div>
          </article>

          <article className="job" aria-label="Standards leadership">
            <p className="job-title">Co-Chair, AI/ML Task Force &middot; Contributor, Agentic Task Force</p>
            <p className="job-company">Coalition for Content Provenance and Authenticity (C2PA) &middot; SMPTE / ETC AI/ML Task Force</p>
            <p className="job-dates">Current</p>
            <div className="job-desc">
              <ul>
                <li>Cross-industry standards work on AI provenance and content authenticity, applying C2PA &mdash; a standard for determining the edits and origin of content &mdash; to agentic systems.</li>
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

          <article className="job" aria-label="Author at O'Reilly Media">
            <p className="job-title">Author</p>
            <p className="job-company">O'Reilly Media</p>
            <p className="job-dates">2019 &ndash; 2024</p>
            <div className="job-desc">
              <ul>
                <li>Four books: <em>Natural Language and Search</em> (2024), <em>Blockchain Tethered AI</em> (2023), <em>AI and the Law</em> (2021), <em>Blockchain as a Service</em> (2019), plus the O'Reilly Radar article "AI's Opaque Box Is Actually a Supply Chain."</li>
              </ul>
            </div>
          </article>

          <article className="job" aria-label="CEO at Kilroy Blockchain">
            <p className="job-title">CEO &amp; Technical Lead</p>
            <p className="job-company">Kilroy Blockchain</p>
            <p className="job-dates">2016 &ndash; 2025</p>
            <div className="job-desc">
              <ul>
                <li>Led the team that built <strong>RILEY</strong>, winner of the IBM Watson Build Challenge North America (2017). Directed engineering for blockchain-backed supply chain, workflow, and case management systems where provenance, traceability, and chain of custody were the core requirements.</li>
              </ul>
            </div>
          </article>

          <section aria-label="Earlier Roles (Condensed)" style={{ marginTop: '0.75rem' }}>
            <strong>Earlier Roles (Condensed)</strong>
            <div className="experience-details" style={{ marginTop: '0.4rem' }}>
              <ul>
                <li><span className="experience-role">CTO &ndash; Jamersan LLC</span> (2016) &middot; <span className="experience-role">Magento Technical Lead &ndash; Amplifi Commerce</span> (2015&ndash;2016) &middot; <span className="experience-role">Principal Applications Developer &ndash; CA Technologies</span> (2014&ndash;2015) &middot; <span className="experience-role">Training &amp; Documentation Consultant &ndash; Magento Inc.</span> (2010&ndash;2014), Magento U instructor and course author</li>
                <li><span className="experience-role">Web Programmer, then Executive Director of United Cloud &ndash; Suarez Corporation Industries</span> (2009&ndash;2012) &middot; <span className="experience-role">Webmaster &ndash; Kucinich for President</span> (2003&ndash;2004), the first US presidential election where the web was a factor</li>
                <li><span className="experience-role">President &ndash; Data Now</span> (1991&ndash;1999), ran a 20-person Lotus Notes and Java consulting firm &middot; <span className="experience-role">LAN Administrator &ndash; Bayer</span> (1990&ndash;1998), 200-user network &middot; <span className="experience-role">Technology Coordinator &ndash; CIGNA</span> (1983&ndash;1991). IT career began in 1980 as a telex operator.</li>
              </ul>
            </div>
          </section>
        </section>

        <section className="section certifications" aria-labelledby="certifications-heading">
          <h2 id="certifications-heading">Recognition, Certifications &amp; Education</h2>
          <ul className="cert-list" aria-label="Recognition and education list">
            <li>Winner, University of Arkansas AI Innovation and Integration Challenge, team lead (2026), for RadioHead &middot; AWS Tech Star award (2025) &middot; IBM Watson Build Challenge Winner, North America (2017) &middot; IBM Champion, six-time honoree (2020&ndash;2025)</li>
            <li>AI Fluency for Students and Teaching the AI Fluency Framework &mdash; Anthropic (2025) &middot; Venture Building &mdash; Builders + Backers (2025) &middot; IBM Blockchain Supply Chain &middot; IBM Food Trust &middot; Oracle blockchain food traceability &middot; IBM Certifications: Watson Chatbot, RPA, Bluemix Essentials, Blockchain Essentials &middot; FAA Private Pilot License</li>
            <li><strong>University of Arkansas, Sam M. Walton College of Business</strong> &mdash; Cloud Computing &amp; Infrastructure, agent-focused (Spring 2026), 4.0 GPA; Quantum Computing (Fall 2026)</li>
            <li><strong>University of Arkansas</strong> &mdash; Studies in Music, 4.0 GPA (2023&ndash;Present) &middot; <strong>Hammel College</strong> &mdash; Office Automation &amp; Database Management (1981&ndash;1982), 4.0 GPA</li>
          </ul>
        </section>
      </main>
    </div>
  );
}
