import { css, Theme } from '@emotion/react';
import pixelsToRem from '#app/utilities/pixelsToRem';

const CARD_WIDTH_REM = 16;

const styles = {
  section: ({ spacings, mq }: Theme) =>
    css({
      margin: `${spacings.TRIPLE}rem 0`,
      [mq.GROUP_3_MIN_WIDTH]: {
        margin: `${spacings.QUADRUPLE}rem 0`,
      },
    }),

  heading: ({ palette, spacings, fontSizes, fontVariants, isDarkUi }: Theme) =>
    css({
      ...fontVariants.sansBold,
      ...fontSizes.paragon,
      color: isDarkUi ? palette.GREY_2 : palette.GREY_10,
      margin: `0 0 ${spacings.DOUBLE}rem`,
    }),

  viewport: () =>
    css({
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
    }),

  listWrapper: () =>
    css({
      position: 'relative',
      flex: 1,
      minWidth: 0,
    }),

  fade: ({ palette, isDarkUi }: Theme, side: 'start' | 'end', dir: string) => {
    const background = isDarkUi ? palette.GREY_10 : palette.WHITE;
    const pointsRight = (side === 'end') === (dir === 'ltr');

    return css({
      position: 'absolute',
      top: 0,
      bottom: 0,
      [side === 'start' ? 'insetInlineStart' : 'insetInlineEnd']: 0,
      width: `${pixelsToRem(48)}rem`,
      pointerEvents: 'none',
      zIndex: 1,
      background: `linear-gradient(to ${
        pointsRight ? 'right' : 'left'
      }, transparent, ${background})`,
    });
  },

  list: ({ spacings }: Theme) =>
    css({
      display: 'flex',
      flex: 1,
      minWidth: 0,
      listStyleType: 'none',
      margin: 0,
      padding: `${pixelsToRem(4)}rem`,
      gap: `${spacings.DOUBLE}rem`,
      overflowX: 'auto',
      // A custom, always-visible scrollbar replaces the native overlay one
      scrollbarWidth: 'none',
      '&::-webkit-scrollbar': { display: 'none' },
      '@media (prefers-reduced-motion: no-preference)': {
        scrollBehavior: 'smooth',
      },
    }),

  track: ({ palette, isDarkUi }: Theme) =>
    css({
      position: 'relative',
      height: `${pixelsToRem(24)}rem`,
      marginTop: `${pixelsToRem(8)}rem`,
      borderRadius: `${pixelsToRem(12)}rem`,
      backgroundColor: isDarkUi ? palette.GREY_8 : palette.GREY_3,
      cursor: 'pointer',
    }),

  dayMarker: ({ palette }: Theme) =>
    css({
      position: 'absolute',
      top: `${pixelsToRem(6)}rem`,
      bottom: `${pixelsToRem(6)}rem`,
      width: `${pixelsToRem(2)}rem`,
      borderRadius: `${pixelsToRem(1)}rem`,
      backgroundColor: palette.GREY_5,
      pointerEvents: 'none',
    }),

  thumbLabel: ({ palette, fontVariants, fontSizes }: Theme) =>
    css({
      ...fontVariants.sansBold,
      ...fontSizes.minion,
      display: 'block',
      padding: `0 ${pixelsToRem(10)}rem`,
      lineHeight: `${pixelsToRem(24)}rem`,
      color: palette.WHITE,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      pointerEvents: 'none',
      userSelect: 'none',
    }),

  thumb: ({ palette }: Theme) =>
    css({
      position: 'absolute',
      top: 0,
      bottom: 0,
      borderRadius: `${pixelsToRem(12)}rem`,
      backgroundColor: palette.POSTBOX,
      cursor: 'grab',
      touchAction: 'none',
      '&:hover, &:active': { filter: 'brightness(0.85)' },
      '&:active': { cursor: 'grabbing' },
    }),

  item: ({ palette, isDarkUi }: Theme) =>
    css({
      flex: `0 0 ${CARD_WIDTH_REM}rem`,
      maxWidth: '80%',
      scrollSnapAlign: 'start',
      borderBottom: `${pixelsToRem(1)}rem solid ${
        isDarkUi ? palette.GREY_6 : palette.GREY_3
      }`,
    }),

  scrollButton: ({ palette, spacings, isDarkUi }: Theme) =>
    css({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
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
        color: isDarkUi ? palette.GREY_6 : palette.GREY_5,
      },
    }),

  scrollButtonHidden: () => css({ display: 'none' }),
};

export default styles;
