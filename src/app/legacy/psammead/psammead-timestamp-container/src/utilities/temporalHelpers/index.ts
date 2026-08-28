type Locale = string;
type ISODuration = string;

// forces Eastern Arabic numerals, matching the explicit override in psammead-locales/moment/ps.js
const LOCALE_NUMBERING_SYSTEM_OVERRIDES: Record<string, string> = {
  ps: 'ps-u-nu-arabext',
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
) =>
  new Intl.NumberFormat(
    LOCALE_NUMBERING_SYSTEM_OVERRIDES[sanitisedLocale] ?? sanitisedLocale,
    {
      minimumIntegerDigits: minDigits,
      useGrouping: false,
    },
  ).format(value);

export const applyFormat = ({
  format,
  hours,
  minutes,
  seconds,
  sanitisedLocale,
}: {
  format?: string;
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
