import { css, Theme } from '@emotion/react';
import pixelsToRem from '#app/utilities/pixelsToRem';
import { HIDDEN_CLASS_NAME, MAX_NAV_ITEM_HEIGHT } from '../index.styles';

export default {
  // Outer non-scrolling wrapper — owns the gradient overlay.
  // Keeping gradient here (not on the inner scroll div) means it stays fixed
  // to the edge of the component while content scrolls underneath it.
  scrollableNav: ({ mq, spacings }: Theme) =>
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
        // Flex item defaults: min-width:auto prevents shrinking, flex-grow:0 doesn't fill space.
        // minWidth:0 + flexGrow:1 means this wrapper fills all space left by the fixed-width
        // hamburger button, keeping the button on-screen at any viewport width.
        minWidth: 0,
        flexGrow: 1,

        /* Gradient fade overlay — positioned on the non-scrolling wrapper so it
           stays fixed at the edge while inner content scrolls beneath it */
        '&::after': {
          content: "' '",
          height: '100%',
          width: `${spacings.SEXTUPLE}rem`,
          [mq.GROUP_2_MIN_WIDTH]: {
            width: '6rem',
          },
          position: 'absolute',
          top: 0,
          insetInlineEnd: 0,
          zIndex: 3,
          pointerEvents: 'none',
        },
      },
    }),

  // Inner scrolling div — handles overflow, scrollbar hiding and focus ring
  scrollableNavInner: ({ palette, mq, spacings }: Theme) =>
    css({
      [mq.GROUP_2_MAX_WIDTH]: {
        position: 'relative',
        whiteSpace: 'nowrap',
        overflowX: 'scroll',
        /* Avoid smooth scrolling — it causes accessibility issues */
        scrollBehavior: 'auto',
        WebkitOverflowScrolling: 'touch',

        /* Pad the end so the last item can scroll fully clear of the gradient overlay */
        paddingInlineEnd: `${spacings.SEXTUPLE}rem`,
        [mq.GROUP_2_MIN_WIDTH]: {
          paddingInlineEnd: '6rem',
        },

        /* Hide scrollbar */
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        '&::-webkit-scrollbar': {
          display: 'none',
        },

        '&:focus-visible': {
          outline: 'none',
        },

        /* Focus indicator on pseudo-element for Firefox compatibility */
        '&:focus-visible::after': {
          content: "''",
          position: 'absolute',
          inset: 0,
          outline: `${pixelsToRem(3)}rem solid ${palette.BLACK}`,
        },
      },
    }),

  // Applied when navPosition="primary" — sits on POSTBOX background; suppresses gradient overlay
  primary: ({ palette, spacings }: Theme) =>
    css({
      '&::after': {
        background: `linear-gradient(to right, transparent 0%, ${palette.POSTBOX} 100%)`,
      },

      '&[dir="rtl"]::after': {
        background: `linear-gradient(to left, transparent 0%, ${palette.POSTBOX} 100%)`,
      },

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
    }),

  // Applied when navPosition="secondary" — white background row
  secondary: ({ palette, spacings }: Theme) =>
    css({
      '&::after': {
        background: `linear-gradient(to right, transparent 0%, ${palette.WHITE} 100%)`,
      },

      '&[dir="rtl"]::after': {
        background: `linear-gradient(to left, transparent 0%, ${palette.WHITE} 100%)`,
      },

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
