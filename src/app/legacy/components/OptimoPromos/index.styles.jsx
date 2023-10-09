import styled from '@emotion/styled';
import {
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
} from '#psammead/gel-foundations/src/breakpoints';
import {
  GEL_SPACING,
  GEL_SPACING_DBL,
} from '#psammead/gel-foundations/src/spacings';

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
  background-color: ${({ theme }) =>
    theme.isDarkUi ? theme.palette.GREY_3 : theme.palette.WHITE};
  height: 100%;
`;
