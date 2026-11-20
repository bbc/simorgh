import { Burmese, makeNumeralTranslator } from '../numerals/index';
import { registerTimestampLocale } from './registry';

registerTimestampLocale('my', {
  months: [
    'ဇန်နဝါရီ',
    'ဖေဖော်ဝါရီ',
    'မတ်',
    'ဧပြီ',
    'မေ',
    'ဇွန်',
    'ဇူလိုင်',
    'သြဂုတ်',
    'စက်တင်ဘာ',
    'အောက်တိုဘာ',
    'နိုဝင်ဘာ',
    'ဒီဇင်ဘာ',
  ],
  numbering: {
    locale: 'my-u-nu-mymr',
    numberingSystem: 'mymr',
    fallback: makeNumeralTranslator(Burmese),
  },
});
