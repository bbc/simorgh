import { css, Theme } from '@emotion/react';

export default {
  figure: ({ spacings }: Theme) =>
    css({
      position: 'relative',
      margin: 0,
      paddingBottom: `${spacings.TRIPLE}rem`,
      width: '100%',
    }),
  mediaContainer: ({ palette }: Theme) =>
    css({
      backgroundColor: palette.BLACK,
      aspectRatio: '16 / 9',
    }),
};
