import { use } from 'react';
import moment from 'moment-timezone';
import Timestamp from '#psammead/psammead-timestamp-container/src';
import isTenHoursAgo from '#lib/utilities/isTenHoursAgo';
import { ServiceContext } from '../../../contexts/ServiceContext';

const PromoTimestamp = ({
  children,
  serviceDatetimeLocale = '',
  className = '',
}) => {
  const { altCalendar, datetimeLocale, datetimeMonthDayFormat, timezone } =
    use(ServiceContext);

  const locale = serviceDatetimeLocale || datetimeLocale;

  const publicationDate = moment(children).locale(locale).tz(timezone);
  const isPublishedThisYear = publicationDate.isSame(
    moment().tz(timezone),
    'year',
  );

  const isRelative = isTenHoursAgo(new Date(children).getTime());

  return (
    <Timestamp
      timestamp={children}
      altCalendar={altCalendar}
      locale={locale}
      dateTimeFormat="YYYY-MM-DD"
      format={isPublishedThisYear ? datetimeMonthDayFormat || 'D MMMM' : 'LL'}
      isPublishedThisYear={isPublishedThisYear}
      padding={false}
      timezone={timezone}
      isRelative={isRelative}
      className={className}
    />
  );
};

export default PromoTimestamp;
