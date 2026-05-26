import type { TypographyScript } from '#models/types/theming';
import {
  REITH_SANS_BOLD,
  REITH_SANS_REGULAR,
  REITH_SERIF_LIGHT,
  REITH_SERIF_MEDIUM,
} from '../fontFaces';
import latinScript from '../fontScripts/latin';
import reithVariants from '../fontVariants/reith';

export default (script: TypographyScript = latinScript) => ({
  typography: {
    script,
    fontFaces: [
      REITH_SANS_BOLD,
      REITH_SANS_REGULAR,
      REITH_SERIF_MEDIUM,
      REITH_SERIF_LIGHT,
    ],
    fontVariants: reithVariants,
  },
});
