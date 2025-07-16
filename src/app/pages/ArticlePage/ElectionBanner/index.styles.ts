import BANNER_CONFIG from './config';

export default {
  electionBannerWrapper: 'mb-full',
  electionBannerIframe: `border-none w-full h-[${BANNER_CONFIG.heights.mobile / 16}rem] gel-3:h-[${BANNER_CONFIG.heights.tablet / 16}rem] gel-4:h-[${BANNER_CONFIG.heights.desktop / 16}rem]`,
  electionBannerWrapperAmp: `overflow-hidden mb-full [&>div]:p-0 [&_amp-img]:max-w-[640px] [&_amp-img]:mx-auto [&_amp-iframe]:border-none [&_amp-iframe]:w-full [&_amp-iframe]:h-[${BANNER_CONFIG.heights.mobile / 16}rem] gel-3:[&_amp-iframe]:h-[${BANNER_CONFIG.heights.tablet / 16}rem] gel-4:[&_amp-iframe]:h-[${BANNER_CONFIG.heights.desktop / 16}rem]`,
};
