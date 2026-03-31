import { useState } from 'react';
import MorningDashboard from './components/MorningDashboard';
import EveningAudit from './components/EveningAudit';
import Login from './components/Login';
import { Globe2, Activity, ScanLine, LogOut } from 'lucide-react';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<'morning' | 'evening'>('morning');

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="min-h-screen mission-control-bg font-sans text-slate-200 pb-28 selection:bg-[#007AFF] selection:text-white">
      {/* Mission Control Header */}
      <header className="bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50 sticky top-0 z-30 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-slate-800 p-2 rounded-lg border border-slate-700">
              <Globe2 className="text-[#007AFF]" size={24} />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-widest text-white uppercase">D-SWar // Mission Control</h1>
              <div className="flex items-center space-x-2 mt-0.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                <p className="text-[10px] text-slate-400 font-mono tracking-widest uppercase">Global Telemetry Active</p>
              </div>
            </div>
          </div>
          <button 
            onClick={() => setIsLoggedIn(false)} 
            className="text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-700 p-2.5 rounded-xl transition-colors border border-slate-700/50"
            title="Terminate Session"
          >
            <LogOut size={18} />
          </button>
        </div>
      </header>

      {/* Content Area */}
      <main className="p-4 max-w-2xl mx-auto mt-6">
        {activeTab === 'morning' ? <MorningDashboard /> : <EveningAudit />}
      </main>

      {/* Bottom Tab Bar */}
      <div className="fixed bottom-0 w-full pb-safe pb-6 px-4 z-20 pointer-events-none">
        <nav className="max-w-sm mx-auto bg-slate-800/95 backdrop-blur-xl border border-slate-600 shadow-[0_10px_40px_rgba(0,0,0,0.5)] rounded-2xl flex justify-between p-2 pointer-events-auto">
          <button
            onClick={() => setActiveTab('morning')}
            className={`flex-1 flex flex-col items-center justify-center py-3 rounded-xl transition-all duration-300 ${activeTab === 'morning' ? 'bg-slate-700 text-[#007AFF] shadow-inner' : 'text-slate-400 hover:text-slate-200'}`}
          >
            <Activity size={20} className="mb-1" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Forecast</span>
          </button>
          <div className="w-px bg-slate-700 mx-2"></div>
          <button
            onClick={() => setActiveTab('evening')}
            className={`flex-1 flex flex-col items-center justify-center py-3 rounded-xl transition-all duration-300 ${activeTab === 'evening' ? 'bg-slate-700 text-[#007AFF] shadow-inner' : 'text-slate-400 hover:text-slate-200'}`}
          >
            <ScanLine size={20} className="mb-1" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Audit</span>
          </button>
        </nav>
      </div>
    </div>
  );
}
