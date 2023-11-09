/**
 * This function actually checks if the relative time is ten hours ago OR LESS.
 * It will be true when 1 millisecond before 10 hours, on the exact millisecond of 10 hours.
 * And when 1 millisecond passes after 10 hours it will return false.
 * The tests take this into account.
 * The users will be very unlikely to ever see '10 hours ago' written.
 * The argument milliseconds passed in should be millseconds
 */
const isTenHoursAgo = milliseconds => {
  const now = Date.now();
  return now - milliseconds <= 10 * 60 * 60 * 1000;
};

export default isTenHoursAgo;
