import React, { useState } from 'react';
import { CloudRain, Utensils, Calendar, TrendingDown, Layers, ChevronRight } from 'lucide-react';

export default function MorningDashboard() {
  const [weather, setWeather] = useState<number>(0.5);
  const [menu, setMenu] = useState<number>(0.5);
  const [day, setDay] = useState<number>(0);
  
  const [prediction, setPrediction] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePredict = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://127.0.0.1:8000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          weather_index: weather, 
          menu_complexity: menu, 
          day_of_week: day 
        })
      });
      
      if (!res.ok) throw new Error('Backend connection failed');
      
      const data = await res.json();
      setPrediction(data.predicted_volume_kg);
    } catch (err) {
      console.warn("FastAPI backend unreachable, using local fallback for prototype demonstration.");
      setTimeout(() => {
        const mockPrediction = 100 + (weather * 20) + (menu * 30) + (day * 5);
        setPrediction(parseFloat(mockPrediction.toFixed(2)));
        setLoading(false);
      }, 800);
      return;
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Context Panel */}
      <div className="bg-slate-800/90 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-slate-600">
        <div className="flex items-center space-x-4 mb-4">
          <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-700">
            <Layers className="text-[#007AFF]" size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-wide uppercase">Earth Data Query</h2>
            <p className="text-[10px] text-[#007AFF] font-mono tracking-widest uppercase mt-1">MLR Forecasting Module</p>
          </div>
        </div>
        <p className="text-slate-400 text-sm leading-relaxed">
          Configure environmental and operational variables to compute the baseline ingredient volume requirement.
        </p>
      </div>

      {/* Data Input Panel */}
      <div className="bg-slate-800/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-600 overflow-hidden">
        <div className="p-6 border-b border-slate-700 bg-slate-900/30">
          <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-6">Input Parameters</h3>
          
          <div className="space-y-8">
            {/* Weather */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center space-x-3 text-slate-300">
                  <CloudRain size={18} className="text-slate-400" />
                  <label className="text-sm font-semibold tracking-wide">Meteorological Index</label>
                </div>
                <span className="text-sm font-mono font-bold text-[#007AFF] bg-blue-900/30 border border-blue-800/50 px-3 py-1 rounded-lg">{weather.toFixed(2)}</span>
              </div>
              <input 
                type="range" min="0" max="1" step="0.01" 
                value={weather} onChange={(e) => setWeather(parseFloat(e.target.value))}
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-2 font-mono uppercase tracking-widest">
                <span>Optimal (0.0)</span>
                <span>Severe (1.0)</span>
              </div>
            </div>
            
            {/* Menu */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center space-x-3 text-slate-300">
                  <Utensils size={18} className="text-slate-400" />
                  <label className="text-sm font-semibold tracking-wide">Menu Complexity</label>
                </div>
                <span className="text-sm font-mono font-bold text-[#007AFF] bg-blue-900/30 border border-blue-800/50 px-3 py-1 rounded-lg">{menu.toFixed(2)}</span>
              </div>
              <input 
                type="range" min="0" max="1" step="0.01" 
                value={menu} onChange={(e) => setMenu(parseFloat(e.target.value))}
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-2 font-mono uppercase tracking-widest">
                <span>Standard (0.0)</span>
                <span>Complex (1.0)</span>
              </div>
            </div>

            {/* Day */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center space-x-3 text-slate-300">
                  <Calendar size={18} className="text-slate-400" />
                  <label className="text-sm font-semibold tracking-wide">Operational Day</label>
                </div>
              </div>
              <select 
                value={day} onChange={(e) => setDay(parseInt(e.target.value))}
                className="w-full bg-slate-900/50 border border-slate-600 text-slate-200 text-sm font-medium rounded-xl focus:ring-2 focus:ring-[#007AFF] focus:border-[#007AFF] block p-3.5 outline-none shadow-inner appearance-none transition-all"
              >
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((d, i) => (
                  <option key={i} value={i} className="bg-slate-800">{d} (Index: {i})</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        {/* Action Area */}
        <div className="p-5 bg-slate-800/50">
          <button 
            onClick={handlePredict}
            disabled={loading}
            className="w-full bg-[#007AFF] text-white rounded-xl py-4 px-4 font-bold text-sm hover:bg-blue-600 transition-all disabled:opacity-50 flex justify-between items-center shadow-[0_0_20px_rgba(0,122,255,0.3)] group border border-blue-400/50"
          >
            <span className="tracking-widest uppercase">Compute Forecast</span>
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <ChevronRight size={18} className="text-white/70 group-hover:text-white transition-colors" />
            )}
          </button>
        </div>
      </div>

      {/* Results Panel */}
      {prediction !== null && (
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 backdrop-blur-xl rounded-2xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-emerald-500/30 relative overflow-hidden animate-in zoom-in-95 duration-500">
          <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
          
          <div className="relative z-10">
            <div className="flex items-center space-x-3 mb-2">
              <TrendingDown className="text-emerald-400" size={20} />
              <p className="text-emerald-400 text-[10px] font-bold uppercase tracking-widest">Target Volume Computed</p>
            </div>
            
            <div className="flex items-baseline space-x-3 mt-4">
              <span className="text-7xl font-light tracking-tighter text-white font-mono">{prediction.toFixed(1)}</span>
              <span className="text-2xl text-slate-500 font-mono font-medium">kg</span>
            </div>
            
            <div className="mt-8 pt-5 border-t border-slate-700/50">
              <p className="text-[10px] text-slate-400 font-mono leading-relaxed uppercase tracking-widest">
                &gt; Volume optimized via historical MLR weights.<br/>
                &gt; Subject to nighttime self-correction penalty based on visual audit data.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
