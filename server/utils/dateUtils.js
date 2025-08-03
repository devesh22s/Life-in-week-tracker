export const calculateStats = (birthDate) => {
  const totalWeeks = 90 * 52;
  const birth = new Date(birthDate);
  const now = new Date();
  const livedWeeks = Math.floor((now - birth) / (7 * 24 * 60 * 60 * 1000));
  const remainingWeeks = totalWeeks - livedWeeks;
  return { totalWeeks, livedWeeks, remainingWeeks };
};