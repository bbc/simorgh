import { getTimestampLocaleRules } from '#app/lib/locales/timestamp/registry';
import { sanitiseLocale, withArabicComma } from '.';

type Locale = string;

export type TimestampFormat =
  | 'LL, LT z'
  | 'LL'
  | 'LLL'
  | 'D MMMM YYYY, HH:mm z'
  | 'D MMMM YYYY'
  | 'HH:mm'
  | 'YYYY-MM-DD'
  | 'DD MMMM YYYY'
  | 'YYYY年M月D日'
  | 'YYYY年M月DD日';

const ARABIC_SCRIPT_LOCALES = new Set(['ar', 'fa', 'ps', 'ur']);

const DEFAULT_LONG_DATE_PATTERN = 'D MMMM YYYY';

const LONG_DATE_PATTERN_TOKENS = /\[([^\]]*)\]|MMMM|YYYY|D/g;

const DATE_LOCALE_OVERRIDES: Record<string, string> = {
  sr: 'sr-Latn',
};

const NATIVE_LONG_DATE_LOCALES = new Set(['hu', 'ja', 'ko', 'zh-cn', 'zh-tw']);

// GMT is not a region, so Intl reports it as UTC for every locale
const DEFAULT_TIMEZONE_LABELS: Record<string, string> = {
  GMT: 'GMT',
};

const OFFSET_TIMEZONE_LABEL = /^(?:GMT|UTC)([+-])(\d{1,2})(?::?(\d{2}))?$/;

const getTimeZone = (timezone?: string) => timezone || 'UTC';

const getLocaleNumberingSystemOverride = (sanitisedLocale: Locale) =>
  getTimestampLocaleRules(sanitisedLocale)?.numbering;

const getDateLocale = (sanitisedLocale: Locale) => {
  const localeOverride = getLocaleNumberingSystemOverride(sanitisedLocale);

  return (
    localeOverride?.locale ??
    DATE_LOCALE_OVERRIDES[sanitisedLocale.toLowerCase()] ??
    sanitisedLocale
  );
};

const formatDatePart = ({
  timestamp,
  timezone,
  sanitisedLocale,
  options,
  part,
}: {
  timestamp: number;
  timezone?: string;
  sanitisedLocale: Locale;
  options: Intl.DateTimeFormatOptions;
  part?: Intl.DateTimeFormatPartTypes;
}) => {
  const localeOverride = getLocaleNumberingSystemOverride(sanitisedLocale);
  const formatter = new Intl.DateTimeFormat(getDateLocale(sanitisedLocale), {
    ...options,
    calendar: 'gregory',
    ...(localeOverride
      ? { numberingSystem: localeOverride.numberingSystem }
      : {}),
    timeZone: getTimeZone(timezone),
  });
  const formattedDate = part
    ? (formatter
        .formatToParts(new Date(timestamp))
        .find(({ type }) => type === part)?.value ?? '')
    : formatter.format(new Date(timestamp));

  if (!localeOverride?.fallback) return formattedDate;

  const matchesExpectedSystem =
    formatter.resolvedOptions().numberingSystem ===
    localeOverride.numberingSystem;

  return matchesExpectedSystem
    ? formattedDate
    : localeOverride.fallback(formattedDate);
};

const formatYear = ({
  timestamp,
  timezone,
  sanitisedLocale,
}: Omit<Parameters<typeof formatDatePart>[0], 'options'>) =>
  formatDatePart({
    timestamp,
    timezone,
    sanitisedLocale,
    options: { year: 'numeric' },
    part: 'year',
  });

