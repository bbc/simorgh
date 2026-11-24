/* eslint-disable no-nested-ternary */
import moment from 'moment';

moment.defineLocale('pcm', {
  months: [
    'January', // January
    'February', // February
    'March', // March
    'April', // April
    'May', // May
    'June', // June
    'July', // July
    'August', // August
    'September', // September
    'October', // October
    'November', // November
    'December', // December
  ],
  longDateFormat: {
    LT: '',
    LTS: '',
    L: '',
    LL: 'Do MMMM YYYY',
    LLL: 'Do MMMM YYYY HH:mm',
    LLLL: '',
  },
  relativeTime: {
    past: '%s wey don pass',
    m: 'one minute',
    mm: '%d minutes',
    h: 'one hour',
    hh: '%d hours',
  },
  dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
  // Copied exactly from https://github.com/moment/moment/blob/develop/locale/en-gb.js#L50-L57
  ordinal(number) {
    const b = number % 10;
    const output =
      // eslint-disable-next-line no-bitwise
      ~~((number % 100) / 10) === 1
        ? 'th'
        : b === 1
          ? 'st'
          : b === 2
            ? 'nd'
            : b === 3
              ? 'rd'
              : 'th';
    return number + output;
  },
  week: {
    dow: 1, // Monday is the first day of the week.
    doy: 4, // The week that contains Jan 4th is the first week of the year.
  },
});
