import styled from '@emotion/styled';

const A = styled.a`
  color: ${({ theme }) =>
    theme.isDarkUi ? theme.palette.GREY_2 : theme.palette.GREY_10};
  text-decoration: none;
  display: block;
  &:hover,
  &:focus {
    text-decoration: underline;
  }
  &:visited {
    color: ${({ theme }) =>
      theme.isDarkUi ? theme.palette.GREY_4 : theme.palette.GREY_6};
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
