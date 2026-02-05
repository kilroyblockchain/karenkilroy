import React from 'react';
import {
  Globe, Sparkles, Link2, BookOpen, Shield, Trophy, FileText,
  Youtube, Mic, Github, Linkedin, Mail, ExternalLink, ArrowLeft
} from 'lucide-react';

const LinkTree = () => {
  const links = [
    // Core / Hero Links
    {
      title: "KarenKilroy.com",
      subtitle: "Official Site",
      url: "https://karenkilroy.com",
      icon: Globe,
      highlight: true,
      gradient: "from-blue-500 to-cyan-400"
    },
    {
      title: "NYX NoCode",
      subtitle: "AI-Driven App Infrastructure",
      url: "https://nyx.baby",
      icon: Sparkles,
      highlight: true,
      gradient: "from-purple-500 to-pink-400"
    },
    {
      title: "C2PA",
      subtitle: "AI/ML Task Force Co-Chair",
      url: "https://c2pa.org",
      icon: Shield,
      highlight: true,
      gradient: "from-indigo-500 to-blue-400"
    },
    {
      title: "Blockchain Tethered AI",
      subtitle: "O'Reilly Book",
      url: "https://www.blockchaintetheredai.com",
      icon: BookOpen,
      gradient: "from-orange-500 to-amber-400"
    },
    {
      title: "Kilroy Blockchain",
      subtitle: "Responsible AI Systems",
      url: "https://www.kilroyblockchain.com",
      icon: Link2,
      gradient: "from-emerald-500 to-teal-400"
    },
    // Research & Writing
    {
      title: "O'Reilly Author Page",
      subtitle: "All Publications",
      url: "https://www.oreilly.com/people/karen-kilroy/",
      icon: BookOpen,
      gradient: "from-red-500 to-orange-400"
    },
    {
      title: "AI's Opaque Box Is Actually a Supply Chain",
      subtitle: "O'Reilly Radar Blog",
      url: "https://www.oreilly.com/radar/ais-opaque-box-is-actually-a-supply-chain/",
      icon: FileText,
      gradient: "from-red-500 to-orange-400"
    },
    {
      title: "IBM Champion Spotlight",
      subtitle: "Community Recognition",
      url: "https://community.ibm.com/community/user/blogs/krista-summitt1/2021/05/18/ibm-cloud-champion-spotlight-karen-kilroy",
      icon: Trophy,
      gradient: "from-yellow-500 to-amber-400"
    },
    // Talks & Media
    {
      title: "AI Talk: What Makes It Smart?",
      subtitle: "YouTube Presentation",
      url: "https://www.youtube.com/watch?v=MbO7Sii_JKU",
      icon: Youtube,
      gradient: "from-red-600 to-red-400"
    },
    {
      title: "Humanity & AI Podcast",
      subtitle: "adddot.io S3E9",
      url: "https://adddot.io/podcast/s3e9/",
      icon: Mic,
      gradient: "from-violet-500 to-purple-400"
    },
    // Build & Connect
    {
      title: "GitHub",
      subtitle: "Code & Systems",
      url: "https://github.com/KarenK123",
      icon: Github,
      gradient: "from-slate-500 to-slate-400"
    },
    {
      title: "LinkedIn",
      subtitle: "Professional Profile",
      url: "https://www.linkedin.com/in/karenkilroy/",
      icon: Linkedin,
      gradient: "from-blue-600 to-blue-400"
    },
    {
      title: "Contact / Collaborate",
      subtitle: "Let's Build Together",
      url: "https://docs.google.com/forms/d/e/1FAIpQLSejoNvJ1vH4mnTaESayh6HO8LglyAmvYpErYyIGT8of2Wp_eg/viewform",
      icon: Mail,
      gradient: "from-pink-500 to-rose-400"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans relative overflow-hidden">
      {/* Animated background gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-500/10 via-transparent to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-purple-500/10 via-transparent to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-cyan-500/5 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Back to main site */}
      <a
        href="/"
        className="absolute top-6 left-6 flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors z-10"
      >
        <ArrowLeft size={18} />
        <span className="text-sm">Back to site</span>
      </a>

      <div className="relative z-10 max-w-lg mx-auto px-6 py-16">
        {/* Profile Header */}
        <div className="text-center mb-10">
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full blur-lg opacity-50 animate-pulse" />
            <img
              src="/img/headshot.jpg"
              alt="Karen Kilroy"
              className="relative w-28 h-28 rounded-full object-cover border-2 border-slate-700 shadow-2xl"
              style={{ objectPosition: 'center 20%' }}
            />
          </div>
          <h1 className="text-2xl font-bold mb-2 tracking-tight">Karen Kilroy</h1>
          <p className="text-blue-400 font-medium mb-3">AI Technologist</p>
          <p className="text-slate-400 text-sm max-w-xs mx-auto leading-relaxed">
            O'Reilly Author  ·  IBM Champion  ·  C2PA AI/ML Co-Chair
          </p>
          <p className="text-slate-500 text-xs mt-2">
            Designing trustworthy, explainable, production-grade AI systems.
          </p>
        </div>

        {/* Links */}
        <div className="space-y-3">
          {links.map((link, index) => {
            const Icon = link.icon;
            return (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative block w-full p-4 rounded-xl border transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5 ${
                  link.highlight
                    ? 'bg-gradient-to-r ' + link.gradient + ' border-transparent text-white shadow-lg hover:shadow-xl hover:shadow-blue-500/20'
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-800/80'
                }`}
                style={{
                  animationDelay: `${index * 50}ms`
                }}
              >
                <div className="flex items-center gap-4">
                  <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110 ${
                    link.highlight
                      ? 'bg-white/20'
                      : `bg-gradient-to-br ${link.gradient} text-white`
                  }`}>
                    <Icon size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-semibold truncate ${link.highlight ? 'text-white' : 'text-slate-100'}`}>
                      {link.title}
                    </h3>
                    <p className={`text-sm truncate ${link.highlight ? 'text-white/80' : 'text-slate-400'}`}>
                      {link.subtitle}
                    </p>
                  </div>
                  <ExternalLink size={16} className={`flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity ${link.highlight ? 'text-white/80' : 'text-slate-500'}`} />
                </div>
              </a>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <div className="flex justify-center gap-6 mb-6">
            <a
              href="https://github.com/KarenK123"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-slate-300 transition-colors"
            >
              <Github size={22} />
            </a>
            <a
              href="https://www.linkedin.com/in/karenkilroy/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-blue-400 transition-colors"
            >
              <Linkedin size={22} />
            </a>
          </div>
          <p className="text-slate-600 text-xs">
            &copy; {new Date().getFullYear()} Karen Kilroy
          </p>
        </div>
      </div>
    </div>
  );
};

export default LinkTree;
