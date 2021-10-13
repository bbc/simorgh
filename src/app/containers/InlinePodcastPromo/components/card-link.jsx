import styled from '@emotion/styled';
import { C_METAL, C_EBON } from '@bbc/psammead-styles/colours';
import { getPica } from '@bbc/gel-foundations/typography';
import { getSerifMedium } from '@bbc/psammead-styles/font-styles';
import { GEL_SPACING_HLF_TRPL } from '@bbc/gel-foundations/spacings';
import { GEL_GROUP_2_SCREEN_WIDTH_MIN, GEL_GROUP_3_SCREEN_WIDTH_MIN } from '@bbc/gel-foundations/breakpoints';

const CardLink = styled.a`
  ${({ script }) => getPica(script)}
  ${({ service }) => getSerifMedium(service)}
  line-height: 1.33;
  color: ${C_EBON};
  text-decoration: none;
  :before {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    content: '';
    overflow: hidden;
    z-index: 1;
  }

  @media (min-width: 23.4rem) {
    margin: 0 10px;
  }

  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    margin: 0 10px;
  }

  &:visited {
    .podcast-promo--visited {
      color: ${C_METAL};
    }
  }
  &:focus {
    .podcast-promo--focus {
      text-decoration: underline;
    }
  }
`;

export default CardLink;
