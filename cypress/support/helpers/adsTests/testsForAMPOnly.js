import path from 'ramda/src/path';
import config from '../../config/services';

export default ({ service }) => {
  describe(`AMP Ads`, () => {
    it('should be displayed based on whether ads toggle is enabled/disabled', () => {
      const serviceName = config[service].name;

      cy.getToggles(serviceName).then(() => {
        cy.fixture(`toggles/${serviceName}.json`).then(toggles => {
          const adsEnabled = path(['ads', 'enabled'], toggles);

          if (adsEnabled) {
            cy.url().then(currentURL => {
              cy.visit(currentURL, {
                headers: {
                  'BBC-Adverts': 'true',
                },
              });
            });

            // Canonical Bootstrap Script should not appear on AMP
            cy.get('head script[src*="dotcom-bootstrap.js"]').should(
              'not.exist',
            );

            // AMP Ads should exist
            cy.get('[data-e2e="advertisement"]').should('exist');
            cy.get('amp-ad').should('exist');
          } else {
            cy.log(`Ads not enabled for ${service}`);
          }
        });
      });
    });
  });
};
