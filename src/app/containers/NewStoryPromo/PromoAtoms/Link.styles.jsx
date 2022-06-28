import { C_METAL, C_EBON } from '#app/legacy/psammead-styles/src/colours';
import styled from '@emotion/styled';

export default styled.a`
  position: static;
  color: ${C_EBON};
  text-decoration: none;
  overflow-wrap: break-word;

  &:hover,
  &:focus {
    text-decoration: underline;
  }

  &:visited {
    color: ${C_METAL};
  }
`;
