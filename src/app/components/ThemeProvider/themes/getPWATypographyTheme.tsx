import { TypographyScript } from '#models/types/theming';
import reithVariants from '../fontVariants/reith';
import latinScript from '../fontScripts/latin';
import {
  REITH_SANS_BOLD,
  REITH_SANS_REGULAR,
  REITH_SERIF_MEDIUM,
  REITH_SERIF_LIGHT,
} from '../fontFaces';

export default (script: TypographyScript = latinScript) => {
  return {
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
  };
};
