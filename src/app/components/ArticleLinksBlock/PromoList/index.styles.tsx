import pixelsToRem from '#app/utilities/pixelsToRem';
import { css, Theme } from '@emotion/react';

export default {
  standardScrollPromo: () =>
    css({
      listStyle: 'none',
      paddingInlineStart: '0',
      margin: '0',
      display: 'flex',
      flexDirection: 'column',
      overflowX: 'scroll',
      scrollBehavior: 'auto',
      WebkitOverflowScrolling: 'touch',
      // Hide scrollbar
      scrollbarWidth: 'none',
      msOverflowStyle: 'none',
      '&::-webkit-scrollbar': {
        display: 'none',
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
      marginInline: `${spacings.FULL}rem`,
      [mq.FORCED_COLOURS]: {
        border: `solid ${pixelsToRem(3)}rem transparent`,
      },

      [mq.GROUP_2_MIN_WIDTH]: {
        marginInline: `${spacings.DOUBLE}rem`,
      },

      [mq.GROUP_3_MIN_WIDTH]: {
        marginInline: `${spacings.DOUBLE}rem`,
      },

      [mq.GROUP_4_MIN_WIDTH]: {
        marginInline: 0,
      },
    }),
  operaStyledList: ({ mq, spacings }: Theme) =>
    css({
      [mq.GROUP_0_MAX_WIDTH]: {
        marginInline: `${spacings.FULL}rem`,
      },

      [mq.GROUP_2_MIN_WIDTH]: {
        marginInline: `${spacings.DOUBLE}rem`,
      },

      [mq.GROUP_4_MIN_WIDTH]: {
        marginInline: 0,
      },
    }),
};
