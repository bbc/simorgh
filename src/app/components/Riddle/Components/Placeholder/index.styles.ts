import pixelsToRem from '#app/utilities/pixelsToRem';
import { css, Theme } from '@emotion/react';

export default {
  placeholder: ({ mq, palette }: Theme) =>
    css({
      background: palette.GREY_2,
      width: '100%',
      height: `${pixelsToRem(504)}rem`,
      [mq.GROUP_2_MAX_WIDTH]: {
        height: `${pixelsToRem(572)}rem`,
      },
    }),
};
