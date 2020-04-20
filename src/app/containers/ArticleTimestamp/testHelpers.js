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

export const sameDayTimestampsGenerator = ({ intervals, date }) => {
  /**
   * This function's `intervals` argument is an array of objects that represent
   * the time difference between several "past" moments and one "present"
   * moment. It returns an array of timestamps that fit the intervals, starting
   * at 12am local time so that as long as the intervals are all < 24 hours all
   * of the timestamps are the same day according to your machine's timezone.
   *
   * For example,
   * sameDayTimestampsGenerator({
   *   intervals: [{ hours: 23 }, { minutes: 30 }]
   * })
   * will return three timestamps for the following times: 00:00, 22:30, 23:00
   *
   * Note the intervals should be provided in descending order. If a date is
   * not provided it will use the current date.
   */

  if (!intervals || !Array.isArray(intervals)) {
    throw new Error(
      'Invalid intervals argument passed to sameDayTimestampsGenerator',
    );
  }

  const startOfDayTimestamp = moment(date).startOf('day').valueOf();
  const mockCurrentTimestamp = addTimeDifference(
    startOfDayTimestamp,
    intervals[0],
  );
  return intervals
    .map(interval => subtractTimeDifference(mockCurrentTimestamp, interval))
    .concat(mockCurrentTimestamp);
};

export const isBritishSummerTime = timestamp =>
  moment.tz(timestamp, 'Europe/London').isDST();
