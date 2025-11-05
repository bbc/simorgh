const moment = require('moment');

// eslint-disable-next-line import/prefer-default-export
export const months = [
  'حمل', // January
  'ثور', // February
  'جوزا', // March
  'سرطان', // April
  'اسد', // May
  'سنبله', // June
  'میزان', // July
  'عقرب', // August
  'قوس', // September
  'جدی', // October
  'دلو', // November
  'حوت', // December
];

const gregorianMonths = [
  'جنوری', // January
  'فبروری', // February
  'مارچ', // March
  'اپریل', // April
  'می', // May
  'جون', // June
  'جولای', // July
  'آگست', // August
  'سپتمبر', // September
  'اکتوبر', // October
  'نوامبر', // November
  'دسامبر', // December
];

moment.defineLocale('fa-af', {
  parentLocale: 'fa',
  months: gregorianMonths,
  monthsShort: gregorianMonths,
});
