import { css, Theme } from '@emotion/react';
import pixelsToRem from '#app/utilities/pixelsToRem';
import { PROMO_ITEM_WIDTH } from '..';

const styles = {
  button: ({ mq }: Theme) =>
    css({
      all: 'unset',
      scrollSnapAlign: 'start',
      flex: '0 0 35%',
      textDecoration: 'none',
      display: 'block',
      position: 'relative',
      overflow: 'hidden',
      cursor: 'pointer',

      [mq.GROUP_3_MIN_WIDTH]: {
        flex: `0 0 ${pixelsToRem(PROMO_ITEM_WIDTH)}rem`,
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
  gradientOverlay: () =>
    css({
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      padding: '3rem 0.5rem 0.5rem',
      background:
        'linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.85) 40%, rgba(0, 0, 0, 0.3) 75%, rgba(0, 0, 0, 0) 100%)',
      zIndex: 1,
    }),

  heading: ({ fontVariants, palette }: Theme) =>
    css({
      position: 'relative',
      color: palette.WHITE,
      fontFamily: fontVariants?.sansBold?.fontFamily,
      fontSize: '0.875rem',
      zIndex: 2,
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
    }),
};

export default styles;
