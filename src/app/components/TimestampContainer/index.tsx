import type { Moment } from 'moment';
import Timestamp from '#app/components/Timestamp';
import {
  isValidDateTime,
  formatUnixTimestamp,
  localisedMoment,
} from '#app/lib/utilities/timestamp';

interface TimestampContainerProps {
  timestamp?: number | string;
  dateTimeFormat?: string;
  format?: string;
  isPublishedThisYear?: boolean;
  isRelative?: boolean;
  padding?: boolean;
  prefix?: string;
  suffix?: string;
  timezone?: string;
  locale?: string;
  altCalendar?: {
    formatDate: (
      date: Moment,
      options?: { omitYear?: boolean },
    ) => string | null;
  } | null;
  className?: string;
}

const TimestampContainer = ({
  timestamp,
  dateTimeFormat,
  format = '',
  isPublishedThisYear = false,
  isRelative = false,
  padding = true,
  prefix = '',
  suffix = '',
  timezone = 'Europe/London',
  locale = 'en-gb',
  altCalendar,
  className = '',
}: TimestampContainerProps) => {
  if (timestamp === undefined) {
    return null;
  }

  if (!isValidDateTime(new Date(timestamp))) {
    return null;
  }

  const mainDateTime = formatUnixTimestamp({
    timestamp,
    format,
    timezone,
    locale,
    isRelative,
  });

  const altDateTime =
    altCalendar && !isRelative
      ? `${altCalendar.formatDate(localisedMoment({ locale, timestamp }), {
          omitYear: isPublishedThisYear,
        })} -`
      : undefined;

  const timestampText = [prefix, altDateTime, mainDateTime, suffix]
    .filter(Boolean)
    .join(' ');

  return (
    <Timestamp
      datetime={formatUnixTimestamp({
        format: dateTimeFormat,
        locale: 'en-gb',
        timestamp,
        timezone,
      })}
      padding={padding}
      className={className}
    >
      {timestampText}
    </Timestamp>
  );
};

export default TimestampContainer;
