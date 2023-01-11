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
      // // // END SOLUTION 1
      // SOLUTION 2 - using focus:not(:focus-visible)
      // Applies all rules to focus state
      '&:focus': {
        borderBottom: `${pixelsToRem(2)}rem solid ${palette.POSTBOX}`,
        color: palette.POSTBOX,
        outline: `${pixelsToRem(2)}rem solid ${palette.BLACK}`,
        boxShadow: `0 0 0 ${pixelsToRem(1)}rem ${palette.WHITE}`,
        outlineOffset: `${pixelsToRem(1)}rem`,
      },
      // Overrides these rules depending whether focus-visible state is being used, applies different styles to focus and focus-visible
      '&:focus:not(:focus-visible)': {
        // borderBottom: `${pixelsToRem(2)}rem solid ${palette.POSTBOX}`,
        // color: palette.POSTBOX,
        outline: `none`,
        boxShadow: `none`,
        outlineOffset: `0`,
      },

      // WITH THINNED DOWN BORDER, Similar to live site
      '&:focus-visible': {
        outline: `${pixelsToRem(2)}rem solid ${palette.BLACK}`,
        boxShadow: `0 0 0 ${pixelsToRem(1)}rem ${palette.WHITE}`,
        outlineOffset: `${pixelsToRem(1)}rem`,
      },

      // ALTERNATIVE: WITH THINNED DOWN BORDER, and inset
      // '&:focus-visible': {
      //   outline: `0.125rem solid ${palette.BLACK}`,
      //   boxShadow: `0 0 0 0.125rem ${palette.WHITE} inset`,
      //   outlineOffset: `0rem`,
      // },

      // END SOLUTION 2
    }),
};

export default styles;
