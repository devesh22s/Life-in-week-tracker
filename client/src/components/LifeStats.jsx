import { calculateStats } from "../../../server/utils/dateUtils";

const LifeStats = ({ birthDate }) => {
  const stats = calculateStats(birthDate);
  return (
    <div>
      <p>Total Weeks: {stats.totalWeeks}</p>
      <p>Lived: {stats.livedWeeks}</p>
      <p>Remaining: {stats.remainingWeeks}</p>
    </div>
  );
};

export default LifeStats;