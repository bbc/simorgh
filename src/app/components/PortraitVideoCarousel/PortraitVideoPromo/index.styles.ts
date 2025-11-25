import { css, Theme } from '@emotion/react';
import pixelsToRem from '#app/utilities/pixelsToRem';
import {
  twoPixelFocusIndicatorThickness,
  twoPixelFocusIndicatorStyle,
} from '#app/components/ThemeProvider/focusIndicator';
import { calculatePromoWidth, PROMO_ITEM_WIDTH_MIN } from '../utils/styleUtils';

const styles = {
  container: ({ mq, spacings }: Theme) =>
    css({
      all: 'unset',
      scrollSnapAlign: 'start',
      textDecoration: 'none',
      display: 'block',
      position: 'relative',
      overflow: 'hidden',
      flexGrow: 0,
      flexShrink: 0,
      [mq.GROUP_0_MAX_WIDTH]: {
        width: `${pixelsToRem(PROMO_ITEM_WIDTH_MIN)}rem`,
      },
      [mq.GROUP_1_MIN_WIDTH]: {
        minWidth: `${pixelsToRem(PROMO_ITEM_WIDTH_MIN)}rem`,
        flexBasis: calculatePromoWidth({
          fitForNItems: 2,
          gapWidth: spacings.FULL,
        }),
      },
      [mq.GROUP_3_MIN_WIDTH]: {
        minWidth: 'unset',
        flexBasis: calculatePromoWidth({
          fitForNItems: 3,
          gapWidth: spacings.DOUBLE,
        }),
        [mq.POINTER]: {
          flexBasis: calculatePromoWidth({
            fitForNItems: 3,
            gapWidth: spacings.DOUBLE,
            navButtonAffordance: true,
          }),
        },
      },
      [mq.GROUP_4_MIN_WIDTH]: {
        flexBasis: calculatePromoWidth({
          fitForNItems: 4,
          gapWidth: spacings.DOUBLE,
          navButtonAffordance: true,
        }),
      },
      [mq.GROUP_5_MIN_WIDTH]: {
        flexBasis: calculatePromoWidth({
          fitForNItems: 5,
          gapWidth: spacings.DOUBLE,
          navButtonAffordance: true,
        }),
      },
    }),
  button: ({ palette }: Theme) =>
    css({
      all: 'unset',
      position: 'absolute',
      inset: 0,
      cursor: 'pointer',
      [`&[type='button']:focus-visible`]: {
        inset: `${pixelsToRem(twoPixelFocusIndicatorThickness * 2)}rem`,
        ...twoPixelFocusIndicatorStyle(palette.WHITE, palette.BLACK),
      },
    }),
  gradientOverlay: ({ spacings }: Theme) =>
    css({
      position: 'absolute',
      inset: 'auto 0 0 0',
      padding: `${pixelsToRem(28)}rem ${spacings.FULL}rem ${spacings.FULL}rem`,
      background:
        'linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.65) 24%, rgba(0, 0, 0, 1) 100%)',
    }),
  textWrapper: ({ mq, palette }: Theme) =>
    css({
      [mq.FORCED_COLOURS]: {
        backgroundColor: 'canvas',
      },
      'button:focus-visible &, button:hover &': {
        textDecoration: 'underline',
        textDecorationColor: palette.WHITE,
      },
      'button:focus-visible &': {
        ...twoPixelFocusIndicatorStyle(palette.BLACK, palette.WHITE),
      },
    }),
  durationContainer: ({ palette, mq }: Theme) =>
    css({
      display: 'inline-flex',
      alignItems: 'center',
      color: palette.WHITE,
      [mq.FORCED_COLOURS]: {
        backgroundColor: 'canvas',
      },
    }),
  playIcon: () =>
    css({
      fill: 'currentcolor',
      width: `${pixelsToRem(12)}rem`,
      height: `${pixelsToRem(12)}rem`,
    }),
  // EXPERIMENT: Portrait Video Homepage Play Duration Sizing
  playIconLarge: () =>
    css({
      fill: 'currentcolor',
      width: `${pixelsToRem(15)}rem`,
      height: `${pixelsToRem(15)}rem`,
    }),
  duration: ({ palette, spacings }: Theme) =>
    css({
      color: palette.WHITE,
      margin: `0 0 0 ${spacings.HALF}rem`,
    }),
  title: ({ palette, spacings }: Theme) =>
    css({
      display: 'block',
      color: palette.WHITE,
      margin: `${spacings.FULL}rem 0 0 0`,
      textDecorationColor: palette.WHITE,
      '&focus, &:hover': { textDecorationColor: palette.WHITE },
    }),
};

export default styles;
