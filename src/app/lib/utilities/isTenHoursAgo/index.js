const isTenHoursAgo = milliseconds => {
  const now = Date.now();
  return now - milliseconds <= 10 * 60 * 60 * 1000;
};

export default isTenHoursAgo;
