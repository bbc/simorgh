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

const sanitiseDuration = (duration: ISODuration) => {
  const durationApi = globalThis.Temporal?.Duration;

  if (!durationApi) {
    return { total: () => 0 };
  }

  try {
    return durationApi.from(duration);
  } catch {
    return durationApi.from('PT0S'); // fallback to 0 seconds if the duration is invalid
  }
};

// Extra confirmation
// const normaliseLocale = (locale?: string): string | undefined => {
//   if (!locale) return undefined;
//   const transformedLocaleToBCP47LangTag = locale.replace(/_/g, '-');
//   try {
//     return Intl.getCanonicalLocales(transformedLocaleToBCP47LangTag)[0];
//   } catch {
//     return undefined;
//   }
// };

const transformLocaleToBCP47LangTag = (locale: Locale) =>
  locale.replace(/_/g, '-');

export const formatDuration = ({
  duration,
  format,
  locale = 'en-gb',
}: {
  duration: ISODuration;
  format?: string;
  locale?: Locale;
}): string => {
  const formattedLocale = transformLocaleToBCP47LangTag(locale) || undefined;

  const totalSeconds = sanitiseDuration(duration).total({
    unit: 'seconds',
  });
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  // note, using Intl.NumberFormat and Intl.Locale does not take into account overrides in psammead-locales/moment
  const translateDigits = (timeValueAsNumber: number, minDigits: number) =>
    // Using this instead of src/app/legacy/psammead/psammead-locales/src/numerals/index.js since this is a safe usecase.
    new Intl.NumberFormat(formattedLocale, {
      minimumIntegerDigits: minDigits,
      useGrouping: false,
    }).format(timeValueAsNumber);

  const withArabicComma = (str: string) => {
    if (!formattedLocale) return str;
    return new Intl.Locale(formattedLocale).maximize().script === 'Arab'
      ? str.replace(/,/g, '\u060C')
      : str;
  };

  if (format) {
    return withArabicComma(
      format
        .replace('h', translateDigits(hours, 1))
        .replace('mm', translateDigits(minutes, 2))
        .replace('ss', translateDigits(seconds, 2))
        .replace('m', translateDigits(minutes, 1)),
    );
  }

  return withArabicComma(
    hours > 0
      ? `${translateDigits(hours, 1)}:${translateDigits(minutes, 2)}:${translateDigits(seconds, 2)}`
      : `${translateDigits(minutes, 2)}:${translateDigits(seconds, 2)}`,
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
