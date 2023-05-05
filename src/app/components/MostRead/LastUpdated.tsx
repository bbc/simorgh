import React from 'react';
import Timestamp from '#psammead/psammead-timestamp-container/src';

interface LastUpdatedProps {
  locale: string;
  prefix: string;
  script: object;
  service: string;
  timestamp: number;
  timezone: string;
}

const LastUpdated = ({
  locale,
  prefix,
  script,
  service,
  timestamp,
  timezone,
}: LastUpdatedProps) => (
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

export default LastUpdated;
