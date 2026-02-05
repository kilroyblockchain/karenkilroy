import React from 'react';
import { Book, Award, Mail, Linkedin, Terminal, Mic, ShieldCheck } from 'lucide-react';

const Portfolio = () => {
  const books = [
    { title: "Natural Language and Search", year: "2024", img: "/img/nls.jpg", url: "https://www.oreilly.com/library/view/natural-language-and/9781098156268/" },
    { title: "Blockchain Tethered AI", year: "2023", img: "/img/bta.jpg", url: "https://www.oreilly.com/library/view/blockchain-tethered-ai/9781098130541/" },
    { title: "AI and the Law", year: "2021", img: "/img/ai_and_the_law.jpeg", url: "https://www.oreilly.com/library/view/ai-and-the/9781492091837/" },
    { title: "Blockchain as a Service", year: "2019", img: "/img/baas.jpeg", url: "https://www.oreilly.com/library/view/blockchain-as-a/9781492073475/" }
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
      <nav className="p-6 flex justify-between items-center border-b border-slate-800 backdrop-blur-md sticky top-0 z-50 bg-slate-950/80">
        <span className="text-xl font-bold tracking-tighter">KAREN KILROY</span>
        <div className="flex gap-6">
          <a href="#about" className="hover:text-blue-400 transition">About</a>
          <a href="#books" className="hover:text-blue-400 transition">Books</a>
          <a href="#projects" className="hover:text-blue-400 transition">Projects</a>
          <a href="#signal" className="hover:text-blue-400 transition">Signal</a>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="px-6 py-24 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm mb-6">
            <span className="font-semibold tracking-tight">Hi, I’m Karen</span>
            <span className="text-slate-400">Founder · Educator · Pilot</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
            Engineering the <span className="text-blue-500">Future of AI</span> Transparency.
          </h1>
          <p className="text-lg text-slate-300 mb-6 max-w-2xl">
            I’m an AI infrastructure engineer, educator, and six-time IBM Champion who still brings a vocalist’s ear to every product review.
            NYX NoCode, Peopleoids, and my Azure OpenAI builds keep classrooms and enterprises shipping faster without sacrificing provenance or accountability.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 mb-8 text-sm text-slate-400">
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-1">Current build</p>
              <p className="text-slate-100 font-semibold">NYX NoCode</p>
              <p>Natural language → React apps, backed by Azure OpenAI + model routing memory.</p>
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
          <div className="flex gap-4">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSejoNvJ1vH4mnTaESayh6HO8LglyAmvYpErYyIGT8of2Wp_eg/viewform?usp=header"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition"
            >
              <Mail size={18} /> Inquire via Google Form
            </a>
            <a
              href="https://linkedin.com/in/karenkilroy"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-slate-700 hover:bg-slate-800 px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition"
            >
              <Linkedin size={18} /> LinkedIn
            </a>
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
            <img
              src="/img/karen_kilroy_by_daphne_youree_2018-full_length-200.2d7c381ebb00a6a4b32a.png"
              alt="Karen Kilroy smiling against a dark background"
              className="w-full h-64 object-cover"
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
              <p className="text-slate-500">{`// Shipping NYX NoCode + Peopleoids for instant memory RAG`}</p>
              <p className="text-yellow-400">{`> Karen.buildStack("React", "Azure OpenAI", "Deepgram");`}</p>
              <p className="text-pink-400">{`> Karen.alsoStudying("Voice", "Piano");`}</p>
            </div>
          </div>
        </div>
      </header>

      {/* About Section */}
      <section id="about" className="py-20 px-6 bg-slate-900/30">
        <div className="max-w-6xl mx-auto grid md:grid-cols-[3fr,2fr] gap-12">
          <div>
            <p className="text-blue-400 uppercase text-xs tracking-[0.4em] mb-4">About Karen</p>
            <h2 className="text-4xl font-bold mb-6 leading-snug">
              AI infrastructure engineer, educator, and author with two decades of building products that balance creativity with compliance.
            </h2>
            <p className="text-slate-300 leading-relaxed mb-6">
              I led RILEY (IBM Watson Build Challenge winner), co-founded Kilroy Blockchain, and now operate NYX NoCode—an AI-driven web
              app builder that lets classrooms and rapid prototypers speak in natural language and deploy in React. I wrote four O'Reilly
              books, chair the C2PA AI/ML Task Force, contribute to the SMPTE/ETC AI/ML Task Force, and still design onboarding that feels human.
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
          <div className="space-y-6">
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500 mb-2">Where I shine</p>
              <p className="text-lg font-semibold mb-2">AI Supply Chain + Governance</p>
              <p className="text-slate-400 text-sm">
                Model Context Protocol, provenance standards, and “explain it like we’re in a boardroom” technical storytelling.
              </p>
            </div>
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500 mb-2">Still learning</p>
              <p className="text-lg font-semibold mb-2">University of Arkansas</p>
              <p className="text-slate-400 text-sm">
                Voice &amp; piano studies plus Infrastructure &amp; Cloud Computing coursework keep me grounded in art and architecture.
              </p>
            </div>
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500 mb-2">Signature</p>
              <p className="text-lg font-semibold mb-2">Six-time IBM Champion</p>
              <p className="text-slate-400 text-sm">
                Bridging technical leadership with hands-on builds, coaching teams to ship ethical AI, and keeping documentation beautiful.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-slate-800 bg-slate-900/50">
        <div className="max-w-6xl mx-auto py-12 px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-blue-500">20+</div>
            <div className="text-sm text-slate-500 uppercase tracking-widest">Years Experience</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-500">4</div>
            <div className="text-sm text-slate-500 uppercase tracking-widest">O'Reilly Books</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-500">6</div>
            <div className="text-sm text-slate-500 uppercase tracking-widest">IBM Champion Awards</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-500">1979</div>
            <div className="text-sm text-slate-500 uppercase tracking-widest">Pilot + Performing Artist Roots</div>
          </div>
        </div>
      </section>

      {/* Books Section */}
      <section id="books" className="py-24 px-6 max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <Book className="text-blue-500" size={32} />
          <h2 className="text-3xl font-bold">O'Reilly Publications</h2>
        </div>
        <div className="grid md:grid-cols-4 gap-6">
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
      <section id="projects" className="py-24 px-6 bg-slate-900/30">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <Award className="text-blue-500" size={32} />
            <h2 className="text-3xl font-bold">Strategic Impact</h2>
          </div>

          <div className="space-y-12">
            <div className="relative pl-8 border-l-2 border-slate-800">
              <div className="absolute -left-[9px] top-0 w-4 h-4 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
              <h3 className="text-xl font-bold">Founder &amp; AI Engineer — NYX NoCode</h3>
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
      <section id="signal" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <Mic className="text-blue-500" size={32} />
            <h2 className="text-3xl font-bold">Speaking &amp; Standards Leadership</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {speakingHighlights.map((item, idx) => (
              <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  {idx === 0 ? <Mic size={20} className="text-blue-500" /> : <ShieldCheck size={20} className="text-blue-500" />}
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-500">{item.org}</p>
                </div>
                <p className="text-xl font-semibold mb-2">{item.topic}</p>
                <p className="text-slate-400 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-900 text-center text-slate-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Karen Kilroy. Built with React &amp; AI.</p>
      </footer>
    </div>
  );
};

export default Portfolio;
