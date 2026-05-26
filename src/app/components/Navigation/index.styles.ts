import { css, type Theme } from '@emotion/react';

import pixelsToRem from '#app/utilities/pixelsToRem';
import { GROUP_B_MIN_WIDTH } from '../ThemeProvider/fontMediaQueries';

export const HIDDEN_CLASS_NAME = 'si-nav-scrollable-hidden';

export const MAX_NAV_ITEM_HEIGHT = 44;

export default {
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
