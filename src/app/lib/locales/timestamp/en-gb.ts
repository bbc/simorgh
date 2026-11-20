import { registerTimestampLocale } from './registry';

registerTimestampLocale('en-gb', {
  months: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  timezoneLabels: {
    'Europe/London': { standard: 'GMT', daylight: 'BST' },
  },
});
