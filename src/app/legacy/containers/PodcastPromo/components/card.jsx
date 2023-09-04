import styled from '@emotion/styled';
import { GEL_GROUP_4_SCREEN_WIDTH_MIN } from '#psammead/gel-foundations/src/breakpoints';

const Card = styled.div`
  position: relative;
  background-color: ${props =>
    props.isOptimo ? props.theme.palette.WHITE : props.theme.palette.GREY_2};
  ${({ inlinePromo }) => (inlinePromo ? 'display: block;' : 'display: flex;')}
  ${({ inlinePromo }) =>
    props =>
      inlinePromo
        ? ''
        : `box-shadow: 0 0 0.3125rem 0.3125rem ${props.theme.palette.EBON}08;`}

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
