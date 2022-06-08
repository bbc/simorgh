import styled from '@emotion/styled';
import { C_GREY_6, C_GREY_10 } from '#legacy/psammead-styles/src/colours';

const A = styled.a`
  color: ${C_GREY_10};
  text-decoration: none;
  &:hover,
  &:focus {
    text-decoration: underline;
  }
  &:visited {
    color: ${C_GREY_6};
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
