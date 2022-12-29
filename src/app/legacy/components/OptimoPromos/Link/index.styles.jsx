import {
  C_METAL,
  C_EBON,
  C_BLACK,
  C_WHITE,
} from '#psammead/psammead-styles/src/colours';
import styled from '@emotion/styled';

// Focus visible indicator to show around all focusable elements, links, buttons etc, across the WS sites.
const focusIndicatorThickness = '0.1875rem';

const Link = styled.a`
  position: static;
  color: ${C_EBON};
  text-decoration: none;
  overflow-wrap: anywhere;

  // focus removed
  &:hover {
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

  // SOLUTION 2 - using focus:not(:focus-visible)
  // Applies all rules to focus state
  &:focus {
    text-decoration: underline;
    display: block;
    outline: ${focusIndicatorThickness} solid ${C_BLACK};
    box-shadow: 0 0 0 ${focusIndicatorThickness} ${C_WHITE};
    outline-offset: ${focusIndicatorThickness};
  }
  //
  // Overrides these rules depending whether focus-visible state is being used, applies different styles to focus and focus-visible
  &:focus:not(:focus-visible) {
    outline: none;
    box-shadow: none;
    outline-offset: 0;
  }
  //
  &:focus-visible {
    display: block;
    outline: ${focusIndicatorThickness} solid ${C_BLACK};
    box-shadow: 0 0 0 ${focusIndicatorThickness} ${C_WHITE};
    outline-offset: ${focusIndicatorThickness};
  }
  // END SOLUTION 2
`;

export default Link;
