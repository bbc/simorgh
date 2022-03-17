"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jalaaliJs = _interopRequireDefault(require("jalaali-js"));

var _numerals = require("@bbc/psammead-locales/numerals");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var jalaaliMonths = {
  fa: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'],
  ps: ['وری', 'غویی', 'غبرګولی', 'چنګاښ', 'زمری', 'وږی', 'تله', 'لړم', 'لیندۍ', 'مرغومی', 'سلواغه', 'کب']
};
var useEasternNumerals = (0, _numerals.makeNumeralTranslator)(_numerals.EasternArabic); // Helper function to check if argument passed through is a supported moment

var isSupportedMoment = function isSupportedMoment(moment) {
  if (moment && typeof moment.locale === 'function' && moment.isValid() && "".concat(moment.locale()) in jalaaliMonths) {
    return true;
  }

  return false;
};

var jalaali = {
  formatDate: function formatDate(gregorianMoment) {
    if (isSupportedMoment(gregorianMoment)) {
      var jalaaliDate = _jalaaliJs.default.toJalaali(gregorianMoment.year(), gregorianMoment.month() + 1, gregorianMoment.date());

      var localeJalaaliMonths = jalaaliMonths[gregorianMoment.locale()];
      var jalaaliDay = useEasternNumerals(jalaaliDate.jd.toString());
      var jalaaliMonth = localeJalaaliMonths[jalaaliDate.jm - 1];
      var jalaaliYear = useEasternNumerals(jalaaliDate.jy.toString());
      return "".concat(jalaaliDay, " ").concat(jalaaliMonth, " ").concat(jalaaliYear);
    }

    return null;
  }
};
var _default = jalaali;
exports.default = _default;