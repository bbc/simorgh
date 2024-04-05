import { css, Theme } from '@emotion/react';

export default {
  electionBannerWrapper: (theme: Theme) =>
    css({
      gridColumn: 'span 12',
      backgroundColor: theme.palette.GHOST,
    }),
  electionBannerIframe: () =>
    css({
      display: 'block',
      border: 'none',
      width: '100%',
      maxWidth: '63rem',
      height: '100%',
      minHeight: '460px',
      margin: '0 auto',
    }),
};
