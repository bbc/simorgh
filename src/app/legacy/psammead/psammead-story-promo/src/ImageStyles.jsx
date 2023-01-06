import styled from '@emotion/styled';
import { GEL_SPACING } from '#psammead/gel-foundations/src/spacings';
import {
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MAX,
} from '#psammead/gel-foundations/src/breakpoints';
import { grid } from '#psammead/psammead-styles/src/detection';

const twoOfSixColumnsMaxWidthScaleable = `33.33%`;
// (2 / 6) * 100 = 0.3333333333 = 33.33%

const fourOfSixColumnsMaxWidthScaleable = `66.67%`;
// (4 / 6) * 100 = 66.6666666667 = 66.67%

const fullWidthColumnsMaxScaleable = `100%`;
// (12 / 12) * 100 = 100 = 100%

const halfWidthColumnsMaxScaleable = `50%`;

const gridFallbackImageWidth = `
  width: calc(${halfWidthColumnsMaxScaleable} - ${GEL_SPACING});
`;

const ImageGridColumnsTopStory = `
  grid-column: 1 / span 6;

  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_4_SCREEN_WIDTH_MAX}) {
    grid-column: 1 / span 3;
  }
`;

const ImageGridColumns = `
  grid-column: 1 / span 2;
`;

const ImageGridColumnsLeadingStory = `
  padding: 0;
  grid-template-columns: repeat(6, 1fr);
  grid-column-end: span 6;

  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    grid-template-columns: repeat(3, 1fr);
    grid-column-end: span 3;
  }

  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    grid-template-columns: repeat(4, 1fr);
    grid-column-end: span 4;
  }
`;

const ImageGridFallbackTopStory = `
  margin-bottom: ${GEL_SPACING};
  width: ${fullWidthColumnsMaxScaleable};

  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    ${gridFallbackImageWidth};
    margin-bottom: 0;
  }

  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    ${gridFallbackImageWidth};
  }
`;

const ImageGridFallback = `
  width: ${twoOfSixColumnsMaxWidthScaleable};

  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    display: block;
    width: 100%;
  }
`;

const ImageGridFallbackLeadingStory = dir => `
  width: ${fullWidthColumnsMaxScaleable};

  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    ${
      dir === 'rtl'
        ? `padding-left: ${GEL_SPACING};`
        : `padding-right: ${GEL_SPACING};`
    }
    width: ${halfWidthColumnsMaxScaleable};
  }

  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    width: ${fourOfSixColumnsMaxWidthScaleable};
  }
`;

const imageGridStyles = {
  top: ImageGridColumnsTopStory,
  regular: ImageGridColumns,
  leading: ImageGridColumnsLeadingStory,
};

const imageGridFallbackStyles = {
  top: () => ImageGridFallbackTopStory,
  regular: () => ImageGridFallback,
  leading: dir => ImageGridFallbackLeadingStory(dir),
};

const ImageGridItem = styled.div`
  display: inline-block;
  vertical-align: top;
  position: relative;
  ${({ promoType, dir }) => imageGridFallbackStyles[promoType](dir)}

  @supports (${grid}) {
    width: initial;
    ${({ promoType }) => imageGridStyles[promoType]}
  }
`;

export default ImageGridItem;
