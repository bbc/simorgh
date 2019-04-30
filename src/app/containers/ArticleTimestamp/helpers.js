import moment from 'moment-timezone'; // Can you remove this?
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

export const formatType = timestamps => {
  if (isToday(timestamps[0])) {
    if (timestamps.length > 1 && !isSameDay(timestamps[1], timestamps[0])) {
      return formatDate;
    }
    return formatDateAndTime;
  }
  return formatDate;
};
