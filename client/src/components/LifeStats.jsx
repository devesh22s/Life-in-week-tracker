import React from "react";
import { getWeekStats } from "../../../server/utils/dateUtils";

export default function LifeStats({ dob }) {
  const { weeksLived, weeksLeft, percent } = getWeekStats(dob);

  return (
    <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-4 rounded-lg shadow-md mb-4">
      <p><strong>Weeks Lived:</strong> {weeksLived}</p>
      <p><strong>Weeks Left:</strong> {weeksLeft}</p>
      <p><strong>Life Completed:</strong> {percent.toFixed(2)}%</p>
    </div>
  );
}
