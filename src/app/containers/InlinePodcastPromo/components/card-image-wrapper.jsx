import styled from '@emotion/styled';
import { GEL_SPACING } from '@bbc/gel-foundations/spacings';
import {
  GEL_GROUP_B_MIN_WIDTH,
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/breakpoints';

const CardImageWrapper = styled.div`
  display: inline-block;

  @media (min-width: calc(${GEL_GROUP_B_MIN_WIDTH}rem + 3.4rem)) {
    width: 8.9rem;
    height: 8.8rem;
    margin: ${GEL_SPACING};
  }

  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    width: 15.2rem;
    height: 14.2rem;
    margin: ${GEL_SPACING};
  }
`;

export default CardImageWrapper;
