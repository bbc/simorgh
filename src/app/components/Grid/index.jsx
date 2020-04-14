import styled, { css } from 'styled-components';
import Grid from '@bbc/psammead-grid';
import {
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MAX,
  GEL_GROUP_5_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/breakpoints';

const gelMaxWidths = css`
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_4_SCREEN_WIDTH_MAX}) {
    margin: 0 auto;
    max-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN};
  }
  @media (min-width: ${GEL_GROUP_5_SCREEN_WIDTH_MIN}) {
    margin: 0 auto;
    max-width: ${GEL_GROUP_5_SCREEN_WIDTH_MIN};
  }
`;

/*
  hasMaxWidths prop has nothing to do with @bbc/psammead-grid but is used here to prevent
  `gelMaxWidths` from getting applied to pages with specific max-width requirement
  eg, for the story page, gel group 4 and above should all have same max-widths.
 */
export const GelPageGrid = styled(Grid)`
  ${({ hasMaxWidths }) => (hasMaxWidths ? '' : gelMaxWidths)}
`;

export default Grid;
