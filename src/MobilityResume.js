import React from 'react';
import './Resume.css';

export default function MobilityResume() {
  const handlePrintClick = () => window.print();

  return (
    <div className="resume-page mobility-resume">
      <main className="container" role="main" aria-label="Mobility resume of Karen Kilroy">
        <div className="topbar print-hide" role="region" aria-label="Actions">
          <a className="print-link" href="/resume" aria-label="Open general resume">
            General Resume
          </a>
          <button className="print-btn" onClick={handlePrintClick} aria-label="Print this mobility resume">
            Print
          </button>
        </div>

        <header className="header">
          <div>
            <p className="resume-version">Mobility Resume · GM AV / Embodied AI</p>
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
            Mobility-focused AI infrastructure engineer, founder, and technical author with 40+ years in IT spanning software
            development, applied research, and product leadership. Creator of <strong>Street Cred</strong> (formerly
            Carnak), an authoritative work-zone and roadway asset data product selected for the Builders + Backers /
            Capital One Mobility Program. Street Cred turns approved Modification of Traffic workflows into
            machine-readable data that autonomous and connected vehicles can use as a trusted cross-check for temporary
            lane changes, barrels, barriers, signs, detours, and worker safety zones. In 2018, participated in a
            National Science Foundation cohort for Carnak and traveled to seven states interviewing 250 people across
            the self-driving car ecosystem. Strong fit for autonomous driving teams that need senior technical judgment,
            safety-first systems thinking, cross-functional leadership, and reliable translation between field reality,
            data products, and onboard AI behavior.
          </p>
        </section>

        <section className="section skills-section" aria-labelledby="skills-heading">
          <h2 id="skills-heading">Core Mobility Skills</h2>

          <div className="skills-group" aria-label="Mobility and transportation skills">
            <h3 className="skills-group-title">Autonomous Mobility &amp; Safety</h3>
            <ul className="skills">
              <li>Connected &amp; Autonomous Vehicle Data Products</li>
              <li>Maintenance of Traffic / Temporary Traffic Control Workflows</li>
              <li>Roadway Asset Management</li>
              <li>Construction Zone Safety</li>
              <li>Onboard Perception Cross-Check Data</li>
              <li>Public Agency Data Commercialization</li>
              <li>Traffic Engineering Customer Discovery</li>
            </ul>
          </div>

          <div className="skills-group" aria-label="AI and data infrastructure skills">
            <h3 className="skills-group-title">AI &amp; Data Infrastructure</h3>
            <ul className="skills">
              <li>Machine-Readable Infrastructure Feeds</li>
              <li>Authoritative Data APIs</li>
              <li>Production AI Workflow Design</li>
              <li>Large-Scale Workflow Data Modeling</li>
              <li>Tamper-Evident Audit Trails</li>
              <li>Location Verification</li>
              <li>Workflow Provenance</li>
              <li>Usage-Based Data Licensing</li>
            </ul>
          </div>

          <div className="skills-group" aria-label="Cloud and application development skills">
            <h3 className="skills-group-title">Cloud &amp; Application Development</h3>
            <ul className="skills">
              <li>ReactJS, Next.js, Node.js, TypeScript</li>
              <li>Azure AI Foundry, Azure OpenAI, RAG</li>
              <li>PostgreSQL, Prisma, Multi-Tenant APIs</li>
              <li>Azure App Service, Key Vault, Service Bus</li>
              <li>OpenAPI, LLM-Readable Documentation</li>
            </ul>
          </div>

          <div className="skills-group" aria-label="Governance and communication skills">
            <h3 className="skills-group-title">Technical Leadership &amp; Governance</h3>
            <ul className="skills">
              <li>Content Provenance (C2PA, SMPTE)</li>
              <li>Blockchain-Tethered AI Systems</li>
              <li>Applied Research in the Wild</li>
              <li>Cross-Functional Stakeholder Alignment</li>
              <li>Technical Writing &amp; Education</li>
              <li>Stakeholder Interviews</li>
              <li>Grant-Funded Product Research</li>
            </ul>
          </div>
        </section>

        <section className="section experience-section page-break-before" aria-labelledby="experience-heading">
          <h2 id="experience-heading">Mobility Experience</h2>

          <article className="job" aria-label="Creator of Street Cred">
            <p className="job-title">Creator</p>
            <p className="job-company">Street Cred (formerly Carnak)</p>
            <p className="job-dates">2026 – Present</p>
            <div className="job-desc">
              <ul>
                <li>Selected for the Builders + Backers / Capital One Mobility Program for Street Cred, a system that converts approved road repair and work-zone workflows into trusted CV/AV data for safer autonomous driving in construction zones.</li>
                <li>Designed a workflow where engineers file a Modification of Traffic, approvals are routed digitally, construction crews place roadway assets, and verified placement data is transmitted to nearby autonomous vehicles.</li>
                <li>Positioned MOT data as an authoritative cross-check for lidar, camera, foundation-map, and crowd-sourced signals so vehicles know where barrels, dividers, closures, signs, and temporary lane geometry are expected to be.</li>
                <li>Framed the product around GM-relevant safety goals: fewer work-zone collisions, more reliable onboard navigation in edge conditions, and better collaboration between autonomous vehicle operators and public roadway authorities.</li>
                <li>Defined a revenue model where agencies or approved roadway data owners can license infrastructure data to commercial AV operators, mapping providers, fleets, insurers, and traffic management centers.</li>
              </ul>
            </div>
          </article>

          <article className="job" aria-label="CEO at Kilroy Blockchain">
            <p className="job-title">CEO &amp; Principal Investigator</p>
            <p className="job-company">Kilroy Blockchain / Carnak Mobility Research</p>
            <p className="job-dates">2018 NSF cohort; revived 2026 as Street Cred</p>
            <div className="job-desc">
              <ul>
                <li>Participated in a National Science Foundation cohort for Carnak and traveled to seven states interviewing 250 people across the self-driving car ecosystem, including traffic engineers, mobility specialists, road crews, police officers, automakers, and AV experts.</li>
                <li>Built an early Carnak prototype for collecting roadway asset data inside agency engineering workflows and publishing official cross-check data to roaming autonomous vehicles.</li>
                <li>Focused the product around construction zones after discovery showed worker safety, temporary roadway changes, and maintained agency workflows were the highest-value entry point.</li>
                <li>Explored blockchain-backed ownership, auditability, and value sharing among local, state, and federal roadway authorities managing overlapping infrastructure assets.</li>
              </ul>
            </div>
          </article>

          <article className="job" aria-label="Founder and Engineer at NYX NoCode">
            <p className="job-title">Founder &amp; Engineer</p>
            <p className="job-company">NYX NoCode</p>
            <p className="job-dates">2024 – Present</p>
            <div className="job-desc">
              <ul>
                <li>Built an AI-driven no-code platform using ReactJS, Azure OpenAI, model routing, RAG memory, and Deepgram voice input for educators, students, and public school customers.</li>
                <li>Developed rapid prototyping workflows that support public school, mobility, governance, and commerce products from natural-language requirements through deployable web applications.</li>
                <li>Led technical direction, architecture, documentation, and mentoring for builders turning AI concepts into working software under tight timelines.</li>
                <li>Created public prototypes including Idea Beast, Music Seer, Free2PA, and Phyllis to demonstrate fast AI application delivery with usable front-end experiences.</li>
              </ul>
            </div>
          </article>

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
              <p className="job-sub-title">Free2PA</p>
              <p className="job-sub-meta">Product · free2pa.org · 2026 – Present</p>
              <div className="job-desc">
                <ul>
                  <li>Built a public provenance toolkit that verifies signed agent control files before model context load.</li>
                  <li>Designed trust decisions, signed artifacts, rejection paths, and governed agent behavior that translate directly to high-risk mobility, autonomous driving, and infrastructure data workflows.</li>
                </ul>
              </div>
            </div>

            <div className="job-sub">
              <p className="job-sub-title">RadioHead</p>
              <p className="job-sub-meta">Broadcast transcription agent · NPR affiliate KUAF · 2026 – Present</p>
              <div className="job-desc">
                <ul>
                  <li>Built an autonomous broadcast transcription agent for an NPR member station, started on OpenClaw and migrated onto AWS for production reliability.</li>
                </ul>
              </div>
            </div>
          </article>

          <article className="job" aria-label="Author at O'Reilly Media">
            <p className="job-title">Author</p>
            <p className="job-company">O'Reilly Media</p>
            <p className="job-dates">2019 – 2024</p>
            <div className="job-desc">
              <ul>
                <li>Published four books: <em>Natural Language and Search</em> (2024), <em>Blockchain Tethered AI</em> (2023), <em>AI and the Law</em> (2021), <em>Blockchain as a Service</em> (2019).</li>
                <li>Authored practical guidance on AI supply chains, content provenance, blockchain-backed trust, and emerging technology governance.</li>
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

        <section className="section speaking-section" aria-labelledby="mobility-proof-heading">
          <h2 id="mobility-proof-heading">Mobility Proof Points</h2>
          <ul className="speaking-list">
            <li>
              <strong>Builders + Backers / Capital One Mobility Program</strong> — <em>Street Cred selected project</em>
              <p className="speaking-desc">
                Current cohort project focused on preventing work-zone collisions by selling certified MOT workflow data
                directly to connected and autonomous vehicle data consumers.
              </p>
            </li>
            <li>
              <strong>Connected Vehicle Trade Association</strong> — <em>Member</em>
              <p className="speaking-desc">
                Industry participation focused on connected vehicle ecosystems, infrastructure data, and safer deployment
                models for intelligent transportation systems.
              </p>
            </li>
            <li>
              <strong>National Science Foundation I-Corps Go</strong> — <em>Carnak customer discovery and prototype</em>
              <p className="speaking-desc">
                2018 cohort work included seven-state travel and 250 interviews across public agencies,
                construction-zone stakeholders, transportation specialists, automakers, and autonomous vehicle experts.
              </p>
            </li>
            <li>
              <strong>IBM Watson Build Challenge</strong> — <em>North America winner, RILEY</em>
              <p className="speaking-desc">
                Led the winning team for an AI accessibility system that used Watson services to describe surroundings
                for people who are blind or visually impaired.
              </p>
            </li>
          </ul>
        </section>

        <section className="section certifications" aria-labelledby="certifications-heading">
          <h2 id="certifications-heading">Certifications &amp; Recognition</h2>
          <ul className="cert-list" aria-label="Certifications list">
            <li>Venture Building Certification – Builders + Backers (Jul 2025)</li>
            <li>Member – Connected Vehicle Trade Association</li>
            <li>IBM Watson Build Challenge Winner – North America (2017)</li>
            <li>IBM Champion – 2020–2025</li>
            <li>IBM Certifications: Watson Chatbot, RPA, Bluemix Essentials, Blockchain Essentials</li>
            <li>AI Fluency for Students – Anthropic (Aug 2025)</li>
            <li>Teaching the AI Fluency Framework – Anthropic (Aug 2025)</li>
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
