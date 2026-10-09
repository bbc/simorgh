import {
  LOCALE_NUMBERING_SYSTEM_OVERRIDES,
  sanitiseLocale,
  withArabicComma,
} from '.';
import {
  getEditorialMonthName,
  getEditorialOrdinalDay,
} from './editorialMonthNames';

type Locale = string;

export type TimestampFormat =
  | 'LL, LT z'
  | 'LL'
  | 'D MMMM YYYY, HH:mm z'
  | 'D MMMM YYYY'
  | 'HH:mm'
  | 'YYYY-MM-DD'
  | 'DD MMMM YYYY';

const ARABIC_SCRIPT_LOCALES = new Set(['ar', 'fa', 'ps', 'ur']);

const TIMEZONE_LABEL_OVERRIDES: Record<string, string> = {
  'Africa/Lagos': 'WAT',
  GMT: 'GMT',
};

const OFFSET_TIMEZONE_LABEL = /^(?:GMT|UTC)([+-])(\d{1,2})(?::?(\d{2}))?$/;

const getTimeZone = (timezone?: string) => timezone || 'UTC';

const getLocaleNumberingSystemOverride = (sanitisedLocale: Locale) => {
  const localeKey = sanitisedLocale.toLowerCase();
  const languageCode = localeKey.split('-')[0];

  return (
    LOCALE_NUMBERING_SYSTEM_OVERRIDES[localeKey] ??
    LOCALE_NUMBERING_SYSTEM_OVERRIDES[languageCode]
  );
};

const formatDatePart = ({
  timestamp,
  timezone,
  sanitisedLocale,
  options,
}: {
  timestamp: number;
  timezone?: string;
  sanitisedLocale: Locale;
  options: Intl.DateTimeFormatOptions;
}) => {
  const localeOverride = getLocaleNumberingSystemOverride(sanitisedLocale);
  const formatter = new Intl.DateTimeFormat(
    localeOverride?.locale ?? sanitisedLocale,
    {
      ...options,
      calendar: 'gregory',
      ...(localeOverride
        ? { numberingSystem: localeOverride.numberingSystem }
        : {}),
      timeZone: getTimeZone(timezone),
    },
  );
  const formattedDate = formatter.format(new Date(timestamp));

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
  const editorialMonthName = getEditorialMonthName(sanitisedLocale, monthIndex);

  if (editorialMonthName) return editorialMonthName;

  const localeOverride = getLocaleNumberingSystemOverride(sanitisedLocale);
  const monthPart = new Intl.DateTimeFormat(
    localeOverride?.locale ?? sanitisedLocale,
    {
      calendar: 'gregory',
      day: 'numeric',
      month: 'long',
      ...(localeOverride
        ? { numberingSystem: localeOverride.numberingSystem }
        : {}),
      timeZone: getTimeZone(timezone),
    },
  )
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
  const override = timezone ? TIMEZONE_LABEL_OVERRIDES[timezone] : undefined;

  if (override) return override;

  const sanitisedLocale = sanitiseLocale(locale);
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
  const formatLongDate = () =>
    sanitisedLocale.toLowerCase() === 'zh-tw'
      ? formatDatePart({
          ...dateParts,
          options: { day: 'numeric', month: 'long', year: 'numeric' },
        })
      : `${
          getEditorialOrdinalDay(sanitisedLocale, getDayNumber(dateParts)) ??
          formatDay(dateParts)
        } ${formatMonth(dateParts)} ${formatYear(dateParts)}`;
  const timezoneLabel = () =>
    resolveTimeZoneLabel({ timestamp, timezone, locale });

  const formattedString = (() => {
    switch (format) {
      case 'LL, LT z':
        return `${formatLongDate()}, ${formatTime(dateParts)} ${timezoneLabel()}`;
      case 'LL':
        return formatLongDate();
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
      default:
        throw new Error(`Unsupported timestamp format: ${format}`);
    }
  })();

  return ARABIC_SCRIPT_LOCALES.has(langCode)
    ? withArabicComma(formattedString)
    : formattedString;
};
