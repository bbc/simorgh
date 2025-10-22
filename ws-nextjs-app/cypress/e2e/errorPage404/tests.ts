/* eslint-disable import/prefer-default-export */
import appConfig from '#src/server/utilities/serviceConfigs';
import { ServiceParametersType } from '../../types';
import envConfig, { EnvironmentConfigType } from '../../support/config/envs';

// For testing features that may differ across services but share a common logic e.g. translated strings.
export default ({
  service,
  pageType,
  variant = 'default',
  path,
}: ServiceParametersType) =>
  describe(`Tests for ${service} ${pageType}`, () => {
    describe(`${service} Test we get a 404`, () => {
      it('should return a 404 error code', () => {
        if (path) {
          cy.testResponseCodeAndType({
            path,
            responseCode: 404,
            type: 'text/html',
          });
        } else {
          throw new Error(
            'path is undefined at function /errorPage404/tests.ts',
          );
        }
      });
    });

    describe(`${service} Error Page Tests`, () => {
      before(() => {
        if (path) {
          cy.testResponseCodeAndType({
            path,
            responseCode: 404,
            type: 'text/html',
          });
          cy.visit(path, {
            failOnStatusCode: false,
          });
        } else {
          throw new Error(
            'path is undefined at function /errorPage404/tests.ts',
          );
        }
      });

      it(`should display a ${
        appConfig[service][variant].translations.error[404].statusCode
      } error message on screen`, () => {
        cy.get('h1').should(
          'contain',
          `${appConfig[service][variant].translations.error[404].title}`,
        );
      });

      it('should have an inline link on the page that is linked to the home page', () => {
        const ctaUrl =
          appConfig[service][variant].translations.error[404]
            .callToActionLinkUrl;

        cy.get(`a[href="${ctaUrl}"]`).should('exist');
      });

      it('should have correct title & description metadata', () => {
        /* Note that description & title tests for all other page types are in /pages/testsForAllPages.js */
        const description =
          appConfig[service][variant].translations.error[404].title;
        const { title } = appConfig[service][variant].translations.error[404];
        const pageTitle = `${title} - ${appConfig[service][variant].brandName}`;

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
          appConfig[service][variant].lang,
        );
      });
    });
    // SKIPPED: The following tests have been skipped as the Error Page hasn't yet been migrated.
    if ((envConfig as EnvironmentConfigType).standaloneErrorPages) {
      describe.skip(`${service} error page routes`, () => {
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
