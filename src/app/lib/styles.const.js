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
