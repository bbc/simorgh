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
  week: {
    dow: 1, // Monday is the first day of the week.
    doy: 4, // The week that contains Jan 4th is the first week of the year.
  },
});
