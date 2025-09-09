import { css, Theme } from '@emotion/react';
import pixelsToRem from '../../utilities/pixelsToRem';

export default {
  readTimeText: ({ palette }: Theme) =>
    css({
      color: palette.GREY_6,
    }),
  readTimeContainer: ({ mq, spacings }: Theme) =>
    css({
      margin: `0 ${spacings.FULL}rem ${spacings.DOUBLE}rem`,
      [mq.GROUP_2_MIN_WIDTH]: {
        margin: `0 ${spacings.DOUBLE}rem ${spacings.DOUBLE}rem`,
      },
      [mq.GROUP_4_MIN_WIDTH]: {
        margin: `0 0 ${spacings.DOUBLE}rem`,
      },
    }),
  readTimePlaceholderControl: () =>
    css({
      margin: `0 0 ${pixelsToRem(34.5)}rem`,
    }),
  readTimeHomepagePlaceholderControl: () =>
    css({
      height: `${pixelsToRem(18.5)}rem`,
    }),
};
