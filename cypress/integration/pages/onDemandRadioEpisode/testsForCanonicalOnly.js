import appConfig from '../../../../src/server/utilities/serviceConfigs';
import envConfig from '../../../support/config/envs';
import { getEmbedUrl, hasMedia, getOnDemandRadioDataEndpoint } from './helpers';
import appToggles from '../../../support/helpers/useAppToggles';

export default ({ service, pageType, variant }) => {
  describe('Audio Player', () => {
    it('should render an iframe with a valid URL', () => {
      const { lang: language, service: serviceName } = appConfig[service][
        variant
      ];

      cy.request(getOnDemandRadioDataEndpoint()).then(({ body: jsonData }) => {
        if (hasMedia(jsonData)) {
          const embedUrl = getEmbedUrl({
            jsonData,
            service: serviceName,
            language,
          });

          cy.get(`iframe[src*="${embedUrl}"]`).should('be.visible');
          cy.testResponseCodeAndType(embedUrl, 200, 'text/html');
        } else {
          cy.log(
            `No media present on ${pageType} for ${Cypress.env('currentPath')}`,
          );
        }
      });
    });
  });

  describe('Chartbeat', () => {
    if (appToggles.chartbeatAnalytics.enabled && envConfig.chartbeatEnabled) {
      it('should have a script with src value set to chartbeat source', () => {
        cy.hasScriptWithChartbeatSrc();
      });
      it('should have chartbeat config set to window object', () => {
        cy.hasGlobalChartbeatConfig();
      });
    }
  });
};
