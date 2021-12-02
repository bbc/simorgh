import React, { useContext } from 'react';
import { number, string } from 'prop-types';
import Timestamp from '@bbc/psammead-timestamp-container';
import { ServiceContext } from '#contexts/ServiceContext';
import isTenHoursAgo from '#lib/utilities/isTenHoursAgo';

const PromoTimestamp = ({ timestamp, serviceDatetimeLocale, className }) => {
  const { altCalendar, script, datetimeLocale, service, timezone } =
    useContext(ServiceContext);

  const locale = serviceDatetimeLocale || datetimeLocale;

  return (
    <Timestamp
      altCalendar={altCalendar}
      locale={locale}
      timestamp={timestamp}
      dateTimeFormat="YYYY-MM-DD"
      format="LL"
      script={script}
      padding={false}
      service={service}
      timezone={timezone}
      isRelative={isTenHoursAgo(timestamp)}
      darkMode
      className={className}
    />
  );
};

PromoTimestamp.propTypes = {
  timestamp: number.isRequired,
  serviceDatetimeLocale: string,
  className: string,
};

PromoTimestamp.defaultProps = {
  serviceDatetimeLocale: null,
  className: null,
};

export default PromoTimestamp;
