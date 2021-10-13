import styled from '@emotion/styled';
import { C_GHOST } from '@bbc/psammead-styles/colours';
import { GEL_SPACING, GEL_SPACING_HLF_TRPL, GEL_SPACING_DBL } from '@bbc/gel-foundations/spacings';
import { GEL_GROUP_2_SCREEN_WIDTH_MIN, GEL_GROUP_3_SCREEN_WIDTH_MIN } from '@bbc/gel-foundations/breakpoints';

const Card = styled.div`
  position: relative;
  height: auto;
  box-shadow: 0 0 5px 5px rgba(34, 34, 34, 0.03);
  background-color: ${C_GHOST};

  @media (min-width: 23.4rem) {
    width: 9.93rem;
    margin: ${GEL_SPACING_HLF_TRPL} 0 0 0;
  }

  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    width: 16.1rem;
    margin: ${GEL_SPACING_DBL} 0 0 0;
  }

  &:hover {
    .podcast-promo--hover {
      text-decoration: underline;
    }
  }
`;

export default Card;
