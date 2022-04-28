var moment = require('moment');
require('moment/locale/sr');

moment.updateLocale('sr', {
  longDateFormat: {
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY H:mm',
    LLLL: 'dddd, D MMMM YYYY H:mm',
  },
  relativeTime: {
    past: 'Pre %s',
    m: '1 minuta',
    mm: '%d minuta',
    h: '1 sata',
    hh: function (number) {
      return number < 5 ? number + ' sata' : number + ' sati';
    },
  },
});
