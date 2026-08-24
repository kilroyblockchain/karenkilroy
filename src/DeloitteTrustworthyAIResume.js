import React from 'react';
import './Resume.css';

export default function DeloitteTrustworthyAIResume() {
  const handlePrintClick = () => window.print();

  return (
    <div className="resume-page deloitte-ai-resume">
      <main className="container" role="main" aria-label="Deloitte Trustworthy AI resume of Karen Kilroy">
        <div className="topbar print-hide" role="region" aria-label="Actions">
          <a className="print-link" href="/resume" aria-label="Open general resume">
            General Resume
          </a>
          <button className="print-btn" onClick={handlePrintClick} aria-label="Print this trustworthy AI resume">
            Print
          </button>
        </div>

        <header className="header">
          <div>
            <p className="resume-version">Trustworthy AI Engineer · C2PA Standards Leader · Provenance Systems Builder</p>
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
            Trustworthy AI engineer, C2PA standards leader, O'Reilly author, and hands-on builder of provenance-first
            AI systems. Her research into trackable, traceable AI began while building RILEY, the 2017 IBM Watson Build
            Challenge North America winner: an AI accessibility system for people who are blind, where she needed to
            know the AI could be trusted. Co-Chair of the C2PA AI/ML Task Force and contributor to the SMPTE/ETC AI/ML
            Task Force, with rare overlap across media authenticity, signed agent harnesses, blockchain-tethered AI
            governance, regulated workflow audit trails, and practical product engineering. Author of O'Reilly's
            <em> Blockchain Tethered AI</em> and creator of Free2PA, a public provenance toolkit that verifies signed
            agent control files before model context load. Directly relevant to Deloitte teams working on C2PA compliance,
            deepfake mitigation, content credentials, synthetic media disclosure, media tracking, agentic AI controls,
            AI supply chain assurance, and trustworthy AI implementation for enterprise clients.
          </p>
        </section>

        <section className="section relevance-section" aria-labelledby="relevance-heading">
          <h2 id="relevance-heading">Target Relevance</h2>
          <ul className="impact-list">
            <li><strong>C2PA leadership:</strong> Co-Chair of the C2PA AI/ML Task Force, translating provenance standards into usable workflows and technical guidance.</li>
            <li><strong>Traceable AI origin:</strong> Began trackable, traceable AI research in 2017 while building RILEY, an IBM Watson Build-winning accessibility system for blind users where AI trust was mission-critical.</li>
            <li><strong>Published authority:</strong> Wrote O'Reilly's <em>Blockchain Tethered AI</em>, connecting AI outputs, auditability, provenance, and blockchain-backed trust infrastructure.</li>
            <li><strong>Media authenticity:</strong> Experience presenting C2PA and Content Credentials for AI/ML provenance to media-adjacent and high-risk information audiences.</li>
            <li><strong>Agentic controls:</strong> Built Free2PA to verify signed agent control files before model context load, showing how trust checks can govern agent behavior.</li>
            <li><strong>Auditable AI delivery:</strong> Built tamper-evident audit trails, reviewer surfaces, trace review, conformance checks, and evidence workflows for regulated AI systems.</li>
          </ul>
        </section>

        <section className="section skills-section" aria-labelledby="skills-heading">
          <h2 id="skills-heading">Trustworthy AI Skills</h2>

          <div className="skills-group" aria-label="Content provenance and media authenticity skills">
            <h3 className="skills-group-title">Content Provenance &amp; Media Authenticity</h3>
            <ul className="skills">
              <li>C2PA Compliance Strategy</li>
              <li>Content Credentials</li>
              <li>C2PA AI/ML Task Force Leadership</li>
              <li>SMPTE/ETC AI/ML Task Force Contributor</li>
              <li>Synthetic Media Disclosure</li>
              <li>Deepfake Mitigation Workflows</li>
              <li>Media Chain of Custody</li>
              <li>Attribution &amp; Manifest Strategy</li>
            </ul>
          </div>

          <div className="skills-group" aria-label="Agentic AI governance skills">
            <h3 className="skills-group-title">Agentic AI Governance</h3>
            <ul className="skills">
              <li>Signed Agent Harnesses</li>
              <li>Signed Agent Control-File Verification</li>
              <li>Agent Capability Routing</li>
              <li>Agent Drift Audits</li>
              <li>Tamper-Evident Audit Trails</li>
              <li>Policy-Gated Context Loading</li>
              <li>Human Review Workflows</li>
              <li>AI Supply Chain Controls</li>
            </ul>
          </div>

          <div className="skills-group" aria-label="AI engineering skills">
            <h3 className="skills-group-title">AI Engineering</h3>
            <ul className="skills">
              <li>Generative AI &amp; RAG</li>
              <li>Azure AI Foundry / Azure OpenAI</li>
              <li>Model Context Protocol (MCP)</li>
              <li>React, Next.js, Node.js, TypeScript</li>
              <li>Prisma, PostgreSQL, Multi-Tenant APIs</li>
              <li>OpenAPI / LLM-Readable Documentation</li>
              <li>Deepgram Speech AI</li>
            </ul>
          </div>

          <div className="skills-group" aria-label="Risk and regulated workflow skills">
            <h3 className="skills-group-title">Risk, Compliance &amp; Regulated Workflows</h3>
            <ul className="skills">
              <li>AI Governance Patterns</li>
              <li>Evidence Trace Review</li>
              <li>FHIR R4 / Clinical NLP</li>
              <li>PHI-Safe Review Paths</li>
              <li>RBAC / Managed Identity</li>
              <li>Technical Writing &amp; Education</li>
            </ul>
          </div>
        </section>

        <section className="section experience-section page-break-before" aria-labelledby="experience-heading">
          <h2 id="experience-heading">Relevant Experience</h2>

          <article className="job" aria-label="Standards leadership in C2PA and SMPTE">
            <p className="job-title">Standards Contributor</p>
            <p className="job-company">C2PA AI/ML Task Force and SMPTE/ETC AI/ML Task Force</p>
            <p className="job-dates">Current</p>
            <div className="job-desc">
              <ul>
                <li>Serve as Co-Chair of the C2PA AI/ML Task Force, focusing on AI provenance, content authenticity, disclosure, and standards adoption.</li>
                <li>Contribute to SMPTE/ETC AI/ML Task Force discussions connecting media workflows, AI generation, governance, and provenance infrastructure.</li>
                <li>Translate standards concepts into practical demos, talks, documentation, and engineering patterns for builders and decision-makers.</li>
              </ul>
            </div>
          </article>

          <article className="job" aria-label="Founder and Principal Engineer at Kilroy AI LLC">
            <p className="job-title">Founder &amp; Principal Engineer</p>
            <p className="job-company">Kilroy AI LLC</p>
            <p className="job-dates">2026 - Present</p>
            <div className="job-desc">
              <p className="job-context">
                Independent agentic AI engineering practice. Client and partner engagements plus publicly released products.
              </p>
            </div>

            <div className="job-sub">
              <p className="job-sub-title">Free2PA</p>
              <p className="job-sub-meta">Product · free2pa.org · 2026 - Present</p>
              <div className="job-desc">
                <ul>
                  <li>Built a public provenance toolkit that verifies signed agent control files before they enter model context.</li>
                  <li>Designed trust decisions, signed artifacts, rejection paths, and governed agent behavior for auditable AI agent execution.</li>
                  <li>Modeled how C2PA-style provenance and policy controls can apply beyond media assets to agent instructions, memory, workflows, and tool access.</li>
                </ul>
              </div>
            </div>

            <div className="job-sub">
              <p className="job-sub-title">Hidalga - Agent Infrastructure &amp; Audit Trails</p>
              <p className="job-sub-meta">Client engagement · Mar 2026 - Present</p>
              <div className="job-desc">
                <ul>
                  <li>Built agent infrastructure and tamper-evident audit trails for an AI-driven patient prior authorization platform in oncology specialty care.</li>
                  <li>Implemented trace review, audit validation, workflow visibility, capability conformance checks, and PHI-safe reviewer paths.</li>
                  <li>Supported grant-funded scope with model-validation evidence, coverage audits, FHIR-backed pipelines, and clinical NLP extraction.</li>
                </ul>
              </div>
            </div>

            <div className="job-sub">
              <p className="job-sub-title">RadioHead</p>
              <p className="job-sub-meta">Broadcast transcription agent · NPR affiliate KUAF · 2026 - Present</p>
              <div className="job-desc">
                <ul>
                  <li>Built an autonomous broadcast transcription agent for an NPR member station, started on OpenClaw and migrated onto AWS for production reliability.</li>
                  <li>Built with a student collaborator; won a student competition and featured on <em>Ozarks at Large</em>.</li>
                </ul>
              </div>
            </div>
          </article>

          <article className="job" aria-label="Founder and Engineer at NYX NoCode">
            <p className="job-title">Founder &amp; Engineer</p>
            <p className="job-company">NYX NoCode</p>
            <p className="job-dates">2024 - Present</p>
            <div className="job-desc">
              <ul>
                <li>Built an AI-driven no-code platform using ReactJS, Azure OpenAI, model routing, RAG memory, and Deepgram voice input for educators, students, and public school customers.</li>
                <li>Developed classroom-ready public school workflows and rapid-prototyping tools that help non-specialists build AI applications while preserving traceability and human control.</li>
                <li>Created public prototypes including Free2PA, Idea Beast, Music Seer, and Phyllis to demonstrate practical AI application delivery.</li>
              </ul>
            </div>
          </article>

          <article className="job" aria-label="Author at O'Reilly Media">
            <p className="job-title">Author</p>
            <p className="job-company">O'Reilly Media</p>
            <p className="job-dates">2019 - 2024</p>
            <div className="job-desc">
              <ul>
                <li>Published four books: <em>Natural Language and Search</em> (2024), <em>Blockchain Tethered AI</em> (2023), <em>AI and the Law</em> (2021), <em>Blockchain as a Service</em> (2019).</li>
                <li>In <em>Blockchain Tethered AI</em>, wrote practical guidance for connecting AI systems to provenance, auditability, blockchain-backed trust, and evidence trails.</li>
                <li>Wrote the O'Reilly Radar article "AI's Opaque Box Is Actually a Supply Chain," framing AI systems as traceable supply chains rather than unknowable black boxes.</li>
                <li>Technical reviewer for <em>Mastering Blockchain</em> and <em>Mastering Corda</em>.</li>
              </ul>
            </div>
          </article>

          <article className="job" aria-label="CEO at Kilroy Blockchain">
            <p className="job-title">CEO</p>
            <p className="job-company">Kilroy Blockchain</p>
            <p className="job-dates">2016 - 2025</p>
            <div className="job-desc">
              <ul>
                <li>Led development of <strong>RILEY</strong>, winner of the IBM Watson Build Challenge North America in 2017, an AI accessibility system for people who are blind or visually impaired.</li>
                <li>Started research into trackable, traceable AI during the RILEY build because accessibility decisions required knowing whether the AI could be trusted.</li>
                <li>Directed engineering for workflow, case management, and blockchain-backed systems where auditability and operational controls were core requirements.</li>
                <li>Led consulting, technical architecture, stakeholder communication, and end-to-end delivery for applied emerging technology projects.</li>
              </ul>
            </div>
          </article>

          <section aria-label="Earlier Roles (Condensed)" style={{ marginTop: '1rem' }}>
            <strong>Earlier Roles (Condensed)</strong>
            <div className="experience-details" style={{ marginTop: '0.5rem' }}>
              <ul>
                <li><span className="experience-role">CTO - Jamersan LLC</span> (2016)</li>
                <li><span className="experience-role">Principal App Developer - CA Technologies</span> (2014-2015)</li>
                <li><span className="experience-role">Training Consultant - Magento Inc.</span> (2010-2014), founding member of Magento U</li>
                <li><span className="experience-role">Director of Online Marketing - Suarez Corp.</span> (2010-2012)</li>
              </ul>
            </div>
          </section>
        </section>

        <section className="section speaking-section" aria-labelledby="proof-heading">
          <h2 id="proof-heading">Proof Points for Trustworthy AI Teams</h2>
          <ul className="speaking-list">
            <li>
              <strong>International Red Cross</strong> - <em>C2PA Content Credentials for AI/ML Provenance</em>
              <p className="speaking-desc">
                Invited presentation on applying C2PA standards to authenticate AI-generated content and support trust
                and verification in humanitarian and high-risk information environments.
              </p>
            </li>
            <li>
              <strong>University of Arkansas AI Club</strong> - <em>C2PA and Content Credentials</em>
              <p className="speaking-desc">
                Talk and hands-on training on C2PA, Content Credentials, and AI agent trust networks for 175+ student,
                faculty, and community members.
              </p>
            </li>
            <li>
              <strong>Actian</strong> - <em>Blockchain Kill Switches for Governed AI Systems</em>
              <p className="speaking-desc">
                Industry talk on blockchain-based controls for shutdown, compliance, and risk mitigation in distributed
                AI and data infrastructures.
              </p>
            </li>
            <li>
              <strong>IBM Watson Build Challenge</strong> - <em>North America Winner, RILEY</em>
              <p className="speaking-desc">
                Led the winning team for an AI accessibility system using Watson services to describe surroundings for
                people who are blind or visually impaired.
              </p>
            </li>
          </ul>
        </section>

        <section className="section certifications" aria-labelledby="certifications-heading">
          <h2 id="certifications-heading">Certifications &amp; Recognition</h2>
          <ul className="cert-list" aria-label="Certifications list">
            <li>IBM Champion - 2020-2025</li>
            <li>IBM Watson Build Challenge Winner - North America (2017)</li>
            <li>AI Fluency for Students - Anthropic (Aug 2025)</li>
            <li>Teaching the AI Fluency Framework - Anthropic (Aug 2025)</li>
            <li>Venture Building Certification - Builders + Backers (Jul 2025)</li>
            <li>IBM Certifications: Watson Chatbot, RPA, Bluemix Essentials, Blockchain Essentials</li>
            <li>FAA Private Pilot License, Single Engine Land</li>
          </ul>
        </section>

        <section className="section education" aria-labelledby="education-heading">
          <h2 id="education-heading">Education</h2>
          <ul className="education-list" aria-label="Education list">
            <li><strong>Hammel College</strong> - Office Automation &amp; Database Management (1981-1982), 4.0 GPA</li>
            <li><strong>University of Arkansas</strong> - Studies in Music (Voice/Piano), 4.0 GPA (2023-Present)</li>
            <li><strong>University of Arkansas, Sam M. Walton College of Business</strong> - Infrastructure &amp; Cloud Computing (Spring 2026), 4.0 GPA; Quantum Computing (Fall 2026)</li>
          </ul>
        </section>
      </main>
    </div>
  );
}
