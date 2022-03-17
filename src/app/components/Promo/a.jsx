import styled from '@emotion/styled';
import { C_EBON } from '#legacy/psammead-styles/colours';

const A = styled.a`
  color: ${C_EBON};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
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
