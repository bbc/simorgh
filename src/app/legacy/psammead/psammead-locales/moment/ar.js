const dayjs = require('dayjs');
require('dayjs/locale/ar');

const relativeTime = require('dayjs/plugin/relativeTime');
const objectSupport = require('dayjs/plugin/objectSupport');
const localizedFormat = require('dayjs/plugin/localizedFormat');
const updateLocale = require('dayjs/plugin/updateLocale');
const customParseFormat = require('dayjs/plugin/customParseFormat');
const preParsePostFormat = require('dayjs/plugin/preParsePostFormat');
const devHelper = require('dayjs/plugin/devHelper');

const dualMonthNames = [
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

dayjs.extend(relativeTime);
dayjs.extend(objectSupport);
dayjs.extend(localizedFormat);
dayjs.extend(updateLocale);
dayjs.extend(preParsePostFormat);
dayjs.extend(customParseFormat);
dayjs.extend(devHelper);

dayjs.updateLocale('ar', {
  months: dualMonthNames,
  monthsShort: dualMonthNames,
  postformat(string) {
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
