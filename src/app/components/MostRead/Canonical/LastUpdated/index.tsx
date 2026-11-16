import moment from 'moment-timezone';
import Timestamp from '../../../../legacy/psammead/psammead-timestamp-container/src';

interface LastUpdatedProps {
  locale: string;
  prefix: string;
  timestamp: number | string;
  timezone: string;
  datetimeMonthDayFormat?: string;
}

const LastUpdated = ({
  locale,
  prefix,
  timestamp,
  timezone,
  datetimeMonthDayFormat,
}: LastUpdatedProps) => {
  const publicationDate = moment(timestamp).locale(locale).tz(timezone);
  const isPublishedThisYear = publicationDate.isSame(
    moment().tz(timezone),
    'year',
  );

  return (
    <Timestamp
      timestamp={timestamp}
      dateTimeFormat="YYYY-MM-DD"
      prefix={prefix}
      format={isPublishedThisYear ? datetimeMonthDayFormat || 'D MMMM' : 'LL'}
      locale={locale}
      timezone={timezone}
      isPublishedThisYear={isPublishedThisYear}
      padding={false}
      altCalendar={null}
    />
  );
};

export default LastUpdated;
