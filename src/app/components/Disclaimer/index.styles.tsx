import { css, Theme } from '@emotion/react';

export default {
  infoBanner: () => css({ padding: 0 }),

  inner: ({ palette, spacings, mq }: Theme) =>
    css({
      background: palette.GREY_2,
      color: palette.GREY_6,
      marginBottom: `${spacings.TRIPLE}rem`,
      padding: `${spacings.DOUBLE}rem`,
      [mq.GROUP_3_MIN_WIDTH]: { lineHeight: 1.4 },
    }),

  increasePaddingOnDesktop: ({ mq, spacings }: Theme) =>
    css({
      [mq.GROUP_4_MIN_WIDTH]: {
        padding: `${spacings.DOUBLE}rem ${spacings.QUINTUPLE}rem`,
      },
    }),
};
