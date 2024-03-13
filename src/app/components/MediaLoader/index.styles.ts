import { css, Theme } from '@emotion/react';

export default {
  figure: css({
    margin: 0,
  }),
  mediaContainer: ({ palette }: Theme) =>
    css({
      backgroundColor: palette.EBON,
      aspectRatio: '16 / 9',
    }),
};
