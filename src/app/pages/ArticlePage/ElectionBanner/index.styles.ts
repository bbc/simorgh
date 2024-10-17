import { css, Theme } from '@emotion/react';
import pixelsToRem from '#app/utilities/pixelsToRem';

const HEIGHT_STYLING = () =>
  css({
    height: `${pixelsToRem(450)}rem`,
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
  electionBannerIframe: ({ mq }: Theme) =>
    css({
      border: 'none',
      width: '100%',
      maxWidth: '63rem',
      height: '100%',

      [mq.GROUP_4_MIN_WIDTH]: {
        padding: '0 1rem',
      },
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
