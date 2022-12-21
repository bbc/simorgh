import styled from '@emotion/styled';
import {
  C_POSTBOX,
  C_METAL,
  C_EBON,
  C_BLACK,
  C_WHITE,
} from '#psammead/psammead-styles/src/colours';

// Focus visible indicator to show around all focusable elements, links, buttons etc, across the WS sites.
const focusIndicatorThickness = '0.1875rem';

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

  // Original solution - not working with backwards compatibility
  // &:focus-visible {
  //   outline: ${focusIndicatorThickness} solid ${C_BLACK};
  //   box-shadow: 0 0 0 ${focusIndicatorThickness} ${C_WHITE};
  //   outline-offset: ${focusIndicatorThickness};
  // }

  // Original solution - working with backwards compatibility using @supports
  @supports selector(:focus-visible) {
    &:focus-visible {
      outline: ${focusIndicatorThickness} solid ${C_BLACK};
      box-shadow: 0 0 0 ${focusIndicatorThickness} ${C_WHITE};
      outline-offset: ${focusIndicatorThickness};
    }
  }

  // Test to see @supports without a property being declared.

  // This will apply this style in any state if focus-visible is supported
  // @supports selector(:focus-visible) {
  //   background-color: yellow;
  // }
  // This will apply this style in any state if focus-visible is not supported
  // @supports not selector(:focus-visible) {
  //   background-color: yellow;
  // }
`;

export default InlineLink;
