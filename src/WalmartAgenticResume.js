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
            <p className="resume-version">Agentic AI Platform Engineer · Multi-Agent Runtimes · Policy-First Control Planes</p>
            <h1 className="site-title">Karen Kilroy</h1>
          </div>
          <img
            src="https://drive.nyx.baby/nyxnocode/karen%40knowbots.org%2F1751995949315.jpeg"
            alt="Karen Kilroy"
            className="header-image"
          />
        </header>

        <p className="contact screen-only" aria-label="Contact (web)">
          Contact:{' '}
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSejoNvJ1vH4mnTaESayh6HO8LglyAmvYpErYyIGT8of2Wp_eg/viewform?usp=header"
            target="_blank"
            rel="noopener noreferrer"
            className="link-strong"
          >
            Submit inquiry via Google Form
          </a>{' '}
          | LinkedIn:{' '}
          <a
            href="https://linkedin.com/in/karenkilroy"
            target="_blank"
            rel="noopener noreferrer"
            className="link-strong"
          >
            linkedin.com/in/karenkilroy
          </a>
        </p>

        <p className="contact print-only" aria-label="Contact (print)">
          Email: <a href="mailto:karen@nyx.baby">karen@nyx.baby</a> | Phone: 330-289-1351 | LinkedIn: linkedin.com/in/karenkilroy
        </p>

        <section className="section summary-section" aria-labelledby="summary-heading">
          <h2 id="summary-heading">Summary</h2>
          <p className="summary">
            Software engineer and architect with 40 years in IT, the last decade building AI systems and now focused
            entirely on agentic AI. At Hidalga, designed the layer that governs which tools and data six AI agents are
            allowed to use inside a HIPAA-regulated oncology prior authorization pipeline, together with the audit system
            that proves what each agent did, why it was permitted, and which model answered. Builds the whole path
            personally: agent orchestration, backend services and APIs, the database layer, and the React and
            command-line interfaces operators work in. Creator of Free2PA, which verifies signed agent instruction files
            before they reach a model, and of Phyllis, a fulfillment API for autonomous commerce agents. Six-time IBM
            Champion, winner of the IBM Watson Build Challenge North America, O'Reilly author of four books, and Co-Chair
            of the C2PA AI/ML Task Force.
          </p>
        </section>

        <section className="section relevance-section" aria-labelledby="relevance-heading">
          <h2 id="relevance-heading">Target Relevance</h2>
          <ul className="impact-list">
            <li><strong>Builds agent platforms, not just agents.</strong> Designs the shared foundation other engineers build on: a capability layer where agents request what they need by name and never bind directly to a vendor, a model, or a database, so backends can change without touching agent code.</li>
            <li><strong>Designs for the failure case first.</strong> Agents report honestly when a backend is missing instead of quietly degrading. Decisions that matter stay deterministic, unresolved cases route to a human rather than defaulting to a denial, and the model writes and reasons but never renders the verdict.</li>
            <li><strong>Makes agent behavior provable after the fact.</strong> Builds tamper-evident execution traces that record what ran, what it cost, which model answered, and where it failed, so operators and engineers can reconstruct any outcome instead of guessing at it.</li>
            <li><strong>Owns the full path from prototype to production.</strong> Agent runtime, APIs, schema design and migrations, queue-based execution, telemetry, and the operator-facing web and CLI interfaces, on the same systems, in production, for real users.</li>
            <li><strong>Builds the tools other engineers develop with.</strong> Internal Claude Code skills, code generators that keep a growing agent codebase from drifting off its own standards, and a QA agent that acceptance-tests real user journeys in a real browser and files the evidence.</li>
            <li><strong>Has been making the case for governable AI since before it was a category.</strong> Four O'Reilly books, the Radar article "AI's Opaque Box Is Actually a Supply Chain," and Co-Chair of the C2PA AI/ML Task Force &mdash; then built Free2PA to show the standard working in code.</li>
            <li><strong>Raises the level of the people nearby.</strong> Mentored the student engineer behind RadioHead, an award-winning transcription agent now running at an NPR affiliate, and has spent a decade teaching engineers through books, standards work, and hands-on training.</li>
          </ul>
        </section>

        <section className="section skills-section" aria-labelledby="skills-heading">
          <h2 id="skills-heading">Agentic Platform Skills</h2>

          <div className="skills-group" aria-label="Agent runtime and orchestration skills">
            <h3 className="skills-group-title">Agent Runtime &amp; Orchestration</h3>
            <ul className="skills">
              <li>Multi-Agent Pipelines &amp; Orchestration</li>
              <li>Custom Agent Harnesses &amp; Runtimes</li>
              <li>Ports-and-Adapters Capability Layers</li>
              <li>Typed Capability Contracts &amp; Registries</li>
              <li>Event-Driven Queue-Based Agent Dispatch</li>
              <li>Model Context Protocol (MCP) Clients &amp; Servers</li>
              <li>Tool Adapters, Function Calling, Structured Outputs</li>
              <li>Human-Approval Gates &amp; Interruption Handling</li>
              <li>Durable Session &amp; Workflow State</li>
              <li>Context-Window Management</li>
              <li>Model Routing &amp; Provider-Aware Execution</li>
              <li>Agent Capability Routing &amp; Drift Audits</li>
            </ul>
          </div>

          <div className="skills-group" aria-label="Knowledge, context, and evaluation skills">
            <h3 className="skills-group-title">Knowledge, Context &amp; Evaluation</h3>
            <ul className="skills">
              <li>Retrieval-Augmented Generation (RAG)</li>
              <li>Portable Agent Memory (Peopleoids)</li>
              <li>Clinical NLP Extraction &amp; Entity Resolution</li>
              <li>Structured Ontologies: FHIR R4, SNOMED CT, ICD-10</li>
              <li>Guideline Provenance &amp; Temporal Validity (NCCN / ASCO)</li>
              <li>Agent Trace Review &amp; Failure Analysis</li>
              <li>Capability Conformance &amp; Drift Audits</li>
              <li>Model Provenance Ledgers &amp; Drift Detection</li>
              <li>Model Trust States &amp; Validation Evidence</li>
              <li>End-to-End Agent Acceptance Testing</li>
            </ul>
          </div>

          <div className="skills-group" aria-label="Platform and full stack engineering skills">
            <h3 className="skills-group-title">Platform &amp; Full-Stack Engineering</h3>
            <ul className="skills">
              <li>TypeScript, Node.js, React, Next.js</li>
              <li>Python (intermediate)</li>
              <li>PostgreSQL, Prisma, Schema Design &amp; Migrations</li>
              <li>Multi-Tenant API Design, OpenAPI, Stripe</li>
              <li>Azure Service Bus, Queue Workers, KEDA</li>
              <li>SSE Streaming &amp; Live Operator Consoles</li>
              <li>OpenTelemetry, Application Insights, Azure Monitor</li>
              <li>Azure AI Foundry, Azure OpenAI, Azure ML, Azure FHIR</li>
              <li>AWS Agent Deployment &amp; Migration</li>
              <li>CI/CD, Layered Testing, Release Gates</li>
              <li>WCAG-Aware Accessible Interfaces</li>
            </ul>
          </div>

          <div className="skills-group" aria-label="Governance, safety, and standards skills">
            <h3 className="skills-group-title">Governance, Safety &amp; Standards</h3>
            <ul className="skills">
              <li>Signed Agent Control-File Verification (Free2PA)</li>
              <li>Prompt-Injection &amp; Untrusted-Instruction Defenses</li>
              <li>Least-Privilege Tool &amp; Data Access</li>
              <li>Tamper-Evident Audit Hash Chains</li>
              <li>RBAC / RLS / Managed Identity / Secrets</li>
              <li>PHI-Safe Review Paths &amp; Data Protection</li>
              <li>Content Provenance (C2PA, SMPTE/ETC)</li>
              <li>AI Supply Chain Governance &amp; Kill Switches</li>
              <li>Technical Writing, Mentoring &amp; Education</li>
            </ul>
          </div>

          <div className="skills-group" aria-label="AgentOps and developer tooling skills">
            <h3 className="skills-group-title">AgentOps &amp; Developer Tooling</h3>
            <ul className="skills">
              <li>Claude Code Skill Authoring (13 internal skills)</li>
              <li>Code Generators as Anti-Drift Mechanism</li>
              <li>Browser-Driving QA Agents (CDP, credential-free)</li>
              <li>Hash-Chained Forensic Execution Traces</li>
              <li>Token &amp; Cost Accounting per Agent Step</li>
              <li>Liveness &amp; Stall Detection</li>
              <li>Living Diagrams Derived from Source of Truth</li>
              <li>Architecture Specs &amp; Runbooks</li>
            </ul>
          </div>
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
                  submission on Azure AI Foundry, Azure Service Bus, and Azure FHIR.
                </p>
                <ul>
                  <li>Architected and shipped the agent capability abstraction layer: 16 domain-named capabilities over 24 swappable backends spanning LLM, deterministic, static-data, and vendor-API implementations, making backend changes zero-touch for agent code.</li>
                  <li>Designed a typed capability outcome contract that returns explicit unavailability rather than throwing, converting silent agent degradation into loud configuration errors and allowing agents to be fully wired and tested against unimplemented capabilities.</li>
                  <li>Codified "no agent contains capability logic" as a project standard, then ran a drift audit and rerouted every non-conforming agent.</li>
                  <li>Composed multiple clinical guideline vendors behind a single capability with per-tenant selection and consolidated verdicts, keeping vendor identity out of agent code and stored prompts.</li>
                  <li>Converted four deterministic agents to LLM-backed agents on Azure AI Foundry for clinical extraction from unstructured referral text, document summarization over OCR, and payer-facing medical-necessity narrative, while keeping every approval decision deterministic.</li>
                  <li>Enforced clinical-safety invariants in the agent layer: guideline answers require corroborating citations, "unable to assess" routes to human review rather than denial, and divergence between peer guideline sources routes to review.</li>
                  <li>Built forensic agent observability with hash-chained tamper-evident execution traces and chain verification, liveness and stall detection, live SSE streaming, per-step token accounting, and trace sealing across web-request-to-queue-worker boundaries.</li>
                  <li>Built a per-run data-footprint map computed from actually persisted data instead of a maintained diagram, so architecture views cannot go stale.</li>
                  <li>Routed all agent dispatch through Azure Service Bus queue-based execution end to end, and corrected shared-tool capability attribution across agents.</li>
                  <li>Integrated an Azure ML prediction model behind a capability with a four-state trust contract (validated, unvalidated, simulated, unavailable), a model-provenance ledger, drift detection, and model-attributed audit chain entries.</li>
                  <li>Maintained PHI discipline under agentic execution: agents hold patient context in execution memory and persist decisions and scores, never input PHI. Designed and tested the redaction boundary for persisted data.</li>
                  <li>Authored 13 internal Claude Code skills, including capability-wiring and message-queue-wiring code generators used as the anti-drift mechanism, and deterministic living architecture diagrams generated from source-of-truth maps.</li>
                  <li>Created PAM, a credential-free browser-driving QA agent that acceptance-tests user stories end to end over CDP, records video walkthroughs, and files field-level pass/fail evidence to work-tracking tickets.</li>
                  <li>Wrote and maintained the architecture specification for the capability layer through seven revisions, along with the runbook governing agent permissions and isolation.</li>
                </ul>
              </div>
            </div>

            <div className="job-sub">
              <p className="job-sub-title">RadioHead</p>
              <p className="job-sub-meta">Broadcast transcription agent &middot; NPR affiliate KUAF &middot; 2026 &ndash; Present</p>
              <div className="job-desc">
                <ul>
                  <li>Built an autonomous broadcast transcription agent that turns live public radio programming into searchable, publishable text for an NPR member station.</li>
                  <li>Started the agent on OpenClaw, then re-architected and migrated it onto AWS for production reliability.</li>
                  <li>Built with a student collaborator; the system won a student competition and is credited by the station with expanding what its small newsroom can produce.</li>
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
                <li>Built and operate an AI-driven platform where non-specialists describe an application in natural language and get a deployed React app &mdash; agent orchestration, model routing, RAG memory, code generation, and hosting, owned end to end.</li>
                <li>Serve public school customers in production, which means real reliability, cost control, accessibility, and safety obligations rather than demo-grade output.</li>
                <li>Developed <em>Peopleoids</em>, a portable RAG assistant with instant memory suitable for fine-tuning and reuse across agents.</li>
                <li>Integrated Deepgram speech AI for real-time voice input, and shipped public prototypes including <em>Idea Beast</em> (AI-assisted ideation) and <em>Music Seer</em> (responsive guitar MIDI visualization).</li>
                <li>Ran hackathons and training programs that turned non-engineers into shipping builders &mdash; capability creation, measured by what other people went on to build.</li>
              </ul>
            </div>
          </article>

          <article className="job" aria-label="AI Researcher and ML Engineer at Friends of Justin">
            <p className="job-title">AI Researcher &amp; ML Engineer</p>
            <p className="job-company">Friends of Justin</p>
            <p className="job-dates">2023 &ndash; Present</p>
            <div className="job-desc">
              <ul>
                <li>AI research for a non-profit dedicated to improving interactions between humans and AI models, covering responsible AI, natural language processing, and model behavior.</li>
              </ul>
            </div>
          </article>

          <article className="job" aria-label="CEO at File Baby">
            <p className="job-title">CEO</p>
            <p className="job-company">File Baby</p>
            <p className="job-dates">2024 &ndash; 2025</p>
            <div className="job-desc">
              <ul>
                <li>Founded and led a venture applying content provenance and authenticity standards to digital files.</li>
              </ul>
            </div>
          </article>

          <article className="job" aria-label="Standards leadership in C2PA and SMPTE">
            <p className="job-title">Co-Chair, AI/ML Task Force</p>
            <p className="job-company">C2PA &middot; contributor, SMPTE/ETC AI/ML Task Force</p>
            <p className="job-dates">Current</p>
            <div className="job-desc">
              <ul>
                <li>Co-chair cross-industry work on AI provenance, content authenticity, disclosure, and standards adoption alongside engineers from major technology and media companies.</li>
                <li>Translate standards into implementable engineering patterns, demos, and documentation &mdash; the same skill as turning an ambiguous enterprise mandate into a contract engineers can build against.</li>
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
                <li>Directed engineering for <strong>FLO</strong> (forms workflow) and <strong>CASEY</strong> (case management), blockchain-backed systems where auditability and operational control were core requirements.</li>
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
                <li><span className="experience-role">Executive Director &ndash; United Cloud</span> (2010&ndash;2012), XMPP-based communications platform &middot; <span className="experience-role">Web Programmer &ndash; Suarez Corporation Industries</span> (2009&ndash;2010), introduced online sales to a direct-marketing company</li>
                <li><span className="experience-role">Webmaster &ndash; Kucinich for President</span> (2003&ndash;2004), full web presence and mass email for a national campaign in the first US presidential election where the web was a factor</li>
                <li><span className="experience-role">President &ndash; Data Now</span> (1991&ndash;1999), ran a 20-person consulting firm building Lotus Notes and Java web applications &middot; <span className="experience-role">LAN Administrator &ndash; Bayer</span> (1990&ndash;1998), 200-user OS/2 LAN Manager network</li>
                <li><span className="experience-role">Technology Coordinator &ndash; CIGNA</span> (1983&ndash;1991), enterprise office automation in its infancy. IT career began in 1980 as a telex operator.</li>
              </ul>
            </div>
          </section>
        </section>

        <section className="section speaking-section" aria-labelledby="impact-heading">
          <h2 id="impact-heading">Organization-Level Impact</h2>
          <ul className="speaking-list">
            <li>
              <strong>RadioHead</strong> &mdash; <em>Award-winning broadcast transcription agent, built with a student collaborator</em>
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
            <li>IBM Watson Build Challenge Winner &mdash; North America (2017)</li>
            <li>IBM Champion &mdash; six-time honoree, 2020&ndash;2025</li>
            <li>AI Fluency for Students &mdash; Anthropic (Aug 2025)</li>
            <li>Teaching the AI Fluency Framework &mdash; Anthropic (Aug 2025)</li>
            <li>Venture Building Certification &mdash; Builders + Backers (Jul 2025)</li>
            <li>IBM Certifications: Watson Chatbot, RPA, Bluemix Essentials, Blockchain Essentials</li>
            <li>Magento Front End Developer Certification (2013)</li>
            <li>FAA Private Pilot License, Single Engine Land</li>
          </ul>
        </section>

        <section className="section education" aria-labelledby="education-heading">
          <h2 id="education-heading">Education</h2>
          <ul className="education-list" aria-label="Education list">
            <li><strong>University of Arkansas, Sam M. Walton College of Business</strong> &mdash; Infrastructure &amp; Cloud Computing (Spring 2026), 4.0 GPA; Quantum Computing (Fall 2026)</li>
            <li><strong>University of Arkansas</strong> &mdash; Studies in Music (Voice/Piano), 4.0 GPA (2023&ndash;Present)</li>
            <li><strong>Hammel College</strong> &mdash; Office Automation &amp; Database Management (1981&ndash;1982), 4.0 GPA</li>
          </ul>
        </section>
      </main>
    </div>
  );
}
