import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/fa';

// Added to node_modules/dayjs/locale/fa.js as a child of var t
//  relativeTime: {
//     past: '%s پیش',
//     hh: '%d ساعت',
//   },

const localiseTimestamp = (publishedTimestamp, locale, currentTimestamp) => {
  dayjs.locale(locale);

  const publishedTimestampInMilliseconds = publishedTimestamp * 1000;

  if (currentTimestamp) {
    const currentTimestampInMilliseconds = currentTimestamp * 1000;

    dayjs.extend(relativeTime);

    const result = dayjs(publishedTimestampInMilliseconds);

    return result.from(dayjs(currentTimestampInMilliseconds));
  }

  return dayjs(publishedTimestampInMilliseconds).format('DD MMMM YYYY');
};

export default localiseTimestamp;
