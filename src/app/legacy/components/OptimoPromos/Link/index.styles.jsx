import { C_METAL, C_EBON } from '#psammead/psammead-styles/src/colours';
import styled from '@emotion/styled';

const Link = styled.a`
  position: static;
  color: ${C_EBON};
  text-decoration: none;
  overflow-wrap: anywhere;

  &:hover,
  &:focus {
    text-decoration: underline;
  }

  &:before {
    bottom: 0;
    content: '';
    left: 0;
    overflow: hidden;
    position: absolute;
    right: 0;
    top: 0;
    white-space: nowrap;
    z-index: 1;
  }

  &:visited {
    color: ${C_METAL};
  }
`;

export default Link;
