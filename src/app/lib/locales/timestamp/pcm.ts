import { registerTimestampLocale } from './registry';

const getEnglishOrdinalSuffix = (day: number) => {
  const lastTwoDigits = day % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 13) return 'th';

  switch (day % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
};

registerTimestampLocale('pcm', {
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
  ordinalDay: day => `${day}${getEnglishOrdinalSuffix(day)}`,
  timezoneLabels: { 'Africa/Lagos': 'WAT' },
});
