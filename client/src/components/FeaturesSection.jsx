import React from 'react';
import { MessageSquare, Zap, Settings, Globe, Lightbulb, Network, Fingerprint, Lock, Languages, Cpu } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    { 
        title: "Natural Language Processing", 
        description: "Understands human language with contextual awareness, enabling accurate and meaningful conversations.",
        icon: <MessageSquare size={24} className="text-purple-500 transition-transform duration-500 group-hover:rotate-12" /> 
    },
    { 
        title: "Real-time Learning", 
        description: "Continuously adapts responses using contextual memory and intelligent reasoning.",
        icon: <Zap size={24} className="text-purple-500 transition-transform duration-500 group-hover:rotate-12" /> 
    },
    { 
        title: "Custom AI Models", 
        description: "Switch between specialized AI models designed for coding, writing, research, and creative tasks.",
        icon: <Settings size={24} className="text-purple-500 transition-transform duration-500 group-hover:rotate-12" /> 
    },
    { 
        title: "Image Generation", 
        description: "Generate stunning AI-powered images directly from text prompts.",
        icon: <Globe size={24} className="text-purple-500 transition-transform duration-500 group-hover:rotate-12" /> 
    },
    { 
        title: "Voice Assistant", 
        description: "Speak naturally with AI using high-quality speech recognition and voice synthesis.",
        icon: <Lightbulb size={24} className="text-purple-500 transition-transform duration-500 group-hover:rotate-12" /> 
    },
    { 
        title: "Code Assistant", 
        description: "Generate, debug, optimize, and explain code across multiple programming languages.",
        icon: <Cpu size={24} className="text-purple-500 transition-transform duration-500 group-hover:rotate-12" /> 
    },
    { 
        title: "AI Memory", 
        description: "Remember conversations, preferences, and previous chats to create personalized interactions.",
        icon: <Fingerprint size={24} className="text-purple-500 transition-transform duration-500 group-hover:rotate-12" /> 
    },
    { 
        title: "Secure Authentication", 
        description: "Protected login using JWT, OAuth, and encrypted user sessions.",
        icon: <Lock size={24} className="text-purple-500 transition-transform duration-500 group-hover:rotate-12" /> 
    },
    { 
        title: "Lightning Fast Responses", 
        description: "Optimized inference pipeline delivers responses in milliseconds.",
        icon: <Network size={24} className="text-purple-500 transition-transform duration-500 group-hover:rotate-12" /> 
    }
  ];

  return (
    <section id="features" className="relative z-10 w-full pt-32 pb-20 px-6 lg:px-20 min-h-screen flex items-center">
        <div className="max-w-6xl mx-auto w-full">
            
            {/* Header */}
            <div className="text-center mb-16 animate-fade-in-up">
                <span className="inline-block py-1.5 px-4 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-semibold tracking-wider uppercase mb-6 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                    Everything you need
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                    AI Features Built for Modern Conversations
                </h2>
                <p className="text-[#A1A1AA] text-lg max-w-2xl mx-auto">
                    A comprehensive suite of tools designed to provide the most powerful, seamless, and intelligent chat experience.
                </p>
            </div>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature, idx) => (
                    <div 
                        key={idx} 
                        className="group flex flex-col justify-between h-full rounded-[20px] bg-white/5 backdrop-blur-md border border-white/10 p-8 transition-all duration-500 hover:-translate-y-2 hover:bg-white/10 hover:shadow-[0_20px_40px_rgba(168,85,247,0.15)] hover:border-purple-500/50 cursor-pointer"
                    >
                        <div>
                            <div className="w-12 h-12 rounded-[12px] bg-white/5 border border-white/10 flex items-center justify-center shadow-[inset_0_0_10px_rgba(255,255,255,0.05)] group-hover:border-purple-500/40 transition-colors mb-6">
                                {feature.icon}
                            </div>
                            <h3 className="font-semibold text-xl text-white mb-3 tracking-tight group-hover:text-purple-300 transition-colors">
                                {feature.title}
                            </h3>
                            <p className="text-[#A1A1AA] text-sm leading-relaxed mb-6 group-hover:text-gray-300 transition-colors">
                                {feature.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
  );
};

export default FeaturesSection;
