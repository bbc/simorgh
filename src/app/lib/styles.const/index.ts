import { css } from '@emotion/react';

import {
  GROUP_1_MAX_WIDTH,
  GROUP_2_MIN_WIDTH,
  GROUP_3_MIN_WIDTH,
} from '#components/ThemeProvider/mediaQueries';
import {
  MARGIN_ABOVE_400PX,
  MARGIN_BELOW_400PX,
  QUADRUPLE,
  TRIPLE,
} from '#components/ThemeProvider/spacings';

export const NEGATIVE_MARGIN = `${GROUP_1_MAX_WIDTH} {
    /* To remove GEL Margins */
    margin: ${QUADRUPLE}rem -${MARGIN_BELOW_400PX} 0;
    padding: 0 ${MARGIN_BELOW_400PX};
  }
  ${GROUP_2_MIN_WIDTH} {
    margin: ${QUADRUPLE}rem -${MARGIN_ABOVE_400PX} 0;
  }
  ${GROUP_3_MIN_WIDTH} {
    margin: ${TRIPLE}rem -${MARGIN_ABOVE_400PX} 0;
}`;

export const NegativeMargin = css({
  [GROUP_1_MAX_WIDTH]: {
    /* To remove GEL Margins */
    margin: `${QUADRUPLE}rem -${MARGIN_BELOW_400PX} 0`,
    padding: `0 ${MARGIN_BELOW_400PX}`,
  },
  [GROUP_2_MIN_WIDTH]: {
    margin: `${QUADRUPLE}rem -${MARGIN_ABOVE_400PX} 0`,
  },
  [GROUP_3_MIN_WIDTH]: { margin: `${TRIPLE}rem -${MARGIN_ABOVE_400PX} 0` },
});

/**
 * These styles are lifted from #psammead/psammead-visually-hidden-text/src
 * (https://github.com/bbc/simorgh/blob/c9253b928bc4db268c1d3eff237657a53c777633/src/app/legacy/psammead/psammead-visually-hidden-text/src/index.jsx#L3-L11),
 *  which we cannot use directly as we require control over _when_ they are applied.
 */
export const visuallyHiddenStyle = `
clip-path: inset(100%);
clip: rect(1px, 1px, 1px, 1px);
height: 1px;
overflow: hidden;
position: absolute;
width: 1px;
margin: 0;
`;
