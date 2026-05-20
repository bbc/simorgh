import pixelsToRem from '#app/utilities/pixelsToRem';
import { css, Theme } from '@emotion/react';

export default {
  container: ({ palette, fontVariants, fontSizes }: Theme) =>
    css({
      ...fontSizes.brevier,
      ...fontVariants.sansRegular,
      color: `${palette.BLACK}`,
      backgroundColor: `${palette.POSTBOX}`,
      border: `${pixelsToRem(1)}rem solid ${palette.WHITE}`,
      padding: `0 ${pixelsToRem(2)}rem`,
    }),
  mode: ({ palette, spacings }: Theme) =>
    css({
      display: 'inline-block',
      color: `${palette.WHITE}`,
      backgroundColor: `${palette.POSTBOX}`,
      padding: `${spacings.HALF}rem ${spacings.FULL}rem`,
      margin: `${pixelsToRem(2)}rem 0`,
    }),
  on: ({ palette }: Theme) =>
    css({
      backgroundColor: `${palette.WHITE}`,
      color: `${palette.BLACK}`,
    }),
};
