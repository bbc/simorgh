import { css, Theme } from '@emotion/react';
import pixelsToRem from '#app/utilities/pixelsToRem';
import BANNER_CONFIG from './config';

const IFRAME_STYLES = css({
  border: 'none',
  width: '100%',
  height: `${pixelsToRem(BANNER_CONFIG.iframeHeight)}rem`,
});

export default {
  electionBannerWrapper: ({ mq, spacings }: Theme) =>
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

  electionBannerIframe: () => IFRAME_STYLES,

  electionBannerWrapperAmp: ({ mq, spacings }: Theme) =>
    css({
      overflow: 'hidden',
      maxWidth: '63rem',
      margin: '0 auto',

      [mq.GROUP_3_MIN_WIDTH]: {
        paddingTop: `${spacings.QUINTUPLE}rem`,
      },

      '> div': { padding: '0' },
      '& amp-iframe': IFRAME_STYLES,
    }),
};
