import moment from 'moment-timezone';
// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']; // eslint-disable-line

// if the date is invalid return false - https://stackoverflow.com/questions/1353684/detecting-an-invalid-date-date-instance-in-javascript#answer-1353711
export const isValidDateTime = dateTime => {
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(dateTime) || dateTime === null) {
    return false;
  }
  return !isNaN(new Date(dateTime)); // eslint-disable-line no-restricted-globals
};

export const leadingZero = val => (val < 10 ? `0${val}` : `${val}`);

// when using this function, we recommend using webpack configuration to only load in the relevant timezone, rather than all of moment-timezone
export const formatUnixTimestamp = (timestamp, momentString) =>
  moment(timestamp)
    .tz('Europe/London')
    .format(momentString);

export const isTenHoursAgoOrLess = milliseconds => {
  const now = Date.now();
  return now - milliseconds <= 10 * 60 * 60 * 1000;
};

// 2019-03-22
export const formatDateNumeric = 'YYYY-MM-DD';

// 22 March 2019
export const formatDate = 'D MMMM YYYY';

// 22 March 2019, 17:05 BST
export const formatDateAndTime = 'D MMMM YYYY, HH:mm z';
