import React from 'react';
import { Book, Award, Mail, Linkedin, Terminal } from 'lucide-react';

const Portfolio = () => {
  const books = [
    { title: "Natural Language and Search", year: "2024" },
    { title: "Blockchain Tethered AI", year: "2023" },
    { title: "AI and the Law", year: "2021" },
    { title: "Blockchain as a Service", year: "2019" }
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
        </div>
      </nav>

      {/* Hero Section */}
      <header className="px-6 py-24 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-block px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm mb-6">
            6x IBM Champion &amp; O'Reilly Author
          </div>
          <h1 className="text-6xl font-extrabold mb-6 leading-tight">
            Engineering the <span className="text-blue-500">Future of AI</span> Transparency.
          </h1>
          <p className="text-lg text-slate-400 mb-8 max-w-lg">
            AI engineer and author specializing in Generative AI, standards provenance (C2PA),
            and no-code innovation. Shaping how humanity interacts with machine intelligence.
          </p>
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
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-2xl">
          <Terminal className="text-blue-500 mb-4" />
          <div className="space-y-3 font-mono text-sm">
            <p className="text-green-400">{`> Karen.currentLocation = "Fayetteville, AR";`}</p>
            <p className="text-blue-300">{`> Karen.focus = ["Generative AI", "C2PA Standards"];`}</p>
            <p className="text-slate-500">{`// Latest Project: NYX NoCode`}</p>
            <p className="text-yellow-400">{`> Karen.buildStack("React", "Azure OpenAI", "Deepgram");`}</p>
          </div>
        </div>
      </header>

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
            <div className="text-3xl font-bold text-blue-500">1</div>
            <div className="text-sm text-slate-500 uppercase tracking-widest">Private Pilot License</div>
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
            <div key={i} className="group bg-slate-900 border border-slate-800 p-6 rounded-xl hover:border-blue-500/50 transition cursor-default">
              <div className="h-40 bg-slate-800 rounded mb-4 overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center font-bold text-xs text-slate-500 uppercase p-4 text-center">
                  {book.title}
                </div>
              </div>
              <h3 className="font-bold text-lg mb-1 group-hover:text-blue-400 transition">{book.title}</h3>
              <p className="text-slate-500 text-sm">{book.year}</p>
            </div>
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
                Pioneering AI-driven web app creation for education. Architected platforms using
                ReactJS + Azure OpenAI with real-time voice integration via Deepgram.
              </p>
            </div>

            <div className="relative pl-8 border-l-2 border-slate-800">
              <div className="absolute -left-[9px] top-0 w-4 h-4 bg-slate-700 rounded-full"></div>
              <h3 className="text-xl font-bold">CEO — Kilroy Blockchain</h3>
              <p className="text-blue-400 text-sm mb-4">2016 – Present</p>
              <p className="text-slate-400 leading-relaxed">
                Lead architect for RILEY, winner of the IBM Watson Build Challenge. Focused on
                enterprise workflow automation and ethical AI deployment.
              </p>
            </div>
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
