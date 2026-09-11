import { Services } from '../../../models/types/global';
import {
  Burmese,
  Bengali,
  EasternArabic,
  Nepali,
  WesternArabic,
} from '../../../legacy/psammead/psammead-locales/src/numerals';

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
