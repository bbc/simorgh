import React, { useContext } from 'react';
import { number, string, bool } from 'prop-types';
import Timestamp from '@bbc/psammead-timestamp';
import momentConfig from './momentConfig';
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
}) => {
  if (!isValidDateTime(new Date(timestamp))) {
    return null;
  }

  const { script, moment } = useContext(ServiceContext);

  momentConfig(moment);

  return (
    <Timestamp
      datetime={formatUnixTimestamp(timestamp, dateTimeFormat)}
      script={script}
    >
      {prefix ? `${prefix} ` : null}
      {showRelativeTime(timestamp, isRelative, format)}
      {suffix ? ` ${suffix}` : null}
    </Timestamp>
  );
};

TimestampContainer.propTypes = {
  timestamp: number.isRequired,
  dateTimeFormat: string.isRequired,
  isRelative: bool,
  format: string,
  prefix: string,
  suffix: string,
};

TimestampContainer.defaultProps = {
  isRelative: false,
  format: null,
  prefix: null,
  suffix: null,
};

export default TimestampContainer;