const formatMonth = ({
  timestamp,
  timezone,
  sanitisedLocale,
}: Omit<Parameters<typeof formatDatePart>[0], 'options'>) => {
  const monthIndex =
    Number(
      new Intl.DateTimeFormat('en-US', {
        calendar: 'gregory',
        month: 'numeric',
        timeZone: getTimeZone(timezone),
      }).format(new Date(timestamp)),
    ) - 1;
  const editorialMonthName =
    getTimestampLocaleRules(sanitisedLocale)?.months?.[monthIndex];

  if (editorialMonthName) return editorialMonthName;

  const localeOverride = getLocaleNumberingSystemOverride(sanitisedLocale);
  const monthPart = new Intl.DateTimeFormat(getDateLocale(sanitisedLocale), {
    calendar: 'gregory',
    day: 'numeric',
    month: 'long',
    ...(localeOverride
      ? { numberingSystem: localeOverride.numberingSystem }
      : {}),
    timeZone: getTimeZone(timezone),
  })
    .formatToParts(new Date(timestamp))
    .find(({ type }) => type === 'month')?.value;

  return (
    monthPart ??
    formatDatePart({
      timestamp,
      timezone,
      sanitisedLocale,
      options: { month: 'long' },
    })
  );
};

const getDayNumber = ({
  timestamp,
  timezone,
}: Pick<Parameters<typeof formatDatePart>[0], 'timestamp' | 'timezone'>) =>
  Number(
    new Intl.DateTimeFormat('en-US', {
      calendar: 'gregory',
      day: 'numeric',
      timeZone: getTimeZone(timezone),
    }).format(new Date(timestamp)),
  );

const getHourNumber = ({
  timestamp,
  timezone,
}: Pick<Parameters<typeof formatDatePart>[0], 'timestamp' | 'timezone'>) =>
  Number(
    new Intl.DateTimeFormat('en-US', {
      calendar: 'gregory',
      hour: 'numeric',
      hourCycle: 'h23',
      timeZone: getTimeZone(timezone),
    }).format(new Date(timestamp)),
  );

const getMinuteNumber = ({
  timestamp,
  timezone,
}: Pick<Parameters<typeof formatDatePart>[0], 'timestamp' | 'timezone'>) =>
  Number(
    new Intl.DateTimeFormat('en-US', {
      calendar: 'gregory',
      minute: 'numeric',
      timeZone: getTimeZone(timezone),
    }).format(new Date(timestamp)),
  );

const getChineseMeridiem = ({
  timestamp,
  timezone,
}: Pick<Parameters<typeof formatDatePart>[0], 'timestamp' | 'timezone'>) => {
  const time =
    getHourNumber({ timestamp, timezone }) * 100 +
    getMinuteNumber({
      timestamp,
      timezone,
    });

  if (time < 600) return '凌晨';
  if (time < 900) return '早上';
  if (time < 1130) return '上午';
  if (time < 1230) return '中午';
  if (time < 1800) return '下午';
  return '晚上';
};

const formatDay = ({
  timestamp,
  timezone,
  sanitisedLocale,
}: Omit<Parameters<typeof formatDatePart>[0], 'options'>) =>
  formatDatePart({
    timestamp,
    timezone,
    sanitisedLocale,
    options: { day: 'numeric' },
    part: 'day',
  });

const formatNumericMonth = ({
  timestamp,
  timezone,
  sanitisedLocale,
}: Omit<Parameters<typeof formatDatePart>[0], 'options'>) =>
  formatDatePart({
    timestamp,
    timezone,
    sanitisedLocale,
    options: { month: '2-digit' },
    part: 'month',
  });

const formatMonthNumber = ({
  timestamp,
  timezone,
  sanitisedLocale,
}: Omit<Parameters<typeof formatDatePart>[0], 'options'>) =>
  formatDatePart({
    timestamp,
    timezone,
    sanitisedLocale,
    options: { month: 'numeric' },
    part: 'month',
  });

const formatNumericDay = ({
  timestamp,
  timezone,
  sanitisedLocale,
}: Omit<Parameters<typeof formatDatePart>[0], 'options'>) =>
  formatDatePart({
    timestamp,
    timezone,
    sanitisedLocale,
    options: { day: '2-digit' },
    part: 'day',
  });

