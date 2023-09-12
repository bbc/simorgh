import { Theme, css } from '@emotion/react';
import pixelsToRem from '../../../../../../src/app/utilities/pixelsToRem';

export default {
  postHeading: ({ spacings, palette, mq }: Theme) =>
    css({
      color: palette.POSTBOX,
      padding: `${spacings.TRIPLE}rem 0 0`,
      // overwrite default heading padding
      [mq.GROUP_3_MIN_WIDTH]: {
        padding: `${spacings.TRIPLE}rem 0 0`,
      },
    }),

  postSubHeading: ({ palette, mq }: Theme) =>
    css({
      color: palette.POSTBOX,
      padding: `${pixelsToRem(8)}rem 0 0`,
      // overwrite default heading padding
      [mq.GROUP_3_MIN_WIDTH]: {
        padding: `${pixelsToRem(8)}rem 0 0`,
      },
    }),

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

  bodyText: ({ palette, spacings }: Theme) =>
    css({
      color: palette.BLACK,
      margin: 0 /* Reset */,
      paddingBottom: `${spacings.DOUBLE}rem`,
    }),
};
