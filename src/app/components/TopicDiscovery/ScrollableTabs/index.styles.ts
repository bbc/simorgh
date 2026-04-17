import { css, Theme } from '@emotion/react';

const styles = {
  wrapper: ({ palette, spacings }: Theme) =>
    css({
      display: 'flex',
      alignItems: 'center',
      gap: `${spacings.HALF}rem`,
      borderBottom: `1px solid ${palette.GREY_5}`,
    }),

  tabList: () =>
    css({
      display: 'flex',
      overflowX: 'auto',
      scrollBehavior: 'auto',
      scrollbarWidth: 'none',
      msOverflowStyle: 'none',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    }),

  tab: ({ palette, spacings, fontSizes, fontVariants }: Theme) =>
    css({
      ...fontVariants.sansRegular,
      ...fontSizes.pica,
      whiteSpace: 'nowrap',
      background: 'none',
      border: 'none',
      borderBottom: '3px solid transparent',
      padding: `${spacings.FULL}rem ${spacings.DOUBLE}rem`,
      cursor: 'pointer',
      color: palette.GREY_6,
      '&:hover': {
        color: palette.GREY_10,
        borderBottomColor: palette.GREY_5,
      },
      '&:focus-visible': {
        outline: `3px solid ${palette.BLACK}`,
        outlineOffset: '-3px',
      },
    }),

  tabActive: ({ palette }: Theme) =>
    css({
      color: palette.GREY_10,
      borderBottomColor: palette.POSTBOX,
      fontWeight: 700,
    }),

  scrollButton: ({ palette, spacings }: Theme) =>
    css({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: `${spacings.HALF}rem`,
      color: palette.GREY_6,
      '& svg': {
        width: `${spacings.DOUBLE}rem`,
        height: `${spacings.DOUBLE}rem`,
        fill: 'currentcolor',
      },
      '&:hover:not(:disabled)': {
        color: palette.GREY_10,
      },
      '&:disabled': {
        cursor: 'default',
        color: '#8A8C8E',
      },
      '&:focus-visible': {
        outline: `3px solid ${palette.BLACK}`,
        outlineOffset: '-3px',
      },
    }),
};

export default styles;
