import getAppEnv from '../../../cypress/support/helpers/getAppEnv';
import { getEmbedUrl } from '../../../cypress/integration/pages/mediaAssetPage/helpers';

const environment = getAppEnv();

describe('Preroll Ads for MAPs', () => {
  describe('should not load the preroll ad plugin', () => {
    const mapsWithoutPrerollConfig = {
      local: [],
      test: [],
      live: [
        {
          reason: 'pidgin does not have preroll ads enabled',
          path: 'https://www.bbc.com/pidgin/media-44221514', // CPS Video
        },
        {
          reason: 'Castaway advertising flag is false',
          path: 'https://www.bbc.com/mundo/media-48938201', // CPS Video
        },
        {
          reason: 'duration is less than 30 seconds',
          path: 'https://www.bbc.com/mundo/media-52481764', // CPS Video
        },
        {
          reason: 'russian does not have preroll ads enabled',
          path: 'https://www.bbc.com/russian/media-52728860', // CPS Video
        },
      ],
    };

    const mapsWithoutPreroll = mapsWithoutPrerollConfig[environment];

    if (mapsWithoutPreroll && mapsWithoutPreroll.length > 0) {
      mapsWithoutPreroll.forEach(mapConfig => {
        const { path, reason } = mapConfig;

        describe(`because ${reason}`, () => {
          it(`${path}`, () => {
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
    } else {
      it(`No MAPs without preroll ads configured for the ${environment} environment`, () => {});
    }
  });

  describe('should load the preroll ad plugin', () => {
    const mapsWithPrerollConfig = {
      local: [],
      test: [],
      live: [
        'https://www.bbc.com/afrique/media-53045965', // CPS Video, advertising enabled, preroll enabled for afrique service
        'https://www.bbc.com/zhongwen/simp/science-53136501', // CPS Video. advertising enabled, preroll enabled for zhongwen service
      ],
    };

    const paths = mapsWithPrerollConfig[environment];

    if (paths.length > 0) {
      paths.forEach(path => {
        it(`${path}`, () => {
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
