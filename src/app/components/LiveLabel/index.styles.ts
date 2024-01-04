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

  liveLabelCircle: ({ mq, palette, spacings }: Theme) =>
    css({
      color: palette.LIVE_DARK,
      borderRadius: '50%',
      display: 'inline-block',
      width: `${pixelsToRem(15)}rem`,
      height: `${pixelsToRem(15)}rem`,
      background: `radial-gradient(circle, transparent 53%, ${palette.LIVE_DARK} 53.5%, ${palette.LIVE_DARK} 54%)`,
      marginInlineEnd: `${spacings.HALF}rem`,
      position: 'relative',
      transform: 'translate(0, 12%)',
      [mq.GROUP_2_MIN_WIDTH]: {
        width: `${spacings.DOUBLE}rem`,
        height: `${spacings.DOUBLE}rem`,
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

  livelabelPulse: ({ palette }: Theme) =>
    css({
      '&:before': {
        content: `''`,
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        background: `radial-gradient(circle, ${palette.LIVE_DARK} 37%, ${palette.LIVE_DARK} 37.5%,transparent 38%)`,
        '@media (prefers-reduced-motion: no-preference)': {
          animation: `${pulseAnimation} 1.25s cubic-bezier(0.455, 0.03, 0.515, 0.955) -0.4s 3`,
        },
      },

      '&:after': {
        content: `''`,
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: '100%',
        border: `${pixelsToRem(2)}rem solid transparent`,
      },
    }),
};

export default styles;
