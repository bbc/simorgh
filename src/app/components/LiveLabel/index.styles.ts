import { css, Theme } from '@emotion/react';

const styles = {
  liveLabelText: ({ palette, spacings, fontVariants }: Theme) =>
    css({
      color: palette.LIVE_DARK,
      display: 'inline-block',
      marginInlineEnd: `${spacings.FULL}rem`,
      ...fontVariants.sansBold,
    }),
  liveLabelPulse: ({ palette, spacings }: Theme) =>
    css({
      height: '.9375rem',
      width: '.9375rem',
      backgroundColor: palette.LIVE_DARK,
      borderRadius: '50%',
      display: 'inline-block',
      marginInlineEnd: `${spacings.HALF}rem`,
    }),
};

export default styles;
