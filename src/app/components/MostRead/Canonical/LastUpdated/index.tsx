import moment from 'moment-timezone';
import MONTH_AND_DAY_FORMATS from '#lib/utilities/timestampFormats';
import Timestamp from '../../../../legacy/psammead/psammead-timestamp-container/src';

interface LastUpdatedProps {
  locale: string;
  prefix: string;
  timestamp: number | string;
  timezone: string;
}

const LastUpdated = ({
  locale,
  prefix,
  timestamp,
  timezone,
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
      format={
        isPublishedThisYear ? MONTH_AND_DAY_FORMATS[locale] || 'D MMMM' : 'LL'
      }
      locale={locale}
      timezone={timezone}
      isPublishedThisYear={isPublishedThisYear}
      padding={false}
      altCalendar={null}
    />
  );
};

export default LastUpdated;
