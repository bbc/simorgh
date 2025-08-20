const moment = require('moment');

// eslint-disable-next-line import/prefer-default-export
export const months = [
  'حمل',
  'ثور',
  'جوزا',
  'سرطان',
  'اسد',
  'سنبله',
  'میزان',
  'عقرب',
  'قوس',
  'جدی',
  'دلو',
  'حوت',
];

moment.defineLocale('fa-af', {
  parentLocale: 'fa',
  months,
  monthsShort: months,
});
