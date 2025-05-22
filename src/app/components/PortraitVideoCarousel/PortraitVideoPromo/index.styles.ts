import { css, Theme } from '@emotion/react';
import pixelsToRem from '#app/utilities/pixelsToRem';
import {
  twoPixelFocusIndicatorThickness,
  twoPixelFocusIndicatorStyle,
} from '#app/components/ThemeProvider/focusIndicator';
import { calculatePromoWidth, PROMO_ITEM_WIDTH_MIN } from '../styleUtils';

const styles = {
  container: ({ mq, spacings }: Theme) =>
    css({
      all: 'unset',
      scrollSnapAlign: 'start',
      textDecoration: 'none',
      display: 'block',
      position: 'relative',
      overflow: 'hidden',
      minWidth: `${pixelsToRem(PROMO_ITEM_WIDTH_MIN)}rem`,
      flexGrow: 0,
      flexShrink: 0,
      [mq.GROUP_1_MIN_WIDTH]: {
        flexBasis: calculatePromoWidth({
          itemCount: 2,
          gapWidth: spacings.FULL,
        }),
      },
      [mq.GROUP_3_MIN_WIDTH]: {
        flexBasis: calculatePromoWidth({
          itemCount: 3,
          gapWidth: spacings.DOUBLE,
        }),
        [mq.POINTER]: {
          flexBasis: calculatePromoWidth({
            itemCount: 3,
            gapWidth: spacings.DOUBLE,
            navButtonAffordance: true,
          }),
        },
      },
      [mq.GROUP_4_MIN_WIDTH]: {
        flexBasis: calculatePromoWidth({
          itemCount: 4,
          gapWidth: spacings.DOUBLE,
          navButtonAffordance: true,
        }),
      },
      [mq.GROUP_5_MIN_WIDTH]: {
        flexBasis: calculatePromoWidth({
          itemCount: 6,
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
      bottom: 0,
      left: 0,
      right: 0,
      padding: `${pixelsToRem(28)}rem ${spacings.FULL}rem ${spacings.FULL}rem`,
      background:
        'linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.65) 24%, rgba(0, 0, 0, 1) 100%)',
    }),
  durationContainer: ({ palette }: Theme) =>
    css({
      display: 'flex',
      alignItems: 'center',
      color: palette.WHITE,
    }),
  playIcon: () =>
    css({
      fill: 'currentcolor',
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
      'button:focus-visible &, button:hover &': {
        textDecoration: 'underline',
      },
      'button:focus-visible &': {
        ...twoPixelFocusIndicatorStyle(palette.BLACK, palette.WHITE),
      },
    }),
};

export default styles;
