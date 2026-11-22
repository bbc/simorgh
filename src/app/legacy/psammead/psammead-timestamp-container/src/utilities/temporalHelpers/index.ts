import {
  Bengali,
  Burmese,
  EasternArabic,
  Nepali,
  makeNumeralTranslator,
} from '#app/lib/locales/numerals/index';

type Locale = string;
type ISODuration = string;

// the only substrings applyFormat replaces - anything else in a format string is left as literal text
type DurationFormatToken = 'h' | 'mm' | 'm' | 'ss';
type DurationFormatSeparator = ':' | ',';
export type DurationFormat =
  | DurationFormatToken
  | `${DurationFormatToken}${DurationFormatSeparator}${DurationFormatToken}`
  | `${DurationFormatToken}${DurationFormatSeparator}${DurationFormatToken}${DurationFormatSeparator}${DurationFormatToken}`;

type LocaleNumberingSystemOverride = {
  locale: string;
  numberingSystem: string;
  fallback?: (value: string) => string;
};

export const withArabicComma = (string: string) => {
  return string.replace(/,/g, '،');
};

const translateEasternArabicNumerals = makeNumeralTranslator(EasternArabic);
const translateBengaliNumerals = makeNumeralTranslator(Bengali);
const translateBurmeseNumerals = makeNumeralTranslator(Burmese);
const translateNepaliNumerals = makeNumeralTranslator(Nepali);

const ISO_DURATION_PATTERN =
  /^\+?P(?:(\d+(?:[.,]\d{1,9})?)D)?(?:T(?:(\d+(?:[.,]\d{1,9})?)H)?(?:(\d+(?:[.,]\d{1,9})?)M)?(?:(\d+(?:[.,]\d{1,9})?)S)?)?$/i;
const NANOSECONDS_PER_SECOND = 1_000_000_000;

const durationPartToSeconds = (
  value: string | undefined,
  secondsPerUnit: number,
) => {
  if (!value) return 0;

  const seconds = Number(value.replace(',', '.')) * secondsPerUnit;
  return Math.round(seconds * NANOSECONDS_PER_SECOND) / NANOSECONDS_PER_SECOND;
};

// Mirrors the digit conversion done by each Moment locale's postformat
const LOCALE_NUMBERING_SYSTEM_OVERRIDES: Record<
  string,
  LocaleNumberingSystemOverride
> = {
  ar: { locale: 'ar-u-nu-latn', numberingSystem: 'latn' },
  bn: {
    locale: 'bn-u-nu-beng',
    numberingSystem: 'beng',
    fallback: translateBengaliNumerals,
  },
  gu: { locale: 'gu-u-nu-latn', numberingSystem: 'latn' },
  hi: { locale: 'hi-u-nu-latn', numberingSystem: 'latn' },
  mr: { locale: 'mr-u-nu-latn', numberingSystem: 'latn' },
  my: {
    locale: 'my-u-nu-mymr',
    numberingSystem: 'mymr',
    fallback: translateBurmeseNumerals,
  },
  ne: {
    locale: 'ne-u-nu-deva',
    numberingSystem: 'deva',
    fallback: translateNepaliNumerals,
  },
  'pa-IN': { locale: 'pa-IN-u-nu-latn', numberingSystem: 'latn' },
  ps: {
    locale: 'ps-u-nu-arabext',
    numberingSystem: 'arabext',
    fallback: translateEasternArabicNumerals,
  },
  ta: { locale: 'ta-u-nu-latn', numberingSystem: 'latn' },
};

export const sanitiseDuration = (duration: ISODuration) => {
  const match = ISO_DURATION_PATTERN.exec(duration);
  const [, days, hours, minutes, seconds] = match ?? [];
  const hasDuration = [days, hours, minutes, seconds].some(Boolean);
  const hasInvalidFraction =
    Boolean(days?.match(/[.,]/)) ||
    (Boolean(hours?.match(/[.,]/)) && [minutes, seconds].some(Boolean)) ||
    (Boolean(minutes?.match(/[.,]/)) && Boolean(seconds));

  const totalSeconds =
    hasDuration && !hasInvalidFraction
      ? durationPartToSeconds(days, 86400) +
        durationPartToSeconds(hours, 3600) +
        durationPartToSeconds(minutes, 60) +
        durationPartToSeconds(seconds, 1)
      : 0;

  return { total: (_options?: { unit: 'seconds' }) => totalSeconds };
};

export const sanitiseLocale = (locale: Locale): string => {
  const transformed = locale.replace(/_/g, '-');
  try {
    return new Intl.Locale(transformed).baseName;
  } catch {
    return 'en-GB';
  }
};

export const translateDigits = (
  value: number,
  minDigits: number,
  sanitisedLocale: Locale,
) => {
  const localeOverride = LOCALE_NUMBERING_SYSTEM_OVERRIDES[sanitisedLocale];
  const formatter = new Intl.NumberFormat(
    localeOverride?.locale ?? sanitisedLocale,
    {
      minimumIntegerDigits: minDigits,
      useGrouping: false,
    },
  );
  const formattedDigits = formatter.format(value);

  if (!localeOverride?.fallback) return formattedDigits;

  const matchesExpectedSystem =
    formatter.resolvedOptions().numberingSystem ===
    localeOverride.numberingSystem;

  return matchesExpectedSystem
    ? formattedDigits
    : localeOverride.fallback(formattedDigits);
};

export const applyFormat = ({
  format,
  hours,
  minutes,
  seconds,
  sanitisedLocale,
}: {
  format?: DurationFormat;
  hours: number;
  minutes: number;
  seconds: number;
  sanitisedLocale: Locale;
}) => {
  const values = {
    h: translateDigits(hours, 1, sanitisedLocale),
    mm: translateDigits(minutes, 2, sanitisedLocale),
    m: translateDigits(minutes, 1, sanitisedLocale),
    ss: translateDigits(seconds, 2, sanitisedLocale),
  };

  if (format) {
    return format.replace(
      /mm|ss|h|m/g,
      token => values[token as DurationFormatToken],
    );
  }

  return hours > 0
    ? `${values.h}:${values.mm}:${values.ss}`
    : `${values.mm}:${values.ss}`;
};
