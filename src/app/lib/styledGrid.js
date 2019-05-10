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

export const NestedGridItemSmall = styled.div`
  ${nestedGridItemSmallCss}
`;

export const NestedGridItemMedium = styled.div`
  ${nestedGridItemMediumCss}
`;

export const NestedGridItemLarge = styled.div`
  ${nestedGridItemLargeCss}
`;
