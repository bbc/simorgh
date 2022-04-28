import styled from '@emotion/styled';
import {
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MAX,
} from '@bbc/gel-foundations/breakpoints';
import { GEL_SPACING } from '@bbc/gel-foundations/spacings';
import { grid } from '@bbc/psammead-styles/detection';

const twoOfSixColumnsMaxWidthScaleable = `33.33%`;
// (2 / 6) * 100 = 0.3333333333 = 33.33%

const fullWidthColumnsMaxScaleable = `100%`;
// (12 / 12) * 100 = 100 = 100%

const halfWidthColumnsMaxScaleable = `50%`;

const imageGridFallbackRadio = `
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
    width: ${twoOfSixColumnsMaxWidthScaleable};
  }
`;

const imageGridFallbackTv = `
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    width: ${halfWidthColumnsMaxScaleable};
  }
`;

const imageGridRadio = `
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
    grid-column: 1 / span 2;
  }
`;

const imageGridTv = `
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    grid-column: 1 / span 3;
  }
`;

const imageGridFallbackStyles = {
  radio: imageGridFallbackRadio,
  tv: imageGridFallbackTv,
};

const imageGridStyles = {
  radio: imageGridRadio,
  tv: imageGridTv,
};

const ImageGridItem = styled.div`
  vertical-align: top;
  display: inline-block;
  width: ${fullWidthColumnsMaxScaleable};
  padding: ${GEL_SPACING} ${GEL_SPACING} 0 ${GEL_SPACING};
  ${({ bulletinType }) => imageGridFallbackStyles[bulletinType]}

  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    padding: 0;
  }

  @supports (${grid}) {
    width: initial;
    grid-column: 1 / span 6;
    ${({ bulletinType }) => imageGridStyles[bulletinType]}
  }
`;

export default ImageGridItem;
