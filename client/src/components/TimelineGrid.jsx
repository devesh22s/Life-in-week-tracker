import React from 'react';

const TimelineGrid = () => {
  const weeks = Array.from({ length: 52 * 90 });

  return (
    <div className="grid">
      {weeks.map((_, i) => (
        <div key={i} className={`week-box ${i < 52 * 23 ? 'lived' : ''}`} />
      ))}
    </div>
  );
};

export default TimelineGrid;