import { Nepali, makeNumeralTranslator } from '../numerals/index';
import { registerTimestampLocale } from './registry';

registerTimestampLocale('ne', {
  months: [
    'जनवरी',
    'फेब्रुवरी',
    'मार्च',
    'एप्रिल',
    'मई',
    'जुन',
    'जुलाई',
    'अगष्ट',
    'सेप्टेम्बर',
    'अक्टोबर',
    'नोभेम्बर',
    'डिसेम्बर',
  ],
  numbering: {
    locale: 'ne-u-nu-deva',
    numberingSystem: 'deva',
    fallback: makeNumeralTranslator(Nepali),
  },
});
