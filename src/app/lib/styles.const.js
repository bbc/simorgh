import {
  GEL_GROUP_1_SCREEN_WIDTH_MAX,
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/breakpoints';
import {
  GEL_SPACING_TRPL,
  GEL_SPACING_QUAD,
  GEL_MARGIN_BELOW_400PX,
  GEL_MARGIN_ABOVE_400PX,
} from '@bbc/gel-foundations/spacings';

// eslint-disable-next-line import/prefer-default-export
export const NEGATIVE_MARGIN = `@media (max-width: ${GEL_GROUP_1_SCREEN_WIDTH_MAX}) {
    /* To remove GEL Margins */
    margin: ${GEL_SPACING_QUAD} -${GEL_MARGIN_BELOW_400PX} 0;
    padding: 0 ${GEL_MARGIN_BELOW_400PX};
  }
  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    margin: ${GEL_SPACING_QUAD} -${GEL_MARGIN_ABOVE_400PX} 0;
  }
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    margin: ${GEL_SPACING_TRPL} -${GEL_MARGIN_ABOVE_400PX} 0;
  }`;
