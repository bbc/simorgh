const moment = require('moment');

moment.defineLocale('rw', {
  months:
    "Ukwa mbere_Ukwa kabiri_Ukwa gatatu_Ukwa kane_Ukwa gatanu_Ukwa gatandatu_Ukw'indwi_Ukw'umunani_Ukw'icenda_Ukw'icumi_Ukw'icumi na rimwe_Ukw'icumi na kabiri".split(
      '_'
    ),
  longDateFormat: { LL: 'D MMMM YYYY' },
  relativeTime: {
    past: '%s',
    m: 'Haciye umunota 1',
    mm: 'Iminota %d iraheze',
    h: 'Haciye isaha 1',
    hh: 'Haciye amasaha %d',
  },
});
