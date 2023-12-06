import pixelsToRem from '#app/utilities/pixelsToRem';
import { css, Theme, keyframes } from '@emotion/react';

const pulseAnimation = keyframes({
  '0%': {
    opacity: 1,
  },
  '50%': {
    opacity: 0,
  },
  '100%': {
    opacity: 1,
  },
});

const styles = {
  liveLabelText: ({ palette, spacings, fontVariants }: Theme) =>
    css({
      color: palette.LIVE_DARK,
      display: 'inline-block',
      marginInlineEnd: `${spacings.FULL}rem`,
      ...fontVariants.sansBold,
    }),

  pulseContainer: ({ spacings }: Theme) =>
    css({
      display: 'inline-block',
      marginRight: '0.25rem',
      width: `${spacings.DOUBLE}rem`,
      height: `${spacings.DOUBLE}rem`,
      verticalAlign: '-0.125rem',
    }),

  pulsingCircle: () =>
    css({
      '@media (prefers-reduced-motion: no-preference)': {
        animation: `${pulseAnimation} 1.25s cubic-bezier(0.455, 0.03, 0.515, 0.955) -0.4s 3`,
      },
    }),

  firstPromo: ({ mq, spacings }: Theme) =>
    css({
      [mq.GROUP_1_ONLY]: {
        width: `${pixelsToRem(18)}rem`,
        height: `${pixelsToRem(18)}rem`,
      },
      [mq.GROUP_2_ONLY]: {
        width: `${spacings.TRIPLE}rem`,
        height: `${spacings.TRIPLE}rem`,
      },
      [mq.GROUP_3_MIN_WIDTH]: {
        width: `${pixelsToRem(28)}rem`,
        height: `${pixelsToRem(28)}rem`,
      },
    }),
};

export default styles;
