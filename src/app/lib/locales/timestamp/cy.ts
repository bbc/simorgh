import { registerTimestampLocale } from './registry';

registerTimestampLocale('cy', {
  months: [
    'Ionawr',
    'Chwefror',
    'Mawrth',
    'Ebrill',
    'Mai',
    'Mehefin',
    'Gorffennaf',
    'Awst',
    'Medi',
    'Hydref',
    'Tachwedd',
    'Rhagfyr',
  ],
  timezoneLabels: {
    'Europe/London': { standard: 'GMT', daylight: 'BST' },
  },
});
