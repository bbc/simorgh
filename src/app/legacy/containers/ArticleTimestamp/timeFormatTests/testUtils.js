import moment from 'moment-timezone';
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
    // 2018-10-10T16:20:25.274Z
    time: 1539188425274,
    isRelative: false,
    dateTimeFormat: formatDate,
  },
  'exact date and time with timezone': {
    // 2019-07-12T12:55:58.365Z
    time: 1562936158365,
    isRelative: false,
    dateTimeFormat: formatDateAndTime,
  },
};

export const format = ({ datetimeLocale, timezone, fixture, altCalendar }) => {
  const { time, isRelative, dateTimeFormat } = timestampsFixtures[fixture];
  const dateWithTimezone = moment.tz(time, timezone).locale(datetimeLocale);

  if (isRelative) {
    return dateWithTimezone.fromNow();
  }

  const formatted = dateWithTimezone.format(dateTimeFormat(datetimeLocale));

  if (altCalendar) {
    const altCalendarFormatted = altCalendar.formatDate(dateWithTimezone);

    return `${altCalendarFormatted} - ${formatted}`;
  }

  return formatted;
};
