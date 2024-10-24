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
  pulseContainer: ({ isDarkUi, palette, spacings }: Theme) =>
    css({
      color: isDarkUi ? palette.LIVE_LIGHT : palette.LIVE_DARK,
      display: 'inline-block',
      verticalAlign: '-0.125rem',
      position: 'relative',
      marginInlineEnd: `${spacings.HALF}rem`,
    }),

  pulseInnerCircle: () =>
    css({
      '@media (prefers-reduced-motion: no-preference)': {
        animation: `${pulseAnimation} 1.25s cubic-bezier(0.455, 0.03, 0.515, 0.955) 0.5s 3`,
      },
    }),
};

export default styles;
