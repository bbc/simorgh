import styled from '@emotion/styled';
import {
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MAX,
} from '@bbc/gel-foundations/breakpoints';
import { GEL_SPACING_DBL } from '@bbc/gel-foundations/spacings';
import { grid } from '@bbc/psammead-styles/detection';

const fourOfSixColumnsMaxWidthScaleable = `66.67%`;
// (4 / 6) * 100 = 66.6666666667 = 66.67%

const fullWidthColumnsMaxScaleable = `100%`;
// (12 / 12) * 100 = 100 = 100%

const halfWidthColumnsMaxScaleable = `50%`;

const paddingStyles = ({ dir }) =>
  dir === 'ltr'
    ? `padding-left: ${GEL_SPACING_DBL};`
    : `padding-right: ${GEL_SPACING_DBL};`;

const textGridFallbackRadio = ({ fullWidth, dir }) => `
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
    ${!fullWidth && `width: ${fourOfSixColumnsMaxWidthScaleable};`}
    ${paddingStyles(dir)}
  }
`;

const textGridFallbackTv = ({ fullWidth, dir }) => `
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    ${!fullWidth && `width: ${halfWidthColumnsMaxScaleable};`}
    ${paddingStyles(dir)}
  }
`;

const textGridRadio = `
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
    grid-column: 3 / span 4;
    padding: 0;
  }
`;

const textGridTv = `
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    grid-column: 4 / span 3;
    padding: 0;
  }
`;

const textGridFallbackStyles = {
  radio: textGridFallbackRadio,
  tv: textGridFallbackTv,
};

const textGridStyles = {
  radio: textGridRadio,
  tv: textGridTv,
};

const TextGridItem = styled.div`
  display: inline-block;
  width: ${fullWidthColumnsMaxScaleable};
  ${({ bulletinType }) => textGridFallbackStyles[bulletinType]}

  @supports (${grid}) {
    width: initial;
    grid-column: 1 / span 6;
    ${({ bulletinType, fullWidth }) =>
      !fullWidth && textGridStyles[bulletinType]}
  }
`;

export default TextGridItem;
