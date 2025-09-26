import pixelsToRem from '#app/utilities/pixelsToRem';
import { css, Theme } from '@emotion/react';

export default {
  standardScrollPromo: ({ mq, spacings }: Theme) =>
    css({
      listStyle: 'none',
      paddingInlineStart: '0',
      margin: '0',
      display: 'flex',
      overflowX: 'scroll',
      scrollBehavior: 'auto',
      WebkitOverflowScrolling: 'touch',
      // Hide scrollbar
      scrollbarWidth: 'none',
      msOverflowStyle: 'none',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
      '& > li + li': {
        marginInlineStart: `${spacings.FULL}rem`,
      },
      [mq.GROUP_2_MIN_WIDTH]: {
        '& > li:not(:first-of-type)': {
          marginInlineStart: `${spacings.DOUBLE}rem`,
        },
      },
    }),
  operaScrollPromo: () =>
    css({
      listStyle: 'none',
      paddingInlineStart: '0',
      margin: '0',
    }),
  list: ({ mq, spacings }: Theme) =>
    css({
      display: 'flex',
      flexShrink: 0,
      [mq.FORCED_COLOURS]: {
        border: `solid ${pixelsToRem(3)}rem transparent`,
      },

      [mq.GROUP_0_MAX_WIDTH]: {
        'li:first-of-type': {
          marginInlineStart: `${spacings.FULL}rem`,
        },
        'li:last-of-type': {
          marginInlineEnd: `${spacings.FULL}rem`,
        },
      },

      [mq.GROUP_2_MIN_WIDTH]: {
        'li:first-of-type': {
          marginInlineStart: 0,
        },
      },

      [mq.GROUP_4_MIN_WIDTH]: {
        marginInlineStart: `${spacings.DOUBLE}rem`,
        'li:first-of-type': {
          marginInlineStart: 0,
        },
      },
    }),
  operaStyledList: ({ mq, spacings }: Theme) =>
    css({
      [mq.GROUP_0_MAX_WIDTH]: {
        marginInlineStart: `${spacings.FULL}rem`,
      },

      [mq.GROUP_2_MIN_WIDTH]: {
        marginInlineStart: `${spacings.DOUBLE}rem`,
      },

      [mq.GROUP_4_MIN_WIDTH]: {
        marginInlineStart: 0,
      },
    }),
};
