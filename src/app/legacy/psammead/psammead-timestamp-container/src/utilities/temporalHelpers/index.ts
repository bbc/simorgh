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

// Mirrors the digit conversion done by each Moment locale's postformat
export const LOCALE_NUMBERING_SYSTEM_OVERRIDES: Record<
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
  const durationApi = globalThis.Temporal?.Duration;

  if (!durationApi) {
    return { total: () => 0 };
  }

  try {
    const parsedDuration = durationApi.from(duration);

    if (
      parsedDuration.sign === -1 ||
      parsedDuration.years ||
      parsedDuration.months ||
      parsedDuration.weeks
    ) {
      return durationApi.from('PT0S');
    }

    return parsedDuration;
  } catch {
    return durationApi.from('PT0S');
  }
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
  const localeKey = sanitisedLocale.toLowerCase();
  const languageCode = localeKey.split('-')[0];
  const localeOverride =
    LOCALE_NUMBERING_SYSTEM_OVERRIDES[localeKey] ??
    LOCALE_NUMBERING_SYSTEM_OVERRIDES[languageCode];
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
