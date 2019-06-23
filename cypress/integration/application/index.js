// NB2 must also handle isUK for news

import newsStrings from '../../../src/app/lib/config/services/news';
import persianStrings from '../../../src/app/lib/config/services/persian';
import { config } from '../../support';

Object.keys(config.services).forEach(index => {
  const serviceConfig = config.services[index];
  const service = index;

  describe(`Manifest.json files for ${service}`, () => {
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

  describe(`sw.js files for ${service}`, () => {
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

  describe(`error pages for ${service}`, () => {
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

        // These conditionals are horrid but I couldn't find a nice way to point to the imported files.
        let serviceStrings;
        if (service === 'news') {
          serviceStrings = newsStrings;
        } else if (service === 'persian') {
          serviceStrings = persianStrings;
        }

        // errorMessage
        cy.get('h1')
          .should('contain', serviceStrings.translations.error[404].statusCode)
          .and('contain', serviceStrings.translations.error[404].title);

        // errorPageInlineLink
        cy.get('main p')
          .eq(1)
          .within(() => {
            cy.get('a').should(
              'have.attr',
              'href',
              serviceStrings.translations.error[404].callToActionLinkUrl,
            );
          });

        // errorTitle
        cy.title().should(
          'eq',
          `${serviceStrings.translations.error[404].title} - ${serviceStrings.brandName}`,
        );
      });

      if (
        serviceConfig.meta.lang !== undefined &&
        serviceConfig.meta.dir !== undefined
      ) {
        it('should have the correct lang & dir attributes', () => {
          cy.hasHtmlLangDirAttributes({
            lang: `${serviceConfig.meta.lang}`,
            dir: `${serviceConfig.meta.dir}`,
          });
        });
      }
    }
  });
});
