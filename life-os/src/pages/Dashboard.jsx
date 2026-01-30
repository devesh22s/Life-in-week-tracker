import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLifeStore } from '../store/lifeStore';
import { LayoutGrid, CheckSquare, Clock, Wind, PenLine, Target, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

const apps = [
  { id: 'grid', title: 'Life Timeline', icon: <LayoutGrid size={32} />, color: 'bg-blue-600', desc: 'Visualize your life in weeks.' },
  { id: 'habits', title: 'Habit Tracker', icon: <CheckSquare size={32} />, color: 'bg-emerald-500', desc: 'Build daily rituals.' },
  { id: 'focus', title: 'Focus Timer', icon: <Clock size={32} />, color: 'bg-orange-500', desc: 'Deep work sessions.' },
  { id: 'notes', title: 'Brain Dump', icon: <PenLine size={32} />, color: 'bg-purple-500', desc: 'Capture quick thoughts.' },
  { id: 'zen', title: 'Zen Breath', icon: <Wind size={32} />, color: 'bg-cyan-500', desc: 'Stress relief breathing.' },
  { id: 'goals', title: 'Goals', icon: <Target size={32} />, color: 'bg-rose-500', desc: 'Countdown to milestones.' },
];

const Dashboard = () => {
  const { name } = useLifeStore();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6 flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none"></div>

      <header className="mb-12 text-center relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">
          Life<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">OS</span>
        </h1>
        {name && <p className="text-gray-400 text-lg">Welcome back, {name}. Select an app to launch.</p>}
      </header>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl w-full relative z-10">
        {apps.map((app, index) => (
          <motion.div
            key={app.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(`/app/${app.id}`)}
            className="bg-[#171717]/80 backdrop-blur-xl border border-white/10 p-6 rounded-3xl cursor-pointer shadow-2xl hover:border-white/20 hover:shadow-blue-900/20 transition-all group flex flex-col items-center text-center gap-4"
          >
            <div className={`${app.color} p-4 rounded-2xl text-white shadow-lg group-hover:shadow-xl transition-all`}>
              {app.icon}
            </div>
            <div>
              <h3 className="font-bold text-xl mb-1">{app.title}</h3>
              <p className="text-xs text-gray-500">{app.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <footer className="mt-16 text-gray-600 text-sm">
        All data is stored locally.
      </footer>
    </div>
  );
};

export default Dashboard;