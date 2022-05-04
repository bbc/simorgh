const moment = require('moment');

moment.defineLocale('om', {
  months:
    'Amajjii_Guraandhala_Bitooteessa_Ebla_Caamsaa_Waxabajjii_Adooleessa_Hagayya_Fuulbaana_Onkololeessa_Sadaasa_Muddee'.split(
      '_'
    ),
  relativeTime: {
    past: '%s dura',
    m: 'Daqiiqaa 1',
    mm: 'Daqiiqaa %d',
    h: "Sa'aatii tokko",
    hh: "Sa'aatii %d",
  },
  longDateFormat: { LL: 'D MMMM YYYY' },
});
