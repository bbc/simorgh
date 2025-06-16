import { mergeDeepLeft } from 'ramda';
import latinWithDiacriticsScript from '../../fontScripts/latinWithDiacritics';
import withThemeProvider from '../../withThemeProvider';
import baseSerbianTheme from './base';
import {
  REITH_SANS_BOLD,
  REITH_SANS_REGULAR,
  REITH_SERIF_MEDIUM,
  REITH_SERIF_LIGHT,
} from '../../fontFaces';
import reithVariants from '../../fontVariants/reith';

const serbianLatinTheme = mergeDeepLeft(
  {
    typography: {
      script: latinWithDiacriticsScript,
    },
  },
  baseSerbianTheme,
);

const pwaTheme = {
  typography: {
    script: latinWithDiacriticsScript,
    fontFaces: [
      REITH_SANS_BOLD,
      REITH_SANS_REGULAR,
      REITH_SERIF_MEDIUM,
      REITH_SERIF_LIGHT,
    ],
    fontVariants: reithVariants,
  },
};

export default withThemeProvider(serbianLatinTheme, pwaTheme);
