import visitPage from '../../../support/helpers/visitPage';
import getAppEnv from '../../../support/helpers/getAppEnv';
import appToggles from '../../../support/helpers/useAppToggles';

const pageType = 'mediaAssetPage';

const embedUrlConfig = {
  test: [
    'https://polling.test.bbc.co.uk/ws/av-embeds/cps/bengali/media-23269006/p01k6msp/bn', // CPS Video Clip
    // CPS Audio Clip?
    // TC2 Video Clip?
    // TC2 Audio Clip?
    // Live Stream?
  ],
  live: [
    'https://polling.bbc.co.uk/ws/av-embeds/cps/bengali/news-51660521/p085h0z3/bn', // CPS Video Clip
    // CPS Audio Clip?
    // TC2 Video Clip?
    // TC2 Audio Clip?
    // Live Stream?
  ],
};

describe(`Tests for Preroll Ads for Media Player Embed`, () => {
  // Get correct URLs based on application environment
  const embedUrls = embedUrlConfig[getAppEnv()];

  if (embedUrls) {
    ['Canonical', 'AMP'].forEach(platform => {
      const pathSuffix = platform === 'AMP' ? '/amp' : '';

      embedUrls
        .map(embedUrl => `${embedUrl}${pathSuffix}`)
        .forEach(embedUrl => {
          if (appToggles.prerollAds.enabled) {
            it(`${platform} should load preroll ad plugin`, () => {
              visitPage(`${embedUrl}?ads-debug`, pageType);

              cy.get(`script[src*="dotcom-preroll.js"]`).should('exist');
            });
          }

          it(`${platform} should not load preroll ad plugin`, () => {
            visitPage(`${embedUrl}`, pageType);

            cy.get(`script[src*="dotcom-preroll.js"]`).should('not.exist');
          });
        });
    });
  }
});
