import moment from 'moment-timezone';
import { formatDate, formatDateAndTime } from './timeFormats';

export const isTenHoursAgoOrLess = milliseconds => {
  const now = Date.now();
  return now - milliseconds <= 10 * 60 * 60 * 1000;
};

export const isFirstRelative = (lastPublished, firstPublished) =>
  lastPublished === firstPublished && isTenHoursAgoOrLess(firstPublished);

export const isLastRelative = lastPublished =>
  isTenHoursAgoOrLess(lastPublished);

export const isSameDay = (dayToCompare, timestamp) => {
  const day = moment(dayToCompare);
  return day.isSame(timestamp, 'day');
};

export const isToday = timestamp => isSameDay(Date.now(), timestamp);

export const formatType = ({ lastPublished = null, firstPublished }) => {
  if (isToday(lastPublished) || isToday(firstPublished)) {
    if (
      lastPublished &&
      firstPublished &&
      !isSameDay(lastPublished, firstPublished)
    ) {
      return formatDate;
    }
    return formatDateAndTime;
  }
  return formatDate;
};

export const isValidDateTime = dateTime => {
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(dateTime) || dateTime === null) {
    return false;
  }
  return !isNaN(new Date(dateTime)); // eslint-disable-line no-restricted-globals
};
