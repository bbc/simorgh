import {
  Burmese,
  Bengali,
  EasternArabic,
  Nepali,
  WesternArabic,
} from '#lib/locales/numerals';
import { Services } from '../../../models/types/global';

const serviceNumerals = (service: Services) => {
  const servicesNonWesternNumerals = {
    bengali: Bengali,
    burmese: Burmese,
    dari: EasternArabic,
    nepali: Nepali,
    pashto: EasternArabic,
    persian: EasternArabic,
  };
  return servicesNonWesternNumerals[service] || WesternArabic;
};

export default serviceNumerals;
