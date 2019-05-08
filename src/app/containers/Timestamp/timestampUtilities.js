import moment from 'moment-timezone';
import relativeTime from './relativeTimestamp';

const defaultFormat = 'D MMMM YYYY, HH:mm z';

// if the date is invalid return false - https://stackoverflow.com/questions/1353684/detecting-an-invalid-date-date-instance-in-javascript#answer-1353711
export const isValidDateTime = dateTime => {
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(dateTime) || dateTime === null) {
    return false;
  }
  return !isNaN(new Date(dateTime)); // eslint-disable-line no-restricted-globals
};

export const formatUnixTimestamp = (timestamp, momentString) =>
  moment(timestamp).format(momentString);

export const showRelativeTime = (timestamp, isRelative, format) => {
  if (isRelative) {
    return relativeTime(timestamp);
  }
  if (format) {
    return formatUnixTimestamp(timestamp, format);
  }
  return formatUnixTimestamp(timestamp, defaultFormat);
};
