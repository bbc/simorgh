import React, { useContext } from 'react';
import { number, string, bool } from 'prop-types';
import Timestamp from '@bbc/psammead-timestamp';
import {
  isValidDateTime,
  formatUnixTimestamp,
  showRelativeTime,
} from './timestampUtilities';
import { ServiceContext } from '../../contexts/ServiceContext';

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

  const { script } = useContext(ServiceContext);

  return (
    <Timestamp
      datetime={formatUnixTimestamp(timestamp, dateTimeFormat, timezone)}
      script={script}
    >
      {prefix ? `${prefix} ` : null}
      {showRelativeTime(timestamp, isRelative, format, timezone)}
      {suffix ? ` ${suffix}` : null}
    </Timestamp>
  );
};

TimestampContainer.propTypes = {
  timestamp: number.isRequired,
  dateTimeFormat: string.isRequired,
  isRelative: bool,
  format: string,
  timezone: string,
  prefix: string,
  suffix: string,
};

TimestampContainer.defaultProps = {
  isRelative: false,
  format: null,
  timezone: 'Europe/London',
  prefix: null,
  suffix: null,
};

export default TimestampContainer;
