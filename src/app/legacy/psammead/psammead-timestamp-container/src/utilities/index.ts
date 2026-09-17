import moment from 'moment-timezone';
import {
  sanitiseDuration,
  sanitiseLocale,
  applyFormat,
  withArabicComma,
  DurationFormat,
} from './temporalHelpers';

type Locale = string;
type ISODuration = string;

// Locales that use Arabic script and require Arabic comma
const ARABIC_SCRIPT_LOCALES = new Set(['ar', 'fa', 'ps', 'ur']);

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

export const formatDuration = ({
  duration,
  format,
  locale = 'en-gb',
}: {
  duration: ISODuration;
  format?: DurationFormat;
  locale?: Locale;
}): string => {
  const sanitisedLocale = sanitiseLocale(locale);

  const totalSeconds = sanitiseDuration(duration).total({
    unit: 'seconds',
  });
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  const formattedString = applyFormat({
    format,
    hours,
    minutes,
    seconds,
    sanitisedLocale,
  });

  // Extract language code (e.g., 'fa' from 'fa-AF', 'ar' from 'ar-EG')
  const langCode = locale.split('-')[0];
  if (ARABIC_SCRIPT_LOCALES.has(langCode)) {
    return withArabicComma(formattedString);
  }
  return formattedString;
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
