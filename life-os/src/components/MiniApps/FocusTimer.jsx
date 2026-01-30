import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

const FocusTimer = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      // Play sound here
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="bg-card border border-white/5 p-6 rounded-2xl w-full">
      <h3 className="text-lg font-bold text-gray-300 mb-4">⚡ Deep Focus Mode</h3>
      <div className="text-5xl font-mono font-bold text-center mb-6 text-white tracking-widest">
        {formatTime(timeLeft)}
      </div>
      <div className="flex gap-4 justify-center">
        <button 
          onClick={() => setIsActive(!isActive)}
          className={`p-3 rounded-full ${isActive ? 'bg-danger text-white' : 'bg-primary text-white'} transition-all`}
        >
          {isActive ? <Pause size={24} /> : <Play size={24} />}
        </button>
        <button 
          onClick={() => { setIsActive(false); setTimeLeft(25 * 60); }}
          className="p-3 rounded-full bg-white/10 text-gray-300 hover:bg-white/20 transition-all"
        >
          <RotateCcw size={24} />
        </button>
      </div>
    </div>
  );
};

export default FocusTimer;