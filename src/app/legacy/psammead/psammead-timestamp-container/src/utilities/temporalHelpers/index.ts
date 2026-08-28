type Locale = string;
type ISODuration = string;

export const sanitiseDuration = (duration: ISODuration) => {
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

export const sanitiseLocale = (locale: Locale): string => {
  const transformed = locale.replace(/_/g, '-'); // transforms Locale To BCP 47 Lang Tag
  try {
    return new Intl.Locale(transformed).baseName; // alterntaive to Intl.getCanonicalLocales(transformedLocaleToBCP47LangTag)[0] - or just returning transformed and risking this being rejected further on
  } catch {
    return 'en-GB';
  }
};

export const withArabicComma = (string: string) => {
  return string.replace(/,/g, '،');
};

const translateDigits = (
  value: number,
  minDigits: number,
  sanitisedLocale: Locale,
) =>
  new Intl.NumberFormat(sanitisedLocale, {
    minimumIntegerDigits: minDigits,
    useGrouping: false,
  }).format(value);

// note, using Intl.NumberFormat and Intl.Locale does not take into account overrides in psammead-locales/moment
// this is ok for duration I think since the only logic in them which affects duration is the Arabic comma.

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
