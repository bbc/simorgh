import {
  smartPhoneScreenWidthMin,
  smartPhoneScreenWidthMax,
  desktopScreenWidthMin,
} from '../lib/constants/styles';

const mediaQuery = {
  smartPhoneOnly: `@media (min-width: ${smartPhoneScreenWidthMin}em) and (max-width: ${smartPhoneScreenWidthMax}em)`,
  smartPhoneAndLarger: `@media (min-width: ${smartPhoneScreenWidthMin}em)`,
  desktopOnly: `@media (min-width: ${desktopScreenWidthMin}em)`,
};

export { mediaQuery as default };
