import { css, Theme } from '@emotion/react';

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
      width: '.9375rem',
      height: '.9375rem',
      background:
        'radial-gradient(circle,transparent 53%,hsla(180, 100%, 20%,.5) 53.5%,#006666 54%)',
      marginInlineEnd: `${spacings.FULL}rem`,
      position: 'relative',
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
      },

      '&:after': {
        content: `''`,
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: '100%',
        // boxShadow: '0 0 .5rem rgba(0,0,0,.3)',
      },
    }),
};

export default styles;
