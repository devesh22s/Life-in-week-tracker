import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLifeStore } from '../store/lifeStore';
import { Rocket, User, Calendar, ChevronRight, Loader2, Sparkles } from 'lucide-react';

const SetupModal = () => {
  const { birthDate, setProfile } = useLifeStore();
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (birthDate) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && date) {
      setIsSubmitting(true);
      // Fake loading delay for "System Initialization" feel
      setTimeout(() => {
        setProfile(name, date);
        setIsSubmitting(false);
      }, 1500);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#020617]/90 backdrop-blur-xl">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px] pointer-events-none"></div>

      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        className="relative bg-[#0F1115] p-1 rounded-3xl border border-white/10 shadow-2xl max-w-md w-full mx-4 overflow-hidden"
      >
        {/* Animated Top Border Gradient */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500"></div>

        <div className="bg-[#0F1115] p-8 rounded-[22px] relative z-10">
          
          {/* Header */}
          <div className="text-center mb-10">
            <motion.div 
              initial={{ rotate: -180, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="w-20 h-20 bg-gradient-to-tr from-blue-600 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/25"
            >
              <Rocket className="text-white w-10 h-10" />
            </motion.div>
            
            <h2 className="text-4xl font-bold text-white mb-2 tracking-tight">
              Initialize <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">LifeOS</span>
            </h2>
            <p className="text-gray-400 text-sm flex items-center justify-center gap-2">
              <Sparkles size={14} className="text-yellow-400" /> 
              Configure your timeline parameters
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Name Input */}
            <div className="space-y-2 group">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1 group-focus-within:text-blue-400 transition-colors">
                Identity Protocol
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-400 transition-colors" size={20} />
                <input 
                  type="text" 
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            {/* Date Input */}
            <div className="space-y-2 group">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1 group-focus-within:text-emerald-400 transition-colors">
                Origin Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-emerald-400 transition-colors" size={20} />
                <input 
                  type="date" 
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-gray-600 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all [color-scheme:dark]"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full relative group overflow-hidden bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-900/20 disabled:opacity-70 disabled:cursor-not-allowed mt-4"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
              
              <div className="flex items-center justify-center gap-2 relative z-10">
                {isSubmitting ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Initializing System...
                  </>
                ) : (
                  <>
                    Launch Dashboard <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </div>
            </button>

            <p className="text-center text-xs text-gray-600">
              *Data is stored locally on your device.
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default SetupModal;