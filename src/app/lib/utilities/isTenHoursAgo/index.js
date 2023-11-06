const isTenHoursAgo = milliseconds => {
  const now = Date.now();
  return now - milliseconds < 11 * 60 * 60 * 1000;
};

export default isTenHoursAgo;
