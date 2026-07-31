import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Code2, X, Book, Send } from 'lucide-react';

const AnimatedCounter = ({ end, suffix = "", duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const counterRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.5 }
    );
    if (counterRef.current) observer.observe(counterRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // easeOutQuart
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeProgress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration, isVisible]);

  return <span ref={counterRef}>{count}{suffix}</span>;
};

const CommunitySection = () => {
  const communityCards = [
    {
        title: "Discord",
        description: "Join our official Discord server to chat with the community.",
        stats: "15,000+ Members",
        buttonText: "Join Discord",
        icon: <MessageCircle size={32} className="text-[#5865F2]" />,
        color: "hover:border-[#5865F2]/50 hover:shadow-[0_0_30px_rgba(88,101,242,0.15)]"
    },
    {
        title: "GitHub",
        description: "Explore the open-source repository, contribute, and report issues.",
        stats: "12K+ Stars • 1.5K Forks",
        buttonText: "View Repository",
        icon: <Code2 size={32} className="text-white" />,
        color: "hover:border-white/50 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]",
        link: "https://github.com/realtushartyagi/NovaAi"
    },
    {
        title: "Twitter / X",
        description: "Follow us for the latest announcements and development updates.",
        stats: "Daily Updates",
        buttonText: "Follow Us",
        icon: <X size={32} className="text-white" />,
        color: "hover:border-white/50 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]"
    },
    {
        title: "Documentation",
        description: "Read our comprehensive guides, API docs, and examples.",
        stats: "100+ Articles",
        buttonText: "Read Docs",
        icon: <Book size={32} className="text-[#10B981]" />,
        color: "hover:border-[#10B981]/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]"
    }
  ];

  const testimonials = [
      {
          quote: "The best AI assistant I've ever used. The memory and custom models are game changers for my daily workflow.",
          name: "Alex Developer",
          title: "Senior Engineer at TechCorp",
          avatarColor: "from-purple-500 to-indigo-500"
      },
      {
          quote: "It understands context so much better than anything else I've tried. Writing code is incredibly fast now.",
          name: "Sarah Chen",
          title: "Full Stack Developer",
          avatarColor: "from-emerald-400 to-indigo-500"
      },
      {
          quote: "The UI is gorgeous and the response times are literally instant. I've completely switched over to NovaAi.",
          name: "Marcus Wright",
          title: "Product Designer",
          avatarColor: "from-orange-400 to-pink-500"
      },
      {
          quote: "Finally, an AI that remembers my previous instructions! It saves me hours of repetitive prompting every single week.",
          name: "Emily Rodriguez",
          title: "Data Scientist",
          avatarColor: "from-blue-400 to-violet-500"
      },
      {
          quote: "The UI design is unmatched. The dark mode, the glowing effects, and the smooth animations make chatting a premium experience.",
          name: "David Kim",
          title: "Creative Director",
          avatarColor: "from-rose-400 to-red-500"
      }
  ];

  return (
    <section id="community" className="relative z-10 w-full pt-32 pb-32 px-6 lg:px-20 min-h-screen">
        <div className="max-w-6xl mx-auto w-full">
            
            {/* Hero */}
            <div className="text-center mb-20 animate-fade-in-up">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                    Join Thousands of AI Enthusiasts
                </h2>
                <p className="text-[#A1A1AA] text-lg max-w-2xl mx-auto font-light">
                    Developers, Designers, Students, and Researchers growing together.
                </p>
            </div>

            {/* Animated Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24 text-center">
                <div className="flex flex-col">
                    <span className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">
                        <AnimatedCounter end={150} suffix="+" />
                    </span>
                    <span className="text-purple-400 font-medium uppercase tracking-widest text-xs">Members</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">
                        <AnimatedCounter end={25} suffix="K+" />
                    </span>
                    <span className="text-purple-400 font-medium uppercase tracking-widest text-xs">Messages Generated</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">
                        <AnimatedCounter end={5} suffix="+" />
                    </span>
                    <span className="text-purple-400 font-medium uppercase tracking-widest text-xs">Countries</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">
                        <AnimatedCounter end={98} suffix="%" />
                    </span>
                    <span className="text-purple-400 font-medium uppercase tracking-widest text-xs">Positive Reviews</span>
                </div>
            </div>

            {/* Community Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24">
                {communityCards.map((card, idx) => (
                    <div key={idx} className={`group bg-white/5 backdrop-blur-md border border-white/10 rounded-[20px] p-8 flex flex-col transition-all duration-500 hover:-translate-y-2 cursor-pointer ${card.color}`}>
                        <div className="flex items-center justify-between mb-6">
                            {card.icon}
                            <span className="text-xs font-semibold text-gray-400 bg-white/5 px-3 py-1 rounded-full border border-white/5">
                                {card.stats}
                            </span>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3">{card.title}</h3>
                        <p className="text-[#A1A1AA] text-sm mb-8 leading-relaxed flex-1">
                            {card.description}
                        </p>
                        <a 
                            href={card.link || '#'} 
                            target={card.link ? "_blank" : "_self"} 
                            rel="noopener noreferrer" 
                            className="w-full"
                        >
                            <button className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-white font-medium group-hover:bg-white/10 transition-colors pointer-events-none">
                                {card.buttonText}
                            </button>
                        </a>
                    </div>
                ))}
            </div>

            {/* Testimonials Ticker */}
            <div className="mb-24 overflow-hidden relative w-full">
                {/* Fade edges */}
                <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#050508] to-transparent z-10 pointer-events-none"></div>
                <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#050508] to-transparent z-10 pointer-events-none"></div>
                
                <div className="flex gap-6 animate-testimonial-scroll whitespace-nowrap px-4 py-8">
                    {[...testimonials, ...testimonials].map((testimonial, i) => (
                        <div key={i} className="inline-block bg-white/5 backdrop-blur-sm border border-white/10 rounded-[20px] p-6 w-[400px] shrink-0 whitespace-normal">
                            <div className="flex text-yellow-400 mb-4 text-sm">★★★★★</div>
                            <p className="text-gray-200 text-lg mb-6 italic">"{testimonial.quote}"</p>
                            <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${testimonial.avatarColor}`}></div>
                                <div>
                                    <h4 className="text-white font-semibold text-sm">{testimonial.name}</h4>
                                    <span className="text-gray-500 text-xs">{testimonial.title}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Newsletter */}
            <div className="bg-gradient-to-br from-purple-900/40 to-[#050508] border border-purple-500/20 rounded-[30px] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10 relative overflow-hidden shadow-[0_0_50px_rgba(168,85,247,0.1)]">
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 blur-[100px] rounded-full pointer-events-none"></div>
                <div className="relative z-10 flex-1">
                    <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">Stay Updated</h3>
                    <p className="text-purple-200/70">Join our newsletter to get the latest updates on models, features, and community events.</p>
                </div>
                <div className="relative z-10 w-full max-w-md flex flex-col sm:flex-row gap-3">
                    <input type="email" placeholder="hello@example.com" className="flex-1 w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500/50 transition-colors placeholder:text-gray-600" />
                    <button className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 whitespace-nowrap">
                        Subscribe <Send size={16} />
                    </button>
                </div>
            </div>

        </div>
    </section>
  );
};

export default CommunitySection;
