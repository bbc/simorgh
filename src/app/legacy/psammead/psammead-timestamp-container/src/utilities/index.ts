import moment from 'moment-timezone';

type Locale = string;
type ISODuration = string;

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

const safeDuration = (duration: ISODuration) => {
  try {
    return globalThis.Temporal.Duration.from(duration);
  } catch {
    return globalThis.Temporal.Duration.from('PT0S'); // fallback to 0 seconds if the duration is invalid
  }
};

export const formatDuration = ({
  duration,
  format,
  locale = 'en-gb',
}: {
  duration: ISODuration;
  format?: string;
  locale?: Locale;
}): string => {
  const bcp47Locale = locale?.replace(/_/g, '-') || undefined;

  const totalSeconds = safeDuration(duration).total({
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

  const withArabicComma = str => {
    if (!bcp47Locale) return str;
    return new Intl.Locale(bcp47Locale).maximize().script === 'Arab'
      ? str.replace(/,/g, '\u060C')
      : str;
  };

  if (format) {
    return withArabicComma(
      format
        .replace('h', localeDigits(hours, 1))
        .replace('mm', localeDigits(minutes, 2))
        .replace('ss', localeDigits(seconds, 2))
        .replace('m', localeDigits(minutes, 1)),
    );
  }

  return withArabicComma(
    hours > 0
      ? `${localeDigits(hours, 1)}:${localeDigits(minutes, 2)}:${localeDigits(seconds, 2)}`
      : `${localeDigits(minutes, 2)}:${localeDigits(seconds, 2)}`,
  );
};

// if the date is invalid return false - https://stackoverflow.com/questions/1353684/detecting-an-invalid-date-date-instance-in-javascript#answer-1353711
export const isValidDateTime = (dateTime: unknown): boolean => {
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(dateTime as number) || dateTime === null) {
    return false;
  }
  return !isNaN(new Date(dateTime as number).getTime()); // eslint-disable-line no-restricted-globals
};

// when using the following 2 functions, we recommend using webpack configuration to only load in the relevant timezone, rather than all of moment-timezone
export const localisedMoment = ({
  locale,
  timestamp,
}: {
  locale: Locale;
  timestamp: number;
}): moment.Moment => {
  return moment(timestamp).locale(locale);
};

export const formatUnixTimestamp = ({
  format,
  isRelative,
  locale,
  timestamp,
  timezone,
}: {
  format?: string | null;
  isRelative?: boolean;
  locale?: Locale;
  timestamp?: number;
  timezone?: string;
}): string | undefined => {
  if (!timestamp) return undefined;

  const momentObj = moment(timestamp)
    .locale(locale ?? '')
    .tz(timezone ?? '');

  if (isRelative) {
    return momentObj.fromNow();
  }

  return momentObj.format(format || 'LL, LT z');
};
