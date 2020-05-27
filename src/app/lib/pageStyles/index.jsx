import styled, { css } from 'styled-components';
import { GEL_GROUP_2_SCREEN_WIDTH_MIN } from '@bbc/gel-foundations/breakpoints';
import { GEL_SPACING, GEL_SPACING_DBL } from '@bbc/gel-foundations/spacings';

export const PageMarginStyles = css`
  margin: 0 ${GEL_SPACING};
  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    margin: 0 ${GEL_SPACING_DBL};
  }
`;

export const StyledMain = styled.main.attrs({ role: 'main' })`
  flex-grow: 1;
  ${PageMarginStyles}
`;
