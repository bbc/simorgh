import styled from '@emotion/styled';
import { GEL_SPACING } from '@bbc/gel-foundations/spacings';
import {
  GEL_GROUP_1_SCREEN_WIDTH_MIN,
  GEL_GROUP_B_MIN_WIDTH,
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/breakpoints';

const CardImageWrapper = styled.div`
  display: inline-block;

  @media (min-width: ${GEL_GROUP_1_SCREEN_WIDTH_MIN}) {
    width: 5.12rem;
    height: 5rem;
    margin: ${GEL_SPACING};
  }

  @media (min-width: calc(${GEL_GROUP_1_SCREEN_WIDTH_MIN} + 1.25rem)) {
    width: 5.62rem;
    height: 5.56rem;
    margin: ${GEL_SPACING};
  }

  @media (min-width: ${GEL_GROUP_B_MIN_WIDTH}rem) {
    width: 7.25rem;
    height: 7.12rem;
    margin: ${GEL_SPACING};
  }

  @media (min-width: calc(${GEL_GROUP_B_MIN_WIDTH}rem + 2.5rem)) {
    width: 8.93rem;
    height: 8.81rem;
    margin: ${GEL_SPACING};
  }

  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    width: 15.18rem;
    height: 14.93rem;
    margin: ${GEL_SPACING};
  }
`;

export default CardImageWrapper;
