import React from 'react';
import { number, string, shape } from 'prop-types';
import { scriptPropType } from '@bbc/gel-foundations/prop-types';
import Timestamp from '@bbc/psammead-timestamp-container';

const LastUpdated = ({
  locale,
  prefix,
  script,
  service,
  timestamp,
  timezone,
}) => (
  <Timestamp
    timestamp={timestamp}
    dateTimeFormat="YYYY-MM-DD"
    prefix={prefix}
    format="LL"
    script={script}
    service={service}
    locale={locale}
    timezone={timezone}
    padding={false}
  />
);

LastUpdated.propTypes = {
  locale: string.isRequired,
  prefix: string.isRequired,
  script: shape(scriptPropType).isRequired,
  service: string.isRequired,
  timestamp: number.isRequired,
  timezone: string.isRequired,
};

export default LastUpdated;
