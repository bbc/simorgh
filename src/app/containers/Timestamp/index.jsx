/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import { number, string, bool } from 'prop-types';
import Timestamp from '../../components/Timestamp';
import relativeTime from './relativeTimestamp';
import { isValidDateTime, formatUnixTimestamp } from './timestampUtilities';

const TimestampContainer = ({
  timestamp,
  dateTimeFormat,
  format,
  isRelative,
  prefix,
  suffix,
  timezone,
}) => {
  if (!isValidDateTime(new Date(timestamp))) {
    return null;
  }
  return (
    <Timestamp
      datetime={formatUnixTimestamp(timestamp, dateTimeFormat, timezone)}
    >
      {prefix ? `${prefix} ` : null}
      {isRelative
        ? relativeTime(timestamp)
        : formatUnixTimestamp(timestamp, format, timezone)}
      {suffix ? ` ${suffix}` : null}
    </Timestamp>
  );
};

TimestampContainer.propTypes = {
  timestamp: number.isRequired,
  dateTimeFormat: string.isRequired,
  format: string.isRequired,
  isRelative: bool.isRequired,
  timezone: string,
  local: string,
  prefix: string,
  suffix: string,
};

TimestampContainer.defaultProps = {
  local: 'en-GB',
  timezone: 'Europe/London',
  prefix: null,
  suffix: null,
};

export default TimestampContainer;
