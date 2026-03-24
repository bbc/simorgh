import { css, Theme } from '@emotion/react';

export default {
  nav: ({ palette }: Theme) =>
    css({
      position: 'relative',
      backgroundColor: palette.WHITE,
    }),

  navOpen: ({ palette, mq }: Theme) =>
    css({
      [mq.GROUP_2_MAX_WIDTH]: {
        backgroundColor: palette.EBON,
      },
    }),

  navWrapper: ({ palette, mq }: Theme) =>
    css({
      position: 'relative',
      maxWidth: '63.4rem',
      margin: '0 auto',
      backgroundColor: palette.WHITE,
      [mq.GROUP_3_MIN_WIDTH]: {
        margin: '0 0.8rem',
      },
      '@media (min-width: 66rem)': {
        margin: '0 auto',
      },
    }),

  withAmpOpenClass:
    (ampOpenClass: string) =>
    ({ palette, mq }: Theme) =>
      css({
        [`&.${ampOpenClass}`]: {
          [mq.GROUP_2_MAX_WIDTH]: {
            backgroundColor: palette.EBON,
          },
        },
      }),
};
