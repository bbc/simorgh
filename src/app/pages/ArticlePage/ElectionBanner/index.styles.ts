import { css, Theme } from '@emotion/react';
import pixelsToRem from '#app/utilities/pixelsToRem';

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
      minHeight: `${pixelsToRem(BANNER_HEIGHT)}rem`,
    }),
  electionBannerWrapperAmp: (theme: Theme) =>
    css({
      maxHeight: `${pixelsToRem(BANNER_HEIGHT)}rem`,
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
