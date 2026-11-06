const moment = require('moment');
require('moment/locale/ru');

moment.updateLocale('ru', {
  months: {
    standalone:
      'января_февраля_марта_апреля_мая_июня_июля_августа_сентября_октября_ноября_декабря'.split(
        '_'
      ),
  },
  longDateFormat: {
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY, H:mm',
    LLLL: 'dddd, D MMMM YYYY, H:mm',
  },
});
