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
            AI engineer, educator, and author with 20+ years in full-stack development and technical leadership.
            Six-time IBM Champion and winner of the IBM Watson Build Challenge (2017). Creator of NYX NoCode, an
            AI-driven web app builder empowering students and educators to create apps with natural language. O’Reilly
            author of four books on AI and technology. Proven track record in product innovation, technical writing, and
            shaping industry standards as Co-Chair of the C2PA AI/ML Task Force and contributor to the SMPTE/ETC AI/ML
            Task Force.
          </p>
        </section>

        <section className="section skills-section" aria-labelledby="skills-heading">
          <h2 id="skills-heading">Core Skills</h2>
          <ul className="skills" aria-label="Core skills list">
            <li>AI/ML</li>
            <li>Generative AI</li>
            <li>Azure OpenAI (ChatGPT-5, Model Router)</li>
            <li>Claude Code</li>
            <li>Deepgram speech AI</li>
            <li>Retrieval-Augmented Generation (RAG)</li>
            <li>ReactJS</li>
            <li>Node.js</li>
            <li>Azure</li>
            <li>API Integration</li>
            <li>No-Code Platforms</li>
            <li>Standards &amp; Provenance (C2PA, SMPTE)</li>
            <li>Model Context Protocol (MCP)</li>
            <li>Technical Writing &amp; Education</li>
          </ul>
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
                <li>Built an AI-driven no-code platform using ReactJS + Azure OpenAI (ChatGPT-5, Model Router).</li>
                <li>Integrated Deepgram transcription and real-time voice input into classroom AI workflows.</li>
                <li>Developed Peopleoids, a RAG assistant with instant memory, portable to finetuning.</li>
                <li>Delivered hackathons and educational programs showcasing rapid deployment of AI in classrooms.</li>
              </ul>
            </div>
          </article>

          <article className="job" aria-label="Author at O’Reilly Media">
            <p className="job-title">Author</p>
            <p className="job-company">O’Reilly Media</p>
            <p className="job-dates">2019 – 2024</p>
            <div className="job-desc">
              <ul>
                <li>Published 4 books: Natural Language and Search (2024), Blockchain Tethered AI (2023), AI and the Law (2021), Blockchain as a Service (2019).</li>
                <li>Technical reviewer for Mastering Blockchain and Mastering Corda.</li>
                <li>Wrote “AI’s Opaque Box is Actually a Supply Chain.”</li>
              </ul>
            </div>
          </article>

          <article className="job" aria-label="CEO at Kilroy Blockchain">
            <p className="job-title">CEO</p>
            <p className="job-company">Kilroy Blockchain</p>
            <p className="job-dates">2016 – Present</p>
            <div className="job-desc">
              <ul>
                <li>Led AI and workflow systems including RILEY (IBM Watson Build North America winner, 2017).</li>
                <li>Directed engineering on FLO (Forms Workflow) and CASEY (Case Management).</li>
                <li>Managed business operations and technology delivery.</li>
              </ul>
            </div>
          </article>

          <section aria-label="Earlier Roles (Condensed)" style={{ marginTop: '1rem' }}>
            <strong>Earlier Roles (Condensed)</strong>
            <div className="experience-details" style={{ marginTop: '0.5rem' }}>
              <ul>
                <li><span className="experience-role">CTO – Jamersan LLC</span> (2016): Led dev/support at a Magento-focused agency.</li>
                <li><span className="experience-role">Principal App Developer – CA Technologies</span> (2014–2015): Led digital commerce team.</li>
                <li><span className="experience-role">Training Consultant – Magento Inc.</span> (2010–2014): Founding member of Magento U.</li>
                <li><span className="experience-role">Director of Online Marketing – Suarez Corp.</span> (2010–2012): Built shared shopping/social features.</li>
              </ul>
            </div>
          </section>
        </section>

        <section className="section certifications" aria-labelledby="certifications-heading">
          <h2 id="certifications-heading">Certifications</h2>
          <ul className="cert-list" aria-label="Certifications list">
            <li>AI Fluency for Students – Anthropic (Aug 2025)</li>
            <li>Teaching the AI Fluency Framework – Anthropic (Aug 2025)</li>
            <li>Venture Building Certification – Builders + Backers (Jul 2025)</li>
            <li>IBM Champion – 2025, 2024, 2023, 2022, 2021, 2020</li>
            <li>IBM: Watson Chatbot, Robotics Process Automation, Bluemix Essentials, Blockchain Essentials (2017–2018)</li>
            <li>Coursera (Johns Hopkins): COVID-19 Contact Tracing &amp; Impact (2020)</li>
            <li>Magento Front End Developer Certification (2013)</li>
            <li>FAA Private Pilot License (1979)</li>
          </ul>
        </section>

        <section className="section education" aria-labelledby="education-heading">
          <h2 id="education-heading">Education</h2>
          <ul className="education-list" aria-label="Education list">
            <li>Hammel College – Office Automation, Database Management (1981–1982, 4.0 GPA)</li>
            <li>University of Arkansas – Studies in Music (Voice/Piano) &amp; Poultry Science (2023, 4.0 GPA)</li>
          </ul>
        </section>
      </main>
  );
}
