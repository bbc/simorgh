import moment from 'moment';

moment.defineLocale('new-locale', {
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
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd, D MMMM YYYY HH:mm',
  },
  relativeTime: {
    past: '%s ago',
    m: '1 minute', // alternatives: 'one minute', 'a minute'
    mm: '%d minutes',
    h: '1 hour', // alternatives: 'one hour', 'an hour'
    hh: '%d hours',
  },
});
