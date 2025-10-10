import React from 'react';
import Timestamp from '../../../../legacy/psammead/psammead-timestamp-container/src';

interface LastUpdatedProps {
  locale: string;
  prefix: string;
  timestamp: number | string;
  timezone: string;
}

const LastUpdated = ({
  locale,
  prefix,
  timestamp,
  timezone,
}: LastUpdatedProps) => (
  <Timestamp
    timestamp={timestamp}
    dateTimeFormat="YYYY-MM-DD"
    prefix={prefix}
    format="LL"
    locale={locale}
    timezone={timezone}
    padding={false}
    altCalendar={null}
  />
);

export default LastUpdated;
