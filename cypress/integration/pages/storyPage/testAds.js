import path from 'ramda/src/path';
import config from '../../../support/config/services';
import envConfig from '../../../support/config/envs';

export default service => {
  describe('Ads', () => {
    it('should be displayed based on whether ads toggle is enabled/disabled', () => {
      cy.getToggles(config[service].name).then(toggles => {
        const adsEnabled = path(['ads', 'enabled'], toggles);

        if (adsEnabled) {
          cy.log('Ads should be displayed because toggle is enabled');

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

            // Leaderboard & MPU
            cy.get('[data-e2e="advertisement"]')
              .should('exist')
              .within(() => {
                cy.get('[id="dotcom-leaderboard"]').should('exist');
                cy.get('[id="dotcom-mpu"]').should('exist');
              });

            // Ads scripts
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
