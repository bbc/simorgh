import {
  EasternArabic,
  makeNumeralTranslator,
} from '#psammead/psammead-locales/src/numerals';

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

const translateEasternArabicNumerals = makeNumeralTranslator(EasternArabic);

const LOCALE_NUMBERING_SYSTEM_OVERRIDES: Record<
  string,
  LocaleNumberingSystemOverride
> = {
  ar: {
    locale: 'ar-u-nu-latn',
    numberingSystem: 'latn',
  },
  ps: {
    locale: 'ps-u-nu-arabext',
    numberingSystem: 'arabext',
    fallback: translateEasternArabicNumerals,
  },
};

export const sanitiseDuration = (duration: ISODuration) => {
  const durationApi = globalThis.Temporal?.Duration;

  if (!durationApi) {
    return { total: () => 0 };
  }

  try {
    return durationApi.from(duration);
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

export const withArabicComma = (string: string) => {
  return string.replace(/,/g, '،');
};

export const translateDigits = (
  value: number,
  minDigits: number,
  sanitisedLocale: Locale,
) => {
  const localeOverride = LOCALE_NUMBERING_SYSTEM_OVERRIDES[sanitisedLocale];
  const numberFormatter = new Intl.NumberFormat(
    localeOverride?.locale ?? sanitisedLocale,
    {
      minimumIntegerDigits: minDigits,
      useGrouping: false,
    },
  );
  const returnedValue = numberFormatter.format(value);

  if (
    localeOverride?.fallback &&
    numberFormatter.resolvedOptions().numberingSystem !==
      localeOverride.numberingSystem
  ) {
    return localeOverride.fallback(returnedValue);
  }

  return returnedValue;
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
    return format
      .replace('h', values.h)
      .replace('mm', values.mm)
      .replace('ss', values.ss)
      .replace('m', values.m);
  }

  return hours > 0
    ? `${values.h}:${values.mm}:${values.ss}`
    : `${values.mm}:${values.ss}`;
};
