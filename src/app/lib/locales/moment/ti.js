const moment = require('moment');

moment.defineLocale('ti', {
  months: 'ጥሪ_ለካቲት_መጋቢት_ሚያዝያ_ጉንቦት_ሰነ_ሓምለ_ነሓሰ_መስከረም_ጥቅምቲ_ሕዳር_ታሕሳስ'.split('_'),
  longDateFormat: { LL: 'D MMMM YYYY' },
  relativeTime: {
    past: 'ቅድሚ %s',
    m: 'ደቒቕ',
    mm: '%d ደቓይቕ',
    h: 'ሓደ ሰዓት',
    hh: '%d ሰዓታት',
  },
});
