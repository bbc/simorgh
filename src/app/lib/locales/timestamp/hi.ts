import { registerTimestampLocale } from './registry';

registerTimestampLocale('hi', {
  months: [
    'जनवरी',
    'फ़रवरी',
    'मार्च',
    'अप्रैल',
    'मई',
    'जून',
    'जुलाई',
    'अगस्त',
    'सितंबर',
    'अक्टूबर',
    'नवंबर',
    'दिसंबर',
  ],
  numbering: { locale: 'hi-u-nu-latn', numberingSystem: 'latn' },
  timezoneLabels: { 'Asia/Kolkata': 'IST' },
});
