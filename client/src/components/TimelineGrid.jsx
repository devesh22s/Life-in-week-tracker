const TimelineGrid = () => {
  const totalWeeks = 90 * 52;

  return (
    <div className="grid grid-cols-52 gap-1 p-4 max-w-full overflow-auto">
      {Array.from({ length: totalWeeks }).map((_, i) => (
        <div
          key={i}
          className="w-3 h-3 bg-gray-300 hover:bg-blue-400 transition-colors duration-150"
          title={`Week ${i + 1}`}
        ></div>
      ))}
    </div>
  );
};

export default TimelineGrid;
