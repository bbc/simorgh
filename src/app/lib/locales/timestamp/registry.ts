export type NumberingSystemRule = {
  locale: string;
  numberingSystem: string;
  fallback?: (value: string) => string;
};

export type TimezoneLabel = string | { standard: string; daylight: string };

export type TimestampLocaleRules = {
  months?: readonly string[];
  // Moment-style tokens: D, MMMM, YYYY and [literal]
  longDate?: string;
  ordinalDay?: (day: number) => string;
  numbering?: NumberingSystemRule;
  timezoneLabels?: Readonly<Record<string, TimezoneLabel>>;
};

const registeredRules = new Map<string, TimestampLocaleRules>();

export const registerTimestampLocale = (
  locale: string,
  rules: TimestampLocaleRules,
) => {
  registeredRules.set(locale.toLowerCase(), rules);
};

export const getTimestampLocaleRules = (
  locale: string,
): TimestampLocaleRules | undefined => {
  const localeKey = locale.toLowerCase();
  const languageCode = localeKey.split('-')[0];

  return registeredRules.get(localeKey) ?? registeredRules.get(languageCode);
};
