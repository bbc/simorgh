import styled from '@emotion/styled';

// `display: inline-block` has been used to resolve Focus Indicator bug in Firefox high contrast mode.
const Link = styled.a`
  position: static;
  color: ${props => props.theme.palette.EBON_LINK};
  text-decoration: none;
  overflow-wrap: anywhere;
  display: inline-block;

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
    color: ${props => props.theme.palette.METAL_VISITED};
  }
`;

export default Link;
