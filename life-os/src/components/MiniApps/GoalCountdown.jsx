import React, { useState } from 'react';
import { Target, CalendarDays } from 'lucide-react';
import { differenceInDays } from 'date-fns';

const GoalCountdown = () => {
  const [goal, setGoal] = useState(() => JSON.parse(localStorage.getItem('lifeos-goal')) || { title: "2026", date: "2026-01-01" });
  const [isEditing, setIsEditing] = useState(false);

  const daysLeft = differenceInDays(new Date(goal.date), new Date());

  const saveGoal = () => {
    localStorage.setItem('lifeos-goal', JSON.stringify(goal));
    setIsEditing(false);
  };

  return (
    <div className="bg-card border border-white/5 p-5 rounded-2xl w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
          <Target size={14} /> Next Milestone
        </h3>
        <button onClick={() => setIsEditing(!isEditing)} className="text-xs text-blue-500 hover:text-white">
          {isEditing ? "Close" : "Edit"}
        </button>
      </div>

      {isEditing ? (
        <div className="space-y-2">
          <input 
            className="w-full bg-dark border border-white/10 rounded p-2 text-xs text-white"
            value={goal.title}
            onChange={(e) => setGoal({...goal, title: e.target.value})}
            placeholder="Goal Name"
          />
          <input 
            type="date"
            className="w-full bg-dark border border-white/10 rounded p-2 text-xs text-white"
            value={goal.date}
            onChange={(e) => setGoal({...goal, date: e.target.value})}
          />
          <button onClick={saveGoal} className="w-full bg-blue-600 text-white text-xs py-2 rounded font-bold">Save Goal</button>
        </div>
      ) : (
        <div className="text-center py-2">
          <div className="text-4xl font-bold text-white mb-1">{daysLeft}</div>
          <div className="text-xs text-gray-500 uppercase tracking-wide">Days until {goal.title}</div>
        </div>
      )}
    </div>
  );
};

export default GoalCountdown;