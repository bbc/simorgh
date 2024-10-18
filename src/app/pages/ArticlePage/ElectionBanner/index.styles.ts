import { css, Theme } from '@emotion/react';
import pixelsToRem from '#app/utilities/pixelsToRem';

const HEIGHT_STYLING = () =>
  css({
    height: `${pixelsToRem(340)}rem`,
  });

export default {
  electionBannerWrapper: ({ mq, spacings }: Theme) => [
    css({
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      maxWidth: '63rem',
      margin: '0 auto',

      [mq.GROUP_3_MIN_WIDTH]: {
        paddingTop: `${spacings.QUINTUPLE}rem`,
      },
    }),
  ],
  electionBannerIframe: () => [
    css({
      border: 'none',
      width: '100%',
    }),
    HEIGHT_STYLING,
  ],
  electionBannerWrapperAmp: () => [
    css({
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
