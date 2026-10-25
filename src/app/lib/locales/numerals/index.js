export const Bengali = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯', '১০'];
export const Burmese = ['၀', '၁', '၂', '၃', '၄', '၅', '၆', '၇', '၈', '၉', '၁၀'];
export const EasternArabic = [
  '۰',
  '۱',
  '۲',
  '۳',
  '۴',
  '۵',
  '۶',
  '۷',
  '۸',
  '۹',
  '۱۰',
];
export const Nepali = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९', '१०'];
export const WesternArabic = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
];

const isValid = numerals => Array.isArray(numerals) && numerals.length >= 10;

const noOpTranslator = input => input;

export const makeNumeralTranslator = numeralSystem =>
  isValid(numeralSystem)
    ? input => input.replace(/\d/g, match => numeralSystem[match])
    : noOpTranslator;
