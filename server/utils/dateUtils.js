export function getWeekStats(dob) {
  if (!dob) return { weeksLived: 0, weeksLeft: 4680, percent: 0 };

  const birthDate = new Date(dob);
  const today = new Date();
  const ageInMs = today - birthDate;
  const weeksLived = Math.floor(ageInMs / (1000 * 60 * 60 * 24 * 7));
  const totalWeeks = 90 * 52;
  const weeksLeft = Math.max(totalWeeks - weeksLived, 0);
  const percent = (weeksLived / totalWeeks) * 100;

  return { weeksLived, weeksLeft, percent };
}
