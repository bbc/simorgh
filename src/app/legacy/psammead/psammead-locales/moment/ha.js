const moment = require('moment');

moment.defineLocale('ha', {
  months:
    'Janairu_Fabrairu_Maris_Aprilu_Mayu_Yuni_Yuli_Agusta_Satumba_Oktoba_Nuwamba_Disamba'.split(
      '_'
    ),
  longDateFormat: { LL: 'D MMMM YYYY' },
  relativeTime: {
    past: '%s wuce',
    m: 'Minti 1 da ta',
    mm: 'Mintuna %d da suka',
    h: "Sa'a 1 da ta",
    hh: "Sa'o'i %d da suka",
  },
});
