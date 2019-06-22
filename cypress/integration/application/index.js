// NB2 must also handle isUK for news

import news from '../../../src/app/lib/config/services/news';
import persian from '../../../src/app/lib/config/services/persian';
import { config } from '../../support';

Object.keys(config.services).forEach(index => {
  const serviceConfig = config.services[index];
  const service = index;

  describe('Manifest.json files', () => {
    if (serviceConfig.manifestPath !== undefined) {
      it(`should return a 200 status code and JSON file for ${service}`, () => {
        cy.testResponseCodeAndType(
          `${serviceConfig.manifestPath}`,
          200,
          'application/json',
        );
      });
    }
  });

  describe('sw.js files', () => {
    if (serviceConfig.serviceWorkerPath !== undefined) {
      it(`should return a 200 status code and js file for ${service}`, () => {
        cy.testResponseCodeAndType(
          `${serviceConfig.serviceWorkerPath}`,
          200,
          'application/javascript',
        );
      });
    }
  });

  describe('error pages', () => {
    if (serviceConfig.errorPages !== undefined) {
      it(`should return a 404 status code and HTML file for ${service}`, () => {
        cy.testResponseCodeAndType(
          `${serviceConfig.errorPages}`,
          404,
          'text/html',
        );
      });
      it('should display the correct messages on screen', () => {
        cy.visit(`${serviceConfig.errorPages}`, {
          failOnStatusCode: false,
        });
        if (service === 'news') {
          // errorMessage
          cy.get('h1')
            .should('contain', news.translations.error[404].statusCode)
            .and('contain', news.translations.error[404].title);
          // errorPageInlineLink
          cy.get('main p')
            .eq(1)
            .within(() => {
              cy.get('a').should(
                'have.attr',
                'href',
                news.translations.error[404].callToActionLinkUrl,
              );
            });
          // errorTitle
          cy.title().should(
            'eq',
            `${news.translations.error[404].title} - ${news.brandName}`,
          );
          // commented due to env only local
          // it('should have the correct lang & dir attributes', () => {
          //   cy.hasHtmlLangDirAttributes({ lang: 'en_GB', dir: 'ltr' });
          // });
        } else if (service === 'persian') {
          // errorMessage
          cy.get('h1')
            .should('contain', persian.translations.error[404].statusCode)
            .and('contain', persian.translations.error[404].title);
          // errorPageInlineLink
          cy.get('main p')
            .eq(1)
            .within(() => {
              cy.get('a').should(
                'have.attr',
                'href',
                persian.translations.error[404].callToActionLinkUrl,
              );
            });
          // errorTitle
          cy.title().should(
            'eq',
            `${persian.translations.error[404].title} - ${persian.brandName}`,
          );
          // commented due to env only local
          // it('should have the correct lang & dir attributes', () => {
          //   cy.hasHtmlLangDirAttributes({ lang: 'fa', dir: 'rtl' });
          // });
        }
      });
      // hasHtmlLangDirAttributes
    }
  });
});
