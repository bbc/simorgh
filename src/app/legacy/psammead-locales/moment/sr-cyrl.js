var moment = require('moment');
require('moment/locale/sr-cyrl');

moment.updateLocale('sr-cyrl', {
  longDateFormat: {
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY H:mm',
    LLLL: 'dddd, D MMMM YYYY H:mm',
  },
  relativeTime: {
    past: 'Пре %s',
    m: '1 минута',
    mm: '%d минута',
    h: '1 сата',
    hh: function (number) {
      return number < 5 ? number + ' сата' : number + ' сати';
    },
  },
});
