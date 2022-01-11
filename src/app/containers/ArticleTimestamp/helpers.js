import moment from 'moment-timezone';
import isTenHoursAgo from '#lib/utilities/isTenHoursAgo';
import { formatDate, formatDateAndTime } from './timeFormats';

export const isFirstRelative = (lastPublished, firstPublished) =>
  lastPublished === firstPublished && isTenHoursAgo(firstPublished);

export const isLastRelative = lastPublished => isTenHoursAgo(lastPublished);

export const isSameDay = (dayToCompare, timestamp) => {
  const day = moment(dayToCompare);
  return day.isSame(timestamp, 'day');
};

export const isToday = timestamp => isSameDay(Date.now(), timestamp);

export const formatType = ({
  lastPublished = null,
  firstPublished,
  datetimeLocale = 'en-gb',
}) => {
  if (isToday(lastPublished) || isToday(firstPublished)) {
    if (
      lastPublished &&
      firstPublished &&
      !isSameDay(lastPublished, firstPublished)
    ) {
      return formatDate(datetimeLocale);
    }
    return formatDateAndTime(datetimeLocale);
  }
  return formatDate(datetimeLocale);
};

export const isValidDateTime = dateTime => {
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(dateTime) || dateTime === null) {
    return false;
  }
  return !isNaN(new Date(dateTime)); // eslint-disable-line no-restricted-globals
};
