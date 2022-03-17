var moment = require('moment');
var numerals = require('./../dist/numerals/index');

// eslint-disable-next-line prettier/prettier
var pashtoGregorianMonths = 'جنوري_فبروري_مارچ_اپریل_می_جون_جولای_اګست_سپتمبر_اکتوبر_نومبر_ډیسمبر'.split(
  '_'
);

moment.defineLocale('ps', {
  months: pashtoGregorianMonths,
  monthsShort: pashtoGregorianMonths,
  relativeTime: {
    past: '%s وړاندې', // %s 'ago'
    m: '۱ دقیقه', // '1 minute'
    mm: '%d دقیقې', // %d 'minutes'
    h: '۱ ساعت', // '1 hour'
    hh: '%d ساعتونه', // %d 'hours'
  },
  longDateFormat: {
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
  },
  postformat: function (string) {
    var useEasternNumerals = numerals.makeNumeralTranslator(
      numerals.EasternArabic
    );
    return useEasternNumerals(string).replace(/,/g, '،');
  },
});