const formatTime = ({
  timestamp,
  timezone,
  sanitisedLocale,
}: Omit<Parameters<typeof formatDatePart>[0], 'options'>) =>
  formatDatePart({
    timestamp,
    timezone,
    sanitisedLocale,
    options: { hour: '2-digit', minute: '2-digit', hourCycle: 'h23' },
  });

const applyLongDatePattern = (
  pattern: string,
  values: Record<'D' | 'MMMM' | 'YYYY', string>,
) =>
  pattern.replace(
    LONG_DATE_PATTERN_TOKENS,
    (token, literal?: string) =>
      literal ?? values[token as keyof typeof values],
  );

const getOffsetMinutes = ({
  timestamp,
  timezone,
}: {
  timestamp: number;
  timezone: string;
}) => {
  const parts = new Intl.DateTimeFormat('en-US', {
    calendar: 'gregory',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hourCycle: 'h23',
    timeZone: timezone,
  }).formatToParts(new Date(timestamp));
  const getPart = (type: Intl.DateTimeFormatPartTypes) =>
    Number(parts.find(part => part.type === type)?.value);
  const zonedTimeAsUtc = Date.UTC(
    getPart('year'),
    getPart('month') - 1,
    getPart('day'),
    getPart('hour'),
    getPart('minute'),
  );

  return (zonedTimeAsUtc - Math.floor(timestamp / 60000) * 60000) / 60000;
};

const isDaylightSavingTime = ({
  timestamp,
  timezone,
}: {
  timestamp: number;
  timezone: string;
}) => {
  const year = new Date(timestamp).getUTCFullYear();
  const standardOffset = Math.min(
    getOffsetMinutes({ timestamp: Date.UTC(year, 0, 1), timezone }),
    getOffsetMinutes({ timestamp: Date.UTC(year, 6, 1), timezone }),
  );

  return getOffsetMinutes({ timestamp, timezone }) > standardOffset;
};

const getTimeZoneLabelOverride = ({
  timestamp,
  timezone,
  sanitisedLocale,
}: {
  timestamp: number;
  timezone?: string;
  sanitisedLocale: Locale;
}) => {
  if (!timezone) return undefined;

  const label =
    getTimestampLocaleRules(sanitisedLocale)?.timezoneLabels?.[timezone] ??
    DEFAULT_TIMEZONE_LABELS[timezone];

  if (typeof label !== 'object') return label;

  return isDaylightSavingTime({ timestamp, timezone })
    ? label.daylight
    : label.standard;
};

const normaliseTimeZoneLabel = (label: string) => {
  const match = label.match(OFFSET_TIMEZONE_LABEL);

  if (!match) return label;

  const [, sign, hours, minutes] = match;
  const paddedHours = hours.padStart(2, '0');

  return minutes && minutes !== '00'
    ? `${sign}${paddedHours}${minutes}`
    : `${sign}${paddedHours}`;
};

export const toZonedDateTime = ({
  timestamp,
  timezone,
}: {
  timestamp: number;
  timezone?: string;
}) => {
  const temporalApi = globalThis.Temporal;

  if (!temporalApi) return undefined;

  return temporalApi.Instant.fromEpochMilliseconds(
    timestamp,
  ).toZonedDateTimeISO(getTimeZone(timezone));
};

export const resolveTimeZoneLabel = ({
  timestamp,
  timezone,
  locale = 'en-gb',
}: {
  timestamp: number;
  timezone?: string;
  locale?: Locale;
}) => {
  const sanitisedLocale = sanitiseLocale(locale);
  const override = getTimeZoneLabelOverride({
    timestamp,
    timezone,
    sanitisedLocale,
  });

  if (override) return override;

  const parts = new Intl.DateTimeFormat(sanitisedLocale, {
    timeZone: getTimeZone(timezone),
    timeZoneName: 'short',
  }).formatToParts(new Date(timestamp));
  const label = parts.find(({ type }) => type === 'timeZoneName')?.value ?? '';

  return normaliseTimeZoneLabel(label);
};

