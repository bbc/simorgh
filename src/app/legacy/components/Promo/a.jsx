import styled from '@emotion/styled';

const A = styled.a`
  color: ${props =>
    props.theme.isDarkUi
      ? props.theme.palette.GREY_2
      : props.theme.palette.GREY_10};
  text-decoration: none;
  display: block;
  &:hover,
  &:focus {
    text-decoration: underline;
  }
  &:visited {
    color: ${props =>
      props.theme.isDarkUi
        ? props.theme.palette.GREY_4
        : props.theme.palette.GREY_6};
  }
  &:before {
    position: absolute;
    bottom: 0;
    top: 0;
    left: 0;
    right: 0;
    content: '';
  }

  @media (prefers-color-scheme: dark) {
    ${props =>
      !props.theme.isDarkUi &&
      `
      color: ${props.theme.palette.GREY_2};
      &:visited {
        color: ${props.theme.palette.GREY_4};
      }
      `}
  }
`;

// TODO: event tracking
export default A;
