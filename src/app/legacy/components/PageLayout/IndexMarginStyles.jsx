import {
  GEL_SPACING,
  GEL_SPACING_DBL,
} from '#legacy/gel-foundations/src/spacings';
import { GEL_GROUP_2_SCREEN_WIDTH_MIN } from '#legacy/gel-foundations/src/breakpoints';

const IndexMarginStyles = `
  margin: 0 ${GEL_SPACING};
  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    margin: 0 ${GEL_SPACING_DBL};
  }
`;

export default IndexMarginStyles;
