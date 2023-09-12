import { Theme, css } from '@emotion/react';
import pixelsToRem from '../../../../../../src/app/utilities/pixelsToRem';

export default {
  postBackground: ({ palette, spacings, mq }: Theme) =>
    css({
      backgroundColor: palette.GREY_2,
      margin: `${spacings.DOUBLE}rem 0`,
      padding: `0 ${pixelsToRem(8)}rem ${pixelsToRem(8)}rem`,
      [mq.GROUP_2_MIN_WIDTH]: {
        padding: `0 0 ${pixelsToRem(8)}rem 0`,
      },
      [mq.GROUP_4_MIN_WIDTH]: {
        padding: `0 ${pixelsToRem(16)}rem ${pixelsToRem(8)}rem`,
      },
    }),

  postContent: ({ spacings }: Theme) =>
    css({
      paddingTop: `${spacings.DOUBLE}rem`,
    }),
};
