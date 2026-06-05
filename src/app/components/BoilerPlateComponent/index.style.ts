import { css, Theme } from '@emotion/react';

export default {
  text: ({ palette, mq }: Theme) =>
    css({
      color: palette.GREY_6,
      [mq.GROUP_1_MAX_WIDTH]: {
        color: palette.POSTBOX,
      },
    }),
};
