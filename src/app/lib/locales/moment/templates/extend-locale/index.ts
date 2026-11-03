import moment from 'moment';
import 'moment/locale/en-gb';

// Reverses months & date formats & relative time
moment.defineLocale('gb-en', {
  parentLocale: 'en-gb',
  months: [
    'yraunaJ', // January
    'yraurbeF', // February
    'hcraM', // March
    'lirpA', // April
    'yaM', // May
    'enuJ', // June
    'yluJ', // July
    'tsuguA', // August
    'rebmepteS', // September
    'rebotcO', // October
    'rebmevoN', // November
    'rebmeceD', // December
  ],
  longDateFormat: {
    LT: '',
    LTS: '',
    L: '',
    LL: 'YYYY MMMM D',
    LLL: 'YYYY MMMM D HH:mm',
    LLLL: '',
  },
  relativeTime: {
    past: 'ago %s',
    m: 'minute 1', // alternatives: 'one minute', 'a minute'
    mm: 'minutes %d',
    h: 'hour 1', // alternatives: 'one hour', 'an hour'
    hh: 'hours %d',
  },
});
