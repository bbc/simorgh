import getAppEnv from '../../../cypress/support/helpers/getAppEnv';
import appToggles from '../../../cypress/support/helpers/useAppToggles';

const embedUrlConfig = {
  local: [
    'https://polling.test.bbc.co.uk/ws/av-embeds/cps/bengali/media-23269006/p01k6msp/bn', // CPS Video Clip
    // 'https://polling.test.bbc.co.uk/ws/av-embeds/cps/arabic/world-23278971/p01m7d09/ar', // CPS Audio Clip
    // 'https://polling.test.bbc.co.uk/ws/av-embeds/cps/swahili/media-23268999/bbc_one_northern_ireland_hd/sw', // CPS Live Stream
  ],
  test: [
    'https://polling.test.bbc.co.uk/ws/av-embeds/cps/bengali/media-23269006/p01k6msp/bn', // CPS Video Clip
    // 'https://polling.test.bbc.co.uk/ws/av-embeds/cps/arabic/world-23278971/p01m7d09/ar', // CPS Audio Clip
    // 'https://polling.test.bbc.co.uk/ws/av-embeds/cps/swahili/media-23268999/bbc_one_northern_ireland_hd/sw', // CPS Live Stream
  ],
  live: [
    // 'https://polling.bbc.co.uk/ws/av-embeds/cps/bengali/news-51660521/p085h0z3/bn', // CPS Video Clip
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
              cy.visit(`${embedUrl}?ads-debug`);

              cy.get(`script[src*="dotcom-preroll.js"]`).should('exist');
            });
          }

          it(`${platform} should not load preroll ad plugin`, () => {
            cy.visit(`${embedUrl}?ads-debug`);

            cy.get(`script[src*="dotcom-preroll.js"]`).should('not.exist');
          });
        });
    });
  }
});
