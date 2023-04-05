import { css } from '@emotion/react';
import {
  GEL_GROUP_1_SCREEN_WIDTH_MAX,
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
} from '#psammead/gel-foundations/src/breakpoints';
import {
  GEL_SPACING_TRPL,
  GEL_SPACING_QUAD,
  GEL_MARGIN_BELOW_400PX,
  GEL_MARGIN_ABOVE_400PX,
} from '#psammead/gel-foundations/src/spacings';

import * as mq from '../components/ThemeProvider/mediaQueries';
import * as spacings from '../components/ThemeProvider/spacings';

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

export const negativeMargin = css({
  [mq.GROUP_1_MAX_WIDTH]: {
    /* To remove GEL Margins */
    margin: `${spacings.QUADRUPLE}rem -${spacings.FULL}rem 0`,
    padding: `0 ${spacings.FULL}rem`,
  },
  [mq.GROUP_2_MIN_WIDTH]: {
    margin: `${spacings.QUADRUPLE}rem -${spacings.DOUBLE}rem 0`,
  },
  [mq.GROUP_3_MIN_WIDTH]: {
    margin: `${spacings.TRIPLE}rem -${spacings.DOUBLE}rem 0`,
  },
});
