import { css, Theme } from '@emotion/react';
import pixelsToRem from '../../utilities/pixelsToRem';

export default {
  readTimeText: ({ palette }: Theme) =>
    css({
      color: palette.GREY_6,
    }),
  readTimeContainer: ({ mq, spacings }: Theme) =>
    css({
      margin: `${spacings.FULL}rem ${spacings.FULL}rem ${spacings.TRIPLE}rem`,
      [mq.GROUP_2_MIN_WIDTH]: {
        margin: `${spacings.FULL}rem ${spacings.DOUBLE}rem ${spacings.TRIPLE}rem`,
      },
      [mq.GROUP_4_MIN_WIDTH]: {
        margin: `${spacings.FULL}rem 0 ${spacings.DOUBLE}rem`,
      },
    }),
  readTimePlaceholderControl: ({ spacings }: Theme) =>
    css({
      margin: `0 0 ${spacings.DOUBLE}rem`,
    }),
  readTimeHomepagePlaceholderControl: ({ mq }: Theme) =>
    css({
      height: `${pixelsToRem(18.4)}rem`,
      [mq.GROUP_2_MAX_WIDTH]: {
        height: `${pixelsToRem(19.1)}rem`,
      },
    }),
};
