import { css, Theme } from '@emotion/react';

export default {
  readTime: ({ palette }: Theme) =>
    css({
      color: palette.GREY_6,
    }),
  readTimeBelowHeadline: ({ mq, spacings }: Theme) =>
    css({
      margin: `0 ${spacings.FULL}rem ${spacings.DOUBLE}rem`,
      [mq.GROUP_2_MIN_WIDTH]: {
        margin: `0 ${spacings.DOUBLE}rem ${spacings.DOUBLE}rem`,
      },
      [mq.GROUP_4_MIN_WIDTH]: {
        margin: `0 0 ${spacings.DOUBLE}rem`,
      },
    }),
  readTimeBelowTimestamp: ({ spacings }: Theme) =>
    css({
      marginBottom: `${spacings.DOUBLE}rem`,
    }),
};
