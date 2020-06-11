import visitPage from '../../../support/helpers/visitPage';

describe(`Tests for PreRoll ads for media player embed`, () => {
  ['amp', 'canonical'].forEach(platform => {
    const pathSuffix = platform === 'amp' ? '/amp' : '';
    it(`should load pre-roll ad plugin for ${platform}`, () => {
      visitPage(
        `https://polling.test.bbc.co.uk/ws/av-embeds/cps/bengali/media-23269006/p01k6msp/bn${pathSuffix}?ads-debug`,
        'mediaAssetPage',
      );

      cy.get(`script[src*="dotcom-preroll.js"]`).should('exist');
    });

    it(`should not load pre-roll ad plugin for ${platform}`, () => {
      visitPage(
        `https://polling.test.bbc.co.uk/ws/av-embeds/cps/bengali/media-23269006/p01k6msp/bn${pathSuffix}`,
        'mediaAssetPage',
      );

      cy.get(`script[src*="dotcom-preroll.js"]`).should('not.exist');
    });
  });
});
