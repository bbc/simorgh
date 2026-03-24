import { css, Theme } from '@emotion/react';
import pixelsToRem from '#app/utilities/pixelsToRem';
import { HIDDEN_CLASS_NAME, MAX_NAV_ITEM_HEIGHT } from '../index.styles';

export default {
  scrollableNav: ({ palette, mq, spacings }: Theme) =>
    css({
      // AMP hidden class — toggled via AMP actions, harmless on canonical
      [`&.${HIDDEN_CLASS_NAME}`]: {
        [mq.GROUP_2_MAX_WIDTH]: {
          display: 'none',
          visibility: 'hidden',
        },
      },
      [mq.GROUP_2_MAX_WIDTH]: {
        position: 'relative',
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

  // Applied when navPosition="primary" — sits on POSTBOX background; suppresses gradient overlay
  primary: ({ palette, spacings }: Theme) =>
    css({
      li: {
        marginInlineEnd: 0,

        a: {
          color: palette.WHITE,
          padding: `0 ${spacings.FULL}rem`,
          height: `${pixelsToRem(MAX_NAV_ITEM_HEIGHT)}rem`,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',

          '&:hover::after': {
            borderBottomColor: palette.WHITE,
          },

          '&:focus-visible::after': {
            content: "''",
            position: 'absolute',
            inset: 0,
            border: 'none',
            boxShadow: `inset 0 0 0 ${pixelsToRem(3)}rem ${palette.WHITE}`,
            outline: `${pixelsToRem(2)}rem solid ${palette.BLACK}`,
            outlineOffset: `${pixelsToRem(-2)}rem`,
          },

          '&:focus::after': {
            content: "''",
            position: 'absolute',
            inset: 0,
            border: 'none',
            boxShadow: `inset 0 0 0 ${pixelsToRem(3)}rem ${palette.WHITE}`,
            outline: `${pixelsToRem(2)}rem solid ${palette.BLACK}`,
            outlineOffset: `${pixelsToRem(-2)}rem`,
          },

          '&[data-active="true"]': {
            span: {
              '&::after': {
                borderBottomColor: palette.WHITE,
              },
            },
          },
        },

        '&:before': {
          content: '""',
          position: 'absolute',
          insetInlineEnd: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          height: '60%',
          width: `${pixelsToRem(1)}rem`,
          background: palette.WHITE,
          display: 'block',
          opacity: 0.3,
        },

        '&:last-child:before': {
          display: 'none',
        },
      },

      // Double selector (0,2,0) beats scrollableNav's gradient (0,1,0), regardless of
      // stylesheet injection order (child class is injected after parent class in React).
      '&&::after': {
        background: 'none',
      },
    }),

  // Applied when navPosition="secondary" — white background row
  secondary: ({ palette, spacings }: Theme) =>
    css({
      li: {
        marginInlineEnd: 0,

        a: {
          padding: `0 ${spacings.FULL}rem`,
          height: `${pixelsToRem(MAX_NAV_ITEM_HEIGHT)}rem`,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        },

        '&:before': {
          content: '""',
          position: 'absolute',
          insetInlineEnd: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          height: '60%',
          width: `${pixelsToRem(1)}rem`,
          background: palette.GREY_4,
          display: 'block',
          opacity: 1,
        },

        '&:last-child:before': {
          display: 'none',
        },
      },
    }),
};
