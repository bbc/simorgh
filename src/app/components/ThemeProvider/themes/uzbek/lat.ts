import { mergeDeepLeft } from 'ramda';
import latinWithDiacriticsScript from '../../fontScripts/latinWithDiacritics';
import withThemeProvider from '../../withThemeProvider';
import baseUzbekTheme from './base';
import reithVariants from '../../fontVariants/reith';
import {
  REITH_SANS_BOLD,
  REITH_SANS_REGULAR,
  REITH_SERIF_MEDIUM,
  REITH_SERIF_LIGHT,
} from '../../fontFaces';

const uzbekLatinTheme = mergeDeepLeft(
  {
    typography: {
      script: latinWithDiacriticsScript,
    },
  },
  baseUzbekTheme,
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

export default withThemeProvider(uzbekLatinTheme, pwaTheme);
