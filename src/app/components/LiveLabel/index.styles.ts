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
  liveLabelText: ({ fontVariants, palette, spacings }: Theme) =>
    css({
      color: palette.LIVE_DARK,
      display: 'inline-block',
      ...fontVariants.sansBold,
      marginInlineEnd: `${spacings.FULL}rem`,
    }),

  pulseContainer: ({ isDarkUi, palette, mq, spacings }: Theme) =>
    css({
      color: isDarkUi ? palette.LIVE_LIGHT : palette.LIVE_DARK,
      display: 'inline-block',
      width: `${pixelsToRem(15)}rem`,
      height: `${pixelsToRem(15)}rem`,
      verticalAlign: '-0.125rem',
      position: 'relative',
      marginInlineEnd: `${spacings.HALF}rem`,
      [mq.GROUP_2_MIN_WIDTH]: {
        width: `${spacings.DOUBLE}rem`,
        height: `${spacings.DOUBLE}rem`,
      },
    }),

  pulseInnerCircle: () =>
    css({
      '@media (prefers-reduced-motion: no-preference)': {
        animation: `${pulseAnimation} 1.25s cubic-bezier(0.455, 0.03, 0.515, 0.955) 0.5s 3`,
      },
    }),

  firstPromo: ({ mq }: Theme) =>
    css({
      width: `${pixelsToRem(20)}rem`,
      height: `${pixelsToRem(20)}rem`,
      [mq.GROUP_2_ONLY]: {
        width: `${pixelsToRem(22)}rem`,
        height: `${pixelsToRem(22)}rem`,
      },
      [mq.GROUP_3_MIN_WIDTH]: {
        width: `${pixelsToRem(28)}rem`,
        height: `${pixelsToRem(28)}rem`,
      },
    }),
};

export default styles;
