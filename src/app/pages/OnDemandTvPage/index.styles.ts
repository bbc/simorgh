import { css, Theme } from '@emotion/react';

export default {
  wrapper: ({ palette }: Theme) => css({ backgroundColor: palette.GREY_10 }),
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
        margin: `${spacings.QUINTUPLE}rem 0px 0px`,
      },
      [mq.GROUP_3_MAX_WIDTH]: {
        marginTop: `${spacings.DOUBLE}rem`,
      },
      [mq.GROUP_2_MAX_WIDTH]: {
        margin: `${spacings.DOUBLE}rem -${spacings.DOUBLE}rem 0px`,
      },
      [mq.GROUP_1_MAX_WIDTH]: {
        margin: `${spacings.FULL}rem -${spacings.FULL}rem 0px`,
      },
    }),
};
