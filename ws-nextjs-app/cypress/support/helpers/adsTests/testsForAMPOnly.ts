import path from 'ramda/src/path';
import serviceConfig from '../../config/services';
import { ServiceParametersType } from '../../../types';
import { ServiceConfigDataType } from '../../config/settings';

export default ({ service }: ServiceParametersType) => {
  describe(`AMP Ads`, () => {
    it('should be displayed based on whether ads toggle is enabled/disabled', () => {
      const config = serviceConfig[service] as ServiceConfigDataType;
      const serviceName = config.name;

      cy.getToggles(serviceName).then(() => {
        cy.fixture(`toggles/${serviceName}.json`).then(toggles => {
          const adsEnabled = path(['ads', 'enabled'], toggles);

          if (adsEnabled) {
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
