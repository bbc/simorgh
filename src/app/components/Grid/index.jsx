import styled, { css } from 'styled-components';
import Grid from '@bbc/psammead-grid';
import {
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MAX,
  GEL_GROUP_5_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/breakpoints';

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

export const StyledFrontPageMain = styled.main`
  /* To centre page layout for Group 4+ */
  margin: 0 auto;
  width: 100%; /* Needed for IE11 */
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    max-width: ${group4WrapperMaxWidth};
  }
`;

export default Grid;
