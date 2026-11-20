import { Bengali, makeNumeralTranslator } from '../numerals/index';
import { registerTimestampLocale } from './registry';

registerTimestampLocale('bn', {
  months: [
    'জানুয়ারি',
    'ফেব্রুয়ারি',
    'মার্চ',
    'এপ্রিল',
    'মে',
    'জুন',
    'জুলাই',
    'অগাস্ট',
    'সেপ্টেম্বর',
    'অক্টোবর',
    'নভেম্বর',
    'ডিসেম্বর',
  ],
  numbering: {
    locale: 'bn-u-nu-beng',
    numberingSystem: 'beng',
    fallback: makeNumeralTranslator(Bengali),
  },
});
