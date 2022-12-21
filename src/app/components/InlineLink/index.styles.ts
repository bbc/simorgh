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
      '&:focus, &:hover': {
        borderBottom: `${pixelsToRem(2)}rem solid ${palette.POSTBOX}`,
        color: palette.POSTBOX,
      },
      // original solution - does not support on older browsers
      // '&:focus-visible': {
      //   outline: `${pixelsToRem(3)}rem solid ${palette.BLACK}`,
      //   boxShadow: `0 0 0 ${pixelsToRem(3)}rem ${palette.WHITE}`,
      //   outlineOffset: `${pixelsToRem(3)}rem`,
      // },
      // Solution that uses @support - may not be compatible with older browsers
      '@supports selector(:focus-visible)': {
        '&:focus-visible': {
          outline: `${pixelsToRem(3)}rem solid ${palette.BLACK}`,
          boxShadow: `0 0 0 ${pixelsToRem(3)}rem ${palette.WHITE}`,
          outlineOffset: `${pixelsToRem(3)}rem`,
        },
      },
      // Test to see @supports without a property being declared.

      // This will apply this style in any state if focus-visible is supported
      // '@supports selector(:focus-visible)': {
      //   backgroundColor: palette.POSTBOX,
      // },

      // This will apply this style in any state if focus-visible is not supported
      // '@supports not selector(:focus-visible)': {
      //   backgroundColor: palette.POSTBOX,
      // },
    }),
};

export default styles;
