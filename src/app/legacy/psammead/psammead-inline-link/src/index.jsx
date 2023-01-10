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
const twoPixels = '0.125rem';

const InlineLink = styled.a`
  color: ${C_EBON};
  border-bottom: 1px solid ${C_POSTBOX};
  text-decoration: none;

  &:visited {
    color: ${C_METAL};
    border-bottom: 1px solid ${C_METAL};
  }

  // remove focus from this rule to make it into focus-indicator style. Same styles applied to both hover and focus
  &:hover {
    border-bottom: 2px solid ${C_POSTBOX};
    color: ${C_POSTBOX};
  }

  // SOLUTION 2 - using focus:not(:focus-visible) - V1
  // Applies all rules to focus state
  &:focus {
    border-bottom: 2px solid ${C_POSTBOX};
    color: ${C_POSTBOX};
    outline: ${focusIndicatorThickness} solid ${C_BLACK};
  }
  //
  // Overrides these rules depending whether focus-visible state is being used, applies different styles to focus and focus-visible
  &:focus:not(:focus-visible) {
    outline: none;
  }
  //
  &:focus-visible {
    outline: ${focusIndicatorThickness} solid ${C_BLACK};
  }
  // END SOLUTION 2 - V1

  // // SOLUTION 2 - using focus:not(:focus-visible) - V2
  // // Applies all rules to focus state
  // &:focus {
  //   border-bottom: 2px solid ${C_POSTBOX};
  //   color: ${C_POSTBOX};
  //   outline: ${twoPixels} solid ${C_BLACK};
  //   outline-offset: ${twoPixels};
  // }
  // //
  // // Overrides these rules depending whether focus-visible state is being used, applies different styles to focus and focus-visible
  // &:focus:not(:focus-visible) {
  //   outline: none;
  // }
  // //
  // &:focus-visible {
  //   outline: ${twoPixels} solid ${C_BLACK};
  //   outline-offset: ${twoPixels};
  // }
  // // END SOLUTION 2 - V2

  // // SOLUTION 2 - using focus:not(:focus-visible) - V3
  // // Applies all rules to focus state
  // &:focus {
  //   border-bottom: 2px solid ${C_POSTBOX};
  //   color: ${C_POSTBOX};
  //   outline: ${focusIndicatorThickness} solid ${C_BLACK};
  //   box-shadow: 0 0 0 ${focusIndicatorThickness} ${C_WHITE};
  //   outline-offset: ${focusIndicatorThickness};
  // }
  // //
  // // Overrides these rules depending whether focus-visible state is being used, applies different styles to focus and focus-visible
  // &:focus:not(:focus-visible) {
  //   outline: none;
  //   box-shadow: none;
  //   outline-offset: 0;
  // }
  // //
  // &:focus-visible {
  //   outline: ${focusIndicatorThickness} solid ${C_BLACK};
  //   box-shadow: 0 0 0 ${focusIndicatorThickness} ${C_WHITE};
  //   outline-offset: ${focusIndicatorThickness};
  // }
  // // END SOLUTION 2 - V3
`;

export default InlineLink;
