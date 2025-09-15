import { css, Theme } from '@emotion/react';

export default {
  wrapper: ({ palette, mq, spacings }: Theme) =>
    css({
      backgroundColor: palette.GREY_10,
      [mq.GROUP_4_MIN_WIDTH]: {
        paddingTop: `${spacings.QUINTUPLE}rem`,
      },
      [mq.GROUP_3_MAX_WIDTH]: {
        paddingTop: `${spacings.DOUBLE}rem`,
      },
      [mq.GROUP_2_MAX_WIDTH]: {
        paddingTop: `${spacings.DOUBLE}rem`,
      },
      [mq.GROUP_1_MAX_WIDTH]: {
        paddingTop: `${spacings.FULL}rem`,
      },
    }),
  pageGrid: ({ spacings, mq }: Theme) =>
    css({
      paddingBottom: `${spacings.QUADRUPLE}rem`,
      [mq.GROUP_4_MIN_WIDTH]: {
        width: '100%',
      },
    }),
  mediaPlayer: ({ mq, spacings }: Theme) =>
    css({
      [mq.GROUP_4_MIN_WIDTH]: {
        margin: `0px 0px 0px`,
      },
      [mq.GROUP_2_MAX_WIDTH]: {
        margin: `0px -${spacings.DOUBLE}rem 0px`,
      },
      [mq.GROUP_1_MAX_WIDTH]: {
        margin: `0px -${spacings.FULL}rem 0px`,
      },
    }),
};
