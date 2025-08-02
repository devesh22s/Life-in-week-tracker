import React from "react";

const TOTAL_WEEKS = 90 * 52;

export default function Timeline({ weeksLived }) {
  return (
    <div className="grid grid-cols-52 gap-0.5 p-4">
      {[...Array(TOTAL_WEEKS)].map((_, i) => (
        <div
          key={i}
          className={`w-2 h-2 rounded-sm ${
            i < weeksLived ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-700"
          }`}
        />
      ))}
    </div>
  );
}
