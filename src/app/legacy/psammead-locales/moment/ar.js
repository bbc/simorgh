var moment = require('moment');
require('moment/locale/ar');

// the months have been overridden to maintain arabic dual month names
// other values in this locale have been left as set upstream
// see https://github.com/moment/moment/blob/develop/src/locale/ar.js

var dualMonthNames = [
  'يناير/ كانون الثاني',
  'فبراير/ شباط',
  'مارس/ آذار',
  'أبريل/ نيسان',
  'مايو/ أيار',
  'يونيو/ حزيران',
  'يوليو/ تموز',
  'أغسطس/ آب',
  'سبتمبر/ أيلول',
  'أكتوبر/ تشرين الأول',
  'نوفمبر/ تشرين الثاني',
  'ديسمبر/ كانون الأول',
];

moment.updateLocale('ar', {
  months: dualMonthNames,
  monthsShort: dualMonthNames,
  postformat: function (string) {
    // Suppress conversion to Eastern numerals from base `ar` locale but retain use of Arabic comma
    return string.replace(/,/g, '،');
  },
  relativeTime: {
    past: '%s',
    m: 'قبل دقيقة واحدة',
    mm: 'قبل %d دقيقة',
    h: 'قبل ساعة واحدة',
    hh: 'قبل %d ساعة',
  },
});
