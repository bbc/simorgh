import envConfig from '../../support/config/envs';
import config from '../../support/config/services';

const serviceIsGNL = service => service === 'japanese';

const testsForAllAMPPages = ({ service, pageType }) => {
  describe(`AMP Tests`, () => {
    if (pageType !== 'errorPage404') {
      it('should have an AMP attribute on the page', () => {
        cy.get('html').should('have.attr', 'amp');
      });
      describe('ATI', () => {
        it('should have an amp-analytics tag with the ati url', () => {
          if (service === serviceIsGNL) {
            cy.hasAmpAnalyticsAtiUrl(
              envConfig.atiUrl,
              envConfig.atiAnalyticsGNLBucket,
            );
          } else if (config[service].isWorldService) {
            cy.hasAmpAnalyticsAtiUrl(
              envConfig.atiUrl,
              envConfig.atiAnalyticsWSBucket,
            );
          } else {
            cy.hasAmpAnalyticsAtiUrl(envConfig.atiUrl, '');
          }
        });
      });
    }
  });
};

export default testsForAllAMPPages;
