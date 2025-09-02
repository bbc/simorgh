import { css, Theme } from '@emotion/react';
import pixelsToRem from '../../utilities/pixelsToRem';

export default {
  readTimeText: ({ palette }: Theme) =>
    css({
      color: palette.GREY_6,
    }),
  readTimeContainer: () =>
    css({
      display: 'inline-block',
      // margin: `0 ${spacings.FULL}rem ${spacings.DOUBLE}rem`,
      // [mq.GROUP_2_MIN_WIDTH]: {
      //   margin: `0 ${spacings.DOUBLE}rem ${spacings.DOUBLE}rem`,
      // },
      // [mq.GROUP_4_MIN_WIDTH]: {
      //   margin: `0 0 ${spacings.DOUBLE}rem`,
      // },
    }),
  readTimeInlineStyles: () =>
    css({
      paddingInlineStart: `0.5rem`,
      '::before': {
        content: '""',
        display: `inline-block`,
        border: `0.0625rem solid #8A8C8E`,
        backgroundColor: '#8A8C8E',
        marginRight: '8px',
        verticalAlign: 'middle',
      },
    }),
  readTimePlaceholderControl: () =>
    css({
      margin: `0 0 ${pixelsToRem(34.5)}rem`,
    }),
};
