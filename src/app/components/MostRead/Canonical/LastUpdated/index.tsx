import React from 'react';
import Timestamp from '../../../../legacy/psammead/psammead-timestamp-container/src';
import { Services } from '../../../../models/types/global';
import { TypographyScript } from '../../../../models/types/theming';

interface LastUpdatedProps {
  locale: string;
  prefix: string;
  script: TypographyScript;
  service: Services;
  timestamp: number | string;
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
    altCalendar={null}
  />
);

export default LastUpdated;
