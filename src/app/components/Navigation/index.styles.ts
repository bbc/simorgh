import { css, Theme } from '@emotion/react';

export default {
  divider: ({ palette }: Theme) =>
    css({
      position: 'absolute',
      width: 'calc(100vw - 0.8rem)',
      insetInlineStart: 0,
      '@media (min-width: 1041px)': {
        width: 'calc(100vw + 0.8rem)',
        insetInlineStart: 'calc(-1 * (100vw - 1014px) / 2)',
      },
      '&::after': {
        content: "''",
        position: 'absolute',
        insetBlockEnd: 0,
        insetInline: '-0.8rem 0',
        width: 'calc(100% + 0.8rem)',
        borderBottom: `0.0625rem solid ${palette.GREY_3}`,
      },
    }),
  navStack: css({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  }),
  navRow: css({
    display: 'flex',
    flexDirection: 'row-reverse',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  }),
  topRow: ({ palette }: Theme) =>
    css({
      position: 'relative',
      zIndex: 0,
      '&::before': {
        content: "''",
        position: 'absolute',
        zIndex: -1,
        /* Cover this row vertically */
        top: 0,
        bottom: 0,
        /* Full-bleed horizontally, independent of the constrained container */
        width: '100vw',
        left: '50%',
        transform: 'translateX(-50%)',
        /* POSTBOX red from theme */
        background: palette.POSTBOX,
        pointerEvents: 'none' /* ensure it never interferes with clicks */,
      },
    }),
  lowerNavWrapper: css({
    width: '100%',
    marginTop: '0.25rem',
    position: 'relative',
    zIndex: 1,
  }),
};
