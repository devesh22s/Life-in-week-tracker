import { useState } from "react";
import Timeline from "./components/TimelineGrid";
import LifeStats from "./components/LifeStats";
import DarkModeToggle from "./components/DarkModeToggle";

function App() {
  const [dob, setDob] = useState("");

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <DarkModeToggle />

      <div className="mb-4">
        <label className="text-gray-800 dark:text-gray-200">Enter Date of Birth:</label>
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          className="ml-2 p-1 rounded border dark:bg-gray-800 dark:text-white"
        />
      </div>

      <LifeStats dob={dob} />
      <Timeline weeksLived={dob ? Math.floor((new Date() - new Date(dob)) / (1000 * 60 * 60 * 24 * 7)) : 0} />
    </div>
  );
}

export default App;
