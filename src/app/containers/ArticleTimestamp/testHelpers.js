import moment from 'moment-timezone';

const magnitudes = {
  days: 24 * 60 * 60 * 1000,
  hours: 60 * 60 * 1000,
  minutes: 60 * 1000,
  seconds: 1000,
  milliseconds: 1,
};

const applyTimeDifference = (timestamp, timeDifference, isAdding) => {
  let acc = timestamp;

  const keyNames = Object.keys(timeDifference);

  keyNames.forEach(diff => {
    if (isAdding) {
      acc += timeDifference[diff] * magnitudes[diff];
    } else {
      acc -= timeDifference[diff] * magnitudes[diff];
    }
  });

  return acc;
};

const subtractTimeDifference = (timestamp, timeDifference) =>
  applyTimeDifference(timestamp, timeDifference, false);

const addTimeDifference = (timestamp, timeDifference) =>
  applyTimeDifference(timestamp, timeDifference, true);

export const timestampGenerator = timeDifference =>
  subtractTimeDifference(Date.now(), timeDifference);

export const multipleSameDayTimestampsGenerator = ({ intervals, date }) => {
  /**
   * This function accepts an array of intervals that represent the time
   * difference between specific moments in the past and Date.now(), and
   * returns an array of timestamps for those moments.
   *
   * The earliest one is set to 12:00am local time so that as long as all
   * intervals are less than 24 hours the timestamps returned will all be on
   * the same day, according to the machine's timezone.
   *
   * Note, the first interval provided must be the largest. If a date is not
   * provided it will use the current date.
   */

  if (!intervals || !Array.isArray(intervals)) {
    throw new Error(
      'Invalid intervals argument passed to multipleSameDayTimestampsGenerator',
    );
  }

  const firstTimestamp = moment(date)
    .startOf('day')
    .valueOf();
  const lastTimestamp = addTimeDifference(firstTimestamp, intervals[0]);
  return intervals
    .map(interval => subtractTimeDifference(lastTimestamp, interval))
    .concat(lastTimestamp);
};

export const isBritishSummerTime = timestamp =>
  moment.tz(timestamp, 'Europe/London').isDST();
