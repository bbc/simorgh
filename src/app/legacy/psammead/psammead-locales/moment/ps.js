const moment = require('moment');
const numerals = require('../src/numerals/index');

// eslint-disable-next-line import/prefer-default-export
export const months = [
  'وری', // January
  'غویی', // February
  'غبرګولی', // March
  'چنګاښ', // April
  'زمری', // May
  'وږی', // June
  'تله', // July
  'لړم', // August
  'لیندۍ', // September
  'مرغومی', // October
  'سلواغه', // November
  'کب', // December
];

const gregorianMonths = [
  'جنوري', // January
  'فبروري', // February
  'مارچ', // March
  'اپریل', // April
  'می', // May
  'جون', // June
  'جولای', // July
  'اګست', // August
  'سپتمبر', // September
  'اکتوبر', // October
  'نومبر', // November
  'ډیسمبر', // December
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
