import styled from 'styled-components';
import Grid from '@bbc/psammead-grid';
import {
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
  GEL_GROUP_5_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/breakpoints';
import {
  GEL_SPACING,
  GEL_SPACING_DBL,
  GEL_SPACING_QUAD,
} from '@bbc/gel-foundations/spacings';

const group4WrapperMaxWidth = `63rem`; // 1008px
const group5WrapperMaxWidth = `80rem`; // 1280px

export const GridMaxWidthGroup4 = styled(Grid)`
  margin: 0 auto;
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    max-width: ${group4WrapperMaxWidth};
  }
  @media (min-width: ${GEL_GROUP_5_SCREEN_WIDTH_MIN}) {
    max-width: ${group5WrapperMaxWidth};
  }
`;

export const FrontPageGrid = styled(GridMaxWidthGroup4)`
  padding-bottom: ${GEL_SPACING_QUAD};
  margin-top: ${GEL_SPACING};
  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    margin-top: ${GEL_SPACING_DBL};
  }
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    margin-top: 0;
  }
`;

export default Grid;
