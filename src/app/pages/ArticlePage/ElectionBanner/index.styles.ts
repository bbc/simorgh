import { css } from '@emotion/react';
import pixelsToRem from '#app/utilities/pixelsToRem';
import BANNER_CONFIG from './config';

const IFRAME_STYLES = css({
  border: 'none',
  width: '100%',
  height: `${pixelsToRem(BANNER_CONFIG.iframeHeight)}rem`,
});

export default {
  electionBannerIframe: () => IFRAME_STYLES,
  electionBannerWrapperAmp: () =>
    css({
      '> div': { padding: '0' },
      '& amp-iframe': IFRAME_STYLES,
    }),
};
