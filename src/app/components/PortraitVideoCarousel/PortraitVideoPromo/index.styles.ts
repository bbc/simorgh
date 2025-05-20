import { css, Theme } from '@emotion/react';
import pixelsToRem from '#app/utilities/pixelsToRem';
import {
  PROMO_ITEM_WIDTH_GROUP_5_MIN,
  PROMO_ITEM_WIDTH_MIN,
  NAVIGATION_BUTTON_RATIO,
  PROMO_PEEK_RATIO,
} from '../const';

const calculateWidth = ({
  itemCount,
  gapWidth,
  navButtonAffordance,
}: {
  itemCount: number;
  gapWidth: number;
  navButtonAffordance: boolean;
}) =>
  `calc((100% / ${itemCount + (navButtonAffordance ? NAVIGATION_BUTTON_RATIO : PROMO_PEEK_RATIO)}) - ${gapWidth}rem)`;

const customFocusIndicatorStyle = (innerColor: string, outerColor: string) => ({
  boxShadow: `0 0 0 ${pixelsToRem(2)}rem ${innerColor}`,
  outline: `${pixelsToRem(2)}rem solid ${outerColor}`,
  outlineOffset: `${pixelsToRem(2)}rem`,
});

const styles = {
  button: ({ mq, palette, spacings }: Theme) =>
    css({
      all: 'unset',
      scrollSnapAlign: 'start',
      textDecoration: 'none',
      display: 'block',
      position: 'relative',
      overflow: 'hidden',
      cursor: 'pointer',
      minWidth: `${pixelsToRem(PROMO_ITEM_WIDTH_MIN)}rem`,
      [mq.GROUP_1_MIN_WIDTH]: {
        flex: `0 0 ${calculateWidth({ itemCount: 2, gapWidth: spacings.FULL, navButtonAffordance: false })}`,
      },
      [mq.GROUP_3_MIN_WIDTH]: {
        flex: `0 0 ${calculateWidth({ itemCount: 3, gapWidth: spacings.DOUBLE, navButtonAffordance: false })}`,
      },
      [mq.GROUP_4_MIN_WIDTH]: {
        flex: `0 0 ${calculateWidth({ itemCount: 4, gapWidth: spacings.DOUBLE, navButtonAffordance: false })}`,
      },
      [mq.GROUP_5_MIN_WIDTH]: {
        flex: `0 0 ${pixelsToRem(PROMO_ITEM_WIDTH_GROUP_5_MIN)}rem`,
      },
      [`&[type='button']:focus-visible`]: {
        ...customFocusIndicatorStyle(palette.WHITE, palette.BLACK),
      },
    }),
  image: () =>
    css({
      width: '100%',
      height: 'auto',
      objectFit: 'cover',
      aspectRatio: '9/16',
      display: 'block',
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
      zIndex: 1,
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
        ...customFocusIndicatorStyle(palette.BLACK, palette.WHITE),
      },
      zIndex: 2,
    }),
};

export default styles;
