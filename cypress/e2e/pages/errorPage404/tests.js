/* eslint-disable import/prefer-default-export */
import envConfig from '../../../support/config/envs';
import appConfig from '../../../../src/server/utilities/serviceConfigs';

// For testing features that may differ across services but share a common logic e.g. translated strings.
export default ({ service, pageType, variant = 'default' }) =>
  describe(`Tests for ${service} ${pageType}`, () => {
    if (envConfig.standaloneErrorPages) {
      describe(`${service} error page routes`, () => {
        it(`/${service}/404 should have response code 200`, () => {
          cy.testResponseCodeAndType({
            path: `/${service}/404`,
            responseCode: 200,
            type: 'text/html',
          });
          cy.visit(`${service}/404`)
            .get('[data-e2e="status-code"]')
            .should(
              'contain',
              appConfig[service][variant].translations.error[404].statusCode,
            );
        });
        it(`/${service}/500 should have response code 200`, () => {
          cy.testResponseCodeAndType({
            path: `/${service}/500`,
            responseCode: 200,
            type: 'text/html',
          });
          cy.visit(`${service}/500`)
            .get('[data-e2e="status-code"]')
            .should(
              'contain',
              appConfig[service][variant].translations.error[500].statusCode,
            );
        });
      });
    }
  });
