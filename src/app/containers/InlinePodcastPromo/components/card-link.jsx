import styled from '@emotion/styled';
import { C_METAL, C_EBON } from '@bbc/psammead-styles/colours';
import { getPica } from '@bbc/gel-foundations/typography';
import { getSerifMedium } from '@bbc/psammead-styles/font-styles';
import { GEL_SPACING } from '@bbc/gel-foundations/spacings';
import { GEL_GROUP_1_SCREEN_WIDTH_MIN } from '@bbc/gel-foundations/breakpoints';

const CardLink = styled.a`
  ${({ script }) => getPica(script)}
  ${({ service }) => getSerifMedium(service)}
  display: block;
  line-height: 1.33;
  color: ${C_EBON};
  margin: 0 ${GEL_SPACING};
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

  @media (min-width: ${GEL_GROUP_1_SCREEN_WIDTH_MIN}) {
    margin: 0 ${GEL_SPACING};
  }

  @media (min-width: calc(${GEL_GROUP_1_SCREEN_WIDTH_MIN} + 1.25rem)) {
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
