import Timestamp from '#psammead/psammead-timestamp/src';
import {
  isValidDateTime,
  formatUnixTimestamp,
  localisedMoment,
} from './utilities';

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
}) => {
  let altDateTime;
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

  if (altCalendar && !isRelative) {
    altDateTime = `${altCalendar.formatDate(
      localisedMoment({ locale, timestamp }),
      { omitYear: isPublishedThisYear },
    )} -`;
  }

  const timestampText = [prefix, altDateTime, mainDateTime, suffix]
    .filter(segment => segment) // Filter falsy segments.
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
