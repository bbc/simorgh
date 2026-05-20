import { use } from 'react';

import isTenHoursAgo from '#lib/utilities/isTenHoursAgo';
import Timestamp from '#psammead/psammead-timestamp-container/src';
import { ServiceContext } from '../../../contexts/ServiceContext';

const PromoTimestamp = ({
  children,
  serviceDatetimeLocale = '',
  className = '',
}) => {
  const { altCalendar, datetimeLocale, timezone } = use(ServiceContext);

  const locale = serviceDatetimeLocale || datetimeLocale;

  const isRelative = isTenHoursAgo(new Date(children).getTime());

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
    />
  );
};

export default PromoTimestamp;
