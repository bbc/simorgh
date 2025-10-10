import React, { use } from 'react';
import Timestamp from '#psammead/psammead-timestamp-container/src';
import isTenHoursAgo from '#lib/utilities/isTenHoursAgo';
import { ServiceContext } from '../../../contexts/ServiceContext';

const PromoTimestamp = ({
  children,
  serviceDatetimeLocale = '',
  className = '',
  showPrefix = false,
}) => {
  const {
    altCalendar,
    datetimeLocale,
    timezone,
    translations: { timstampPrefix },
  } = use(ServiceContext);

  const locale = serviceDatetimeLocale || datetimeLocale;

  const isRelative = isTenHoursAgo(new Date(children).getTime());

  // EXPERIMENT: Homepage Read Time
  const prefix = timstampPrefix?.publishedAgo;

  return (
    <Timestamp
      timestamp={children}
      altCalendar={altCalendar}
      locale={locale}
      dateTimeFormat="YYYY-MM-DD"
      format="LL"
      padding={false}
      timezone={timezone}
      isRelative={isRelative}
      className={className}
      {...(isRelative && showPrefix && { prefix })}
    />
  );
};

export default PromoTimestamp;
