import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, LayoutGrid } from 'lucide-react';

const AppLayout = ({ title, children }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-4 md:p-8">
      {/* Universal Header */}
      <header className="max-w-6xl mx-auto mb-8 flex items-center justify-between">
        <button 
          onClick={() => navigate('/')} 
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors bg-white/5 px-4 py-2 rounded-lg border border-white/5 hover:bg-white/10"
        >
          <ArrowLeft size={18} /> <span className="hidden sm:inline">Dashboard</span>
        </button>
        
        <h1 className="text-xl font-bold flex items-center gap-2">
          {title}
        </h1>

        <div className="w-10"></div> {/* Spacer for alignment */}
      </header>

      {/* App Content */}
      <main className="max-w-6xl mx-auto">
        {children}
      </main>
    </div>
  );
};

export default AppLayout;