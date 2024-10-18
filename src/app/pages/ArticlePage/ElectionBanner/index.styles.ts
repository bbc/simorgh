import { css, Theme } from '@emotion/react';
import pixelsToRem from '#app/utilities/pixelsToRem';

const HEIGHT_STYLING = () =>
  css({
    height: `${pixelsToRem(340)}rem`,
  });

export default {
  electionBannerWrapper: ({ palette }: Theme) => [
    css({
      backgroundColor: palette.GHOST,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }),
    HEIGHT_STYLING,
  ],
  electionBannerIframe: () =>
    css({
      border: 'none',
      width: '100%',
      maxWidth: '63rem',
      height: '100%',
      // margin: '-1rem 0',
    }),
  electionBannerWrapperAmp: ({ palette }: Theme) => [
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
    HEIGHT_STYLING,
  ],
};
