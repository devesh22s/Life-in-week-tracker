import React, { useState, useMemo, useCallback } from 'react';
import {  AnimatePresence } from 'framer-motion';
import { useLifeStore } from '../store/lifeStore';
import { X, Save, Calendar, Clock, RefreshCw } from 'lucide-react';

// --- 1. MEMOIZED WEEK CELL (Performance Booster) ---
// Ye component tab tak re-render nahi hoga jab tak iska data change na ho.
const WeekCell = React.memo(({ weekIndex, event, styleClass, onClick }) => {
  return (
    <div
      onClick={() => onClick(weekIndex)}
      className={`
        aspect-square rounded-[1px] cursor-pointer group relative
        ${styleClass}
        ${event ? '!bg-white !shadow-[0_0_15px_white] z-10' : ''}
      `}
    >
      {/* Tooltip on Hover */}
      <div className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-max max-w-[150px] bg-black/90 text-white text-[10px] p-2 rounded border border-white/20 pointer-events-none z-50 backdrop-blur-md shadow-xl transition-opacity">
        <div className="font-bold text-gray-400">Week {weekIndex + 1}</div>
        <div className="text-emerald-400">Age: {(weekIndex / 52).toFixed(1)}</div>
        {event && (
          <div className="mt-1 pt-1 border-t border-white/10 text-white font-medium">
            {event.title}
          </div>
        )}
      </div>
    </div>
  );
});

const LifeGrid = () => {
  const { birthDate, events, getLivedWeeks, addEvent, setProfile } = useLifeStore();
  const livedWeeks = getLivedWeeks();
  const totalWeeks = 90 * 52; // 90 Years
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [note, setNote] = useState("");

  // --- 2. POWERFUL LOGIC: Convert Array to Hash Map (O(1) Lookup) ---
  // Isse finding time 4000x fast ho jayega
  const eventsMap = useMemo(() => {
    const map = {};
    events.forEach(e => {
      map[e.weekId] = e;
    });
    return map;
  }, [events]);

  // --- 3. Efficient Style Calculation ---
  const getWeekStyle = useCallback((weekIndex) => {
    const year = Math.floor(weekIndex / 52);
    let baseClass = "transition-all duration-300 ";

    if (weekIndex > livedWeeks) return baseClass + "bg-[#1a1a1a] hover:bg-[#2a2a2a] border border-white/[0.02]";
    if (weekIndex === livedWeeks) return baseClass + "bg-white shadow-[0_0_15px_2px_rgba(255,255,255,0.8)] z-10 animate-pulse scale-125 rounded-[2px]";
    
    if (year < 5) return baseClass + "bg-purple-500/80 shadow-[0_0_5px_rgba(168,85,247,0.4)]";
    if (year < 18) return baseClass + "bg-blue-500/80 shadow-[0_0_5px_rgba(59,130,246,0.4)]";
    if (year < 25) return baseClass + "bg-emerald-500/80 shadow-[0_0_5px_rgba(16,185,129,0.4)]";
    if (year < 60) return baseClass + "bg-orange-500/80 shadow-[0_0_5px_rgba(249,115,22,0.4)]";
    return baseClass + "bg-gray-500/80 shadow-[0_0_5px_rgba(107,114,128,0.4)]";
  }, [livedWeeks]);

  const handleWeekClick = useCallback((index) => {
    const existingEvent = eventsMap[index]; // O(1) Access
    setSelectedWeek({ index, event: existingEvent });
    if (existingEvent) setNote(existingEvent.title);
    else setNote("");
  }, [eventsMap]);

  const saveNote = () => {
    if (selectedWeek && note.trim()) {
      addEvent(selectedWeek.index, note);
      setSelectedWeek(null);
      setNote("");
    }
  };

  // --- 4. RECALCULATE / RESET LOGIC ---
  const handleRecalculate = () => {
    if (window.confirm("Are you sure? This will reset your birthdate but keep your events.")) {
      setProfile("", null); // Reset name and birthdate to trigger SetupModal
    }
  };

  if (!birthDate) return null;

  return (
    <div className="w-full max-w-7xl mx-auto p-2">
      
      {/* --- Controls & Legend --- */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <div className="flex flex-wrap justify-center gap-4 py-3 px-6 bg-white/5 rounded-2xl border border-white/5 backdrop-blur-sm">
          <LegendItem color="bg-purple-500" label="Childhood" />
          <LegendItem color="bg-blue-500" label="School" />
          <LegendItem color="bg-emerald-500" label="Young Adult" />
          <LegendItem color="bg-orange-500" label="Career" />
          <LegendItem color="bg-gray-500" label="Retirement" />
        </div>
        
        {/* Recalculate Button */}
        <button 
          onClick={handleRecalculate}
          className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-400 rounded-lg border border-white/5 transition-all text-xs uppercase font-bold tracking-wider"
        >
          <RefreshCw size={14} /> Recalculate Life
        </button>
      </div>

      {/* --- The Grid (Optimized) --- */}
      <div className="grid grid-cols-[repeat(52,1fr)] gap-[1px] md:gap-[2px] bg-[#0a0a0a] p-4 rounded-xl border border-white/5 shadow-2xl">
        {Array.from({ length: totalWeeks }).map((_, i) => (
          <WeekCell 
            key={i} 
            weekIndex={i} 
            event={eventsMap[i]} 
            styleClass={getWeekStyle(i)} 
            onClick={handleWeekClick} 
          />
        ))}
      </div>

      {/* --- Modern Modal --- */}
      <AnimatePresence>
        {selectedWeek && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-[#0F1115] w-full max-w-md p-6 rounded-2xl border border-white/10 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Calendar className="text-blue-500" size={20}/> Week {selectedWeek.index}
                  </h3>
                  <p className="text-gray-400 text-sm flex items-center gap-2 mt-1">
                    <Clock size={14} /> Age: {(selectedWeek.index / 52).toFixed(1)} years
                  </p>
                </div>
                <button onClick={() => setSelectedWeek(null)} className="text-gray-500 hover:text-white transition-colors">
                  <X size={24} />
                </button>
              </div>
              
              {selectedWeek.event ? (
                <div className="bg-white/5 border border-white/10 p-4 rounded-xl mb-6">
                  <p className="text-gray-300 italic">"{selectedWeek.event.title}"</p>
                </div>
              ) : (
                <textarea 
                  className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white mb-6 focus:border-blue-500 focus:outline-none transition-colors resize-none placeholder-gray-600"
                  rows="4"
                  placeholder="What significant memory do you want to keep here?"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  autoFocus
                />
              )}
              
              <div className="flex gap-3">
                {!selectedWeek.event && (
                  <button 
                    onClick={saveNote} 
                    className="flex-1 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white py-3 rounded-xl font-bold shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2 transition-all"
                  >
                    <Save size={18} /> Save Memory
                  </button>
                )}
                {selectedWeek.event && (
                   <button 
                   onClick={() => setSelectedWeek(null)} 
                   className="flex-1 bg-white/5 hover:bg-white/10 text-white py-3 rounded-xl font-bold transition-all"
                 >
                   Close
                 </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const LegendItem = ({ color, label }) => (
  <div className="flex items-center gap-2">
    <div className={`w-3 h-3 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.3)] ${color}`}></div>
    <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">{label}</span>
  </div>
);

export default LifeGrid;