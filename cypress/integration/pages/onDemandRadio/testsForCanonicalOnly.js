import appConfig from '../../../../src/server/utilities/serviceConfigs';
import envConfig from '../../../support/config/envs';
import {
  getEmbedUrl,
  isExpired,
  dataEndpointOverride,
} from '../../../support/helpers/onDemandRadioTv';
import config from '../../../support/config/services';

export default ({ service, pageType, variant }) => {
  describe(`testsForCanonicalOnly for ${service} ${pageType}`, () => {
    describe('Audio Player', () => {
      const { lang } = appConfig[config[service].name][variant];
      let embedUrl;
      let isExpiredEpisode;

      it('should render an iframe with a valid URL', () => {
        cy.request(
          `${Cypress.env('currentPath')}.json${dataEndpointOverride()}`,
        ).then(({ body: jsonData }) => {
          embedUrl = getEmbedUrl(jsonData, lang);
          isExpiredEpisode = isExpired(jsonData);

          if (!isExpiredEpisode) {
            // Ensure that the iFrame src matches the expected embed URL
            cy.get('iframe').then(iframe => {
              cy.wrap(iframe.prop('src')).should('contain', embedUrl);
            });

            cy.get(`iframe[src*="${embedUrl}"]`).should('be.visible');
            cy.testResponseCodeAndType(embedUrl, 200, 'text/html');
          } else {
            cy.log(`Episode is expired: ${Cypress.env('currentPath')}`);
          }
        });
      });
    });

    describe('Chartbeat', () => {
      if (envConfig.chartbeatEnabled) {
        it('should have a script with src value set to chartbeat source', () => {
          cy.hasScriptWithChartbeatSrc();
        });
        it('should have chartbeat config set to window object', () => {
          cy.hasGlobalChartbeatConfig();
        });
      }
    });
  });
};
