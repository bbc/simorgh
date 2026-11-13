import { use } from 'react';
import moment from 'moment-timezone';
import Timestamp from '#psammead/psammead-timestamp-container/src';
import isTenHoursAgo from '#lib/utilities/isTenHoursAgo';
import { ServiceContext } from '../../../contexts/ServiceContext';

const MONTH_AND_DAY_FORMATS = {
  ja: 'M月D日', // japanese
  ko: 'M월 D일', // korean
  'zh-cn': 'M月D日', // simplified chinese
  'zh-tw': 'M月D日', // traditional chinese
};

const PromoTimestamp = ({
  children,
  serviceDatetimeLocale = '',
  className = '',
}) => {
  const { altCalendar, datetimeLocale, timezone } = use(ServiceContext);

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
      format={
        isPublishedThisYear ? MONTH_AND_DAY_FORMATS[locale] || 'D MMMM' : 'LL'
      }
      isPublishedThisYear={isPublishedThisYear}
      padding={false}
      timezone={timezone}
      isRelative={isRelative}
      className={className}
    />
  );
};

export default PromoTimestamp;
