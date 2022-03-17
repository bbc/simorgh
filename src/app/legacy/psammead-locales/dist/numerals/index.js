"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeNumeralTranslator = exports.WesternArabic = exports.Nepali = exports.EasternArabic = exports.Burmese = exports.Bengali = void 0;
var Bengali = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯', '১০'];
exports.Bengali = Bengali;
var Burmese = ['၀', '၁', '၂', '၃', '၄', '၅', '၆', '၇', '၈', '၉', '၁၀'];
exports.Burmese = Burmese;
var EasternArabic = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹', '۱۰'];
exports.EasternArabic = EasternArabic;
var Nepali = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९', '१०'];
exports.Nepali = Nepali;
var WesternArabic = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
exports.WesternArabic = WesternArabic;

var isValid = function isValid(numerals) {
  return Array.isArray(numerals) && numerals.length >= 10;
};

var noOpTranslator = function noOpTranslator(input) {
  return input;
};

var makeNumeralTranslator = function makeNumeralTranslator(numeralSystem) {
  return isValid(numeralSystem) ? function (input) {
    return input.replace(/\d/g, function (match) {
      return numeralSystem[match];
    });
  } : noOpTranslator;
};

exports.makeNumeralTranslator = makeNumeralTranslator;