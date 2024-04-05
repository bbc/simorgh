import { css, Theme } from '@emotion/react';
import pixelsToRem from '#app/utilities/pixelsToRem';

export const BANNER_HEIGHT = 475;

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
      height: `${pixelsToRem(BANNER_HEIGHT)}rem`,
    }),
  electionBannerWrapperAmp: ({ palette }: Theme) =>
    css({
      height: `${pixelsToRem(BANNER_HEIGHT)}rem`,
      overflow: 'hidden',
      backgroundColor: palette.GHOST,

      '& amp-iframe': {
        border: 'none',
        width: '100%',
        maxWidth: '63rem',
        height: '100%',
        margin: '0 auto',
      },
    }),
};
