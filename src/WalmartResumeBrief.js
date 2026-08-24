import React from 'react';
import './Resume.css';

export default function WalmartResumeBrief() {
  const handlePrintClick = () => window.print();

  return (
    <div className="resume-page walmart-brief-resume">
      <main className="container" role="main" aria-label="Agentic AI platform resume of Karen Kilroy, brief version">
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
          <a href="https://linkedin.com/in/karenkilroy" target="_blank" rel="noopener noreferrer" className="link-strong">
            linkedin.com/in/karenkilroy
          </a>
        </p>

        <p className="contact print-only" aria-label="Contact (print)">
          Email: <a href="mailto:karen@nyx.baby">karen@nyx.baby</a> | Phone: 330-289-1351 | LinkedIn: linkedin.com/in/karenkilroy | Full detail: karenkilroy.com/resume-walmart
        </p>

        <section className="section summary-section" aria-labelledby="summary-heading">
          <h2 id="summary-heading">Summary</h2>
          <p className="summary">
            Software engineer and architect with 20+ years of building and operating production systems, now focused
            entirely on agentic AI. Designed the layer that governs which tools and data six AI agents are allowed to use
            inside a HIPAA-regulated oncology prior authorization pipeline, together with the audit system that proves
            what each agent did, why it was permitted, and which model answered. Builds the whole path personally: agent
            orchestration, backend services and APIs, the database layer, and the React and command-line interfaces
            operators work in. Creator of Free2PA, which verifies signed agent instruction files before they reach a
            model. Six-time IBM Champion, winner of the IBM Watson Build Challenge North America, O'Reilly author of four
            books, and Co-Chair of the C2PA AI/ML Task Force.
          </p>
        </section>

        <section className="section skills-section" aria-labelledby="skills-heading">
          <h2 id="skills-heading">Core Skills</h2>
          <div className="skills-group" aria-label="Agentic AI skills">
            <h3 className="skills-group-title">Agentic AI</h3>
            <ul className="skills">
              <li>Multi-Agent Orchestration</li>
              <li>Custom Agent Harnesses &amp; Runtimes</li>
              <li>Ports-and-Adapters Capability Layers</li>
              <li>Typed Capability Contracts &amp; Registries</li>
              <li>Model Context Protocol (MCP)</li>
              <li>Function Calling &amp; Structured Outputs</li>
              <li>Human-Approval Gates &amp; Recovery</li>
              <li>Durable Session &amp; Workflow State</li>
              <li>RAG &amp; Model Routing</li>
              <li>Event-Driven Queue-Based Dispatch</li>
            </ul>
          </div>
          <div className="skills-group" aria-label="Engineering skills">
            <h3 className="skills-group-title">Engineering</h3>
            <ul className="skills">
              <li>TypeScript, Node.js, React, Next.js</li>
              <li>Python (intermediate)</li>
              <li>PostgreSQL, Prisma, Schema Design &amp; Migrations</li>
              <li>Multi-Tenant APIs, OpenAPI</li>
              <li>Azure AI Foundry, Azure OpenAI, Azure ML, FHIR</li>
              <li>AWS Agent Deployment &amp; Migration</li>
              <li>Service Bus, Queue Workers, KEDA, SSE</li>
              <li>OpenTelemetry, App Insights</li>
              <li>CI/CD, Layered Testing, Release Gates</li>
            </ul>
          </div>
          <div className="skills-group" aria-label="AgentOps and governance skills">
            <h3 className="skills-group-title">AgentOps &amp; Governance</h3>
            <ul className="skills">
              <li>Hash-Chained Forensic Execution Traces</li>
              <li>Token &amp; Cost Accounting per Agent Step</li>
              <li>Model Provenance Ledgers &amp; Drift Detection</li>
              <li>Least-Privilege Tool &amp; Data Access</li>
              <li>Prompt-Injection &amp; Untrusted-Instruction Defenses</li>
              <li>Claude Code Skill Authoring &amp; Code Generators</li>
              <li>Content Provenance (C2PA, SMPTE/ETC)</li>
              <li>PHI-Safe Review Paths, RBAC / Managed Identity</li>
            </ul>
          </div>
        </section>

        <section className="section experience-section" aria-labelledby="experience-heading">
          <h2 id="experience-heading">Experience</h2>

          <article className="job" aria-label="Founder and Principal Engineer at Kilroy AI LLC">
            <p className="job-title">Founder &amp; Principal Engineer</p>
            <p className="job-company">Kilroy AI LLC</p>
            <p className="job-dates">2026 &ndash; Present</p>
            <div className="job-desc">
              <ul>
                <li><strong>Hidalga (client engagement)</strong> &mdash; Architected the agent capability abstraction layer for a HIPAA-regulated six-agent oncology prior authorization pipeline: 16 domain-named capabilities over 24 swappable backends, so agents never bind to a vendor or model and backends change with zero agent code changes.</li>
                <li>Designed a typed capability outcome contract returning explicit unavailability rather than throwing, converting silent agent degradation into loud configuration errors, then codified the boundary as a project standard and drift-audited every agent against it.</li>
                <li>Converted four deterministic agents to LLM-backed agents on Azure AI Foundry for clinical extraction, document summarization, and payer narrative, while keeping every approval decision deterministic &mdash; the model reasons and writes, never renders the verdict.</li>
                <li>Built forensic agent observability: hash-chained tamper-evident execution traces with chain verification, liveness and stall detection, live SSE streaming, per-step token accounting, and model-attributed audit entries.</li>
                <li>Integrated an Azure ML prediction model behind a capability with a four-state trust contract, model-provenance ledger, and drift detection, so an unvalidated model declares itself rather than looking identical to a validated one.</li>
                <li>Authored 13 internal Claude Code skills including wiring code generators used as the anti-drift mechanism, and created PAM, a credential-free browser-driving QA agent that acceptance-tests user journeys and files field-level evidence.</li>
                <li><strong>RadioHead</strong> &mdash; Built an autonomous broadcast transcription agent for an NPR member station, started on OpenClaw and migrated onto AWS for production reliability. Built with a student collaborator; won a student competition.</li>
                <li><strong>Free2PA</strong> (free2pa.org) &mdash; Public provenance toolkit verifying signed agent control files before model context load: allow, deny, and quarantine primitives for a policy-first control plane, published as an open reference implementation.</li>
                <li><strong>Phyllis</strong> (phyllis.bot) &mdash; Multi-tenant fulfillment API for autonomous commerce agents, with the consequential-action boundary designed in: agents prepare orders, humans approve anything that spends money or ships goods.</li>
              </ul>
            </div>
          </article>

          <article className="job" aria-label="Founder and AI Engineer at NYX NoCode">
            <p className="job-title">Founder &amp; AI Engineer</p>
            <p className="job-company">NYX NoCode</p>
            <p className="job-dates">2024 &ndash; Present</p>
            <div className="job-desc">
              <ul>
                <li>Built and operate a platform where non-specialists describe an application in natural language and get a deployed React app &mdash; agent orchestration, model routing, RAG memory, code generation, and hosting, owned end to end.</li>
                <li>Serve public school customers in production, with the reliability, cost, accessibility, and safety obligations that implies.</li>
                <li>Ran hackathons and training programs that turned non-engineers into shipping builders.</li>
              </ul>
            </div>
          </article>

          <article className="job" aria-label="Co-Chair of the C2PA AI/ML Task Force">
            <p className="job-title">Co-Chair, AI/ML Task Force</p>
            <p className="job-company">C2PA &middot; contributor, SMPTE/ETC AI/ML Task Force</p>
            <p className="job-dates">Current</p>
            <div className="job-desc">
              <ul>
                <li>Co-chair cross-industry work on AI provenance, content authenticity, and standards adoption, then ship reference implementations so the standard becomes something teams can adopt.</li>
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
                <li>Led the team that built <strong>RILEY</strong>, winner of the IBM Watson Build Challenge North America (2017), an AI accessibility system for people who are blind or visually impaired.</li>
                <li>Directed engineering for blockchain-backed workflow and case management systems where auditability and operational control were core requirements.</li>
              </ul>
            </div>
          </article>

          <section aria-label="Earlier Roles (Condensed)" style={{ marginTop: '0.75rem' }}>
            <strong>Earlier Roles (Condensed)</strong>
            <div className="experience-details" style={{ marginTop: '0.4rem' }}>
              <ul>
                <li><span className="experience-role">CTO &ndash; Jamersan LLC</span> (2016) &middot; <span className="experience-role">Principal Application Developer &ndash; CA Technologies</span> (2014&ndash;2015) &middot; <span className="experience-role">Training Consultant &ndash; Magento Inc.</span> (2010&ndash;2014), founding member of Magento U &middot; <span className="experience-role">Director of Online Marketing &ndash; Suarez Corp.</span> (2010&ndash;2012)</li>
              </ul>
            </div>
          </section>
        </section>

        <section className="section certifications" aria-labelledby="certifications-heading">
          <h2 id="certifications-heading">Recognition, Certifications &amp; Education</h2>
          <ul className="cert-list" aria-label="Recognition and education list">
            <li>IBM Watson Build Challenge Winner, North America (2017) &middot; IBM Champion, six-time honoree (2020&ndash;2025)</li>
            <li>AI Fluency for Students and Teaching the AI Fluency Framework &mdash; Anthropic (2025) &middot; Venture Building &mdash; Builders + Backers (2025)</li>
            <li>IBM Certifications: Watson Chatbot, RPA, Bluemix Essentials, Blockchain Essentials &middot; FAA Private Pilot License</li>
            <li><strong>University of Arkansas, Sam M. Walton College of Business</strong> &mdash; Infrastructure &amp; Cloud Computing (Spring 2026), 4.0 GPA; Quantum Computing (Fall 2026)</li>
            <li><strong>University of Arkansas</strong> &mdash; Studies in Music, 4.0 GPA (2023&ndash;Present) &middot; <strong>Hammel College</strong> &mdash; Office Automation &amp; Database Management (1981&ndash;1982), 4.0 GPA</li>
          </ul>
        </section>
      </main>
    </div>
  );
}
