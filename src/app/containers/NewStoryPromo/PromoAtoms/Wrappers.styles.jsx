import styled from '@emotion/styled';
import {
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
} from '#app/legacy/gel-foundations/src/breakpoints';
import {
  GEL_SPACING,
  GEL_SPACING_DBL,
} from '#app/legacy/gel-foundations/src/spacings';

export const BoxWrapper = styled.div`
  position: relative;
  background-color: white;
  padding: ${GEL_SPACING};
  height: 100%;

  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    padding: ${GEL_SPACING_DBL} ${GEL_SPACING};
  }

  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    padding: ${GEL_SPACING_DBL};
  }
`;

export const ViewWrapper = styled.div`
  height: 100%;
`;
