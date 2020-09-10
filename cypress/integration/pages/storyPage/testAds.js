import path from 'ramda/src/path';
import config from '../../../support/config/services';
import envConfig from '../../../support/config/envs';

export default service => {
  describe.only('Ads', () => {
    it('should be displayed based on whether ads toggle is enabled/disabled', () => {
      cy.getToggles(config[service].name).then(toggles => {
        const adsEnabled = path(['storyPageAds', 'enabled'], toggles);

        if (adsEnabled) {
          cy.visit(Cypress.env('currentPath'), {
            headers: {
              'BBC-Adverts': 'true',
            },
          });

          const dataPath = `${envConfig.baseUrl}${Cypress.env(
            'currentPath',
          )}.json`;

          cy.request(dataPath).then(({ body: jsonData }) => {
            const adCampaignKeyword = path(
              ['metadata', 'adCampaignKeyword'],
              jsonData,
            );
            console.log('adCampaignKeyword', adCampaignKeyword);

            cy.log('Ads should be displayed because toggle is enabled');

            cy.get('[data-e2e="advertisement"]')
              .should('exist')
              .within(() => {
                cy.get('[id="dotcom-leaderboard"]').should('exist');
                cy.get('[id="dotcom-mpu"]').should('exist');
              });

            // Check scripts
            cy.get('head script[src*="dotcom-bootstrap.js"]').should('exist');

            cy.get('head script[type="text/javascript"]').should(scripts => {
              expect(scripts).to.contain('dotcomConfig');

              if (adCampaignKeyword) {
                expect(scripts).to.contain(
                  `adcampaign: '${adCampaignKeyword}'`,
                );
              }
            });
          });
        } else {
          cy.log('Ads should not be displayed because toggle is disabled');
          cy.get('[data-e2e="advertisement"]').should('not.exist');
        }
      });
    });
  });
};
