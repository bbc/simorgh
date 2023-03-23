import styled from '@emotion/styled';

const A = styled.a`
  color: ${props => props.theme.palette.GREY_10};
  text-decoration: none;
  &:hover,
  &:focus {
    text-decoration: underline;
  }
  &:visited {
    color: ${props => props.theme.palette.GREY_6};
  }
  &:before {
    position: absolute;
    bottom: 0;
    top: 0;
    left: 0;
    right: 0;
    content: '';
  }
`;

// TODO: event tracking
export default A;
