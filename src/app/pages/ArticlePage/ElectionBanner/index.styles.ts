import { css, Theme } from '@emotion/react';

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
      minHeight: '475px',
    }),
};
