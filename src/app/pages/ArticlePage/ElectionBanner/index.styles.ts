import { css, Theme } from '@emotion/react';
import pixelsToRem from '#app/utilities/pixelsToRem';
import BANNER_CONFIG from './config';

export default {
  electionBannerWrapper: ({ spacings }: Theme) =>
    css({
      marginBottom: `${spacings.FULL}rem`,
    }),

  electionBannerIframe: ({ mq }: Theme) =>
    css({
      border: 'none',
      width: '100%',
      height: `${pixelsToRem(360)}rem`,

      [mq.GROUP_4_MIN_WIDTH]: {
        height: `${pixelsToRem(BANNER_CONFIG.iframeHeight)}rem`,
      },
    }),

  electionBannerWrapperAmp: ({ mq, spacings }: Theme) =>
    css({
      overflow: 'hidden',
      marginBottom: `${spacings.FULL}rem`,

      '> div': { padding: '0' },
      '& amp-img': {
        maxWidth: 640,
        margin: '0 auto',
      },
      '& amp-iframe': {
        border: 'none',
        width: '100%',
        height: `${pixelsToRem(360)}rem`,

        [mq.GROUP_4_MIN_WIDTH]: {
          height: `${pixelsToRem(BANNER_CONFIG.iframeHeight)}rem`,
        },
      },
    }),
};
