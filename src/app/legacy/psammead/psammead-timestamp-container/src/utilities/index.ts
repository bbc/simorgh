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

const normaliseLocale = (locale?: string): string | undefined => {
  if (!locale) return undefined;
  const transformed = locale.replace(/_/g, '-'); // transforms Locale To BCP 47 Lang Tag
  try {
    return new Intl.Locale(transformed).baseName; // alterntaive to Intl.getCanonicalLocales(transformedLocaleToBCP47LangTag)[0] - or just returning transformed and risking this being rejected further on
  } catch {
    return undefined;
  }
};

// Locales that use Arabic script and require Arabic comma (U+060C)
const ARABIC_SCRIPT_LOCALES = new Set(['ar', 'fa', 'ps', 'ur']);

const withArabicComma = (str: string, locale?: string) => {
  if (!locale) return str;
  // Extract language code (e.g., 'fa' from 'fa-AF', 'ar' from 'ar-EG')
  const langCode = locale.split('-')[0];
  return ARABIC_SCRIPT_LOCALES.has(langCode)
    ? str.replace(/,/g, '\u060C')
    : str;
};

export const formatDuration = ({
  duration, // seconds, see moment.duration(readTimeValue, 'minutes').toISOString() in Readtime,
  format, // examples are 'hh:mm:ss', 'mm:ss', 'm', 's' - see more https://momentjs.com/docs/#:~:text=Hour%2C%20minute%2C%20second%2C%20millisecond%2C%20and%20offset%20tokens
  locale = 'en-gb', // this is commonly datetimeLocale which is not BCP 47 language tag
}: {
  duration: ISODuration;
  format?: string;
  locale?: Locale;
}): string => {
  // This is needed since some of the locales in our config do not match the BCP 47 language tag format, which is required by methods like Intl.NumberFormat and Intl.Locale.
  const formattedLocale = normaliseLocale(locale);

  const totalSeconds = sanitiseDuration(duration).total({
    unit: 'seconds',
  });
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  // note, using Intl.NumberFormat and Intl.Locale does not take into account overrides in psammead-locales/moment
  // this is ok for duration I think since the only logic in them which affects duration is the Arabic comma.
  const translateDigits = (timeValueAsNumber: number, minDigits: number) =>
    // Using this instead of src/app/legacy/psammead/psammead-locales/src/numerals/index.js since this is a safe usecase.
    new Intl.NumberFormat(formattedLocale, {
      minimumIntegerDigits: minDigits,
      useGrouping: false,
    }).format(timeValueAsNumber);

  if (format) {
    return withArabicComma(
      format
        .replace('h', translateDigits(hours, 1))
        .replace('mm', translateDigits(minutes, 2))
        .replace('ss', translateDigits(seconds, 2))
        .replace('m', translateDigits(minutes, 1)),
      formattedLocale,
    );
  }

  return withArabicComma(
    hours > 0
      ? `${translateDigits(hours, 1)}:${translateDigits(minutes, 2)}:${translateDigits(seconds, 2)}`
      : `${translateDigits(minutes, 2)}:${translateDigits(seconds, 2)}`,
    formattedLocale,
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
