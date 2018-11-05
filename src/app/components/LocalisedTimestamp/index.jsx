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

  if (currentTimestamp) {
    dayjs.extend(relativeTime);
    return dayjs(publishedTimestamp).from(dayjs(currentTimestamp));
  }

  return dayjs(publishedTimestamp).format('D MMMM YYYY');
};

export default localiseTimestamp;
