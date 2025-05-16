import { css, Theme } from '@emotion/react';
import pixelsToRem from '#app/utilities/pixelsToRem';
import {
  PROMO_ITEM_WIDTH_GROUP_3_MIN,
  PROMO_ITEM_WIDTH_GROUP_4_MIN,
  PROMO_ITEM_WIDTH_GROUP_5_MIN,
  PROMO_ITEM_WIDTH_MIN,
} from '..';

const styles = {
  button: ({ mq, palette }: Theme) =>
    css({
      all: 'unset',
      scrollSnapAlign: 'start',
      textDecoration: 'none',
      display: 'block',
      position: 'relative',
      overflow: 'hidden',
      cursor: 'pointer',
      [mq.GROUP_1_MIN_WIDTH]: {
        flex: `0 0 ${pixelsToRem(PROMO_ITEM_WIDTH_MIN)}rem`,
      },
      [mq.GROUP_3_MIN_WIDTH]: {
        flex: `0 0 ${pixelsToRem(PROMO_ITEM_WIDTH_GROUP_3_MIN)}rem`,
      },
      [mq.GROUP_4_MIN_WIDTH]: {
        flex: `0 0 ${pixelsToRem(PROMO_ITEM_WIDTH_GROUP_4_MIN)}rem`,
      },
      [mq.GROUP_5_MIN_WIDTH]: {
        flex: `0 0 ${pixelsToRem(PROMO_ITEM_WIDTH_GROUP_5_MIN)}rem`,
      },
      [`&[type='button']:focus-visible`]: {
        boxShadow: `0 0 0 ${pixelsToRem(2)}rem ${palette.WHITE}`,
        outline: `${pixelsToRem(2)}rem solid ${palette.BLACK}`,
        outlineOffset: `${pixelsToRem(2)}rem`,
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
        boxShadow: `0 0 0 ${pixelsToRem(2)}rem ${palette.BLACK}`,
        outline: `${pixelsToRem(2)}rem solid ${palette.WHITE}`,
        outlineOffset: `${pixelsToRem(2)}rem`,
      },
      zIndex: 2,
    }),
};

export default styles;
