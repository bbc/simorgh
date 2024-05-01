import { css, Theme } from '@emotion/react';

export default {
  electionBannerWrapper: ({ palette }: Theme) =>
    css({
      backgroundColor: palette.GHOST,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }),
  electionBannerIframe: () =>
    css({
      border: 'none',
      width: '100%',
      maxWidth: '63rem',
      height: '100%',
    }),
  electionBannerWrapperAmp: ({ palette }: Theme) =>
    css({
      backgroundColor: palette.GHOST,
      overflow: 'hidden',

      '& amp-iframe': {
        border: 'none',
        width: '100%',
        maxWidth: '63rem',
        height: '100%',
        margin: '0 auto',
      },
    }),
};
