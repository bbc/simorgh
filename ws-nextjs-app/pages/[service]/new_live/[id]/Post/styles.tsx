import { Theme, css } from '@emotion/react';
import pixelsToRem from '../../../../../../src/app/utilities/pixelsToRem';

export default {
  postHeadings: ({ palette }: Theme) =>
    css({
      color: palette.BLACK,
      display: `block`,
      margin: 0 /* Reset */,
    }),
  postHeadline: ({ spacings, mq }: Theme) =>
    css({
      padding: `${spacings.TRIPLE}rem ${pixelsToRem(8)}rem 0`,
      [mq.GROUP_2_MIN_WIDTH]: {
        padding: `${spacings.TRIPLE}rem ${pixelsToRem(16)}rem 0`,
      },
      [mq.GROUP_4_MIN_WIDTH]: {
        padding: `${spacings.TRIPLE}rem 0 0`,
      },
    }),

  postSubHeadline: ({ mq, fontSizes }: Theme) =>
    css({
      padding: `${pixelsToRem(4)}rem ${pixelsToRem(8)}rem 0`,
      [mq.GROUP_2_MIN_WIDTH]: {
        padding: `${pixelsToRem(4)}rem ${pixelsToRem(16)}rem 0`,
        ...fontSizes.longPrimer,
      },
      [mq.GROUP_4_MIN_WIDTH]: {
        padding: `${pixelsToRem(4)}rem 0 0`,
      },
    }),

  postBackground: ({ palette, spacings, mq }: Theme) =>
    css({
      backgroundColor: palette.GREY_2,
      margin: `0 0 ${spacings.DOUBLE}rem`,
      padding: `0 ${pixelsToRem(8)}rem ${pixelsToRem(8)}rem`,
      border: `solid ${pixelsToRem(3)}rem transparent`,
      [mq.GROUP_2_MIN_WIDTH]: {
        margin: `0 0 ${spacings.TRIPLE}rem`,
        padding: `0 0 ${pixelsToRem(8)}rem 0`,
      },
      [mq.GROUP_4_MIN_WIDTH]: {
        margin: `0 0 ${spacings.DOUBLE}rem`,
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
      '& li': {
        marginBottom: `${pixelsToRem(8)}rem`,
      },
    }),
};
