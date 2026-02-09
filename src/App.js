import React, { useState } from 'react';
import { Book, Award, Mail, Linkedin, Terminal, Mic, ShieldCheck, Link2, Menu, X } from 'lucide-react';

const Portfolio = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const books = [
    { title: "Natural Language and Search", year: "2024", img: "/img/nls.jpg", url: "https://www.oreilly.com/library/view/natural-language-and/9781098156268/" },
    { title: "Blockchain Tethered AI", year: "2023", img: "/img/bta.jpg", url: "https://www.oreilly.com/library/view/blockchain-tethered-ai/9781098130541/" },
    { title: "AI and the Law", year: "2021", img: "/img/ai_and_the_law.jpeg", url: "https://www.oreilly.com/library/view/ai-and-the/9781492091837/" },
    { title: "Blockchain as a Service", year: "2019", img: "/img/baas.png", url: "https://www.oreilly.com/library/view/blockchain-as-a/9781492073475/" }
  ];

  const focusList = [
    "Generative AI + RAG platforms routed through Azure OpenAI and Claude Code.",
    "Voice-forward classroom workflows that pair Deepgram with NYX NoCode.",
    "Translating provenance standards (C2PA, SMPTE/ETC) into real, shippable products."
  ];

  const speakingHighlights = [
    {
      org: "International Red Cross",
      topic: "C2PA Content Credentials for AI/ML Provenance",
      description:
        "Invited talk on authenticating AI-generated content so humanitarian teams can verify every asset in the field."
    },
    {
      org: "Actian",
      topic: "Blockchain Kill Switches for Governed AI Systems",
      description:
        "Shared how blockchain-backed controls keep distributed AI infra compliant, explainable, and ready for shutdown when needed."
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
            <a href="#signal" className="hover:text-blue-400 transition" onClick={() => setMobileMenuOpen(false)}>Signal</a>
            <a href="/links" className="hover:text-blue-400 transition flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}><Link2 size={18} /> Links</a>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <header className="px-4 md:px-6 py-12 md:py-24 max-w-6xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-sm mb-6">
            <span className="text-blue-400 text-xs sm:text-sm">Developer · Author · Speaker</span>

          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
            Engineering the <span className="text-blue-500">Future of AI</span> Transparency.
          </h1>
          <p className="text-lg text-slate-300 mb-6 max-w-2xl">
            I'm a developer and author focused on trustworthy AI deployment.
            I build Azure OpenAI platforms, voice-forward workflows, and governance patterns that keep teams shipping quickly while staying auditable.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 mb-8 text-sm text-slate-400">
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-1">Current build</p>
              <p className="text-slate-100 font-semibold">NYX NoCode</p>
              <p>NYX NoCode is an educator-led platform that transforms classrooms into creative studios, giving students hands-on experience with generative AI and modern computing.</p>
            </div>
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-1">Content authenticity</p>
              <p className="text-slate-100 font-semibold">C2PA AI/ML Task Force Co-chair</p>
              <p>
                From winning IBM Watson Build in 2017 to co-chairing the C2PA Coalition&apos;s AI/ML Task Force, I&apos;ve stayed focused on
                trustworthy provenance for every asset.
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
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden crt-container">
            <img
              src="/img/headshot2.png"
              alt="Karen Kilroy"
              className="w-full h-80 object-cover crt-image"
              style={{ objectPosition: 'center 25%' }}
            />
            <div className="p-5 text-sm text-slate-400 flex items-center justify-between flex-wrap gap-3">
              <div>
                <p className="text-slate-100 font-semibold">Karen Kilroy</p>
              </div>
              <div className="text-xs uppercase tracking-[0.3em] text-slate-500">Inventor · Artist · Musician</div>
            </div>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-2xl">
            <Terminal className="text-blue-500 mb-4" />
            <div className="space-y-3 font-mono text-sm">
              <p className="text-green-400">{`> Karen.currentLocation = "Fayetteville, AR";`}</p>
              <p className="text-blue-300">{`> Karen.roles = ["Founder", "Educator", "Author"];`}</p>
              <p className="text-yellow-400">{`> Karen.winner("IBM Watson Build 2017", "North America");`}</p>
              <p className="text-slate-500">{`// Led the winning team`}</p>
              <p className="text-cyan-400">{`> Karen.buildStack("React", "Azure OpenAI", "Deepgram");`}</p>
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
              Developer and author focused on trustworthy AI deployment.
            </h2>
            <p className="text-slate-300 leading-relaxed mb-6">
              My path runs from leading the IBM Watson Build&ndash;winning RILEY team at Kilroy Blockchain to NYX NoCode&mdash;where
              educators and students can create and deploy modern React apps with Azure OpenAI. I also wrote <em>Blockchain Tethered AI</em>,
              exploring how systems can bind data, identity, and accountability in ways that hold up outside the lab. Alongside the builds,
              I co-chair the C2PA AI/ML Task Force, helping turn content provenance into something teams can actually implement in production.
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
                Model Context Protocol, provenance standards, and "explain it like we're in a boardroom" technical storytelling.
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
              <h3 className="text-lg md:text-xl font-bold">Founder &amp; AI Engineer — NYX NoCode</h3>
              <p className="text-blue-400 text-sm mb-4">2024 – Present</p>
              <p className="text-slate-400 leading-relaxed">
                Built an AI-driven no-code platform using ReactJS + Azure OpenAI with Deepgram voice input so educators can spin up classroom-ready
                RAG apps in one conversation. Developed Peopleoids, a portable assistant with instant memory suitable for finetuning and reuse.
              </p>
            </div>

            <div className="relative pl-8 border-l-2 border-slate-800">
              <div className="absolute -left-[9px] top-0 w-4 h-4 bg-slate-700 rounded-full"></div>
              <h3 className="text-xl font-bold">CEO — Kilroy Blockchain</h3>
              <p className="text-blue-400 text-sm mb-4">2016 – Present</p>
              <p className="text-slate-400 leading-relaxed">
                Lead architect for RILEY (IBM Watson Build Challenge winner), FLO (Forms Workflow), and CASEY (Case Management).
                I direct engineering, business ops, and the ethics checkpoints that keep enterprise AI accountable.
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
            {speakingHighlights.map((item, idx) => (
              <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 md:p-6">
                <div className="flex items-center gap-3 mb-3 md:mb-4">
                  {idx === 0 ? <Mic size={18} className="text-blue-500" /> : <ShieldCheck size={18} className="text-blue-500" />}
                  <p className="text-xs md:text-sm uppercase tracking-[0.2em] md:tracking-[0.3em] text-slate-500">{item.org}</p>
                </div>
                <p className="text-lg md:text-xl font-semibold mb-2">{item.topic}</p>
                <p className="text-slate-400 text-sm">{item.description}</p>
              </div>
            ))}
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

