import styled from '@emotion/styled';
import {
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
} from '#app/legacy/gel-foundations/src/breakpoints';
import {
  GEL_SPACING_BORDER,
  GEL_SPACING,
  GEL_SPACING_DBL,
} from '#app/legacy/gel-foundations/src/spacings';
import { C_GREY_6, C_WHITE } from '#app/legacy/psammead-styles/src/colours';

export const ContentWrapper = styled.div`
  padding: ${GEL_SPACING};
  border: ${GEL_SPACING_BORDER} solid ${C_WHITE};

  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    padding: ${GEL_SPACING_DBL} ${GEL_SPACING};
  }

  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    padding: ${GEL_SPACING_DBL};
  }
`;

export const PromoWrapper = styled.div`
  overflow: hidden;
  position: relative;
  &:hover {
    a {
      text-decoration: underline;
    }
  }
  &:visited {
    a {
      color: ${C_GREY_6};
    }
  }
  height: 100%;
`;
