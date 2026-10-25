const moment = require('moment');

moment.defineLocale('am', {
  months: 'ጥር_የካቲት_መጋቢት_ሚያዚያ_ግንቦት_ሰኔ_ሀምሌ_ነሐሴ_መስከረም_ጥቅምት_ህዳር_ታህሳስ'.split('_'),
  longDateFormat: { LL: 'D MMMM YYYY' },
  relativeTime: {
    past: '%s በፊት',
    m: 'ከ 1 ደቂቃ',
    mm: 'ከ %d ደቂቃዎች',
    h: 'ከ 1 ሰአት',
    hh: 'ከ %d ሰአት',
  },
});
