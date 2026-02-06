import React from 'react';
import {
  Globe, Sparkles, Link2, BookOpen, Shield, Trophy, FileText,
  Youtube, Mic, Radio, Linkedin, Mail, ExternalLink, ArrowLeft
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
      title: "Creating Trackable, Traceable AI",
      subtitle: "O'Reilly Playlist",
      url: "https://learning.oreilly.com/playlists/b961e90f-1fdd-4e3b-b7d8-a5ba197951b2/",
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
      title: "Blockchain AI Kill Switch",
      subtitle: "Actian Panel w/ Perrin & Issenbert",
      url: "https://www.youtube.com/watch?v=xgqtv2nv0_4",
      icon: Youtube,
      highlight: true,
      gradient: "from-red-600 to-red-400"
    },
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
    // NPR KUAF Interviews
    {
      title: "Paybots AI",
      subtitle: "NPR KUAF · June 2025",
      url: "https://www.kuaf.com/show/ozarks-at-large/2025-06-26/paying-people-for-their-contributions-to-machine-learning-with-paybots-ai",
      icon: Radio,
      gradient: "from-blue-500 to-sky-400"
    },
    {
      title: "NYX NoCode Hackathon",
      subtitle: "NPR KUAF · April 2025",
      url: "https://www.kuaf.com/show/ozarks-at-large/2025-04-22/creating-the-unexpected-with-ai-during-menas-no-code-hackathon",
      icon: Radio,
      gradient: "from-blue-500 to-sky-400"
    },
    {
      title: "NYX NoCode in Mena Schools",
      subtitle: "NPR KUAF · Nov 2024",
      url: "https://www.kuaf.com/show/ozarks-at-large/2024-11-26/nyx-no-code-enables-mena-students-to-create-using-ai",
      icon: Radio,
      gradient: "from-blue-500 to-sky-400"
    },
    // Build & Connect
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
        className="absolute top-4 left-4 md:top-6 md:left-6 flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors z-10"
      >
        <ArrowLeft size={16} />
        <span className="text-xs md:text-sm">Back to site</span>
      </a>

      <div className="relative z-10 max-w-lg mx-auto px-4 md:px-6 py-12 md:py-16">
        {/* Profile Header */}
        <div className="text-center mb-8 md:mb-10">
          <div className="relative inline-block mb-4 md:mb-6">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full blur-lg opacity-50 animate-pulse" />
            <img
              src="/img/headshot.jpg"
              alt="Karen Kilroy"
              className="relative w-24 h-24 md:w-28 md:h-28 rounded-full object-cover border-2 border-slate-700 shadow-2xl"
              style={{ objectPosition: 'center 20%' }}
            />
          </div>
          <h1 className="text-xl md:text-2xl font-bold mb-2 tracking-tight">Karen Kilroy</h1>
          <p className="text-blue-400 font-medium mb-2 md:mb-3 text-sm md:text-base">AI Technologist</p>
          <p className="text-slate-400 text-xs md:text-sm max-w-xs mx-auto leading-relaxed">
              Developer · Author · Speaker
          </p>
          <p className="text-slate-500 text-xs mt-2">
            Designing trustworthy, explainable, production-grade AI systems.
          </p>
        </div>

        {/* Links */}
        <div className="space-y-2 md:space-y-3">
          {links.map((link, index) => {
            const Icon = link.icon;
            return (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative block w-full p-3 md:p-4 rounded-xl border transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5 ${
                  link.highlight
                    ? 'bg-gradient-to-r ' + link.gradient + ' border-transparent text-white shadow-lg hover:shadow-xl hover:shadow-blue-500/20'
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-800/80'
                }`}
                style={{
                  animationDelay: `${index * 50}ms`
                }}
              >
                <div className="flex items-center gap-3 md:gap-4">
                  <div className={`flex-shrink-0 w-9 h-9 md:w-10 md:h-10 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110 ${
                    link.highlight
                      ? 'bg-white/20'
                      : `bg-gradient-to-br ${link.gradient} text-white`
                  }`}>
                    <Icon size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-semibold text-sm md:text-base truncate ${link.highlight ? 'text-white' : 'text-slate-100'}`}>
                      {link.title}
                    </h3>
                    <p className={`text-xs md:text-sm truncate ${link.highlight ? 'text-white/80' : 'text-slate-400'}`}>
                      {link.subtitle}
                    </p>
                  </div>
                  <ExternalLink size={14} className={`flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity ${link.highlight ? 'text-white/80' : 'text-slate-500'}`} />
                </div>
              </a>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-8 md:mt-12 text-center">
          <div className="flex justify-center gap-6 mb-4 md:mb-6">
            <a
              href="https://www.linkedin.com/in/karenkilroy/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-blue-400 transition-colors"
            >
              <Linkedin size={20} />
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
