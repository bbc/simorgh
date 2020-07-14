import legacyURLs from './config';
import getAppEnv from '../../../../cypress/support/helpers/getAppEnv';
import { getEmbedUrl } from '../../../../cypress/integration/pages/mediaAssetPage/helpers';

const environment = getAppEnv();

describe('Legacy MAP media playback', () => {
  const paths = legacyURLs[environment];

  if (paths.length > 0) {
    paths.forEach(path => {
      it(path, () => {
        cy.request(`${path}.json`).then(({ body: jsonData }) => {
          const embedUrl = getEmbedUrl(jsonData, jsonData.metadata.language);
          cy.visit(embedUrl);
          // cy.get(`script[src*="dotcom-bootstrap.js"]`).should('exist');
        });
      });
    });
  } else {
    it(`No Legacy MAP urls configured for the ${environment} environment`, () => {});
  }
});
