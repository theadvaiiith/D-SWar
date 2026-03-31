import React, { useState, useEffect } from 'react';
import { Globe2, Lock, Mail, ArrowRight } from 'lucide-react';

const QUOTES = [
  "Food waste isn't just a waste; it's an insult to the hungry.",
  "We are not facing a scarcity of resources, but a deficit of distribution.",
  "Every discarded meal is a stolen opportunity for global equity.",
  "In a world of abundance, overproduction is an architectural failure."
];

export default function Login({ onLogin }: { onLogin: () => void }) {
  const [quote, setQuote] = useState(QUOTES[0]);
  const [variant, setVariant] = useState(0);

  useEffect(() => {
    setQuote(QUOTES[Math.floor(Math.random() * QUOTES.length)]);
    setVariant(Math.floor(Math.random() * 3));
  }, []);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#0f172a] font-sans">
      {/* Left: Ideology & Awareness (60%) */}
      <div className="lg:w-[60%] relative overflow-hidden flex flex-col justify-between p-8 lg:p-16 bg-gradient-to-br from-[#0f172a] via-[#1a365d] to-[#2f5233]">
        
        {/* Abstract Symbolic Art Background (No Real Photographs) */}
        <div className="absolute inset-0 z-0 opacity-30 flex items-center justify-center pointer-events-none">
          {/* Symbolic Globe/Food Source */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full border border-white/10 flex items-center justify-center animate-pulse-slow">
            <div className="w-[400px] h-[400px] rounded-full border border-white/20 flex items-center justify-center">
              <div className="w-[200px] h-[200px] rounded-full bg-gradient-to-b from-white/20 to-transparent blur-2xl"></div>
            </div>
          </div>
          
          {/* Abstract Silhouettes/Lines Reaching Upwards - Dynamic based on variant */}
          <svg className="absolute bottom-0 w-full h-[70%]" viewBox="0 0 100 100" preserveAspectRatio="none">
            {variant === 0 && (
              <>
                <path d="M10,100 C20,60 40,80 50,30 C60,80 80,60 90,100 Z" fill="rgba(255,255,255,0.03)" />
                <path d="M0,100 C30,50 50,90 50,20 C50,90 70,50 100,100 Z" fill="rgba(255,255,255,0.02)" />
                <path d="M20,100 C35,70 45,85 50,40 C55,85 65,70 80,100 Z" fill="rgba(255,255,255,0.04)" />
                <line x1="50" y1="100" x2="50" y2="20" stroke="rgba(255,255,255,0.1)" strokeWidth="0.2" strokeDasharray="1 1" />
                <line x1="20" y1="100" x2="45" y2="30" stroke="rgba(255,255,255,0.05)" strokeWidth="0.2" />
                <line x1="80" y1="100" x2="55" y2="30" stroke="rgba(255,255,255,0.05)" strokeWidth="0.2" />
              </>
            )}
            {variant === 1 && (
              <>
                <path d="M0,100 L40,40 L50,60 L60,30 L100,100 Z" fill="rgba(255,255,255,0.02)" />
                <path d="M20,100 L50,20 L80,100 Z" fill="rgba(255,255,255,0.03)" />
                <circle cx="50" cy="20" r="2" fill="rgba(255,255,255,0.5)" />
                <line x1="50" y1="100" x2="50" y2="20" stroke="rgba(255,255,255,0.1)" strokeWidth="0.1" />
              </>
            )}
            {variant === 2 && (
              <>
                <path d="M0,100 Q50,0 100,100 Z" fill="rgba(255,255,255,0.02)" />
                <path d="M10,100 Q50,20 90,100 Z" fill="rgba(255,255,255,0.03)" />
                <path d="M30,100 Q50,40 70,100 Z" fill="rgba(255,255,255,0.04)" />
                <line x1="10" y1="100" x2="50" y2="20" stroke="rgba(255,255,255,0.05)" strokeWidth="0.2" />
                <line x1="90" y1="100" x2="50" y2="20" stroke="rgba(255,255,255,0.05)" strokeWidth="0.2" />
              </>
            )}
          </svg>
        </div>

        <div className="relative z-10">
          <div className="flex items-center space-x-3">
            <Globe2 className="text-[#007AFF]" size={36} />
            <h1 className="text-3xl lg:text-4xl font-bold text-white tracking-tight">D-SWar</h1>
          </div>
          <p className="text-[#8b7355] font-mono text-xs lg:text-sm mt-2 uppercase tracking-widest">Global Scarcity Initiative</p>
        </div>

        <div className="relative z-10 max-w-2xl mt-20 lg:mt-0">
          <blockquote className="text-3xl lg:text-5xl font-light text-white leading-tight mb-8">
            "{quote}"
          </blockquote>
          <div className="w-16 h-1 bg-[#007AFF]"></div>
        </div>
      </div>

      {/* Right: Login Panel (40%) - Clean, crisp white for clarity */}
      <div className="lg:w-[40%] bg-white flex items-center justify-center p-8 lg:p-16 relative z-20 shadow-[-20px_0_50px_rgba(0,0,0,0.3)]">
        <div className="w-full max-w-md space-y-10">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Mission Control</h2>
            <p className="text-slate-500 mt-2 text-sm leading-relaxed">Authenticate to access the closed-loop telemetry and forecasting network.</p>
          </div>

          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Operator ID</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-400" />
                  </div>
                  <input type="email" required className="block w-full pl-12 pr-4 py-3.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#007AFF] focus:border-[#007AFF] bg-slate-50 text-slate-900 placeholder-slate-400 transition-all text-sm font-medium" placeholder="operator@d-swar.org" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Clearance Code</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-400" />
                  </div>
                  <input type="password" required className="block w-full pl-12 pr-4 py-3.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#007AFF] focus:border-[#007AFF] bg-slate-50 text-slate-900 placeholder-slate-400 transition-all text-sm font-medium" placeholder="••••••••" />
                </div>
              </div>
            </div>

            <button type="submit" className="w-full flex items-center justify-center space-x-2 bg-[#007AFF] hover:bg-blue-700 text-white py-4 px-4 rounded-xl font-bold tracking-wide transition-colors shadow-lg shadow-blue-500/20 mt-8">
              <span>INITIALIZE UPLINK</span>
              <ArrowRight size={18} />
            </button>
          </form>
          
          <div className="pt-8 border-t border-slate-100 text-center">
            <p className="text-[10px] text-slate-400 font-mono uppercase tracking-widest">Secure Connection Established</p>
          </div>
        </div>
      </div>
    </div>
  );
}
