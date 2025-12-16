import { ServiceParametersType } from '../../../types';

export default ({ service }: ServiceParametersType) => {
  describe(`Canonical Ads`, () => {
    it('should be displayed based on whether ads toggle is enabled/disabled', () => {
      cy.getToggles(service).then(() => {
        cy.fixture(`toggles/${service}.json`).then(toggles => {
          const adsEnabled = toggles.ads?.enabled;

          if (adsEnabled) {
            cy.window()
              .getPageDataFromWindow()
              .then(pageData => {
                const { adCampaignKeyword } = pageData.metadata;

                // Bootstrap script should exist on Canonical
                cy.get('head script[src*="dotcom-bootstrap.js"]').should(
                  'exist',
                );
                cy.get('head script[type="text/javascript"]').should(
                  scripts => {
                    expect(scripts).to.contain('pageAds: true');

                    if (adCampaignKeyword) {
                      expect(scripts).to.contain(
                        `adcampaign: '${adCampaignKeyword}'`,
                      );
                    }
                  },
                );

                // Leaderboard & MPU
                cy.get(
                  '[data-e2e="advertisement"] [id="dotcom-leaderboard"]',
                ).should('exist');
                cy.get('[data-e2e="advertisement"] [id="dotcom-mpu"]').should(
                  'exist',
                );
              });
          } else {
            cy.log(`Ads not enabled for ${service}`);
          }
        });
      });
    });
  });
};
