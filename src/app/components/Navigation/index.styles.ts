import pixelsToRem from '#app/utilities/pixelsToRem';
import { css, Theme } from '@emotion/react';
import { GROUP_B_MIN_WIDTH } from '../ThemeProvider/fontMediaQueries';
import { STICKY_MIN_VIEWPORT_HEIGHT } from './config';

export const HIDDEN_CLASS_NAME = 'si-nav-scrollable-hidden';

export const MAX_NAV_ITEM_HEIGHT = 44;

export default {
  stickyContainer: ({ palette }: Theme) =>
    css({
      position: 'fixed',
      top: 0,
      insetInlineStart: 0,
      width: '100%',
      zIndex: 10000,
      backgroundColor: palette.WHITE,
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
      transform: 'translateY(-100%)',
      transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      // Only applied while the bar is pinned, so the browser keeps it on its
      // own compositor layer for the slide and drops the layer afterwards.
      willChange: 'transform',

      // When a user zooms in a lot (roughly 200% or more), the browser
      // reports a much shorter viewport. We don't want the bar fixed to the
      // top of the screen in that case, because it would cover too much of
      // the visible page.
      //
      // Below this height, we switch `position` from `fixed` to `static`.
      // That means the bar is no longer pinned to the top of the screen, and
      // instead scrolls away normally with the rest of the content, like it
      // does before the user has scrolled down at all.
      //
      // We also check the screen height in JavaScript (search the codebase
      // for STICKY_MIN_VIEWPORT_HEIGHT) and avoid pinning the bar there too.
      // This CSS rule exists as a backup, in case there is ever a brief
      // moment where the JavaScript state has not updated yet.
      [`@media (max-height: ${STICKY_MIN_VIEWPORT_HEIGHT - 1}px)`]: {
        position: 'static',
        transform: 'none',
        boxShadow: 'none',
      },
    }),
  stickyVisible: css({
    transform: 'translateY(0)',
  }),
  brandDivider: ({ palette }: Theme) =>
    css({
      position: 'relative',
      width: '100%',
      margin: '0 auto',
      borderBottom: `${pixelsToRem(1)}rem solid ${palette.POSTBOX}`,
      opacity: 0.7,
    }),
  bottomDivider: ({ palette }: Theme) =>
    css({
      position: 'absolute',
      width: '100%',
      insetInlineStart: 0,

      '@media (min-width: 1041px)': {
        width: '100%',
      },

      '&::after': {
        content: "''",
        position: 'absolute',
        insetBlockEnd: 0,
        width: '100%',
        borderBottom: `${pixelsToRem(1)}rem solid ${palette.GREY_3}`,
      },
    }),
  navStack: css({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  }),
  navRowWrapper: css({
    position: 'relative',
    width: '100%',
  }),
  ampScrollableNav: ({ mq }: Theme) =>
    css({
      [`&.${HIDDEN_CLASS_NAME}`]: {
        [mq.GROUP_2_MAX_WIDTH]: {
          display: 'none',
          visibility: 'hidden',
        },
      },
    }),
  topRow: ({ palette }: Theme) =>
    css({
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'stretch',
      justifyContent: 'space-between',
      position: 'relative',
      zIndex: 0,
      backgroundColor: palette.POSTBOX,

      '&::before': {
        content: "''",
        position: 'absolute',
        zIndex: -1,
        top: 0,
        bottom: 0,
        width: '100vw',
        left: '50%',
        transform: 'translateX(-50%)',
        background: palette.POSTBOX,
        pointerEvents: 'none' /* ensure it never interferes with clicks */,
      },
    }),
  topRowItems: ({ palette, spacings }: Theme) =>
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
            boxShadow: `inset 0 0 0 ${pixelsToRem(3)}rem ${palette.WHITE}`,
            outline: `${pixelsToRem(2)}rem solid ${palette.BLACK}`,
            outlineOffset: `${pixelsToRem(-2)}rem`,
          },

          '&:focus::after': {
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

      '&:after': {
        background: 'none',
      },
    }),
  bottomRowItems: ({ palette, spacings }: Theme) =>
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
  dropdown: ({ palette, spacings }: Theme) =>
    css({
      position: 'absolute',
      top: '100%',
      left: '0',
      width: '100%',
      zIndex: 99999,

      borderBottom: `${pixelsToRem(3)}rem solid ${palette.POSTBOX}`,

      ul: {
        padding: 0,
        border: 'none',

        li: {
          padding: 0,

          '&:last-child': {
            paddingBottom: 0,
          },
        },
      },

      a: {
        display: 'block',
        position: 'relative',
        paddingInline: `${spacings.FULL}rem`,

        '&:hover': {
          backgroundColor: palette.GREY_3,
          textDecoration: 'none',
        },

        '&:before': {
          content: '""',
          position: 'absolute',
          top: 0,
          insetInlineStart: 0,
          height: '100%',
          width: `${pixelsToRem(4)}rem`,
          background: palette.POSTBOX,
          display: 'block',
          opacity: 0,
        },

        '&:hover::before': {
          opacity: 1,
        },

        '&:focus-visible': {
          outlineOffset: `-${pixelsToRem(3)}rem`,
        },
      },
    }),
  lowerNavWrapper: css({
    width: '100%',
    position: 'relative',
    zIndex: 1,
  }),
  menuButton: ({ palette }: Theme) =>
    css({
      backgroundColor: palette.POSTBOX,
      color: palette.WHITE,
      overflow: 'hidden',

      width: `${pixelsToRem(MAX_NAV_ITEM_HEIGHT)}rem`,
      height: `${pixelsToRem(MAX_NAV_ITEM_HEIGHT)}rem`,

      [GROUP_B_MIN_WIDTH]: {
        width: `${pixelsToRem(MAX_NAV_ITEM_HEIGHT)}rem`,
        height: `${pixelsToRem(MAX_NAV_ITEM_HEIGHT)}rem`,
      },

      svg: {
        verticalAlign: 'middle',
        fill: palette.WHITE,
      },
    }),
};
