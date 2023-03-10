import styled from '@emotion/styled';

const CardLink = styled.a`
  color: ${props => props.theme.palette.EBON};
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
      color: ${props => props.theme.palette.METAL};
    }
  }
  &:focus {
    .podcast-promo--focus {
      text-decoration: underline;
    }
  }
`;

export default CardLink;
