import { css, Theme } from '@emotion/react';
import pixelsToRem from '#app/utilities/pixelsToRem';

const BANNER_CONTAINER_HEIGHT = 475;

export default {
  electionBannerWrapper: ({ palette }: Theme) =>
    css({
      backgroundColor: palette.GHOST,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: `${pixelsToRem(BANNER_CONTAINER_HEIGHT)}rem`,
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
      height: `${pixelsToRem(BANNER_CONTAINER_HEIGHT)}rem`,
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
