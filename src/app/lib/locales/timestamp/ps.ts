import { EasternArabic, makeNumeralTranslator } from '../numerals/index';
import { registerTimestampLocale } from './registry';

registerTimestampLocale('ps', {
  months: [
    'جنوري',
    'فبروري',
    'مارچ',
    'اپریل',
    'می',
    'جون',
    'جولای',
    'اګست',
    'سپتمبر',
    'اکتوبر',
    'نومبر',
    'ډیسمبر',
  ],
  numbering: {
    locale: 'ps-u-nu-arabext',
    numberingSystem: 'arabext',
    fallback: makeNumeralTranslator(EasternArabic),
  },
});
