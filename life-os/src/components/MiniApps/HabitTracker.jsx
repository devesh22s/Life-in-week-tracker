import React, { useState, useEffect } from 'react';
import { Check, Plus, Trash2 } from 'lucide-react';

const HabitTracker = () => {
  const [habits, setHabits] = useState(() => {
    const saved = localStorage.getItem('lifeos-habits');
    return saved ? JSON.parse(saved) : [
      { id: 1, text: "Drink 3L Water", completed: false },
      { id: 2, text: "Read 10 Pages", completed: false },
    ];
  });
  const [newHabit, setNewHabit] = useState("");

  useEffect(() => {
    localStorage.setItem('lifeos-habits', JSON.stringify(habits));
  }, [habits]);

  const toggleHabit = (id) => {
    setHabits(habits.map(h => h.id === id ? { ...h, completed: !h.completed } : h));
  };

  const addHabit = (e) => {
    e.preventDefault();
    if (!newHabit.trim()) return;
    setHabits([...habits, { id: Date.now(), text: newHabit, completed: false }]);
    setNewHabit("");
  };

  const deleteHabit = (id) => {
    setHabits(habits.filter(h => h.id !== id));
  };

  return (
    <div className="bg-card border border-white/5 p-5 rounded-2xl w-full">
      <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
        ✅ Daily Rituals
      </h3>
      
      <div className="space-y-2 mb-4">
        {habits.map(habit => (
          <div key={habit.id} className="flex items-center group">
            <button 
              onClick={() => toggleHabit(habit.id)}
              className={`flex-1 flex items-center gap-3 text-sm p-2 rounded-lg transition-all ${habit.completed ? 'bg-emerald-500/10 text-emerald-500 line-through decoration-emerald-500/50' : 'bg-white/5 text-gray-300 hover:bg-white/10'}`}
            >
              <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${habit.completed ? 'bg-emerald-500 border-emerald-500' : 'border-gray-500'}`}>
                {habit.completed && <Check size={12} className="text-black" />}
              </div>
              {habit.text}
            </button>
            <button onClick={() => deleteHabit(habit.id)} className="p-2 text-gray-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>

      <form onSubmit={addHabit} className="relative">
        <input 
          type="text" 
          placeholder="Add new habit..." 
          className="w-full bg-dark border border-white/10 rounded-lg py-2 pl-3 pr-10 text-xs text-white focus:border-blue-500 outline-none"
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
        />
        <button type="submit" className="absolute right-1 top-1 p-1 bg-white/10 rounded hover:bg-blue-500 text-white transition-colors">
          <Plus size={14} />
        </button>
      </form>
    </div>
  );
};

export default HabitTracker;