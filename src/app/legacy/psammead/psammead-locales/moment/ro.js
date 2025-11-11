const moment = require('moment');
require('moment/locale/ro');

moment.updateLocale('ro', {
  months:
    'Ianuarie Februarie Martie Aprilie Mai Iunie Iulie August Septembrie Octombrie Noiembrie Decembrie'.split(
      ' '
    ),
  longDateFormat: {
    LLL: 'D MMMM YYYY',
    LLLL: 'D MMMM YYYY, HH:mm',
  },
  relativeTime: {
    past: '%s în urmă',
    m: 'acum 1 minut',
    mm: 'acum %d minute',
    h: 'acum 1 oră',
    hh: 'acum %d ore',
  },
});

module.exports = moment;
