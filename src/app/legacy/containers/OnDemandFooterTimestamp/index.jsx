import React, { use } from 'react';
import { formatUnixTimestamp } from '#psammead/psammead-timestamp-container/src/utilities';
import { ServiceContext } from '../../../contexts/ServiceContext';

const OnDemandFooterTimestamp = ({ releaseDateTimeStamp }) => {
  const { script, service, timezone, datetimeLocale } = use(ServiceContext);
  const formattedTimestamp = formatUnixTimestamp({
    timestamp: releaseDateTimeStamp,
    format: 'LL',
    timezone,
    locale: datetimeLocale,
    isRelative: false,
  });
  const dateTime = formatUnixTimestamp({
    timestamp: releaseDateTimeStamp,
    format: 'YYYY-MM-DD',
    timezone,
    locale: datetimeLocale,
    isRelative: false,
  });

  return (
    <time
      className="text-longPrimer dark:text-pebble text-metal inline-block light:max-group-3:mt-0"
      dateTime={dateTime}
      suppressHydrationWarning
    >
      {formattedTimestamp}
    </time>
  );
};

export default OnDemandFooterTimestamp;
