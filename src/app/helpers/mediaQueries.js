import {
  smartPhoneScreenWidthMin,
  smartPhoneScreenWidthMax,
  tabletScreenWidthMin,
  desktopScreenWidthMin,
} from '../lib/constants/styles';

const mediaQuery = {
  smartPhoneOnly: `@media (min-width: ${smartPhoneScreenWidthMin}em) and (max-width: ${smartPhoneScreenWidthMax}em)`,
  smartPhoneAndLarger: `@media (min-width: ${smartPhoneScreenWidthMin}em)`,
  tabletOnly: `TODO: above ${tabletScreenWidthMin}em and with touch`,
  desktopOnly: `@media (min-width: ${desktopScreenWidthMin}em)`,
};

export { mediaQuery as default };
