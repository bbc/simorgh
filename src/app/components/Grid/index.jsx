import React from 'react';
import styled, { css } from 'styled-components';
import { string, node, number } from 'prop-types';
import Grid from '@bbc/psammead-grid';
import {
  GEL_GROUP_2_SCREEN_WIDTH_MAX,
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MAX,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MAX,
  GEL_GROUP_5_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/breakpoints';
import {
  GEL_MARGIN_BELOW_400PX,
  GEL_MARGIN_ABOVE_400PX,
} from '@bbc/gel-foundations/spacings';

const fourOfSixColumnsMaxWidthGroup4 = `30rem`;
/* (group4ColWidth 6.75rem * 4) + (3 * 16px gutters) = 27rem + 3rem = 30rem */

const eightOfTwelveColumnsMaxWidthGroup5 = `30.6rem`;
/* (group5ColWidth 2.95rem * 8) + (7 * 16px gutters) = 23.6rem + 7rem = 30.6rem */

const fiveOfSixColumnsMaxWidthScaleable = `83.33%`;
// (5 / 6) * 100 = 83.3333.. = 83.33%

const fourOfSixColumnsMaxWidthScaleable = `66.67%`;
// (4 / 6) * 100 = 66.6666.. = 66.67%

export const gelGridMargin = css`
  @media (max-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    padding: 0 ${GEL_MARGIN_BELOW_400PX};
  }
  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
    padding: 0 ${GEL_MARGIN_ABOVE_400PX};
  }
`;

const layoutGridItemSmall = css`
  ${gelGridMargin}

  @media (max-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    ${({ padding = {} }) =>
      padding.group2 ? `padding: 0 ${padding.group2}` : ''};
  }
  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_2_SCREEN_WIDTH_MAX}) {
    max-width: ${fourOfSixColumnsMaxWidthScaleable};
  }
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
    max-width: ${fiveOfSixColumnsMaxWidthScaleable};
    ${({ padding = {} }) =>
      padding.group3 ? `padding: 0 ${padding.group3}` : ''};
  }
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_4_SCREEN_WIDTH_MAX}) {
    max-width: ${fourOfSixColumnsMaxWidthGroup4};
  }
  @media (min-width: ${GEL_GROUP_5_SCREEN_WIDTH_MIN}) {
    max-width: ${eightOfTwelveColumnsMaxWidthGroup5};
  }

  @supports (display: grid) {
    max-width: initial;
  }
`;

export const GelPageGrid = styled(Grid)`
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_4_SCREEN_WIDTH_MAX}) {
    margin: 0 auto;
    max-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN};
  }
  @media (min-width: ${GEL_GROUP_5_SCREEN_WIDTH_MIN}) {
    margin: 0 auto;
    max-width: ${GEL_GROUP_5_SCREEN_WIDTH_MIN};
  }
`;

/* The following components relate to Grid configuration and Grid styles used on the following page types:
 * STY,MAP,PGL,Front Page,IDX page
 */
const StyledCPSPageGrid = styled(Grid)`
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    margin: 0 auto;
    max-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN};
  }
`;

export const CPSPageGrid = ({ children, ...props }) => (
  <StyledCPSPageGrid
    columns={{
      group0: 6,
      group1: 6,
      group2: 6,
      group3: 6,
      group4: 8,
      group5: 8,
    }}
    enableGelGutters
    {...props}
  >
    {children}
  </StyledCPSPageGrid>
);

export const ArticlePageGrid = ({ as, ...props }) => (
  <Grid
    {...props}
    forwardedAs={as}
    enableGelGutters
    columns={{
      group0: 6,
      group1: 6,
      group2: 6,
      group3: 6,
      group4: 8,
      group5: 20,
    }}
  />
);

export const GridWrapper = ({ as, ...props }) => (
  <GelPageGrid
    {...props}
    forwardedAs={as}
    enableGelGutters
    columns={{
      group0: 6,
      group1: 6,
      group2: 6,
      group3: 6,
      group4: 8,
      group5: 20,
    }}
  />
);

export const GridItemConstrainedSmall = styled(({ as, dir, ...props }) => (
  <Grid
    {...props}
    forwardedAs={as}
    dir={dir}
    item
    startOffset={{
      group0: 1,
      group1: 1,
      group2: 1,
      group3: 1,
      group4: 2,
      group5: 5,
    }}
    columns={{
      group0: 6,
      group1: 6,
      group2: 4,
      group3: 5,
      group4: 4,
      group5: 8,
    }}
  />
))`
  ${layoutGridItemSmall}
`;

export const GridItemConstrainedMedium = ({
  as,
  gridColumnStart,
  gridSpan,
  dir,
  ...props
}) => (
  <Grid
    {...props}
    forwardedAs={as}
    dir={dir}
    item
    margins={{
      group0: true,
      group1: true,
      group2: true,
      group3: true,
      group4: false,
      group5: false,
    }}
    startOffset={{
      group0: 1,
      group1: 1,
      group2: 1,
      group3: 1,
      group4: 2,
      group5: gridColumnStart,
    }}
    columns={{
      group0: 6,
      group1: 6,
      group2: 6,
      group3: 5,
      group4: 5,
      group5: gridSpan,
    }}
  />
);

export const GridItemConstrainedMediumNoMargin = ({
  as,
  dir,
  gridColumnStart,
  gridSpan,
  ...props
}) => (
  <Grid
    {...props}
    forwardedAs={as}
    dir={dir}
    item
    startOffset={{
      group0: 1,
      group1: 1,
      group2: 1,
      group3: 1,
      group4: 2,
      group5: gridColumnStart,
    }}
    columns={{
      group0: 6,
      group1: 6,
      group2: 6,
      group3: 5,
      group4: 5,
      group5: gridSpan,
    }}
  />
);

export const GridItemConstrainedLarge = ({ as, dir, ...props }) => (
  <Grid
    {...props}
    dir={dir}
    forwardedAs={as}
    item
    margins={{
      group0: true,
      group1: true,
      group2: true,
      group3: true,
      group4: false,
      group5: false,
    }}
    startOffset={{
      group0: 1,
      group1: 1,
      group2: 1,
      group3: 1,
      group4: 2,
      group5: 5,
    }}
    columns={{
      group0: 6,
      group1: 6,
      group2: 6,
      group3: 6,
      group4: 6,
      group5: 12,
    }}
  />
);

export const GridItemConstrainedLargeNoMargin = ({ as, dir, ...props }) => (
  <Grid
    {...props}
    forwardedAs={as}
    dir={dir}
    item
    startOffset={{
      group0: 1,
      group1: 1,
      group2: 1,
      group3: 1,
      group4: 2,
      group5: 5,
    }}
    columns={{
      group0: 6,
      group1: 6,
      group2: 6,
      group3: 6,
      group4: 6,
      group5: 12,
    }}
  />
);

// 1.
// The max-height must be 0 at Group 5 breakpoints so that
// the item does not force the following sibling item downwards.

const PopOutAtGroup5 = styled(GridItemConstrainedMedium)`
  @supports (display: grid) {
    @media (min-width: ${GEL_GROUP_5_SCREEN_WIDTH_MIN}) {
      max-height: 0; /* [1] */
      padding-top: 0.25rem;
    }
  }
`;
export const PopOutGridItemMedium = props => {
  const { children } = props;
  return <PopOutAtGroup5 {...props}>{children}</PopOutAtGroup5>;
};

ArticlePageGrid.propTypes = {
  // eslint-disable-next-line react/require-default-props
  as: string,
};

GridItemConstrainedLarge.propTypes = {
  // eslint-disable-next-line react/require-default-props
  as: string,
  // eslint-disable-next-line react/require-default-props
  dir: string,
};

GridItemConstrainedLargeNoMargin.propTypes = {
  // eslint-disable-next-line react/require-default-props
  as: string,
  // eslint-disable-next-line react/require-default-props
  dir: string,
};

GridWrapper.propTypes = {
  // eslint-disable-next-line react/require-default-props
  as: string,
};

GridItemConstrainedMediumNoMargin.propTypes = {
  // eslint-disable-next-line react/require-default-props
  as: string,
  // eslint-disable-next-line react/require-default-props
  dir: string,
  gridColumnStart: number,
  gridSpan: number,
};

GridItemConstrainedMedium.propTypes = {
  // eslint-disable-next-line react/require-default-props
  as: string,
  // eslint-disable-next-line react/require-default-props
  dir: string,
  gridColumnStart: number,
  gridSpan: number,
};

GridItemConstrainedMediumNoMargin.defaultProps = {
  gridColumnStart: 5,
  gridSpan: 10,
};

GridItemConstrainedMedium.defaultProps = {
  gridColumnStart: 5,
  gridSpan: 10,
};

CPSPageGrid.propTypes = {
  children: node.isRequired,
};

PopOutGridItemMedium.propTypes = {
  children: node.isRequired,
  gridColumnStart: number,
  gridSpan: number,
};

PopOutGridItemMedium.defaultProps = {
  gridColumnStart: 1,
  gridSpan: 4,
};

export default Grid;
