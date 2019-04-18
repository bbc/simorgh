/* eslint-disable prefer-template, react/no-unused-prop-types */
import React from 'react';
import { number, string } from 'prop-types';
import Timestamp from '../../components/Timestamp';
import formatUnixTimestamp from './timestampUtilities';

const TimestampContainer = ({
  timestamp,
  dateTimeFormat,
  format,
  time,
  prefix,
  suffix,
  timezone,
}) => (
  <Timestamp
    datetime={formatUnixTimestamp(timestamp, dateTimeFormat, timezone)}
  >
    {prefix ? prefix + ' ' : null}
    {time === null ? formatUnixTimestamp(timestamp, format, timezone) : time}
    {suffix ? ' ' + suffix : null}
  </Timestamp>
);

TimestampContainer.propTypes = {
  timestamp: number.isRequired,
  dateTimeFormat: string.isRequired,
  format: string.isRequired,
  time: number,
  timezone: string,
  local: string,
  prefix: string,
  suffix: string,
};

TimestampContainer.defaultProps = {
  local: 'en-GB',
  timezone: 'Europe/London',
  time: null,
  prefix: null,
  suffix: null,
};

export default TimestampContainer;
