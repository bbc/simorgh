import moment from 'moment-timezone';

// if the date is invalid return false - https://stackoverflow.com/questions/1353684/detecting-an-invalid-date-date-instance-in-javascript#answer-1353711
export const isValidDateTime = dateTime => {
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(dateTime) || dateTime === null) {
    return false;
  }
  return !isNaN(new Date(dateTime)); // eslint-disable-line no-restricted-globals
};

export const leadingZero = val => (val < 10 ? `0${val}` : `${val}`);

export const formatUnixTimestamp = (timestamp, momentString) =>
  moment(timestamp)
    .tz('Europe/London')
    .format(momentString);

export const isTenHoursAgoOrLess = milliseconds => {
  const now = Date.now();
  return now - milliseconds <= 10 * 60 * 60 * 1000;
};

export const isTwentyFourHoursAgoOrLess = milliseconds => {
  const now = Date.now();
  return now - milliseconds <= 24 * 60 * 60 * 1000;
};

// 2019-03-22
export const longNumeric = 'YYYY-MM-DD';

// 22 March 2019
export const shortAlphaNumeric = 'D MMMM YYYY';
