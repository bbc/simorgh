import { css, Theme } from '@emotion/react';

import pixelsToRem from '../../utilities/pixelsToRem';

const styles = {
  self: ({ palette }: Theme) =>
    css({
      color: palette.EBON,
      borderBottom: `${pixelsToRem(1)}rem solid ${palette.POSTBOX}`,
      textDecoration: 'none',
      '&:visited': {
        color: palette.METAL,
        borderBottom: `${pixelsToRem(1)}rem solid ${palette.METAL}`,
      },
      // remove focus from this rule to make it into focus-indicator style. Same styles applied to both hover and focus
      '&:hover': {
        borderBottom: `${pixelsToRem(2)}rem solid ${palette.POSTBOX}`,
        color: palette.POSTBOX,
      },
      // // // SOLUTION 1 - Using @supports selector
      // // // Applies all rules to focus state for browsers that don't handle focus-visible
      // '&:focus': {
      //   borderBottom: `${pixelsToRem(2)}rem solid ${palette.POSTBOX}`,
      //   color: palette.POSTBOX,
      //   outline: `${pixelsToRem(3)}rem solid ${palette.BLACK}`,
      //   boxShadow: `0 0 0 ${pixelsToRem(3)}rem ${palette.WHITE}`,
      //   outlineOffset: `${pixelsToRem(3)}rem`,
      // },
      // // Overrides these rules if focus-visible is supported by browser, applies different styles to focus and focus-visible
      // '@supports selector(:focus-visible)': {
      //   '&:focus': {
      //     borderBottom: `${pixelsToRem(2)}rem solid ${palette.POSTBOX}`,
      //     color: palette.POSTBOX,
      //     outline: `none`,
      //     boxShadow: `none`,
      //     outlineOffset: 0,
      //   },
      //   '&:focus-visible': {
      //     outline: `${pixelsToRem(3)}rem solid ${palette.BLACK}`,
      //     boxShadow: `0 0 0 ${pixelsToRem(3)}rem ${palette.WHITE}`,
      //     outlineOffset: `${pixelsToRem(3)}rem`,
      //   },
      // },
      // // // END SOLUTION 1
      // SOLUTION 2 - using focus:not(:focus-visible)
      // Applies all rules to focus state
      '&:focus': {
        borderBottom: `${pixelsToRem(2)}rem solid ${palette.POSTBOX}`,
        color: palette.POSTBOX,
        outline: `${pixelsToRem(3)}rem solid ${palette.BLACK}`,
      },
      // Overrides these rules depending whether focus-visible state is being used, applies different styles to focus and focus-visible
      '&:focus:not(:focus-visible)': {
        // borderBottom: `${pixelsToRem(2)}rem solid ${palette.POSTBOX}`,
        // color: palette.POSTBOX,
        outline: `none`,
      },

      // WITH THINNED DOWN BORDER, Similar to live site
      '&:focus-visible': {
        outline: `${pixelsToRem(3)}rem solid ${palette.BLACK}`,
      },

      // ALTERNATIVE: WITH THINNED DOWN BORDER, and inset
      // '&:focus-visible': {
      //   outline: `0.125rem solid ${palette.BLACK}`,
      //   boxShadow: `0 0 0 0.125rem ${palette.WHITE} inset`,
      //   outlineOffset: `0rem`,
      // },

      // END SOLUTION 2
      //
      // Original solution - does not have any browser backwards capabilities
      // '&:focus-visible': {
      //   outline: `${pixelsToRem(3)}rem solid ${palette.BLACK}`,
      //   boxShadow: `0 0 0 ${pixelsToRem(3)}rem ${palette.WHITE}`,
      //   outlineOffset: `${pixelsToRem(3)}rem`,
      // },
      //
      // Test to see @supports without a property being declared.
      //
      // This will apply this style in any state if focus-visible is supported
      // '@supports selector(:focus-visible)': {
      //   backgroundColor: palette.POSTBOX,
      // },
      //
      // This will apply this style in any state if focus-visible is not supported
      // '@supports not selector(:focus-visible)': {
      //   backgroundColor: palette.POSTBOX,
      // },
    }),
};

export default styles;
