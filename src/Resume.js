import React from 'react';
import './Resume.css';

export default function Resume() {
  const handlePrintClick = () => window.print();

  const handleDownloadPdfClick = () => {
    const link = document.createElement('a');
    link.href = '/Karen_Kilroy-Resume-August_2026.pdf';
    link.download = 'Karen_Kilroy-Resume-August_2026.pdf';
    link.click();
  };

  return (
    <div className="resume-page">
      <main className="container" role="main" aria-label="Resume of Karen Kilroy">
        {/* Action bar  (hidden in print) */}
        <div className="topbar print-hide" role="region" aria-label="Actions">
          <button className="print-btn" onClick={handlePrintClick} aria-label="Print this resume">
            Print
          </button>
          <button className="print-btn outline" onClick={handleDownloadPdfClick} aria-label="Download PDF (no print dialog)">
            Download PDF
          </button>
        </div>

        <header className="header">
          <h1 className="site-title">Karen Kilroy</h1>
          <img
              src="https://drive.nyx.baby/nyxnocode/karen%40knowbots.org%2F1751995949315.jpeg"
              alt="Karen Kilroy"
              className="header-image"
          />
        </header>

        {/* WEB CONTACT (screen only) — no phone */}
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

        {/* PRINT CONTACT (print only) — shows email + phone */}
        <p className="contact print-only" aria-label="Contact (print)">
          Email: <a href="mailto:karen@nyx.baby">karen@nyx.baby</a> | Phone: 330-289-1351 | LinkedIn: linkedin.com/in/karenkilroy
        </p>

        <section className="section summary-section" aria-labelledby="summary-heading">
          <h2 id="summary-heading">Summary</h2>
          <p className="summary">
            AI infrastructure engineer, educator, and author with 40+ years in IT and deep full-stack development and
            technical leadership experience. Six-time IBM Champion and winner of the IBM Watson Build Challenge (2017). Founder
            of NYX NoCode, an AI-driven web application builder serving public school customers with natural-language
            app creation for classrooms and rapid prototyping. Creator of Free2PA, a public provenance toolkit for signed agent control files.
            Creator of Phyllis, a fulfillment API for bot-built commerce storefronts.
            Current Hidalga work focuses on agent infrastructure and audit trails for AI-driven patient prior
            authorization workflows in oncology. O'Reilly author of four books on AI and emerging technologies. Proven
            track record in product innovation, technical communication, and industry standards leadership as Co-Chair
            of the C2PA AI/ML Task Force, regular contributor to the C2PA Agentic Task Force working out how to apply C2PA to agentic systems, and contributor to the Society of Motion Picture and Television Engineers (SMPTE) /
            Entertainment Technology Center (ETC) AI/ML Task Force.
          </p>
        </section>

        <section className="section skills-section" aria-labelledby="skills-heading">
          <h2 id="skills-heading">Core Skills</h2>

          <div className="skills-group" aria-label="AI and ML skills">
            <h3 className="skills-group-title">AI &amp; ML</h3>
            <ul className="skills">
              <li>Generative AI, Retrieval-Augmented Generation (RAG)</li>
              <li>Azure AI Foundry, Azure OpenAI, ChatGPT 5.6, Codex 5.6</li>
              <li>Claude Fable, Claude Code</li>
              <li>Bot-Built Commerce APIs</li>
              <li>Deepgram Speech AI</li>
              <li>Model Context Protocol (MCP)</li>
              <li>Signed Agent Control-File Verification</li>
              <li>Agent Capability Routing &amp; Drift Audits</li>
            </ul>
          </div>

          <div className="skills-group" aria-label="Healthcare AI and QA skills">
            <h3 className="skills-group-title">Healthcare AI &amp; QA</h3>
            <ul className="skills">
              <li>Patient Prior Authorization QA</li>
              <li>FHIR R4, SNOMED CT, ICD-10</li>
              <li>NCCN / ASCO Guideline Provenance</li>
              <li>Clinical NLP Extraction</li>
              <li>PHI-Safe Review Workflows</li>
            </ul>
          </div>

          <div className="skills-group" aria-label="Cloud and Application Development skills">
            <h3 className="skills-group-title">Cloud &amp; Application Development</h3>
            <ul className="skills">
              <li>ReactJS, Next.js, Node.js, TypeScript</li>
              <li>Prisma, PostgreSQL, Data Access Layers</li>
              <li>Multi-Tenant APIs, Stripe, Fulfillment Integrations</li>
              <li>Azure App Service, Key Vault, Service Bus</li>
              <li>App Insights, OpenTelemetry, KEDA</li>
              <li>No-Code / Low-Code Platforms</li>
            </ul>
          </div>

          <div className="skills-group" aria-label="Standards, Governance and Communication skills">
            <h3 className="skills-group-title">Standards, Governance &amp; Communication</h3>
            <ul className="skills">
              <li>Content Provenance (C2PA, SMPTE, ETC)</li>
              <li>Free2PA Agent Provenance</li>
              <li>Tamper-Evident Audit Hash Chains</li>
              <li>RBAC / RLS / Managed Identity</li>
              <li>AI Supply Chain &amp; Governance</li>
              <li>Technical Writing &amp; Education</li>
            </ul>
          </div>
        </section>

        {/* Force this section to page 2 in print */}
        <section className="section experience-section page-break-before" aria-labelledby="experience-heading">
          <h2 id="experience-heading">Professional Experience</h2>

          <article className="job" aria-label="Founder and Principal Engineer at Kilroy AI LLC">
            <p className="job-title">Founder &amp; Principal Engineer</p>
            <p className="job-company">Kilroy AI LLC</p>
            <p className="job-dates">2026 – Present</p>
            <div className="job-desc">
              <p className="job-context">
                Independent agentic AI engineering practice. Client and partner engagements plus publicly released products.
              </p>
            </div>

            <div className="job-sub">
              <p className="job-sub-title">Hidalga – Agent Infrastructure &amp; Audit Trails</p>
              <p className="job-sub-meta">Client engagement · Mar 2026 – Present</p>
              <div className="job-desc">
                <ul>
                  <li>Built agent infrastructure and tamper-evident audit trails for an AI-driven patient prior authorization platform in oncology specialty care.</li>
                  <li>Architected a capability abstraction layer separating agents from every backend they depend on, so backends change without touching agent code.</li>
                  <li>Implemented agent trace review, audit validation, workflow visibility, capability conformance checks, and PHI-safe review paths.</li>
                  <li>Supported grant-funded technical scope with model-validation evidence, coverage audits, FHIR-backed pipelines, and clinical NLP extraction.</li>
                </ul>
              </div>
            </div>

            <div className="job-sub">
              <p className="job-sub-title">RadioHead</p>
              <p className="job-sub-meta">Broadcast transcription agent · NPR affiliate KUAF · 2026 – Present</p>
              <div className="job-desc">
                <ul>
                  <li>Built an autonomous broadcast transcription agent that turns live public radio programming into searchable, publishable text.</li>
                  <li>Started the agent on OpenClaw, then re-architected and migrated it onto AWS for production reliability.</li>
                  <li>Built with a student collaborator; won a student competition and featured on <em>Ozarks at Large</em>.</li>
                </ul>
              </div>
            </div>

            <div className="job-sub">
              <p className="job-sub-title">Free2PA</p>
              <p className="job-sub-meta">Product · free2pa.org · 2026 – Present</p>
              <div className="job-desc">
                <ul>
                  <li>Built a public provenance toolkit that verifies signed agent control files before model context load.</li>
                  <li>Designed the workflow to demonstrate trust decisions, signed artifacts, rejection paths, and governed AI agent behavior.</li>
                </ul>
              </div>
            </div>

            <div className="job-sub">
              <p className="job-sub-title">Phyllis</p>
              <p className="job-sub-meta">Product · phyllis.bot · 2026 – Present</p>
              <div className="job-desc">
                <ul>
                  <li>Built a multi-tenant fulfillment API for bot-built commerce storefronts.</li>
                  <li>Designed product validation, Stripe checkout, fulfillment-provider integration, human approval workflows, order tracking, OpenAPI, and LLM-readable docs.</li>
                </ul>
              </div>
            </div>
          </article>

          <article className="job" aria-label="Founder and Engineer at NYX NoCode">
            <p className="job-title">Founder &amp; Engineer</p>
            <p className="job-company">NYX NoCode</p>
            <p className="job-dates">2024 – Present</p>
            <div className="job-desc">
              <ul>
                <li>Built an AI-driven no-code platform using ReactJS and Azure OpenAI, incorporating model routing and RAG-based memory for educators, students, and public school customers.</li>
                <li>Integrated Deepgram transcription and real-time voice input into classroom AI workflows for public school use cases.</li>
                <li>Developed <em>Peopleoids</em>, a portable RAG assistant with instant memory suitable for finetuning and reuse.</li>
                <li>Created public NYX prototypes including <em>Idea Beast</em> for AI-assisted ideation and <em>Music Seer</em> for responsive guitar MIDI visualization.</li>
                <li>Delivered hackathons and educational programs demonstrating rapid deployment of AI applications.</li>
              </ul>
            </div>
          </article>

          <article className="job" aria-label="Author at O'Reilly Media">
            <p className="job-title">Author</p>
            <p className="job-company">O'Reilly Media</p>
            <p className="job-dates">2019 – 2024</p>
            <div className="job-desc">
              <ul>
                <li>Published four books: <em>Natural Language and Search</em> (2024), <em>Blockchain Tethered AI</em> (2023), <em>AI and the Law</em> (2021), <em>Blockchain as a Service</em> (2019).</li>
                <li>Technical reviewer for <em>Mastering Blockchain</em> and <em>Mastering Corda</em>.</li>
                <li>Authored "AI's Opaque Box is Actually a Supply Chain."</li>
              </ul>
            </div>
          </article>

          <article className="job" aria-label="CEO at Kilroy Blockchain">
            <p className="job-title">CEO</p>
            <p className="job-company">Kilroy Blockchain</p>
            <p className="job-dates">2016 – 2025</p>
            <div className="job-desc">
              <ul>
                <li>Led development of AI and workflow systems including <strong>RILEY</strong> (IBM Watson Build North America winner, 2017).</li>
                <li>Directed engineering for <strong>FLO</strong> (Forms Workflow) and <strong>CASEY</strong> (Case Management).</li>
                <li>Oversaw business operations and end-to-end technology delivery.</li>
              </ul>
            </div>
          </article>

          <section aria-label="Earlier Roles (Condensed)" style={{ marginTop: '1rem' }}>
            <strong>Earlier Roles (Condensed)</strong>
            <div className="experience-details" style={{ marginTop: '0.5rem' }}>
              <ul>
                <li><span className="experience-role">CTO – Jamersan LLC</span> (2016)</li>
                <li><span className="experience-role">Principal App Developer – CA Technologies</span> (2014–2015)</li>
                <li><span className="experience-role">Training Consultant – Magento Inc.</span> (2010–2014), Founding member of Magento U</li>
                <li><span className="experience-role">Web Programmer, then Executive Director of United Cloud – Suarez Corporation Industries</span> (2009–2012)</li>
                <li><span className="experience-role">President – Data Now</span> (1991–1999), 20-person Lotus Notes and Java consulting firm &middot; <span className="experience-role">LAN Administrator – Bayer</span> (1990–1998) &middot; <span className="experience-role">Technology Coordinator – CIGNA</span> (1983–1991). IT career began in 1980 as a telex operator.</li>
              </ul>
            </div>
          </section>
        </section>

        <section className="section speaking-section" aria-labelledby="speaking-heading">
          <h2 id="speaking-heading">Speaking &amp; Standards Leadership</h2>
          <ul className="speaking-list">
            <li>
              <strong>International Red Cross</strong> — <em>C2PA Content Credentials for AI/ML Provenance</em>
              <p className="speaking-desc">
                Invited presentation on applying C2PA standards to authenticate AI-generated content and support trust
                and verification in humanitarian and high-risk information environments.
              </p>
            </li>
            <li>
              <strong>Actian</strong> — <em>Blockchain Kill Switches for Governed AI Systems</em>
              <p className="speaking-desc">
                Industry talk on blockchain-based control mechanisms for shutdown, compliance, and risk mitigation in
                distributed AI and data infrastructures.
              </p>
            </li>
            <li>
              <strong>University of Arkansas AI Club</strong> — <em>C2PA and Content Credentials</em>
              <p className="speaking-desc">
                Talk on C2PA and Content Credentials for 175+ student, faculty, and community members.
              </p>
            </li>
          </ul>
        </section>

        <section className="section certifications" aria-labelledby="certifications-heading">
          <h2 id="certifications-heading">Certifications</h2>
          <ul className="cert-list" aria-label="Certifications list">
            <li>AI Fluency for Students – Anthropic (Aug 2025)</li>
            <li>Teaching the AI Fluency Framework – Anthropic (Aug 2025)</li>
            <li>Venture Building Certification – Builders + Backers (Jul 2025)</li>
            <li>Winner, University of Arkansas AI Innovation and Integration Challenge – team lead (2026)</li>
            <li>IBM Champion – 2020–2025</li>
            <li>IBM Certifications: Watson Chatbot, RPA, Bluemix Essentials, Blockchain Essentials</li>
            <li>Coursera (Johns Hopkins): COVID-19 Contact Tracing &amp; Impact (2020)</li>
            <li>Magento Front End Developer Certification (2013)</li>
            <li>FAA Private Pilot License, Single Engine Land</li>
          </ul>
        </section>

        <section className="section education" aria-labelledby="education-heading">
          <h2 id="education-heading">Education</h2>
          <ul className="education-list" aria-label="Education list">
            <li><strong>Hammel College</strong> – Office Automation &amp; Database Management (1981–1982), 4.0 GPA</li>
            <li><strong>University of Arkansas</strong> – Studies in Music (Voice/Piano), 4.0 GPA (2023–Present)</li>
            <li><strong>University of Arkansas, Sam M. Walton College of Business</strong> – Infrastructure &amp; Cloud Computing (Spring 2026), 4.0 GPA; Quantum Computing (Fall 2026)</li>
          </ul>
        </section>
      </main>
    </div>
  );
}
