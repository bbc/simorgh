import { css, Theme } from '@emotion/react';

export const BANNER_HEIGHT = 475;

export default {
  electionBannerWrapper: (theme: Theme) =>
    css({
      gridColumn: 'span 12',
      backgroundColor: theme.palette.GHOST,
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
      minHeight: BANNER_HEIGHT,
    }),
  electionBannerWrapperAmp: (theme: Theme) =>
    css({
      maxHeight: BANNER_HEIGHT,
      overflow: 'hidden',
      backgroundColor: theme.palette.GHOST,

      '& amp-iframe': {
        border: 'none',
        width: '100%',
        maxWidth: '63rem',
        height: '100%',
        margin: '0 auto',
      },
    }),
};
