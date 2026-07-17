import 'temporal-polyfill/global';
import moment from 'moment-timezone';

type Locale = string;
type ISODuration = string;

const createDateAdapter = () => ({
  // Temporary seam for gradual Temporal adoption in follow-up PRs.
  createLocalisedMoment: ({
    locale,
    timestamp,
  }: {
    locale: Locale;
    timestamp: number;
  }): moment.Moment => moment(timestamp).locale(locale),
  createMomentInTimezone: ({
    locale,
    timestamp,
    timezone,
  }: {
    locale: Locale;
    timestamp: number;
    timezone: string;
  }): moment.Moment => moment(timestamp).locale(locale).tz(timezone),
  formatDuration: ({
    duration,
    format,
    locale,
  }: {
    duration: ISODuration;
    format?: string;
    locale?: Locale;
  }): string => {
    const defaultDurationFormat = duration?.includes('H') ? 'h:mm:ss' : 'mm:ss';
    const durationInMilliseconds = moment.duration(duration).asMilliseconds();

    return moment
      .utc(durationInMilliseconds)
      .locale(locale ?? '')
      .format(format || defaultDurationFormat);
  },
  // Exposed to make Temporal available at runtime without changing behavior yet.
  toTemporalInstant: (timestamp: number): Temporal.Instant | undefined =>
    globalThis.Temporal?.Instant?.fromEpochMilliseconds(timestamp),
});

const dateAdapter = createDateAdapter();

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
  format?: string;
  locale?: Locale;
}): string =>
  dateAdapter.formatDuration({
    duration,
    format,
    locale,
  });

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
}): moment.Moment =>
  dateAdapter.createLocalisedMoment({
    locale,
    timestamp,
  });

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

  const momentObj = dateAdapter.createMomentInTimezone({
    locale: locale ?? '',
    timestamp,
    timezone: timezone ?? '',
  });

  if (isRelative) {
    return momentObj.fromNow();
  }

  return momentObj.format(format || 'LL, LT z');
};
