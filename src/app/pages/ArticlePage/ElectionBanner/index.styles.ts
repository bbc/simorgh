import { css, Theme } from '@emotion/react';
import pixelsToRem from '#app/utilities/pixelsToRem';
import BANNER_CONFIG from './config';

// This is for canonical only and should be removed once VJ remove the 8px margin around the iframe body content
const MARGIN_TOP_BOTTOM_BUFFER = 16;

export default {
  electionBannerWrapper: ({ spacings }: Theme) =>
    css({
      marginBottom: `${spacings.FULL}rem`,
    }),

  electionBannerIframe: ({ mq }: Theme) =>
    css({
      border: 'none',
      width: '100%',
      height: `${pixelsToRem(BANNER_CONFIG.heights.mobile + MARGIN_TOP_BOTTOM_BUFFER)}rem`,

      [mq.GROUP_2_MIN_WIDTH]: {
        height: `${pixelsToRem(BANNER_CONFIG.heights.tablet + MARGIN_TOP_BOTTOM_BUFFER)}rem`,
      },
      [mq.GROUP_4_MIN_WIDTH]: {
        height: `${pixelsToRem(BANNER_CONFIG.heights.desktop + MARGIN_TOP_BOTTOM_BUFFER)}rem`,
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
        height: `${pixelsToRem(BANNER_CONFIG.heights.mobile)}rem`,

        [mq.GROUP_2_MIN_WIDTH]: {
          height: `${pixelsToRem(BANNER_CONFIG.heights.tablet)}rem`,
        },
        [mq.GROUP_4_MIN_WIDTH]: {
          height: `${pixelsToRem(BANNER_CONFIG.heights.desktop)}rem`,
        },
      },
    }),
};
