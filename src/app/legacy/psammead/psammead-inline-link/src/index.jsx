import styled from '@emotion/styled';
import {
  C_POSTBOX,
  C_EBON,
} from '#psammead/psammead-styles/src/colours';

const InlineLink = styled.a`
  color: ${props => props.theme.palette.EBON};
  border-bottom: 1px solid ${props => props.theme.palette.POSTBOX};
  text-decoration: none;

  &:visited {
    color: ${props => props.theme.palette.METAL};
    border-bottom: 1px solid ${props => props.theme.palette.METAL};
  }

  &:focus,
  &:hover {
    border-bottom: 2px solid ${C_POSTBOX};
    color: ${C_POSTBOX};
  }
`;

export default InlineLink;
