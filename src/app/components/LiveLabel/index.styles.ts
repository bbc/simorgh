import { css, Theme, keyframes } from '@emotion/react';

const pulseAnimation = keyframes({
  '0%': {
    transform: 'scale(1)',
    opacity: 1,
  },
  '50%': {
    transform: 'scale(1)',
    opacity: 0,
  },
  '100%': {
    transform: 'scale(1)',
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
      width: '16px',
      height: '16px',
      background:
        'radial-gradient(circle,transparent 53%,hsla(180, 100%, 20%,.5) 53.5%,#006666 54%)',
      marginInlineEnd: `${spacings.HALF}rem`,
      position: 'relative',
    }),

  firstPromo: ({ mq }: Theme) =>
    css({
      [mq.GROUP_1_ONLY]: {
        width: '18px',
        height: '18px',
      },
      [mq.GROUP_2_ONLY]: {
        width: '24px',
        height: '24px',
      },
      [mq.GROUP_3_MIN_WIDTH]: {
        width: '28px',
        height: '28px',
      },
    }),

  livelabelPulse: () =>
    css({
      '&:before': {
        content: `''`,
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        background:
          'radial-gradient(circle,#006666 37%,rgba(0,102,102,.5) 37.5%,transparent 38%)',
        animation: `${pulseAnimation} 1.25s cubic-bezier(0.455, 0.03, 0.515, 0.955) -0.4s 3`,
      },

      '&:after': {
        content: `''`,
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: '100%',
      },
    }),
};

export default styles;
