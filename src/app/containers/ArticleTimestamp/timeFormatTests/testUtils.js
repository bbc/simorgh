import * as moment from 'moment-timezone';
import { timestampGenerator } from '../testHelpers';
import { formatDate } from '../timeFormats';

export const timestampsFixtures = {
  'exact date': {
    time: 1539188425274,
    isRelative: false,
  },
  'three hours ago': {
    time: timestampGenerator({ hours: 3 }),
    isRelative: true,
  },
  'five hours ago': {
    time: timestampGenerator({ hours: 5 }),
    isRelative: true,
  },
  'eleven hours ago': {
    time: timestampGenerator({ hours: 11 }),
    isRelative: true,
  },
  'twelve hours ago': {
    time: timestampGenerator({ hours: 12 }),
    isRelative: true,
  },
  'twenty four hours ago': {
    time: timestampGenerator({
      hours: 24,
      seconds: 1,
    }),
    isRelative: true,
  },
  'two days ago': {
    time: timestampGenerator({ days: 2 }),
    isRelative: true,
  },
  'three days ago': {
    time: timestampGenerator({ days: 3 }),
    isRelative: true,
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
        .format(formatDate);
};
