import moment from 'moment-timezone';

// Note that this next section is globally configuring moment.
// It is not possible to configure these on specific moment instances.
// The current requirements for rounding & thresholding are the same universally
// so this implementation method means that configuration is only run once, not
// on each render.

// always round downwards
// 59 minutes, 59 seconds ago -> 59 minutes ago
// https://momentjs.com/docs/#/customization/relative-time-rounding/
moment.relativeTimeRounding(Math.floor);
// Smallest relative timestamp is 'a minute ago'
// Otherwise, be exact
// https://momentjs.com/docs/#/customization/relative-time-threshold/
moment.relativeTimeThreshold('s', 0);
moment.relativeTimeThreshold('m', 60);
moment.relativeTimeThreshold('h', 24);
moment.relativeTimeThreshold('d', 30);
moment.relativeTimeThreshold('M', 12);

export const formatDuration = ({ duration, format, locale = 'en-gb' }) => {
  const defaultDurationFormat = duration.includes('H') ? 'h:mm:ss' : 'mm:ss';
  const durationInMilliseconds = moment.duration(duration).asMilliseconds();
  return moment
    .utc(durationInMilliseconds)
    .locale(locale)
    .format(format || defaultDurationFormat);
};

// if the date is invalid return false - https://stackoverflow.com/questions/1353684/detecting-an-invalid-date-date-instance-in-javascript#answer-1353711
export const isValidDateTime = dateTime => {
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(dateTime) || dateTime === null) {
    return false;
  }
  return !isNaN(new Date(dateTime)); // eslint-disable-line no-restricted-globals
};

// when using the following 2 functions, we recommend using webpack configuration to only load in the relevant timezone, rather than all of moment-timezone
export const localisedMoment = ({ locale, timestamp }) => {
  return moment(timestamp).locale(locale);
};

export const formatUnixTimestamp = ({
  format,
  isRelative,
  locale,
  timestamp,
  timezone,
}) => {
  if (!timestamp) return undefined;

  const momentObj = moment(timestamp).locale(locale).tz(timezone);

  if (isRelative) {
    return momentObj.fromNow();
  }
  const defaultFormat = 'LL, LT z';
  return format ? momentObj.format(format) : momentObj.format(defaultFormat);
};
