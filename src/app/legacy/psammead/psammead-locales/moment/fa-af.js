const moment = require('moment');

// eslint-disable-next-line import/prefer-default-export
export const months = [
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
  months,
  monthsShort: months,
});
