import { node, number } from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import {
  layoutGridWrapper,
  layoutGridItemSmall,
  layoutGridItemMedium,
  layoutGridItemLarge,
  layoutGridItemLargeNoMargin,
  nestedGridItemSmallCss,
  nestedGridItemMediumCss,
  nestedGridItemLargeCss,
  gridContainerSmallCss,
  gridContainerMediumCss,
  gridContainerLargeCss,
} from '../layoutGrid';

export const Grid = styled.div`
  ${layoutGridWrapper};
  padding-bottom: 2rem;
`;

export const GhostGrid = styled.div`
  ${layoutGridWrapper};
  background: #fff;
  padding-bottom: 2rem;
`;

export const GridItemConstrainedSmall = styled.div`
  ${layoutGridItemSmall};
`;

export const GridItemConstrainedMedium = styled.div`
  ${layoutGridItemMedium};
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
  margin-top: 0.5rem;
  @media (min-width: 200px) and (max-width: 399px) {
    margin-top: 1rem;
  }
  @media (min-width: 400px) {
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
    @media (min-width: 1280px) {
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

GridItemConstrainedMedium.defaultProps = {
  gridColumnStart: 6,
  gridSpan: 10,
};
