import config from '../../../support/config/services';
import envConfig from '../../../support/config/envs';
import appConfig from '../../../../src/server/utilities/serviceConfigs';
import getErrorPath from './getErrorPath';

// For testing important features that differ between services, e.g. Timestamps.
// We recommend using inline conditional logic to limit tests to services which differ.
export const testsThatAlwaysRun = ({ service, pageType }) => {
  describe(`No testsToAlwaysRun to run for ${service} ${pageType}`, () => {});
};

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
          cy.testResponseCodeAndType(errorPath, 404, 'text/html');
        });
      });

      describe(`${service} Error Page Tests`, () => {
        before(() => {
          cy.testResponseCodeAndType(errorPath, 404, 'text/html');
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
          cy.get('p').within(() => {
            cy.get('a').should(
              'have.attr',
              'href',
              `${
                appConfig[config[service].name][variant].translations.error[404]
                  .callToActionLinkUrl
              }`,
            );
          });
        });

        it('should have correct title & description metadata', () => {
          /* Note that description & title tests for all other page types are in /pages/testsForAllPages.js */
          const description =
            appConfig[config[service].name][variant].translations.error[404]
              .title;
          const { title } = appConfig[config[service].name][
            variant
          ].translations.error[404];
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
            cy.testResponseCodeAndType(
              `/${config[service].name}/404`,
              200,
              'text/html',
            );
            cy.visit(`${config[service].name}/404`)
              .get('[class^="StatusCode"]')
              .should(
                'contain',
                appConfig[config[service].name][variant].translations.error[404]
                  .statusCode,
              );
          });
          it(`/${service}/500 should have response code 200`, () => {
            cy.testResponseCodeAndType(
              `/${config[service].name}/500`,
              200,
              'text/html',
            );
            cy.visit(`${config[service].name}/500`)
              .get('[class^="StatusCode"]')
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

// For testing low priority things e.g. cosmetic differences, and a safe place to put slow tests.
export const testsThatNeverRunDuringSmokeTesting = ({ service, pageType }) => {
  describe(`No testsToNeverSmokeTest to run for ${service} ${pageType}`, () => {});
};
