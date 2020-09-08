import styled, { css } from 'styled-components';
import { GEL_SPACING, GEL_SPACING_DBL } from '@bbc/gel-foundations/spacings';
import {
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MAX,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
  GEL_GROUP_5_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/breakpoints';
import { grid } from '@bbc/psammead-styles/detection';

const twoOfSixColumnsMaxWidthScaleable = `33.33%`;
// (2 / 6) * 100 = 0.3333333333 = 33.33%

const fourOfSixColumnsMaxWidthScaleable = `66.67%`;
// (4 / 6) * 100 = 66.6666666667 = 66.67%

const fullWidthColumnsMaxScaleable = `100%`;
// (12 / 12) * 100 = 100 = 100%

const halfWidthColumnsMaxScaleable = `50%`;

const paddingDir = ({ dir }) => `padding-${dir === 'rtl' ? 'left' : 'right'}`;

const TextGridColumnsTopStory = css`
  grid-column: 1 / span 6;

  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    grid-column: 4 / span 3;
  }

  @media (min-width: ${GEL_GROUP_5_SCREEN_WIDTH_MIN}) {
    grid-column: 7 / span 6;
  }
`;

const TextGridColumns = css`
  grid-column: 3 / span 4;

  ${({ displayImage }) => !displayImage && `grid-column: 1 / span 6;`}

  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    padding-top: ${({ displayImage }) => (displayImage ? GEL_SPACING : '0')};
  }
`;

const TextGridColumnsLeadingStory = css`
  padding: 0;
  width: 100%;
  grid-template-columns: repeat(6, 1fr);
  grid-column-end: span 6;

  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    grid-template-columns: repeat(3, 1fr);
    grid-column-end: span 3;
  }

  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    grid-template-columns: repeat(2, 1fr);
    grid-column-end: span 2;
  }
`;

const TextGridFallbackTopStory = css`
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    width: ${halfWidthColumnsMaxScaleable};
    padding: 0 ${GEL_SPACING_DBL};
  }

  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    width: ${halfWidthColumnsMaxScaleable};
  }
`;

const TextGridFallback = css`
  width: ${fourOfSixColumnsMaxWidthScaleable};
  padding: 0 ${GEL_SPACING};

  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    padding: 0 ${GEL_SPACING_DBL};
  }

  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    display: block;
    width: 100%;
    padding: ${GEL_SPACING} 0;
  }

  ${({ displayImage }) =>
    !displayImage &&
    `width: ${fullWidthColumnsMaxScaleable}; >div{ vertical-align: middle; }`}
`;

const TextGridFallBackLeadingStory = css`
  width: ${fullWidthColumnsMaxScaleable};
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    ${paddingDir}: ${GEL_SPACING};
    width: ${halfWidthColumnsMaxScaleable};
  }
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    width: ${twoOfSixColumnsMaxWidthScaleable};
  }
`;

const textGridFallbackStyles = {
  top: TextGridFallbackTopStory,
  regular: TextGridFallback,
  leading: TextGridFallBackLeadingStory,
};

const textGridStyles = {
  top: TextGridColumnsTopStory,
  regular: TextGridColumns,
  leading: TextGridColumnsLeadingStory,
};

// This applies 8px padding only to the timestamp.
// The headline already has padding so targeting the timestamp prevents double padding
// from being applied.
const leadingPromoTimestampPadding = `
  >time {
    @media (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
      padding-bottom: ${GEL_SPACING};
    }
  }
`;

const TextGridItem = styled.div`
  display: inline-block;
  vertical-align: top;

  ${({ promoType }) => textGridFallbackStyles[promoType]}

  @supports (${grid}) {
    display: block;
    width: initial;
    padding: initial;
    ${({ promoType }) => textGridStyles[promoType]}
  }

  ${({ promoType }) => promoType === 'leading' && leadingPromoTimestampPadding}

  ${({ displayImage }) =>
    !displayImage &&
    `>div{ display:inline-block; vertical-align:initial; }
       & svg{ margin: 0; }`}
`;

export default TextGridItem;
