import getAppEnv from '../../../../cypress/support/helpers/getAppEnv';
import appToggles from '../../../../cypress/support/helpers/useAppToggles';
import { getEmbedUrl } from '../../../../cypress/integration/pages/mediaAssetPage/helpers';
import { mapsWithPreroll, mapsWithoutPreroll } from './config';

const environment = getAppEnv();

describe('Media Asset Pages - Preroll Ads', () => {
  describe('should not load the preroll ad plugin', () => {
    const noPreroll = mapsWithoutPreroll[environment];

    if (noPreroll && noPreroll.length > 0) {
      noPreroll.forEach(map => {
        const { paths, reason } = map;

        describe(`because ${reason}`, () => {
          paths.forEach(path => {
            it(path, () => {
              cy.request(`${path}.json`).then(({ body: jsonData }) => {
                const embedUrl = getEmbedUrl(
                  jsonData,
                  jsonData.metadata.language,
                );
                cy.visit(embedUrl);
              });
              cy.get(`script[src*="dotcom-bootstrap.js"]`).should('not.exist');
            });
          });
        });
      });
    } else {
      it(`No MAPs without preroll ads configured for the ${environment} environment`, () => {});
    }
  });

  describe('should load the preroll ad plugin', () => {
    const paths = mapsWithPreroll[environment];

    if (appToggles.prerollAds.enabled && paths.length > 0) {
      paths.forEach(path => {
        it(path, () => {
          cy.request(`${path}.json`).then(({ body: jsonData }) => {
            const embedUrl = getEmbedUrl(jsonData, jsonData.metadata.language);
            cy.visit(embedUrl);
            cy.get(`script[src*="dotcom-bootstrap.js"]`).should('exist');
          });
        });
      });
    } else {
      it(`No MAPs with preroll ads configured for the ${environment} environment`, () => {});
    }
  });
});
