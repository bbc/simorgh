import pixelsToRem from '#app/utilities/pixelsToRem';
import { css, Theme } from '@emotion/react';

export default {
  divider: ({ palette }: Theme) =>
    css({
      position: 'absolute',
      width: '100%',
      insetInlineStart: 0,
      '@media (min-width: 1041px)': {
        width: '100%',
        insetInlineStart: '0',
      },
      '&::after': {
        content: "''",
        position: 'absolute',
        insetBlockEnd: 0,
        width: '100%',
        borderBottom: `${pixelsToRem(1)}rem solid ${palette.GREY_3}`,
      },
    }),
  brandDivider: css({
    position: 'relative',
    width: '100%',
    margin: '0 auto',

    '&::after': {
      content: "''",
      display: 'block',
      width: '100%',
      borderBottom: `${pixelsToRem(1)}rem solid #d77272`,
    },
  }),
  navStack: css({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  }),
  topRow: ({ palette }: Theme) =>
    css({
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'stretch',
      justifyContent: 'space-between',
      position: 'relative',
      zIndex: 0,

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
  topRowItems: ({ palette }: Theme) =>
    css({
      li: {
        a: {
          color: palette.WHITE,

          '&:hover::after': {
            borderBottomColor: palette.WHITE,
          },
          '&:focus::after': {
            borderBottomColor: palette.WHITE,
          },
          '&:focus-visible::after': {
            borderBottomColor: palette.WHITE,
          },
        },

        'a[data-active="true"]': {
          span: {
            '&::after': {
              borderBottomColor: palette.WHITE,
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
          background: '#D77272',
          display: 'block',
          opacity: 1,
        },

        '&:last-child:before': {
          display: 'none',
        },
      },

      '&:after': {
        background: 'none',
      },
    }),
  bottomRowItems: ({ palette }: Theme) =>
    css({
      li: {
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

      svg: {
        verticalAlign: 'middle',
        fill: palette.WHITE,
      },
    }),
};
