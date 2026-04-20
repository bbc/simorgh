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

  tab: ({ palette, spacings, fontSizes, fontVariants, mq }: Theme) =>
    css({
      ...fontVariants.sansRegular,
      ...fontSizes.pica,
      whiteSpace: 'nowrap',
      background: 'none',
      border: 'none',
      borderBottom: '3px solid transparent',
      padding: `${spacings.DOUBLE}rem ${spacings.FULL}rem`,
      [mq.GROUP_2_MIN_WIDTH]: {
        padding: `${spacings.DOUBLE}rem`,
      },
      cursor: 'pointer',
      color: palette.GREY_6,
      '&:hover': {
        color: palette.GREY_10,
        borderBottom: '4px solid #B80000',
      },
      '&:focus-visible': {
        outline: `3px solid ${palette.BLACK}`,
        outlineOffset: '-3px',
      },
    }),

  tabActive: ({ palette }: Theme) =>
    css({
      color: palette.GREY_10,
      borderBottomColor: '#B80000',
      fontWeight: 700,
    }),

  scrollButton: ({ palette, spacings }: Theme) =>
    css({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '44px',
      height: '44px',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: 0,
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

  scrollButtonWrapper: () =>
    css({
      position: 'relative',
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      zIndex: 1,
    }),

  scrollButtonFadeStart: () =>
    css({
      position: 'absolute',
      top: 0,
      height: '100%',
      width: '16px',
      pointerEvents: 'none',
      "[dir='ltr'] &": {
        right: '-16px',
        background:
          'linear-gradient(to right, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0))',
      },
      "[dir='rtl'] &": {
        left: '-16px',
        background:
          'linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1))',
      },
    }),

  scrollButtonFadeEnd: () =>
    css({
      position: 'absolute',
      top: 0,
      height: '100%',
      width: '16px',
      pointerEvents: 'none',
      "[dir='ltr'] &": {
        left: '-16px',
        background:
          'linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1))',
      },
      "[dir='rtl'] &": {
        right: '-16px',
        background:
          'linear-gradient(to right, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0))',
      },
    }),
};

export default styles;
