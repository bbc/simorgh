import { registerTimestampLocale } from './registry';

registerTimestampLocale('pl', {
  months: [
    'stycznia',
    'lutego',
    'marca',
    'kwietnia',
    'maja',
    'czerwca',
    'lipca',
    'sierpnia',
    'września',
    'października',
    'listopada',
    'grudnia',
  ],
  timezoneLabels: {
    'Europe/Warsaw': { standard: 'CET', daylight: 'CEST' },
  },
});