export const formatTimestampToken = ({
  format,
  timestamp,
  timezone,
  locale = 'en-gb',
}: {
  format: TimestampFormat;
  timestamp: number;
  timezone?: string;
  locale?: Locale;
}) => {
  const sanitisedLocale = sanitiseLocale(locale);
  const dateParts = { timestamp, timezone, sanitisedLocale };
  const langCode = sanitisedLocale.split('-')[0];
  const formatLongDate = () => {
    if (NATIVE_LONG_DATE_LOCALES.has(sanitisedLocale.toLowerCase())) {
      return formatDatePart({
        ...dateParts,
        options: { day: 'numeric', month: 'long', year: 'numeric' },
      });
    }

    const rules = getTimestampLocaleRules(sanitisedLocale);

    return applyLongDatePattern(rules?.longDate ?? DEFAULT_LONG_DATE_PATTERN, {
      D: rules?.ordinalDay?.(getDayNumber(dateParts)) ?? formatDay(dateParts),
      MMMM: formatMonth(dateParts),
      YYYY: formatYear(dateParts),
    });
  };
  const formatLongDateTime = () => {
    const localeKey = sanitisedLocale.toLowerCase();

    if (localeKey === 'ko') {
      return formatDatePart({
        ...dateParts,
        options: {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
          hourCycle: 'h12',
        },
      });
    }

    if (localeKey === 'zh-cn') {
      const hour = getHourNumber(dateParts);
      const minute = getMinuteNumber(dateParts);

      return `${formatLongDate()}${getChineseMeridiem(
        dateParts,
      )}${hour % 12 || 12}点${String(minute).padStart(2, '0')}分`;
    }

    if (localeKey === 'hu') {
      return `${formatLongDate()} ${formatDatePart({
        ...dateParts,
        options: { hour: 'numeric', minute: '2-digit', hourCycle: 'h23' },
      })}`;
    }

    return `${formatLongDate()} ${formatTime(dateParts)}`;
  };
  const timezoneLabel = () =>
    resolveTimeZoneLabel({ timestamp, timezone, locale });

  const formattedString = (() => {
    switch (format) {
      case 'LL, LT z':
        return `${formatLongDate()}, ${formatTime(dateParts)} ${timezoneLabel()}`;
      case 'LL':
        return formatLongDate();
      case 'LLL':
        return formatLongDateTime();
      case 'D MMMM YYYY, HH:mm z':
        return `${formatDay(dateParts)} ${formatMonth(dateParts)} ${formatYear(
          dateParts,
        )}, ${formatTime(dateParts)} ${timezoneLabel()}`;
      case 'D MMMM YYYY':
        return `${formatDay(dateParts)} ${formatMonth(dateParts)} ${formatYear(
          dateParts,
        )}`;
      case 'DD MMMM YYYY':
        return `${formatNumericDay(dateParts)} ${formatMonth(
          dateParts,
        )} ${formatYear(dateParts)}`;
      case 'HH:mm':
        return formatTime(dateParts);
      case 'YYYY-MM-DD':
        return `${formatYear(dateParts)}-${formatNumericMonth(
          dateParts,
        )}-${formatNumericDay(dateParts)}`;
      case 'YYYY年M月D日':
        return `${formatYear(dateParts)}年${formatMonthNumber(
          dateParts,
        )}月${formatDay(dateParts)}日`;
      case 'YYYY年M月DD日':
        return `${formatYear(dateParts)}年${formatMonthNumber(
          dateParts,
        )}月${formatNumericDay(dateParts)}日`;
      default:
        throw new Error(`Unsupported timestamp format: ${format}`);
    }
  })();

  return ARABIC_SCRIPT_LOCALES.has(langCode)
    ? withArabicComma(formattedString)
    : formattedString;
};
