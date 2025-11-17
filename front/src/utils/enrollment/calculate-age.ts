const calculateAgeMonths = (d: Date) => {
  const today = new Date();
  let months = (today.getFullYear() - d.getFullYear()) * 12;
  months += today.getMonth() - d.getMonth();
  if (today.getDate() < d.getDate()) {
    months--;
  }
  return months % 12;
};

const calculateAgeYears = (d: Date) => {
  const today = new Date();
  let years = today.getFullYear() - d.getFullYear();
  const monthDiff = today.getMonth() - d.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < d.getDate())) {
    years--;
  }
  return years;
};

export { calculateAgeMonths, calculateAgeYears };
