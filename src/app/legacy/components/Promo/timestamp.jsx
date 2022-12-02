import React, { useContext } from 'react';
import { oneOfType, number, string } from 'prop-types';
import Timestamp from '#psammead/psammead-timestamp-container/src';
import isTenHoursAgo from '#lib/utilities/isTenHoursAgo';
import { ServiceContext } from '../../../contexts/ServiceContext';

const PromoTimestamp = ({ children, serviceDatetimeLocale, className }) => {
  const { altCalendar, script, datetimeLocale, service, timezone } =
    useContext(ServiceContext);

  const locale = serviceDatetimeLocale || datetimeLocale;

  return (
    <Timestamp
      timestamp={children}
      altCalendar={altCalendar}
      locale={locale}
      dateTimeFormat="YYYY-MM-DD"
      format="LL"
      script={script}
      padding={false}
      service={service}
      timezone={timezone}
      isRelative={isTenHoursAgo(children)}
      darkMode
      className={className}
    />
  );
};

PromoTimestamp.propTypes = {
  // epoch time or ISO8601 timestamp
  children: oneOfType([number, string]).isRequired,
  serviceDatetimeLocale: string,
  className: string,
};

PromoTimestamp.defaultProps = {
  serviceDatetimeLocale: null,
  className: null,
};

export default PromoTimestamp;
