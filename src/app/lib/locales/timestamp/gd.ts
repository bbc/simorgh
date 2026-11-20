import { registerTimestampLocale } from './registry';

registerTimestampLocale('gd', {
  months: [
    'Am Faoilleach',
    'An Gearran',
    'Am Màrt',
    'An Giblean',
    'An Cèitean',
    'An t-Ògmhios',
    'An t-Iuchar',
    'An Lùnastal',
    'An t-Sultain',
    'An Dàmhair',
    'An t-Samhain',
    'An Dùbhlachd',
  ],
  timezoneLabels: {
    'Europe/London': { standard: 'GMT', daylight: 'BST' },
  },
});
