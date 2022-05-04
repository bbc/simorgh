const moment = require('moment');
require('moment/locale/uk');

moment.updateLocale('uk', {
  longDateFormat: {
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY, HH:mm',
    LLLL: 'dddd, D MMMM YYYY, HH:mm',
  },
  relativeTime: {
    past: '%s тому',
    m: '1 хвилину',
    mm: '%d хвилин(и)',
    h: '1 година',
    hh: '%d годин(и)',
  },
});
