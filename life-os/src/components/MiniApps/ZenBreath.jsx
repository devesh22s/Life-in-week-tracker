import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Wind } from 'lucide-react';

const ZenBreath = () => {
  const [text, setText] = useState("Inhale");
  
  useEffect(() => {
    const interval = setInterval(() => {
      setText(prev => prev === "Inhale" ? "Exhale" : "Inhale");
    }, 4000); // 4 seconds cycle
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-card border border-white/5 p-5 rounded-2xl w-full flex flex-col items-center justify-center overflow-hidden relative">
      <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-6 w-full flex items-center gap-2">
        <Wind size={14} /> Zen Mode
      </h3>
      
      <div className="relative flex items-center justify-center h-32 w-full">
        <motion.div 
          animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-24 h-24 bg-blue-500/20 rounded-full blur-xl"
        />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], borderColor: ["#3b82f6", "#10b981", "#3b82f6"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="w-20 h-20 rounded-full border-2 border-blue-500 flex items-center justify-center relative z-10"
        >
          <motion.span 
             key={text}
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             className="text-xs font-bold text-white uppercase tracking-widest"
          >
            {text}
          </motion.span>
        </motion.div>
      </div>
    </div>
  );
};

export default ZenBreath;