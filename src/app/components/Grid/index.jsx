import styled from 'styled-components';
import Grid from '@bbc/psammead-grid';
import { GEL_GROUP_4_SCREEN_WIDTH_MIN } from '@bbc/gel-foundations/breakpoints';
import { C_GHOST } from '@bbc/psammead-styles/colours';

export const GridGhost = styled(Grid)`
  background-color: ${C_GHOST};
`;

const group4WrapperMaxWidth = `45.5rem`;
// (6.75rem * 6) + 5*16px gutters = 728 = 45.5 rem

export const GridMaxWidthGroup4 = styled(Grid)`
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    max-width: ${group4WrapperMaxWidth};
  }
`;
