import styled from '@emotion/styled';
import { C_GHOST, C_EBON } from '#legacy/psammead-styles/src/colours';
import { GEL_GROUP_4_SCREEN_WIDTH_MIN } from '#legacy/gel-foundations/src/breakpoints';

const Card = styled.div`
  position: relative;
  background-color: ${C_GHOST};
  ${({ inlinePromo }) => (inlinePromo ? 'display: block;' : 'display: flex;')}
  ${({ inlinePromo }) =>
    inlinePromo ? '' : `box-shadow: 0 0 0.3125rem 0.3125rem ${C_EBON}08;`}

  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    display: block;
  }
  &:hover {
    .podcast-promo--hover {
      text-decoration: underline;
    }
  }
`;

export default Card;
