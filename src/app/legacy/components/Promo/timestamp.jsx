import React, { use } from 'react';
import Timestamp from '#psammead/psammead-timestamp-container/src';
import isTenHoursAgo from '#lib/utilities/isTenHoursAgo';
import Text from '#app/components/Text';
import { ServiceContext } from '../../../contexts/ServiceContext';

const PromoTimestamp = ({
  children,
  serviceDatetimeLocale = '',
  className = '',
  // For experiment
  // change to false to get all to render inline
  displayBlock = true,
}) => {
  const { altCalendar, script, datetimeLocale, service, timezone } =
    use(ServiceContext);

  const locale = serviceDatetimeLocale || datetimeLocale;

  const isRelative = isTenHoursAgo(new Date(children).getTime());

  // For experiment
  const inlineStyles = {
    paddingInlineStart: `0.5rem`,
    color: '#545658',
  };

  const stackedStyles = {
    color: '#545658',
  };

  const readTimeText = service === 'turkce' ? 'Uzun haber' : 'Lectura extensa';

  return (
    <>
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
        isRelative={isRelative}
        className={className}
        // For experiment
        displayBlock={displayBlock}
      />
      {/* // Holding - For experiment */}
      <Text
        size="brevier"
        style={{ color: '#545658' }}
        {...(!displayBlock
          ? { style: inlineStyles }
          : { style: stackedStyles })}
      >
        {readTimeText}
      </Text>
    </>
  );
};

export default PromoTimestamp;
