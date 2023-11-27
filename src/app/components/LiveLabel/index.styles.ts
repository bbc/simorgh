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

  liveLabelCircle: ({ palette, spacings }: Theme) =>
    css({
      color: palette.LIVE_DARK,
      borderRadius: '50%',
      display: 'inline-block',
      width: `${spacings.DOUBLE}rem`,
      height: `${spacings.DOUBLE}rem`,
      background: `radial-gradient(circle, transparent 53%, ${palette.LIVE_DARK} 53.5%, ${palette.LIVE_DARK} 54%)`,
      marginInlineEnd: `${spacings.HALF}rem`,
      position: 'relative',
      transform: 'translate(0, 12%)',
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

      // attempting to fix pixelation

      // liveLabelCircle: ({ spacings, palette }: Theme) =>
      //   css({
      //     position: 'relative',
      //     width: `${spacings.DOUBLE}rem`,
      //     height: `${spacings.DOUBLE}rem`,
      //     display: 'inline-block',
      //     marginInlineEnd: `${spacings.HALF}rem`,
      //     transform: 'translate(0, 12%)',

      //     '&:before': {
      //       content: `''`,
      //       position: 'absolute',
      //       display: 'inline-block',
      //       width: '100%',
      //       height: '100%',
      //       boxSizing: 'border-box',
      //       borderRadius: '100%',
      //       backgroundColor: 'transparent',
      //       border: `2px solid ${palette.LIVE_DARK}`,
      //     },

      //     '&:after': {
      //       content: `''`,
      //       position: 'absolute',
      //       display: 'inline-block',
      //       width: '70%',
      //       height: '70%',
      //       // marginLeft: '8%',
      //       // marginTop: '8%',
      //       left: '14.5%',
      //       top: '15%',
      //       boxSizing: 'border-box',
      //       borderRadius: '100%',
      //       backgroundColor: `${palette.LIVE_DARK}`,
      //       '@media (prefers-reduced-motion: no-preference)': {
      //         animation: `${pulseAnimation} 1.25s cubic-bezier(0.455, 0.03, 0.515, 0.955) -0.4s 3`,
      //       },
      //     },
      //   }),

      // firstPromo: ({ mq, spacings, palette }: Theme) =>
      //   css({
      //     // border: `3px solid ${palette.LIVE_DARK}`,
      //     [mq.GROUP_1_ONLY]: {
      //       width: `${pixelsToRem(18)}rem`,
      //       height: `${pixelsToRem(18)}rem`,
      //     },
      //     [mq.GROUP_2_ONLY]: {
      //       width: `${spacings.TRIPLE}rem`,
      //       height: `${spacings.TRIPLE}rem`,
      //     },
      //     [mq.GROUP_3_MIN_WIDTH]: {
      //       width: `${pixelsToRem(28)}rem`,
      //       height: `${pixelsToRem(28)}rem`,
      //     },
    }),
};

export default styles;
