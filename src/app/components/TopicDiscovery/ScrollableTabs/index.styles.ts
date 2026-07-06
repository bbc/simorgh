import { css, Theme } from '@emotion/react';
import pixelsToRem from '#app/utilities/pixelsToRem';

const styles = {
  wrapper: ({ palette, spacings, isDarkUi }: Theme) =>
    css({
      display: 'flex',
      alignItems: 'center',
      gap: `${spacings.HALF}rem`,
      borderBottom: `${pixelsToRem(1)}rem solid ${
        isDarkUi ? palette.GREY_6 : palette.GREY_5
      }`,
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

  tab: ({ palette, spacings, fontSizes, fontVariants, mq, isDarkUi }: Theme) =>
    css({
      ...fontVariants.sansBold,
      ...fontSizes.pica,
      position: 'relative',
      whiteSpace: 'nowrap',
      background: 'none',
      border: 'none',
      padding: `${pixelsToRem(12)}rem ${spacings.FULL}rem`,
      cursor: 'pointer',
      color: isDarkUi ? palette.GREY_2 : palette.GREY_10,

      [mq.FORCED_COLOURS]: {
        forcedColorAdjust: 'none',
        color: 'CanvasText',
        fill: 'CanvasText',
      },

      '&:hover:not(:focus-visible)': {
        '&::after': {
          content: '""',
          position: 'absolute',
          left: 0,
          bottom: 0,
          width: '100%',
          height: `${spacings.HALF}rem`,
          background: palette.POSTBOX,
          zIndex: 2,
        },
      },
      '[type=button]&:focus-visible': {
        outlineOffset: `${pixelsToRem(-3)}rem`,
        boxShadow: 'none',
        '&::after': {
          display: 'none',
        },
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

  scrollButton: ({ palette, spacings, isDarkUi }: Theme) =>
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
      color: isDarkUi ? palette.GREY_2 : palette.GREY_10,
      '& svg': {
        width: `${spacings.DOUBLE}rem`,
        height: `${spacings.DOUBLE}rem`,
        fill: 'currentcolor',
      },
      '&:disabled': {
        cursor: 'default',
        color: isDarkUi ? palette.GREY_2 : palette.GREY_5,
        ...(!isDarkUi && {
          '@media (prefers-color-scheme: dark)': {
            color: palette.GREY_2,
          },
        }),
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

  scrollButtonFadeStart: ({ palette, spacings, isDarkUi }: Theme) => {
    const bg = isDarkUi ? palette.GREY_10 : palette.GREY_2;
    return css({
      position: 'absolute',
      top: 0,
      height: '100%',
      width: `${spacings.TRIPLE}rem`,
      pointerEvents: 'none',
      zIndex: 1,
      "[dir='ltr'] &": {
        right: `-${spacings.TRIPLE}rem`,
        background: `linear-gradient(to right, ${bg}, ${bg}00)`,
      },
      "[dir='rtl'] &": {
        left: `-${spacings.TRIPLE}rem`,
        background: `linear-gradient(to right, ${bg}00, ${bg})`,
      },
    });
  },

  scrollButtonFadeEnd: ({ palette, spacings, isDarkUi }: Theme) => {
    const bg = isDarkUi ? palette.GREY_10 : palette.GREY_2;
    return css({
      position: 'absolute',
      top: 0,
      height: '100%',
      width: `${spacings.TRIPLE}rem`,
      pointerEvents: 'none',
      zIndex: 1,
      "[dir='ltr'] &": {
        left: `-${spacings.TRIPLE}rem`,
        background: `linear-gradient(to right, ${bg}00, ${bg})`,
      },
      "[dir='rtl'] &": {
        right: `-${spacings.TRIPLE}rem`,
        background: `linear-gradient(to right, ${bg}, ${bg}00)`,
      },
    });
  },
};

export default styles;
