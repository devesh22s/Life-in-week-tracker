import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useLifeStore } from './store/lifeStore';

// Components
import SetupModal from './components/SetupModal';
import Dashboard from './pages/Dashboard';
import AppLayout from './layouts/AppLayout';

// Apps
import LifeGrid from './components/LifeGrid';
import HabitTracker from './components/MiniApps/HabitTracker';
import FocusTimer from './components/MiniApps/FocusTimer';
import QuickNotes from './components/MiniApps/QuickNotes';
import ZenBreath from './components/MiniApps/ZenBreath';
import GoalCountdown from './components/MiniApps/GoalCountdown';

function App() {
  const { birthDate } = useLifeStore();

  return (
    <Router>
      <div className="bg-[#0a0a0a] min-h-screen text-white font-sans selection:bg-blue-500/30">
        
        {/* Setup Modal hamesha rahega taaki naya user data daal sake */}
        <SetupModal />

        {birthDate && (
          <Routes>
            {/* Main Launcher */}
            <Route path="/" element={<Dashboard />} />

            {/* Individual Apps */}
            <Route path="/app/grid" element={
              <AppLayout title="Life Timeline">
                <div className="bg-[#171717] border border-white/5 rounded-2xl p-4 shadow-2xl">
                   <LifeGrid />
                </div>
              </AppLayout>
            } />

            <Route path="/app/habits" element={
              <AppLayout title="Habit Tracker">
                <div className="max-w-2xl mx-auto">
                  <HabitTracker />
                </div>
              </AppLayout>
            } />

            <Route path="/app/focus" element={
              <AppLayout title="Focus Timer">
                <div className="max-w-xl mx-auto mt-10">
                  <FocusTimer />
                </div>
              </AppLayout>
            } />

            <Route path="/app/notes" element={
              <AppLayout title="Brain Dump">
                <div className="max-w-3xl mx-auto h-[70vh]">
                  <QuickNotes />
                </div>
              </AppLayout>
            } />

            <Route path="/app/zen" element={
              <AppLayout title="Zen Breath">
                <div className="max-w-xl mx-auto mt-10">
                  <ZenBreath />
                </div>
              </AppLayout>
            } />

            <Route path="/app/goals" element={
              <AppLayout title="Goal Countdown">
                <div className="max-w-xl mx-auto mt-10">
                  <GoalCountdown />
                </div>
              </AppLayout>
            } />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;