import pixelsToRem from '#app/utilities/pixelsToRem';
import { css, Theme } from '@emotion/react';

export default {
  container: ({ palette }: Theme) =>
    css({
      color: `${palette.BLACK}`,
      backgroundColor: `${palette.POSTBOX}`,
      border: `${pixelsToRem(1)}rem solid ${palette.WHITE}`,
    }),
  containerWithoutAccount: ({ fontVariants, fontSizes, spacings }: Theme) =>
    css({
      ...fontSizes.brevier,
      ...fontVariants.sansRegular,
      margin: `${pixelsToRem(2)}rem`,
      padding: `0 ${pixelsToRem(2)}rem`,
      '& span': {
        padding: `${spacings.HALF}rem ${spacings.FULL}rem`,
        margin: `${pixelsToRem(2)}rem 0`,
      },
    }),
  containerWithAccount: ({ fontVariants, fontSizes }: Theme) =>
    css({
      ...fontSizes.minion,
      ...fontVariants.sansRegular,
      margin: `0.5rem 0.3rem`,
      display: 'flex',
      flexDirection: 'column',
      '& span': {
        display: 'block',
        padding: `0.1rem 0.4rem`,
        flex: '1',
        alignItems: 'center',
      },
    }),
  mode: ({ palette }: Theme) =>
    css({
      display: 'inline-block',
      color: `${palette.WHITE}`,
      backgroundColor: `${palette.POSTBOX}`,
      textAlign: 'center',
    }),
  on: ({ palette }: Theme) =>
    css({
      backgroundColor: `${palette.WHITE}`,
      color: `${palette.BLACK}`,
    }),
};
