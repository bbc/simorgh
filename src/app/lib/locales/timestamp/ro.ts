import { registerTimestampLocale } from './registry';

registerTimestampLocale('ro', {
  months: [
    'ianuarie',
    'februarie',
    'martie',
    'aprilie',
    'mai',
    'iunie',
    'iulie',
    'august',
    'septembrie',
    'octombrie',
    'noiembrie',
    'decembrie',
  ],
  timezoneLabels: {
    'Europe/Bucharest': { standard: 'EET', daylight: 'EEST' },
  },
});
