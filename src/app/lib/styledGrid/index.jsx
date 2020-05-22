import { node, number } from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import {
  GEL_SPACING,
  GEL_SPACING_DBL,
  GEL_SPACING_QUAD,
} from '@bbc/gel-foundations/spacings';
import {
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_2_SCREEN_WIDTH_MAX,
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
  GEL_GROUP_5_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/breakpoints';
import Grid from '@bbc/psammead-grid';
import {
  layoutGridWrapper,
  layoutGridItemSmall,
  layoutGridItemMedium,
  layoutGridItemMediumNoMargin,
  layoutGridItemLarge,
  layoutGridItemLargeNoMargin,
  nestedGridItemSmallCss,
  nestedGridItemMediumCss,
  nestedGridItemLargeCss,
  gridContainerSmallCss,
  gridContainerMediumCss,
  gridContainerLargeCss,
} from '../layoutGrid';

export const MediumContentContainer = styled.div`
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    margin: 0 auto;
    max-width: 46.4rem;
  }
`;

export const MediumGridWrapper = ({ children }) => {
  const columns = {
    group0: 6,
    group1: 6,
    group2: 6,
    group3: 6,
    group4: 6,
    group5: 12,
  };

  return (
    <Grid enableGelGutters columns={columns}>
      {children}
    </Grid>
  );
};

MediumGridWrapper.propTypes = {
  children: node.isRequired,
};

export const GridItem = ({ children }) => {
  const columns = {
    group0: 6,
    group1: 6,
    group2: 6,
    group3: 6,
    group4: 6,
    group5: 12,
  };

  const margins = {
    group0: true,
    group1: true,
    group2: true,
    group3: true,
    group4: false,
    group5: false,
  };

  return (
    <Grid item columns={columns} margins={margins}>
      {children}
    </Grid>
  );
};

GridItem.propTypes = {
  children: node.isRequired,
};

export const GridItemSmall = ({ children }) => {
  const columns = {
    group0: 4,
    group1: 4,
    group2: 4,
    group3: 4,
    group4: 4,
    group5: 8,
  };

  const margins = {
    group0: true,
    group1: true,
    group2: true,
    group3: false,
    group4: false,
    group5: false,
  };

  return (
    <Grid item columns={columns} margins={margins}>
      {children}
    </Grid>
  );
};

GridItemSmall.propTypes = {
  children: node.isRequired,
};

export const GridItemLargeNoMargin = ({ children }) => {
  const columns = {
    group0: 6,
    group1: 6,
    group2: 6,
    group3: 6,
    group4: 6,
    group5: 12,
  };

  return (
    <Grid item columns={columns}>
      {children}
    </Grid>
  );
};

GridItemLargeNoMargin.propTypes = {
  children: node.isRequired,
};

export const GridItemMedium = ({ children }) => {
  const columns = {
    group0: 6,
    group1: 6,
    group2: 6,
    group3: 6,
    group4: 6,
    group5: 10,
  };

  return (
    <Grid item columns={columns}>
      {children}
    </Grid>
  );
};

GridItemMedium.propTypes = {
  children: node.isRequired,
};

export const GridWrapper = styled.div`
  ${layoutGridWrapper};
  padding-bottom: ${GEL_SPACING_QUAD};
`;

export const GridItemConstrainedSmall = styled.div`
  ${layoutGridItemSmall};
`;

export const GridItemConstrainedMedium = styled.div`
  ${layoutGridItemMedium};
`;

export const GridItemConstrainedMediumNoMargin = styled.div`
  ${layoutGridItemMediumNoMargin};
`;

export const GridItemConstrainedLarge = styled.div`
  ${layoutGridItemLarge};
`;

export const GridItemConstrainedLargeNoMargin = styled.div`
  ${layoutGridItemLargeNoMargin};
`;

export const GridItemConstrainedLargeWithTopMargin = styled(
  GridItemConstrainedLarge,
)`
  margin-top: ${GEL_SPACING};
  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_2_SCREEN_WIDTH_MAX}) {
    margin-top: ${GEL_SPACING_DBL};
  }
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    margin-top: 0;
  }
`;

export const NestedGridItemChildSmall = styled.div`
  ${nestedGridItemSmallCss}
`;

export const NestedGridItemChildMedium = styled.div`
  ${nestedGridItemMediumCss}
`;

export const NestedGridItemChildLarge = styled.div`
  ${nestedGridItemLargeCss}
`;

export const NestedGridParentLarge = styled.div`
  ${gridContainerLargeCss}
`;

export const NestedGridParentMedium = styled.div`
  ${gridContainerMediumCss}
`;

export const NestedGridParentSmall = styled.div`
  ${gridContainerSmallCss}
`;

// 1.
// The max-height must be 0 at Group 5 breakpoints so that
// the item does not force the following sibling item downwards.

const PopOutAtGroup5 = styled.div`
  ${layoutGridItemMedium}
  @supports(display: grid) {
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

export const NestedGridItemLarge = props => {
  const { children } = props;
  return (
    <NestedGridParentLarge>
      <NestedGridItemChildLarge {...props}>{children}</NestedGridItemChildLarge>
    </NestedGridParentLarge>
  );
};
export const NestedGridItemMedium = props => {
  const { children } = props;
  return (
    <NestedGridParentMedium>
      <NestedGridItemChildMedium {...props}>
        {children}
      </NestedGridItemChildMedium>
    </NestedGridParentMedium>
  );
};
export const NestedGridItemSmall = props => {
  const { children } = props;
  return (
    <NestedGridParentSmall>
      <NestedGridItemChildSmall {...props}>{children}</NestedGridItemChildSmall>
    </NestedGridParentSmall>
  );
};

NestedGridItemSmall.propTypes = {
  children: node.isRequired,
};

NestedGridItemMedium.propTypes = {
  children: node.isRequired,
};

NestedGridItemLarge.propTypes = {
  children: node.isRequired,
};

PopOutGridItemMedium.propTypes = {
  children: node.isRequired,
  gridColumnStart: number,
  gridSpan: number,
};

PopOutGridItemMedium.defaultProps = {
  gridColumnStart: 2,
  gridSpan: 4,
};

GridItemConstrainedMediumNoMargin.defaultProps = {
  gridColumnStart: 6,
  gridSpan: 10,
};

GridItemConstrainedMedium.defaultProps = {
  gridColumnStart: 6,
  gridSpan: 10,
};
