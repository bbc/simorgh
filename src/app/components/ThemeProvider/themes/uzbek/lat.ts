import { ServiceTheme } from '#app/models/types/theming';
import { mergeDeepLeft } from 'ramda';
import latinWithDiacriticsScript from '../../fontScripts/latinWithDiacritics';
import withThemeProvider from '../../withThemeProvider';
import baseUzbekTheme from './base';
import getPWATypographyTheme from '../getPWATypographyTheme';

const uzbekLatinTheme = mergeDeepLeft(
  {
    typography: {
      script: latinWithDiacriticsScript,
    },
  },
  baseUzbekTheme,
);

export default withThemeProvider(
  { ...uzbekLatinTheme, service: 'uzbek' },
  getPWATypographyTheme(latinWithDiacriticsScript),
);
