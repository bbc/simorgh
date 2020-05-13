import { hasMedia } from '../../pages/mediaAssetPage/helpers';

// const R = require('ramda');
// const requestAdsToggle = require('./requestAdsToggle');

const MIN_VIDEO_DURATION_FOR_PREROLLS = 30; // seconds

const getDuration = jsonData => jsonData.promo.media.versions[0].duration;

const shouldAllowAdsForAssetType = jsonData =>
  !jsonData.metadata.blockTypes.includes('legacyMedia');

const shouldAllowAdsForVideoDuration = jsonData => {
  if (jsonData.promo.media.live) {
    return true;
  }
  return getDuration(jsonData) >= MIN_VIDEO_DURATION_FOR_PREROLLS;
};

const getAdSetting = jsonData => {
  if (jsonData.promo.media.live) {
    return jsonData.metadata.options.allowAdvertising;
  }
  return jsonData.promo.media.advertising;
};

export default ({ serviceName, pageType, path }) => {
  describe(`Canonical tests for PreRoll ads for ${serviceName} ${pageType} ${path}`, () => {
    it('should load pre-roll ad plugin', () => {
      cy.request(`${path}.json`).then(({ body: jsonData }) => {
        if (hasMedia(jsonData)) {
          cy.log('has media');
          if (shouldAllowAdsForAssetType(jsonData)) {
            cy.log('cps asset');
            if (getAdSetting(jsonData)) {
              cy.log('ads allowed');
              if (shouldAllowAdsForVideoDuration(jsonData)) {
                cy.log('Duration condition met');
                cy.get(
                  `script[src="https://gn-web-assets.api.bbc.com/ngas/dotcom-preroll.js"]`,
                ).should('exist');
              } else {
                cy.log(
                  `Duration is under 0 on ${pageType} for ${Cypress.env(
                    'currentPath',
                  )}`,
                );
              }
            } else {
              cy.log(
                `No ads allowed in ad settings on ${pageType} for ${Cypress.env(
                  'currentPath',
                )}`,
              );
            }
          } else {
            cy.log(
              `Not a CPS asset on ${pageType} for ${Cypress.env(
                'currentPath',
              )}`,
            );
          }
        } else {
          cy.log(`No media on ${pageType} for ${Cypress.env('currentPath')}`);
        }
      });
    });
  });
};
