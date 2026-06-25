import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import EarthGlobe from '../components/EarthGlobe';
import FeaturesSection from '../components/FeaturesSection';
import CommunitySection from '../components/CommunitySection';

const Landing = ({ setShowLogin }) => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 } // Trigger when 30% of the section is visible
    );

    const sections = document.querySelectorAll('section');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full bg-[#050508] text-white overflow-x-hidden font-['Outfit']">
      
      {/* --- FIXED BACKGROUND LAYERS --- */}
      {/* LAYER 2: Large blurred purple glow */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/40 blur-[150px] rounded-full pointer-events-none z-0"></div>

      {/* LAYER 3: Tiny star particles */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:60px_60px]"></div>

      {/* LAYER 4: Light Vignette */}
      <div className="fixed inset-0 z-0 pointer-events-none shadow-[inset_0_0_200px_rgba(0,0,0,0.8)]"></div>

      {/* 3D Digital Wireframe Earth (Fixed so it stays while scrolling) */}
      <div className="fixed top-0 right-0 w-[60%] h-full z-0 opacity-80 pointer-events-none mix-blend-screen">
        <div className="absolute inset-0 flex items-center justify-center translate-x-20">
            <div className="w-[700px] h-[700px]">
                <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                    <ambientLight intensity={0.5} />
                    <Suspense fallback={null}>
                        <EarthGlobe />
                    </Suspense>
                </Canvas>
            </div>
        </div>
      </div>

      {/* --- CONTENT LAYER --- */}
      <div className="relative z-10 w-full flex flex-col">
        
        {/* Navigation Bar (Fixed) */}
        <div className="fixed top-6 z-[100] w-full px-6 flex justify-center pointer-events-none left-0 right-0">
            <nav className="flex items-center justify-between w-full max-w-5xl h-[50px] rounded-full bg-white/5 backdrop-blur-[20px] border border-white/10 px-6 shadow-[0_10px_40px_rgba(0,0,0,0.4)] pointer-events-auto">
            <div 
                onClick={() => scrollToSection('home')}
                className="font-bold text-xl tracking-tight text-white flex items-center gap-2 cursor-pointer"
            >
                ChatNova
            </div>
            <div className="hidden md:flex items-center gap-2 text-[15px] font-medium text-gray-400">
                <button 
                    onClick={() => scrollToSection('home')} 
                    className={`px-4 py-1.5 rounded-full transition-all duration-300 ${activeSection === 'home' ? 'bg-purple-600/80 text-white shadow-[0_0_15px_rgba(139,92,246,0.5)]' : 'hover:text-white hover:bg-white/5'}`}
                >
                    Home
                </button>
                <button 
                    onClick={() => scrollToSection('features')} 
                    className={`group px-4 py-1.5 rounded-full transition-all duration-300 relative overflow-hidden ${activeSection === 'features' ? 'bg-purple-600/80 text-white shadow-[0_0_15px_rgba(139,92,246,0.5)]' : 'hover:text-white hover:scale-[1.03]'}`}
                >
                    Features
                    <span className={`absolute bottom-1 left-4 right-4 h-[2px] bg-purple-500 rounded-full origin-left transition-transform duration-300 ${activeSection === 'features' ? 'scale-x-0' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
                </button>
                <button 
                    onClick={() => scrollToSection('community')} 
                    className={`group px-4 py-1.5 rounded-full transition-all duration-300 relative ${activeSection === 'community' ? 'bg-purple-600/80 text-white shadow-[0_0_15px_rgba(139,92,246,0.5)]' : 'hover:text-white hover:shadow-[0_0_15px_rgba(168,85,247,0.4)]'}`}
                >
                    Community
                </button>
            </div>
            <button onClick={() => setShowLogin(true)} className="bg-white/10 hover:bg-white/20 text-white text-sm font-semibold py-1.5 px-5 rounded-full transition-all border border-white/5 hover:border-white/20">
                Login
            </button>
            </nav>
        </div>

        {/* Hero Section */}
        <section id="home" className="min-h-[calc(100vh-80px)] flex items-center justify-center container mx-auto px-6 lg:px-20 pt-32 pb-20">
            <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-16">
            
            {/* Hero Left Content */}
            <div className="flex-1 max-w-[55%] animate-slide-in-left">
                <h1 className="text-5xl lg:text-[60px] leading-[1.1] font-extrabold text-white mb-6 tracking-tight drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                Meet ChatNova
                </h1>
                <p className="text-[#A1A1AA] text-lg leading-[1.6] max-w-[450px] mb-10 font-normal">
                Experience the future of conversational AI. Unleash the power of our advanced neural network models instantly.
                </p>
                <button onClick={() => setShowLogin(true)} className="bg-gradient-to-r from-[#8B5CF6] to-[#5B21B6] hover:scale-105 transition-all text-white font-semibold py-4 px-8 rounded-full shadow-[0_10px_40px_rgba(139,92,246,0.6)] hover:shadow-[0_0_60px_rgba(168,85,247,0.8)]">
                Start Chatting
                </button>
            </div>

            {/* Hero Right: Floating Chat Card Mockup */}
            <div className="flex-1 w-full max-w-[45%] flex justify-end animate-float">
                <div className="w-[480px] rounded-[24px] bg-black/40 backdrop-blur-xl border border-white/10 shadow-[0_20px_80px_rgba(0,0,0,0.8)] p-5 relative overflow-hidden">
                    {/* Purple Mockup Glow */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 blur-3xl rounded-full"></div>
                    
                    {/* Top Bar */}
                    <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-4 relative z-10">
                        <span className="font-semibold text-lg tracking-tight">ChatNova</span>
                        <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-xs font-bold shadow-[0_0_15px_rgba(139,92,246,0.5)]">AI</div>
                    </div>

                    {/* Mock Messages */}
                    <div className="space-y-4 mb-4 relative z-10">
                        <div className="flex justify-end">
                            <div className="bg-white/10 text-sm px-4 py-2.5 rounded-2xl rounded-tr-sm max-w-[80%] border border-white/5">
                                How is it going? Do you have something I can help you with or would like to know?
                            </div>
                        </div>
                        <div className="flex justify-start">
                            <div className="bg-gradient-to-br from-purple-600/80 to-purple-800/80 text-sm px-4 py-2.5 rounded-2xl rounded-tl-sm max-w-[80%] shadow-[0_5px_15px_rgba(139,92,246,0.2)] border border-purple-500/30">
                                I'm ready to assist you. What would you like to explore today?
                            </div>
                        </div>
                    </div>

                    {/* Mock Input */}
                    <div className="mt-4 relative z-10">
                        <div className="w-full h-12 rounded-full bg-white/5 border border-white/10 flex items-center px-4">
                            <span className="text-gray-500 text-sm">Message Nova...</span>
                            <div className="ml-auto w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                                <div className="w-3 h-3 bg-gray-400 rounded-sm"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </section>

        {/* Features Section */}
        <FeaturesSection />

        {/* Community Section */}
        <CommunitySection />

      </div>
    </div>
  );
};

export default Landing;
