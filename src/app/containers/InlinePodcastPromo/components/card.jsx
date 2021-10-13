import styled from '@emotion/styled';
import { C_GHOST } from '@bbc/psammead-styles/colours';
import { GEL_SPACING, GEL_SPACING_DBL } from '@bbc/gel-foundations/spacings';
import {
  GEL_GROUP_0_SCREEN_WIDTH_MAX,
  GEL_GROUP_1_SCREEN_WIDTH_MIN,
  GEL_GROUP_B_MIN_WIDTH,
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/breakpoints';

const Card = styled.div`
  position: relative;
  height: auto;
  margin: ${GEL_SPACING_DBL} 0 0 0;
  box-shadow: 0 0 5px 5px rgba(34, 34, 34, 0.03);
  background-color: ${C_GHOST};

  @media (max-width: ${GEL_GROUP_0_SCREEN_WIDTH_MAX}) {
    width: calc(100-7) %;
    padding: ${GEL_SPACING} 0;
  }

  @media (min-width: ${GEL_GROUP_1_SCREEN_WIDTH_MIN}) {
    width: 6.06rem;
  }

  @media (min-width: calc(${GEL_GROUP_1_SCREEN_WIDTH_MIN} + 1.25rem)) {
    width: 6.56rem;
  }

  @media (min-width: ${GEL_GROUP_B_MIN_WIDTH}rem) {
    width: 8.25rem;
  }

  @media (min-width: calc(${GEL_GROUP_B_MIN_WIDTH}rem + 2.5rem)) {
    width: 9.93rem;
  }

  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    width: 16.12rem;
  }

  &:hover {
    .podcast-promo--hover {
      text-decoration: underline;
    }
  }
`;

export default Card;
