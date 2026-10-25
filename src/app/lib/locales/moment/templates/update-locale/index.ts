import moment from 'moment';
import 'moment/locale/en-gb';

moment.updateLocale('en-gb', {
  months: [
    'JANUARY', // January
    'FEBRUARY', // February
    'MARCH', // March
    'APRIL', // April
    'MAY', // May
    'JUNE', // June
    'JULY', // July
    'AUGUST', // August
    'SEPTEMBER', // September
    'OCTOBER', // October
    'NOVEMBER', // November
    'DECEMBER', //
  ],
  longDateFormat: {
    LT: '',
    LTS: '',
    L: '',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: '',
  },
  relativeTime: {
    past: '%s AGO',
    m: '1 MINUTE', // alternatives: 'one minute', 'a minute'
    mm: '%d MINUTES',
    h: '1 HOUR', // alternatives: 'one hour', 'an hour'
    hh: '%d HOURS',
  },
});
