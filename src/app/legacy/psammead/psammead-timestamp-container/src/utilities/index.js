import 'temporal-polyfill/global';
import moment from 'moment-timezone';

const createDateAdapter = () => ({
  // Temporary seam for gradual Temporal adoption in follow-up PRs.
  createLocalisedMoment: ({ locale, timestamp }) =>
    moment(timestamp).locale(locale),
  createMomentInTimezone: ({ locale, timestamp, timezone }) =>
    moment(timestamp).locale(locale).tz(timezone),
  formatDuration: ({ duration, format, locale }) => {
    const bcp47Locale = locale?.replace(/_/g, '-');
    const safeDuration = (() => {
      try {
        return globalThis.Temporal.Duration.from(duration);
      } catch {
        return globalThis.Temporal.Duration.from('PT0S');
      }
    })();
    const totalSeconds = safeDuration.total({
      unit: 'seconds',
    });
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);

    const localeDigits = (n, minDigits) =>
      new Intl.NumberFormat(bcp47Locale, {
        minimumIntegerDigits: minDigits,
        useGrouping: false,
      }).format(n);

    const withArabicComma = str =>
      new Intl.Locale(bcp47Locale).maximize().script === 'Arab'
        ? str.replace(/,/g, '\u060C')
        : str;

    if (format) {
      return withArabicComma(
        format
          .replace('h', localeDigits(hours, 1))
          .replace('mm', localeDigits(minutes, 2))
          .replace('ss', localeDigits(seconds, 2)),
      );
    }

    return withArabicComma(
      hours > 0
        ? `${localeDigits(hours, 1)}:${localeDigits(minutes, 2)}:${localeDigits(seconds, 2)}`
        : `${localeDigits(minutes, 2)}:${localeDigits(seconds, 2)}`,
    );
  },
  // Exposed to make Temporal available at runtime without changing behavior yet.
  toTemporalInstant: timestamp =>
    globalThis.Temporal?.Instant?.fromEpochMilliseconds(timestamp),
});

const dateAdapter = createDateAdapter();

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
  return dateAdapter.formatDuration({
    duration,
    format,
    locale,
  });
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
  return dateAdapter.createLocalisedMoment({
    locale,
    timestamp,
  });
};

export const formatUnixTimestamp = ({
  format,
  isRelative,
  locale,
  timestamp,
  timezone,
}) => {
  if (!timestamp) return undefined;

  const momentObj = dateAdapter.createMomentInTimezone({
    locale,
    timestamp,
    timezone,
  });

  if (isRelative) {
    return momentObj.fromNow();
  }

  return momentObj.format(format || 'LL, LT z');
};
