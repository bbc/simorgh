import { css, Theme } from '@emotion/react';
import pixelsToRem from '#app/utilities/pixelsToRem';

export default {
  scrollableNav: ({ palette, mq, spacings }: Theme) =>
    css({
      [mq.GROUP_2_MAX_WIDTH]: {
        position: 'relative', // required so ::after gradient is bounded to this element, not topRow
        whiteSpace: 'nowrap',
        overflowX: 'scroll',
        /* Avoid smooth scrolling — it causes accessibility issues */
        scrollBehavior: 'auto',
        WebkitOverflowScrolling: 'touch',

        /* Hide scrollbar */
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        '&::-webkit-scrollbar': {
          display: 'none',
        },

        '&:focus-visible': {
          outline: 'none',
        },

        /* Focus indicator applied to pseudo-element for Firefox compatibility */
        '&:focus-visible::after': {
          content: "''",
          position: 'absolute',
          width: '100%',
          height: '100%',
          outline: `${pixelsToRem(3)}rem solid ${palette.BLACK}`,
        },

        /* Gradient fade overlay to indicate scrollable content */
        '&::after': {
          content: "' '",
          height: '100%',
          width: `${spacings.SEXTUPLE}rem`,
          [mq.GROUP_2_MIN_WIDTH]: {
            width: '6rem',
          },
          position: 'absolute',
          insetInlineEnd: 0,
          bottom: 0,
          zIndex: 3,
          overflow: 'hidden',
          pointerEvents: 'none',
          /* LTR: fade to the right */
          background: `linear-gradient(to right, transparent 0%, ${palette.WHITE} 100%)`,
        },

        /* RTL: flip gradient to fade toward the left */
        '&[dir="rtl"]::after': {
          background: `linear-gradient(to left, transparent 0%, ${palette.WHITE} 100%)`,
        },
      },
    }),
};
