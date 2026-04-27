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

  tab: ({ palette, spacings, fontSizes, fontVariants }: Theme) =>
    css({
      ...fontVariants.sansBold,
      ...fontSizes.pica,
      position: 'relative',
      whiteSpace: 'nowrap',
      background: 'none',
      border: 'none',
      padding: `${pixelsToRem(12)}rem ${spacings.FULL}rem`,
      cursor: 'pointer',
      color: palette.GREY_10,

      '&:hover': {
        '&::after': {
          content: '""',
          position: 'absolute',
          left: 0,
          bottom: 0,
          width: '100%',
          height: `${spacings.HALF}rem`,
          background: palette.POSTBOX,
          zIndex: 1,
        },
      },
      '[type=button]&:focus-visible': {
        outlineOffset: `${pixelsToRem(-3)}rem`,
        boxShadow: 'none',
      },
    }),

  tabActive: ({ spacings, palette }: Theme) =>
    css({
      '&::after': {
        content: '""',
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: '100%',
        height: `${spacings.HALF}rem`,
        background: palette.POSTBOX,
        zIndex: 1,
      },
    }),

  scrollButton: ({ palette, spacings }: Theme) =>
    css({
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: `${pixelsToRem(44)}rem`,
      height: `${pixelsToRem(44)}rem`,
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: 0,
      color: palette.GREY_10,
      '& svg': {
        width: `${spacings.DOUBLE}rem`,
        height: `${spacings.DOUBLE}rem`,
        fill: 'currentcolor',
      },
      '&:disabled': {
        cursor: 'default',
        color: `${palette.GREY_5}`,
      },
      '[type=button]&:focus-visible': {
        outlineOffset: `${pixelsToRem(-3)}rem`,
        boxShadow: 'none',
      },
    }),

  scrollButtonWrapper: () =>
    css({
      position: 'relative',
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
    }),

  scrollButtonWrapperHidden: () =>
    css({
      display: 'none',
    }),

  scrollButtonFadeStart: ({ palette, spacings }: Theme) =>
    css({
      position: 'absolute',
      top: 0,
      height: '100%',
      width: `${spacings.DOUBLE}rem`,
      pointerEvents: 'none',
      "[dir='ltr'] &": {
        right: `-${spacings.DOUBLE}rem`,
        background: `linear-gradient(to right, ${palette.GREY_2}, ${palette.GREY_2}00)`,
      },
      "[dir='rtl'] &": {
        left: `-${spacings.DOUBLE}rem`,
        background: `linear-gradient(to right, ${palette.GREY_2}00, ${palette.GREY_2})`,
      },
    }),

  scrollButtonFadeEnd: ({ palette, spacings }: Theme) =>
    css({
      position: 'absolute',
      top: 0,
      height: '100%',
      width: `${spacings.DOUBLE}rem`,
      pointerEvents: 'none',
      "[dir='ltr'] &": {
        left: `-${spacings.DOUBLE}rem`,
        background: `linear-gradient(to right, ${palette.GREY_2}00, ${palette.GREY_2})`,
      },
      "[dir='rtl'] &": {
        right: `-${spacings.DOUBLE}rem`,
        background: `linear-gradient(to right, ${palette.GREY_2}, ${palette.GREY_2}00)`,
      },
    }),
};

export default styles;
