import * as moment from 'moment-timezone';
import { timestampGenerator } from '../testHelpers';
import { formatDate, formatDateAndTime } from '../timeFormats';

export const timestampsFixtures = {
  'one minute ago': {
    time: timestampGenerator({ minutes: 1 }),
    isRelative: true,
  },
  'five minutes ago': {
    time: timestampGenerator({ minutes: 5 }),
    isRelative: true,
  },
  'one hour ago': {
    time: timestampGenerator({ hours: 1 }),
    isRelative: true,
  },
  'five hours ago': {
    time: timestampGenerator({ hours: 5 }),
    isRelative: true,
  },
  'exact date': {
    time: 1539188425274,
    isRelative: false,
    dateTimeFormat: formatDate,
  },
  'exact date and time with timezone': {
    time: 1562936158365,
    isRelative: false,
    dateTimeFormat: formatDateAndTime,
  },
};

export const format = (datetimeLocale, timezone, timeStamp) => {
  return timestampsFixtures[timeStamp].isRelative
    ? moment
        .tz(timestampsFixtures[timeStamp].time, timezone)
        .locale(datetimeLocale)
        .fromNow()
    : moment
        .tz(timestampsFixtures[timeStamp].time, timezone)
        .locale(datetimeLocale)
        .format(timestampsFixtures[timeStamp].dateTimeFormat(datetimeLocale));
};
