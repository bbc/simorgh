import styled, { css } from 'styled-components';
import Grid from '@bbc/psammead-grid';
import {
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_2_SCREEN_WIDTH_MAX,
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MAX,
  GEL_GROUP_5_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/breakpoints';
import {
  GEL_SPACING,
  GEL_SPACING_DBL,
  GEL_SPACING_TRPL,
  GEL_SPACING_QUAD,
  GEL_SPACING_QUIN,
} from '@bbc/gel-foundations/spacings';
import { C_GHOST } from '@bbc/psammead-styles/colours';

const group4WrapperMaxWidth = `63rem`; // 1008px
const group5WrapperMaxWidth = `80rem`; // 1280px

const gelMaxWidths = css`
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_4_SCREEN_WIDTH_MAX}) {
    margin: 0 auto;
    max-width: ${group4WrapperMaxWidth};
  }
  @media (min-width: ${GEL_GROUP_5_SCREEN_WIDTH_MIN}) {
    margin: 0 auto;
    max-width: ${group5WrapperMaxWidth};
  }
`;

export const GelPageGrid = styled(Grid)`
  ${gelMaxWidths}
`;

export const GhostGelPageGrid = styled(Grid)`
  ${gelMaxWidths}
  background-color: ${C_GHOST};
`;

export const GridMaxWidthGroup5 = styled(Grid)`
  margin: 0 auto;
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    max-width: ${group4WrapperMaxWidth};
  }
  @media (min-width: ${GEL_GROUP_5_SCREEN_WIDTH_MIN}) {
    max-width: ${group5WrapperMaxWidth};
  }
`;

export const FrontPageGrid = styled(GridMaxWidthGroup5)`
  padding-bottom: ${GEL_SPACING_QUAD};
  margin-top: ${GEL_SPACING};
  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    margin-top: ${GEL_SPACING_DBL};
  }
  @media (max-width: ${GEL_GROUP_2_SCREEN_WIDTH_MAX}) {
    padding-bottom: ${GEL_SPACING_TRPL};
  }
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    margin-top: 0;
  }
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    padding-bottom: ${GEL_SPACING_QUIN};
  }
`;

export default Grid;
