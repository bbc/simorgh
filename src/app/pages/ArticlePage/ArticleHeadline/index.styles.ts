import { css, Theme } from '@emotion/react';
import pixelsToRem from '#app/utilities/pixelsToRem';

export default {
  reducePadding: ({ spacings, mq }: Theme) =>
    css({
      paddingBottom: `${spacings.HALF}rem`,
      [mq.GROUP_3_MIN_WIDTH]: {
        paddingBottom: `${pixelsToRem(12)}rem`,
      },
    }),
};
