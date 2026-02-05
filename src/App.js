import React from 'react';
import './App.css';

export default function App() {
  const handlePrintClick = () => window.print();

  // inside App.js
  const handleDownloadPdfClick = () => {
    const link = document.createElement('a');
    link.href = '/Karen_Kilroy-Resume-August_2025.pdf';
    link.download = 'Karen_Kilroy-Resume-August_2025.pdf';
    link.click();
  };


  return (
      <main className="container" role="main" aria-label="Resume of Karen Kilroy">
        {/* Action bar  (hidden in print) */}
        <div className="topbar print-hide" role="region" aria-label="Actions">
          <button className="print-btn" onClick={handlePrintClick} aria-label="Print this resume">
            🖨️ Print
          </button>
          <button className="print-btn outline" onClick={handleDownloadPdfClick} aria-label="Download PDF (no print dialog)">
            ⬇️ Download PDF
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
            AI infrastructure engineer, educator, and author with 20+ years of full-stack development and technical
            leadership experience. Six-time IBM Champion and winner of the IBM Watson Build Challenge (2017). Founder
            of NYX NoCode, an AI-driven web application builder enabling natural-language app creation for classrooms
            and rapid prototyping. O'Reilly author of four books on AI and emerging technologies. Proven track record
            in product innovation, technical communication, and industry standards leadership as Co-Chair of the C2PA
            AI/ML Task Force and contributor to the SMPTE/ETC AI/ML Task Force.
          </p>
        </section>

        <section className="section skills-section" aria-labelledby="skills-heading">
          <h2 id="skills-heading">Core Skills</h2>

          <div className="skills-group" aria-label="AI and ML skills">
            <h3 className="skills-group-title">AI &amp; ML</h3>
            <ul className="skills">
              <li>Generative AI, Retrieval-Augmented Generation (RAG)</li>
              <li>Azure OpenAI (ChatGPT-5, Model Router), Claude Code</li>
              <li>Deepgram Speech AI</li>
              <li>Model Context Protocol (MCP)</li>
            </ul>
          </div>

          <div className="skills-group" aria-label="Cloud and Application Development skills">
            <h3 className="skills-group-title">Cloud &amp; Application Development</h3>
            <ul className="skills">
              <li>ReactJS, Node.js</li>
              <li>Azure API Integration</li>
              <li>No-Code / Low-Code Platforms</li>
            </ul>
          </div>

          <div className="skills-group" aria-label="Standards, Governance and Communication skills">
            <h3 className="skills-group-title">Standards, Governance &amp; Communication</h3>
            <ul className="skills">
              <li>Content Provenance (C2PA, SMPTE)</li>
              <li>AI Supply Chain &amp; Governance</li>
              <li>Technical Writing &amp; Education</li>
            </ul>
          </div>
        </section>

        {/* Force this section to page 2 in print */}
        <section className="section experience-section page-break-before" aria-labelledby="experience-heading">
          <h2 id="experience-heading">Professional Experience</h2>

          <article className="job" aria-label="Founder and Engineer at NYX NoCode">
            <p className="job-title">Founder &amp; Engineer</p>
            <p className="job-company">NYX NoCode</p>
            <p className="job-dates">2024 – Present</p>
            <div className="job-desc">
              <ul>
                <li>Built an AI-driven no-code platform using ReactJS and Azure OpenAI, incorporating model routing and RAG-based memory.</li>
                <li>Integrated Deepgram transcription and real-time voice input into classroom AI workflows.</li>
                <li>Developed <em>Peopleoids</em>, a portable RAG assistant with instant memory suitable for finetuning and reuse.</li>
                <li>Delivered hackathons and educational programs demonstrating rapid deployment of AI applications.</li>
              </ul>
            </div>
          </article>

          <article className="job" aria-label="Author at O’Reilly Media">
            <p className="job-title">Author</p>
            <p className="job-company">O’Reilly Media</p>
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
            <p className="job-dates">2016 – Present</p>
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
                <li><span className="experience-role">Director of Online Marketing – Suarez Corp.</span> (2010–2012)</li>
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
          </ul>
        </section>

        <section className="section certifications" aria-labelledby="certifications-heading">
          <h2 id="certifications-heading">Certifications</h2>
          <ul className="cert-list" aria-label="Certifications list">
            <li>AI Fluency for Students – Anthropic (Aug 2025)</li>
            <li>Teaching the AI Fluency Framework – Anthropic (Aug 2025)</li>
            <li>Venture Building Certification – Builders + Backers (Jul 2025)</li>
            <li>IBM Champion – 2020–2025</li>
            <li>IBM Certifications: Watson Chatbot, RPA, Bluemix Essentials, Blockchain Essentials</li>
            <li>Coursera (Johns Hopkins): COVID-19 Contact Tracing &amp; Impact (2020)</li>
            <li>Magento Front End Developer Certification (2013)</li>
            <li>FAA Private Pilot License (1979)</li>
          </ul>
        </section>

        <section className="section education" aria-labelledby="education-heading">
          <h2 id="education-heading">Education</h2>
          <ul className="education-list" aria-label="Education list">
            <li><strong>Hammel College</strong> – Office Automation &amp; Database Management (1981–1982), 4.0 GPA</li>
            <li><strong>University of Arkansas</strong> – Studies in Music (Voice/Piano), 4.0 GPA (2023–Present)</li>
            <li><strong>University of Arkansas, Sam M. Walton College of Business</strong> – Infrastructure &amp; Cloud Computing (2026)</li>
          </ul>
        </section>
      </main>
  );
}
