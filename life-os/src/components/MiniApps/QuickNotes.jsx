import React, { useState, useEffect } from 'react';
import { PenLine } from 'lucide-react';

const QuickNotes = () => {
  const [note, setNote] = useState(() => localStorage.getItem('lifeos-notes') || "");

  useEffect(() => {
    localStorage.setItem('lifeos-notes', note);
  }, [note]);

  return (
    <div className="bg-card border border-white/5 p-5 rounded-2xl w-full h-full flex flex-col">
      <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
        <PenLine size={14} /> Brain Dump
      </h3>
      <textarea 
        className="w-full flex-1 bg-dark/50 border border-white/5 rounded-xl p-3 text-sm text-gray-300 focus:border-white/20 outline-none resize-none placeholder-gray-700 leading-relaxed"
        placeholder="Capture your thoughts..."
        rows="5"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
    </div>
  );
};

export default QuickNotes;