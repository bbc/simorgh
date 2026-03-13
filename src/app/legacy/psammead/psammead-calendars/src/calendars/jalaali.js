import jalaaliJs from 'jalaali-js';
import {
  EasternArabic,
  makeNumeralTranslator,
} from '#psammead/psammead-locales/src/numerals';
import { months as pashtoMonths } from '#app/legacy/psammead/psammead-locales/moment/ps';

const jalaaliMonths = {
  fa: [
    'فروردین',
    'اردیبهشت',
    'خرداد',
    'تیر',
    'مرداد',
    'شهریور',
    'مهر',
    'آبان',
    'آذر',
    'دی',
    'بهمن',
    'اسفند',
  ],
  ps: pashtoMonths,
};

const translateEasternNumerals = makeNumeralTranslator(EasternArabic);

// Helper function to check if argument passed through is a supported moment
const isSupportedMoment = moment => {
  if (
    moment &&
    typeof moment.locale === 'function' &&
    moment.isValid() &&
    `${moment.locale()}` in jalaaliMonths
  ) {
    return true;
  }
  return false;
};

const jalaali = {
  formatDate: gregorianMoment => {
    if (isSupportedMoment(gregorianMoment)) {
      const jalaaliDate = jalaaliJs.toJalaali(
        gregorianMoment.year(),
        gregorianMoment.month() + 1,
        gregorianMoment.date(),
      );
      const localeJalaaliMonths = jalaaliMonths[gregorianMoment.locale()];

      const jalaaliDay = translateEasternNumerals(jalaaliDate.jd.toString());
      const jalaaliMonth = localeJalaaliMonths[jalaaliDate.jm - 1];
      const jalaaliYear = translateEasternNumerals(jalaaliDate.jy.toString());

      return `${jalaaliDay} ${jalaaliMonth} ${jalaaliYear}`;
    }
    return null;
  },
};

export default jalaali;
