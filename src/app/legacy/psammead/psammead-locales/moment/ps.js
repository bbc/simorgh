const moment = require('moment');
const numerals = require('../src/numerals/index');

// eslint-disable-next-line import/prefer-default-export
export const months = [
  'وری',
  'غویی',
  'غبرګولی',
  'چنګاښ',
  'زمری',
  'وږی',
  'تله',
  'لړم',
  'لیندۍ',
  'مرغومی',
  'سلواغه',
  'کب',
];

const gregorianMonths = [
  'جنوري',
  'فبروري',
  'مارچ',
  'اپریل',
  'می',
  'جون',
  'جولای',
  'اګست',
  'سپتمبر',
  'اکتوبر',
  'نومبر',
  'ډیسمبر',
];

moment.defineLocale('ps', {
  months: gregorianMonths,
  monthsShort: gregorianMonths,
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
  postformat(string) {
    const EasternNumerals = numerals.makeNumeralTranslator(
      numerals.EasternArabic
    );
    return EasternNumerals(string).replace(/,/g, '،');
  },
});
