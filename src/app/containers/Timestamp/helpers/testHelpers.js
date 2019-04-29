import moment from 'moment-timezone';

export const timestampGenerator = timeDifference => {
  const magnitudes = {
    days: 24 * 60 * 60 * 1000,
    hours: 60 * 60 * 1000,
    minutes: 60 * 1000,
    seconds: 1000,
    milliseconds: 1,
  };
  let timestamp = Date.now();
  const keyNames = Object.keys(timeDifference);

  keyNames.forEach(diff => {
    timestamp -= timeDifference[diff] * magnitudes[diff];
  });

  return timestamp;
};

export const isBritishSummerTime = timestamp =>
  moment.tz(timestamp, 'Europe/London').isDST();
