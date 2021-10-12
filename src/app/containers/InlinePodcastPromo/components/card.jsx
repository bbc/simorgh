import styled from '@emotion/styled';
import { C_GHOST } from '@bbc/psammead-styles/colours';
import { GEL_GROUP_4_SCREEN_WIDTH_MIN } from '@bbc/gel-foundations/breakpoints';

const Card = styled.div`
  position: relative;
  width: 258px;
  height: auto;
  margin: 11px 0 0 0;
  padding: 0 7px 13px 0;
  box-shadow: 0 0 5px 5px rgba(34, 34, 34, 0.03);
  background-color: ${C_GHOST};

  &:hover {
    .podcast-promo--hover {
      text-decoration: underline;
    }
  }
`;

export default Card;
