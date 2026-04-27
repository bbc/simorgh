import { css, Theme } from '@emotion/react';
import pixelsToRem from '#app/utilities/pixelsToRem';

const styles = {
  wrapper: ({ palette, spacings }: Theme) =>
    css({
      display: 'flex',
      alignItems: 'center',
      gap: `${spacings.HALF}rem`,
      borderBottom: `${pixelsToRem(1)}rem solid ${palette.GREY_5}`,
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
      borderBottom: `${pixelsToRem(3)}rem solid transparent`,
      padding: `${spacings.DOUBLE}rem ${spacings.FULL}rem`,
      [mq.GROUP_2_MIN_WIDTH]: {
        padding: `${spacings.DOUBLE}rem`,
      },
      cursor: 'pointer',
      color: palette.GREY_6,
      '&:hover': {
        color: palette.GREY_10,
        borderBottom: `${pixelsToRem(4)}rem solid #B80000`,
      },
      '&:focus-visible': {
        outline: `${pixelsToRem(3)}rem solid ${palette.BLACK}`,
        outlineOffset: `${pixelsToRem(-3)}rem`,
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
      width: `${pixelsToRem(44)}rem`,
      height: `${pixelsToRem(44)}rem`,
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
        outline: `${pixelsToRem(3)}rem solid ${palette.BLACK}`,
        outlineOffset: `${pixelsToRem(-3)}rem`,
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

  scrollButtonFadeStart: ({ spacings }: Theme) =>
    css({
      position: 'absolute',
      top: 0,
      height: '100%',
      width: `${spacings.DOUBLE}rem`,
      pointerEvents: 'none',
      "[dir='ltr'] &": {
        right: `-${spacings.DOUBLE}rem`,
        background:
          'linear-gradient(to right, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0))',
      },
      "[dir='rtl'] &": {
        left: `-${spacings.DOUBLE}rem`,
        background:
          'linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1))',
      },
    }),

  scrollButtonFadeEnd: ({ spacings }: Theme) =>
    css({
      position: 'absolute',
      top: 0,
      height: '100%',
      width: `${spacings.DOUBLE}rem`,
      pointerEvents: 'none',
      "[dir='ltr'] &": {
        left: `-${spacings.DOUBLE}rem`,
        background:
          'linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1))',
      },
      "[dir='rtl'] &": {
        right: `-${spacings.DOUBLE}rem`,
        background:
          'linear-gradient(to right, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0))',
      },
    }),
};

export default styles;
