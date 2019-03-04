import styled from 'styled-components';
import { C_GHOST } from '@bbc/psammead-styles/colours';
import {
  layoutGridWrapper,
  layoutGridItemSmall,
  layoutGridItemMedium,
  layoutGridItemLarge,
} from './layoutGrid';

export const GhostWrapper = styled.div`
  ${layoutGridWrapper};
  background: ${C_GHOST};
`;

export const GridItemConstrainedMediumSmall = styled.div`
  ${layoutGridItemSmall};
`;

export const GridItemConstrainedMediumMedium = styled.div`
  ${layoutGridItemMedium};
`;

export const GridItemConstrainedMediumLarge = styled.div`
  ${layoutGridItemLarge};
`;
