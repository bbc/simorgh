import styled from '@emotion/styled';
import {
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
} from '#app/legacy/gel-foundations/src/breakpoints';
import {
  GEL_SPACING,
  GEL_SPACING_BORDER,
  GEL_SPACING_DBL,
} from '#app/legacy/gel-foundations/src/spacings';
import { C_WHITE } from '#app/legacy/psammead-styles/src/colours';

export const ContentWrapper = styled.div`
  padding: ${GEL_SPACING};

  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    padding: ${GEL_SPACING_DBL} ${GEL_SPACING};
  }

  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    padding: ${GEL_SPACING_DBL};
  }
`;

export const PromoWrapper = styled.div`
  position: relative;
  border: ${GEL_SPACING_BORDER} solid transparent;
  height: 100%;
  background-color: ${C_WHITE};
`;
