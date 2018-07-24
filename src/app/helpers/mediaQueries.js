import {
  smartPhoneScreenWidthMin,
  smartPhoneScreenWidthMax,
  tabletScreenWidthMin,
  desktopScreenWidthMin,
} from '../lib/constants/styles';

const mediaQuery = {
  smartPhone: `@media (min-width: ${smartPhoneScreenWidthMin}em) and (max-width: ${smartPhoneScreenWidthMax}em)`,
  tablet: `TODO: above ${tabletScreenWidthMin}em and with touch`,
  desktop: `@media (min-width: ${desktopScreenWidthMin}em)`,
};

export { mediaQuery as default };
