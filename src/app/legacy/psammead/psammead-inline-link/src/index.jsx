import styled from '@emotion/styled';
import {
  C_POSTBOX,
  C_METAL,
  C_EBON,
  C_BLACK,
  C_WHITE,
} from '#psammead/psammead-styles/src/colours';
import { GEL_SPACING_HLF } from '#psammead/gel-foundations/src/spacings';

const InlineLink = styled.a`
  color: ${C_EBON};
  border-bottom: 1px solid ${C_POSTBOX};
  text-decoration: none;

  &:visited {
    color: ${C_METAL};
    border-bottom: 1px solid ${C_METAL};
  }

  &:focus,
  &:hover {
    border-bottom: 2px solid ${C_POSTBOX};
    color: ${C_POSTBOX};
  }

  &:focus-visible {
    outline: ${GEL_SPACING_HLF} solid ${C_BLACK};
    box-shadow: ${GEL_SPACING_HLF} solid ${C_WHITE};
    outline-offset: ${GEL_SPACING_HLF};
  }
`;

export default InlineLink;
