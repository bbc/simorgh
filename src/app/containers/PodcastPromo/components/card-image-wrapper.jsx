import styled from '@emotion/styled';
import { GEL_SPACING } from '@bbc/gel-foundations/spacings';
import {
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
  GEL_GROUP_B_MIN_WIDTH,
} from '@bbc/gel-foundations/breakpoints';

const CardImageWrapper = styled.div`
  margin: ${GEL_SPACING} 0 0 ${GEL_SPACING};
  display: none;
  @media (min-width: ${GEL_GROUP_B_MIN_WIDTH}rem) {
    display: block;
    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: 6.5rem;
  }
  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    flex-basis: 6.8125rem;
  }
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    flex-basis: 11.125rem;
    margin: 0;
  }
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    margin: 0;
  }
`;

export default CardImageWrapper;
