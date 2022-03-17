export var Bengali = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯', '১০'];
export var Burmese = ['၀', '၁', '၂', '၃', '၄', '၅', '၆', '၇', '၈', '၉', '၁၀'];
export var EasternArabic = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹', '۱۰'];
export var Nepali = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९', '१०'];
export var WesternArabic = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

var isValid = function isValid(numerals) {
  return Array.isArray(numerals) && numerals.length >= 10;
};

var noOpTranslator = function noOpTranslator(input) {
  return input;
};

export var makeNumeralTranslator = function makeNumeralTranslator(numeralSystem) {
  return isValid(numeralSystem) ? function (input) {
    return input.replace(/\d/g, function (match) {
      return numeralSystem[match];
    });
  } : noOpTranslator;
};