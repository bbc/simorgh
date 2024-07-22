import { css, Theme } from '@emotion/react';

export default {
  figure: ({ spacings }: Theme) =>
    css({
      margin: 0,
      paddingBottom: `${spacings.TRIPLE}rem`,
      width: '100%',
    }),
  mediaContainerLandscape: ({ palette }: Theme) =>
    css({
      backgroundColor: palette.BLACK,
      aspectRatio: '16 / 9',
    }),
  mediaContainerPortrait: ({ palette }: Theme) =>
    css({
      backgroundColor: palette.BLACK,
      aspectRatio: '9 / 16',
    }),
};
