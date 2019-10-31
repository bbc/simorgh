import styled, { css } from 'styled-components';
import Grid from '@bbc/psammead-grid';
import {
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MAX,
  GEL_GROUP_5_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/breakpoints';
import { C_GHOST } from '@bbc/psammead-styles/colours';

const group4WrapperMaxWidth = `45.5rem`;
// (6.75rem * 6) + 5*16px gutters = 728 = 45.5 rem
const group5WrapperMaxWidth = `46.4rem`;
// (2.95rem * 12) + 11*16px gutters = 742.4 = 46.4 rem

const gelMaxWidths = css`
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_4_SCREEN_WIDTH_MAX}) {
    max-width: ${group4WrapperMaxWidth};
  }
  @media (min-width: ${GEL_GROUP_5_SCREEN_WIDTH_MIN}) {
    max-width: ${group5WrapperMaxWidth};
  }
`;

export const GelPageGrid = styled(Grid)`
  ${gelMaxWidths}
`;

export const GelPageGridGhost = styled(Grid)`
  ${gelMaxWidths}
  background-color: ${C_GHOST};
`;

export const GridMaxWidthGroup4 = styled(Grid)`
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    max-width: ${group4WrapperMaxWidth};
  }
`;

export default Grid;
