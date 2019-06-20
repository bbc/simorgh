import { node } from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { C_GHOST } from '@bbc/psammead-styles/colours';
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
} from './layoutGrid';

export const GhostWrapper = styled.div`
  ${layoutGridWrapper};
  background: ${C_GHOST};
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

export const NestedGridItemChildSmall = styled.div`
  ${nestedGridItemSmallCss}
`;

export const NestedGridItemChildMedium = styled.div`
  ${nestedGridItemMediumCss}
`;

export const NestedGridChildItemLarge = styled.div`
  ${nestedGridItemLargeCss}
`;

const NestedGridParentLarge = styled.div`
  ${gridContainerLargeCss}
`;

const NestedGridParentMedium = styled.div`
  ${gridContainerMediumCss}
`;

const NestedGridParentSmall = styled.div`
  ${gridContainerSmallCss}
`;

export const NestedGridItemLarge = props => {
  const { children } = props;
  return (
    <NestedGridParentLarge>
      <NestedGridChildItemLarge {...props}>{children}</NestedGridChildItemLarge>
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
