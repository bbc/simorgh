import styled from '@emotion/styled';
import { C_GHOST, C_EBON } from '@bbc/psammead-styles/colours';
import { GEL_GROUP_4_SCREEN_WIDTH_MIN } from '@bbc/gel-foundations/breakpoints';

const getDisplayProp = ({ isHorizontal }) => {
  return isHorizontal ? 'flex' : 'block';
};

const Card = styled.div`
  position: relative;
  background-color: ${C_GHOST};
  display: flex;
  box-shadow: 0 0 0.3125rem 0.3125rem ${C_EBON}08;

  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    display: ${getDisplayProp};
  }

  &:hover {
    .podcast-promo--hover {
      text-decoration: underline;
    }
  }
`;

export default Card;
