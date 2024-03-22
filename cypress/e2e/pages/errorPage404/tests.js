/* eslint-disable import/prefer-default-export */
import config from '../../../support/config/services';
import envConfig from '../../../support/config/envs';
import appConfig from '../../../../src/server/utilities/serviceConfigs';
import getErrorPath from './getErrorPath';

// For testing features that may differ across services but share a common logic e.g. translated strings.
export const testsThatFollowSmokeTestConfig = ({
  service,
  pageType,
  variant,
}) =>
  describe(`Tests for ${service} ${pageType}`, () => {
    const errorPath = getErrorPath(service, pageType);

    if (errorPath) {
      describe(`${service} Test we get a 404`, () => {
        it('should return a 404 error code', () => {
          cy.testResponseCodeAndType({
            path: errorPath,
            responseCode: 404,
            type: 'text/html',
          });
        });
      });

      describe(`${service} Error Page Tests`, () => {
        before(() => {
          cy.testResponseCodeAndType({
            path: errorPath,
            responseCode: 404,
            type: 'text/html',
          });
          cy.visit(errorPath, {
            failOnStatusCode: false,
          });
        });

        it(`should display a ${
          appConfig[config[service].name][variant].translations.error[404]
            .statusCode
        } error message on screen`, () => {
          cy.get('h1').should(
            'contain',
            `${
              appConfig[config[service].name][variant].translations.error[404]
                .title
            }`,
          );
        });

        it('should have an inline link on the page that is linked to the home page', () => {
          const ctaUrl =
            appConfig[config[service].name][variant].translations.error[404]
              .callToActionLinkUrl;

          cy.get(`a[href="${ctaUrl}"]`).should('exist');
        });

        it('should have correct title & description metadata', () => {
          /* Note that description & title tests for all other page types are in /pages/testsForAllPages.js */
          const description =
            appConfig[config[service].name][variant].translations.error[404]
              .title;
          const { title } =
            appConfig[config[service].name][variant].translations.error[404];
          const pageTitle = `${title} - ${
            appConfig[config[service].name][variant].brandName
          }`;

          cy.get('head').within(() => {
            cy.title().should('eq', pageTitle);
            cy.get('meta[name="og:description"]').should(
              'have.attr',
              'content',
              description,
            );
            cy.get('meta[name="og:title"]').should(
              'have.attr',
              'content',
              pageTitle,
            );
            cy.get('meta[name="twitter:description"]').should(
              'have.attr',
              'content',
              description,
            );
            cy.get('meta[name="twitter:title"]').should(
              'have.attr',
              'content',
              pageTitle,
            );
          });
        });

        it('should have lang attribute', () => {
          cy.get('html').should(
            'have.attr',
            'lang',
            appConfig[config[service].name][variant].lang,
          );
        });
      });
      if (envConfig.standaloneErrorPages) {
        describe(`${service} error page routes`, () => {
          it(`/${service}/404 should have response code 200`, () => {
            cy.testResponseCodeAndType({
              path: `/${config[service].name}/404`,
              responseCode: 200,
              type: 'text/html',
            });
            cy.visit(`${config[service].name}/404`)
              .get('[data-e2e="status-code"]')
              .should(
                'contain',
                appConfig[config[service].name][variant].translations.error[404]
                  .statusCode,
              );
          });
          it(`/${service}/500 should have response code 200`, () => {
            cy.testResponseCodeAndType({
              path: `/${config[service].name}/500`,
              responseCode: 200,
              type: 'text/html',
            });
            cy.visit(`${config[service].name}/500`)
              .get('[data-e2e="status-code"]')
              .should(
                'contain',
                appConfig[config[service].name][variant].translations.error[500]
                  .statusCode,
              );
          });
        });
      }
    } else {
      describe(`No ${pageType} found for ${service}`, () => {});
    }
  });
