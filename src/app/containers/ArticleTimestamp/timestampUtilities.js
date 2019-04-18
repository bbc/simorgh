import { formatDate, formatDateAndTime } from './timeFormats';

export const isTenHoursAgoOrLess = (milliseconds) => {
  const now = Date.now();
  return now - milliseconds <= 10 * 60 * 60 * 1000;
};

// if the date is invalid return false - https://stackoverflow.com/questions/1353684/detecting-an-invalid-date-date-instance-in-javascript#answer-1353711
export const isValidDateTime = dateTime => {
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(dateTime) || dateTime === null) {
    return false;
  }
  return !isNaN(new Date(dateTime)); // eslint-disable-line no-restricted-globals
};

export const constructTimestamp = timeDiffMins => {
  let timeDiff;
  let unit;

  if (timeDiffMins >= 60) {
    timeDiff = parseInt(timeDiffMins / 60, 10);
    unit = timeDiff > 1 ? 'hours' : 'hour';
  } else {
    timeDiff = timeDiffMins <= 1 ? 1 : timeDiffMins;
    unit = timeDiff === 1 ? 'minute' : 'minutes';
  }

  return `${timeDiff} ${unit} ago`;
};

export const relativeTime = receivedTimestamp => {
  const currentTime = Date.now();
  const timeDifferenceMilliseconds = currentTime - receivedTimestamp;
  const timeDifferenceMinutes = parseInt(
    timeDifferenceMilliseconds / (1000 * 60),
    10,
  );

  const isInFuture = timeDifferenceMilliseconds < 0;
  const isMoreThanTenHoursAgo = timeDifferenceMinutes > 10 * 60;

  if (isInFuture || isMoreThanTenHoursAgo) {
    return null;
  }

  return constructTimestamp(timeDifferenceMinutes);
};

export const isToday = timestamp => {
  const today = new Date(Date.now());
  const timestampDay = new Date(timestamp);
  const todayDate = `${today.getDay()}/${today.getMonth()}/${today.getFullYear()}`;
  const timestampDate = `${timestampDay.getDay()}/${timestampDay.getMonth()}/${timestampDay.getFullYear()}`;
  return todayDate === timestampDate;
};

export const formatType = timestamp =>
  isToday(timestamp) ? formatDateAndTime : formatDate;

