import React from 'react';
import { number, string } from 'prop-types';
import Timestamp from '../../components/Timestamp';
import { formatUnixTimestamp } from './timestampUtilities';

const TimestampContainer = ({
  timestamp,
  dateTimeFormat,
  format,
  time,
  prefix,
  suffix,
  timezone,
}) => {
  return (
    <Timestamp datetime={formatUnixTimestamp(timestamp, dateTimeFormat, timezone)}>
      { prefix ? prefix + ' ' : null }
      {
        time ? time : formatUnixTimestamp(timestamp, format, timezone)
      }
      { suffix ? ' ' + suffix : null }
    </Timestamp>
  );
};

TimestampContainer.propTypes = {
  timestamp: number.isRequired,
  dateTimeFormat: string.isRequired,
  format: string.isRequired,
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
