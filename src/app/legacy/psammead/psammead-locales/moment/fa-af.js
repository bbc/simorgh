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

moment.defineLocale('fa-af', {
  parentLocale: 'fa',
  months,
  monthsShort: months,
});
