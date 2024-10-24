import { css, Theme } from '@emotion/react';
import pixelsToRem from '#app/utilities/pixelsToRem';
import BANNER_CONFIG from './config';

const IFRAME_STYLES = css({
  border: 'none',
  width: '100%',
  height: `${pixelsToRem(BANNER_CONFIG.iframeHeight)}rem`,
});

export default {
  electionBannerWrapper: ({ spacings }: Theme) =>
    css({
      marginBottom: `${spacings.FULL}rem`,
    }),

  electionBannerIframe: () => IFRAME_STYLES,

  electionBannerWrapperAmp: ({ spacings }: Theme) =>
    css({
      overflow: 'hidden',
      marginBottom: `${spacings.FULL}rem`,

      '> div': { padding: '0' },
      '& amp-iframe': IFRAME_STYLES,
    }),
};
