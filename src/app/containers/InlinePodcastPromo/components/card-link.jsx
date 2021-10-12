import styled from '@emotion/styled';
import { C_METAL, C_EBON } from '@bbc/psammead-styles/colours';
import { getPica } from '@bbc/gel-foundations/typography';
import { getSerifMedium } from '@bbc/psammead-styles/font-styles';

const CardLink = styled.a`
  ${({ script }) => getPica(script)}
  ${({ service }) => getSerifMedium(service)}
  width: 145px;
  height: 20px;
  margin: 2px 9.5px 5px 9.5px;
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
